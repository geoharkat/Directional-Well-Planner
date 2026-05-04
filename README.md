# 🧭 Advanced Directional Well Planner

A powerful, privacy-first web application for designing, visualizing, and exporting directional well trajectories. Built specifically for drilling engineers, well planners, and geologists to rapidly iterate on well profiles using an integrated Pareto solver, realistic DLS ramp modeling, and 3D formation intersections — entirely within the browser.

> 🔒 **No data ever leaves your computer. All calculations and rendering happen client-side.**

![License](https://img.shields.io/badge/license-MIT-blue) ![Client-Side](https://img.shields.io/badge/runs-client--side-green) ![Author](https://img.shields.io/badge/author-Ismail%20Harkat-orange)
[![zread](https://img.shields.io/badge/Ask_Zread-_.svg?style=flat&color=00b0aa&labelColor=000000&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQuOTYxNTYgMS42MDAxSDIuMjQxNTZDMS44ODgxIDEuNjAwMSAxLjYwMTU2IDEuODg2NjQgMS42MDE1NiAyLjI0MDFWNC45NjAxQzEuNjAxNTYgNS4zMTM1NiAxLjg4ODEgNS42MDAxIDIuMjQxNTYgNS42MDAxSDQuOTYxNTZDNS4zMTUwMiA1LjYwMDEgNS42MDE1NiA1LjMxMzU2IDUuNjAxNTYgNC45NjAxVjIuMjQwMUM1LjYwMTU2IDEuODg2NjQgNS4zMTUwMiAxLjYwMDEgNC45NjE1NiAxLjYwMDFaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00Ljk2MTU2IDEwLjM5OTlIMi4yNDE1NkMxLjg4ODEgMTAuMzk5OSAxLjYwMTU2IDEwLjY4NjQgMS42MDE1NiAxMS4wMzk5VjEzLjc1OTlDMS42MDE1NiAxNC4xMTM0IDEuODg4MSAxNC4zOTk5IDIuMjQxNTYgMTQuMzk5OUg0Ljk2MTU2QzUuMzE1MDIgMTQuMzk5OSA1LjYwMTU2IDE0LjExMzQgNS42MDE1NiAxMy43NTk5VjExLjAzOTlDNS42MDE1NiAxMC42ODY0IDUuMzE1MDIgMTAuMzk5OSA0Ljk2MTU2IDEwLjM5OTlaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik0xMy43NTg0IDEuNjAwMUgxMS4wMzg0QzEwLjY4NSAxLjYwMDEgMTAuMzk4NCAxLjg4NjY0IDEwLjM5ODQgMi4yNDAxVjQuOTYwMUMxMC4zOTg0IDUuMzEzNTYgMTAuNjg1IDUuNjAwMSAxMS4wMzg0IDUuNjAwMUgxMy43NTg0QzE0LjExMTkgNS42MDAxIDE0LjM5ODQgNS4zMTM1NiAxNC4zOTg0IDQuOTYwMVYyLjI0MDFDMTQuMzk4NCAxLjg4NjY0IDE0LjExMTkgMS42MDAxIDEzLjc1ODQgMS42MDAxWiIgZmlsbD0iI2ZmZiIvPgo8cGF0aCBkPSJNNCAxMkwxMiA0TDQgMTJaIiBmaWxsPSIjZmZmIi8%2BCjxwYXRoIGQ9Ik00IDEyTDEyIDQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K&logoColor=ffffff)](https://zread.ai/geoharkat/Directional-Well-Planner)
---

🔗 **Live App:** https://geoharkat.github.io/Directional-Well-Planner/

---

## ✨ Key Features

- **100% Client-Side** — Runs entirely in your browser. Your proprietary well data and geological interpretations are never uploaded to any server.
- **Pareto Target Solver** — Instantly find the optimal build rate and inclination to hit your target. Generates a full Pareto curve (Min DLS vs. Max Reach), auto-detects the "Knee" point, and allows fine-tuning via a slider or exact target inputs (Inclination or Horizontal Departure).
- **Realistic DLS Profiles** — Model real-world BHA behavior with trapezoidal rate profiles (ramp-up / ramp-down) on build/drop segments. The planner automatically extends the segment length so the target inclination is still hit exactly.
- **Advanced Formation Tops** — Input formation tops as TVD or MD, with Dip and Strike. The planner calculates apparent dip in the Vertical Section plane and renders dipping planes as 3D meshes and 2D lines with volume fill.
- **Minimum Curvature Method** — Industry-standard survey calculation algorithm used for all trajectory computations.
- **3D Well Path (Cropped View)** — The 3D view starts 50m above the KOP, removing the uninformative vertical section and focusing the camera on the directional geometry. A labeled marker indicates the 3D start point.
- **Interactive 3-Window Plots** — Synchronized Plan View, Vertical Section, and 3D well path with spread-out, non-overlapping annotations for KOP, EOB, EOD, TD, etc.
- **Customizable Annotations** — Toggle which markers (KOP, EOB, Formations, Wellhead) appear on each specific plot (Plan, VS, 3D) and in the PDF report.
- **Professional Exports** — Export high-resolution PNGs of any plot, a fully formatted Excel survey (with selectable MD step), or a multi-page PDF report complete with plots, survey tables, solver summary, and copyright/disclaimer.

---

## 🚀 How to Use

1. **Open the App** — Navigate to the live app or open `index.html` in any modern web browser.

2. **Solve the Target (Optional but Recommended)** — In the "Target Solver" panel, enter your KOP MD, Target TVDs, and Azimuth. Click Compute & Generate to instantly build a balanced well plan based on the Pareto Knee point, or specify a target inclination/horizontal departure.

3. **Adjust Segments** — Modify the generated segments (Vertical, Build, Hold) or add your own (Drop, Turn). Use the sliders for Build Rate and Target Inclination. Enable Realistic DLS Profile if you need ramp-up/ramp-down behavior.

4. **Add Formation Tops** — Click + Add Formation Top. Enter Depth (TVD or MD), Dip, and Strike. Formations will appear as dashed/solid lines in the VS plot and as 3D planes in the 3D view.

5. **Configure View** — Set the Vertical Section Azimuth (or use Auto), adjust annotation toggles, and set your preferred MD step for the survey table.

6. **Export** — Use the top-right buttons to export the Survey Table to Excel or generate a comprehensive PDF Report. Use the "PNG" buttons on individual plots for high-res images.

---

## 📐 Supported Well Profiles & Calculations

| Feature | Details |
|--------|--------|
| **Well Types** | J-Type (Build & Hold), S-Type (Build, Hold, Drop), Horizontal (Build to 90° & Hold), Custom multi-segment |
| **Survey Calculation** | Minimum Curvature Method (standard ratio factor) |
| **Build/Drop Rate** | Constant DLS or Trapezoidal Profile (Ramp Up → Hold → Ramp Down) |
| **Turn Segment** | Azimuthal turning at constant turn rate while maintaining inclination |
| **Solver Modes** | Auto-Knee (Pareto balanced), Target Inclination, Target Horizontal Departure (bisection) |
| **Formation Projection** | 3D plane intersection, Apparent Dip calculation for VS projection |
| **3D View Start** | Cropped 50m above KOP for optimal camera focus on directional section |

---

## 🛠️ Tech Stack

This is a zero-build, single-file web application leveraging powerful open-source libraries:

| Library | Purpose |
|--------|--------|
| Plotly.js | 2D (Plan, VS) & 3D Interactive Plotting |
| SheetJS (XLSX) | Excel (.xlsx) Survey Export |
| jsPDF + AutoTable | PDF Report Generation |
| Vanilla JS / CSS | Core Logic, UI, & Styling (No framework dependencies) |

---

## 👤 Author & Contact

**Ismail Harkat**  
Wellsite & Operations Geologist  
📧 geoharkat@gmail.com  

If you find this tool useful in your drilling engineering or geological workflow, feel free to reach out!

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

