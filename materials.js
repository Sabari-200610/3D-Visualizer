// =============================================================================
// ULTRA-REALISTIC PBR MATERIAL & PROCEDURAL TEXTURE SYSTEM
// Non-shiny, physically tangible matte & satin finishes
// =============================================================================

function makeCanvasTexture(drawFn, size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.encoding = THREE.sRGBEncoding;
  return tex;
}

// Procedural value noise generator for micro-surface roughness
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

// ---- HIGH-FIDELITY BUMP & NORMAL MAP GENERATORS ----

// Brushed Anodized Metal Bump Map (fine subtle anisotropic satin grooves)
function makeBrushedMetalBumpMap() {
  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, sz, sz);
    for (let i = 0; i < 220; i++) {
      const y = Math.random() * sz;
      const bright = 110 + Math.random() * 35;
      ctx.strokeStyle = `rgb(${bright},${bright},${bright})`;
      ctx.lineWidth = 0.4 + Math.random() * 0.7;
      ctx.globalAlpha = 0.08 + Math.random() * 0.1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(sz, y + (Math.random() - 0.5) * 3);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // Fine stipple noise
    for (let i = 0; i < 300; i++) {
      const px = Math.random() * sz;
      const py = Math.random() * sz;
      ctx.fillStyle = Math.random() > 0.5 ? '#8a8a8a' : '#767676';
      ctx.fillRect(px, py, 1, 1);
    }
  }, 512);
}

// Matte Engineering Plastic / Stippled Polymer Bump Map
function makeTexturedPlasticBumpMap() {
  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, sz, sz);
    const img = ctx.createImageData(sz, sz);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 120 + Math.floor(Math.random() * 16);
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < 150; i++) {
      const px = Math.random() * sz;
      const py = Math.random() * sz;
      const r = 1 + Math.random() * 1.5;
      ctx.fillStyle = Math.random() > 0.5 ? '#989898' : '#686868';
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, 256);
}

// Micro-Roughness Variation Map
function makeRoughnessBumpMap(roughnessBase) {
  return makeCanvasTexture((ctx, sz) => {
    const base = Math.round(roughnessBase * 255);
    ctx.fillStyle = `rgb(${base},${base},${base})`;
    ctx.fillRect(0, 0, sz, sz);
    const img = ctx.createImageData(sz, sz);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = base + (Math.random() - 0.5) * 30;
      const clamped = Math.max(0, Math.min(255, v));
      img.data[i] = clamped;
      img.data[i + 1] = clamped;
      img.data[i + 2] = clamped;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }, 256);
}

// Rubber Tread / Grippy Knurl Bump Map
function makeRubberTreadBumpMap() {
  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, sz, sz);
    ctx.strokeStyle = '#484848';
    ctx.lineWidth = 3;
    const spacing = 16;
    for (let x = 0; x < sz; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, sz);
      ctx.stroke();
    }
    ctx.fillStyle = '#a0a0a0';
    for (let y = spacing / 2; y < sz; y += spacing) {
      for (let x = spacing / 2; x < sz; x += spacing) {
        ctx.fillRect(x - 2, y - 2, 4, 4);
      }
    }
  }, 256);
}

// ---- HIGH-FIDELITY SURFACE COLOR MAP GENERATORS ----

// Matte Satin Metal Color Map (natural subtle gradient, NO glaring gloss)
function makeMetalTexture(hexColor) {
  const r = (hexColor >> 16) & 0xff;
  const g = (hexColor >> 8) & 0xff;
  const b = hexColor & 0xff;

  return makeCanvasTexture((ctx, sz) => {
    const grad = ctx.createLinearGradient(0, 0, sz, sz);
    grad.addColorStop(0, `rgb(${r},${g},${b})`);
    grad.addColorStop(
      0.3,
      `rgb(${Math.min(r + 14, 255)},${Math.min(g + 14, 255)},${Math.min(b + 14, 255)})`
    );
    grad.addColorStop(
      0.6,
      `rgb(${Math.max(r - 12, 0)},${Math.max(g - 12, 0)},${Math.max(b - 12, 0)})`
    );
    grad.addColorStop(
      1,
      `rgb(${Math.min(r + 8, 255)},${Math.min(g + 8, 255)},${Math.min(b + 8, 255)})`
    );
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, sz, sz);

    ctx.globalAlpha = 0.05;
    for (let i = 0; i < 140; i++) {
      const y = Math.random() * sz;
      ctx.strokeStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(sz, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }, 512);
}

// Matte Printed Circuit Board (PCB) Texture
function makePCBTexture() {
  return makeCanvasTexture((ctx, sz) => {
    // Matte dark solder mask
    ctx.fillStyle = '#12331c';
    ctx.fillRect(0, 0, sz, sz);

    // Subtle substrate grid
    ctx.strokeStyle = 'rgba(25, 65, 38, 0.4)';
    ctx.lineWidth = 1;
    for (let i = 0; i < sz; i += 14) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, sz);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(sz, i);
      ctx.stroke();
    }

    // Copper / satin gold traces
    ctx.strokeStyle = 'rgba(195, 155, 45, 0.65)';
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let bus = 0; bus < 14; bus++) {
      const startX = 20 + bus * 32;
      ctx.beginPath();
      ctx.moveTo(startX, 0);
      ctx.lineTo(startX, sz * 0.3);
      ctx.lineTo(startX + 28, sz * 0.3 + 28);
      ctx.lineTo(startX + 28, sz * 0.7);
      ctx.lineTo(startX, sz * 0.7 + 28);
      ctx.lineTo(startX, sz);
      ctx.stroke();
    }

    // Secondary fine traces
    ctx.strokeStyle = 'rgba(160, 125, 35, 0.45)';
    ctx.lineWidth = 1.0;
    for (let t = 0; t < 20; t++) {
      const x = Math.floor((t * 26) % sz);
      const y = Math.floor((t * 31) % sz);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 40, y);
      ctx.lineTo(x + 55, y + 15);
      ctx.stroke();
    }

    // Solder pads
    ctx.fillStyle = '#dcb24a';
    for (let p = 0; p < 36; p++) {
      const px = 20 + (p % 6) * 78;
      const py = 20 + Math.floor(p / 6) * 78;
      ctx.fillRect(px - 5, py - 5, 10, 10);
      ctx.fillStyle = '#c49a32';
      ctx.fillRect(px - 3, py - 3, 6, 6);
      ctx.fillStyle = '#dcb24a';
    }

    // Micro solder vias
    ctx.fillStyle = '#d4aa38';
    for (let v = 0; v < 50; v++) {
      const vx = Math.floor((v * 47) % (sz - 20)) + 10;
      const vy = Math.floor((v * 67) % (sz - 20)) + 10;
      ctx.beginPath();
      ctx.arc(vx, vy, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 512);
}

// Silicon Die / Integrated Circuit Heatspreader Texture (Matte nickel)
function makeSiliconDieTexture(hexColor) {
  const r = (hexColor >> 16) & 0xff;
  const g = (hexColor >> 8) & 0xff;
  const b = hexColor & 0xff;

  return makeCanvasTexture((ctx, sz) => {
    const grad = ctx.createLinearGradient(0, 0, sz, sz);
    grad.addColorStop(0, `rgb(${r},${g},${b})`);
    grad.addColorStop(0.5, `rgb(${Math.min(r + 15, 255)},${Math.min(g + 15, 255)},${Math.min(b + 15, 255)})`);
    grad.addColorStop(1, `rgb(${Math.max(r - 12, 0)},${Math.max(g - 12, 0)},${Math.max(b - 12, 0)})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, sz, sz);

    const pad = sz * 0.25;
    const dieW = sz * 0.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(pad, pad, dieW, dieW);

    ctx.fillStyle = 'rgba(20, 30, 45, 0.55)';
    ctx.fillRect(pad + 4, pad + 4, dieW - 8, dieW - 8);

    ctx.strokeStyle = 'rgba(100, 180, 220, 0.2)';
    ctx.lineWidth = 1;
    for (let k = pad + 10; k < pad + dieW - 10; k += 8) {
      ctx.beginPath();
      ctx.moveTo(pad + 8, k);
      ctx.lineTo(pad + dieW - 8, k);
      ctx.stroke();
    }
  }, 512);
}

// Carbon Fiber / Woven High-Tech Composite Texture
function makeCarbonFiberTexture() {
  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#14161a';
    ctx.fillRect(0, 0, sz, sz);

    const step = 16;
    for (let y = 0; y < sz; y += step) {
      for (let x = 0; x < sz; x += step) {
        const isAlt = ((x / step) + (y / step)) % 2 === 0;
        ctx.fillStyle = isAlt ? '#1d2128' : '#15171e';
        ctx.fillRect(x, y, step, step);

        ctx.strokeStyle = isAlt ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (isAlt) {
          ctx.moveTo(x, y);
          ctx.lineTo(x + step, y + step);
        } else {
          ctx.moveTo(x + step, y);
          ctx.lineTo(x, y + step);
        }
        ctx.stroke();
      }
    }
  }, 256);
}

// Planetary Rocky Surface Texture
function makeRockyTexture(hexColor) {
  const r = (hexColor >> 16) & 0xff;
  const g = (hexColor >> 8) & 0xff;
  const b = hexColor & 0xff;

  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, sz, sz);
    valueNoise(ctx, sz, 8, 0.45, 0, 255);
    ctx.globalAlpha = 0.2;
    for (let c = 0; c < 24; c++) {
      const cx = Math.random() * sz;
      const cy = Math.random() * sz;
      const rad = 4 + Math.random() * 26;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grd.addColorStop(0, 'rgba(0,0,0,0.7)');
      grd.addColorStop(0.7, 'rgba(0,0,0,0.15)');
      grd.addColorStop(1, 'rgba(255,255,255,0.25)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, 512);
}

// Earth Continents & Oceans Texture
function makeEarthTexture() {
  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#104d80';
    ctx.fillRect(0, 0, sz, sz);
    const lands = [
      { x: 0.15, y: 0.3, w: 0.18, h: 0.35 },
      { x: 0.35, y: 0.2, w: 0.25, h: 0.5 },
      { x: 0.62, y: 0.25, w: 0.16, h: 0.3 },
      { x: 0.72, y: 0.55, w: 0.12, h: 0.2 },
      { x: 0.08, y: 0.55, w: 0.12, h: 0.2 },
      { x: 0.5, y: 0.65, w: 0.2, h: 0.2 },
    ];
    ctx.fillStyle = '#2f6d2b';
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
    ctx.fillStyle = '#edf6ff';
    ctx.fillRect(0, 0, sz, sz * 0.08);
    ctx.fillRect(0, sz * 0.92, sz, sz * 0.08);
    ctx.globalAlpha = 0.15;
    valueNoise(ctx, sz, 4, 0.5, 140, 255);
    ctx.globalAlpha = 1;
  }, 512);
}

// Gas Giant Bands
function makeGasGiantTexture(hexColor) {
  const r = (hexColor >> 16) & 0xff;
  const g = (hexColor >> 8) & 0xff;
  const b = hexColor & 0xff;

  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, sz, sz);
    const bandColors = [
      `rgba(${Math.min(r + 40, 255)},${Math.min(g + 20, 255)},${Math.max(b - 20, 0)},0.55)`,
      `rgba(${Math.max(r - 30, 0)},${Math.max(g - 20, 0)},${Math.max(b - 10, 0)},0.45)`,
      `rgba(${Math.min(r + 20, 255)},${Math.min(g + 30, 255)},${b},0.4)`,
      `rgba(${Math.max(r - 20, 0)},${g},${Math.min(b + 20, 255)},0.35)`,
    ];
    const bandCount = 18;
    for (let i = 0; i < bandCount; i++) {
      const y = (i / bandCount) * sz;
      const h = sz / bandCount;
      ctx.fillStyle = bandColors[i % bandColors.length];
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= sz; x += 6) {
        ctx.lineTo(x, y + Math.sin(x * 0.04 + i * 1.2) * (h * 0.35));
      }
      ctx.lineTo(sz, y + h);
      ctx.lineTo(0, y + h);
      ctx.closePath();
      ctx.fill();
    }
  }, 512);
}

// Glowing Star Core
function makeStarTexture() {
  return makeCanvasTexture((ctx, sz) => {
    const grad = ctx.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz / 2);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.25, '#fff1a8');
    grad.addColorStop(0.55, '#ff8d1e');
    grad.addColorStop(0.85, '#e02800');
    grad.addColorStop(1, '#660a00');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, sz, sz);
  }, 512);
}

// Ice / Frost Texture
function makeIceTexture(hexColor) {
  const r = (hexColor >> 16) & 0xff;
  const g = (hexColor >> 8) & 0xff;
  const b = hexColor & 0xff;

  return makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, sz, sz);
    valueNoise(ctx, sz, 6, 0.4, 180, 255);
    ctx.strokeStyle = 'rgba(220, 245, 255, 0.7)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * sz, Math.random() * sz);
      ctx.lineTo(Math.random() * sz, Math.random() * sz);
      ctx.stroke();
    }
  }, 512);
}

// Ring Texture
function makeRingTexture(hexColor) {
  const r = (hexColor >> 16) & 0xff;
  const g = (hexColor >> 8) & 0xff;
  const b = hexColor & 0xff;

  return makeCanvasTexture((ctx, sz) => {
    const bandCount = 32;
    for (let i = 0; i < bandCount; i++) {
      const x = (i / bandCount) * sz;
      const w = sz / bandCount;
      const alpha = 0.25 + Math.random() * 0.7;
      const bright = Math.random() * 40 - 20;
      ctx.fillStyle = `rgba(${Math.min(r + bright, 255)},${Math.min(
        g + bright,
        255
      )},${Math.min(b + bright, 255)},${alpha})`;
      ctx.fillRect(x, 0, w, sz);
    }
  }, 256);
}

// =============================================================================
// REALISTIC MATTE & SATIN PBR MATERIAL GENERATOR (NOT SHINY)
// =============================================================================

function createRealisticMaterial(part) {
  const mt = part.materialType || 'default';
  const color = part.color;
  const isTransparent = !!part.transparent;
  const opacity = part.opacity !== undefined ? part.opacity : 1.0;

  // Defaults: High roughness (0.65), low metalness (0.05), NO clearcoat (0.0)
  // This produces authentic, non-shiny manufactured surfaces.
  let roughness = 0.65;
  let metalness = 0.05;
  let clearcoat = 0.0;
  let clearcoatRoughness = 0.3;
  let transmission = 0.0;
  let ior = 1.5;
  let thickness = 0.0;
  let emissiveColor = 0x000000;
  let emissiveIntensity = 0.0;

  let map = null;
  let bumpMap = null;
  let bumpScale = 0.012;
  let roughnessMap = null;

  const n = (part.name || '').toLowerCase();

  // 1. Explicit materialType handling
  if (mt === 'metal' || mt === 'liquid-metal') {
    roughness = mt === 'liquid-metal' ? 0.35 : 0.55;
    metalness = mt === 'liquid-metal' ? 0.75 : 0.68;
    clearcoat = 0.0;
    map = makeMetalTexture(color);
    bumpMap = makeBrushedMetalBumpMap();
    bumpScale = 0.015;
    roughnessMap = makeRoughnessBumpMap(0.55);
  } else if (mt === 'pcb') {
    roughness = 0.62;
    metalness = 0.18;
    clearcoat = 0.0;
    map = makePCBTexture();
    bumpMap = makeBrushedMetalBumpMap();
    bumpScale = 0.01;
  } else if (mt === 'glass') {
    roughness = 0.08;
    metalness = 0.02;
    transmission = 0.88;
    ior = 1.52;
    thickness = 1.0;
    clearcoat = 0.4;
    clearcoatRoughness = 0.1;
  } else if (mt === 'rocky') {
    roughness = 0.95;
    metalness = 0.0;
    map = makeRockyTexture(color);
    bumpMap = makeRoughnessBumpMap(0.6);
    bumpScale = 0.03;
  } else if (mt === 'earth') {
    roughness = 0.75;
    metalness = 0.02;
    map = makeEarthTexture();
    bumpMap = makeRoughnessBumpMap(0.5);
    bumpScale = 0.02;
  } else if (mt === 'star') {
    roughness = 1.0;
    metalness = 0.0;
    map = makeStarTexture();
    emissiveColor = 0xff8800;
    emissiveIntensity = 2.0;
  } else if (mt === 'gas-giant') {
    roughness = 0.82;
    metalness = 0.0;
    map = makeGasGiantTexture(color);
  } else if (mt === 'ice') {
    roughness = 0.28;
    metalness = 0.04;
    transmission = 0.35;
    ior = 1.31;
    map = makeIceTexture(color);
  } else if (mt === 'ring') {
    roughness = 0.9;
    metalness = 0.0;
    map = makeRingTexture(color);
  } else if (mt === 'plastic') {
    roughness = 0.72;
    metalness = 0.0;
    clearcoat = 0.0;
    bumpMap = makeTexturedPlasticBumpMap();
    bumpScale = 0.008;
  } else {
    // 2. Intelligent name-based procedural physical materials (Matte & Satin)
    if (
      n.includes('motherboard') ||
      n.includes('pcb') ||
      n.includes('circuit') ||
      n.includes('board') ||
      n.includes('flight controller')
    ) {
      roughness = 0.62;
      metalness = 0.2;
      clearcoat = 0.0;
      map = makePCBTexture();
      bumpMap = makeBrushedMetalBumpMap();
      bumpScale = 0.01;
    } else if (
      n.includes('cpu') ||
      n.includes('chip') ||
      n.includes('processor') ||
      n.includes('gpu') ||
      n.includes('soc')
    ) {
      roughness = 0.45;
      metalness = 0.68;
      clearcoat = 0.0;
      map = makeSiliconDieTexture(color);
      bumpMap = makeBrushedMetalBumpMap();
      bumpScale = 0.012;
    } else if (
      n.includes('screen') ||
      n.includes('display') ||
      (n.includes('panel') && !n.includes('solar'))
    ) {
      roughness = 0.18;
      metalness = 0.08;
      clearcoat = 0.2;
      clearcoatRoughness = 0.15;
      emissiveColor = color;
      emissiveIntensity = 0.35;
    } else if (
      n.includes('glass') ||
      n.includes('lens') ||
      n.includes('visor') ||
      n.includes('cockpit') ||
      n.includes('porthole')
    ) {
      roughness = 0.08;
      metalness = 0.02;
      transmission = 0.86;
      ior = 1.52;
      thickness = 0.8;
      clearcoat = 0.4;
      clearcoatRoughness = 0.08;
      emissiveColor = color;
      emissiveIntensity = 0.06;
    } else if (
      n.includes('case') ||
      n.includes('chassis') ||
      n.includes('housing') ||
      n.includes('frame') ||
      n.includes('body')
    ) {
      if (isTransparent) {
        roughness = 0.09;
        metalness = 0.04;
        transmission = 0.82;
        ior = 1.49;
        thickness = 1.2;
        clearcoat = 0.3;
      } else {
        // Satin powder-coated / matte anodized aluminum
        roughness = 0.58;
        metalness = 0.65;
        clearcoat = 0.0;
        map = makeMetalTexture(color);
        bumpMap = makeBrushedMetalBumpMap();
        bumpScale = 0.012;
      }
    } else if (
      n.includes('carbon') ||
      n.includes('strut') ||
      n.includes('arm') ||
      n.includes('boom')
    ) {
      roughness = 0.62;
      metalness = 0.08;
      clearcoat = 0.0;
      map = makeCarbonFiberTexture();
      bumpMap = makeBrushedMetalBumpMap();
      bumpScale = 0.01;
    } else if (
      n.includes('metal') ||
      n.includes('steel') ||
      n.includes('iron') ||
      n.includes('alloy') ||
      n.includes('exhaust') ||
      n.includes('piston') ||
      n.includes('shaft') ||
      n.includes('gear') ||
      n.includes('cylinder') ||
      n.includes('crankshaft') ||
      n.includes('engine')
    ) {
      roughness = 0.52;
      metalness = 0.72;
      clearcoat = 0.0;
      map = makeMetalTexture(color);
      bumpMap = makeBrushedMetalBumpMap();
      bumpScale = 0.014;
    } else if (
      n.includes('gold') ||
      n.includes('brass') ||
      n.includes('copper') ||
      n.includes('heatsink')
    ) {
      roughness = 0.48;
      metalness = 0.78;
      clearcoat = 0.0;
      map = makeMetalTexture(color);
      bumpMap = makeBrushedMetalBumpMap();
      bumpScale = 0.012;
    } else if (
      n.includes('battery') ||
      n.includes('cell') ||
      n.includes('psu') ||
      n.includes('power')
    ) {
      roughness = 0.68;
      metalness = 0.3;
      clearcoat = 0.0;
      map = makeMetalTexture(color);
      bumpMap = makeBrushedMetalBumpMap();
      bumpScale = 0.008;
    } else if (
      n.includes('fan') ||
      n.includes('blade') ||
      n.includes('propeller') ||
      n.includes('rotor')
    ) {
      roughness = 0.72;
      metalness = 0.15;
      clearcoat = 0.0;
      bumpMap = makeBrushedMetalBumpMap();
      bumpScale = 0.008;
    } else if (
      n.includes('led') ||
      n.includes('light') ||
      n.includes('lamp') ||
      n.includes('glow') ||
      n.includes('laser') ||
      n.includes('thruster') ||
      n.includes('flame')
    ) {
      roughness = 0.35;
      metalness = 0.05;
      emissiveColor = color;
      emissiveIntensity = 1.6;
      clearcoat = 0.0;
    } else if (
      n.includes('rubber') ||
      n.includes('tire') ||
      n.includes('wheel') ||
      n.includes('grip') ||
      n.includes('pedal')
    ) {
      roughness = 0.95;
      metalness = 0.0;
      clearcoat = 0.0;
      bumpMap = makeRubberTreadBumpMap();
      bumpScale = 0.025;
    } else if (
      n.includes('cable') ||
      n.includes('cord') ||
      n.includes('wire') ||
      n.includes('harness')
    ) {
      roughness = 0.76;
      metalness = 0.02;
      clearcoat = 0.0;
      bumpMap = makeTexturedPlasticBumpMap();
      bumpScale = 0.008;
    } else {
      // General engineered component: natural matte finish
      roughness = 0.65;
      metalness = 0.08;
      clearcoat = 0.0;
      bumpMap = makeTexturedPlasticBumpMap();
      bumpScale = 0.008;
    }
  }

  const activeWireframe =
    typeof window !== 'undefined' && typeof window.isWireframe !== 'undefined'
      ? window.isWireframe
      : false;

  const matParams = {
    color,
    roughness,
    metalness,
    clearcoat,
    clearcoatRoughness,
    transparent: isTransparent || transmission > 0,
    opacity: isTransparent ? opacity : 1.0,
    wireframe: activeWireframe,
  };

  if (transmission > 0) {
    matParams.transmission = transmission;
    matParams.ior = ior;
    matParams.thickness = thickness;
  }

  if (map) matParams.map = map;
  if (bumpMap) {
    matParams.bumpMap = bumpMap;
    matParams.bumpScale = bumpScale;
  }
  if (roughnessMap) matParams.roughnessMap = roughnessMap;

  // Soft, realistic reflection level (NO blinding shiny mirror reflections)
  matParams.envMapIntensity = metalness > 0.5 ? 0.35 : 0.2;

  if (emissiveIntensity > 0) {
    matParams.emissive = emissiveColor;
    matParams.emissiveIntensity = emissiveIntensity;
  }

  return new THREE.MeshPhysicalMaterial(matParams);
}
