// Unit tests for the calculation core embedded in index.html.
// Run with:  node --test tests/
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const source = html.match(/<script id="core-logic">([\s\S]*?)<\/script>/)[1];
const context = {};
vm.createContext(context);
vm.runInContext(source, context);
const C = context.WellCore;

const near = (actual, expected, tol = 1e-6, msg = '') =>
    assert.ok(Math.abs(actual - expected) <= tol, `${msg} expected ${expected}, got ${actual}`);
const V = toMd => ({ id:1, type:'vertical', params:{ toMd } });
const B = (rate, targetInc, azi, extra = {}, id = 2) => ({ id, type:'build', params:{ rate, targetInc, azi, ...extra } });
const H = (length, id = 3) => ({ id, type:'hold', params:{ length } });
const run = segs => C.computeWell(segs, 45);
const solverWell = (sol, kop, azi = 45) => run([V(kop), B(sol.dls, sol.alpha, azi), H(sol.lHold)]);
const last = a => a[a.length - 1];

test('unit conversions round-trip and use exact factors', () => {
    near(C.toLen(0.3048, 'ft'), 1);
    near(C.fromLen(1000, 'ft'), 304.8);
    near(C.toDls(3, 'ft'), 3.048);                       // deg/30m -> deg/100ft
    near(C.fromDls(C.toDls(7.3, 'ft'), 'ft'), 7.3);
    near(C.toLen(123, 'm'), 123);
    near(C.toDls(5, 'm'), 5);
});

test('constant-rate build matches the circular-arc solution', () => {
    const w = run([V(500), B(3, 60, 0)]);
    const R = 30 / (3 * C.DEG), end = last(w.results);
    near(end.md, 500 + 600, 1e-6);
    near(end.tvd, 500 + R * Math.sin(60 * C.DEG), 1e-6);
    near(end.northing, R * (1 - Math.cos(60 * C.DEG)), 1e-6);
    near(end.easting, 0, 1e-9);
});

test('solver plan hits both TVD targets and the predicted departure', () => {
    for (const [kop, eob, td, max] of [[500, 2000, 2500, 60], [0, 800, 1500, 45], [1200, 1800, 3000, 89.5]]) {
        const p = C.buildParetoCurve(kop, eob, td, max), sol = p.points[p.kneeIdx];
        const w = solverWell(sol, kop);
        near(w.results.find(r => r.markers.includes('EOB')).tvd, eob, 1e-6, 'EOB TVD');
        near(last(w.results).tvd, td, 1e-6, 'TD TVD');
        near(last(w.results).radDep, sol.hTotal, 1e-6, 'departure');
    }
});

test('knee search respects the maximum inclination', () => {
    const p = C.buildParetoCurve(500, 2000, 2500, 60);
    near(last(p.points).alpha, 60);
    assert.ok(p.points[p.kneeIdx].alpha > 20 && p.points[p.kneeIdx].alpha < 50);
});

test('target-departure mode solves for the inclination', () => {
    const a = C.findAlphaForTargetH(900, 500, 2000, 2500);
    near(C.solutionFromAlpha(a, 500, 2000, 2500).hTotal, 900, 1e-6);
    assert.strictEqual(C.findAlphaForTargetH(1e7, 500, 2000, 2500), null);
});

test('build-and-land at 90 deg keeps the TD marker and has no tangent', () => {
    const sol = C.solutionFromAlpha(90, 500, 2000, 2000);
    near(sol.lHold, 0);
    const w = solverWell(sol, 500);
    assert.deepStrictEqual([...last(w.results).markers], ['EOB', 'TD']);
    near(last(w.results).inc, 90);
    near(last(w.results).tvd, 2000, 1e-6);
});

test('zero-length and ignored segments do not break the calculation', () => {
    const w = run([V(500), H(0, 7), B(3, 40, 45), V(400), H(200, 8)]);
    assert.ok(w.results.every(r => Number.isFinite(r.tvd) && Number.isFinite(r.northing)));
    assert.strictEqual(w.warnings.length, 1);
    near(last(w.results).md, 500 + 400 + 200, 1e-6);
});

test('a vertical segment cannot snap an inclined well back to zero', () => {
    const w = run([V(500), B(3, 40, 45), V(2000)]);
    near(last(w.results).inc, 40);
    assert.match(w.warnings[0], /inclined/);
});

test('DLS is zero everywhere inside a hold, including interpolated rows', () => {
    const w = run([V(500), B(3, 40, 45), H(600)]);
    near(C.interpolateAtMD(w.results, 500 + 400 + 300).dls, 0, 1e-9);
    const rows = C.resampleSurvey(w.results, 10, [], 45);
    rows.filter(r => r.md > 900 + 0.1).forEach(r => near(r.dls, 0, 1e-9, `MD ${r.md}`));
    rows.filter(r => r.md > 500.1 && r.md <= 900).forEach(r => near(r.dls, 3, 1e-6, `MD ${r.md}`));
});

test('interpolation follows the arc and survives the 360/0 azimuth wrap', () => {
    const w = run([V(500), B(3, 40, 350), { id:9, type:'turn', params:{ targetAzi:20, rate:3 } }]);
    const turn = w.segments[2];
    for (let md = turn.fromMd; md <= turn.toMd; md += 0.7) {
        const a = C.interpolateAtMD(w.results, md).azi;
        assert.ok(a >= 349.9 || a <= 20.1, `azimuth ${a} at MD ${md}`);
    }
    const arc = C.interpolateAtMD(w.results, 700);       // inside a pure circular build
    near(arc.tvd, 500 + (30 / (3 * C.DEG)) * Math.sin(20 * C.DEG), 1e-6);
});

test('changing azimuth while inclined is gradual, not an instant jump', () => {
    const w = run([V(500), B(3, 45, 45), H(300), { id:4, type:'drop', params:{ rate:3, targetInc:0, azi:0 } }]);
    assert.ok(Math.max(...w.results.map(r => r.dls)) < 4.5);
    const keep = run([V(500), B(3, 45, 45), { id:4, type:'drop', params:{ rate:3, targetInc:0, azi:null } }]);
    near(Math.max(...keep.results.map(r => r.dls)), 3, 1e-6);
});

test('realistic DLS profile lands exactly on target and peaks at the nominal rate', () => {
    const prm = { profileEnabled:true, fUp:0.2, fDown:0.25, kMin:0.4 };
    const w = run([V(500), B(4, 50, 30, prm)]);
    const L = C.buildLength(50, 4, prm);
    near(last(w.results).md, 500 + L, 1e-9);
    near(last(w.results).inc, 50);
    const peak = Math.max(...w.results.map(r => r.dls));
    assert.ok(peak > 3.99 && peak <= 4 + 1e-6, `peak ${peak}`);
    near(C.buildFraction(L, L, prm), 1);
    let prev = 0;
    for (let s = 0; s <= L; s += L / 500) { const f = C.buildFraction(s, L, prm); assert.ok(f >= prev - 1e-12); prev = f; }
});

test('dipping formation pick lies on the formation plane', () => {
    const w = run([V(500), B(3, 40, 45), H(2000)]);
    const f = C.resolveFormation({ name:'x', depth:1800, depthType:'TVD', dip:10, strike:135 }, w.results, 45);
    near(f.pick.tvd, f.tvdAt(f.pick.northing, f.pick.easting), 1e-6);
    assert.ok(Math.abs(f.pick.tvd - 1800) > 5, 'dip must move the pick away from the wellhead TVD');
    near(Math.abs(f.apparentDip), 10, 1e-6);             // section is along true dip
});

test('flat TVD top, MD top and unreached top', () => {
    const w = run([V(500), B(3, 40, 45), H(500)]);
    const flat = C.resolveFormation({ name:'a', depth:400, depthType:'TVD', dip:0, strike:0 }, w.results, 45);
    near(flat.pick.md, 400, 1e-6);
    const byMd = C.resolveFormation({ name:'b', depth:1000, depthType:'MD', dip:5, strike:20 }, w.results, 45);
    near(byMd.pick.md, 1000);
    near(byMd.tvdAt(byMd.pick.northing, byMd.pick.easting), byMd.pick.tvd, 1e-9);
    assert.strictEqual(C.resolveFormation({ name:'c', depth:9000, depthType:'TVD' }, w.results, 45).pick, null);
    assert.strictEqual(C.resolveFormation({ name:'d', depth:9000, depthType:'MD' }, w.results, 45).pick, null);
});

test('survey resampling gives clean steps in feet and merges coincident rows', () => {
    const w = run([V(500), B(3, 40, 45), H(500)]);
    const step = C.fromLen(100, 'ft');
    const top = C.resolveFormation({ name:'on KOP', depth:500, depthType:'MD', color:'#000' }, w.results, 45);
    const rows = C.resampleSurvey(w.results, step, [top], 45);
    const plain = rows.filter(r => !r.markers.length && !r.tops.length);
    plain.forEach(r => near(C.toLen(r.md, 'ft') % 100 > 50 ? C.toLen(r.md, 'ft') % 100 - 100 : C.toLen(r.md, 'ft') % 100, 0, 1e-6));
    const kop = rows.filter(r => Math.abs(r.md - 500) < 0.05);
    assert.strictEqual(kop.length, 1);
    assert.strictEqual(C.rowLabel(kop[0]), 'KOP / Top on KOP');
    assert.strictEqual(last(rows).md, last(w.results).md);
});
