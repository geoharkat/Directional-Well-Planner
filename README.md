# 🧭 Advanced Directional Well Planner

A powerful, privacy-first web application for designing, visualizing, and exporting directional well trajectories. Built specifically for drilling engineers, well planners, and geologists to rapidly iterate on well profiles using an integrated Pareto solver, realistic DLS ramp modeling, and 3D formation intersections — entirely within the browser.

> 🔒 **No data ever leaves your computer. All calculations and rendering happen client-side.**

![License](https://img.shields.io/badge/license-MIT-blue) ![Client-Side](https://img.shields.io/badge/runs-client--side-green) ![Author](https://img.shields.io/badge/author-Ismail%20Harkat-orange)
[![zread](https://img.shields.io/badge/Ask_Zread-_.svg?style=flat&color=00b0aa&labelColor=000000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuOTYxNTYgMS42MDAxSDIuMjQxNTZDMS44ODgxIDEuNjAwMSAxLjYwMTU2IDEuODg2NjQgMS42MDE1NiAyLjI0MDFWNC45NjAxQzEuNjAxNTYgNS4zMTM1NiAxLjg4ODEgNS42MDAxIDIuMjQxNTYgNS42MDAxSDQuOTYxNTZDNS4zMTUwMiA1LjYwMDEgNS42MDE1NiA1LjMxMzU2IDUuNjAxNTYgNC45NjAxVjIuMjQwMUM1LjYwMTU2IDEuODg2NjQgNS4zMTUwMiAxLjYwMDEgNC45NjE1NiAxLjYwMDFaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00Ljk2MTU2IDEwLjM5OTlIMi4yNDE1NkMxLjg4ODEgMTAuMzk5OSAxLjYwMTU2IDEwLjY4NjQgMS42MDE1NiAxMS4wMzk5VjEzLjc1OTlDMS42MDE1NiAxNC4xMTM0IDEuODg4MSAxNC4zOTk5IDIuMjQxNTYgMTQuMzk5OUg0Ljk2MTU2QzUuMzE1MDIgMTQuMzk5OSA1LjYwMTU2IDE0LjExMzQgNS42MDE1NiAxMy43NTk5VjExLjAzOTlDNS42MDE1NiAxMC42ODY0IDUuMzE1MDIgMTAuMzk5OSA0Ljk2MTU2IDEwLjM5OTlaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik0xMy43NTg0IDEuNjAwMUgxMS4wMzg0QzEwLjY4NSAxLjYwMDEgMTAuMzk4NCAxLjg4NjY0IDEwLjM5ODQgMi4yNDAxVjQuOTYwMUMxMC4zOTg0IDUuMzEzNTYgMTAuNjg1IDUuNjAwMSAxMS4wMzg0IDUuNjAwMUgxMy43NTg0QzE0LjExMTkgNS42MDAxIDE0LjM5ODQgNS4zMTM1NiAxNC4zOTg0IDQuOTYwMVYyLjI0MDFDMTQuMzk4NCAxLjg4NjY0IDE0LjExMTkgMS42MDAxIDEzLjc1ODQgMS42MDAxWiIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNNCAxMkwxMiA0TDQgMTJaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00IDEyTDEyIDQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K&logoColor=ffffff)](https://zread.ai/geoharkat/Directional-Well-Planner)
---

🔗 **Live App:** https://geoharkat.github.io/Directional-Well-Planner/

---

## ✨ Key Features

- **100% Client-Side** — Calculations and rendering run in your browser. Your well data is never uploaded. (The page loads its open-source libraries from public CDNs.)
- **Metric or Field Units** — Switch between m with deg/30m and ft with deg/100ft at any time. Values are held at full precision internally, so switching back and forth never changes the well. Your choice is remembered.
- **Pareto Target Solver** — Build-and-hold solver with a Min DLS / Max Reach curve, automatic knee point within a maximum inclination you set, click-to-select on the curve, and exact modes for target inclination or horizontal departure.
- **Realistic DLS Profiles** — Trapezoidal ramp-up / ramp-down on build and drop segments. The segment is lengthened so the target inclination is still reached exactly.
- **Formation Tops** — TVD or MD input with dip and strike. Each pick is where the well path actually crosses the dipping plane, with apparent dip on the vertical section.
- **D3.js Visualisations** — Plan view, vertical section (true 1:1 or stretched), rotatable 3D view, and inclination / azimuth / dogleg profiles against MD, with hover read-outs, zoom and pan.
- **Customisable Annotations** — Choose which markers are labelled on the Plan, Vertical Section and 3D views.
- **Output Files** — PDF report with vector plots, Excel workbook, CSV survey, and PNG or SVG of every plot.

---

## 🚀 How to Use

1. **Open the app** — Use the live link, or open `index.html` in a modern browser.
2. **Pick units** — Metric (m) or Field (ft), in the header.
3. **Solve the target** *(optional)* — Enter the kick-off depth, TVD targets and azimuth, then **Compute & Generate**. Optionally give a target inclination or departure.
4. **Adjust segments** — Edit the generated Vertical / Build / Hold segments or add Drop and Turn segments. Leave a build or drop azimuth blank to keep the current direction. Problems with a segment are reported next to it.
5. **Add formation tops** — Enter depth, dip and strike (right-hand rule).
6. **Configure the view** — Set the vertical section azimuth, annotations, and the survey MD step.
7. **Export** — Fill in Operator / Field / Prepared by if wanted, then use **CSV**, **Excel** or **PDF report** in the header, or **SVG** / **PNG** on any plot.

Plot controls: drag to pan (rotate in 3D), `Ctrl` + scroll to zoom, double-click to reset.

---

## 📦 Output Files

| File | Contents |
|------|----------|
| **PDF report** | Well summary and key figures, directional program, key survey points, warnings, plan view, vertical section, 3D view, directional profiles, formation prognosis, solver summary, survey listing at the selected MD step, disclaimer |
| **Excel (.xlsx)** | Sheets: Summary, Survey, Directional Program, Formation Tops, Target Solver |
| **CSV** | Survey table at the selected MD step, in the selected units |
| **PNG / SVG** | Any plot, with title, units and date |

The built-in PDF fonts cover Western European characters only. Other characters in names are transliterated or shown as `?` in the PDF; Excel, CSV and plot images keep them.

---

## 📐 Calculations & Conventions

| Feature | Details |
|--------|--------|
| **Survey calculation** | Minimum curvature. Positions between stations are interpolated along the same arc. |
| **Depth reference** | Surface / wellhead = 0. Azimuth clockwise from north. |
| **Build / drop** | Constant DLS or trapezoidal profile. If the azimuth changes while the hole is inclined, the change is spread evenly along the segment and the resulting DLS is reported. |
| **Turn** | Azimuth change at constant turn rate and constant inclination, taking the shortest direction. |
| **Vertical** | Only valid while the hole is vertical; add a Drop to 0° first otherwise. |
| **Solver** | Auto-knee (maximum distance from the chord, up to the chosen maximum inclination), target inclination, or target departure (bisection). |
| **Formation tops** | Plane from depth, dip and strike. TVD input: plane at that depth below the wellhead. MD input: plane through the well at that depth. On the vertical section each horizon is drawn along the well track, so picks sit on it even when the well turns. |
| **Units** | 1 ft = 0.3048 m exactly; deg/100ft = deg/30m × 1.016. |

This tool is for preliminary planning. It does not perform anti-collision, torque-and-drag or hydraulics analysis, and it does not apply magnetic or grid corrections.

---

## 🛠️ Tech Stack

A zero-build, single-file web application:

| Library | Purpose |
|--------|--------|
| D3.js | Plan, vertical section, 3D, profile and Pareto plots |
| SheetJS (XLSX) | Excel export |
| jsPDF + AutoTable + svg2pdf.js | PDF report with vector plots |
| Vanilla JS / CSS | Core logic and UI |

### Tests

The calculation core in `index.html` is covered by unit tests (Node.js 18+, no packages to install):

```bash
node --test tests/core.test.js
```

---

## 👤 Author & Contact

**Ismail Harkat**  
Wellsite & Operations Geologist  
📧 geoharkat@gmail.com  

If you find this tool useful in your drilling engineering or geological workflow, feel free to reach out!

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

