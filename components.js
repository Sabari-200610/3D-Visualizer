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
  // 11. AIRPLANE
  // ---------------------------------------------------------------------------
  else if (objectId === 'airplane') {
    if (partId === 'fuselage') {
      handled = true;
      group = buildRealisticAirplaneFuselage(part, baseMaterial);
    } else if (partId === 'wings') {
      handled = true;
      group = buildRealisticAirplaneWings(part, baseMaterial);
    } else if (partId === 'tail-fin') {
      handled = true;
      group = buildRealisticAirplaneTail(part, baseMaterial);
    } else if (partId.includes('engine')) {
      handled = true;
      group = buildRealisticAirplaneEngine(part, baseMaterial);
    } else if (partId === 'cockpit') {
      handled = true;
      group = buildRealisticAirplaneCockpit(part, baseMaterial);
    } else if (partId === 'landing-gear') {
      handled = true;
      group = buildRealisticAirplaneLandingGear(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 12. SMARTWATCH
  // ---------------------------------------------------------------------------
  else if (objectId === 'smartwatch') {
    if (partId === 'case') {
      handled = true;
      group = buildRealisticSmartwatchCase(part, baseMaterial);
    } else if (partId === 'display') {
      handled = true;
      group = buildRealisticSmartwatchDisplay(part, baseMaterial);
    } else if (partId === 'crown') {
      handled = true;
      group = buildRealisticSmartwatchCrown(part, baseMaterial);
    } else if (partId === 'strap') {
      handled = true;
      group = buildRealisticSmartwatchStrap(part, baseMaterial);
    } else if (partId === 'sensor') {
      handled = true;
      group = buildRealisticSmartwatchSensor(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 13. 3D PRINTER
  // ---------------------------------------------------------------------------
  else if (objectId === 'printer-3d') {
    if (partId === 'frame') {
      handled = true;
      group = buildRealistic3DPrinterFrame(part, baseMaterial);
    } else if (partId === 'extruder') {
      handled = true;
      group = buildRealistic3DPrinterExtruder(part, baseMaterial);
    } else if (partId === 'bed') {
      handled = true;
      group = buildRealistic3DPrinterBed(part, baseMaterial);
    } else if (partId === 'spool') {
      handled = true;
      group = buildRealistic3DPrinterSpool(part, baseMaterial);
    } else if (partId === 'steppers') {
      handled = true;
      group = buildRealistic3DPrinterSteppers(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 14. MRI MACHINE
  // ---------------------------------------------------------------------------
  else if (objectId === 'mri-machine') {
    if (partId === 'gantry') {
      handled = true;
      group = buildRealisticMRIGantry(part, baseMaterial);
    } else if (partId === 'patient-table') {
      handled = true;
      group = buildRealisticMRITable(part, baseMaterial);
    } else if (partId === 'control-console') {
      handled = true;
      group = buildRealisticMRIConsole(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 15. HUMAN HEART (BIOLOGICAL SCIENCE)
  // ---------------------------------------------------------------------------
  else if (objectId === 'human-heart') {
    if (partId.includes('ventricle')) {
      handled = true;
      group = buildRealisticHeartVentricle(part, baseMaterial);
    } else if (partId.includes('atrium')) {
      handled = true;
      group = buildRealisticHeartAtrium(part, baseMaterial);
    } else if (partId === 'aorta') {
      handled = true;
      group = buildRealisticAorta(part, baseMaterial);
    } else if (partId === 'major-veins') {
      handled = true;
      group = buildRealisticMajorVeins(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 16. HUMAN EYE (OPTICAL BIOLOGY)
  // ---------------------------------------------------------------------------
  else if (objectId === 'human-eye') {
    if (partId === 'cornea') {
      handled = true;
      group = buildRealisticEyeCornea(part, baseMaterial);
    } else if (partId === 'iris') {
      handled = true;
      group = buildRealisticEyeIris(part, baseMaterial);
    } else if (partId === 'lens') {
      handled = true;
      group = buildRealisticEyeLens(part, baseMaterial);
    } else if (partId === 'retina') {
      handled = true;
      group = buildRealisticEyeRetina(part, baseMaterial);
    } else if (partId === 'optic-nerve') {
      handled = true;
      group = buildRealisticOpticNerve(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 17. WIND TURBINE (MACHINERIES / CLEAN ENERGY)
  // ---------------------------------------------------------------------------
  else if (objectId === 'wind-turbine') {
    if (partId === 'foundation') {
      handled = true;
      group = buildRealisticWindTurbineFoundation(part, baseMaterial);
    } else if (partId === 'tower') {
      handled = true;
      group = buildRealisticWindTurbineTower(part, baseMaterial);
    } else if (partId === 'nacelle') {
      handled = true;
      group = buildRealisticWindTurbineNacelle(part, baseMaterial);
    } else if (partId === 'rotor-hub') {
      handled = true;
      group = buildRealisticWindTurbineRotorHub(part, baseMaterial);
    } else if (partId === 'blades') {
      handled = true;
      group = buildRealisticWindTurbineBlades(part, baseMaterial);
    }
  }

  // ---------------------------------------------------------------------------
  // 18. SOLAR PANEL (MACHINERIES / PHOTOVOLTAIC ENERGY)
  // ---------------------------------------------------------------------------
  else if (objectId === 'solar-panel') {
    if (partId === 'mounting-bracket') {
      handled = true;
      group = buildRealisticSolarMount(part, baseMaterial);
    } else if (partId === 'frame') {
      handled = true;
      group = buildRealisticSolarFrame(part, baseMaterial);
    } else if (partId === 'pv-surface') {
      handled = true;
      group = buildRealisticSolarPanelSurface(part, baseMaterial);
    } else if (partId === 'junction-box') {
      handled = true;
      group = buildRealisticSolarJunctionBox(part, baseMaterial);
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

  // Outer Rubber Tire (in XZ plane so group.rotation.x = Math.PI/2 rotates it upright to vertical XY plane)
  const tireGeom = new THREE.TorusGeometry(2.1, 0.18, 16, 48);
  tireGeom.rotateX(Math.PI / 2);
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
  const tire = new THREE.Mesh(tireGeom, tireMat);
  tire.castShadow = true;
  group.add(tire);

  // Double-Walled Aluminum Rim (in XZ plane)
  const rimGeom = new THREE.TorusGeometry(1.95, 0.06, 12, 48);
  rimGeom.rotateX(Math.PI / 2);
  const rimMat = getHardwareMat(0x64748b, 0.2, 0.85);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  group.add(rim);

  // Central Hub with Axle (cylinder height along Y unrotated, matching cylinder primitive)
  const hubGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.45, 16);
  const hub = new THREE.Mesh(hubGeom, rimMat);
  group.add(hub);

  // 24 Wire Spokes (Tensioned interlaced pattern in XZ plane)
  const spokeMat = new THREE.LineBasicMaterial({ color: 0xd1d5db });
  for (let s = 0; s < 24; s++) {
    const angle = (s / 24) * Math.PI * 2;
    const pts = [
      new THREE.Vector3(0, (s % 2 === 0 ? 0.15 : -0.15), 0),
      new THREE.Vector3(Math.cos(angle) * 1.95, 0, Math.sin(angle) * 1.95),
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

  // Crank Arm (length along Z unrotated so group.rotation.x = Math.PI/2 brings it into vertical XY plane)
  const armGeom = new THREE.BoxGeometry(0.12, 0.08, 1.2);
  const armMat = getHardwareMat(0x334155, 0.3, 0.8);
  const arm = new THREE.Mesh(armGeom, armMat);
  group.add(arm);

  // Platform Pedals with Grip Pins (offsets along Y and Z so group.rotation.x = Math.PI/2 positions them left & right)
  for (let p of [-0.6, 0.6]) {
    const pedGeom = new THREE.BoxGeometry(0.4, 0.28, 0.08);
    const pedMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    const ped = new THREE.Mesh(pedGeom, pedMat);
    ped.position.set(0, p > 0 ? 0.25 : -0.25, p);
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

// -----------------------------------------------------------------------------
// 15. AIRPLANE PROCEDURAL COMPONENTS
// -----------------------------------------------------------------------------
function buildRealisticAirplaneFuselage(part, baseMaterial) {
  const group = new THREE.Group();

  // Aerodynamic Cylindrical Fuselage
  const fuseGeom = new THREE.CylinderGeometry(0.9, 0.9, 11.0, 32);
  const fuse = new THREE.Mesh(fuseGeom, baseMaterial);
  fuse.castShadow = true;
  group.add(fuse);

  // Passenger Cabin Windows Texture Strip (along sides)
  const winTexture = makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, 0, sz, sz);

    // Row of passenger cabin oval windows
    ctx.fillStyle = '#0f172a';
    const numWins = 28;
    const y1 = sz * 0.45;
    const y2 = sz * 0.55;
    const wWidth = sz / (numWins * 1.8);
    const wHeight = sz * 0.04;
    for (let i = 2; i < numWins - 2; i++) {
      const x = (i / numWins) * sz;
      ctx.fillRect(x, y1, wWidth, wHeight);
      ctx.fillRect(x, y2, wWidth, wHeight);
    }
  }, 512);

  const winMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: winTexture,
    roughness: 0.3,
    metalness: 0.1,
  });
  const winShell = new THREE.Mesh(new THREE.CylinderGeometry(0.902, 0.902, 8.5, 32), winMat);
  group.add(winShell);

  return group;
}

function buildRealisticAirplaneWings(part, baseMaterial) {
  const group = new THREE.Group();

  // Swept Main Wing Airfoil Body
  const wingGeom = new THREE.BoxGeometry(12.0, 0.18, 2.4);
  const wing = new THREE.Mesh(wingGeom, baseMaterial);
  wing.castShadow = true;
  group.add(wing);

  // Aerodynamic Upturned Winglet Tips
  [-6.0, 6.0].forEach((x) => {
    const wletGeom = new THREE.BoxGeometry(0.12, 1.1, 0.8);
    const wletMat = getHardwareMat(0x0284c7, 0.3, 0.7);
    const wlet = new THREE.Mesh(wletGeom, wletMat);
    wlet.position.set(x, 0.5, 0.2);
    wlet.rotation.z = x > 0 ? -0.2 : 0.2;
    group.add(wlet);

    // Navigational Strobe Light (Red on Port, Green on Starboard)
    const strobeColor = x < 0 ? 0xef4444 : 0x22c55e;
    const strobeGeom = new THREE.SphereGeometry(0.06, 12, 12);
    const strobeMat = new THREE.MeshStandardMaterial({
      color: strobeColor,
      emissive: strobeColor,
      emissiveIntensity: 2.0,
    });
    const strobe = new THREE.Mesh(strobeGeom, strobeMat);
    strobe.position.set(x, 1.05, 0.2);
    group.add(strobe);
  });

  // Flap Track Fairings Underneath Wings
  [-3.8, -1.8, 1.8, 3.8].forEach((x) => {
    const fairGeom = new THREE.CylinderGeometry(0.06, 0.08, 1.2, 12);
    fairGeom.rotateX(Math.PI / 2);
    const fairMat = getHardwareMat(0x64748b, 0.3, 0.8);
    const fair = new THREE.Mesh(fairGeom, fairMat);
    fair.position.set(x, -0.16, -0.6);
    group.add(fair);
  });

  return group;
}

function buildRealisticAirplaneTail(part, baseMaterial) {
  const group = new THREE.Group();

  // Vertical Tail Fin Stabilizer
  const finGeom = new THREE.BoxGeometry(0.18, 2.6, 2.0);
  const fin = new THREE.Mesh(finGeom, baseMaterial);
  fin.castShadow = true;
  group.add(fin);

  // Rudder Hinge Seam Accent
  const rudderGeom = new THREE.BoxGeometry(0.2, 2.4, 0.6);
  const rudderMat = getHardwareMat(0x0369a1, 0.3, 0.8);
  const rudder = new THREE.Mesh(rudderGeom, rudderMat);
  rudder.position.set(0, -0.05, -0.75);
  group.add(rudder);

  // Dual Horizontal Stabilizer Elevators at the Base
  const horizGeom = new THREE.BoxGeometry(4.8, 0.12, 1.2);
  const horizMat = getHardwareMat(0x94a3b8, 0.3, 0.8);
  const horiz = new THREE.Mesh(horizGeom, horizMat);
  horiz.position.set(0, -1.0, 0.1);
  group.add(horiz);

  return group;
}

function buildRealisticAirplaneEngine(part, baseMaterial) {
  const group = new THREE.Group();

  // Engine Cowling / Nacelle Outer Shell
  const nacelleGeom = new THREE.CylinderGeometry(0.58, 0.52, 2.2, 28);
  const nacelleMat = getHardwareMat(0x475569, 0.35, 0.8);
  const nacelle = new THREE.Mesh(nacelleGeom, nacelleMat);
  group.add(nacelle);

  // Chrome Air Intake Lip Ring
  const lipGeom = new THREE.TorusGeometry(0.55, 0.05, 12, 32);
  const lipMat = getHardwareMat(0xe2e8f0, 0.15, 0.95);
  const lip = new THREE.Mesh(lipGeom, lipMat);
  lip.position.y = 1.1;
  lip.rotation.x = Math.PI / 2;
  group.add(lip);

  // Turbofan Spinner Cone
  const coneGeom = new THREE.ConeGeometry(0.18, 0.45, 20);
  const coneMat = getHardwareMat(0x1e293b, 0.2, 0.85);
  const cone = new THREE.Mesh(coneGeom, coneMat);
  cone.position.y = 0.9;
  group.add(cone);

  // 14 Titanium Fan Blades Group (Spinning in flight)
  const fanGroup = new THREE.Group();
  fanGroup.position.y = 0.85;
  const bladeMat = getHardwareMat(0x94a3b8, 0.25, 0.9);
  for (let b = 0; b < 14; b++) {
    const angle = (b / 14) * Math.PI * 2;
    const bladeGeom = new THREE.BoxGeometry(0.04, 0.36, 0.08);
    const blade = new THREE.Mesh(bladeGeom, bladeMat);
    blade.position.set(Math.cos(angle) * 0.28, 0, Math.sin(angle) * 0.28);
    blade.rotation.y = -angle;
    blade.rotation.z = 0.35;
    fanGroup.add(blade);
  }
  group.add(fanGroup);

  // Titanium Exhaust Plug Cone at Rear
  const exGeom = new THREE.ConeGeometry(0.24, 0.6, 20);
  const exMat = getHardwareMat(0x334155, 0.5, 0.9);
  const ex = new THREE.Mesh(exGeom, exMat);
  ex.position.y = -1.35;
  ex.rotation.x = Math.PI;
  group.add(ex);

  COMPONENT_ANIMATORS.push((delta) => {
    fanGroup.rotation.y += delta * 15.0;
  });

  return group;
}

function buildRealisticAirplaneCockpit(part, baseMaterial) {
  const group = new THREE.Group();

  // Streamlined Nose & Flight Deck Canopy
  const domeGeom = new THREE.SphereGeometry(0.88, 28, 28);
  const dome = new THREE.Mesh(domeGeom, baseMaterial);
  dome.scale.set(1.0, 0.85, 1.3);
  group.add(dome);

  // Windshield Window Frame Grid (Flight Deck Glass)
  const glassGeom = new THREE.SphereGeometry(0.89, 20, 20, 0, Math.PI, 0, Math.PI * 0.5);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0284c7,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.85,
    transparent: true,
    opacity: 0.75,
    clearcoat: 1.0,
  });
  const glass = new THREE.Mesh(glassGeom, glassMat);
  glass.scale.set(0.95, 0.8, 1.15);
  glass.position.set(0, 0.15, 0.2);
  group.add(glass);

  return group;
}

function buildRealisticAirplaneLandingGear(part, baseMaterial) {
  const group = new THREE.Group();

  // Dual Rubber Pneumatic Runway Tires
  const tireGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.28, 24);
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
  const hubMat = getHardwareMat(0xe2e8f0, 0.2, 0.85);

  [-0.65, 0.65].forEach((x) => {
    const tire = new THREE.Mesh(tireGeom, tireMat);
    tire.rotation.z = Math.PI / 2;
    tire.position.set(x, -0.25, 0);
    group.add(tire);

    const hubGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.29, 20);
    const hub = new THREE.Mesh(hubGeom, hubMat);
    hub.rotation.z = Math.PI / 2;
    hub.position.set(x, -0.25, 0);
    group.add(hub);
  });

  // Heavy-Duty Hydraulic Oleo Strut
  const strutGeom = new THREE.CylinderGeometry(0.12, 0.12, 1.1, 16);
  const strutMat = getHardwareMat(0x64748b, 0.2, 0.9);
  const strut = new THREE.Mesh(strutGeom, strutMat);
  strut.position.set(0, 0.35, 0);
  group.add(strut);

  return group;
}

// -----------------------------------------------------------------------------
// 16. SMARTWATCH PROCEDURAL COMPONENTS
// -----------------------------------------------------------------------------
function buildRealisticSmartwatchCase(part, baseMaterial) {
  const group = new THREE.Group();

  // Titanium Watch Case Body
  const caseGeom = new THREE.BoxGeometry(1.8, 2.2, 0.45);
  const caseMesh = new THREE.Mesh(caseGeom, baseMaterial);
  caseMesh.castShadow = true;
  group.add(caseMesh);

  // Left Side Acoustic Speaker Ports
  for (let s = -0.3; s <= 0.3; s += 0.15) {
    const slitGeom = new THREE.BoxGeometry(0.04, 0.08, 0.12);
    const slitMat = getHardwareMat(0x0f172a, 0.4, 0.7);
    const slit = new THREE.Mesh(slitGeom, slitMat);
    slit.position.set(-0.91, s, 0);
    group.add(slit);
  }

  // Right Side Microphone Pinhole
  const micGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.05, 12);
  const micMat = getHardwareMat(0x0f172a, 0.4, 0.7);
  const mic = new THREE.Mesh(micGeom, micMat);
  mic.rotation.z = Math.PI / 2;
  mic.position.set(0.91, -0.3, 0);
  group.add(mic);

  return group;
}

function buildRealisticSmartwatchDisplay(part, baseMaterial) {
  const group = new THREE.Group();

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const uiTexture = new THREE.CanvasTexture(canvas);

  function drawWatchFace(timeSec) {
    ctx.fillStyle = '#070a12';
    ctx.fillRect(0, 0, 512, 512);

    // Digital Time Readout
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 96px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('10:09', 256, 185);

    // Date Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 28px sans-serif';
    ctx.fillText('MON 28 SEP', 256, 230);

    // Activity Rings (Move, Exercise, Stand)
    const cx = 256, cy = 330;
    const rings = [
      { r: 85, color: '#ef4444', pct: 0.82 },
      { r: 64, color: '#22c55e', pct: 0.65 },
      { r: 43, color: '#38bdf8', pct: 0.90 },
    ];
    rings.forEach((ring) => {
      ctx.beginPath();
      ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 13;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, ring.r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ring.pct);
      ctx.strokeStyle = ring.color;
      ctx.lineWidth = 13;
      ctx.lineCap = 'round';
      ctx.stroke();
    });

    // Heart Rate & Battery info with Pulsing Heart Icon
    const pulseScale = 1.0 + Math.sin(timeSec * 4.0) * 0.15;
    ctx.fillStyle = '#ef4444';
    ctx.font = `${Math.round(26 * pulseScale)}px sans-serif`;
    ctx.fillText('♥ 74 BPM', 140, 465);

    ctx.fillStyle = '#22c55e';
    ctx.font = '26px sans-serif';
    ctx.fillText('⚡ 96%', 370, 465);

    uiTexture.needsUpdate = true;
  }

  drawWatchFace(0);

  const screenGeom = new THREE.BoxGeometry(1.55, 1.95, 0.05);
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: uiTexture,
    roughness: 0.15,
    metalness: 0.05,
    emissive: 0x1e293b,
    emissiveIntensity: 0.35,
  });
  const screen = new THREE.Mesh(screenGeom, screenMat);
  group.add(screen);

  // Bezel Border
  const bezelGeom = new THREE.BoxGeometry(1.58, 1.98, 0.04);
  const wireGeom = new THREE.EdgesGeometry(bezelGeom);
  const bezelMat = new THREE.LineBasicMaterial({ color: 0x475569 });
  const bezel = new THREE.LineSegments(wireGeom, bezelMat);
  group.add(bezel);

  let lastTimeUpdate = 0;
  COMPONENT_ANIMATORS.push((delta, time) => {
    if (time - lastTimeUpdate > 0.1) {
      lastTimeUpdate = time;
      drawWatchFace(time);
    }
  });

  return group;
}

function buildRealisticSmartwatchCrown(part, baseMaterial) {
  const group = new THREE.Group();

  // Knurled Digital Crown
  const crownGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.26, 24);
  const crownMat = getHardwareMat(0xd4d4d8, 0.25, 0.85);
  const crown = new THREE.Mesh(crownGeom, crownMat);
  crown.rotation.z = Math.PI / 2;
  group.add(crown);

  // Signature Accent Ring (International Orange)
  const ringGeom = new THREE.TorusGeometry(0.225, 0.02, 12, 24);
  const ringMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.3 });
  const ring = new THREE.Mesh(ringGeom, ringMat);
  ring.rotation.y = Math.PI / 2;
  ring.position.x = 0.05;
  group.add(ring);

  return group;
}

function buildRealisticSmartwatchStrap(part, baseMaterial) {
  const group = new THREE.Group();

  // Dual Sports Band Straps (Top and Bottom)
  const strapGeom = new THREE.BoxGeometry(1.4, 4.4, 0.16);
  const strap = new THREE.Mesh(strapGeom, baseMaterial);
  group.add(strap);

  // Ventilation Holes
  [-1.4, -1.1, -0.8, 0.8, 1.1, 1.4].forEach((y) => {
    const holeGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.18, 16);
    const holeMat = getHardwareMat(0x0f172a, 0.5, 0.7);
    const hole = new THREE.Mesh(holeGeom, holeMat);
    hole.rotation.x = Math.PI / 2;
    hole.position.set(0, y, 0);
    group.add(hole);
  });

  return group;
}

function buildRealisticSmartwatchSensor(part, baseMaterial) {
  const group = new THREE.Group();

  // Ceramic Sensor Backing Disc
  const discGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 28);
  const discMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.2, metalness: 0.1 });
  const disc = new THREE.Mesh(discGeom, discMat);
  disc.rotation.x = Math.PI / 2;
  group.add(disc);

  // 4 Green Optical LED Emitter / Photodiode Lenses with Pulsing Bio-Luminescence
  const ledGroup = new THREE.Group();
  ledGroup.rotation.x = Math.PI / 2;
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const lensGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 1.2,
      roughness: 0.1,
    });
    const lens = new THREE.Mesh(lensGeom, lensMat);
    lens.position.set(Math.cos(angle) * 0.26, Math.sin(angle) * 0.26, 0.04);
    ledGroup.add(lens);
  }
  group.add(ledGroup);

  COMPONENT_ANIMATORS.push((delta, time) => {
    const pulse = 0.8 + Math.sin(time * 5.0) * 0.6;
    ledGroup.children.forEach((c) => {
      if (c.material) c.material.emissiveIntensity = pulse;
    });
  });

  return group;
}

// -----------------------------------------------------------------------------
// 17. 3D PRINTER PROCEDURAL COMPONENTS
// -----------------------------------------------------------------------------
function buildRealistic3DPrinterFrame(part, baseMaterial) {
  const group = new THREE.Group();

  // Gantry Frame Chassis
  const frameGeom = new THREE.BoxGeometry(3.8, 4.2, 3.6);
  const frame = new THREE.Mesh(frameGeom, baseMaterial);
  group.add(frame);

  // Dual Z-Axis Threaded Lead Screws & Smooth Linear Rods
  [-1.5, 1.5].forEach((x) => {
    const screwGeom = new THREE.CylinderGeometry(0.06, 0.06, 4.0, 16);
    const screwMat = getHardwareMat(0xe2e8f0, 0.2, 0.95);
    const screw = new THREE.Mesh(screwGeom, screwMat);
    screw.position.set(x, 0, -1.3);
    group.add(screw);

    const rodGeom = new THREE.CylinderGeometry(0.07, 0.07, 4.0, 16);
    const rodMat = getHardwareMat(0x94a3b8, 0.15, 0.95);
    const rod = new THREE.Mesh(rodGeom, rodMat);
    rod.position.set(x, 0, -1.05);
    group.add(rod);
  });

  return group;
}

function buildRealistic3DPrinterExtruder(part, baseMaterial) {
  const group = new THREE.Group();

  // Anodized Aluminum Toolhead Housing
  const bodyGeom = new THREE.BoxGeometry(0.68, 0.75, 0.68);
  const bodyMat = getHardwareMat(0x0284c7, 0.25, 0.8);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  group.add(body);

  // Front Radial Part Cooling Blower Fan
  const fanGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 20);
  const fanMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
  const fan = new THREE.Mesh(fanGeom, fanMat);
  fan.rotation.x = Math.PI / 2;
  fan.position.set(0, 0.05, 0.36);
  group.add(fan);

  // Brass 0.4mm Hotend Nozzle Tip with Glowing Thermal Zone
  const nozzleGeom = new THREE.ConeGeometry(0.08, 0.22, 16);
  const nozzleMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xef4444,
    emissiveIntensity: 0.6,
    metalness: 0.85,
    roughness: 0.2,
  });
  const nozzle = new THREE.Mesh(nozzleGeom, nozzleMat);
  nozzle.rotation.x = Math.PI;
  nozzle.position.set(0, -0.48, 0);
  group.add(nozzle);

  return group;
}

function buildRealistic3DPrinterBed(part, baseMaterial) {
  const group = new THREE.Group();

  // Textured Gold PEI Spring Steel Sheet with Grid Texture
  const bedTexture = makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#b45309';
    ctx.fillRect(0, 0, sz, sz);

    // Precision Measurement Grid Lines
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1;
    const step = sz / 10;
    for (let i = 0; i <= sz; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, sz);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(sz, i);
      ctx.stroke();
    }
  }, 256);

  const bedGeom = new THREE.BoxGeometry(2.8, 0.12, 2.8);
  const bedMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    map: bedTexture,
    roughness: 0.6,
    metalness: 0.4,
  });
  const bed = new THREE.Mesh(bedGeom, bedMat);
  group.add(bed);

  // 4 Anodized Bed Leveling Thumbwheels Underneath
  [[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]].forEach(([x, z]) => {
    const wheelGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.1, 16);
    const wheelMat = getHardwareMat(0xef4444, 0.3, 0.85);
    const wheel = new THREE.Mesh(wheelGeom, wheelMat);
    wheel.position.set(x, -0.16, z);
    group.add(wheel);
  });

  return group;
}

function buildRealistic3DPrinterSpool(part, baseMaterial) {
  const group = new THREE.Group();

  // Dual Clear Acrylic Spool Flanges
  const flangeGeom = new THREE.CylinderGeometry(1.1, 1.1, 0.05, 24);
  const flangeMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.4,
    roughness: 0.2,
    metalness: 0.1,
  });

  [-0.26, 0.26].forEach((y) => {
    const flange = new THREE.Mesh(flangeGeom, flangeMat);
    flange.position.y = y;
    group.add(flange);
  });

  // Wound Filament Core (Vibrant Crimson PLA)
  const coreGeom = new THREE.CylinderGeometry(0.95, 0.95, 0.48, 24);
  const coreMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.7 });
  const core = new THREE.Mesh(coreGeom, coreMat);
  group.add(core);

  return group;
}

function buildRealistic3DPrinterSteppers(part, baseMaterial) {
  const group = new THREE.Group();

  // NEMA-17 Industrial Stepper Motor Body
  const motorGeom = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const motor = new THREE.Mesh(motorGeom, baseMaterial);
  group.add(motor);

  // Toothed Aluminum Drive Pulley & Output Shaft
  const shaftGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.35, 16);
  const shaftMat = getHardwareMat(0xe2e8f0, 0.2, 0.95);
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  shaft.position.y = 0.52;
  group.add(shaft);

  return group;
}

// -----------------------------------------------------------------------------
// 18. MRI MACHINE PROCEDURAL COMPONENTS
// -----------------------------------------------------------------------------
function buildRealisticMRIGantry(part, baseMaterial) {
  const group = new THREE.Group();

  // Outer Medical White Magnet Housing
  const gantryGeom = new THREE.CylinderGeometry(2.6, 2.6, 3.2, 32);
  const gantry = new THREE.Mesh(gantryGeom, baseMaterial);
  group.add(gantry);

  // Hollow Patient Tunnel Bore Opening
  const boreGeom = new THREE.CylinderGeometry(1.35, 1.35, 3.25, 32);
  const boreMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7 });
  const bore = new THREE.Mesh(boreGeom, boreMat);
  group.add(bore);

  // Soft Ambient Bore Halo Ring (Patient Comfort Lighting)
  const haloGeom = new THREE.TorusGeometry(1.36, 0.04, 12, 36);
  const haloMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x38bdf8,
    emissiveIntensity: 1.5,
  });
  const halo = new THREE.Mesh(haloGeom, haloMat);
  halo.position.y = 1.61;
  halo.rotation.x = Math.PI / 2;
  group.add(halo);

  return group;
}

function buildRealisticMRITable(part, baseMaterial) {
  const group = new THREE.Group();

  // Carbon-Fiber Motorized Table Base
  const tableGeom = new THREE.BoxGeometry(1.2, 0.4, 5.2);
  const table = new THREE.Mesh(tableGeom, baseMaterial);
  group.add(table);

  // Contoured Sanitized Memory Foam Patient Mattress
  const padGeom = new THREE.BoxGeometry(1.08, 0.12, 4.8);
  const padMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.85 });
  const pad = new THREE.Mesh(padGeom, padMat);
  pad.position.y = 0.24;
  group.add(pad);

  // Head/Neck Matrix RF Imaging Coil Cradle
  const coilGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.75, 16, 1, true, 0, Math.PI);
  coilGeom.rotateX(Math.PI / 2);
  const coilMat = getHardwareMat(0xe2e8f0, 0.3, 0.8);
  const coil = new THREE.Mesh(coilGeom, coilMat);
  coil.position.set(0, 0.55, -1.8);
  group.add(coil);

  return group;
}

function buildRealisticMRIConsole(part, baseMaterial) {
  const group = new THREE.Group();

  // Technologist Workstation Desk
  const deskGeom = new THREE.BoxGeometry(1.6, 0.8, 0.8);
  const deskMat = getHardwareMat(0x1e293b, 0.4, 0.7);
  const desk = new THREE.Mesh(deskGeom, deskMat);
  group.add(desk);

  // Dual Medical Diagnostic Imaging LCD Displays
  const mriTexture = makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#05070a';
    ctx.fillRect(0, 0, sz, sz);

    // Simulated Axial MRI Brain Scan Contour
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(sz / 2, sz / 2, sz * 0.35, sz * 0.42, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 1.5;
    for (let r = 0.15; r < 0.35; r += 0.05) {
      ctx.beginPath();
      ctx.ellipse(sz / 2, sz / 2, sz * r, sz * (r * 1.15), 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = '#22c55e';
    ctx.font = '24px monospace';
    ctx.fillText('T2 FSE 3.0T', 20, 36);
    ctx.fillText('FOV: 220mm', 20, 68);
  }, 256);

  [-0.38, 0.38].forEach((x) => {
    const monGeom = new THREE.BoxGeometry(0.7, 0.5, 0.04);
    const monMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: mriTexture,
      emissive: 0x112233,
      emissiveIntensity: 0.4,
    });
    const mon = new THREE.Mesh(monGeom, monMat);
    mon.position.set(x, 0.65, -0.1);
    group.add(mon);
  });

  return group;
}

// -----------------------------------------------------------------------------
// 19. HUMAN HEART PROCEDURAL BIOMECHANICS & HEMODYNAMICS
// -----------------------------------------------------------------------------
function buildRealisticHeartVentricle(part, baseMaterial) {
  const group = new THREE.Group();

  // Muscle Myocardial Wall Geometry
  const r = part.geometry.args[0] || 1.0;
  const ventGeom = new THREE.SphereGeometry(r, 28, 28);
  ventGeom.scale(0.9, 1.25, 0.95);
  const ventMat = new THREE.MeshStandardMaterial({
    color: part.color,
    roughness: 0.75,
    metalness: 0.1,
    bumpMap: makeTexturedPlasticBumpMap(),
    bumpScale: 0.015,
  });
  const vent = new THREE.Mesh(ventGeom, ventMat);
  vent.castShadow = true;
  group.add(vent);

  // Branching Coronary Arteries (Anterior Interventricular Artery)
  const pts = [
    new THREE.Vector3(0, r * 0.9, r * 0.8),
    new THREE.Vector3(0.15, r * 0.3, r * 0.9),
    new THREE.Vector3(-0.1, -r * 0.2, r * 0.85),
    new THREE.Vector3(0.05, -r * 0.8, r * 0.5),
  ];
  const curve = new THREE.CatmullRomCurve3(pts);
  const arteryGeom = new THREE.TubeGeometry(curve, 20, 0.04, 8, false);
  const arteryMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
  const artery = new THREE.Mesh(arteryGeom, arteryMat);
  group.add(artery);

  // Rhythmic Sinus-Rhythm Cardiac Contraction (lub-dub heart beat)
  COMPONENT_ANIMATORS.push((delta, time) => {
    const t = (time * 1.8) % 1.0;
    const lub = Math.exp(-Math.pow(t - 0.2, 2) * 80);
    const dub = Math.exp(-Math.pow(t - 0.45, 2) * 80);
    const scale = 1.0 + (lub * 0.08 + dub * 0.05);
    group.scale.set(scale, 1.0 + (lub * 0.05 + dub * 0.03), scale);
  });

  return group;
}

function buildRealisticHeartAtrium(part, baseMaterial) {
  const group = new THREE.Group();

  const r = part.geometry.args[0] || 0.8;
  const atriumGeom = new THREE.SphereGeometry(r, 24, 24);
  atriumGeom.scale(1.1, 0.9, 1.0);
  const atriumMat = new THREE.MeshStandardMaterial({
    color: part.color,
    roughness: 0.8,
    metalness: 0.05,
    bumpMap: makeTexturedPlasticBumpMap(),
    bumpScale: 0.012,
  });
  const atrium = new THREE.Mesh(atriumGeom, atriumMat);
  atrium.castShadow = true;
  group.add(atrium);

  // Atrial Auricle Appendage
  const auricleGeom = new THREE.ConeGeometry(r * 0.5, r * 0.6, 16);
  const auricleMat = atriumMat;
  const auricle = new THREE.Mesh(auricleGeom, auricleMat);
  auricle.position.set(r * 0.6, 0.1, r * 0.4);
  auricle.rotation.z = -0.5;
  group.add(auricle);

  // Synchronous Pre-Ventricular Atrial Kick Pulsation
  COMPONENT_ANIMATORS.push((delta, time) => {
    const t = (time * 1.8) % 1.0;
    const atrialKick = Math.exp(-Math.pow(t - 0.08, 2) * 80);
    const scale = 1.0 + atrialKick * 0.07;
    group.scale.set(scale, scale, scale);
  });

  return group;
}

function buildRealisticAorta(part, baseMaterial) {
  const group = new THREE.Group();

  // High-Pressure Ascending Aorta Trunk
  const aortaGeom = new THREE.CylinderGeometry(0.45, 0.45, 2.2, 24);
  const aorta = new THREE.Mesh(aortaGeom, baseMaterial);
  group.add(aorta);

  // Three Primary Arch Arteries: Brachiocephalic, Common Carotid, Subclavian
  [-0.3, 0, 0.3].forEach((offset) => {
    const branchGeom = new THREE.CylinderGeometry(0.12, 0.14, 0.8, 16);
    const branchMat = getHardwareMat(0xef4444, 0.4, 0.6);
    const branch = new THREE.Mesh(branchGeom, branchMat);
    branch.position.set(offset * 0.7, 1.25, offset * 0.4);
    branch.rotation.z = offset * 0.4;
    group.add(branch);
  });

  return group;
}

function buildRealisticMajorVeins(part, baseMaterial) {
  const group = new THREE.Group();

  // Vena Cava Vertical Venous Trunk
  const vcGeom = new THREE.CylinderGeometry(0.4, 0.4, 2.6, 20);
  const vc = new THREE.Mesh(vcGeom, baseMaterial);
  group.add(vc);

  // Pulmonary Vein Conduits
  const pvGeom = new THREE.CylinderGeometry(0.2, 0.2, 1.1, 16);
  const pvMat = getHardwareMat(0x1d4ed8, 0.4, 0.6);
  const pv1 = new THREE.Mesh(pvGeom, pvMat);
  pv1.rotation.z = Math.PI / 2;
  pv1.position.set(-0.6, 0.4, 0);
  group.add(pv1);

  return group;
}

// -----------------------------------------------------------------------------
// 20. HUMAN EYE PROCEDURAL OPTICS & NEURAL RETINA
// -----------------------------------------------------------------------------
function buildRealisticEyeCornea(part, baseMaterial) {
  const group = new THREE.Group();

  // High-Refractive Transparent Cornea Dome
  const corneaGeom = new THREE.SphereGeometry(0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.45);
  const corneaMat = new THREE.MeshPhysicalMaterial({
    color: 0xe0f2fe,
    transmission: 0.95,
    ior: 1.376, // Human corneal refractive index
    roughness: 0.05,
    metalness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.85,
  });
  const cornea = new THREE.Mesh(corneaGeom, corneaMat);
  cornea.rotation.x = -Math.PI / 2;
  group.add(cornea);

  // Limbal Boundary Ring (Transition between cornea and sclera)
  const limbusGeom = new THREE.TorusGeometry(0.82, 0.03, 12, 36);
  const limbusMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.4,
    roughness: 0.3,
  });
  const limbus = new THREE.Mesh(limbusGeom, limbusMat);
  group.add(limbus);

  return group;
}

function buildRealisticEyeIris(part, baseMaterial) {
  const group = new THREE.Group();

  // Procedural Ultra-Realistic Iris Texture with Crypts & Pupil Aperture
  const irisTexture = makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, sz, sz);

    const cx = sz / 2, cy = sz / 2;
    const outerR = sz * 0.48;
    const innerR = sz * 0.17; // Central pupil hole

    // Deep radial striae and pupillary crypt fibers
    for (let i = 0; i < 360; i += 0.8) {
      const angle = (i * Math.PI) / 180;
      const shade = 140 + Math.sin(i * 12.0) * 60 + Math.random() * 40;
      ctx.strokeStyle = `rgb(10, ${Math.min(255, Math.round(shade * 1.1))}, ${Math.min(255, Math.round(shade * 1.5))})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
      ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
      ctx.stroke();
    }

    // Outer Limbal Ring Dark Border
    const grad = ctx.createRadialGradient(cx, cy, outerR * 0.8, cx, cy, outerR);
    grad.addColorStop(0, 'rgba(3, 105, 161, 0)');
    grad.addColorStop(1, 'rgba(8, 47, 73, 0.95)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.fill();

    // Central Pupil (Deep Black Aperture)
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.fill();
  }, 512);

  const irisGeom = new THREE.CylinderGeometry(0.78, 0.78, 0.05, 32);
  const irisMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: irisTexture,
    roughness: 0.3,
    metalness: 0.1,
  });
  const iris = new THREE.Mesh(irisGeom, irisMat);
  group.add(iris);

  return group;
}

function buildRealisticEyeLens(part, baseMaterial) {
  const group = new THREE.Group();

  // Biconvex Crystalline Optical Lens
  const lensGeom = new THREE.CylinderGeometry(0.65, 0.65, 0.22, 28);
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.96,
    ior: 1.406, // Human lens refractive index
    roughness: 0.05,
    metalness: 0.0,
    transparent: true,
    opacity: 0.7,
    clearcoat: 1.0,
  });
  const lens = new THREE.Mesh(lensGeom, lensMat);
  group.add(lens);

  // Zonular Suspensory Fibers Ring
  const zonuleGeom = new THREE.TorusGeometry(0.72, 0.03, 12, 32);
  const zonuleMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.5 });
  const zonule = new THREE.Mesh(zonuleGeom, zonuleMat);
  group.add(zonule);

  return group;
}

function buildRealisticEyeRetina(part, baseMaterial) {
  const group = new THREE.Group();

  // Sclera Outer White Shell with Retinal Inner Map
  const retinaTexture = makeCanvasTexture((ctx, sz) => {
    ctx.fillStyle = '#e2e8f0'; // Outer scleral white
    ctx.fillRect(0, 0, sz, sz);

    // Inner retinal fundus color gradient
    const cx = sz / 2, cy = sz / 2;
    const fundusGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, sz * 0.45);
    fundusGrad.addColorStop(0, '#f97316');
    fundusGrad.addColorStop(0.6, '#ea580c');
    fundusGrad.addColorStop(1, '#9a3412');
    ctx.fillStyle = fundusGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, sz * 0.44, 0, Math.PI * 2);
    ctx.fill();

    // Optic Disc (Blind Spot) Pale Yellow
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(cx * 0.75, cy * 0.9, sz * 0.06, 0, Math.PI * 2);
    ctx.fill();

    // Macula & Fovea Centralis Dark Spot
    ctx.fillStyle = '#7c2d12';
    ctx.beginPath();
    ctx.arc(cx * 1.15, cy * 0.9, sz * 0.04, 0, Math.PI * 2);
    ctx.fill();

    // Branching Retinal Blood Vessels (Arterioles in Red, Venules in Crimson)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    for (let v = 0; v < 6; v++) {
      const a = (v / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx * 0.75, cy * 0.9);
      ctx.quadraticCurveTo(
        cx * 0.75 + Math.cos(a) * sz * 0.2,
        cy * 0.9 + Math.sin(a) * sz * 0.2,
        cx * 0.75 + Math.cos(a + 0.3) * sz * 0.38,
        cy * 0.9 + Math.sin(a + 0.3) * sz * 0.38
      );
      ctx.stroke();
    }
  }, 512);

  const sphereGeom = new THREE.SphereGeometry(1.5, 32, 32);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: retinaTexture,
    roughness: 0.65,
    metalness: 0.05,
  });
  const sphere = new THREE.Mesh(sphereGeom, sphereMat);
  sphere.castShadow = true;
  group.add(sphere);

  return group;
}

function buildRealisticOpticNerve(part, baseMaterial) {
  const group = new THREE.Group();

  // Myelinated Nerve Cable Trunk
  const nerveGeom = new THREE.CylinderGeometry(0.35, 0.35, 1.8, 20);
  const nerve = new THREE.Mesh(nerveGeom, baseMaterial);
  group.add(nerve);

  // Central Retinal Artery & Vein Core Entry
  const coreGeom = new THREE.CylinderGeometry(0.1, 0.1, 1.82, 12);
  const coreMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
  const core = new THREE.Mesh(coreGeom, coreMat);
  group.add(core);

  return group;
}

// =============================================================================
// 17. WIND TURBINE DETAILED PROCEDURAL ENGINEERING BUILDERS
// =============================================================================

function buildRealisticWindTurbineFoundation(part, baseMaterial) {
  const group = new THREE.Group();

  // Heavy Octagonal Reinforced Concrete Base
  const baseGeom = new THREE.CylinderGeometry(2.5, 2.7, 0.6, 8);
  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.85,
    metalness: 0.05,
    bumpMap: typeof makeTexturedPlasticBumpMap === 'function' ? makeTexturedPlasticBumpMap() : null,
    bumpScale: 0.04,
  });
  const base = new THREE.Mesh(baseGeom, concreteMat);
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  // Elevated Center Pedestal Ring
  const plinthGeom = new THREE.CylinderGeometry(1.15, 1.2, 0.22, 24);
  const plinth = new THREE.Mesh(plinthGeom, concreteMat);
  plinth.position.y = 0.38;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);

  // Steel Foundation Adapter Flange Collar Ring
  const collarGeom = new THREE.CylinderGeometry(0.96, 0.96, 0.08, 32);
  const collarMat = getHardwareMat(0x475569, 0.35, 0.8);
  const collar = new THREE.Mesh(collarGeom, collarMat);
  collar.position.y = 0.52;
  group.add(collar);

  // 32 Radial High-Tensile Anchor Studs with Heavy Hex Nuts
  const boltGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.12, 6);
  const boltMat = getHardwareMat(0xd1d5db, 0.25, 0.9);
  const boltRadius = 0.88;
  const boltCount = 32;
  for (let i = 0; i < boltCount; i++) {
    const angle = (i / boltCount) * Math.PI * 2;
    const bolt = new THREE.Mesh(boltGeom, boltMat);
    bolt.position.set(Math.cos(angle) * boltRadius, 0.58, Math.sin(angle) * boltRadius);
    group.add(bolt);
  }

  // Earthing Copper Grounding Busbar Strip
  const earthGeom = new THREE.BoxGeometry(0.06, 0.7, 0.02);
  const earthMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.3 });
  const earth = new THREE.Mesh(earthGeom, earthMat);
  earth.position.set(0.92, 0.15, 0.4);
  group.add(earth);

  return group;
}

function buildRealisticWindTurbineTower(part, baseMaterial) {
  const group = new THREE.Group();

  // Tapered Tubular Structural Steel Mast
  const towerGeom = new THREE.CylinderGeometry(0.38, 0.72, 11.2, 32);
  const towerMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.35,
    metalness: 0.15,
  });
  const tower = new THREE.Mesh(towerGeom, towerMat);
  tower.castShadow = true;
  tower.receiveShadow = true;
  group.add(tower);

  // Structural Section Flange Rings (Segment Bolted Joints)
  const flangeY = [-1.8, 2.2];
  flangeY.forEach((fy) => {
    const t = (fy + 5.6) / 11.2;
    const r = 0.72 - t * (0.72 - 0.38);
    const ringGeom = new THREE.TorusGeometry(r + 0.015, 0.025, 8, 32);
    const ringMat = getHardwareMat(0x94a3b8, 0.4, 0.6);
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = fy;
    group.add(ring);
  });

  // Base Maintenance Entrance Door
  const doorGroup = new THREE.Group();
  doorGroup.position.set(0, -4.9, 0.68);

  const doorFrameGeom = new THREE.BoxGeometry(0.42, 0.88, 0.06);
  const doorFrameMat = getHardwareMat(0x334155, 0.4, 0.7);
  const doorFrame = new THREE.Mesh(doorFrameGeom, doorFrameMat);
  doorGroup.add(doorFrame);

  const doorPanelGeom = new THREE.BoxGeometry(0.36, 0.8, 0.04);
  const doorPanelMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.4, metalness: 0.3 });
  const doorPanel = new THREE.Mesh(doorPanelGeom, doorPanelMat);
  doorPanel.position.z = 0.02;
  doorGroup.add(doorPanel);

  // Handle & RFID Access Keypad
  const handleGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.12, 8);
  const handle = new THREE.Mesh(handleGeom, getHardwareMat(0xf8fafc, 0.2, 0.9));
  handle.position.set(0.12, 0.0, 0.05);
  doorGroup.add(handle);

  const keyPadGeom = new THREE.BoxGeometry(0.08, 0.12, 0.03);
  const keyPad = new THREE.Mesh(keyPadGeom, new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 }));
  keyPad.position.set(-0.12, 0.05, 0.05);
  doorGroup.add(keyPad);

  group.add(doorGroup);

  // Louvered Air Intake Grille above door
  const grilleGeom = new THREE.BoxGeometry(0.35, 0.22, 0.03);
  const grilleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
  const grille = new THREE.Mesh(grilleGeom, grilleMat);
  grille.position.set(0, -4.2, 0.65);
  group.add(grille);

  // Flashing Red Aviation Obstruction Warning Beacon
  const beaconGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.1, 16);
  const beaconMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xef4444,
    emissiveIntensity: 1.2,
    roughness: 0.2,
  });
  const beacon = new THREE.Mesh(beaconGeom, beaconMat);
  beacon.position.set(0, 5.5, -0.4);
  group.add(beacon);

  // Flashing beacon light animator
  COMPONENT_ANIMATORS.push((delta, time) => {
    const pulse = Math.sin(time * 3.5) > 0.4 ? 2.5 : 0.2;
    beaconMat.emissiveIntensity = pulse;
  });

  return group;
}

function buildRealisticWindTurbineNacelle(part, baseMaterial) {
  const group = new THREE.Group();

  // Aerodynamic Fiberglass Nacelle Shell
  const bodyGeom = new THREE.BoxGeometry(1.2, 1.1, 2.6);
  const nacelleMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.28,
    metalness: 0.1,
  });
  const body = new THREE.Mesh(bodyGeom, nacelleMat);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Tapered Rear Tail Fairing
  const tailGeom = new THREE.CylinderGeometry(0.48, 0.2, 0.65, 24);
  const tail = new THREE.Mesh(tailGeom, nacelleMat);
  tail.rotation.x = Math.PI / 2;
  tail.position.set(0, 0.05, -1.55);
  group.add(tail);

  // Aerospace Blue Dynamic Accent Stripe
  const stripeGeom = new THREE.BoxGeometry(1.21, 0.12, 2.2);
  const stripeMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3 });
  const stripe = new THREE.Mesh(stripeGeom, stripeMat);
  stripe.position.set(0, -0.15, -0.1);
  group.add(stripe);

  // --- INTERNAL MACHINERY SUBASSEMBLY (Visible in Exploded & X-Ray Mode) ---
  const machGroup = new THREE.Group();

  // Low-Speed Main Rotor Shaft
  const shaftGeom = new THREE.CylinderGeometry(0.24, 0.24, 1.0, 24);
  const shaftMat = getHardwareMat(0x64748b, 0.3, 0.85);
  const shaft = new THREE.Mesh(shaftGeom, shaftMat);
  shaft.rotation.x = Math.PI / 2;
  shaft.position.set(0, 0.1, 0.7);
  machGroup.add(shaft);

  // Main Spherical Roller Bearing Housing
  const bearingGeom = new THREE.CylinderGeometry(0.36, 0.36, 0.35, 24);
  const bearingMat = getHardwareMat(0x334155, 0.45, 0.75);
  const bearing = new THREE.Mesh(bearingGeom, bearingMat);
  bearing.rotation.x = Math.PI / 2;
  bearing.position.set(0, 0.1, 0.7);
  machGroup.add(bearing);

  // High-Torque Emergency Disc Brake with Twin Calipers
  const discGeom = new THREE.CylinderGeometry(0.46, 0.46, 0.04, 32);
  const discMat = getHardwareMat(0x94a3b8, 0.2, 0.95);
  const disc = new THREE.Mesh(discGeom, discMat);
  disc.rotation.x = Math.PI / 2;
  disc.position.set(0, 0.1, 0.35);
  machGroup.add(disc);

  const caliperGeom = new THREE.BoxGeometry(0.18, 0.22, 0.12);
  const caliperMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.35 });
  const caliper1 = new THREE.Mesh(caliperGeom, caliperMat);
  caliper1.position.set(0.32, 0.3, 0.35);
  machGroup.add(caliper1);

  // Planetary Step-Up Gearbox (Spur/Planetary Gear Housing)
  const gearboxGeom = new THREE.BoxGeometry(0.72, 0.72, 0.75);
  const gearboxMat = getHardwareMat(0x1e293b, 0.5, 0.8);
  const gearbox = new THREE.Mesh(gearboxGeom, gearboxMat);
  gearbox.position.set(0, 0.05, 0.0);
  machGroup.add(gearbox);

  // High-Speed AC Induction Generator
  const genGeom = new THREE.CylinderGeometry(0.36, 0.36, 0.85, 24);
  const genMat = getHardwareMat(0x0f172a, 0.4, 0.85);
  const gen = new THREE.Mesh(genGeom, genMat);
  gen.rotation.x = Math.PI / 2;
  gen.position.set(0, 0.05, -0.75);
  machGroup.add(gen);

  // Copper Stator End Winding Ring
  const copperGeom = new THREE.TorusGeometry(0.28, 0.05, 12, 24);
  const copperMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.3, metalness: 0.9 });
  const copper = new THREE.Mesh(copperGeom, copperMat);
  copper.position.set(0, 0.05, -0.4);
  machGroup.add(copper);

  group.add(machGroup);

  // Rear Cooling Radiator Exhaust Louver
  const louverGeom = new THREE.BoxGeometry(0.65, 0.45, 0.03);
  const louverMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
  const louver = new THREE.Mesh(louverGeom, louverMat);
  louver.position.set(0, 0.15, -1.31);
  group.add(louver);

  // Roof Meteorological Mast: Anemometer & Wind Vane
  const mastGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.38, 12);
  const mast = new THREE.Mesh(mastGeom, getHardwareMat(0x94a3b8, 0.3, 0.8));
  mast.position.set(0, 0.74, -0.85);
  group.add(mast);

  // Wind direction vane
  const vaneGeom = new THREE.BoxGeometry(0.02, 0.08, 0.22);
  const vaneMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
  const vane = new THREE.Mesh(vaneGeom, vaneMat);
  vane.position.set(0, 0.92, -0.85);
  group.add(vane);

  // Roof Aviation Red Beacon
  const topBeaconGeom = new THREE.SphereGeometry(0.045, 16, 16);
  const topBeaconMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xef4444,
    emissiveIntensity: 1.5,
  });
  const topBeacon = new THREE.Mesh(topBeaconGeom, topBeaconMat);
  topBeacon.position.set(0, 0.96, -0.5);
  group.add(topBeacon);

  COMPONENT_ANIMATORS.push((delta, time) => {
    topBeaconMat.emissiveIntensity = Math.sin(time * 3.5) > 0.4 ? 2.5 : 0.2;
    vane.rotation.y = Math.sin(time * 0.4) * 0.15;
  });

  return group;
}

function buildRealisticWindTurbineRotorHub(part, baseMaterial) {
  const group = new THREE.Group();

  // Aerodynamic Nose Spinner Cone (Bullet Profile)
  // Local Y is aligned forward because of [Math.PI/2, 0, 0] in objects.js
  const coneGeom = new THREE.CylinderGeometry(0.55, 0.18, 0.9, 32);
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    roughness: 0.32,
    metalness: 0.2,
  });
  const cone = new THREE.Mesh(coneGeom, hubMat);
  cone.castShadow = true;
  group.add(cone);

  // Spinner Nose Tip Dome
  const domeGeom = new THREE.SphereGeometry(0.18, 24, 16);
  const dome = new THREE.Mesh(domeGeom, hubMat);
  dome.position.y = 0.45;
  group.add(dome);

  // 3 Pitch Bearing Circular Flange Rings around circumference
  const ringGeom = new THREE.TorusGeometry(0.24, 0.03, 10, 24);
  const ringMat = getHardwareMat(0xd1d5db, 0.25, 0.85);
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.position.set(Math.cos(angle) * 0.42, 0.0, Math.sin(angle) * 0.42);
    ring.rotation.x = Math.PI / 2;
    ring.rotation.y = angle;
    group.add(ring);
  }

  return group;
}

function buildRealisticWindTurbineBlades(part, baseMaterial) {
  const group = new THREE.Group();

  // Exactly 3 Aerodynamic Twisted Airfoil Blades Spaced 120° Apart
  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.22,
    metalness: 0.05,
    clearcoat: 0.4,
  });

  const tipRedMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    roughness: 0.3,
  });

  for (let b = 0; b < 3; b++) {
    const angle = (b / 3) * Math.PI * 2;
    const bladeGroup = new THREE.Group();
    bladeGroup.rotation.z = angle;

    // 1. Blade Root Pitch Transition Cylinder
    const rootGeom = new THREE.CylinderGeometry(0.18, 0.22, 0.7, 24);
    const root = new THREE.Mesh(rootGeom, getHardwareMat(0xe2e8f0, 0.3, 0.2));
    root.position.y = 0.45;
    bladeGroup.add(root);

    // Bolted Pitch Flange Ring
    const flangeGeom = new THREE.TorusGeometry(0.22, 0.025, 8, 24);
    const flange = new THREE.Mesh(flangeGeom, getHardwareMat(0x64748b, 0.3, 0.8));
    flange.rotation.x = Math.PI / 2;
    flange.position.y = 0.15;
    bladeGroup.add(flange);

    // 2. Main Aerodynamic Airfoil Blade (Tapered & Cambered)
    const segments = [
      { y1: 0.8, y2: 2.0, w1: 0.44, w2: 0.38, t1: 0.14, t2: 0.11, twist: 0.18 },
      { y1: 2.0, y2: 3.3, w1: 0.38, w2: 0.28, t1: 0.11, t2: 0.08, twist: 0.10 },
      { y1: 3.3, y2: 4.2, w1: 0.28, w2: 0.20, t1: 0.08, t2: 0.05, twist: 0.04 },
      { y1: 4.2, y2: 4.8, w1: 0.20, w2: 0.10, t1: 0.05, t2: 0.03, twist: 0.01 },
    ];

    segments.forEach((seg, idx) => {
      const len = seg.y2 - seg.y1;
      const avgW = (seg.w1 + seg.w2) * 0.5;
      const avgT = (seg.t1 + seg.t2) * 0.5;
      const segGeom = new THREE.BoxGeometry(avgW, len, avgT);
      const isTip = idx === 3;
      const mat = isTip ? tipRedMat : bladeMat;
      const mesh = new THREE.Mesh(segGeom, mat);
      mesh.position.y = seg.y1 + len * 0.5;
      mesh.rotation.y = seg.twist;
      mesh.castShadow = true;
      bladeGroup.add(mesh);
    });

    // Aviation Red Tip Safety Bands
    const bandGeom = new THREE.BoxGeometry(0.24, 0.22, 0.07);
    const band1 = new THREE.Mesh(bandGeom, tipRedMat);
    band1.position.y = 3.8;
    band1.rotation.y = 0.04;
    bladeGroup.add(band1);

    const band2 = new THREE.Mesh(bandGeom, tipRedMat);
    band2.position.y = 4.3;
    band2.rotation.y = 0.02;
    bladeGroup.add(band2);

    // Aerodynamic Winglet Tip
    const wingletGeom = new THREE.BoxGeometry(0.08, 0.25, 0.12);
    const winglet = new THREE.Mesh(wingletGeom, tipRedMat);
    winglet.position.set(0.04, 4.88, 0.06);
    winglet.rotation.x = 0.35;
    bladeGroup.add(winglet);

    group.add(bladeGroup);
  }

  // Smooth Realistic Continuous Blade Rotation
  COMPONENT_ANIMATORS.push((delta) => {
    group.rotation.z += delta * 0.95;
  });

  return group;
}

// =============================================================================
// 18. SOLAR PANEL DETAILED PROCEDURAL ENGINEERING BUILDERS
// =============================================================================

function buildRealisticSolarMount(part, baseMaterial) {
  const group = new THREE.Group();

  const galvanizedMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.45,
    metalness: 0.75,
    bumpMap: typeof makeBrushedMetalBumpMap === 'function' ? makeBrushedMetalBumpMap() : null,
    bumpScale: 0.02,
  });

  // 4 Heavy Steel Anchor Footplates with Concrete Anchor Bolts
  const footPositions = [
    [-1.2, -0.6, 1.2],
    [1.2, -0.6, 1.2],
    [-1.2, -0.6, -1.2],
    [1.2, -0.6, -1.2],
  ];

  const footGeom = new THREE.BoxGeometry(0.28, 0.05, 0.28);
  const boltGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.08, 6);
  const boltMat = getHardwareMat(0xe2e8f0, 0.2, 0.9);

  footPositions.forEach((pos) => {
    const foot = new THREE.Mesh(footGeom, galvanizedMat);
    foot.position.set(...pos);
    group.add(foot);

    const bolt = new THREE.Mesh(boltGeom, boltMat);
    bolt.position.set(pos[0], pos[1] + 0.04, pos[2]);
    group.add(bolt);
  });

  // Front Vertical Stanchions (Short Legs)
  const frontLegGeom = new THREE.BoxGeometry(0.08, 0.52, 0.08);
  [-1.2, 1.2].forEach((x) => {
    const leg = new THREE.Mesh(frontLegGeom, galvanizedMat);
    leg.position.set(x, -0.32, 1.2);
    group.add(leg);
  });

  // Rear Vertical Stanchions (Tall Legs for 30° Tilt Angle)
  const rearLegGeom = new THREE.BoxGeometry(0.08, 1.55, 0.08);
  [-1.2, 1.2].forEach((x) => {
    const leg = new THREE.Mesh(rearLegGeom, galvanizedMat);
    leg.position.set(x, 0.2, -1.2);
    group.add(leg);
  });

  // Diagonal Wind-Shear Cross Braces
  const braceGeom = new THREE.BoxGeometry(0.05, 1.85, 0.05);
  [-1.2, 1.2].forEach((x) => {
    const brace = new THREE.Mesh(braceGeom, galvanizedMat);
    brace.position.set(x, -0.06, 0.0);
    brace.rotation.x = -0.56;
    group.add(brace);
  });

  // Transverse Bottom Stabilizer Crossbars
  const crossGeom = new THREE.BoxGeometry(2.5, 0.06, 0.06);
  const frontCross = new THREE.Mesh(crossGeom, galvanizedMat);
  frontCross.position.set(0, -0.55, 1.2);
  group.add(frontCross);

  const rearCross = new THREE.Mesh(crossGeom, galvanizedMat);
  rearCross.position.set(0, -0.55, -1.2);
  group.add(rearCross);

  // Dual Longitudinal C-Channel Purlin Rails Supporting Panel (Tilted at 30°)
  const railGeom = new THREE.BoxGeometry(0.08, 0.12, 4.4);
  [-1.0, 1.0].forEach((x) => {
    const rail = new THREE.Mesh(railGeom, galvanizedMat);
    rail.position.set(x, 0.42, -0.1);
    rail.rotation.x = -Math.PI / 6;
    group.add(rail);

    // End-clamps holding panel down
    [-1.8, 1.8].forEach((zOffset) => {
      const clampGeom = new THREE.BoxGeometry(0.1, 0.08, 0.12);
      const clampMat = getHardwareMat(0x475569, 0.3, 0.85);
      const clamp = new THREE.Mesh(clampGeom, clampMat);
      clamp.position.set(x, 0.42 + Math.sin(Math.PI / 6) * zOffset, -0.1 + Math.cos(Math.PI / 6) * zOffset);
      clamp.rotation.x = -Math.PI / 6;
      group.add(clamp);
    });
  });

  return group;
}

function buildRealisticSolarFrame(part, baseMaterial) {
  const group = new THREE.Group();

  // Anodized Aluminum Perimeter Extrusions (Satin Dark Slate Finish)
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    roughness: 0.35,
    metalness: 0.7,
    bumpMap: typeof makeBrushedMetalBumpMap === 'function' ? makeBrushedMetalBumpMap() : null,
    bumpScale: 0.03,
  });

  // Left & Right Structural Frame Members
  const sideRailGeom = new THREE.BoxGeometry(0.06, 0.12, 5.0);
  const leftRail = new THREE.Mesh(sideRailGeom, frameMat);
  leftRail.position.x = -1.57;
  group.add(leftRail);

  const rightRail = new THREE.Mesh(sideRailGeom, frameMat);
  rightRail.position.x = 1.57;
  group.add(rightRail);

  // Top & Bottom Structural Frame Members
  const endRailGeom = new THREE.BoxGeometry(3.08, 0.12, 0.06);
  const topRail = new THREE.Mesh(endRailGeom, frameMat);
  topRail.position.z = -2.47;
  group.add(topRail);

  const bottomRail = new THREE.Mesh(endRailGeom, frameMat);
  bottomRail.position.z = 2.47;
  group.add(bottomRail);

  // 45-Degree Miter Joint Corner Keys
  const cornerKeyGeom = new THREE.BoxGeometry(0.08, 0.03, 0.08);
  const keyMat = getHardwareMat(0x94a3b8, 0.3, 0.9);
  [
    [-1.55, -2.45],
    [1.55, -2.45],
    [-1.55, 2.45],
    [1.55, 2.45],
  ].forEach(([cx, cz]) => {
    const key = new THREE.Mesh(cornerKeyGeom, keyMat);
    key.position.set(cx, 0.04, cz);
    group.add(key);
  });

  // Drainage Weep Notches along bottom rail
  const weepGeom = new THREE.BoxGeometry(0.04, 0.02, 0.08);
  const weepMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
  [-1.0, 0, 1.0].forEach((wx) => {
    const weep = new THREE.Mesh(weepGeom, weepMat);
    weep.position.set(wx, -0.05, 2.47);
    group.add(weep);
  });

  // Laser-Etched Compliance & Ratings Label on side rail
  const labelGeom = new THREE.BoxGeometry(0.01, 0.08, 0.45);
  const labelMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
  const label = new THREE.Mesh(labelGeom, labelMat);
  label.position.set(1.602, 0.0, 0.0);
  group.add(label);

  return group;
}

function buildRealisticSolarPanelSurface(part, baseMaterial) {
  const group = new THREE.Group();

  // High-Resolution 1024x1024 Monocrystalline Photovoltaic Silicon Wafer Texture
  const pvTexture = makeCanvasTexture((ctx, sz) => {
    const grad = ctx.createLinearGradient(0, 0, sz, sz);
    grad.addColorStop(0, '#07162c');
    grad.addColorStop(0.5, '#0b1f3d');
    grad.addColorStop(1, '#07152a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, sz, sz);

    const cols = 6;
    const rows = 12;
    const pad = sz * 0.012;
    const cellW = (sz - pad * 2) / cols;
    const cellH = (sz - pad * 2) / rows;
    const chamfer = cellW * 0.12;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = pad + c * cellW;
        const y = pad + r * cellH;
        const gap = 1.2;

        // Monocrystalline Pseudo-Square Wafer Cell (Cut Corners)
        ctx.fillStyle = (r + c) % 2 === 0 ? '#0b2144' : '#091c3a';
        ctx.beginPath();
        ctx.moveTo(x + gap + chamfer, y + gap);
        ctx.lineTo(x + cellW - gap - chamfer, y + gap);
        ctx.lineTo(x + cellW - gap, y + gap + chamfer);
        ctx.lineTo(x + cellW - gap, y + cellH - gap - chamfer);
        ctx.lineTo(x + cellW - gap - chamfer, y + cellH - gap);
        ctx.lineTo(x + gap + chamfer, y + cellH - gap);
        ctx.lineTo(x + gap, y + cellH - gap - chamfer);
        ctx.lineTo(x + gap, y + gap + chamfer);
        ctx.closePath();
        ctx.fill();

        // Horizontal fine collector fingers
        ctx.strokeStyle = 'rgba(180, 205, 235, 0.18)';
        ctx.lineWidth = 0.5;
        const fingerCount = 18;
        for (let f = 1; f < fingerCount; f++) {
          const fy = y + (f / fingerCount) * cellH;
          ctx.beginPath();
          ctx.moveTo(x + gap + 1, fy);
          ctx.lineTo(x + cellW - gap - 1, fy);
          ctx.stroke();
        }

        // 9 Silver Multi-Busbars (MBB) per cell
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 0.9;
        const busbarCount = 9;
        for (let b = 1; b <= busbarCount; b++) {
          const bx = x + (b / (busbarCount + 1)) * cellW;
          ctx.beginPath();
          ctx.moveTo(bx, y + gap);
          ctx.lineTo(bx, y + cellH - gap);
          ctx.stroke();
        }
      }
    }

    // Outer white EVA encapsulation border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(pad, pad, sz - pad * 2, sz - pad * 2);
  }, 1024);

  // Front Tempered Glass Physical Layer with Anti-Reflective Coating
  const panelGeom = new THREE.BoxGeometry(3.05, 0.04, 4.85);
  const panelMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    map: pvTexture,
    roughness: 0.06,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    reflectivity: 0.9,
  });
  const panelMesh = new THREE.Mesh(panelGeom, panelMat);
  panelMesh.castShadow = true;
  group.add(panelMesh);

  // White Tedlar/PET Backsheet on rear
  const backsheetGeom = new THREE.PlaneGeometry(3.03, 4.83);
  const backsheetMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.7,
    side: THREE.BackSide,
  });
  const backsheet = new THREE.Mesh(backsheetGeom, backsheetMat);
  backsheet.rotation.x = Math.PI / 2;
  backsheet.position.y = -0.021;
  group.add(backsheet);

  return group;
}

function buildRealisticSolarJunctionBox(part, baseMaterial) {
  const group = new THREE.Group();

  // Weatherproof IP68 Polycarbonate Enclosure Box
  const boxGeom = new THREE.BoxGeometry(0.65, 0.16, 0.45);
  const boxMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.5,
    metalness: 0.2,
  });
  const box = new THREE.Mesh(boxGeom, boxMat);
  box.castShadow = true;
  group.add(box);

  // External Heat Dissipation Cooling Ribs
  const ribGeom = new THREE.BoxGeometry(0.55, 0.03, 0.02);
  const ribMat = getHardwareMat(0x0f172a, 0.4, 0.5);
  for (let r = -0.15; r <= 0.15; r += 0.06) {
    const rib = new THREE.Mesh(ribGeom, ribMat);
    rib.position.set(0, -0.09, r);
    group.add(rib);
  }

  // 3 Schottky Bypass Diodes inside housing
  const diodeGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.12, 12);
  const diodeMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.8 });
  [-0.14, 0.0, 0.14].forEach((dx) => {
    const diode = new THREE.Mesh(diodeGeom, diodeMat);
    diode.rotation.z = Math.PI / 2;
    diode.position.set(dx, 0.02, 0.0);
    group.add(diode);
  });

  // Weather-Tight Cable Gland Compression Nuts
  const glandGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.08, 16);
  const glandMat = getHardwareMat(0x334155, 0.3, 0.7);

  const leftGland = new THREE.Mesh(glandGeom, glandMat);
  leftGland.position.set(-0.16, 0.0, 0.25);
  leftGland.rotation.x = Math.PI / 2;
  group.add(leftGland);

  const rightGland = new THREE.Mesh(glandGeom, glandMat);
  rightGland.position.set(0.16, 0.0, 0.25);
  rightGland.rotation.x = Math.PI / 2;
  group.add(rightGland);

  // Positive DC Solar Cable (Red) and Negative DC Cable (Black)
  const cableGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.65, 12);
  const redCableMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.6 });
  const blackCableMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });

  const posCable = new THREE.Mesh(cableGeom, redCableMat);
  posCable.position.set(-0.16, -0.04, 0.58);
  posCable.rotation.x = 0.4;
  group.add(posCable);

  const negCable = new THREE.Mesh(cableGeom, blackCableMat);
  negCable.position.set(0.16, -0.04, 0.58);
  negCable.rotation.x = 0.4;
  group.add(negCable);

  // Authentic Male & Female MC4 Snap-Lock Solar Connectors
  const mc4Geom = new THREE.CylinderGeometry(0.04, 0.04, 0.22, 16);
  const mc4Mat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.4 });

  const posMC4 = new THREE.Mesh(mc4Geom, mc4Mat);
  posMC4.position.set(-0.16, -0.16, 0.86);
  posMC4.rotation.x = 0.4;
  group.add(posMC4);

  const negMC4 = new THREE.Mesh(mc4Geom, mc4Mat);
  negMC4.position.set(0.16, -0.16, 0.86);
  negMC4.rotation.x = 0.4;
  group.add(negMC4);

  // Polarity ring on positive connector
  const polRingGeom = new THREE.TorusGeometry(0.042, 0.008, 8, 16);
  const polRing = new THREE.Mesh(polRingGeom, redCableMat);
  polRing.position.set(-0.16, -0.16, 0.86);
  polRing.rotation.x = 0.4;
  group.add(polRing);

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
