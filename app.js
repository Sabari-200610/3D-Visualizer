// =============================================================================
// 3D VISUALIZER APPLICATION & RENDER ENGINE
// Three.js Viewport, Explosion Engine, Floating Labels & UI Controller
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

// Scene Lighting & Environment objects
let dirLight1, dirLight2, rimLight, ambientLight, bounceLight;
let contactShadowMesh = null;
let groundShadowPlane = null;
var envMap = null;

// Camera Smooth Transition
let cameraTransition = null;

// X-Ray / Isolate Inspection Mode
let isXRayMode = false;

// Realistic Matte / Satin Studio Lighting Presets (Not shiny / No harsh glare)
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

async function getDescription(objectId, partId, objectLabel, partName) {
  const cacheKey = `${objectId}:${partId}`;
  if (descriptionCache[cacheKey]) return descriptionCache[cacheKey];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ objectLabel, partName, partId }),
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
    name.includes('cone') ||
    name.includes('fairing') ||
    name.includes('boom') ||
    name.includes('cab') ||
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
    name.includes('mars') ||
    name.includes('venus') ||
    name.includes('mercury') ||
    name.includes('nucleus') ||
    name.includes('electron') ||
    name.includes('gimbal')
  ) {
    return 'Optics & Visual Core';
  }
  if (
    name.includes('battery') ||
    name.includes('power') ||
    name.includes('psu') ||
    name.includes('plug') ||
    name.includes('cord') ||
    name.includes('regulator') ||
    name.includes('tank') ||
    name.includes('fuel')
  ) {
    return 'Power & Energy Storage';
  }
  if (
    name.includes('cpu') ||
    name.includes('gpu') ||
    name.includes('chip') ||
    name.includes('processor') ||
    name.includes('microcontroller') ||
    name.includes('motherboard') ||
    name.includes('pcb') ||
    name.includes('ram') ||
    name.includes('circuit') ||
    name.includes('soc') ||
    name.includes('controller') ||
    name.includes('inverter') ||
    name.includes('disk') ||
    name.includes('storage') ||
    name.includes('ssd') ||
    name.includes('shield') ||
    name.includes('oscillator')
  ) {
    return 'Logic & Computing';
  }
  if (
    name.includes('motor') ||
    name.includes('wheel') ||
    name.includes('chain') ||
    name.includes('pedal') ||
    name.includes('compressor') ||
    name.includes('pump') ||
    name.includes('fan') ||
    name.includes('drum') ||
    name.includes('engine') ||
    name.includes('gear') ||
    name.includes('hinge') ||
    name.includes('handlebar') ||
    name.includes('sprocket') ||
    name.includes('coil') ||
    name.includes('rotor') ||
    name.includes('stator') ||
    name.includes('shaft') ||
    name.includes('bearing') ||
    name.includes('propeller') ||
    name.includes('thruster') ||
    name.includes('track') ||
    name.includes('cylinder') ||
    name.includes('bucket') ||
    name.includes('membrane') ||
    name.includes('filter') ||
    name.includes('fins')
  ) {
    return 'Mechanics & Propulsion';
  }
  if (
    name.includes('camera') ||
    name.includes('sensor') ||
    name.includes('speaker') ||
    name.includes('trackpad') ||
    name.includes('keyboard') ||
    name.includes('dial') ||
    name.includes('button') ||
    name.includes('panel') ||
    name.includes('led') ||
    name.includes('antenna') ||
    name.includes('port') ||
    name.includes('pin') ||
    name.includes('header') ||
    name.includes('connector')
  ) {
    return 'Interface & Transducers';
  }
  return 'Precision Component';
}

function formatPartDimensions(geom) {
  if (!geom || !geom.type) return 'Standard Form';
  const args = geom.args || [];
  if (geom.type === 'box') {
    const w = args[0] !== undefined ? Math.round(args[0] * 50) : 50;
    const h = args[1] !== undefined ? Math.round(args[1] * 50) : 50;
    const d = args[2] !== undefined ? Math.round(args[2] * 50) : 20;
    return `${w} × ${h} × ${d} mm`;
  }
  if (geom.type === 'cylinder') {
    const r = args[0] !== undefined ? Math.round(args[0] * 50 * 2) : 40;
    const h = args[2] !== undefined ? Math.round(args[2] * 50) : 80;
    return `Ø ${r} × ${h} mm`;
  }
  if (geom.type === 'sphere') {
    const r = args[0] !== undefined ? Math.round(args[0] * 50 * 2) : 50;
    return `Ø ${r} mm Sphere`;
  }
  return 'Engineered Spec';
}

function getPartFinish(part) {
  if (part.transparent) return 'Optical Grade Polycarbonate';
  const name = (part.name || '').toLowerCase();
  if (name.includes('glass') || name.includes('screen') || name.includes('display'))
    return 'Tempered Glass (Anti-reflective)';
  if (name.includes('battery') || name.includes('cell')) return 'Lithium Polymer Pouch';
  if (
    name.includes('motherboard') ||
    name.includes('chip') ||
    name.includes('cpu') ||
    name.includes('processor')
  )
    return 'Multi-layer FR4 / Silicon Die';
  if (
    name.includes('frame') ||
    name.includes('chassis') ||
    name.includes('case') ||
    name.includes('lid') ||
    name.includes('stem')
  )
    return 'Anodized 6000-series Aluminum';
  if (name.includes('wheel') || name.includes('tire')) return 'Vulcanized Rubber / Alloy';
  if (
    name.includes('motor') ||
    name.includes('drum') ||
    name.includes('sprocket') ||
    name.includes('coil')
  )
    return 'Stainless Steel / Copper';
  return 'High-tensile Engineered Composite';
}

// -------------------------------------------------------------
// ENVIRONMENT & CONTACT SHADOW GENERATORS (Soft Diffuse, Non-Glare)
// -------------------------------------------------------------

function createEnvironmentMap() {
  const size = 512;
  const faces = [];

  for (let f = 0; f < 6; f++) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Soft dark studio ambient backdrop
    const bgGrad = ctx.createLinearGradient(0, 0, 0, size);
    bgGrad.addColorStop(0, '#151b24');
    bgGrad.addColorStop(0.5, '#0d1219');
    bgGrad.addColorStop(1, '#080a0e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, size, size);

    if (f === 2) {
      // Top (+Y): Soft diffuse ceiling light (no glaring white blocks)
      const topGrad = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size * 0.45
      );
      topGrad.addColorStop(0, 'rgba(180, 205, 235, 0.4)');
      topGrad.addColorStop(0.5, 'rgba(90, 120, 160, 0.2)');
      topGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, 0, size, size);
    } else if (f === 3) {
      // Bottom (-Y): Gentle floor bounce
      const floorGrad = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size * 0.5
      );
      floorGrad.addColorStop(0, '#161d26');
      floorGrad.addColorStop(1, '#05070a');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, 0, size, size);
    } else if (f === 0) {
      // +X: Soft Warm Diffuse Key
      const keyGrad = ctx.createRadialGradient(
        size * 0.5,
        size * 0.4,
        0,
        size * 0.5,
        size * 0.4,
        size * 0.45
      );
      keyGrad.addColorStop(0, 'rgba(235, 220, 200, 0.35)');
      keyGrad.addColorStop(0.6, 'rgba(180, 160, 140, 0.12)');
      keyGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = keyGrad;
      ctx.fillRect(0, 0, size, size);
    } else if (f === 1) {
      // -X: Soft Cool Diffuse Fill
      const fillGrad = ctx.createRadialGradient(
        size * 0.5,
        size * 0.45,
        0,
        size * 0.5,
        size * 0.45,
        size * 0.45
      );
      fillGrad.addColorStop(0, 'rgba(160, 195, 235, 0.3)');
      fillGrad.addColorStop(0.6, 'rgba(90, 130, 180, 0.1)');
      fillGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = fillGrad;
      ctx.fillRect(0, 0, size, size);
    } else if (f === 4) {
      // +Z: Front Camera Fill
      const frontGrad = ctx.createRadialGradient(
        size / 2,
        size * 0.4,
        0,
        size / 2,
        size * 0.4,
        size * 0.4
      );
      frontGrad.addColorStop(0, 'rgba(180, 200, 225, 0.25)');
      frontGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = frontGrad;
      ctx.fillRect(0, 0, size, size);
    } else if (f === 5) {
      // -Z: Soft Rim strip
      const rimGrad = ctx.createLinearGradient(0, 0, size, 0);
      rimGrad.addColorStop(0, 'transparent');
      rimGrad.addColorStop(0.5, 'rgba(200, 220, 245, 0.25)');
      rimGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = rimGrad;
      ctx.fillRect(0, size * 0.1, size, size * 0.8);
    }

    faces.push(canvas);
  }

  const cubeTexture = new THREE.CubeTexture(faces);
  cubeTexture.encoding = THREE.sRGBEncoding;
  cubeTexture.needsUpdate = true;
  return cubeTexture;
}

// Procedural Radial Soft Contact Shadow Texture
function createContactShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
  grad.addColorStop(0.2, 'rgba(0, 0, 0, 0.58)');
  grad.addColorStop(0.45, 'rgba(0, 0, 0, 0.25)');
  grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.06)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// -------------------------------------------------------------
// BEVELED & SMOOTHED REALISTIC GEOMETRY GENERATOR
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

  // Environment Map (Soft Diffuse IBL)
  envMap = createEnvironmentMap();
  window.envMap = envMap;
  scene.environment = envMap;

  // Realistic Soft Contact Shadow plane (Grid is removed)
  const shadowTex = createContactShadowTexture();
  const shadowGeom = new THREE.PlaneGeometry(1, 1);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  });
  contactShadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
  contactShadowMesh.rotation.x = -Math.PI / 2;
  contactShadowMesh.renderOrder = 1;
  scene.add(contactShadowMesh);

  // Shadow receiver ground plane (transparent except where directional shadows fall)
  const groundGeom = new THREE.PlaneGeometry(120, 120);
  const groundMat = new THREE.ShadowMaterial({
    opacity: 0.35,
  });
  groundShadowPlane = new THREE.Mesh(groundGeom, groundMat);
  groundShadowPlane.rotation.x = -Math.PI / 2;
  groundShadowPlane.receiveShadow = true;
  scene.add(groundShadowPlane);

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
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = THREE.sRGBEncoding;
  if (mount) mount.appendChild(renderer.domElement);

  // Orbit Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 60;
  controls.minDistance = 2.0;

  // Studio Multi-Light Setup (Diffused & non-shiny)
  ambientLight = new THREE.AmbientLight(
    LIGHTING_PRESETS.studio.ambientColor,
    LIGHTING_PRESETS.studio.ambientIntensity
  );
  scene.add(ambientLight);

  // Key Light (Soft Directional Shadow Caster)
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
  dirLight1.shadow.camera.left = -16;
  dirLight1.shadow.camera.right = 16;
  dirLight1.shadow.camera.top = 16;
  dirLight1.shadow.camera.bottom = -16;
  dirLight1.shadow.bias = -0.0001;
  dirLight1.shadow.normalBias = 0.02;
  dirLight1.shadow.radius = 3.5;
  scene.add(dirLight1);

  // Fill Light (Soft cool balanced fill)
  dirLight2 = new THREE.DirectionalLight(
    LIGHTING_PRESETS.studio.fillColor,
    LIGHTING_PRESETS.studio.fillIntensity
  );
  dirLight2.position.set(-14, 8, -10);
  scene.add(dirLight2);

  // Rim Light (Soft grazing silhouette)
  rimLight = new THREE.DirectionalLight(
    LIGHTING_PRESETS.studio.rimColor,
    LIGHTING_PRESETS.studio.rimIntensity
  );
  rimLight.position.set(-2, 12, -16);
  scene.add(rimLight);

  // Floor Bounce Light
  bounceLight = new THREE.PointLight(0xffeedd, 0.25, 45);
  bounceLight.position.set(0, -3, 8);
  scene.add(bounceLight);

  // Listeners
  window.addEventListener('resize', onWindowResize);
  if (mount) {
    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('pointerdown', (e) => {
      pointerDownPos.x = e.clientX;
      pointerDownPos.y = e.clientY;
      pointerDownPos.time = Date.now();
    });
    mount.addEventListener('click', onCanvasClick);
    mount.addEventListener('dblclick', () => {
      toggleExplode();
    });
  }

  // Keyboard shortcuts
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
    } else if (e.key === 'l' || e.key === 'L') {
      cycleLightingPreset();
    }
  });

  loadObject(currentObjectId);
  animate();
}

// -------------------------------------------------------------
// OBJECT LOADING & SCENE SETUP
// -------------------------------------------------------------
function loadObject(objId) {
  const objData = OBJECTS[objId];
  if (!objData) return;

  currentObjectId = objId;
  window.currentObjectId = currentObjectId;

  // Clear previous meshes
  activeMeshes.forEach((mesh) => scene.remove(mesh));
  activeMeshes = [];
  hoveredMesh = null;
  selectedMesh = null;

  // Camera reset
  const r = objData.viewRadius || 15;
  camera.position.set(r * 0.7, r * 0.5, r * 0.8);
  controls.target.set(0, 0, 0);
  controls.update();

  // Reset explode state
  isExploded = false;
  currentExplodeFactor = 0;
  targetExplodeFactor = 0;
  isUserDraggingSlider = false;
  updateExplosion(0);
  const slider = document.getElementById('explodeSlider');
  if (slider) slider.value = 0;
  const label = document.getElementById('explodeFactorLabel');
  if (label) label.textContent = '0% (Assembled)';
  updateToggleButtonUI();

  // Centroid
  let sumX = 0,
    sumY = 0,
    sumZ = 0;
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

  // Build Three.js meshes with beveled geometries & realistic matte PBR materials
  const groupForBounds = new THREE.Group();

  objData.parts.forEach((part) => {
    const geom = createRealisticGeometry(part.geometry);
    const mat = createRealisticMaterial(part);

    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(...part.position);

    if (part.rotation) {
      mesh.rotation.set(...part.rotation);
    }

    mesh.castShadow = !part.transparent;
    mesh.receiveShadow = true;

    const origPos = new THREE.Vector3(...part.position);
    let dir = origPos.clone().sub(center);
    if (dir.length() < 0.15) {
      dir = new THREE.Vector3(0, 1, 0);
    } else {
      dir.normalize();
    }

    mesh.userData = {
      partData: part,
      originalPosition: origPos.clone(),
      explodeDirection: dir,
      originalColor: part.color,
      originalEmissive: {
        color: mat.emissive ? mat.emissive.getHex() : 0x000000,
        intensity: mat.emissiveIntensity || 0,
      },
    };

    scene.add(mesh);
    activeMeshes.push(mesh);
    groupForBounds.add(mesh.clone());
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
}

function toggleExplode() {
  isExploded = !isExploded;
  targetExplodeFactor = isExploded ? 1.0 : 0.0;
  isUserDraggingSlider = false;
  updateToggleButtonUI();
}

function updateToggleButtonUI() {
  const text = document.getElementById('toggleExplodeText');
  if (!text) return;
  text.textContent = isExploded ? 'Reassemble' : 'Explode View';
}

// -------------------------------------------------------------
// REFINED NON-DESTRUCTIVE HIGHLIGHTING
// -------------------------------------------------------------
function setMeshHighlight(mesh, hexColor, intensity) {
  if (!mesh || !mesh.material) return;
  mesh.material.emissive.setHex(hexColor);
  mesh.material.emissiveIntensity = intensity;
}

function resetMeshHighlight(mesh) {
  if (!mesh || !mesh.material) return;
  const orig = mesh.userData.originalEmissive || { color: 0x000000, intensity: 0 };
  mesh.material.emissive.setHex(orig.color);
  mesh.material.emissiveIntensity = orig.intensity;
}

// -------------------------------------------------------------
// INSPECTOR & SPECIFICATION DISPLAY
// -------------------------------------------------------------
function showExplanation(part, mesh) {
  if (!part) return;

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

  // Highlight in left sidebar parts list
  document.querySelectorAll('.part-item-btn').forEach((btn) => {
    const btnPartId = btn.getAttribute('data-part-id');
    if (btnPartId === part.id) {
      btn.classList.add('border-blue-500', 'bg-[#182232]');
      btn.classList.remove('border-[#242e40]', 'bg-[#121824]');
    } else {
      btn.classList.remove('border-blue-500', 'bg-[#182232]');
      btn.classList.add('border-[#242e40]', 'bg-[#121824]');
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

  // Enrich via API if backend connected
  const objectLabel = OBJECTS[currentObjectId].label;
  getDescription(currentObjectId, part.id, objectLabel, part.name)
    .then((res) => {
      const activeName = document.getElementById('activePartName');
      if (activeName && activeName.textContent === part.name) {
        if (res && res.description && res.description.length > 10) {
          if (expT) expT.textContent = res.description;
          if (sidebarDesc) sidebarDesc.textContent = res.description;
        }
      }
    })
    .catch(() => {});
}

// -------------------------------------------------------------
// MOUSE & INTERACTION CONTROLLER
// -------------------------------------------------------------
function onMouseMove(event) {
  if (!mount) return;
  const rect = mount.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(activeMeshes);

  if (intersects.length > 0) {
    const hit = intersects[0].object;
    if (hoveredMesh !== hit) {
      if (hoveredMesh && hoveredMesh !== selectedMesh) {
        resetMeshHighlight(hoveredMesh);
      }
      hoveredMesh = hit;
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

  const targetPos = part.position.clone();
  const objData = OBJECTS[currentObjectId];
  const r = objData && objData.viewRadius ? objData.viewRadius * 0.42 : 4.0;

  const endCamPos = new THREE.Vector3(
    targetPos.x + r * 0.7,
    targetPos.y + r * 0.45,
    targetPos.z + r * 0.85
  );

  startCameraTransition(endCamPos, targetPos);
}

function resetCameraView() {
  const objData = OBJECTS[currentObjectId];
  if (!objData) return;
  const r = objData.viewRadius || 15;
  const endCamPos = new THREE.Vector3(r * 0.7, r * 0.5, r * 0.8);
  const endTarget = new THREE.Vector3(0, 0, 0);

  isExploded = false;
  targetExplodeFactor = 0;
  currentExplodeFactor = 0;
  isUserDraggingSlider = false;
  updateExplosion(0);
  const slider = document.getElementById('explodeSlider');
  if (slider) slider.value = 0;
  updateToggleButtonUI();

  if (selectedMesh) {
    resetMeshHighlight(selectedMesh);
    selectedMesh = null;
  }
  if (isXRayMode) updateXRayVisuals();

  startCameraTransition(endCamPos, endTarget);
}

// -------------------------------------------------------------
// INTERACTIVE MODES: WIREFRAME, X-RAY, LIGHTING PRESETS
// -------------------------------------------------------------
function toggleWireframe() {
  isWireframe = !isWireframe;
  window.isWireframe = isWireframe;
  activeMeshes.forEach((m) => (m.material.wireframe = isWireframe));
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
  activeMeshes.forEach((mesh) => {
    const isTarget =
      (selectedMesh && mesh === selectedMesh) || (hoveredMesh && mesh === hoveredMesh);
    if (isXRayMode) {
      if (isTarget || !selectedMesh) {
        mesh.material.transparent = mesh.userData.partData.transparent || false;
        mesh.material.opacity =
          mesh.userData.partData.opacity !== undefined ? mesh.userData.partData.opacity : 1.0;
        mesh.material.depthWrite = true;
      } else {
        mesh.material.transparent = true;
        mesh.material.opacity = 0.16;
        mesh.material.depthWrite = false;
      }
    } else {
      mesh.material.transparent = mesh.userData.partData.transparent || false;
      mesh.material.opacity =
        mesh.userData.partData.opacity !== undefined ? mesh.userData.partData.opacity : 1.0;
      mesh.material.depthWrite = true;
    }
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
    labelEl.style.willChange = 'transform';
    labelEl.innerHTML = `
      <div class="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#101520]/90 hover:bg-[#161f2e] backdrop-blur-md border border-[#2b394e] hover:border-sky-500/70 shadow-lg text-[11px] font-medium text-slate-200 transition-colors">
        <span class="w-2 h-2 rounded-full shrink-0 border border-black/40 shadow-sm" style="background-color: ${hex}"></span>
        <span class="whitespace-nowrap">${part.name}</span>
      </div>
    `;

    labelEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (selectedMesh) resetMeshHighlight(selectedMesh);
      selectedMesh = mesh;
      setMeshHighlight(selectedMesh, 0xf59e0b, 0.45);
      showExplanation(part, mesh);
      if (isXRayMode) updateXRayVisuals();
    });

    wrap.appendChild(labelEl);

    floatingLabels.push({
      id: part.id,
      part,
      mesh,
      labelEl,
      lineEl,
      dotEl,
    });
  });
}

function updateFloatingLabels() {
  const container = document.getElementById('labelsContainer');
  if (!container) return;

  const isVisible = currentExplodeFactor > 0.15;
  container.style.opacity = isVisible ? '1' : '0';

  if (!isVisible || floatingLabels.length === 0) return;

  const rect = mount.getBoundingClientRect();
  const halfW = rect.width / 2;
  const halfH = rect.height / 2;

  floatingLabels.forEach((item) => {
    item.mesh.getWorldPosition(_projVector);
    _projVector.project(camera);

    const isBehind = _projVector.z > 1.0;
    if (isBehind) {
      item.labelEl.style.display = 'none';
      item.lineEl.style.display = 'none';
      item.dotEl.style.display = 'none';
      return;
    }

    item.labelEl.style.display = '';
    item.lineEl.style.display = '';
    item.dotEl.style.display = '';

    const screenX = _projVector.x * halfW + halfW;
    const screenY = -_projVector.y * halfH + halfH;

    const explodeDir = item.mesh.userData.explodeDirection;
    const offsetX = explodeDir.x >= 0 ? 55 : -55;
    const offsetY = explodeDir.y >= 0 ? -35 : 35;

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

  updateCameraTransition();

  if (!isUserDraggingSlider) {
    const diff = targetExplodeFactor - currentExplodeFactor;
    if (Math.abs(diff) > 0.001) {
      currentExplodeFactor += diff * 0.08;
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
  const tblBadge = document.getElementById('tableTotalComponentsBadge');
  if (tblBadge) tblBadge.textContent = `${obj.parts.length} Components`;

  // Sidebar parts list: Lengthier, roomier, cleanly structured
  const partsList = document.getElementById('partsList');
  if (partsList) {
    partsList.innerHTML = '';

    obj.parts.forEach((part, index) => {
      const category = getPartCategory(part);
      const hex = '#' + part.color.toString(16).padStart(6, '0');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-part-id', part.id);
      btn.className =
        'part-item-btn w-full px-3 py-2.5 rounded-lg border border-[#242e40] bg-[#121824] hover:bg-[#182232] hover:border-[#354663] text-left transition-all flex items-center justify-between group cursor-pointer shadow-sm';

      btn.innerHTML = `
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <span class="w-3 h-3 rounded-full shrink-0 border border-black/40 shadow-sm" style="background-color: ${hex}"></span>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-semibold text-slate-100 group-hover:text-white truncate">${part.name}</div>
            <div class="text-[10px] text-slate-400 font-mono tracking-tight truncate">${category}</div>
          </div>
        </div>
        <span class="text-[10px] font-mono text-slate-400 bg-[#182130] px-2 py-0.5 rounded border border-[#273449] shrink-0 font-semibold ml-2">${String(
          index + 1
        ).padStart(2, '0')}</span>
      `;

      btn.addEventListener('click', () => {
        const mesh = activeMeshes.find((m) => m.userData.partData.id === part.id);
        if (mesh) {
          if (selectedMesh) resetMeshHighlight(selectedMesh);
          selectedMesh = mesh;
          setMeshHighlight(selectedMesh, 0xf59e0b, 0.45);
          showExplanation(part, mesh);
          if (isXRayMode) updateXRayVisuals();
        }
      });

      partsList.appendChild(btn);
    });
  }

  // Specifications Table Body
  const tableBody = document.getElementById('specificationsTableBody');
  if (tableBody) {
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
        <td class="py-3 px-4 font-mono text-slate-400">${String(index + 1).padStart(2, '0')}</td>
        <td class="py-3 px-4">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full shrink-0 border border-black/30" style="background-color: ${hex}"></span>
            <span class="font-medium text-slate-200">${part.name}</span>
          </div>
        </td>
        <td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-[#161d2a] border border-[#253245] text-[10px] text-slate-300">${category}</span></td>
        <td class="py-3 px-4 font-mono text-slate-300 text-[11px]">${dimensions}</td>
        <td class="py-3 px-4 text-slate-400">${finish}</td>
        <td class="py-3 px-4"><span class="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active</span></td>
      `;

      tr.addEventListener('click', () => {
        const mesh = activeMeshes.find((m) => m.userData.partData.id === part.id);
        if (mesh) {
          if (selectedMesh) resetMeshHighlight(selectedMesh);
          selectedMesh = mesh;
          setMeshHighlight(selectedMesh, 0xf59e0b, 0.45);
          showExplanation(part, mesh);
          if (isXRayMode) updateXRayVisuals();
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      tableBody.appendChild(tr);
    });
  }
}

// Category filter tabs & dynamic selector grid
const CATEGORY_TABS = ['All', 'Daily Objects', 'IoT Objects', 'Machineries', 'Heavy Machines', 'Science & Concepts'];
let activeCategoryTab = 'All';

function renderCategoryTabs() {
  const container = document.getElementById('categoryTabsRow');
  if (!container) return;
  container.innerHTML = '';

  CATEGORY_TABS.forEach((cat) => {
    const isActive = activeCategoryTab === cat;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `px-2 py-1 text-[10px] rounded-md whitespace-nowrap transition-all border ${
      isActive
        ? 'bg-sky-500/20 border-sky-500/60 text-sky-300 shadow-sm font-semibold'
        : 'bg-[#141b26] border-[#242e40] text-slate-400 hover:text-slate-200 hover:border-[#35445d]'
    }`;
    btn.textContent = cat;
    btn.onclick = () => {
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

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `px-2 py-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-all ${
      isActive
        ? 'bg-sky-500/20 border-sky-500/60 text-white font-semibold shadow-sm'
        : 'bg-[#121824] border-[#242e40] hover:bg-[#182130] text-slate-300'
    }`;
    btn.innerHTML = `
      <div class="leading-tight truncate">
        <div class="text-[11px] truncate">${def.label}</div>
      </div>
    `;
    btn.onclick = () => {
      switchModel(id);
    };
    grid.appendChild(btn);
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
    opt.textContent = `${def.label} (${def.category || 'General'})`;
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
  }, 50);
}

// -------------------------------------------------------------
// EVENT HANDLERS & BINDINGS
// -------------------------------------------------------------
function setupAppListeners() {
  initThree();
  renderModelSelectors();

  // Explode slider
  const explodeSlider = document.getElementById('explodeSlider');
  if (explodeSlider) {
    explodeSlider.addEventListener('input', (e) => {
      isUserDraggingSlider = true;
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

  // CAD buttons
  document.getElementById('toggleExplodeBtn')?.addEventListener('click', toggleExplode);
  document.getElementById('resetViewBtn')?.addEventListener('click', resetCameraView);
  document.getElementById('toggleWireframeBtn')?.addEventListener('click', toggleWireframe);
  document.getElementById('toggleAutoRotateBtn')?.addEventListener('click', toggleAutoRotate);
  document.getElementById('toggleXRayBtn')?.addEventListener('click', toggleXRayMode);
  document.getElementById('cycleLightingBtn')?.addEventListener('click', cycleLightingPreset);
  document.getElementById('focusPartBtn')?.addEventListener('click', focusOnActivePart);

  // Inspector card toggle
  document.getElementById('closeInspectorBtn')?.addEventListener('click', () => {
    document.getElementById('explanationCard')?.classList.add('hidden');
    document.getElementById('reopenInspectorBtn')?.classList.remove('hidden');
  });

  document.getElementById('reopenInspectorBtn')?.addEventListener('click', () => {
    document.getElementById('explanationCard')?.classList.remove('hidden');
    document.getElementById('reopenInspectorBtn')?.classList.add('hidden');
  });

  // Code Modal
  const codeModal = document.getElementById('codeModal');
  document.getElementById('viewCodeModalBtn')?.addEventListener('click', () => {
    const cleanObjCode =
      `// objects.js registry definition\nconst OBJECTS = ` +
      JSON.stringify(OBJECTS, null, 2) +
      ';';
    const content = document.getElementById('codeModalContent');
    if (content) content.textContent = cleanObjCode;
    if (codeModal) codeModal.classList.remove('hidden');
  });

  document.getElementById('closeCodeModalBtn')?.addEventListener('click', () => {
    if (codeModal) codeModal.classList.add('hidden');
  });

  document.getElementById('copyCodeBtn')?.addEventListener('click', () => {
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
    if (typeof startQuiz === 'function') startQuiz();
  });
  document.getElementById('closeQuizModalBtn')?.addEventListener('click', () => {
    document.getElementById('quizModal')?.classList.add('hidden');
  });

  // Search input
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
            focusOnActivePart();
            if (isXRayMode) updateXRayVisuals();
          }
        }
      }
    }
  });
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', setupAppListeners);
} else {
  setupAppListeners();
}
