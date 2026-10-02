# 3D Visualizer | Precision Interactive Assembly & Component Inspector

[![Three.js](https://img.shields.io/badge/Three.js-r128-black?logo=three.js)](https://threejs.org/)
[![WebGL](https://img.shields.io/badge/WebGL-2.0%20Hardware%20Accelerated-9cf?logo=webgl)](https://www.khronos.org/webgl/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Backend-Express.js-lightgrey?logo=express)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An engineering-grade, interactive 3D procedural assembly visualizer built with **Three.js** and **WebGL**. Inspect complex mechanical devices, electronic hardware, automotive systems, and scientific structures with kinematic exploded breakdowns, dimensional 3D calipers, multi-depth technical explanations, real-time AI doubt solving, and bill-of-materials exports.

---

## ✨ Key Engineering Features

- **🧩 29 Procedural Assemblies & 180+ Engineered Components**: Comprehensive library spanning high-end consumer technology, industrial machinery, aerospace, automotive, medical instruments, and electronic primitives.
- **💥 Continuous Exploded View Engine**: Smooth step-less explosion slider with variable expansion factor, instant preset snaps (0% Fit, 50% CAD, 100% Exploded), and continuous autoplay animation cycle.
- **📐 3D Bounding Calipers & Dimensional HUD**: Real-time bounding-box measurement wireframes with dynamic corner ticks and on-screen HUD dimensional badges ($X \times Y \times Z$ in millimeters).
- **🔎 Recursive Isolate & X-Ray Mode**: Transparent ghosting of secondary assemblies to highlight critical sub-components without losing original material transparency.
- **⚡ Dual-Depth Explanations**: Toggle between beginner plain-language fundamentals and information-dense technical engineering descriptions.
- **🤖 Live AI Component Assistant**: Built-in interactive Q&A assistant powered by Claude (Anthropic API) with three-tier fallback architecture to answer technical questions and operating principles.
- **🎯 Component Identification Quiz**: Interactive knowledge tester with dynamic scoring, distractor generation across categories, and engineering mastery badges.
- **📸 3D Snapshot & BOM Export**: One-click high-resolution PNG snapshot download with CAD watermark banner, and CSV Bill of Materials (BOM) export for engineering documentation.
- **⌨️ CAD Viewport Shortcuts & Controls**: Full keyboard support for orbiting, panning, auto-rotation, wireframe, lighting presets, and camera angle snaps.

---

## 🗂️ Supported Model Library

| Category | Models Included |
| :--- | :--- |
| **Electronics** | Computer Workstation, Television, Mobile Phone, Laptop |
| **Electronic Components** | Resistor, Electrolytic Capacitor, Transistor, Diode, LED, IC Chip, Relay, Transformer, Fuse |
| **High-End Devices** | Smartwatch, Wireless Earbuds, 3D Printer |
| **Machineries** | Wind Turbine, Solar Panel |
| **Vehicles** | Internal Combustion Engine Car, Road Bicycle, Commercial Airplane |
| **Appliances** | Refrigerator, Washing Machine, Split Air Conditioner |
| **Medical Devices** | Magnetic Resonance Imaging (MRI) Scanner |
| **Science & Concepts** | Quantum Bohr Atom, Heliocentric Solar System, Human Heart (Anatomy), Human Eye (Optics) |

---

## 🎮 Navigation & Keyboard Shortcuts

| Shortcut | Action | Description |
| :---: | :--- | :--- |
| **Left Click + Drag** | Orbit Camera | Rotates view around model centroid |
| **Right Click + Drag** | Pan Camera | Translates viewpoint across plane |
| **Scroll Wheel** | Zoom In / Out | Adjusts focal distance smoothly |
| <kbd>Space</kbd> | Auto-Rotate | Toggles smooth 360° turntable rotation |
| <kbd>E</kbd> | Explode Toggle | Toggles 0% / 100% mechanical explosion |
| <kbd>R</kbd> | Reset View | Centers camera and reassembles parts |
| <kbd>W</kbd> | Wireframe | Toggles mesh polygon wireframe display |
| <kbd>X</kbd> | X-Ray Mode | Isolates selected part with ghosted housing |
| <kbd>C</kbd> | Calipers (3D) | Toggles 3D measurement bounding box & HUD |
| <kbd>L</kbd> | Lighting Preset | Cycles Clean Studio, Warm, Blueprint, High-Contrast |
| <kbd>P</kbd> | Snapshot | Captures high-res 3D PNG with CAD watermark |
| <kbd>1</kbd> | Isometric View | Snaps camera to standard 3D isometric angle |
| <kbd>2</kbd> | Top View | Snaps camera to top-down plan view |
| <kbd>3</kbd> | Front View | Snaps camera to front elevation view |
| <kbd>4</kbd> | Side View | Snaps camera to lateral side profile |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- A modern WebGL-compatible web browser (Chrome, Edge, Firefox, Safari)

### Installation & Launch

1. **Clone or open the repository**:
   ```bash
   cd 3D-Visualizer
   ```

2. **Install backend dependencies** (if not already installed):
   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Start the application server**:
   ```bash
   npm start
   ```
   *Or directly:*
   ```bash
   node server/server.js
   ```

4. **Open in your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) or [http://localhost:3001](http://localhost:3001).

---

## ⚙️ Configuration & Environment

The backend server operates completely offline-first with high-quality pre-rendered engineering fallbacks. To connect Claude AI for real-time dynamic generation:

Create or edit `server/.env`:
```env
PORT=3001
ANTHROPIC_API_KEY=your-anthropic-api-key-here
ANTHROPIC_MODEL=claude-3-5-haiku-20241022
```

---

## 📐 Project Structure

```
3D-Visualizer/
├── index.html          # Main application UI, viewport, CAD panels & modals
├── styles.css          # Visual styling, CAD canvas backdrop, scrollbars & HUD
├── app.js              # Three.js viewport, lighting, raycasting, camera & UI engine
├── components.js       # Procedural sub-assemblies, compound geometries & animators
├── materials.js        # Physical PBR materials, procedural textures & shaders
├── objects.js          # Procedural 3D models registry & bill-of-materials schema
├── quiz.js             # Component inspection quiz engine & scoring system
├── package.json        # Root project scripts and metadata
├── .gitignore          # Repository git ignore rules
└── server/
    ├── server.js       # Express server, Claude API integration & suggestions backend
    ├── package.json    # Server dependencies
    └── .env            # Environment configuration (ignored in git)
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
