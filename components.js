// =============================================================================
// PROCEDURAL REALISTIC 3D COMPONENT GENERATOR & ANIMATION SYSTEM
// Enhances basic primitive geometries with authentic engineering details,
// sub-assemblies, realistic hardware, and animated interactive elements.
// =============================================================================

const COMPONENT_ANIMATORS = [];

/**
 * Builds an authentic, realistic compound component group or mesh.
 */
function buildRealisticComponent(part, objectId, baseMaterial, createRealisticGeometry) {
  const partId = part.id;
  const name = (part.name || '').toLowerCase();
  const hex = part.color;

  let group = new THREE.Group();
  let handled = false;

  // ---------------------------------------------------------------------------
  // 1. COMPUTER WORKSTATION HIGH-FIDELITY COMPONENTS
  // ---------------------------------------------------------------------------
  if (objectId === 'computer') {
    if (partId === 'cpu') {
      handled = true;
      group = buildRealisticCPU(part, baseMaterial);
    } else if (partId === 'motherboard') {
      handled = true;
      group = buildRealisticMotherboard(part, baseMaterial);
    } else if (partId === 'gpu') {
      handled = true;
      group = buildRealisticGPU(part, baseMaterial);
    } else if (partId === 'ram1' || partId === 'ram2') {
      handled = true;
      group = buildRealisticRAM(part, baseMaterial);
    } else if (partId === 'fan') {
      handled = true;
      group = buildRealisticFan(part, baseMaterial);
    } else if (partId === 'psu') {
      handled = true;
      group = buildRealisticPSU(part, baseMaterial);
    } else if (partId === 'disk') {
      handled = true;
      group = buildRealisticSSD(part, baseMaterial);
    } else if (partId === 'case') {
      handled = true;
      group = buildRealisticCase(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 2. QUANTUM ATOM HIGH-FIDELITY PARTICLES & ORBITALS
  // ---------------------------------------------------------------------------
  else if (objectId === 'atom') {
    if (partId === 'nucleus') {
      handled = true;
      group = buildRealisticAtomNucleus(part, baseMaterial);
    } else if (partId.startsWith('electron')) {
      handled = true;
      group = buildRealisticElectron(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 3. SOLAR SYSTEM CELESTIAL REALISM
  // ---------------------------------------------------------------------------
  else if (objectId === 'solar-system') {
    if (partId === 'sun') {
      handled = true;
      group = buildRealisticSun(part, baseMaterial);
    } else if (partId === 'saturn-ring') {
      handled = true;
      group = buildRealisticSaturnRings(part, baseMaterial);
    } else {
      handled = true;
      group = buildRealisticPlanet(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 4. MOBILE PHONE SMARTPHONE
  // ---------------------------------------------------------------------------
  else if (objectId === 'mobile-phone') {
    if (partId === 'body') {
      handled = true;
      group = buildRealisticPhoneBody(part, baseMaterial);
    } else if (partId === 'screen') {
      handled = true;
      group = buildRealisticPhoneScreen(part, baseMaterial);
    } else if (partId === 'camera') {
      handled = true;
      group = buildRealisticPhoneCamera(part, baseMaterial);
    } else if (partId === 'chip') {
      handled = true;
      group = buildRealisticPhoneChip(part, baseMaterial);
    } else if (partId === 'battery') {
      handled = true;
      group = buildRealisticPhoneBattery(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 5. CAR / VEHICLE
  // ---------------------------------------------------------------------------
  else if (objectId === 'car') {
    if (partId.startsWith('wheel')) {
      handled = true;
      group = buildRealisticCarWheel(part, baseMaterial);
    } else if (partId === 'engine') {
      handled = true;
      group = buildRealisticCarEngine(part, baseMaterial);
    } else if (partId === 'chassis') {
      handled = true;
      group = buildRealisticCarChassis(part, baseMaterial);
    } else if (partId === 'cabin') {
      handled = true;
      group = buildRealisticCarCabin(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 6. BICYCLE
  // ---------------------------------------------------------------------------
  else if (objectId === 'bicycle') {
    if (partId.includes('wheel')) {
      handled = true;
      group = buildRealisticBikeWheel(part, baseMaterial);
    } else if (partId === 'frame') {
      handled = true;
      group = buildRealisticBikeFrame(part, baseMaterial);
    } else if (partId === 'pedals') {
      handled = true;
      group = buildRealisticBikePedals(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 7. TELEVISION
  // ---------------------------------------------------------------------------
  else if (objectId === 'tv') {
    if (partId === 'screen') {
      handled = true;
      group = buildRealisticTVScreen(part, baseMaterial);
    } else if (partId === 'backlight') {
      handled = true;
      group = buildRealisticTVBacklight(part, baseMaterial);
    } else if (partId === 'stand') {
      handled = true;
      group = buildRealisticTVStand(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 8. LAPTOP
  // ---------------------------------------------------------------------------
  else if (objectId === 'laptop') {
    if (partId === 'keyboard') {
      handled = true;
      group = buildRealisticLaptopKeyboard(part, baseMaterial);
    } else if (partId === 'screen') {
      handled = true;
      group = buildRealisticLaptopScreen(part, baseMaterial);
    } else if (partId === 'trackpad') {
      handled = true;
      group = buildRealisticLaptopTrackpad(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 9. WASHING MACHINE
  // ---------------------------------------------------------------------------
  else if (objectId === 'washing-machine') {
    if (partId === 'drum') {
      handled = true;
      group = buildRealisticWashingDrum(part, baseMaterial);
    } else if (partId === 'door') {
      handled = true;
      group = buildRealisticWashingDoor(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 10. AIR CONDITIONER
  // ---------------------------------------------------------------------------
  else if (objectId === 'air-conditioner') {
    if (partId === 'fan') {
      handled = true;
      group = buildRealisticACFan(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // FALLBACK: Enhanced beveled mesh with engineering chamfers & fasteners
  // ---------------------------------------------------------------------------
  if (!handled) {
    const geom = createRealisticGeometry(part.geometry);
    const mainMesh = new THREE.Mesh(geom, baseMaterial);
    mainMesh.castShadow = !part.transparent;
    mainMesh.receiveShadow = true;
    group.add(mainMesh);

    // Subtle edge highlight outline on mechanical parts
    if (!part.transparent && part.geometry.type === 'box') {
      const edgesGeom = new THREE.EdgesGeometry(geom, 24);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x4a6288,
        transparent: true,
        opacity: 0.35,
        linewidth: 1,
      });
      const wire = new THREE.LineSegments(edgesGeom, edgeMat);
      wire.renderOrder = 2;
      group.add(wire);
    }
  }

  group.position.set(...part.position);
  if (part.rotation) {
    group.rotation.set(...part.rotation);
  }

  // Ensure root group holds the partData for raycasting
  group.userData.partData = part;
  return group;
}

// =============================================================================
// SPECIFIC REALISTIC PROCEDURAL COMPONENT IMPLEMENTATIONS
// =============================================================================

// Helper: Metal Material generator with satin sheen
function getHardwareMat(hexColor, roughness = 0.3, metalness = 0.85) {
  return new THREE.MeshStandardMaterial({
    color: hexColor,
    roughness: roughness,
    metalness: metalness,
  });
}

// -----------------------------------------------------------------------------
// 1. CPU (PROCESSOR): Substrate, Nickel IHS, Laser Marking, Alignment Notch
// -----------------------------------------------------------------------------
function buildRealisticCPU(part, baseMaterial) {
  const group = new THREE.Group();

  // Substrate Green PCB Carrier
  const pcbGeom = new THREE.BoxGeometry(0.5, 0.03, 0.5);
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x14532d,
    roughness: 0.6,
    metalness: 0.15,
  });
  const pcb = new THREE.Mesh(pcbGeom, pcbMat);
  pcb.position.y = -0.055;
  pcb.castShadow = true;
  group.add(pcb);

  // Gold contact pads underside
  const goldGeom = new THREE.PlaneGeometry(0.44, 0.44);
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xeab308,
    roughness: 0.3,
    metalness: 0.9,
  });
  const goldPads = new THREE.Mesh(goldGeom, goldMat);
  goldPads.rotation.x = Math.PI / 2;
  goldPads.position.y = -0.071;
  group.add(goldPads);

  // Nickel-Plated Copper Heat Spreader (IHS)
  const ihsGeom = new THREE.BoxGeometry(0.42, 0.07, 0.42);
  const ihsMat = new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    roughness: 0.22,
    metalness: 0.88,
  });
  const ihs = new THREE.Mesh(ihsGeom, ihsMat);
  ihs.position.y = -0.005;
  ihs.castShadow = true;
  group.add(ihs);

  // Laser Etched CPU Branding Plate
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 256;
  labelCanvas.height = 256;
  const ctx = labelCanvas.getContext('2d');
  ctx.fillStyle = '#b0b7c3';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#475569';
  ctx.font = 'bold 24px monospace';
  ctx.fillText('ULTRA-CORE i9', 30, 75);
  ctx.font = '16px monospace';
  ctx.fillText('32 CORES • 5.8 GHz', 30, 115);
  ctx.fillText('10nm ARCHITECTURE', 30, 145);
  ctx.fillStyle = '#64748b';
  ctx.fillRect(30, 175, 196, 6);
  ctx.fillRect(30, 190, 80, 25);
  const labelTex = new THREE.CanvasTexture(labelCanvas);

  const topPlateGeom = new THREE.PlaneGeometry(0.38, 0.38);
  const topPlateMat = new THREE.MeshStandardMaterial({
    map: labelTex,
    roughness: 0.35,
    metalness: 0.7,
  });
  const topPlate = new THREE.Mesh(topPlateGeom, topPlateMat);
  topPlate.rotation.x = -Math.PI / 2;
  topPlate.position.y = 0.031;
  group.add(topPlate);

  // Gold Triangle Alignment Notch
  const triShape = new THREE.Shape();
  triShape.moveTo(0, 0);
  triShape.lineTo(0.04, 0);
  triShape.lineTo(0, 0.04);
  triShape.closePath();
  const triGeom = new THREE.ShapeGeometry(triShape);
  const triMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
  const notch = new THREE.Mesh(triGeom, triMat);
  notch.rotation.x = -Math.PI / 2;
  notch.position.set(-0.24, -0.038, 0.24);
  group.add(notch);

  return group;
}

// -----------------------------------------------------------------------------
// 2. MOTHERBOARD: ATX PCB, CPU Socket, DIMM Slots, PCIe x16, Heatsinks, VRMs
// -----------------------------------------------------------------------------
function buildRealisticMotherboard(part, baseMaterial) {
  const group = new THREE.Group();

  // Primary PCB Mainboard
  const pcbGeom = new THREE.BoxGeometry(1.9, 0.04, 1.9);
  const mainPcb = new THREE.Mesh(pcbGeom, baseMaterial);
  mainPcb.receiveShadow = true;
  group.add(mainPcb);

  // CPU Socket with Metallic retention bracket
  const socketBaseGeom = new THREE.BoxGeometry(0.62, 0.03, 0.62);
  const socketMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.5,
    metalness: 0.2,
  });
  const socket = new THREE.Mesh(socketBaseGeom, socketMat);
  socket.position.set(-0.4, 0.03, 0.4);
  group.add(socket);

  const leverGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.55, 8);
  const silverMat = getHardwareMat(0x94a3b8, 0.2, 0.9);
  const lever = new THREE.Mesh(leverGeom, silverMat);
  lever.rotation.z = Math.PI / 2;
  lever.position.set(-0.4, 0.05, 0.72);
  group.add(lever);

  // 4 RAM DIMM Sockets with End Clips
  for (let i = 0; i < 4; i++) {
    const slotX = 0.25 + i * 0.14;
    const slotGeom = new THREE.BoxGeometry(0.06, 0.06, 0.7);
    const slotMat = new THREE.MeshStandardMaterial({
      color: i % 2 === 0 ? 0x0f172a : 0x1e293b,
      roughness: 0.7,
    });
    const dimm = new THREE.Mesh(slotGeom, slotMat);
    dimm.position.set(slotX, 0.04, 0.5);
    group.add(dimm);

    // Retention latches
    const latchGeom = new THREE.BoxGeometry(0.04, 0.08, 0.06);
    const latchMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
    const latch1 = new THREE.Mesh(latchGeom, latchMat);
    latch1.position.set(slotX, 0.06, 0.85);
    const latch2 = new THREE.Mesh(latchGeom, latchMat);
    latch2.position.set(slotX, 0.06, 0.15);
    group.add(latch1);
    group.add(latch2);
  }

  // 2 PCIe x16 Armor Slots with Metal Shielding
  for (let p = 0; p < 2; p++) {
    const pZ = -0.15 - p * 0.45;
    const pcieGeom = new THREE.BoxGeometry(1.2, 0.07, 0.09);
    const pcieArmor = new THREE.Mesh(pcieGeom, silverMat);
    pcieArmor.position.set(-0.1, 0.045, pZ);
    group.add(pcieArmor);

    // End retention tab
    const tabGeom = new THREE.BoxGeometry(0.08, 0.08, 0.07);
    const tab = new THREE.Mesh(tabGeom, socketMat);
    tab.position.set(0.52, 0.05, pZ);
    group.add(tab);
  }

  // VRM Heatsinks (Machined Aluminum Cooling Fin Arrays)
  const vrm1Geom = new THREE.BoxGeometry(0.35, 0.22, 0.75);
  const vrmMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.25,
    metalness: 0.85,
  });
  const vrm1 = new THREE.Mesh(vrm1Geom, vrmMat);
  vrm1.position.set(-0.75, 0.12, 0.4);
  vrm1.castShadow = true;
  group.add(vrm1);

  const vrm2Geom = new THREE.BoxGeometry(0.65, 0.18, 0.3);
  const vrm2 = new THREE.Mesh(vrm2Geom, vrmMat);
  vrm2.position.set(-0.4, 0.1, 0.8);
  vrm2.castShadow = true;
  group.add(vrm2);

  // Southbridge / Chipset Heatsink with Geometric Fin Pattern
  const pchGeom = new THREE.BoxGeometry(0.45, 0.12, 0.45);
  const pchMat = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    roughness: 0.3,
    metalness: 0.7,
  });
  const pch = new THREE.Mesh(pchGeom, pchMat);
  pch.position.set(0.5, 0.07, -0.5);
  group.add(pch);

  // Rows of Solid-State Electrolytic Capacitors (Silver & Black Cans)
  for (let c = 0; c < 8; c++) {
    const capGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.12, 12);
    const capMat = getHardwareMat(0xd4d4d8, 0.2, 0.8);
    const cap = new THREE.Mesh(capGeom, capMat);
    cap.position.set(-0.52, 0.07, 0.08 + c * 0.09);
    group.add(cap);
  }

  // Rear I/O Shield Block with Ports
  const ioGeom = new THREE.BoxGeometry(0.22, 0.32, 0.9);
  const ioMat = getHardwareMat(0x64748b, 0.3, 0.85);
  const ioBlock = new THREE.Mesh(ioGeom, ioMat);
  ioBlock.position.set(-0.84, 0.17, 0.35);
  group.add(ioBlock);

  // 24-Pin ATX Main Power Connector
  const atxGeom = new THREE.BoxGeometry(0.12, 0.14, 0.45);
  const atxMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
  const atx = new THREE.Mesh(atxGeom, atxMat);
  atx.position.set(0.85, 0.08, 0.45);
  group.add(atx);

  return group;
}

// -----------------------------------------------------------------------------
// 3. GPU (GRAPHICS CARD): Shroud, Dual Spinning Fans, Heatsink Fins, Backplate
// -----------------------------------------------------------------------------
function buildRealisticGPU(part, baseMaterial) {
  const group = new THREE.Group();

  // Outer Shroud (Matte Angular Gaming/CAD Styling)
  const shroudGeom = new THREE.BoxGeometry(1.7, 0.18, 0.65);
  const shroud = new THREE.Mesh(shroudGeom, baseMaterial);
  shroud.castShadow = true;
  group.add(shroud);

  // Aluminum Cooling Fin Stack (Visible between shroud and backplate)
  const finStackGeom = new THREE.BoxGeometry(1.6, 0.08, 0.58);
  const finMat = getHardwareMat(0xcbd5e1, 0.35, 0.8);
  const finStack = new THREE.Mesh(finStackGeom, finMat);
  finStack.position.y = -0.06;
  group.add(finStack);

  // Brushed Metal Backplate
  const bpGeom = new THREE.BoxGeometry(1.68, 0.02, 0.64);
  const bpMat = getHardwareMat(0x1e293b, 0.3, 0.8);
  const backplate = new THREE.Mesh(bpGeom, bpMat);
  backplate.position.y = -0.11;
  group.add(backplate);

  // Dual-Slot Rear Metal Mounting Bracket with DisplayPorts
  const bracketGeom = new THREE.BoxGeometry(0.04, 0.48, 0.72);
  const bracketMat = getHardwareMat(0x94a3b8, 0.2, 0.9);
  const bracket = new THREE.Mesh(bracketGeom, bracketMat);
  bracket.position.set(-0.86, 0.05, 0);
  group.add(bracket);

  // Dual Aerodynamic Cooling Fans (Animated Rotation!)
  const fanCenters = [-0.38, 0.38];
  const gpuFanGroups = [];

  fanCenters.forEach((fcX) => {
    // Recessed circular intake bezel
    const ringGeom = new THREE.RingGeometry(0.02, 0.24, 24);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.8,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(fcX, 0.092, 0);
    group.add(ring);

    // Rotating Fan Rotor Assembly
    const fanGroup = new THREE.Group();
    fanGroup.position.set(fcX, 0.095, 0);

    // Center Hub Badge
    const hubGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.04, 16);
    const hubMat = getHardwareMat(0x38bdf8, 0.2, 0.8);
    const hub = new THREE.Mesh(hubGeom, hubMat);
    fanGroup.add(hub);

    // 9 Sculpted Curved Fan Blades
    for (let b = 0; b < 9; b++) {
      const angle = (b / 9) * Math.PI * 2;
      const bladeGeom = new THREE.BoxGeometry(0.15, 0.015, 0.04);
      const bladeMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.4,
      });
      const blade = new THREE.Mesh(bladeGeom, bladeMat);
      blade.position.set(Math.cos(angle) * 0.13, 0, Math.sin(angle) * 0.13);
      blade.rotation.y = -angle;
      blade.rotation.x = 0.35; // Pitch angle for airflow
      fanGroup.add(blade);
    }

    group.add(fanGroup);
    gpuFanGroups.push(fanGroup);
  });

  // Animated loop hook: Rotate GPU Fans continuously!
  COMPONENT_ANIMATORS.push((delta) => {
    gpuFanGroups.forEach((fg) => {
      fg.rotation.y += delta * 12.0;
    });
  });

  // Side Illuminated Logo Bar
  const logoGeom = new THREE.BoxGeometry(0.48, 0.06, 0.02);
  const logoMat = new THREE.MeshStandardMaterial({
    color: 0x22c55e,
    emissive: 0x22c55e,
    emissiveIntensity: 0.8,
  });
  const logo = new THREE.Mesh(logoGeom, logoMat);
  logo.position.set(0, 0.02, 0.33);
  group.add(logo);

  // PCIe Gold Connection Edge
  const edgeGeom = new THREE.BoxGeometry(0.8, 0.06, 0.02);
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0xeab308,
    roughness: 0.2,
    metalness: 0.9,
  });
  const edge = new THREE.Mesh(edgeGeom, edgeMat);
  edge.position.set(-0.2, -0.14, 0.3);
  group.add(edge);

  return group;
}

// -----------------------------------------------------------------------------
// 4. COOLING FAN: Outer Housing Cage, 7 Sculpted Blades, Vibration Dampers
// -----------------------------------------------------------------------------
function buildRealisticFan(part, baseMaterial) {
  const group = new THREE.Group();

  // Outer Square Frame Housing with Beveled Air Cowl
  const frameGeom = new THREE.BoxGeometry(0.9, 0.9, 0.12);
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.55,
    metalness: 0.1,
  });
  const frame = new THREE.Mesh(frameGeom, frameMat);
  frame.castShadow = true;
  group.add(frame);

  // 4 Corner Rubber Anti-Vibration Dampers with Mounting Holes
  const cornerOffsets = [
    [-0.38, -0.38],
    [0.38, -0.38],
    [-0.38, 0.38],
    [0.38, 0.38],
  ];
  cornerOffsets.forEach(([ox, oy]) => {
    const padGeom = new THREE.BoxGeometry(0.12, 0.12, 0.135);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 });
    const pad = new THREE.Mesh(padGeom, padMat);
    pad.position.set(ox, oy, 0);
    group.add(pad);

    // Center screw hole
    const holeGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.15, 12);
    const holeMat = new THREE.MeshBasicMaterial({ color: 0x020617 });
    const hole = new THREE.Mesh(holeGeom, holeMat);
    hole.rotation.x = Math.PI / 2;
    hole.position.set(ox, oy, 0);
    group.add(hole);
  });

  // Circular Inner Cowl
  const cowlGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.122, 32, 1, true);
  const cowlMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const cowl = new THREE.Mesh(cowlGeom, cowlMat);
  cowl.rotation.x = Math.PI / 2;
  group.add(cowl);

  // Rotating Impeller Group
  const rotor = new THREE.Group();

  // Central Motor Hub
  const hubGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.1, 24);
  const hubMat = getHardwareMat(0x38bdf8, 0.25, 0.7);
  const hub = new THREE.Mesh(hubGeom, hubMat);
  hub.rotation.x = Math.PI / 2;
  rotor.add(hub);

  // 7 Aerodynamic Sculpted Impeller Blades with Realistic Pitch
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    const bladeGeom = new THREE.BoxGeometry(0.24, 0.07, 0.015);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.35,
    });
    const blade = new THREE.Mesh(bladeGeom, bladeMat);
    blade.position.set(Math.cos(angle) * 0.25, Math.sin(angle) * 0.25, 0);
    blade.rotation.z = angle;
    blade.rotation.y = 0.45; // Blade pitch for true fluid dynamics look
    rotor.add(blade);
  }

  group.add(rotor);

  // Animated continuous rotation!
  COMPONENT_ANIMATORS.push((delta) => {
    rotor.rotation.z += delta * 15.0;
  });

  return group;
}

// -----------------------------------------------------------------------------
// 5. RAM STICK: Dual Anodized Aluminum Heatspreaders with RGB Light Bar
// -----------------------------------------------------------------------------
function buildRealisticRAM(part, baseMaterial) {
  const group = new THREE.Group();

  // High-Speed Circuit Board (Black PCB)
  const pcbGeom = new THREE.BoxGeometry(0.04, 0.58, 0.34);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.7 });
  const pcb = new THREE.Mesh(pcbGeom, pcbMat);
  group.add(pcb);

  // Dual Ribbed Anodized Aluminum Heat Spreaders
  const hsGeom = new THREE.BoxGeometry(0.09, 0.52, 0.32);
  const hsMat = getHardwareMat(0xf59e0b, 0.28, 0.75);
  const hs = new THREE.Mesh(hsGeom, hsMat);
  hs.castShadow = true;
  group.add(hs);

  // Top RGB Acrylic Diffuser Light Bar
  const rgbGeom = new THREE.BoxGeometry(0.1, 0.08, 0.32);
  const rgbMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.9,
    roughness: 0.1,
  });
  const rgb = new THREE.Mesh(rgbGeom, rgbMat);
  rgb.position.y = 0.28;
  group.add(rgb);

  // Animated subtle pulsating rainbow/glow
  COMPONENT_ANIMATORS.push((delta, time) => {
    const hue = (time * 0.3) % 1;
    rgb.material.color.setHSL(hue, 0.85, 0.6);
    rgb.material.emissive.setHSL(hue, 0.85, 0.5);
  });

  // Gold Edge Contact Fingers
  const goldGeom = new THREE.BoxGeometry(0.042, 0.06, 0.3);
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xeab308,
    roughness: 0.2,
    metalness: 0.95,
  });
  const goldPins = new THREE.Mesh(goldGeom, goldMat);
  goldPins.position.y = -0.3;
  group.add(goldPins);

  return group;
}

// -----------------------------------------------------------------------------
// 6. POWER SUPPLY (PSU): Honeycomb Exhaust Mesh, AC Socket, Rocker Switch
// -----------------------------------------------------------------------------
function buildRealisticPSU(part, baseMaterial) {
  const group = new THREE.Group();

  // Steel Enclosure
  const psuGeom = new THREE.BoxGeometry(1.0, 0.85, 0.95);
  const psu = new THREE.Mesh(psuGeom, baseMaterial);
  psu.castShadow = true;
  group.add(psu);

  // Honeycomb Mesh Canvas Texture on Rear Face
  const meshCanvas = document.createElement('canvas');
  meshCanvas.width = 256;
  meshCanvas.height = 256;
  const ctx = meshCanvas.getContext('2d');
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#020617';
  for (let y = 8; y < 256; y += 16) {
    const shift = (y / 16) % 2 === 0 ? 0 : 8;
    for (let x = 8; x < 256; x += 16) {
      ctx.beginPath();
      ctx.arc(x + shift, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const meshTex = new THREE.CanvasTexture(meshCanvas);

  const meshPlateGeom = new THREE.PlaneGeometry(0.85, 0.75);
  const meshPlateMat = new THREE.MeshStandardMaterial({
    map: meshTex,
    roughness: 0.4,
    metalness: 0.6,
  });
  const meshPlate = new THREE.Mesh(meshPlateGeom, meshPlateMat);
  meshPlate.position.set(0, 0, -0.48);
  meshPlate.rotation.y = Math.PI;
  group.add(meshPlate);

  // Standard 3-Prong IEC AC Power Inlet Receptacle
  const plugGeom = new THREE.BoxGeometry(0.18, 0.12, 0.05);
  const plugMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.8 });
  const plug = new THREE.Mesh(plugGeom, plugMat);
  plug.position.set(-0.25, 0.15, -0.49);
  group.add(plug);

  // Red Illuminated I/O Rocker Power Switch
  const switchGeom = new THREE.BoxGeometry(0.08, 0.12, 0.04);
  const switchMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xb91c1c,
    emissiveIntensity: 0.5,
  });
  const powerSwitch = new THREE.Mesh(switchGeom, switchMat);
  powerSwitch.position.set(0.18, 0.15, -0.49);
  group.add(powerSwitch);

  // Modular Cable Sockets on Front Face
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const sockGeom = new THREE.BoxGeometry(0.14, 0.08, 0.03);
      const sockMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
      const sock = new THREE.Mesh(sockGeom, sockMat);
      sock.position.set(-0.25 + col * 0.25, -0.15 + row * 0.16, 0.48);
      group.add(sock);
    }
  }

  return group;
}

// -----------------------------------------------------------------------------
// 7. SSD STORAGE: 2.5" Brushed Metal Case, SATA Connector, Spec Sticker
// -----------------------------------------------------------------------------
function buildRealisticSSD(part, baseMaterial) {
  const group = new THREE.Group();

  // Solid State Enclosure
  const ssdGeom = new THREE.BoxGeometry(0.9, 0.12, 0.9);
  const ssd = new THREE.Mesh(ssdGeom, baseMaterial);
  ssd.castShadow = true;
  group.add(ssd);

  // Specification Label Graphic
  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 256;
  labelCanvas.height = 256;
  const ctx = labelCanvas.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(15, 15, 226, 40);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('PRO-SPEED NVMe SSD', 25, 42);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px monospace';
  ctx.fillText('CAPACITY: 2.0 TB', 25, 95);
  ctx.fillText('READ: 7,450 MB/s', 25, 125);
  ctx.fillText('WRITE: 6,900 MB/s', 25, 155);
  ctx.fillStyle = '#64748b';
  for (let b = 0; b < 24; b++) {
    const bw = (b % 3 === 0) ? 5 : 2;
    ctx.fillRect(30 + b * 8, 185, bw, 35);
  }
  const labelTex = new THREE.CanvasTexture(labelCanvas);

  const labelGeom = new THREE.PlaneGeometry(0.78, 0.78);
  const labelMat = new THREE.MeshStandardMaterial({
    map: labelTex,
    roughness: 0.35,
    metalness: 0.2,
  });
  const label = new THREE.Mesh(labelGeom, labelMat);
  label.rotation.x = -Math.PI / 2;
  label.position.y = 0.061;
  group.add(label);

  // SATA Data + Power 7+15 Pin Connector Notch
  const sataGeom = new THREE.BoxGeometry(0.35, 0.04, 0.08);
  const sataMat = getHardwareMat(0xeab308, 0.2, 0.9);
  const sata = new THREE.Mesh(sataGeom, sataMat);
  sata.position.set(0, -0.01, -0.46);
  group.add(sata);

  return group;
}

// -----------------------------------------------------------------------------
// 8. PC CHASSIS / CASE: Tempered Glass Panel, Skeleton Rails, Rubber Feet
// -----------------------------------------------------------------------------
function buildRealisticCase(part, baseMaterial) {
  const group = new THREE.Group();

  // Semi-transparent Smoky Glass Panel
  const glassGeom = new THREE.BoxGeometry(0.04, 2.5, 2.1);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x111827,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.88,
    transparent: true,
    opacity: 0.38,
    ior: 1.52,
    reflectivity: 0.7,
  });
  const glass = new THREE.Mesh(glassGeom, glassMat);
  glass.position.set(1.08, 0, 0);
  group.add(glass);

  // 4 Knurled Thumbscrews on Glass Panel
  const screwPositions = [
    [1.11, 1.15, -0.95],
    [1.11, 1.15, 0.95],
    [1.11, -1.15, -0.95],
    [1.11, -1.15, 0.95],
  ];
  screwPositions.forEach(([sx, sy, sz]) => {
    const screwGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.03, 16);
    const screwMat = getHardwareMat(0x94a3b8, 0.2, 0.85);
    const screw = new THREE.Mesh(screwGeom, screwMat);
    screw.rotation.z = Math.PI / 2;
    screw.position.set(sx, sy, sz);
    group.add(screw);
  });

  // Steel Chassis Outer Frame Rails
  const frameGeom = new THREE.BoxGeometry(2.2, 2.6, 2.2);
  const wireGeom = new THREE.EdgesGeometry(frameGeom);
  const railMat = new THREE.LineBasicMaterial({ color: 0x475569, linewidth: 2 });
  const rails = new THREE.LineSegments(wireGeom, railMat);
  group.add(rails);

  // 4 Vibration Damper Rubber Base Feet
  const footPositions = [
    [-0.9, -1.35, -0.9],
    [0.9, -1.35, -0.9],
    [-0.9, -1.35, 0.9],
    [0.9, -1.35, 0.9],
  ];
  footPositions.forEach(([fx, fy, fz]) => {
    const footGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 16);
    const footMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
    const foot = new THREE.Mesh(footGeom, footMat);
    foot.position.set(fx, fy, fz);
    group.add(foot);
  });

  return group;
}

// -----------------------------------------------------------------------------
// 9. ATOM: Multi-Particle Nucleus & Quantum Orbital Rings with Orbiting Electrons
// -----------------------------------------------------------------------------
function buildRealisticAtomNucleus(part, baseMaterial) {
  const group = new THREE.Group();

  // Dense cluster of 14 tightly bound nucleon spheres (Protons & Neutrons)
  const nucleonCount = 14;
  const protonMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xef4444,
    emissiveIntensity: 0.4,
    roughness: 0.3,
  });
  const neutronMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.45,
    metalness: 0.2,
  });

  for (let i = 0; i < nucleonCount; i++) {
    const r = 0.11;
    const geom = new THREE.SphereGeometry(r, 16, 16);
    const mat = i % 2 === 0 ? protonMat : neutronMat;
    const nucleon = new THREE.Mesh(geom, mat);

    // Fibonacci sphere distribution for realistic dense nucleus packing
    const phi = Math.acos(-1 + (2 * i) / nucleonCount);
    const theta = Math.sqrt(nucleonCount * Math.PI) * phi;
    const dist = 0.22 + (Math.random() - 0.5) * 0.05;

    nucleon.position.set(
      Math.cos(theta) * Math.sin(phi) * dist,
      Math.sin(theta) * Math.sin(phi) * dist,
      Math.cos(phi) * dist
    );
    group.add(nucleon);
  }

  // Subtle quantum harmonic jitter oscillation
  COMPONENT_ANIMATORS.push((delta, time) => {
    group.children.forEach((c, idx) => {
      c.position.y += Math.sin(time * 6 + idx) * 0.0006;
    });
  });

  return group;
}

function buildRealisticElectron(part, baseMaterial) {
  const group = new THREE.Group();

  // Glowing Electron Particle
  const sphereGeom = new THREE.SphereGeometry(0.12, 20, 20);
  const glowMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x38bdf8,
    emissiveIntensity: 1.2,
    roughness: 0.1,
  });
  const electron = new THREE.Mesh(sphereGeom, glowMat);
  group.add(electron);

  // Outer Glowing Luminescent Halo
  const haloGeom = new THREE.SphereGeometry(0.18, 16, 16);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0x7dd3fc,
    transparent: true,
    opacity: 0.35,
    wireframe: true,
  });
  const halo = new THREE.Mesh(haloGeom, haloMat);
  group.add(halo);

  // Elliptical Orbital Path Guide Ring
  const radius = Math.hypot(...part.position) || 1.4;
  const orbitCurve = new THREE.EllipseCurve(0, 0, radius, radius * 0.85, 0, Math.PI * 2, false, 0);
  const points = orbitCurve.getPoints(64);
  const orbitGeom = new THREE.BufferGeometry().setFromPoints(points);
  const orbitMat = new THREE.LineBasicMaterial({
    color: 0x0284c7,
    transparent: true,
    opacity: 0.45,
  });
  const orbitLine = new THREE.Line(orbitGeom, orbitMat);
  orbitLine.rotation.x = Math.PI / 2 + (part.position[0] * 0.3);
  orbitLine.rotation.y = part.position[1] * 0.4;
  group.add(orbitLine);

  return group;
}

// -----------------------------------------------------------------------------
// 10. SOLAR SYSTEM: Detailed Sun Corona, Planetary Spheres, Saturn Rings
// -----------------------------------------------------------------------------
function buildRealisticSun(part, baseMaterial) {
  const group = new THREE.Group();

  // Core Plasma Sphere
  const sunGeom = new THREE.SphereGeometry(1.6, 48, 48);
  const sun = new THREE.Mesh(sunGeom, baseMaterial);
  group.add(sun);

  // Coronal Solar Flare Halo
  const coronaGeom = new THREE.SphereGeometry(1.85, 32, 32);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0xfbbf24,
    transparent: true,
    opacity: 0.28,
    side: THREE.BackSide,
  });
  const corona = new THREE.Mesh(coronaGeom, coronaMat);
  group.add(corona);

  // Pulsing solar turbulence
  COMPONENT_ANIMATORS.push((delta, time) => {
    const scale = 1.0 + Math.sin(time * 2.5) * 0.025;
    corona.scale.set(scale, scale, scale);
  });

  return group;
}

function buildRealisticSaturnRings(part, baseMaterial) {
  const group = new THREE.Group();

  // High-Density Saturn Ring Bands
  const ringGeom = new THREE.RingGeometry(1.5, 2.5, 64);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xd4c090,
    roughness: 0.7,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.75,
  });
  const ring = new THREE.Mesh(ringGeom, ringMat);
  ring.rotation.x = Math.PI / 2 + 0.45; // Axial tilt
  group.add(ring);

  return group;
}

function buildRealisticPlanet(part, baseMaterial) {
  const group = new THREE.Group();

  const r = part.geometry.args[0] || 0.3;
  const geom = new THREE.SphereGeometry(r, 36, 36);
  const planet = new THREE.Mesh(geom, baseMaterial);
  planet.castShadow = true;
  planet.receiveShadow = true;
  group.add(planet);

  // Earth Cloud Layer
  if (part.id === 'earth') {
    const cloudGeom = new THREE.SphereGeometry(r * 1.025, 32, 32);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.9,
    });
    const clouds = new THREE.Mesh(cloudGeom, cloudMat);
    group.add(clouds);

    COMPONENT_ANIMATORS.push((delta) => {
      clouds.rotation.y += delta * 0.15;
    });
  }

  // Gentle axial rotation
  COMPONENT_ANIMATORS.push((delta) => {
    planet.rotation.y += delta * 0.3;
  });

  return group;
}

// -----------------------------------------------------------------------------
// 11. SMARTPHONE: Curved Bezel, Active OLED UI Texture, Multi-Camera Island
// -----------------------------------------------------------------------------
function buildRealisticPhoneBody(part, baseMaterial) {
  const group = new THREE.Group();

  const bodyGeom = new THREE.BoxGeometry(0.9, 1.8, 0.12);
  const body = new THREE.Mesh(bodyGeom, baseMaterial);
  body.castShadow = true;
  group.add(body);

  // Antenna Isolation Bands (Metallic Titanium Rim)
  const bandMat = getHardwareMat(0x64748b, 0.25, 0.85);
  for (let b of [-0.65, 0.65]) {
    const bandGeom = new THREE.BoxGeometry(0.905, 0.02, 0.125);
    const band = new THREE.Mesh(bandGeom, bandMat);
    band.position.y = b;
    group.add(band);
  }

  // Volume & Power Buttons on Sides
  const btnGeom = new THREE.BoxGeometry(0.02, 0.18, 0.04);
  const pwrBtn = new THREE.Mesh(btnGeom, bandMat);
  pwrBtn.position.set(0.46, 0.3, 0);
  const volBtn = new THREE.Mesh(btnGeom, bandMat);
  volBtn.position.set(-0.46, 0.25, 0);
  group.add(pwrBtn);
  group.add(volBtn);

  return group;
}

function buildRealisticPhoneScreen(part, baseMaterial) {
  const group = new THREE.Group();

  // Active High-Resolution Smartphone UI Texture
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 512;
  screenCanvas.height = 1024;
  const ctx = screenCanvas.getContext('2d');

  // Vivid OLED Gradient Wallpaper
  const grad = ctx.createLinearGradient(0, 0, 512, 1024);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.5, '#1e3a8a');
  grad.addColorStop(1, '#0284c7');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 1024);

  // Top Status Bar
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px sans-serif';
  ctx.fillText('09:41', 50, 65);
  ctx.fillText('5G  100%', 380, 65);

  // Big Lock Screen Clock
  ctx.font = '300 110px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('09:41', 256, 260);
  ctx.font = '32px sans-serif';
  ctx.fillText('Thursday, September 24', 256, 315);

  // App Grid Icons
  const icons = ['📞', '💬', '🧭', '📸', '🎵', '⚙️', '📈', '🔒'];
  ctx.font = '52px sans-serif';
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const idx = r * 4 + c;
      const ix = 70 + c * 105;
      const iy = 560 + r * 140;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.beginPath();
      ctx.roundRect(ix - 40, iy - 40, 80, 80, 20);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.fillText(icons[idx] || '📱', ix, iy + 18);
    }
  }

  // Bottom Navigation Bar
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillRect(160, 990, 192, 6);

  const screenTex = new THREE.CanvasTexture(screenCanvas);

  const screenGeom = new THREE.PlaneGeometry(0.84, 1.74);
  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTex,
    roughness: 0.15,
    metalness: 0.1,
  });
  const screen = new THREE.Mesh(screenGeom, screenMat);
  screen.position.z = 0.062;
  group.add(screen);

  return group;
}

function buildRealisticPhoneCamera(part, baseMaterial) {
  const group = new THREE.Group();

  // Raised Camera Plateau Bump
  const plateauGeom = new THREE.BoxGeometry(0.38, 0.42, 0.04);
  const plateauMat = getHardwareMat(0x1e293b, 0.25, 0.8);
  const plateau = new THREE.Mesh(plateauGeom, plateauMat);
  group.add(plateau);

  // 3 Multi-Coated Sapphire Camera Lenses with Anti-Reflective Optical Rings
  const lensOffsets = [
    [-0.09, 0.1],
    [-0.09, -0.1],
    [0.09, 0.0],
  ];
  lensOffsets.forEach(([lx, ly]) => {
    // Metal Bezel Ring
    const ringGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.03, 20);
    const ringMat = getHardwareMat(0x64748b, 0.15, 0.9);
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(lx, ly, 0.025);
    group.add(ring);

    // Deep Sapphire Convex Optical Lens
    const lensGeom = new THREE.SphereGeometry(0.045, 16, 16);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x090d16,
      roughness: 0.05,
      metalness: 0.2,
      transmission: 0.6,
      transparent: true,
      opacity: 0.9,
    });
    const lens = new THREE.Mesh(lensGeom, lensMat);
    lens.position.set(lx, ly, 0.035);
    group.add(lens);
  });

  // Dual-Tone LED Flash Unit
  const flashGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.015, 12);
  const flashMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  const flash = new THREE.Mesh(flashGeom, flashMat);
  flash.rotation.x = Math.PI / 2;
  flash.position.set(0.09, 0.12, 0.02);
  group.add(flash);

  return group;
}

function buildRealisticPhoneChip(part, baseMaterial) {
  const group = new THREE.Group();

  const dieGeom = new THREE.BoxGeometry(0.24, 0.24, 0.025);
  const die = new THREE.Mesh(dieGeom, baseMaterial);
  group.add(die);

  // Laser Etched Silicon Marking
  const topGeom = new THREE.PlaneGeometry(0.2, 0.2);
  const topMat = getHardwareMat(0x94a3b8, 0.2, 0.85);
  const top = new THREE.Mesh(topGeom, topMat);
  top.position.z = 0.013;
  group.add(top);

  return group;
}

function buildRealisticPhoneBattery(part, baseMaterial) {
  const group = new THREE.Group();

  const battGeom = new THREE.BoxGeometry(0.62, 1.05, 0.06);
  const batt = new THREE.Mesh(battGeom, baseMaterial);
  group.add(batt);

  // Top flex ribbon connector
  const flexGeom = new THREE.BoxGeometry(0.12, 0.08, 0.02);
  const flexMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.3 });
  const flex = new THREE.Mesh(flexGeom, flexMat);
  flex.position.set(0.18, 0.54, 0);
  group.add(flex);

  return group;
}

// -----------------------------------------------------------------------------
// 12. AUTOMOBILE: 5-Spoke Alloy Rims, Treaded Tires, Calipers, Engine V6
// -----------------------------------------------------------------------------
function buildRealisticCarWheel(part, baseMaterial) {
  const group = new THREE.Group();

  // Rubber Pneumatic Tire with Tread
  const tireGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 28);
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x111827,
    roughness: 0.85,
    metalness: 0.05,
  });
  const tire = new THREE.Mesh(tireGeom, tireMat);
  tire.castShadow = true;
  group.add(tire);

  // High-Tech 5-Spoke Silver Alloy Rim
  const rimGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.225, 24);
  const rimMat = getHardwareMat(0xe2e8f0, 0.2, 0.85);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  group.add(rim);

  // 5 Spokes
  for (let s = 0; s < 5; s++) {
    const angle = (s / 5) * Math.PI * 2;
    const spokeGeom = new THREE.BoxGeometry(0.04, 0.228, 0.16);
    const spoke = new THREE.Mesh(spokeGeom, rimMat);
    spoke.position.set(Math.cos(angle) * 0.1, 0, Math.sin(angle) * 0.1);
    spoke.rotation.y = angle;
    group.add(spoke);
  }

  // Cross-Drilled Steel Brake Disc Rotor
  const rotorGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.025, 24);
  const rotorMat = getHardwareMat(0x94a3b8, 0.3, 0.9);
  const rotor = new THREE.Mesh(rotorGeom, rotorMat);
  rotor.position.y = -0.07;
  group.add(rotor);

  // High-Performance Red Brake Caliper
  const calGeom = new THREE.BoxGeometry(0.12, 0.06, 0.08);
  const calMat = new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    roughness: 0.35,
    metalness: 0.5,
  });
  const caliper = new THREE.Mesh(calGeom, calMat);
  caliper.position.set(0.14, -0.07, 0);
  group.add(caliper);

  return group;
}

function buildRealisticCarEngine(part, baseMaterial) {
  const group = new THREE.Group();

  // Engine Block
  const blockGeom = new THREE.BoxGeometry(0.7, 0.42, 0.62);
  const block = new THREE.Mesh(blockGeom, baseMaterial);
  block.castShadow = true;
  group.add(block);

  // Intake Manifold Runners (Curved Air Pipes)
  for (let i = 0; i < 4; i++) {
    const pipeGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.28, 12);
    const pipeMat = getHardwareMat(0x64748b, 0.3, 0.7);
    const pipe = new THREE.Mesh(pipeGeom, pipeMat);
    pipe.position.set(-0.2 + i * 0.13, 0.28, 0);
    pipe.rotation.z = (i % 2 === 0 ? 1 : -1) * 0.25;
    group.add(pipe);
  }

  // Front Serpentine Belt & Pulleys
  const beltPositions = [
    [0.18, 0.08],
    [-0.18, 0.08],
    [0, -0.12],
  ];
  beltPositions.forEach(([px, py]) => {
    const pulleyGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.04, 16);
    const pulleyMat = getHardwareMat(0x1e293b, 0.4, 0.8);
    const pulley = new THREE.Mesh(pulleyGeom, pulleyMat);
    pulley.rotation.z = Math.PI / 2;
    pulley.position.set(0.36, py, px);
    group.add(pulley);
  });

  return group;
}

function buildRealisticCarChassis(part, baseMaterial) {
  const group = new THREE.Group();

  const chassisGeom = new THREE.BoxGeometry(1.0, 0.4, 2.6);
  const chassis = new THREE.Mesh(chassisGeom, baseMaterial);
  group.add(chassis);

  // Twin Longitudinal Frame Rails
  for (let x of [-0.42, 0.42]) {
    const railGeom = new THREE.BoxGeometry(0.08, 0.12, 2.7);
    const railMat = getHardwareMat(0x334155, 0.4, 0.85);
    const rail = new THREE.Mesh(railGeom, railMat);
    rail.position.set(x, -0.15, 0);
    group.add(rail);
  }

  return group;
}

function buildRealisticCarCabin(part, baseMaterial) {
  const group = new THREE.Group();

  // Glass Canopy
  const cabinGeom = new THREE.BoxGeometry(0.88, 0.5, 1.25);
  const cabin = new THREE.Mesh(cabinGeom, baseMaterial);
  group.add(cabin);

  // Interior Dual Bucket Seats
  for (let sx of [-0.22, 0.22]) {
    const seatGeom = new THREE.BoxGeometry(0.24, 0.28, 0.26);
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
    const seat = new THREE.Mesh(seatGeom, seatMat);
    seat.position.set(sx, -0.05, 0);
    group.add(seat);
  }

  // Steering Wheel
  const wheelGeom = new THREE.TorusGeometry(0.09, 0.015, 12, 24);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
  const stWheel = new THREE.Mesh(wheelGeom, wheelMat);
  stWheel.position.set(-0.22, 0.08, 0.35);
  stWheel.rotation.x = -0.4;
  group.add(stWheel);

  return group;
}

// -----------------------------------------------------------------------------
// 13. BICYCLE: Hydroformed Tubes, Wire Spokes, Chain & Pedals
// -----------------------------------------------------------------------------
function buildRealisticBikeWheel(part, baseMaterial) {
  const group = new THREE.Group();

  // Outer Rubber Tire
  const tireGeom = new THREE.TorusGeometry(2.1, 0.18, 16, 48);
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
  const tire = new THREE.Mesh(tireGeom, tireMat);
  group.add(tire);

  // Double-Walled Aluminum Rim
  const rimGeom = new THREE.TorusGeometry(1.95, 0.06, 12, 48);
  const rimMat = getHardwareMat(0x64748b, 0.2, 0.85);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  group.add(rim);

  // Central Hub with Axle
  const hubGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.45, 16);
  const hub = new THREE.Mesh(hubGeom, rimMat);
  hub.rotation.x = Math.PI / 2;
  group.add(hub);

  // 24 Wire Spokes (Tensioned interlaced pattern)
  const spokeMat = new THREE.LineBasicMaterial({ color: 0xd1d5db });
  for (let s = 0; s < 24; s++) {
    const angle = (s / 24) * Math.PI * 2;
    const pts = [
      new THREE.Vector3(0, 0, (s % 2 === 0 ? 0.15 : -0.15)),
      new THREE.Vector3(Math.cos(angle) * 1.95, Math.sin(angle) * 1.95, 0),
    ];
    const sGeom = new THREE.BufferGeometry().setFromPoints(pts);
    const spoke = new THREE.Line(sGeom, spokeMat);
    group.add(spoke);
  }

  return group;
}

function buildRealisticBikeFrame(part, baseMaterial) {
  const group = new THREE.Group();

  // Hydroformed Main Top & Down Tubes
  const frameGeom = new THREE.CylinderGeometry(0.16, 0.16, 5.8, 16);
  const frame = new THREE.Mesh(frameGeom, baseMaterial);
  frame.castShadow = true;
  group.add(frame);

  return group;
}

function buildRealisticBikePedals(part, baseMaterial) {
  const group = new THREE.Group();

  // Crank Arm
  const armGeom = new THREE.BoxGeometry(0.12, 1.2, 0.08);
  const armMat = getHardwareMat(0x334155, 0.3, 0.8);
  const arm = new THREE.Mesh(armGeom, armMat);
  group.add(arm);

  // Platform Pedals with Grip Pins
  for (let p of [-0.6, 0.6]) {
    const pedGeom = new THREE.BoxGeometry(0.4, 0.08, 0.28);
    const pedMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    const ped = new THREE.Mesh(pedGeom, pedMat);
    ped.position.set(0, p, p > 0 ? 0.25 : -0.25);
    group.add(ped);
  }

  return group;
}

// -----------------------------------------------------------------------------
// 14. TELEVISION & LAPTOP ENHANCEMENTS
// -----------------------------------------------------------------------------
function buildRealisticTVScreen(part, baseMaterial) {
  const group = new THREE.Group();

  const screenGeom = new THREE.BoxGeometry(2.4, 1.4, 0.06);
  const screen = new THREE.Mesh(screenGeom, baseMaterial);
  group.add(screen);

  // OLED Edge Bezel
  const bezelGeom = new THREE.BoxGeometry(2.44, 1.44, 0.05);
  const wireGeom = new THREE.EdgesGeometry(bezelGeom);
  const bezelMat = new THREE.LineBasicMaterial({ color: 0x475569 });
  const bezel = new THREE.LineSegments(wireGeom, bezelMat);
  group.add(bezel);

  return group;
}

function buildRealisticTVBacklight(part, baseMaterial) {
  const group = new THREE.Group();

  const blGeom = new THREE.BoxGeometry(2.2, 1.2, 0.05);
  const bl = new THREE.Mesh(blGeom, baseMaterial);
  group.add(bl);

  // Matrix of LED Emitter Lenses
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 8; c++) {
      const ledGeom = new THREE.SphereGeometry(0.035, 12, 12);
      const ledMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
      const led = new THREE.Mesh(ledGeom, ledMat);
      led.position.set(-0.9 + c * 0.26, -0.45 + r * 0.3, 0.03);
      group.add(led);
    }
  }

  return group;
}

function buildRealisticTVStand(part, baseMaterial) {
  const group = new THREE.Group();

  const baseGeom = new THREE.BoxGeometry(0.8, 0.04, 0.45);
  const baseM = new THREE.Mesh(baseGeom, baseMaterial);
  group.add(baseM);

  const riserGeom = new THREE.BoxGeometry(0.18, 0.45, 0.12);
  const riserMat = getHardwareMat(0x64748b, 0.25, 0.85);
  const riser = new THREE.Mesh(riserGeom, riserMat);
  riser.position.y = 0.22;
  group.add(riser);

  return group;
}

function buildRealisticLaptopKeyboard(part, baseMaterial) {
  const group = new THREE.Group();

  // Keyboard Deck Recess
  const deckGeom = new THREE.BoxGeometry(4.6, 0.1, 2.0);
  const deck = new THREE.Mesh(deckGeom, baseMaterial);
  group.add(deck);

  // Chiclet Keys Grid Matrix
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 14; col++) {
      const keyGeom = new THREE.BoxGeometry(0.24, 0.04, 0.24);
      const keyMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.6,
      });
      const key = new THREE.Mesh(keyGeom, keyMat);
      key.position.set(-1.8 + col * 0.28, 0.065, -0.6 + row * 0.28);
      group.add(key);
    }
  }

  // Spacebar Key
  const spaceGeom = new THREE.BoxGeometry(1.6, 0.04, 0.24);
  const spaceMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
  const spacebar = new THREE.Mesh(spaceGeom, spaceMat);
  spacebar.position.set(0, 0.065, 0.8);
  group.add(spacebar);

  return group;
}

function buildRealisticLaptopScreen(part, baseMaterial) {
  const group = new THREE.Group();

  const lidGeom = new THREE.BoxGeometry(5.0, 3.4, 0.16);
  const lid = new THREE.Mesh(lidGeom, baseMaterial);
  group.add(lid);

  // Active Screen Panel
  const panelGeom = new THREE.PlaneGeometry(4.6, 2.9);
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    emissive: 0x0369a1,
    emissiveIntensity: 0.25,
    roughness: 0.2,
  });
  const panel = new THREE.Mesh(panelGeom, panelMat);
  panel.position.z = 0.082;
  group.add(panel);

  return group;
}

function buildRealisticLaptopTrackpad(part, baseMaterial) {
  const group = new THREE.Group();

  const padGeom = new THREE.BoxGeometry(1.6, 0.08, 1.1);
  const pad = new THREE.Mesh(padGeom, baseMaterial);
  group.add(pad);

  // Machined Chamfer Border Outline
  const edges = new THREE.EdgesGeometry(padGeom);
  const lineMat = new THREE.LineBasicMaterial({ color: 0x64748b });
  const wire = new THREE.LineSegments(edges, lineMat);
  group.add(wire);

  return group;
}

// -----------------------------------------------------------------------------
// 15. WASHING MACHINE & SPLIT AC
// -----------------------------------------------------------------------------
function buildRealisticWashingDrum(part, baseMaterial) {
  const group = new THREE.Group();

  // Stainless Steel Perforated Spin Drum
  const drumGeom = new THREE.CylinderGeometry(1.8, 1.8, 2.8, 32, 1, true);
  const drum = new THREE.Mesh(drumGeom, baseMaterial);
  group.add(drum);

  // 3 Triangular Agitator Lifter Baffles Inside
  for (let b = 0; b < 3; b++) {
    const angle = (b / 3) * Math.PI * 2;
    const bafGeom = new THREE.BoxGeometry(0.18, 2.6, 0.25);
    const bafMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
    const baffle = new THREE.Mesh(bafGeom, bafMat);
    baffle.position.set(Math.cos(angle) * 1.6, 0, Math.sin(angle) * 1.6);
    baffle.rotation.y = angle;
    group.add(baffle);
  }

  // Smooth drum spin animation
  COMPONENT_ANIMATORS.push((delta) => {
    group.rotation.y += delta * 1.8;
  });

  return group;
}

function buildRealisticWashingDoor(part, baseMaterial) {
  const group = new THREE.Group();

  // Outer Chrome Ring Bezel
  const ringGeom = new THREE.TorusGeometry(1.4, 0.18, 16, 48);
  const ringMat = getHardwareMat(0xd1d5db, 0.15, 0.9);
  const ring = new THREE.Mesh(ringGeom, ringMat);
  group.add(ring);

  // Convex Clear Glass Bowl
  const glassGeom = new THREE.SphereGeometry(1.25, 24, 24, 0, Math.PI * 2, 0, Math.PI / 2.5);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.85,
    transparent: true,
    opacity: 0.65,
    ior: 1.5,
  });
  const glass = new THREE.Mesh(glassGeom, glassMat);
  glass.rotation.x = Math.PI;
  group.add(glass);

  return group;
}

function buildRealisticACFan(part, baseMaterial) {
  const group = new THREE.Group();

  // Propeller Fan Hub
  const hubGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.15, 20);
  const hubMat = getHardwareMat(0x0f172a, 0.4, 0.7);
  const hub = new THREE.Mesh(hubGeom, hubMat);
  group.add(hub);

  // 3 Wide Aerodynamic Condenser Blades
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const bladeGeom = new THREE.BoxGeometry(0.85, 0.25, 0.03);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const blade = new THREE.Mesh(bladeGeom, bladeMat);
    blade.position.set(Math.cos(angle) * 0.55, Math.sin(angle) * 0.55, 0);
    blade.rotation.z = angle;
    blade.rotation.y = 0.35;
    group.add(blade);
  }

  // Smooth outdoor fan spin
  COMPONENT_ANIMATORS.push((delta) => {
    group.rotation.z += delta * 10.0;
  });

  return group;
}

// =============================================================================
// GLOBAL ANIMATION UPDATE DISPATCHER
// =============================================================================
function updateAnimatedComponents(delta, time) {
  for (let i = 0; i < COMPONENT_ANIMATORS.length; i++) {
    COMPONENT_ANIMATORS[i](delta, time);
  }
}

// Clear animators when object changes
function clearComponentAnimators() {
  COMPONENT_ANIMATORS.length = 0;
}
