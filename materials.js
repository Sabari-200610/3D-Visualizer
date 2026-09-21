// =============================================================================
// REALISTIC MATERIAL & PROCEDURAL TEXTURE SYSTEM
// Dynamic 2D Canvas Procedural Maps & PBR Standard Materials
// =============================================================================

function makeCanvasTexture(drawFn, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Coherent value noise helper
function valueNoise(ctx, size, scale, alpha, dark, light) {
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = (x / size) * scale;
      const ny = (y / size) * scale;
      const v =
        (Math.sin(nx * 7.3 + ny * 3.1) * 0.5 +
          Math.sin(nx * 13.7 - ny * 5.9) * 0.3 +
          Math.sin((nx + ny) * 11.3) * 0.2 +
          1) *
        0.5;
      const c = dark + v * (light - dark);
      const i = (y * size + x) * 4;
      img.data[i] = c;
      img.data[i + 1] = c;
      img.data[i + 2] = c;
      img.data[i + 3] = Math.round(alpha * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
}

// ---- BUMP MAP GENERATORS ----
function makeMetalBumpMap() {
  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, sz, sz);
    for (let i = 0; i < 120; i++) {
      const x = Math.random() * sz;
      const bright = 110 + Math.random() * 40;
      ctx.strokeStyle = `rgb(${bright},${bright},${bright})`;
      ctx.lineWidth = 0.3 + Math.random() * 0.7;
      ctx.globalAlpha = 0.15 + Math.random() * 0.15;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + (Math.random() - 0.5) * 12, sz);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    for (let i = 0; i < 200; i++) {
      const px = Math.random() * sz,
        py = Math.random() * sz;
      ctx.fillStyle = Math.random() > 0.5 ? '#909090' : '#707070';
      ctx.fillRect(px, py, 1, 1);
    }
  }, 512);
}

function makePlasticBumpMap() {
  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, sz, sz);
    const img = ctx.createImageData(sz, sz);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 115 + Math.random() * 25;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    ctx.globalAlpha = 0.6;
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, sz, sz);
    ctx.globalAlpha = 1;
  }, 256);
}

function makeRoughnessBumpMap(roughnessBase) {
  return makeCanvasTexture((ctx, sz) => {
    const base = Math.round(roughnessBase * 255);
    ctx.fillStyle = `rgb(${base},${base},${base})`;
    ctx.fillRect(0, 0, sz, sz);
    const img = ctx.createImageData(sz, sz);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = base + (Math.random() - 0.5) * 40;
      const clamped = Math.max(0, Math.min(255, v));
      img.data[i] = clamped;
      img.data[i + 1] = clamped;
      img.data[i + 2] = clamped;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }, 256);
}

function makeMetalTexture(hexColor) {
  const r = (hexColor >> 16) & 0xff,
    g = (hexColor >> 8) & 0xff,
    b = hexColor & 0xff;
  return makeCanvasTexture((ctx, sz) => {
    const grad = ctx.createLinearGradient(0, 0, sz, sz);
    grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
    grad.addColorStop(
      0.25,
      `rgba(${Math.min(r + 50, 255)},${Math.min(g + 50, 255)},${Math.min(b + 50, 255)},1)`
    );
    grad.addColorStop(
      0.5,
      `rgba(${Math.max(r - 15, 0)},${Math.max(g - 15, 0)},${Math.max(b - 15, 0)},1)`
    );
    grad.addColorStop(
      0.75,
      `rgba(${Math.min(r + 30, 255)},${Math.min(g + 30, 255)},${Math.min(b + 30, 255)},1)`
    );
    grad.addColorStop(
      1,
      `rgba(${Math.max(r - 30, 0)},${Math.max(g - 30, 0)},${Math.max(b - 30, 0)},1)`
    );
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, sz, sz);
    ctx.globalAlpha = 0.06;
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * sz;
      ctx.strokeStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
      ctx.lineWidth = Math.random() < 0.8 ? 0.5 : 1.2;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + (Math.random() - 0.5) * 16, sz);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.04;
    const hlGrad = ctx.createLinearGradient(0, sz * 0.3, sz, sz * 0.7);
    hlGrad.addColorStop(0, 'transparent');
    hlGrad.addColorStop(0.5, '#ffffff');
    hlGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = hlGrad;
    ctx.fillRect(0, 0, sz, sz);
    ctx.globalAlpha = 1;
  }, 512);
}

function makePCBTexture() {
  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#1a5c2a';
    ctx.fillRect(0, 0, sz, sz);
    ctx.strokeStyle = 'rgba(180,140,30,0.45)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < sz; i += 18) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, sz);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(sz, i);
      ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(200,160,40,0.7)';
    ctx.lineWidth = 2;
    for (let t = 0; t < 12; t++) {
      const x = Math.floor((Math.random() * sz) / 18) * 18;
      const y = Math.floor((Math.random() * sz) / 18) * 18;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 54, y);
      ctx.lineTo(x + 54, y + 36);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(220,180,50,0.7)';
    for (let p = 0; p < 20; p++) {
      const px = Math.floor((Math.random() * sz) / 18) * 18;
      const py = Math.floor((Math.random() * sz) / 18) * 18;
      ctx.fillRect(px - 3, py - 3, 8, 8);
    }
  }, 512);
}

function makeRockyTexture(hexColor) {
  const r = (hexColor >> 16) & 0xff,
    g = (hexColor >> 8) & 0xff,
    b = hexColor & 0xff;
  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, sz, sz);
    valueNoise(ctx, sz, 8, 0.35, 0, 255);
    ctx.globalAlpha = 0.15;
    for (let c = 0; c < 15; c++) {
      const cx = Math.random() * sz,
        cy = Math.random() * sz;
      const rad = 4 + Math.random() * 22;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grd.addColorStop(0, 'rgba(0,0,0,0.6)');
      grd.addColorStop(0.7, 'rgba(0,0,0,0.1)');
      grd.addColorStop(1, 'rgba(255,255,255,0.2)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, 512);
}

function makeEarthTexture() {
  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#1a5fa0';
    ctx.fillRect(0, 0, sz, sz);
    const lands = [
      { x: 0.15, y: 0.3, w: 0.18, h: 0.35 },
      { x: 0.35, y: 0.2, w: 0.25, h: 0.5 },
      { x: 0.62, y: 0.25, w: 0.16, h: 0.3 },
      { x: 0.72, y: 0.55, w: 0.12, h: 0.2 },
      { x: 0.08, y: 0.55, w: 0.12, h: 0.2 },
      { x: 0.5, y: 0.65, w: 0.2, h: 0.2 },
    ];
    ctx.fillStyle = '#3a7a30';
    lands.forEach((l) => {
      ctx.beginPath();
      ctx.ellipse(
        l.x * sz,
        l.y * sz,
        l.w * sz * 0.5,
        l.h * sz * 0.5,
        Math.random() * 0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
    ctx.fillStyle = '#e8f4ff';
    ctx.fillRect(0, 0, sz, sz * 0.07);
    ctx.fillRect(0, sz * 0.93, sz, sz * 0.07);
    ctx.globalAlpha = 0.12;
    valueNoise(ctx, sz, 4, 0.5, 150, 255);
    ctx.globalAlpha = 1;
  }, 512);
}

function makeGasGiantTexture(hexColor) {
  const r = (hexColor >> 16) & 0xff,
    g = (hexColor >> 8) & 0xff,
    b = hexColor & 0xff;
  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, sz, sz);
    const bandColors = [
      `rgba(${Math.min(r + 40, 255)},${Math.min(g + 20, 255)},${Math.max(b - 20, 0)},0.5)`,
      `rgba(${Math.max(r - 30, 0)},${Math.max(g - 20, 0)},${Math.max(b - 10, 0)},0.4)`,
      `rgba(${Math.min(r + 20, 255)},${Math.min(g + 30, 255)},${b},0.35)`,
      `rgba(${Math.max(r - 20, 0)},${g},${Math.min(b + 20, 255)},0.3)`,
    ];
    const bandCount = 14;
    for (let i = 0; i < bandCount; i++) {
      const y = (i / bandCount) * sz;
      const h = sz / bandCount;
      ctx.fillStyle = bandColors[i % bandColors.length];
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= sz; x += 8) {
        ctx.lineTo(x, y + Math.sin(x * 0.04 + i) * (h * 0.3));
      }
      ctx.lineTo(sz, y + h);
      ctx.lineTo(0, y + h);
      ctx.closePath();
      ctx.fill();
    }
  }, 512);
}

function makeStarTexture() {
  return makeCanvasTexture((ctx, sz) => {
    const grad = ctx.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz / 2);
    grad.addColorStop(0, '#fff8e0');
    grad.addColorStop(0.3, '#ffb830');
    grad.addColorStop(0.7, '#ff6010');
    grad.addColorStop(1, '#cc2000');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, sz, sz);
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < 80; i++) {
      const cx = Math.random() * sz,
        cy = Math.random() * sz;
      const r2 = 5 + Math.random() * 20;
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,200,0,0.8)' : 'rgba(200,50,0,0.8)';
      ctx.beginPath();
      ctx.arc(cx, cy, r2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, 512);
}

function makeIceTexture(hexColor) {
  const r = (hexColor >> 16) & 0xff,
    g = (hexColor >> 8) & 0xff,
    b = hexColor & 0xff;
  return makeCanvasTexture((ctx, sz) => {
    const grad = ctx.createLinearGradient(0, 0, sz, sz);
    grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
    grad.addColorStop(
      0.5,
      `rgba(${Math.min(r + 60, 255)},${Math.min(g + 60, 255)},${Math.min(b + 80, 255)},1)`
    );
    grad.addColorStop(1, `rgba(${r},${g},${b},1)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, sz, sz);
    ctx.globalAlpha = 0.18;
    valueNoise(ctx, sz, 6, 0.5, 180, 255);
    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = 'rgba(150,220,255,0.6)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * sz, Math.random() * sz);
      ctx.lineTo(Math.random() * sz, Math.random() * sz);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }, 512);
}

function makeRingTexture(hexColor) {
  const r = (hexColor >> 16) & 0xff,
    g = (hexColor >> 8) & 0xff,
    b = hexColor & 0xff;
  return makeCanvasTexture((ctx, sz) => {
    const bandCount = 24;
    for (let i = 0; i < bandCount; i++) {
      const x = (i / bandCount) * sz;
      const w = sz / bandCount;
      const alpha = 0.2 + Math.random() * 0.7;
      const bright = Math.random() * 40 - 20;
      ctx.fillStyle = `rgba(${Math.min(r + bright, 255)},${Math.min(
        g + bright,
        255
      )},${Math.min(b + bright, 255)},${alpha})`;
      ctx.fillRect(x, 0, w, sz);
    }
  }, 256);
}

// -----------------------------------------------------------------------------
// PBR MATERIAL BUILDER
// -----------------------------------------------------------------------------
const _materialCache = {};

function createRealisticMaterial(part) {
  const mt = part.materialType || 'default';
  const color = part.color;
  const isTransparent = !!part.transparent;
  const opacity = part.opacity !== undefined ? part.opacity : 1.0;

  let roughness = 0.6,
    metalness = 0.1,
    emissiveColor = 0x000000,
    emissiveIntensity = 0;
  let map = null,
    bumpMap = null,
    bumpScale = 0.015,
    roughnessMap = null;
  let useEnvMap = false;

  switch (mt) {
    case 'metal':
      roughness = 0.22;
      metalness = 0.88;
      map = makeMetalTexture(color);
      bumpMap = makeMetalBumpMap();
      bumpScale = 0.02;
      roughnessMap = makeRoughnessBumpMap(0.25);
      useEnvMap = true;
      break;
    case 'liquid-metal':
      roughness = 0.03;
      metalness = 0.97;
      emissiveColor = color;
      emissiveIntensity = 0.22;
      bumpMap = makeMetalBumpMap();
      bumpScale = 0.008;
      useEnvMap = true;
      break;
    case 'rocky':
      roughness = 0.92;
      metalness = 0.0;
      map = makeRockyTexture(color);
      bumpMap = makeRoughnessBumpMap(0.5);
      bumpScale = 0.04;
      break;
    case 'earth':
      roughness = 0.72;
      metalness = 0.0;
      map = makeEarthTexture();
      bumpMap = makeRoughnessBumpMap(0.45);
      bumpScale = 0.025;
      break;
    case 'star':
      roughness = 1.0;
      metalness = 0.0;
      map = makeStarTexture();
      emissiveColor = 0xff8800;
      emissiveIntensity = 1.6;
      break;
    case 'gas-giant':
      roughness = 0.78;
      metalness = 0.0;
      map = makeGasGiantTexture(color);
      bumpMap = makeRoughnessBumpMap(0.5);
      bumpScale = 0.015;
      break;
    case 'ice-giant':
      roughness = 0.5;
      metalness = 0.12;
      map = makeGasGiantTexture(color);
      useEnvMap = true;
      break;
    case 'atmosphere':
      roughness = 1.0;
      metalness = 0.0;
      emissiveColor = color;
      emissiveIntensity = 0.1;
      break;
    case 'ice':
      roughness = 0.12;
      metalness = 0.05;
      map = makeIceTexture(color);
      emissiveColor = color;
      emissiveIntensity = 0.08;
      useEnvMap = true;
      break;
    case 'ring':
      roughness = 0.88;
      metalness = 0.0;
      map = makeRingTexture(color);
      break;
    case 'pcb':
      roughness = 0.45;
      metalness = 0.18;
      map = makePCBTexture();
      bumpMap = makeMetalBumpMap();
      bumpScale = 0.012;
      break;
    case 'glass':
      roughness = 0.01;
      metalness = 0.15;
      emissiveColor = color;
      emissiveIntensity = 0.06;
      useEnvMap = true;
      break;
    case 'plastic':
      roughness = 0.5;
      metalness = 0.0;
      bumpMap = makePlasticBumpMap();
      bumpScale = 0.008;
      break;
    default: {
      const n = (part.name || '').toLowerCase();
      if (
        n.includes('motherboard') ||
        n.includes('pcb') ||
        n.includes('circuit') ||
        n.includes('board')
      ) {
        roughness = 0.45;
        metalness = 0.18;
        map = makePCBTexture();
        bumpMap = makeMetalBumpMap();
        bumpScale = 0.012;
      } else if (
        n.includes('cpu') ||
        n.includes('chip') ||
        n.includes('processor') ||
        n.includes('gpu') ||
        n.includes('soc')
      ) {
        roughness = 0.15;
        metalness = 0.78;
        map = makeMetalTexture(color);
        bumpMap = makeMetalBumpMap();
        bumpScale = 0.015;
        useEnvMap = true;
      } else if (
        n.includes('screen') ||
        n.includes('display') ||
        n.includes('glass') ||
        n.includes('porthole') ||
        n.includes('lens')
      ) {
        roughness = 0.02;
        metalness = 0.08;
        emissiveColor = color;
        emissiveIntensity = 0.3;
        useEnvMap = true;
      } else if (
        n.includes('metal') ||
        n.includes('steel') ||
        n.includes('iron') ||
        n.includes('alloy') ||
        n.includes('frame') ||
        n.includes('chassis') ||
        n.includes('case') ||
        n.includes('hinge') ||
        n.includes('body')
      ) {
        roughness = 0.25;
        metalness = 0.8;
        map = makeMetalTexture(color);
        bumpMap = makeMetalBumpMap();
        bumpScale = 0.02;
        useEnvMap = true;
      } else if (n.includes('battery') || n.includes('cell')) {
        roughness = 0.55;
        metalness = 0.35;
        map = makeMetalTexture(color);
        bumpMap = makeMetalBumpMap();
        bumpScale = 0.01;
      } else if (n.includes('fan') || n.includes('blade') || n.includes('rotor')) {
        roughness = 0.35;
        metalness = 0.65;
        bumpMap = makeMetalBumpMap();
        bumpScale = 0.01;
        useEnvMap = true;
      } else if (
        n.includes('led') ||
        n.includes('light') ||
        n.includes('lamp') ||
        n.includes('glow') ||
        n.includes('antenna')
      ) {
        roughness = 0.25;
        metalness = 0.15;
        emissiveColor = color;
        emissiveIntensity = 0.9;
        useEnvMap = true;
      } else if (
        n.includes('rubber') ||
        n.includes('tire') ||
        n.includes('wheel') ||
        n.includes('pedal')
      ) {
        roughness = 0.92;
        metalness = 0.0;
        bumpMap = makePlasticBumpMap();
        bumpScale = 0.025;
      } else if (n.includes('water') || n.includes('ocean') || n.includes('liquid')) {
        roughness = 0.03;
        metalness = 0.0;
        emissiveColor = color;
        emissiveIntensity = 0.06;
        useEnvMap = true;
      } else if (
        n.includes('polar') ||
        n.includes('ice') ||
        n.includes('frost') ||
        n.includes('snow')
      ) {
        roughness = 0.14;
        metalness = 0.05;
        map = makeIceTexture(color);
        useEnvMap = true;
      } else if (
        n.includes('seat') ||
        n.includes('saddle') ||
        n.includes('cushion') ||
        n.includes('foam')
      ) {
        roughness = 0.88;
        metalness = 0.0;
        bumpMap = makePlasticBumpMap();
        bumpScale = 0.02;
      } else if (
        n.includes('cable') ||
        n.includes('cord') ||
        n.includes('wire') ||
        n.includes('harness')
      ) {
        roughness = 0.7;
        metalness = 0.1;
        bumpMap = makePlasticBumpMap();
        bumpScale = 0.015;
      } else {
        roughness = 0.55;
        metalness = 0.08;
        bumpMap = makePlasticBumpMap();
        bumpScale = 0.006;
      }
      break;
    }
  }

  const activeWireframe = typeof window !== 'undefined' && typeof window.isWireframe !== 'undefined' ? window.isWireframe : false;
  const activeEnvMap = typeof window !== 'undefined' && window.envMap ? window.envMap : null;

  const matParams = {
    color,
    roughness,
    metalness,
    transparent: isTransparent,
    opacity,
    wireframe: activeWireframe,
  };
  if (map) matParams.map = map;
  if (bumpMap) {
    matParams.bumpMap = bumpMap;
    matParams.bumpScale = bumpScale;
  }
  if (roughnessMap) matParams.roughnessMap = roughnessMap;
  if (useEnvMap && activeEnvMap) matParams.envMap = activeEnvMap;
  if (useEnvMap) matParams.envMapIntensity = metalness > 0.5 ? 0.6 : 0.3;
  if (emissiveIntensity > 0) {
    matParams.emissive = emissiveColor;
    matParams.emissiveIntensity = emissiveIntensity;
  }

  return new THREE.MeshStandardMaterial(matParams);
}
