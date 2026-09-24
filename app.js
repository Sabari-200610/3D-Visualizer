// =============================================================================
// 3D VISUALIZER APPLICATION & RENDER ENGINE (ADVANCED CAD INTERACTIVE)
// Three.js Viewport, Realistic Procedural Assembly, Calipers, Audio & UI
// =============================================================================

let scene, camera, renderer, controls;
var currentObjectId = 'computer';
window.currentObjectId = currentObjectId;
let activeMeshes = [];
let hoveredMesh = null;
let selectedMesh = null;
var isWireframe = false;
window.isWireframe = isWireframe;
let isAutoRotate = false;

// Explode & Reassemble Engine
let isExploded = false;
let currentExplodeFactor = 0;
let targetExplodeFactor = 0;
let isUserDraggingSlider = false;
let isAutoPlayExplode = false;
let autoPlayDirection = 1;

// 3D Calipers / Dimensions Mode
let isCalipersActive = false;
let caliperVisualGroup = null;

// Audio Feedback System (Web Audio API procedural sound effects)
let audioCtx = null;
let isAudioEnabled = true;

function playTactileClick(freq = 680, dur = 0.04) {
  if (!isAudioEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + dur);
    gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
  } catch (e) {}
}

function playSwooshSound(up = true) {
  if (!isAudioEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    const startF = up ? 240 : 540;
    const endF = up ? 540 : 240;
    osc.frequency.setValueAtTime(startF, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endF, audioCtx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.18);
  } catch (e) {}
}

// Scene Lighting & Environment objects
let dirLight1, dirLight2, rimLight, ambientLight, bounceLight;
let contactShadowMesh = null;
let groundShadowPlane = null;
var envMap = null;

// Clock for time-based animation
const appClock = new THREE.Clock();

// Camera Smooth Transition
let cameraTransition = null;

// X-Ray / Isolate Inspection Mode
let isXRayMode = false;

// Left Sidebar View Mode: 'balanced' | 'parts' | 'models'
let sidebarViewMode = 'balanced';
let partSearchFilterText = '';

// Realistic Matte / Satin Studio Lighting Presets
const LIGHTING_PRESETS = {
  studio: {
    name: 'Studio Clean',
    bg: 0x0b0e14,
    keyColor: 0xf6ede2,
    keyIntensity: 1.15,
    fillColor: 0x8aa5c8,
    fillIntensity: 0.5,
    rimColor: 0x9ec0e6,
    rimIntensity: 0.38,
    ambientColor: 0xdce6f2,
    ambientIntensity: 0.65,
    exposure: 1.05,
  },
  darkroom: {
    name: 'Cinematic Dark',
    bg: 0x05070a,
    keyColor: 0xffedd8,
    keyIntensity: 1.35,
    fillColor: 0x506580,
    fillIntensity: 0.35,
    rimColor: 0x7aa5d6,
    rimIntensity: 0.55,
    ambientColor: 0x708095,
    ambientIntensity: 0.35,
    exposure: 1.0,
  },
  cyber: {
    name: 'Cyber Neon',
    bg: 0x070913,
    keyColor: 0x38bdf8,
    keyIntensity: 1.25,
    fillColor: 0x818cf8,
    fillIntensity: 0.45,
    rimColor: 0xf43f5e,
    rimIntensity: 0.6,
    ambientColor: 0x475569,
    ambientIntensity: 0.45,
    exposure: 1.1,
  },
};
const PRESET_KEYS = ['studio', 'darkroom', 'cyber'];
let currentPresetIndex = 0;

// API integration with graceful local fallback
const API_URL = window.location.protocol.startsWith('http')
  ? '/api/explain'
  : 'http://localhost:3001/api/explain';
var descriptionCache = {};
window.descriptionCache = descriptionCache;

let currentExplanationLevel = 'simple';
window.currentExplanationLevel = currentExplanationLevel;

let currentlyDisplayedPart = null;
let currentlyDisplayedMesh = null;

async function getDescription(objectId, partId, objectLabel, partName, level = currentExplanationLevel) {
  const cacheKey = `${objectId}:${partId}:${level}`;
  if (descriptionCache[cacheKey]) return descriptionCache[cacheKey];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ objectLabel, partName, partId, level }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    descriptionCache[cacheKey] = data;
    return data;
  } catch (err) {
    return null;
  }
}
window.getDescription = getDescription;

// -------------------------------------------------------------
// HELPER FUNCTIONS: Clean Engineering Formatting
// -------------------------------------------------------------
function getPartCategory(part) {
  const name = (part.name || '').toLowerCase();
  if (
    name.includes('frame') ||
    name.includes('body') ||
    name.includes('case') ||
    name.includes('chassis') ||
    name.includes('casing') ||
    name.includes('shell') ||
    name.includes('door') ||
    name.includes('lid') ||
    name.includes('saddle') ||
    name.includes('seat') ||
    name.includes('housing')
  ) {
    return 'Structural Chassis';
  }
  if (
    name.includes('screen') ||
    name.includes('display') ||
    name.includes('lens') ||
    name.includes('glass') ||
    name.includes('light') ||
    name.includes('porthole') ||
    name.includes('backlight') ||
    name.includes('sun') ||
    name.includes('earth') ||
    name.includes('planet') ||
    name.includes('nucleus') ||
    name.includes('electron')
  ) {
    return 'Optics & Display';
  }
  if (
    name.includes('cpu') ||
    name.includes('chip') ||
    name.includes('processor') ||
    name.includes('mainboard') ||
    name.includes('motherboard') ||
    name.includes('ram') ||
    name.includes('gpu') ||
    name.includes('ssd') ||
    name.includes('disk') ||
    name.includes('control-panel') ||
    name.includes('keyboard') ||
    name.includes('trackpad')
  ) {
    return 'Core Silicon & Computing';
  }
  if (
    name.includes('fan') ||
    name.includes('cooler') ||
    name.includes('heatsink') ||
    name.includes('coil') ||
    name.includes('compressor') ||
    name.includes('pump')
  ) {
    return 'Thermal & Cooling';
  }
  if (
    name.includes('wheel') ||
    name.includes('drum') ||
    name.includes('motor') ||
    name.includes('pedal') ||
    name.includes('chain') ||
    name.includes('engine') ||
    name.includes('hinge')
  ) {
    return 'Kinematics & Motion';
  }
  if (name.includes('battery') || name.includes('psu') || name.includes('fuel')) {
    return 'Power & Energy';
  }
  return 'Mechanical Subassembly';
}

function formatPartDimensions(geomDef) {
  if (!geomDef || !geomDef.args) return 'Standard CAD Size';
  const a = geomDef.args;
  if (geomDef.type === 'box') {
    const l = Math.round(a[0] * 100);
    const w = Math.round(a[1] * 100);
    const d = Math.round(a[2] * 100);
    return `${l} × ${w} × ${d} mm`;
  }
  if (geomDef.type === 'cylinder') {
    const r = Math.round(a[0] * 100);
    const h = Math.round(a[2] * 100);
    return `Ø ${r * 2} × ${h} mm`;
  }
  if (geomDef.type === 'sphere') {
    const r = Math.round(a[0] * 100);
    return `Ø ${r * 2} mm Sphere`;
  }
  return 'Standard Module';
}

function getPartFinish(part) {
  const n = (part.name || '').toLowerCase();
  const mt = part.materialType || '';
  if (mt === 'metal' || n.includes('heatsink') || n.includes('bracket') || n.includes('stand'))
    return 'Anodized 6061-T6 Aluminum';
  if (mt === 'pcb' || n.includes('motherboard') || n.includes('mainboard'))
    return 'FR-4 Multi-Layer Solder Mask';
  if (mt === 'glass' || n.includes('screen') || n.includes('glass'))
    return 'Aluminosilicate Tempered Glass';
  if (n.includes('fan') || n.includes('shroud') || n.includes('case'))
    return 'Injection Molded Polymer';
  if (n.includes('tire') || n.includes('grip') || n.includes('damper'))
    return 'High-Traction Vulcanized Rubber';
  return 'Engineering Satin Matte Finish';
}

// -------------------------------------------------------------
// THREE.JS GEOMETRY CREATION HELPER
// -------------------------------------------------------------
function createRealisticGeometry(geomDef) {
  if (geomDef.type === 'box') {
    const args = [...geomDef.args];
    const w = args[0] || 1;
    const h = args[1] || 1;
    const d = args[2] || 1;
    const minDim = Math.min(w, h, d);
    const bevel = Math.min(0.035, minDim * 0.1);

    if (bevel > 0.005) {
      try {
        const shape = new THREE.Shape();
        const hw = w / 2 - bevel;
        const hh = h / 2 - bevel;
        shape.absarc(hw, hh, bevel, 0, Math.PI / 2, false);
        shape.absarc(-hw, hh, bevel, Math.PI / 2, Math.PI, false);
        shape.absarc(-hw, -hh, bevel, Math.PI, Math.PI * 1.5, false);
        shape.absarc(hw, -hh, bevel, Math.PI * 1.5, Math.PI * 2, false);

        const geom = new THREE.ExtrudeGeometry(shape, {
          depth: Math.max(0.005, d - 2 * bevel),
          bevelEnabled: true,
          bevelSegments: 2,
          steps: 1,
          bevelSize: bevel,
          bevelThickness: bevel,
          curveSegments: 4,
        });
        geom.center();
        return geom;
      } catch (e) {
        return new THREE.BoxGeometry(w, h, d, 2, 2, 2);
      }
    }
    return new THREE.BoxGeometry(w, h, d, 2, 2, 2);
  } else if (geomDef.type === 'sphere') {
    const r = geomDef.args[0] || 1;
    return new THREE.SphereGeometry(r, 36, 36);
  } else if (geomDef.type === 'cylinder') {
    const rTop = geomDef.args[0] || 1;
    const rBot = geomDef.args[1] || 1;
    const h = geomDef.args[2] || 1;
    const segs = Math.max(32, geomDef.args[3] || 32);
    return new THREE.CylinderGeometry(rTop, rBot, h, segs, 1);
  }
  return new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
}

// -------------------------------------------------------------
// THREE.JS INITIALIZATION & SCENE SETUP
// -------------------------------------------------------------
let mount, raycaster, mouse, pointerDownPos;

function initThree() {
  mount = document.getElementById('canvasMount');
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  pointerDownPos = { x: 0, y: 0, time: 0 };

  scene = new THREE.Scene();
  scene.background = new THREE.Color(LIGHTING_PRESETS.studio.bg);

  // Contact Shadow Plane
  const shadowGeom = new THREE.PlaneGeometry(1, 1);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: createContactShadowTexture(),
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  contactShadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
  contactShadowMesh.rotation.x = -Math.PI / 2;
  contactShadowMesh.renderOrder = 1;
  scene.add(contactShadowMesh);

  // Shadow receiver ground plane
  const groundGeom = new THREE.PlaneGeometry(120, 120);
  const groundMat = new THREE.ShadowMaterial({ opacity: 0.35 });
  groundShadowPlane = new THREE.Mesh(groundGeom, groundMat);
  groundShadowPlane.rotation.x = -Math.PI / 2;
  groundShadowPlane.receiveShadow = true;
  scene.add(groundShadowPlane);

  // Caliper 3D Visual Group
  caliperVisualGroup = new THREE.Group();
  scene.add(caliperVisualGroup);

  // Camera & Renderer
  const width = mount && mount.clientWidth ? mount.clientWidth : window.innerWidth;
  const height = mount && mount.clientHeight ? mount.clientHeight : window.innerHeight;
  camera = new THREE.PerspectiveCamera(45, width / (height || 1), 0.1, 1000);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = LIGHTING_PRESETS.studio.exposure;
  renderer.outputEncoding = THREE.sRGBEncoding;
  if (mount) mount.appendChild(renderer.domElement);

  // Orbit Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 75;
  controls.minDistance = 1.5;

  // Studio Multi-Light Setup
  ambientLight = new THREE.AmbientLight(
    LIGHTING_PRESETS.studio.ambientColor,
    LIGHTING_PRESETS.studio.ambientIntensity
  );
  scene.add(ambientLight);

  dirLight1 = new THREE.DirectionalLight(
    LIGHTING_PRESETS.studio.keyColor,
    LIGHTING_PRESETS.studio.keyIntensity
  );
  dirLight1.position.set(12, 20, 14);
  dirLight1.castShadow = true;
  dirLight1.shadow.mapSize.width = 2048;
  dirLight1.shadow.mapSize.height = 2048;
  dirLight1.shadow.camera.near = 0.5;
  dirLight1.shadow.camera.far = 60;
  dirLight1.shadow.bias = -0.0001;
  dirLight1.shadow.normalBias = 0.02;
  dirLight1.shadow.radius = 3.5;
  scene.add(dirLight1);

  dirLight2 = new THREE.DirectionalLight(
    LIGHTING_PRESETS.studio.fillColor,
    LIGHTING_PRESETS.studio.fillIntensity
  );
  dirLight2.position.set(-14, 8, -10);
  scene.add(dirLight2);

  rimLight = new THREE.DirectionalLight(
    LIGHTING_PRESETS.studio.rimColor,
    LIGHTING_PRESETS.studio.rimIntensity
  );
  rimLight.position.set(-2, 12, -16);
  scene.add(rimLight);

  bounceLight = new THREE.PointLight(0xffeedd, 0.25, 45);
  bounceLight.position.set(0, -3, 8);
  scene.add(bounceLight);

  // Event Listeners
  window.addEventListener('resize', onWindowResize);
  if (mount) {
    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('pointerdown', (e) => {
      pointerDownPos.x = e.clientX;
      pointerDownPos.y = e.clientY;
      pointerDownPos.time = Date.now();
    });
    mount.addEventListener('click', onCanvasClick);
    mount.addEventListener('dblclick', toggleExplode);
  }

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      toggleAutoRotate();
    } else if (e.key === 'e' || e.key === 'E') {
      toggleExplode();
    } else if (e.key === 'r' || e.key === 'R') {
      resetCameraView();
    } else if (e.key === 'w' || e.key === 'W') {
      toggleWireframe();
    } else if (e.key === 'x' || e.key === 'X') {
      toggleXRayMode();
    } else if (e.key === 'c' || e.key === 'C') {
      toggleCalipers();
    } else if (e.key === 'l' || e.key === 'L') {
      cycleLightingPreset();
    }
  });

  loadObject(currentObjectId);
  animate();
}

function createContactShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  grad.addColorStop(0.25, 'rgba(0, 0, 0, 0.5)');
  grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
  grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.05)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);
  return new THREE.CanvasTexture(canvas);
}

// -------------------------------------------------------------
// OBJECT LOADING & REALISTIC PROCEDURAL MESH SETUP
// -------------------------------------------------------------
function loadObject(objId) {
  const objData = OBJECTS[objId];
  if (!objData) return;

  currentObjectId = objId;
  window.currentObjectId = currentObjectId;

  // Clear previous animators & meshes
  if (typeof clearComponentAnimators === 'function') {
    clearComponentAnimators();
  }
  activeMeshes.forEach((mesh) => scene.remove(mesh));
  activeMeshes = [];
  hoveredMesh = null;
  selectedMesh = null;
  removeCaliperLines();

  // Camera positioning
  const r = objData.viewRadius || 15;
  camera.position.set(r * 0.72, r * 0.52, r * 0.82);
  controls.target.set(0, 0, 0);
  controls.update();

  // Reset explode state
  isExploded = false;
  currentExplodeFactor = 0;
  targetExplodeFactor = 0;
  isUserDraggingSlider = false;
  isAutoPlayExplode = false;
  updateExplosion(0);

  const slider = document.getElementById('explodeSlider');
  if (slider) slider.value = 0;
  const label = document.getElementById('explodeFactorLabel');
  if (label) label.textContent = '0% (Assembled)';
  updateToggleButtonUI();

  // Calculate centroid
  let sumX = 0, sumY = 0, sumZ = 0;
  objData.parts.forEach((p) => {
    sumX += p.position[0];
    sumY += p.position[1];
    sumZ += p.position[2];
  });
  const center = new THREE.Vector3(
    sumX / objData.parts.length,
    sumY / objData.parts.length,
    sumZ / objData.parts.length
  );

  const groupForBounds = new THREE.Group();

  // Build authentic procedural components
  objData.parts.forEach((part) => {
    const mat = createRealisticMaterial(part);

    const partObj = typeof buildRealisticComponent === 'function'
      ? buildRealisticComponent(part, currentObjectId, mat, createRealisticGeometry)
      : new THREE.Mesh(createRealisticGeometry(part.geometry), mat);

    partObj.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = !part.transparent;
        child.receiveShadow = true;
      }
    });

    const origPos = new THREE.Vector3(...part.position);
    let dir = origPos.clone().sub(center);
    if (dir.length() < 0.15) {
      dir = new THREE.Vector3(0, 1, 0);
    } else {
      dir.normalize();
    }

    partObj.userData = {
      partData: part,
      originalPosition: origPos.clone(),
      explodeDirection: dir,
      originalColor: part.color,
      originalEmissive: {
        color: mat.emissive ? mat.emissive.getHex() : 0x000000,
        intensity: mat.emissiveIntensity || 0,
      },
    };

    scene.add(partObj);
    activeMeshes.push(partObj);
    groupForBounds.add(partObj.clone());
  });

  // Calculate assembled bounding box to anchor contact shadow perfectly
  const bbox = new THREE.Box3().setFromObject(groupForBounds);
  const bottomY = bbox.min.y;
  const sizeX = bbox.max.x - bbox.min.x;
  const sizeZ = bbox.max.z - bbox.min.z;
  const footprint = Math.max(sizeX, sizeZ) * 1.5;

  if (contactShadowMesh) {
    contactShadowMesh.position.set(center.x, bottomY - 0.015, center.z);
    contactShadowMesh.scale.set(footprint, footprint, 1);
  }
  if (groundShadowPlane) {
    groundShadowPlane.position.set(center.x, bottomY - 0.02, center.z);
  }

  updateUI();
  renderSelectorGrid();
  renderModelDropdown();
  rebuildFloatingLabels();

  if (objData.parts.length > 0) {
    showExplanation(objData.parts[0], activeMeshes[0]);
  }
}

// -------------------------------------------------------------
// EXPLODE VIEW & SLIDER LOGIC
// -------------------------------------------------------------
function updateExplosion(factor) {
  const objData = OBJECTS[currentObjectId];
  if (!objData) return;
  const maxDist = objData.explodeDistance || 4;

  activeMeshes.forEach((mesh) => {
    const orig = mesh.userData.originalPosition;
    const dir = mesh.userData.explodeDirection;
    const offset = dir.clone().multiplyScalar(factor * maxDist);
    mesh.position.copy(orig).add(offset);
  });

  const pct = Math.round(factor * 100);
  const label = document.getElementById('explodeFactorLabel');
  if (label) {
    label.textContent = pct === 0 ? '0% (Assembled)' : pct === 100 ? '100% (Exploded)' : `${pct}%`;
  }

  if (isCalipersActive && (selectedMesh || hoveredMesh)) {
    updateCaliperLines(selectedMesh || hoveredMesh);
  }
}

function toggleExplode() {
  isExploded = !isExploded;
  targetExplodeFactor = isExploded ? 1.0 : 0.0;
  isUserDraggingSlider = false;
  isAutoPlayExplode = false;
  playSwooshSound(isExploded);
  updateToggleButtonUI();
}

function updateToggleButtonUI() {
  const text = document.getElementById('toggleExplodeText');
  if (!text) return;
  text.textContent = isExploded ? 'Reassemble' : 'Explode View';

  const playBtn = document.getElementById('autoPlayExplodeBtn');
  if (playBtn) {
    playBtn.textContent = isAutoPlayExplode ? '⏸ Pause' : '▶ Play';
  }
}

// -------------------------------------------------------------
// RECURSIVE COMPOUND HIGHLIGHTING
// -------------------------------------------------------------
function setMeshHighlight(obj, hexColor, intensity) {
  if (!obj) return;
  obj.traverse((child) => {
    if (child.isMesh && child.material && child.material.emissive) {
      if (!child.userData.origEmissive) {
        child.userData.origEmissive = {
          color: child.material.emissive.getHex(),
          intensity: child.material.emissiveIntensity || 0,
        };
      }
      child.material.emissive.setHex(hexColor);
      child.material.emissiveIntensity = intensity;
    }
  });
}

function resetMeshHighlight(obj) {
  if (!obj) return;
  obj.traverse((child) => {
    if (child.isMesh && child.material && child.material.emissive) {
      const orig = child.userData.origEmissive || { color: 0x000000, intensity: 0 };
      child.material.emissive.setHex(orig.color);
      child.material.emissiveIntensity = orig.intensity;
    }
  });
}

// -------------------------------------------------------------
// 3D CAD CALIPERS & BOUNDING BOX MEASUREMENT TOOL
// -------------------------------------------------------------
function toggleCalipers() {
  isCalipersActive = !isCalipersActive;
  playTactileClick(isCalipersActive ? 880 : 440);

  const btn = document.getElementById('toggleCalipersBtn');
  const txt = document.getElementById('calipersBtnText');
  if (btn) {
    if (isCalipersActive) {
      btn.classList.add('bg-cyan-600/30', 'border-cyan-500/70', 'text-cyan-300');
      if (txt) txt.textContent = 'Calipers: ON';
      const target = selectedMesh || (activeMeshes.length > 0 ? activeMeshes[0] : null);
      if (target) updateCaliperLines(target);
    } else {
      btn.classList.remove('bg-cyan-600/30', 'border-cyan-500/70', 'text-cyan-300');
      if (txt) txt.textContent = 'Calipers (3D)';
      removeCaliperLines();
    }
  }
}

function removeCaliperLines() {
  if (!caliperVisualGroup) return;
  while (caliperVisualGroup.children.length > 0) {
    const c = caliperVisualGroup.children[0];
    caliperVisualGroup.remove(c);
  }
}

function updateCaliperLines(targetObj) {
  removeCaliperLines();
  if (!isCalipersActive || !targetObj) return;

  const bbox = new THREE.Box3().setFromObject(targetObj);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  bbox.getSize(size);
  bbox.getCenter(center);

  // 3D Bounding Box Outline
  const boxGeom = new THREE.BoxGeometry(size.x, size.y, size.z);
  const edgesGeom = new THREE.EdgesGeometry(boxGeom);
  const lineMat = new THREE.LineDashedMaterial({
    color: 0x38bdf8,
    dashSize: 0.1,
    gapSize: 0.05,
    linewidth: 1.5,
  });
  const wire = new THREE.LineSegments(edgesGeom, lineMat);
  wire.computeLineDistances();
  wire.position.copy(center);
  caliperVisualGroup.add(wire);

  // Corner dimension ticks & axis indicators
  const tickMat = new THREE.LineBasicMaterial({ color: 0x0ea5e9, linewidth: 2 });
  const points = [
    new THREE.Vector3(bbox.min.x, bbox.min.y, bbox.max.z),
    new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.max.z),
    new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.max.z),
    new THREE.Vector3(bbox.max.x, bbox.max.y, bbox.max.z),
    new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.min.z),
    new THREE.Vector3(bbox.max.x, bbox.min.y, bbox.max.z),
  ];
  const ticksGeom = new THREE.BufferGeometry().setFromPoints(points);
  const ticks = new THREE.LineSegments(ticksGeom, tickMat);
  caliperVisualGroup.add(ticks);
}

// -------------------------------------------------------------
// INSPECTOR & SPECIFICATION DISPLAY
// -------------------------------------------------------------
function showExplanation(part, mesh) {
  if (!part) return;

  currentlyDisplayedPart = part;
  currentlyDisplayedMesh = mesh;
  if (typeof updateChatContext === 'function') updateChatContext();

  const category = getPartCategory(part);
  const dimensions = formatPartDimensions(part.geometry);
  const finish = getPartFinish(part);
  const hex = '#' + part.color.toString(16).padStart(6, '0');
  const initialDesc =
    part.description ||
    part.explanation ||
    `Core engineered component of ${OBJECTS[currentObjectId].label}.`;

  // Update Inspector Panel
  const actName = document.getElementById('activePartName');
  if (actName) actName.textContent = part.name;
  const inspCat = document.getElementById('inspectorCategory');
  if (inspCat) inspCat.textContent = category;
  const dimB = document.getElementById('dimensionsBadge');
  if (dimB) dimB.textContent = dimensions;
  const finB = document.getElementById('finishBadge');
  if (finB) finB.textContent = finish;
  const expT = document.getElementById('explanationText');
  if (expT) expT.textContent = initialDesc;
  const partColInd = document.getElementById('partColorIndicator');
  if (partColInd) partColInd.style.backgroundColor = hex;
  const inspDot = document.getElementById('inspectorDot');
  if (inspDot) inspDot.style.backgroundColor = hex;

  const expCard = document.getElementById('explanationCard');
  if (expCard) expCard.classList.remove('hidden');
  const reopenBtn = document.getElementById('reopenInspectorBtn');
  if (reopenBtn) reopenBtn.classList.add('hidden');

  // Update Sidebar Summary
  const sidebarDot = document.getElementById('sidebarPartDot');
  const sidebarName = document.getElementById('sidebarPartName');
  const sidebarCategory = document.getElementById('sidebarPartCategory');
  const sidebarDesc = document.getElementById('sidebarPartDesc');

  if (sidebarName) sidebarName.textContent = part.name;
  if (sidebarCategory) sidebarCategory.textContent = category;
  if (sidebarDesc) sidebarDesc.textContent = initialDesc;
  if (sidebarDot) sidebarDot.style.backgroundColor = hex;

  // Highlight active card in left sidebar parts list
  document.querySelectorAll('.part-card-item').forEach((card) => {
    const cardPartId = card.getAttribute('data-part-id');
    if (cardPartId === part.id) {
      card.classList.add('is-selected');
    } else {
      card.classList.remove('is-selected');
    }
  });

  // Highlight active row in specifications table
  document.querySelectorAll('.spec-table-row').forEach((row) => {
    const rowPartId = row.getAttribute('data-part-id');
    if (rowPartId === part.id) {
      row.classList.add('bg-[#1a2333]', 'text-white');
    } else {
      row.classList.remove('bg-[#1a2333]', 'text-white');
    }
  });

  // Update Caliper dimensions if active
  if (isCalipersActive && mesh) {
    updateCaliperLines(mesh);
  }

  // Enrich via API if backend connected with active explanation depth level
  const objectLabel = OBJECTS[currentObjectId].label;
  const reqLevel = currentExplanationLevel;
  getDescription(currentObjectId, part.id, objectLabel, part.name, reqLevel)
    .then((res) => {
      const activeName = document.getElementById('activePartName');
      if (activeName && activeName.textContent === part.name && currentExplanationLevel === reqLevel) {
        if (res && res.description && res.description.length > 10) {
          if (expT) expT.textContent = res.description;
          if (sidebarDesc) sidebarDesc.textContent = res.description;
        }
      }
    })
    .catch(() => {});
}

function setExplanationLevel(level) {
  if (level !== 'simple' && level !== 'technical') level = 'simple';
  currentExplanationLevel = level;
  window.currentExplanationLevel = currentExplanationLevel;

  const simpleBtn = document.getElementById('depthSimpleBtn');
  const techBtn = document.getElementById('depthTechnicalBtn');

  if (simpleBtn && techBtn) {
    if (level === 'simple') {
      simpleBtn.className = 'px-2 py-0.5 rounded font-medium transition-all bg-blue-600 text-white shadow-sm';
      techBtn.className = 'px-2 py-0.5 rounded font-medium text-slate-400 hover:text-white transition-all';
    } else {
      simpleBtn.className = 'px-2 py-0.5 rounded font-medium text-slate-400 hover:text-white transition-all';
      techBtn.className = 'px-2 py-0.5 rounded font-medium transition-all bg-blue-600 text-white shadow-sm';
    }
  }

  // Switching the toggle while a part is already selected should immediately re-fetch (or pull from cache) and update the displayed explanation for the new level
  const targetPart = currentlyDisplayedPart || (selectedMesh && selectedMesh.userData?.partData);
  if (targetPart) {
    const objectLabel = OBJECTS[currentObjectId]?.label || 'Object';
    const expT = document.getElementById('explanationText');
    const sidebarDesc = document.getElementById('sidebarPartDesc');

    const cacheKey = `${currentObjectId}:${targetPart.id}:${level}`;
    if (descriptionCache[cacheKey]) {
      const cached = descriptionCache[cacheKey];
      if (expT && cached.description) expT.textContent = cached.description;
      if (sidebarDesc && cached.description) sidebarDesc.textContent = cached.description;
    } else {
      if (expT) expT.textContent = `Loading ${level} explanation...`;
      getDescription(currentObjectId, targetPart.id, objectLabel, targetPart.name, level)
        .then((res) => {
          if (currentExplanationLevel === level && res && res.description) {
            if (expT) expT.textContent = res.description;
            if (sidebarDesc) sidebarDesc.textContent = res.description;
          }
        })
        .catch(() => {
          if (expT && targetPart.description) expT.textContent = targetPart.description;
        });
    }
  }
}
window.setExplanationLevel = setExplanationLevel;

function showOnboardingModal() {
  const modal = document.getElementById('onboardingModal');
  if (modal) modal.classList.remove('hidden');
}
window.showOnboardingModal = showOnboardingModal;

function dismissOnboardingModal() {
  const modal = document.getElementById('onboardingModal');
  if (modal) modal.classList.add('hidden');
  try {
    localStorage.setItem('3d_visualizer_onboarded_v1', 'true');
  } catch (err) {
    // Graceful fallback if localStorage is disabled/restricted
  }
}
window.dismissOnboardingModal = dismissOnboardingModal;

function checkFirstVisitOnboarding() {
  try {
    const isDismissed = localStorage.getItem('3d_visualizer_onboarded_v1');
    if (!isDismissed) {
      showOnboardingModal();
    }
  } catch (err) {
    showOnboardingModal();
  }
}
window.checkFirstVisitOnboarding = checkFirstVisitOnboarding;

// -------------------------------------------------------------
// MINI CHATBOX Q&A CONTROLLER (AI-Powered Component Doubts)
// -------------------------------------------------------------
let chatHistory = [];
let isChatSending = false;

const CHAT_API_URL = window.location.protocol.startsWith('http')
  ? '/api/chat'
  : 'http://localhost:3001/api/chat';

function updateChatContext() {
  const modelEl = document.getElementById('chatActiveContextModel');
  const partEl = document.getElementById('chatActiveContextPart');
  const activeObj = OBJECTS[currentObjectId];

  if (modelEl) {
    modelEl.textContent = activeObj?.label || '3D Assembly';
  }
  if (partEl) {
    if (currentlyDisplayedPart) {
      partEl.textContent = ' • ' + currentlyDisplayedPart.name;
    } else if (selectedMesh && selectedMesh.userData?.partData) {
      partEl.textContent = ' • ' + selectedMesh.userData.partData.name;
    } else {
      partEl.textContent = '';
    }
  }
}
window.updateChatContext = updateChatContext;

function toggleChatbox(forceState) {
  const panel = document.getElementById('chatboxPanel');
  const toggleBtn = document.getElementById('chatboxToggleBtn');
  if (!panel || !toggleBtn) return;

  const shouldOpen = typeof forceState === 'boolean' ? forceState : panel.classList.contains('hidden');
  if (shouldOpen) {
    panel.classList.remove('hidden');
    toggleBtn.classList.add('hidden');
    updateChatContext();
    scrollChatToBottom();
    setTimeout(() => {
      document.getElementById('chatInput')?.focus();
    }, 150);
  } else {
    panel.classList.add('hidden');
    toggleBtn.classList.remove('hidden');
  }
}
window.toggleChatbox = toggleChatbox;

function scrollChatToBottom() {
  const msgContainer = document.getElementById('chatMessages');
  if (msgContainer) {
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }
}

function appendUserMessage(text) {
  const msgContainer = document.getElementById('chatMessages');
  if (!msgContainer) return;

  const row = document.createElement('div');
  row.className = 'flex gap-2.5 ml-auto max-w-[85%] justify-end animate-in fade-in duration-150';
  row.innerHTML = `
    <div class="bg-[#1e293b] border border-[#334155] text-slate-100 rounded-xl rounded-tr-none px-3.5 py-2.5 shadow-sm text-xs leading-relaxed">
      ${escapeHtml(text)}
    </div>
  `;
  msgContainer.appendChild(row);
  scrollChatToBottom();
}

function appendAssistantMessage(text, source) {
  const msgContainer = document.getElementById('chatMessages');
  if (!msgContainer) return;

  const row = document.createElement('div');
  row.className = 'flex gap-2.5 mr-auto max-w-[95%] animate-in fade-in duration-200';
  row.innerHTML = `
    <div class="w-6 h-6 rounded-md bg-[#1a2332] border border-[#2d3a4e] flex items-center justify-center text-blue-400 shrink-0 text-[10px] font-mono font-bold mt-0.5">
      AI
    </div>
    <div class="space-y-1.5 flex-1">
      <div class="bg-[#141b26] border border-[#222d3e] text-slate-200 rounded-xl rounded-tl-none p-3 shadow-sm text-xs leading-relaxed">
        <p>${formatChatReply(text)}</p>
      </div>
      <div class="flex items-center gap-2 px-1 text-[9px] text-slate-500 font-mono">
        <span>${source === 'claude-ai' ? 'Claude 3.5 AI' : 'Technical Specialist AI'}</span>
        <span>•</span>
        <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  `;
  msgContainer.appendChild(row);
  scrollChatToBottom();
}

function formatChatReply(text) {
  if (!text) return '';
  let clean = escapeHtml(text);
  // Bold formatting: **text**
  clean = clean.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');
  // Italic formatting: *text*
  clean = clean.replace(/(^|[^\*])\*([^\*]+)\*([^\*]|$)/g, '$1<em class="text-slate-300">$2</em>$3');
  // Bullet items: lines starting with • or -
  clean = clean.replace(/^[•\-]\s+(.*)$/gm, '<div class="flex items-start gap-1.5 my-1"><span class="text-blue-400 font-bold shrink-0">•</span><span>$1</span></div>');
  // Paragraph breaks and newlines
  clean = clean.replace(/\n\n+/g, '</p><p class="mt-2">').replace(/\n/g, '<br/>');
  return clean;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendChatMessage(rawText) {
  const text = (rawText || '').trim();
  if (!text || isChatSending) return;

  const chatInput = document.getElementById('chatInput');
  if (chatInput) chatInput.value = '';

  appendUserMessage(text);
  chatHistory.push({ role: 'user', content: text });

  isChatSending = true;
  const typingIndicator = document.getElementById('chatTypingIndicator');
  const sendBtn = document.getElementById('chatSendBtn');
  if (typingIndicator) typingIndicator.classList.remove('hidden');
  if (sendBtn) sendBtn.disabled = true;
  scrollChatToBottom();

  const activeObj = OBJECTS[currentObjectId];
  const activePart = currentlyDisplayedPart || (selectedMesh && selectedMesh.userData?.partData);

  const payload = {
    message: text,
    history: chatHistory.slice(-6),
    context: {
      objectId: currentObjectId,
      objectLabel: activeObj?.label || 'Component Assembly',
      selectedPart: activePart
        ? {
            id: activePart.id,
            name: activePart.name,
            description: activePart.description || activePart.explanation || '',
          }
        : null,
      activeParts: (activeObj?.parts || []).map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description || p.explanation || '',
      })),
    },
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const replyText = data.reply || 'No response generated.';
    appendAssistantMessage(replyText, data.source);
    chatHistory.push({ role: 'assistant', content: replyText });
  } catch (err) {
    console.warn('Chat request fallback:', err.message);
    const fallbackText = `Regarding "${text}": In the ${payload.context.objectLabel}, components maintain precise mechanical tolerances, thermal dissipation, and electrical pathways. You can select specific parts in the 3D viewport or explode the assembly to inspect individual functions.`;
    appendAssistantMessage(fallbackText, 'fallback');
    chatHistory.push({ role: 'assistant', content: fallbackText });
  } finally {
    isChatSending = false;
    if (typingIndicator) typingIndicator.classList.add('hidden');
    if (sendBtn) sendBtn.disabled = false;
    scrollChatToBottom();
  }
}
window.sendChatMessage = sendChatMessage;

function clearChatHistory() {
  chatHistory = [];
  const msgContainer = document.getElementById('chatMessages');
  if (!msgContainer) return;

  msgContainer.innerHTML = `
    <div class="flex gap-2.5 mr-auto max-w-[95%]">
      <div class="w-6 h-6 rounded-md bg-[#1a2332] border border-[#2d3a4e] flex items-center justify-center text-blue-400 shrink-0 text-[10px] font-mono font-bold mt-0.5">
        AI
      </div>
      <div class="space-y-2">
        <div class="bg-[#141b26] border border-[#222d3e] text-slate-200 rounded-xl rounded-tl-none p-3 shadow-sm space-y-1.5">
          <p>Conversation cleared. Feel free to ask about any component, assembly doubt, or engineering principle.</p>
        </div>
        <div id="chatStarterChips" class="flex flex-wrap gap-1.5 pt-1">
          <button type="button" class="chat-chip px-2.5 py-1 rounded-lg bg-[#141b26] hover:bg-[#1c2534] border border-[#232f42] text-[11px] text-slate-300 hover:text-white transition-colors text-left">
            What does this component do?
          </button>
          <button type="button" class="chat-chip px-2.5 py-1 rounded-lg bg-[#141b26] hover:bg-[#1c2534] border border-[#232f42] text-[11px] text-slate-300 hover:text-white transition-colors text-left">
            What materials are used?
          </button>
          <button type="button" class="chat-chip px-2.5 py-1 rounded-lg bg-[#141b26] hover:bg-[#1c2534] border border-[#232f42] text-[11px] text-slate-300 hover:text-white transition-colors text-left">
            How does the whole assembly operate?
          </button>
        </div>
      </div>
    </div>
  `;
  bindChatStarterChips();
}

function bindChatStarterChips() {
  document.querySelectorAll('.chat-chip').forEach((btn) => {
    btn.onclick = () => {
      playTactileClick(600);
      const prompt = btn.textContent.trim();
      sendChatMessage(prompt);
    };
  });
}

// -------------------------------------------------------------
// MOUSE & RAYCASTING INTERACTION CONTROLLER
// -------------------------------------------------------------
function resolveRootPartObject(hitObject) {
  let target = hitObject;
  while (target && !target.userData?.partData && target.parent && target.parent !== scene) {
    target = target.parent;
  }
  return target && target.userData?.partData ? target : null;
}

function onMouseMove(event) {
  if (!mount) return;
  const rect = mount.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(activeMeshes, true);

  if (intersects.length > 0) {
    const hitObj = intersects[0].object;
    const rootPart = resolveRootPartObject(hitObj);

    if (rootPart && hoveredMesh !== rootPart) {
      if (hoveredMesh && hoveredMesh !== selectedMesh) {
        resetMeshHighlight(hoveredMesh);
      }
      hoveredMesh = rootPart;
      if (hoveredMesh !== selectedMesh) {
        setMeshHighlight(hoveredMesh, 0x38bdf8, 0.28);
      }
      showExplanation(hoveredMesh.userData.partData, hoveredMesh);
      if (isXRayMode) updateXRayVisuals();
    }
  } else {
    if (hoveredMesh && hoveredMesh !== selectedMesh) {
      resetMeshHighlight(hoveredMesh);
      hoveredMesh = null;
      if (isXRayMode) updateXRayVisuals();
    }
  }
}

function onCanvasClick(event) {
  const dist = Math.hypot(event.clientX - pointerDownPos.x, event.clientY - pointerDownPos.y);
  const elapsed = Date.now() - pointerDownPos.time;
  if (dist > 6 || elapsed > 350) return;

  if (hoveredMesh) {
    playTactileClick(760);
    if (selectedMesh && selectedMesh !== hoveredMesh) {
      resetMeshHighlight(selectedMesh);
    }
    selectedMesh = hoveredMesh;
    setMeshHighlight(selectedMesh, 0xf59e0b, 0.45);
    showExplanation(selectedMesh.userData.partData, selectedMesh);
    if (isXRayMode) updateXRayVisuals();
  } else {
    toggleExplode();
  }
}

// -------------------------------------------------------------
// SMOOTH CAMERA TRANSITIONS
// -------------------------------------------------------------
function startCameraTransition(targetCamPos, targetLookAt, duration = 750) {
  cameraTransition = {
    startCamPos: camera.position.clone(),
    endCamPos: targetCamPos.clone(),
    startLookAt: controls.target.clone(),
    endLookAt: targetLookAt.clone(),
    startTime: performance.now(),
    duration,
  };
}

function updateCameraTransition() {
  if (!cameraTransition) return;
  const now = performance.now();
  const elapsed = now - cameraTransition.startTime;
  const t = Math.min(1.0, elapsed / cameraTransition.duration);
  const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  camera.position.lerpVectors(cameraTransition.startCamPos, cameraTransition.endCamPos, ease);
  controls.target.lerpVectors(cameraTransition.startLookAt, cameraTransition.endLookAt, ease);
  controls.update();

  if (t >= 1.0) {
    cameraTransition = null;
  }
}

function focusOnActivePart() {
  const part = selectedMesh || (activeMeshes.length > 0 ? activeMeshes[0] : null);
  if (!part) return;
  focusOnSpecificPartObject(part);
}

function focusOnSpecificPartObject(partObj) {
  playTactileClick(840);
  const bbox = new THREE.Box3().setFromObject(partObj);
  const targetPos = new THREE.Vector3();
  bbox.getCenter(targetPos);

  const size = new THREE.Vector3();
  bbox.getSize(size);
  const maxDim = Math.max(size.x, size.y, size.z, 0.5);
  const dist = maxDim * 2.5;

  const endCamPos = new THREE.Vector3(
    targetPos.x + dist * 0.7,
    targetPos.y + dist * 0.5,
    targetPos.z + dist * 0.85
  );

  startCameraTransition(endCamPos, targetPos, 700);
}

function resetCameraView() {
  playTactileClick(520);
  const objData = OBJECTS[currentObjectId];
  if (!objData) return;
  const r = objData.viewRadius || 15;
  const endCamPos = new THREE.Vector3(r * 0.72, r * 0.52, r * 0.82);
  const endTarget = new THREE.Vector3(0, 0, 0);

  isExploded = false;
  targetExplodeFactor = 0;
  currentExplodeFactor = 0;
  isUserDraggingSlider = false;
  isAutoPlayExplode = false;
  updateExplosion(0);

  const slider = document.getElementById('explodeSlider');
  if (slider) slider.value = 0;
  updateToggleButtonUI();

  if (selectedMesh) {
    resetMeshHighlight(selectedMesh);
    selectedMesh = null;
  }
  if (isXRayMode) updateXRayVisuals();

  startCameraTransition(endCamPos, endTarget, 650);
}

// -------------------------------------------------------------
// INTERACTIVE MODES: WIREFRAME, X-RAY, LIGHTING PRESETS
// -------------------------------------------------------------
function toggleWireframe() {
  isWireframe = !isWireframe;
  window.isWireframe = isWireframe;
  playTactileClick(isWireframe ? 720 : 420);

  activeMeshes.forEach((obj) => {
    obj.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.wireframe = isWireframe;
      }
    });
  });

  const btn = document.getElementById('toggleWireframeBtn');
  if (btn) {
    if (isWireframe) {
      btn.classList.add('bg-blue-600/30', 'border-blue-500/60', 'text-blue-300');
    } else {
      btn.classList.remove('bg-blue-600/30', 'border-blue-500/60', 'text-blue-300');
    }
  }
}

function toggleAutoRotate() {
  isAutoRotate = !isAutoRotate;
  controls.autoRotate = isAutoRotate;
  controls.autoRotateSpeed = 1.2;
  playTactileClick(isAutoRotate ? 660 : 380);

  const btnText = document.getElementById('autoRotateText');
  if (btnText) btnText.textContent = isAutoRotate ? 'Stop Rotate' : 'Auto-Rotate';
  const btn = document.getElementById('toggleAutoRotateBtn');
  if (btn) {
    if (isAutoRotate) {
      btn.classList.add('bg-blue-600/30', 'border-blue-500/60', 'text-blue-300');
    } else {
      btn.classList.remove('bg-blue-600/30', 'border-blue-500/60', 'text-blue-300');
    }
  }
}

function toggleXRayMode() {
  isXRayMode = !isXRayMode;
  playTactileClick(isXRayMode ? 780 : 400);
  updateXRayVisuals();

  const btn = document.getElementById('toggleXRayBtn');
  if (btn) {
    if (isXRayMode) {
      btn.classList.add('bg-sky-500/25', 'border-sky-500/70', 'text-sky-300');
    } else {
      btn.classList.remove('bg-sky-500/25', 'border-sky-500/70', 'text-sky-300');
    }
  }
}

function updateXRayVisuals() {
  activeMeshes.forEach((partObj) => {
    const isTarget =
      (selectedMesh && partObj === selectedMesh) || (hoveredMesh && partObj === hoveredMesh);

    partObj.traverse((child) => {
      if (child.isMesh && child.material) {
        if (isXRayMode) {
          if (isTarget || !selectedMesh) {
            child.material.transparent = child.userData.origTransparent || false;
            child.material.opacity = child.userData.origOpacity !== undefined ? child.userData.origOpacity : 1.0;
            child.material.depthWrite = true;
          } else {
            child.material.transparent = true;
            child.material.opacity = 0.16;
            child.material.depthWrite = false;
          }
        } else {
          child.material.transparent = child.userData.origTransparent || false;
          child.material.opacity = child.userData.origOpacity !== undefined ? child.userData.origOpacity : 1.0;
          child.material.depthWrite = true;
        }
      }
    });
  });
}

function applyLightingPreset(presetKey) {
  const p = LIGHTING_PRESETS[presetKey] || LIGHTING_PRESETS.studio;
  if (scene) scene.background = new THREE.Color(p.bg);
  if (dirLight1) {
    dirLight1.color.setHex(p.keyColor);
    dirLight1.intensity = p.keyIntensity;
  }
  if (dirLight2) {
    dirLight2.color.setHex(p.fillColor);
    dirLight2.intensity = p.fillIntensity;
  }
  if (rimLight) {
    rimLight.color.setHex(p.rimColor);
    rimLight.intensity = p.rimIntensity;
  }
  if (ambientLight) {
    ambientLight.color.setHex(p.ambientColor);
    ambientLight.intensity = p.ambientIntensity;
  }
  if (renderer) {
    renderer.toneMappingExposure = p.exposure;
  }
  const btnText = document.getElementById('lightingPresetText');
  if (btnText) btnText.textContent = p.name;
}

function cycleLightingPreset() {
  currentPresetIndex = (currentPresetIndex + 1) % PRESET_KEYS.length;
  applyLightingPreset(PRESET_KEYS[currentPresetIndex]);
  playTactileClick(600 + currentPresetIndex * 100);
}

function onWindowResize() {
  if (!mount || !renderer || !camera) return;
  const w = mount.clientWidth || window.innerWidth;
  const h = mount.clientHeight || window.innerHeight;
  camera.aspect = w / (h || 1);
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

// -------------------------------------------------------------
// FLOATING LEADER-LINE LABELS ENGINE
// -------------------------------------------------------------
let floatingLabels = [];
const _projVector = new THREE.Vector3();

function rebuildFloatingLabels() {
  const svg = document.getElementById('leaderLinesSvg');
  const wrap = document.getElementById('labelsDivWrap');
  if (!svg || !wrap) return;

  svg.innerHTML = '';
  wrap.innerHTML = '';
  floatingLabels = [];

  activeMeshes.forEach((mesh) => {
    const part = mesh.userData.partData;
    const hex = '#' + part.color.toString(16).padStart(6, '0');

    const lineEl = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineEl.setAttribute('stroke', '#38bdf8');
    lineEl.setAttribute('stroke-opacity', '0.45');
    lineEl.setAttribute('stroke-width', '1.2');
    lineEl.setAttribute('stroke-dasharray', '3,2');
    svg.appendChild(lineEl);

    const dotEl = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dotEl.setAttribute('r', '2.5');
    dotEl.setAttribute('fill', hex);
    dotEl.setAttribute('stroke', '#0b0e14');
    dotEl.setAttribute('stroke-width', '1');
    svg.appendChild(dotEl);

    const labelEl = document.createElement('div');
    labelEl.className =
      'absolute pointer-events-auto cursor-pointer select-none transition-transform duration-75 hover:scale-105 group';
    labelEl.setAttribute('data-part-id', part.id);
    labelEl.style.left = '0px';
    labelEl.style.top = '0px';
    labelEl.innerHTML = `
      <div class="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#101622]/90 border border-[#2b3a4f] text-[10px] text-slate-200 font-mono shadow-md backdrop-blur-sm group-hover:border-blue-400 group-hover:text-white transition-colors">
        <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${hex}"></span>
        <span>${part.name}</span>
      </div>
    `;

    labelEl.addEventListener('click', (e) => {
      e.stopPropagation();
      playTactileClick(780);
      if (selectedMesh) resetMeshHighlight(selectedMesh);
      selectedMesh = mesh;
      setMeshHighlight(selectedMesh, 0xf59e0b, 0.45);
      showExplanation(part, mesh);
      focusOnSpecificPartObject(mesh);
      if (isXRayMode) updateXRayVisuals();
    });

    wrap.appendChild(labelEl);

    floatingLabels.push({
      mesh,
      lineEl,
      dotEl,
      labelEl,
    });
  });
}

function updateFloatingLabels() {
  const container = document.getElementById('labelsContainer');
  if (!container || !mount) return;

  if (currentExplodeFactor < 0.12 || !activeMeshes.length) {
    container.style.opacity = '0';
    return;
  }

  container.style.opacity = '1';
  const width = mount.clientWidth;
  const height = mount.clientHeight;

  floatingLabels.forEach((item) => {
    if (!item.mesh.visible) {
      item.labelEl.style.display = 'none';
      item.lineEl.style.display = 'none';
      item.dotEl.style.display = 'none';
      return;
    }
    item.labelEl.style.display = '';
    item.lineEl.style.display = '';
    item.dotEl.style.display = '';

    _projVector.setFromMatrixPosition(item.mesh.matrixWorld);
    _projVector.project(camera);

    if (_projVector.z > 1) {
      item.labelEl.style.display = 'none';
      item.lineEl.style.display = 'none';
      item.dotEl.style.display = 'none';
      return;
    }

    const screenX = (_projVector.x * 0.5 + 0.5) * width;
    const screenY = (-(_projVector.y * 0.5) + 0.5) * height;

    const offsetX = _projVector.x >= 0 ? 55 : -55;
    const offsetY = _projVector.y >= 0 ? -35 : 35;
    const labelX = screenX + offsetX;
    const labelY = screenY + offsetY;

    item.labelEl.style.transform = `translate(${labelX}px, ${labelY}px) translate(-50%, -50%)`;
    item.lineEl.setAttribute('x1', screenX);
    item.lineEl.setAttribute('y1', screenY);
    item.lineEl.setAttribute('x2', labelX);
    item.lineEl.setAttribute('y2', labelY);
    item.dotEl.setAttribute('cx', screenX);
    item.dotEl.setAttribute('cy', screenY);
  });
}

// -------------------------------------------------------------
// MAIN RENDER ANIMATION LOOP
// -------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);

  const delta = appClock.getDelta();
  const time = appClock.getElapsedTime();

  // Update procedural mechanical animations (Fans, Rotors, Atoms, Planets)
  if (typeof updateAnimatedComponents === 'function') {
    updateAnimatedComponents(delta, time);
  }

  updateCameraTransition();

  // Auto-play explode cycle
  if (isAutoPlayExplode) {
    targetExplodeFactor += delta * 0.35 * autoPlayDirection;
    if (targetExplodeFactor >= 1.0) {
      targetExplodeFactor = 1.0;
      autoPlayDirection = -1;
    } else if (targetExplodeFactor <= 0.0) {
      targetExplodeFactor = 0.0;
      autoPlayDirection = 1;
    }
  }

  // Smooth explode interpolation
  if (!isUserDraggingSlider) {
    const diff = targetExplodeFactor - currentExplodeFactor;
    if (Math.abs(diff) > 0.001) {
      currentExplodeFactor += diff * 0.09;
      updateExplosion(currentExplodeFactor);
      const slider = document.getElementById('explodeSlider');
      if (slider) slider.value = currentExplodeFactor;
    } else if (currentExplodeFactor !== targetExplodeFactor) {
      currentExplodeFactor = targetExplodeFactor;
      updateExplosion(currentExplodeFactor);
      const slider = document.getElementById('explodeSlider');
      if (slider) slider.value = currentExplodeFactor;
    }
  }

  if (controls) controls.update();
  if (renderer && scene && camera) renderer.render(scene, camera);
  updateFloatingLabels();
}

// -------------------------------------------------------------
// UI BUILDER & INTERACTIVITY CONTROLLERS
// -------------------------------------------------------------
function updateUI() {
  const obj = OBJECTS[currentObjectId];
  if (!obj) return;

  const heading = document.getElementById('currentObjectHeading');
  if (heading) heading.textContent = obj.label;
  const subhead = document.getElementById('currentObjectSubhead');
  if (subhead) subhead.textContent = `${obj.parts.length} components • Click any part to inspect`;
  const badge = document.getElementById('partCountBadge');
  if (badge) badge.textContent = `${obj.parts.length} parts`;
  const tblName = document.getElementById('tableModelName');
  if (tblName) tblName.textContent = obj.label;

  renderPartsList();
  renderSpecificationsTable();
}

// -------------------------------------------------------------
// RENDER PARTS LIST (EVEN, CLEAN, ACCESSIBLE WITH ACTIONS)
// -------------------------------------------------------------
function renderPartsList() {
  const obj = OBJECTS[currentObjectId];
  if (!obj) return;

  const partsList = document.getElementById('partsList');
  if (!partsList) return;
  partsList.innerHTML = '';

  const q = partSearchFilterText.toLowerCase().trim();
  const visibleParts = obj.parts.filter((p) => {
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || (p.id && p.id.toLowerCase().includes(q));
  });

  const partCountBadge = document.getElementById('partCountBadge');
  if (partCountBadge) {
    partCountBadge.textContent = `${visibleParts.length} / ${obj.parts.length} parts`;
  }

  visibleParts.forEach((part, index) => {
    const category = getPartCategory(part);
    const hex = '#' + part.color.toString(16).padStart(6, '0');
    const mesh = activeMeshes.find((m) => m.userData.partData.id === part.id);
    const isHidden = mesh && !mesh.visible;
    const isSelected = selectedMesh && selectedMesh.userData?.partData?.id === part.id;

    const card = document.createElement('div');
    card.setAttribute('data-part-id', part.id);
    card.className = `part-card-item w-full px-3 py-2.5 rounded-lg border text-left flex items-center justify-between group cursor-pointer shadow-sm ${
      isSelected
        ? 'is-selected'
        : isHidden
        ? 'is-hidden bg-[#0c1017] border-[#1d2636]'
        : 'bg-[#121824] border-[#222d3e] hover:bg-[#182130] hover:border-[#354663]'
    }`;

    card.innerHTML = `
      <div class="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
        <span class="text-[10px] font-mono text-slate-400 bg-[#161f2e] px-1.5 py-0.5 rounded border border-[#253245] shrink-0 font-semibold">${String(
          index + 1
        ).padStart(2, '0')}</span>
        <span class="w-3 h-3 rounded-full shrink-0 border border-black/40 shadow-sm" style="background-color: ${hex}"></span>
        <div class="min-w-0 flex-1">
          <div class="text-xs font-semibold text-slate-100 group-hover:text-white truncate">${part.name}</div>
          <div class="text-[10px] text-slate-400 font-mono tracking-tight truncate">${category}</div>
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex items-center gap-1 shrink-0">
        <!-- Visibility Eye Toggle -->
        <button type="button" class="part-vis-btn p-1 rounded hover:bg-[#202b3d] text-slate-400 hover:text-white transition-colors"
          data-part-id="${part.id}" title="${isHidden ? 'Show Part in 3D' : 'Hide Part in 3D'}">
          <svg class="w-3.5 h-3.5 ${isHidden ? 'text-rose-400' : 'text-slate-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            ${
              isHidden
                ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />`
                : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />`
            }
          </svg>
        </button>

        <!-- Focus Camera Button -->
        <button type="button" class="part-focus-btn p-1 rounded hover:bg-[#202b3d] text-slate-400 hover:text-sky-400 transition-colors"
          data-part-id="${part.id}" title="Focus Camera">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
      </div>
    `;

    // Click card body: Select and inspect
    card.addEventListener('click', (e) => {
      if (e.target.closest('.part-vis-btn') || e.target.closest('.part-focus-btn')) return;
      playTactileClick(740);
      if (mesh) {
        if (selectedMesh) resetMeshHighlight(selectedMesh);
        selectedMesh = mesh;
        setMeshHighlight(selectedMesh, 0xf59e0b, 0.45);
        showExplanation(part, mesh);
        if (isXRayMode) updateXRayVisuals();
      }
    });

    // Hover card: Preview highlight in 3D
    card.addEventListener('mouseenter', () => {
      if (mesh && mesh !== selectedMesh) {
        setMeshHighlight(mesh, 0x38bdf8, 0.28);
      }
    });
    card.addEventListener('mouseleave', () => {
      if (mesh && mesh !== selectedMesh) {
        resetMeshHighlight(mesh);
      }
    });

    // Eye toggle button event
    const visBtn = card.querySelector('.part-vis-btn');
    if (visBtn) {
      visBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playTactileClick(mesh && mesh.visible ? 350 : 650);
        if (mesh) {
          mesh.visible = !mesh.visible;
          renderPartsList();
        }
      });
    }

    // Focus camera button event
    const focusBtn = card.querySelector('.part-focus-btn');
    if (focusBtn) {
      focusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mesh) {
          if (selectedMesh) resetMeshHighlight(selectedMesh);
          selectedMesh = mesh;
          setMeshHighlight(selectedMesh, 0xf59e0b, 0.45);
          showExplanation(part, mesh);
          focusOnSpecificPartObject(mesh);
        }
      });
    }

    partsList.appendChild(card);
  });
}

// -------------------------------------------------------------
// RENDER SPECIFICATIONS TABLE BODY
// -------------------------------------------------------------
function renderSpecificationsTable() {
  const obj = OBJECTS[currentObjectId];
  if (!obj) return;

  const tableBody = document.getElementById('specificationsTableBody');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  obj.parts.forEach((part, index) => {
    const category = getPartCategory(part);
    const dimensions = formatPartDimensions(part.geometry);
    const finish = getPartFinish(part);
    const hex = '#' + part.color.toString(16).padStart(6, '0');

    const tr = document.createElement('tr');
    tr.setAttribute('data-part-id', part.id);
    tr.className =
      'spec-table-row border-b border-[#1f2838] hover:bg-[#151c28] transition-colors cursor-pointer text-xs';

    tr.innerHTML = `
      <td class="py-3 px-4 font-mono text-slate-400 text-center">${String(index + 1).padStart(2, '0')}</td>
      <td class="py-3 px-4">
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full shrink-0 border border-black/30" style="background-color: ${hex}"></span>
          <span class="font-medium text-slate-200">${part.name}</span>
        </div>
      </td>
      <td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-[#161d2a] border border-[#253245] text-[10px] text-slate-300">${category}</span></td>
      <td class="py-3 px-4 font-mono text-slate-300 text-[11px]">${dimensions}</td>
      <td class="py-3 px-4 text-slate-400">${finish}</td>
      <td class="py-3 px-4 text-slate-300 leading-snug">${part.description || 'Core engineering component.'}</td>
      <td class="py-3 px-4 text-right">
        <button type="button" class="px-2 py-1 rounded bg-[#1c2536] hover:bg-[#25334a] text-blue-400 hover:text-white text-[10px] font-medium transition-colors">
          Inspect
        </button>
      </td>
    `;

    tr.addEventListener('click', () => {
      playTactileClick(750);
      const mesh = activeMeshes.find((m) => m.userData.partData.id === part.id);
      if (mesh) {
        if (selectedMesh) resetMeshHighlight(selectedMesh);
        selectedMesh = mesh;
        setMeshHighlight(selectedMesh, 0xf59e0b, 0.45);
        showExplanation(part, mesh);
        focusOnSpecificPartObject(mesh);
        if (isXRayMode) updateXRayVisuals();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    tableBody.appendChild(tr);
  });
}

// -------------------------------------------------------------
// MODEL SELECTOR & CATEGORIES (EVEN CARDS WITH ICONS)
// -------------------------------------------------------------
const CATEGORY_TABS = ['All', 'Electronics', 'Vehicles', 'Appliances', 'Science'];
let activeCategoryTab = 'All';

function renderCategoryTabs() {
  const container = document.getElementById('categoryTabsRow');
  if (!container) return;
  container.innerHTML = '';

  CATEGORY_TABS.forEach((cat) => {
    const isActive = activeCategoryTab === cat;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `px-2.5 py-1 text-[10px] rounded-md whitespace-nowrap transition-all border font-medium ${
      isActive
        ? 'bg-blue-600/25 border-blue-500/70 text-blue-300 shadow-sm font-semibold'
        : 'bg-[#121824] border-[#222d3e] text-slate-400 hover:text-slate-200 hover:border-[#334259]'
    }`;
    btn.textContent = cat;
    btn.onclick = () => {
      playTactileClick(600);
      activeCategoryTab = cat;
      renderCategoryTabs();
      renderSelectorGrid();
    };
    container.appendChild(btn);
  });
}

function renderSelectorGrid() {
  const grid = document.getElementById('objectSelectorGrid');
  const badge = document.getElementById('libraryCountBadge');
  if (!grid) return;
  grid.innerHTML = '';

  const allIds = Object.keys(OBJECTS);
  const filteredIds = allIds.filter((id) => {
    if (activeCategoryTab === 'All') return true;
    return OBJECTS[id].category === activeCategoryTab;
  });

  if (badge) {
    badge.textContent = `${filteredIds.length} models`;
  }

  filteredIds.forEach((id) => {
    const def = OBJECTS[id];
    const isActive = currentObjectId === id;
    const icon = def.icon || '📦';

    const card = document.createElement('button');
    card.type = 'button';
    card.className = `model-card-item p-2 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
      isActive
        ? 'is-active-model'
        : 'bg-[#121824] border-[#222d3e] hover:bg-[#182130] text-slate-300'
    }`;

    card.innerHTML = `
      <div class="w-7 h-7 rounded-md bg-[#192232] border border-[#27364b] flex items-center justify-center text-sm shrink-0">
        ${icon}
      </div>
      <div class="min-w-0 flex-1 leading-tight">
        <div class="text-xs font-semibold text-slate-100 truncate">${def.label}</div>
        <div class="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
          <span>${def.parts ? def.parts.length : 0} parts</span>
          <span>•</span>
          <span class="truncate">${def.category || 'General'}</span>
        </div>
      </div>
    `;

    card.onclick = () => {
      playTactileClick(700);
      switchModel(id);
    };

    grid.appendChild(card);
  });
}

function renderModelDropdown() {
  const dropdown = document.getElementById('modelSelectDropdown');
  if (!dropdown) return;
  dropdown.innerHTML = '';

  const allIds = Object.keys(OBJECTS);
  allIds.forEach((id) => {
    const def = OBJECTS[id];
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = `${def.icon || ''} ${def.label} (${def.category || 'General'})`;
    if (currentObjectId === id) opt.selected = true;
    dropdown.appendChild(opt);
  });

  dropdown.onchange = (e) => {
    switchModel(e.target.value);
  };
}

function renderModelSelectors() {
  renderCategoryTabs();
  renderSelectorGrid();
  renderModelDropdown();
}

function switchModel(id) {
  if (id === currentObjectId && activeMeshes.length > 0) return;
  const loader = document.getElementById('canvasLoader');
  if (loader) loader.classList.remove('hidden');
  setTimeout(() => {
    loadObject(id);
    renderModelSelectors();
    if (loader) loader.classList.add('hidden');
  }, 40);
}

// -------------------------------------------------------------
// SIDEBAR VIEW MODE SWITCHER (BALANCED, PARTS ONLY, MODELS ONLY)
// -------------------------------------------------------------
function setSidebarViewMode(mode) {
  sidebarViewMode = mode;
  playTactileClick(620);

  const modelSec = document.getElementById('sidebarModelSection');
  const partsSec = document.getElementById('sidebarPartsSection');

  const btnBalanced = document.getElementById('viewModeBalanced');
  const btnParts = document.getElementById('viewModeParts');
  const btnModels = document.getElementById('viewModeModels');

  [btnBalanced, btnParts, btnModels].forEach((b) => {
    if (b) {
      b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm');
      b.classList.add('text-slate-400');
    }
  });

  if (mode === 'balanced') {
    if (btnBalanced) {
      btnBalanced.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      btnBalanced.classList.remove('text-slate-400');
    }
    if (modelSec) {
      modelSec.style.display = 'flex';
      modelSec.style.flex = '0 0 42%';
    }
    if (partsSec) {
      partsSec.style.display = 'flex';
      partsSec.style.flex = '1 1 58%';
    }
  } else if (mode === 'parts') {
    if (btnParts) {
      btnParts.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      btnParts.classList.remove('text-slate-400');
    }
    if (modelSec) {
      modelSec.style.display = 'none';
    }
    if (partsSec) {
      partsSec.style.display = 'flex';
      partsSec.style.flex = '1 1 100%';
    }
  } else if (mode === 'models') {
    if (btnModels) {
      btnModels.classList.add('bg-blue-600', 'text-white', 'shadow-sm');
      btnModels.classList.remove('text-slate-400');
    }
    if (partsSec) {
      partsSec.style.display = 'none';
    }
    if (modelSec) {
      modelSec.style.display = 'flex';
      modelSec.style.flex = '1 1 100%';
    }
  }
}

// -------------------------------------------------------------
// EVENT HANDLERS & BINDINGS
// -------------------------------------------------------------
function setupAppListeners() {
  initThree();
  renderModelSelectors();

  // Sidebar Mode Switcher Buttons
  document.getElementById('viewModeBalanced')?.addEventListener('click', () => setSidebarViewMode('balanced'));
  document.getElementById('viewModeParts')?.addEventListener('click', () => setSidebarViewMode('parts'));
  document.getElementById('viewModeModels')?.addEventListener('click', () => setSidebarViewMode('models'));

  // Live Component Filter Input
  const partFilterInput = document.getElementById('partFilterInput');
  if (partFilterInput) {
    partFilterInput.addEventListener('input', (e) => {
      partSearchFilterText = e.target.value;
      renderPartsList();
    });
  }

  // Show All Hidden Parts Button
  document.getElementById('showAllPartsBtn')?.addEventListener('click', () => {
    playTactileClick(640);
    activeMeshes.forEach((m) => {
      m.visible = true;
    });
    renderPartsList();
  });

  // Explode slider
  const explodeSlider = document.getElementById('explodeSlider');
  if (explodeSlider) {
    explodeSlider.addEventListener('input', (e) => {
      isUserDraggingSlider = true;
      isAutoPlayExplode = false;
      currentExplodeFactor = parseFloat(e.target.value);
      targetExplodeFactor = currentExplodeFactor;
      isExploded = currentExplodeFactor > 0.5;
      updateToggleButtonUI();
      updateExplosion(currentExplodeFactor);
    });

    explodeSlider.addEventListener('change', () => {
      isUserDraggingSlider = false;
    });
  }

  // CAD Explode Preset Buttons
  document.getElementById('preset0Btn')?.addEventListener('click', () => {
    playTactileClick(500);
    isAutoPlayExplode = false;
    isExploded = false;
    targetExplodeFactor = 0;
    updateToggleButtonUI();
  });
  document.getElementById('preset50Btn')?.addEventListener('click', () => {
    playTactileClick(650);
    isAutoPlayExplode = false;
    isExploded = true;
    targetExplodeFactor = 0.5;
    updateToggleButtonUI();
  });
  document.getElementById('preset100Btn')?.addEventListener('click', () => {
    playTactileClick(800);
    isAutoPlayExplode = false;
    isExploded = true;
    targetExplodeFactor = 1.0;
    updateToggleButtonUI();
  });
  document.getElementById('autoPlayExplodeBtn')?.addEventListener('click', () => {
    playTactileClick(700);
    isAutoPlayExplode = !isAutoPlayExplode;
    updateToggleButtonUI();
  });

  // CAD Viewport Toolbar Buttons
  document.getElementById('toggleExplodeBtn')?.addEventListener('click', toggleExplode);
  document.getElementById('resetViewBtn')?.addEventListener('click', resetCameraView);
  document.getElementById('toggleWireframeBtn')?.addEventListener('click', toggleWireframe);
  document.getElementById('toggleAutoRotateBtn')?.addEventListener('click', toggleAutoRotate);
  document.getElementById('toggleXRayBtn')?.addEventListener('click', toggleXRayMode);
  document.getElementById('toggleCalipersBtn')?.addEventListener('click', toggleCalipers);
  document.getElementById('cycleLightingBtn')?.addEventListener('click', cycleLightingPreset);
  document.getElementById('focusPartBtn')?.addEventListener('click', focusOnActivePart);

  // Audio Mute Toggle Button
  document.getElementById('toggleAudioBtn')?.addEventListener('click', () => {
    isAudioEnabled = !isAudioEnabled;
    playTactileClick(isAudioEnabled ? 800 : 300);
    const onIcon = document.getElementById('audioIconOn');
    const offIcon = document.getElementById('audioIconOff');
    if (onIcon && offIcon) {
      if (isAudioEnabled) {
        onIcon.classList.remove('hidden');
        offIcon.classList.add('hidden');
      } else {
        onIcon.classList.add('hidden');
        offIcon.classList.remove('hidden');
      }
    }
  });

  // Inspector card toggle
  document.getElementById('closeInspectorBtn')?.addEventListener('click', () => {
    playTactileClick(400);
    document.getElementById('explanationCard')?.classList.add('hidden');
    document.getElementById('reopenInspectorBtn')?.classList.remove('hidden');
  });

  document.getElementById('reopenInspectorBtn')?.addEventListener('click', () => {
    playTactileClick(600);
    document.getElementById('explanationCard')?.classList.remove('hidden');
    document.getElementById('reopenInspectorBtn')?.classList.add('hidden');
  });

  // Code Modal
  const codeModal = document.getElementById('codeModal');
  document.getElementById('viewCodeModalBtn')?.addEventListener('click', () => {
    playTactileClick(550);
    const cleanObjCode =
      `// objects.js registry definition\nconst OBJECTS = ` +
      JSON.stringify(OBJECTS, null, 2) +
      ';';
    const content = document.getElementById('codeModalContent');
    if (content) content.textContent = cleanObjCode;
    if (codeModal) codeModal.classList.remove('hidden');
  });

  document.getElementById('closeCodeModalBtn')?.addEventListener('click', () => {
    playTactileClick(400);
    if (codeModal) codeModal.classList.add('hidden');
  });

  document.getElementById('copyCodeBtn')?.addEventListener('click', () => {
    playTactileClick(650);
    const content = document.getElementById('codeModalContent');
    if (content) {
      navigator.clipboard.writeText(content.textContent);
      const btn = document.getElementById('copyCodeBtn');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = orig;
        }, 1500);
      }
    }
  });

  // Quiz listeners
  document.getElementById('startQuizBtn')?.addEventListener('click', () => {
    playTactileClick(750);
    if (typeof startQuiz === 'function') startQuiz();
  });
  document.getElementById('closeQuizModalBtn')?.addEventListener('click', () => {
    playTactileClick(400);
    document.getElementById('quizModal')?.classList.add('hidden');
  });

  // Global Header Search input
  document.getElementById('objectSearchInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = e.target.value.toLowerCase().trim();
      if (!query) return;

      const foundObjKey = Object.keys(OBJECTS).find(
        (k) =>
          k.toLowerCase().includes(query) ||
          (OBJECTS[k].label && OBJECTS[k].label.toLowerCase().includes(query))
      );
      if (foundObjKey) {
        if (activeCategoryTab !== 'All' && OBJECTS[foundObjKey].category !== activeCategoryTab) {
          activeCategoryTab = OBJECTS[foundObjKey].category;
        }
        switchModel(foundObjKey);
        return;
      }

      const currentObj = OBJECTS[currentObjectId];
      if (currentObj && currentObj.parts) {
        const foundPart = currentObj.parts.find(
          (p) => p.name.toLowerCase().includes(query) || p.id.toLowerCase().includes(query)
        );
        if (foundPart) {
          const mesh = activeMeshes.find((m) => m.userData.partData.id === foundPart.id);
          if (mesh) {
            if (selectedMesh) resetMeshHighlight(selectedMesh);
            selectedMesh = mesh;
            setMeshHighlight(selectedMesh, 0xf59e0b, 0.45);
            showExplanation(foundPart, mesh);
            focusOnSpecificPartObject(mesh);
            if (isXRayMode) updateXRayVisuals();
          }
        }
      }
    }
  });

  // Explanation Depth Toggle (Simple vs Technical)
  document.getElementById('depthSimpleBtn')?.addEventListener('click', () => {
    playTactileClick(650);
    setExplanationLevel('simple');
  });
  document.getElementById('depthTechnicalBtn')?.addEventListener('click', () => {
    playTactileClick(650);
    setExplanationLevel('technical');
  });

  // First-Visit Onboarding Guide Modal listeners
  document.getElementById('openHelpModalBtn')?.addEventListener('click', () => {
    playTactileClick(600);
    showOnboardingModal();
  });
  document.getElementById('closeOnboardingBtn')?.addEventListener('click', () => {
    playTactileClick(400);
    dismissOnboardingModal();
  });
  document.getElementById('dismissOnboardingBtn')?.addEventListener('click', () => {
    playTactileClick(700);
    dismissOnboardingModal();
  });

  // Background backdrop dismissal for onboarding modal
  document.getElementById('onboardingModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'onboardingModal') {
      dismissOnboardingModal();
    }
  });

  // Mini Chatbox Event Listeners
  document.getElementById('chatboxToggleBtn')?.addEventListener('click', () => {
    playTactileClick(650);
    toggleChatbox(true);
  });
  document.getElementById('chatMinimizeBtn')?.addEventListener('click', () => {
    playTactileClick(400);
    toggleChatbox(false);
  });
  document.getElementById('chatClearBtn')?.addEventListener('click', () => {
    playTactileClick(450);
    clearChatHistory();
  });
  document.getElementById('chatForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    if (input && input.value.trim()) {
      playTactileClick(700);
      sendChatMessage(input.value);
    }
  });
  bindChatStarterChips();

  // Check and display onboarding guide on first visit
  checkFirstVisitOnboarding();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', setupAppListeners);
} else {
  setupAppListeners();
}
