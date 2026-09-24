const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// Preload objects.js so server has complete fallback descriptions for every object
let OBJECTS = {};
try {
  const fs = require('fs');
  const vm = require('vm');
  const code = fs.readFileSync(path.join(__dirname, '..', 'objects.js'), 'utf8');
  const sandbox = {};
  vm.runInNewContext(code + '; this.OBJECTS = OBJECTS;', sandbox);
  OBJECTS = sandbox.OBJECTS || {};
} catch (e) {
  console.warn('Could not preload objects.js in server:', e.message);
}

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key' });

// Comprehensive hardware catalog: in-scene components and external PC hardware objects
const HARDWARE_CATALOG = {
  // --- IN-SCENE 3D COMPONENTS ---
  case: {
    name: 'PC Chassis / Case',
    category: 'In 3D Model',
    isInScene: true,
    partId: 'case',
    subject: 'the computer chassis or PC case',
    desc: 'The structural enclosure that houses and protects all internal hardware, aligns motherboard mounting standoffs, and directs cooling airflow with intake and exhaust channels.',
  },
  motherboard: {
    name: 'Motherboard (Mainboard)',
    category: 'In 3D Model',
    isInScene: true,
    partId: 'motherboard',
    subject: 'the motherboard (mainboard) of a desktop computer',
    desc: 'The central printed circuit board (PCB) that physically connects and communicates between every hardware component, providing electrical pathways, sockets, bus controllers, and power regulation.',
  },
  cpu: {
    name: 'CPU (Processor)',
    category: 'In 3D Model',
    isInScene: true,
    partId: 'cpu',
    subject: 'the Central Processing Unit (CPU) of a computer',
    desc: 'The primary brain of the computer that fetches, decodes, and executes software instructions at billions of cycles per second, controlling computations and system flow.',
  },
  cooler: {
    name: 'CPU Tower Cooler',
    category: 'In 3D Model',
    isInScene: true,
    partId: 'cooler',
    subject: 'the CPU tower heatsink and cooling fan',
    desc: 'Draws intense heat away from the processor heatspreader through copper heatpipes into aluminum fin stacks, where forced fan airflow dissipates the thermal energy safely.',
  },
  ram1: {
    name: 'RAM Stick (Channel A)',
    category: 'In 3D Model',
    isInScene: true,
    partId: 'ram1',
    subject: 'a high-speed RAM (random access memory) module',
    desc: 'Ultra-fast volatile system memory that holds active operating system tasks and running programs for instant CPU access. Clears completely when powered off.',
  },
  ram2: {
    name: 'RAM Stick (Channel B)',
    category: 'In 3D Model',
    isInScene: true,
    partId: 'ram2',
    subject: 'a secondary dual-channel RAM module',
    desc: 'A matching memory stick operating in dual-channel mode, doubling memory bus bandwidth to 128-bit and drastically smoothing multitasking and gaming performance.',
  },
  gpu: {
    name: 'GPU (Graphics Card)',
    category: 'In 3D Model',
    isInScene: true,
    partId: 'gpu',
    subject: 'the dedicated GPU (graphics processing unit)',
    desc: 'A massively parallel computing powerhouse equipped with thousands of specialized cores (VRAM, shader units, tensor cores) engineered to render 3D graphics, video, and AI computations.',
  },
  psu: {
    name: 'Power Supply Unit (PSU)',
    category: 'In 3D Model',
    isInScene: true,
    partId: 'psu',
    subject: 'the Power Supply Unit (PSU) of a desktop PC',
    desc: 'Converts high-voltage alternating current (AC) from the wall socket into regulated, low-voltage direct current (+12V, +5V, +3.3V) to safely power delicate electronic silicon.',
  },
  disk: {
    name: 'M.2 NVMe SSD (Storage)',
    category: 'In 3D Model',
    isInScene: true,
    partId: 'disk',
    subject: 'an M.2 NVMe solid-state storage drive',
    desc: 'Non-volatile flash memory that communicates directly over high-speed PCIe lanes, delivering multi-gigabyte-per-second read/write speeds for instantaneous boot and loading times.',
  },
  fans: {
    name: 'Chassis Cooling Fans',
    category: 'In 3D Model',
    isInScene: true,
    partId: 'fans',
    subject: 'desktop computer case intake and exhaust fans',
    desc: 'Maintains positive or neutral air pressure inside the chassis by pulling cool ambient air through front dust filters and exhausting hot component exhaust out the rear and top.',
  },

  // --- HARDWARE CONCEPTS & EXTERNAL OBJECTS ---
  thermal_paste: {
    name: 'Thermal Paste (TIM)',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'thermal paste compound between CPU and cooler',
    desc: 'A thermally conductive compound applied between the CPU heatspreader and cooler base. It fills microscopic air gaps and imperfections on metal surfaces to maximize thermal heat transfer.',
  },
  liquid_cooling: {
    name: 'Liquid / AIO Cooler',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'an All-In-One (AIO) liquid cooling system for PCs',
    desc: 'Uses a closed loop of liquid coolant circulated by an electric pump from a CPU water block to an aluminum radiator with fans, providing higher thermal headroom and lower acoustic noise.',
  },
  vrm: {
    name: 'VRM (Voltage Regulator Module)',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'the Voltage Regulator Module (VRM) on a motherboard',
    desc: 'A cluster of MOSFETs, chokes, and capacitors on the motherboard that steps down 12V power from the PSU into clean, precise sub-1.4V current demanded by sensitive modern processors.',
  },
  cmos_battery: {
    name: 'CMOS Battery (CR2032)',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'the CR2032 CMOS battery on a motherboard',
    desc: 'A small coin-cell battery on the motherboard that continuously powers the Real-Time Clock (RTC) and CMOS memory, preserving system date, time, and BIOS setup configuration while unplugged.',
  },
  pcie_slot: {
    name: 'PCI Express (PCIe) Expansion Slot',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'a PCI Express (PCIe) expansion bus slot',
    desc: 'A high-speed serial point-to-point interface slot on the motherboard used to attach high-bandwidth expansion cards like GPUs, capture cards, sound cards, and fast network adapters.',
  },
  sata: {
    name: 'SATA Interface & Cables',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'the SATA storage interface and data cable',
    desc: 'A widely used legacy storage bus protocol capable of up to 600 MB/s (SATA III) used to link traditional 2.5-inch SSDs, 3.5-inch mechanical hard drives, and optical drives to the motherboard.',
  },
  sound_card: {
    name: 'Dedicated Sound Card / DAC',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'a dedicated PC sound card or audio DAC',
    desc: 'Converts digital audio bitstreams into pristine analog signals with high signal-to-noise ratios, dedicated headphone amplifiers, and EMI shielding to eliminate interior electronic interference.',
  },
  nic: {
    name: 'Network Interface Card (NIC / Wi-Fi)',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'a network interface card or Wi-Fi 6E/7 adapter',
    desc: 'The communication hardware that translates internal data packets into radio frequencies (Wi-Fi) or electrical signals over Ethernet (RJ-45) to connect the computer to local networks and the Internet.',
  },
  bios: {
    name: 'BIOS / UEFI Firmware',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'the BIOS / UEFI firmware in a computer',
    desc: 'The very first low-level code executed when power turns on. It conducts the Power-On Self Test (POST), initializes fundamental motherboard hardware, and hands over boot execution to the OS.',
  },
  chipset: {
    name: 'Motherboard Chipset',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'the motherboard chipset silicon hub',
    desc: 'Silicon controller on the motherboard that manages slower supplementary data lanes, SATA ports, USB hubs, audio controllers, and onboard peripherals without burdening the CPU with routing.',
  },
  displayport: {
    name: 'DisplayPort & HDMI Video Outputs',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'DisplayPort and HDMI video interfaces',
    desc: 'Digital display interfaces on the GPU that transmit uncompressed high-refresh video pixels and multi-channel audio directly to computer monitors and VR headsets with adaptive sync.',
  },
  radiator: {
    name: 'Liquid Cooling Radiator',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'a liquid cooling radiator in a computer',
    desc: 'A finned heat exchanger composed of dozens of micro-channels. Hot coolant flows through the internal tubes while attached fans blast cool air through the fins to drop coolant temperatures.',
  },
  ups: {
    name: 'UPS (Uninterruptible Power Supply)',
    category: 'Hardware Concept',
    isInScene: false,
    subject: 'an Uninterruptible Power Supply (UPS) backup battery',
    desc: 'An external battery backup unit positioned between the wall outlet and PC. It provides instant emergency battery power during blackouts and protects sensitive electronics against destructive power surges.',
  },
};

// Quick search index helper
function findCatalogMatch(query) {
  if (!query) return null;
  const q = query.trim().toLowerCase();

  // Exact ID match
  if (HARDWARE_CATALOG[q]) return HARDWARE_CATALOG[q];

  // Alias maps
  const ALIASES = {
    processor: 'cpu',
    centralprocessingunit: 'cpu',
    graphics: 'gpu',
    graphicscard: 'gpu',
    videocard: 'gpu',
    vga: 'gpu',
    rtx: 'gpu',
    gtx: 'gpu',
    memory: 'ram1',
    ram: 'ram1',
    dimm: 'ram1',
    powersupply: 'psu',
    power: 'psu',
    smps: 'psu',
    mobo: 'motherboard',
    mainboard: 'motherboard',
    pcb: 'motherboard',
    chassis: 'case',
    tower: 'case',
    cabinet: 'case',
    ssd: 'disk',
    nvme: 'disk',
    m2: 'disk',
    storage: 'disk',
    harddrive: 'disk',
    hdd: 'disk',
    fan: 'fans',
    coolingfan: 'fans',
    radiator: 'radiator',
    aio: 'liquid_cooling',
    watercooling: 'liquid_cooling',
    paste: 'thermal_paste',
    thermalcompound: 'thermal_paste',
    cmos: 'cmos_battery',
    battery: 'cmos_battery',
    cr2032: 'cmos_battery',
    uefi: 'bios',
    hdmi: 'displayport',
    dp: 'displayport',
    wifi: 'nic',
    ethernet: 'nic',
  };

  const cleanKey = q.replace(/[\s\-_]/g, '');
  if (ALIASES[cleanKey] && HARDWARE_CATALOG[ALIASES[cleanKey]]) {
    return HARDWARE_CATALOG[ALIASES[cleanKey]];
  }

  // Partial match in catalog
  for (const [key, item] of Object.entries(HARDWARE_CATALOG)) {
    if (
      key.includes(cleanKey) ||
      item.name.toLowerCase().includes(q) ||
      item.subject.toLowerCase().includes(q)
    ) {
      return item;
    }
  }

  return null;
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasKey: !!process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY.startsWith('sk-ant-'),
  });
});

// Endpoint to list all hardware components for search autocomplete
app.get('/api/components', (req, res) => {
  const items = Object.entries(HARDWARE_CATALOG).map(([id, item]) => ({
    id,
    name: item.name,
    category: item.category,
    isInScene: item.isInScene,
    partId: item.partId || null,
  }));
  res.json({ items });
});

// Explain endpoint: accepts either { partId } or { query }, and optional { level: 'simple' | 'technical' }
app.post('/api/explain', async (req, res) => {
  const { partId, query, objectLabel, partName, level } = req.body;
  const searchTerm = (partName || partId || query || '').trim();
  const depthLevel = (level && level.toLowerCase() === 'technical') ? 'technical' : 'simple';

  if (!searchTerm) {
    return res.status(400).json({ error: 'partId, partName, or query is required' });
  }

  const catalogEntry = findCatalogMatch(searchTerm);
  const contextSubject = objectLabel ? `the ${searchTerm} of a ${objectLabel}` : (catalogEntry ? catalogEntry.subject : `the ${searchTerm} component or object`);

  // Look up in preloaded objects.js registry
  let registryDesc = null;
  if (objectLabel) {
    const objKey = Object.keys(OBJECTS).find(k => OBJECTS[k].label.toLowerCase() === objectLabel.toLowerCase() || k.toLowerCase() === objectLabel.toLowerCase());
    if (objKey && OBJECTS[objKey]) {
      const pMatch = OBJECTS[objKey].parts.find(p => p.id === partId || p.name.toLowerCase() === searchTerm.toLowerCase());
      if (pMatch && pMatch.description) registryDesc = pMatch.description;
    }
  }
  if (!registryDesc && partId) {
    for (const obj of Object.values(OBJECTS)) {
      const pMatch = obj.parts.find(p => p.id === partId);
      if (pMatch && pMatch.description) {
        registryDesc = pMatch.description;
        break;
      }
    }
  }

  const baseDesc = registryDesc || (catalogEntry
    ? catalogEntry.desc
    : (objectLabel 
        ? `The ${searchTerm} is an essential component of a ${objectLabel} that serves a critical structural, electrical, or functional role in its operation.`
        : `${searchTerm} is a hardware component or subsystem used within engineering and computer architectures.`));

  // Distinct fallback description when Anthropic API key is not present
  const defaultDesc = depthLevel === 'technical'
    ? `Technical Specification [${searchTerm}]: Functions as an integral subsystem of ${objectLabel || 'the assembly'}. ${baseDesc} Engineered to maintain dimensional stability, thermal dissipation, and signal integrity under dynamic operating loads.`
    : baseDesc;

  const name = partName || (catalogEntry ? catalogEntry.name : searchTerm);
  const isInScene = catalogEntry ? catalogEntry.isInScene : true;
  const targetPartId = catalogEntry ? catalogEntry.partId : partId;
  const category = objectLabel || (catalogEntry ? catalogEntry.category : 'Hardware Component');

  // If no API key configured or invalid, return catalog fallback immediately
  if (!process.env.ANTHROPIC_API_KEY || !process.env.ANTHROPIC_API_KEY.startsWith('sk-ant-')) {
    return res.json({
      name,
      description: defaultDesc,
      source: 'fallback',
      isInScene,
      partId: targetPartId,
      category,
      level: depthLevel,
      warning: 'No valid ANTHROPIC_API_KEY configured in server/.env',
    });
  }

  try {
    const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022';
    const promptContent = depthLevel === 'technical'
      ? `In 2-3 concise, information-dense sentences using appropriate technical and engineering terminology, explain what ${contextSubject} is, its physical/electronic operating principles, and its role in the system. Aimed at someone with engineering background. Plain text only, no markdown.`
      : `In 2 clear, educational sentences, explain what ${contextSubject} is, what it does, and how it works. Keep it simple and fascinating for beginners. Plain text only, no markdown.`;

    const message = await anthropic.messages.create({
      model,
      max_tokens: depthLevel === 'technical' ? 180 : 140,
      messages: [
        {
          role: 'user',
          content: promptContent,
        },
      ],
    });

    const textBlock = message.content.find((block) => block.type === 'text');
    res.json({
      name,
      description: textBlock ? textBlock.text.trim() : defaultDesc,
      source: 'ai',
      isInScene,
      partId: targetPartId,
      category,
      level: depthLevel,
      model,
    });
    } catch (err) {
      console.warn('Anthropic API explain error (trying secondary AI engine):', err.message);
      try {
        const freePrompt = depthLevel === 'technical'
          ? `In 2-3 concise, information-dense sentences using appropriate technical and engineering terminology, explain what ${contextSubject} is, its physical/electronic operating principles, and its role in the system. Aimed at someone with engineering background. Plain text only, no markdown.`
          : `In 2 clear, educational sentences, explain what ${contextSubject} is, what it does, and how it works. Keep it simple and fascinating for beginners. Plain text only, no markdown.`;
        const aiExplain = await callFreeAI([{ role: 'user', content: freePrompt }], 'openai', 6000);
        if (aiExplain && aiExplain.length > 10) {
          return res.json({
            name,
            description: aiExplain,
            source: 'ai-engine',
            isInScene,
            partId: targetPartId,
            category,
            level: depthLevel,
          });
        }
      } catch (e2) {
        // Fall through to defaultDesc
      }

      res.json({
        name,
        description: defaultDesc,
        source: 'fallback',
        isInScene,
        partId: targetPartId,
        category,
        level: depthLevel,
        warning: err.message,
      });
    }
});

// HTTPS helper for free AI inference fallback
const https = require('https');

function callFreeAI(messages, model = 'openai', timeoutMs = 7000) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({ messages, model });
    const req = https.request(
      'https://text.pollinations.ai/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          'User-Agent': '3D-Visualizer-Precision/2.0',
        },
        timeout: timeoutMs,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300 && body.trim().length > 0) {
            resolve(body.trim());
          } else {
            reject(new Error(`AI HTTP ${res.statusCode}: ${body.slice(0, 80)}`));
          }
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('AI request timeout'));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// Comprehensive scientific & domain engineering knowledge engine
function generateSmartComponentAnswer(query, objectLabel, selectedPart, activeParts, objectId) {
  const q = query.toLowerCase().trim();

  // 1. Quantum & Subatomic Physics (Atom, Electron, Proton, Neutron, Nucleus)
  if (
    q.includes('proton') ||
    q.includes('electron') ||
    q.includes('neutron') ||
    q.includes('quark') ||
    objectId === 'atom' ||
    q.includes('subatomic') ||
    q.includes('nucleus')
  ) {
    if (q.includes('mass') || q.includes('weight') || q.includes('heavy') || q.includes('weigh')) {
      if (q.includes('proton') && q.includes('electron')) {
        return (
          `• **Proton Mass**: 1.67262 × 10⁻²⁷ kg (approx. 1.007276 amu or 938.272 MeV/c²).\n` +
          `• **Electron Mass**: 9.10938 × 10⁻³¹ kg (approx. 5.48580 × 10⁻⁴ amu or 0.51099 MeV/c²).\n\n` +
          `**Mass Ratio**: A proton is approximately **1,836 times more massive** than an electron. Over 99.95% of an atom's mass is concentrated in the dense nucleus, while electrons occupy the vast quantum probability cloud around it.`
        );
      }
      if (q.includes('proton')) {
        return `The mass of a **proton** is approximately **1.67262 × 10⁻²⁷ kg** (or 1.007276 amu / 938.272 MeV/c²). It is a composite hadron made of three valence quarks (two up, one down) bound by gluons via the strong nuclear force.`;
      }
      if (q.includes('electron')) {
        return `The mass of an **electron** is approximately **9.10938 × 10⁻³¹ kg** (or 5.48580 × 10⁻⁴ amu / 0.511 MeV/c²). It is an elementary lepton with spin-1/2, roughly 1,836 times lighter than a proton.`;
      }
      if (q.includes('neutron')) {
        return `The mass of a **neutron** is approximately **1.67493 × 10⁻²⁷ kg** (or 1.008665 amu / 939.565 MeV/c²), slightly heavier than a proton by approximately 0.14%.`;
      }
    }

    if (q.includes('charge')) {
      return (
        `• **Proton**: +1e = +1.602176634 × 10⁻¹⁹ Coulombs.\n` +
        `• **Electron**: -1e = -1.602176634 × 10⁻¹⁹ Coulombs.\n` +
        `• **Neutron**: 0 Coulombs (electrically neutral).\n\n` +
        `Because the charges of a proton and electron have identical magnitude but opposite signs, neutral atoms maintain zero net charge.`
      );
    }

    if (
      q.includes('strong force') ||
      q.includes('hold') ||
      q.includes('binding') ||
      q.includes('repulsion')
    ) {
      return `The atomic nucleus is held together by the **Strong Nuclear Force** (residual color force mediated by pions between nucleons). At distances around 10⁻¹⁵ meters, it is roughly 137 times stronger than electromagnetism, easily overcoming the mutual electrostatic repulsion between positively charged protons.`;
    }

    if (q.includes('orbital') || q.includes('shell') || q.includes('spin') || q.includes('quantum')) {
      return `Electrons do not orbit like classical planets; instead, they exist in three-dimensional **quantum probability distributions** (orbitals s, p, d, f) defined by solutions to the Schrödinger wave equation. Each quantum state is defined by four quantum numbers: principal (n), azimuthal (l), magnetic (mₗ), and spin (s = ±1/2), governed by the Pauli Exclusion Principle.`;
    }
  }

  // 2. Solar System & Planetary Science
  if (
    objectId === 'solar-system' ||
    q.includes('planet') ||
    q.includes('sun') ||
    q.includes('orbit') ||
    q.includes('jupiter') ||
    q.includes('mars') ||
    q.includes('earth') ||
    q.includes('saturn')
  ) {
    if (q.includes('mass') || q.includes('heavy') || q.includes('size') || q.includes('large')) {
      return `The **Sun** contains **99.86% of all mass in the Solar System** (1.989 × 10³⁰ kg). Among the planets, **Jupiter** is by far the most massive (1.898 × 10²⁷ kg, over 317 times Earth's mass and 2.5 times all other planets combined), followed by Saturn, Neptune, Uranus, Earth (5.972 × 10²⁴ kg), Venus, Mars, and Mercury.`;
    }
    if (q.includes('distance') || q.includes('far') || q.includes('order')) {
      return `The planets in order of distance from the Sun are: **Mercury** (0.39 AU), **Venus** (0.72 AU), **Earth** (1.00 AU / ~150M km), **Mars** (1.52 AU), **Jupiter** (5.20 AU), **Saturn** (9.58 AU), **Uranus** (19.2 AU), and **Neptune** (30.1 AU). 1 Astronomical Unit (AU) is the mean Earth-Sun distance.`;
    }
    if (q.includes('speed') || q.includes('fast') || q.includes('period') || q.includes('year')) {
      return `Per **Kepler's Third Law**, orbital speed decreases with distance from the Sun. Mercury orbits fastest at ≈ 47.4 km/s (88-day year), Earth orbits at ≈ 29.8 km/s (365.25 days), and Neptune orbits at ≈ 5.4 km/s (165-year period).`;
    }
  }

  // 3. Automotive, Combustion & Engine Mechanics (Car, V8 Engine)
  if (
    objectId === 'car' ||
    q.includes('v8') ||
    q.includes('engine') ||
    q.includes('piston') ||
    q.includes('crankshaft') ||
    q.includes('horsepower') ||
    q.includes('torque')
  ) {
    if (
      q.includes('horsepower') ||
      q.includes('torque') ||
      q.includes('power') ||
      q.includes('rpm')
    ) {
      return `**Horsepower & Torque Relationship**: Power is calculated as HP = (Torque in lb-ft × RPM) / 5252. A performance V8 typically produces **400 to 650+ HP** at 6,000–7,500 RPM, delivering immediate low-end torque through sequential 90° firing intervals across two cylinder banks.`;
    }
    if (q.includes('crankshaft') || q.includes('convert') || q.includes('rotary')) {
      return `The **forged steel crankshaft** converts the linear reciprocating kinetic motion of pistons into rotational torque through offset crankpins and counterweights. Crossplane crankshafts fire every 90° for smooth harmonics and characteristic rumble, while flatplane crankshafts fire every 180° for higher peak RPM and reduced rotational inertia.`;
    }
    if (q.includes('compression') || q.includes('fuel') || q.includes('combustion')) {
      return `The four strokes of an internal combustion engine are **Intake, Compression, Power, and Exhaust** (Otto Cycle). Modern high-compression engines run at 10.5:1 to 12.5:1 compression ratios, atomizing gasoline with direct fuel injectors at 200+ bar pressure for complete stoichiometric combustion (14.7:1 air-to-fuel ratio).`;
    }
  }

  // 4. Computing, Silicon & Hardware Architecture (Computer, Laptop, Phone, TV)
  if (
    objectId === 'computer' ||
    objectId === 'laptop' ||
    objectId === 'mobile-phone' ||
    objectId === 'tv' ||
    q.includes('cpu') ||
    q.includes('gpu') ||
    q.includes('ram') ||
    q.includes('transistor') ||
    q.includes('silicon')
  ) {
    if (q.includes('difference between cpu and gpu') || (q.includes('cpu') && q.includes('gpu'))) {
      return (
        `• **CPU (Central Processing Unit)**: Optimized for ultra-low latency, serial instruction execution, complex branch prediction, and OS management with high clock frequencies (3.5–5.5 GHz) across 8–24 powerful cores.\n` +
        `• **GPU (Graphics Processing Unit)**: Optimized for massive SIMD (Single Instruction, Multiple Data) parallelism with thousands of smaller stream processor cores executing matrix arithmetic, 3D polygon rasterization, and tensor computations simultaneously.`
      );
    }
    if (
      q.includes('ram') ||
      q.includes('memory') ||
      q.includes('volatile') ||
      q.includes('bandwidth')
    ) {
      return `**DDR5 RAM** provides ultra-fast volatile workspace memory with clock transfer rates exceeding **4,800 to 7,200 MT/s**, delivering over 60–90 GB/s bandwidth per channel. It stores active kernel pages and application data with nanosecond latency, but loses all stored state when powered off.`;
    }
    if (q.includes('oled') || q.includes('screen') || q.includes('display') || q.includes('hz')) {
      return `**OLED (Organic Light Emitting Diode)** panels feature self-emissive organic subpixels capable of turning off individually to deliver infinite static contrast ratio and true 0-nit black levels. High-refresh panels (120Hz–240Hz) update every 4.1 to 8.3 milliseconds for fluid motion clarity.`;
    }
  }

  // 5. Thermal Management & Thermodynamics (AC, Refrigerator, Cooling)
  if (
    objectId === 'air-conditioner' ||
    objectId === 'refrigerator' ||
    q.includes('refrigeran') ||
    q.includes('cooling') ||
    q.includes('compressor') ||
    q.includes('condenser')
  ) {
    return (
      `The system operates on the **Vapor-Compression Refrigeration Cycle**:\n` +
      `1. **Compressor**: Pressurizes low-pressure vapor refrigerant into a superheated high-pressure gas.\n` +
      `2. **Condenser**: Rejects heat to external ambient air, condensing vapor into high-pressure liquid.\n` +
      `3. **Expansion Valve**: Causes rapid depressurization, chilling the refrigerant via Joule-Thomson expansion.\n` +
      `4. **Evaporator**: Chilled refrigerant absorbs heat from internal spaces, evaporating back to vapor.`
    );
  }

  // 6. Check if user is asking about a specific part (either selectedPart or a part mentioned by name in query)
  let targetPart = null;
  if (activeParts && activeParts.length > 0) {
    targetPart = activeParts.find((p) => {
      const name = (p.name || '').toLowerCase();
      const id = (p.id || '').toLowerCase();
      return q.includes(name) || (id.length > 2 && q.includes(id));
    });
  }
  if (!targetPart && selectedPart) {
    targetPart = selectedPart;
  }

  if (targetPart) {
    const pName = targetPart.name || targetPart.id;
    const pDesc = targetPart.description || targetPart.explanation || '';

    if (
      q.includes('what is') ||
      q.includes('what does') ||
      q.includes('purpose') ||
      q.includes('role') ||
      q.includes('do') ||
      q.includes('work') ||
      q.includes('function') ||
      q.includes('doubt') ||
      q.includes('tell me about')
    ) {
      return (
        `**${pName}** is an essential subsystem of the ${objectLabel || 'assembly'}.\n\n` +
        `• **Primary Function**: ${pDesc || 'Fulfills essential structural, kinematic, or electrical operations.'}\n` +
        `• **System Role**: Maintains mechanical tolerances, transfers energy, and synchronizes with neighboring components during operation.`
      );
    }

    if (
      q.includes('material') ||
      q.includes('made of') ||
      q.includes('finish') ||
      q.includes('metal')
    ) {
      return `**${pName}** is typically manufactured from high-grade engineering materials (such as aerospace aluminum alloy, heat-treated carbon steel, copper thermal interfaces, or reinforced polymers) calibrated for optimal strength-to-weight ratio, structural fatigue resistance, and thermal conductivity.`;
    }

    if (
      q.includes('why') ||
      q.includes('necessary') ||
      q.includes('need') ||
      q.includes('important')
    ) {
      return `Without **${pName}**, the ${objectLabel || 'assembly'} cannot function reliably. ${
        pDesc ? pDesc + ' ' : ''
      }It is purpose-engineered to absorb operational stresses, isolate vibrations, and ensure precise physical or electronic alignment.`;
    }

    if (
      q.includes('fail') ||
      q.includes('break') ||
      q.includes('wear') ||
      q.includes('heat') ||
      q.includes('damage')
    ) {
      return `Primary wear modes for **${pName}** involve cyclical fatigue, thermal expansion stresses, and friction wear. Engineering preventive measures include proper surface passivation, lubrication, dynamic balancing, and operation within nominal thermal envelopes.`;
    }
  }

  // 7. General assembly inquiry
  if (
    q.includes('how does it work') ||
    q.includes('how does this work') ||
    q.includes('overall') ||
    q.includes('whole') ||
    q.includes('explain this') ||
    q.includes('overview')
  ) {
    const partsList =
      activeParts && activeParts.length > 0
        ? activeParts.map((p) => p.name).slice(0, 5).join(', ')
        : 'its core subsystems';
    return (
      `The **${objectLabel || 'assembly'}** operates through the precise integration of its components, including ${partsList}.\n\n` +
      `Each subsystem fulfills distinct structural, thermodynamic, kinematic, or electronic roles. You can click any individual component in the 3D viewport to inspect its specific technical dimensions, materials, and functional summary.`
    );
  }

  // 8. Disassembly / Explode / Visualizer controls
  if (
    q.includes('explode') ||
    q.includes('disassemble') ||
    q.includes('separate') ||
    q.includes('inside') ||
    q.includes('view') ||
    q.includes('inspect') ||
    q.includes('control')
  ) {
    return (
      `**Visualizer Controls & Exploration Tools**:\n` +
      `• **Explode Assembly**: Click "Explode" or drag the explosion slider in the bottom toolbar to separate components along their kinematic assembly vectors.\n` +
      `• **Inspection**: Hover or click any part to highlight it and view physical dimensions, finishes, and functional explanations.\n` +
      `• **X-Ray Mode ('X')**: Transparent isolation of internal components.\n` +
      `• **3D Calipers ('C')**: Live dimension bounding boxes and millimeter rulers.\n` +
      `• **Orbit Controls**: Left-click to orbit, right-click to pan, scroll to zoom.`
    );
  }

  // 9. Comprehensive fallback response for any component doubt
  const targetLabel = selectedPart ? selectedPart.name : objectLabel || 'this model';
  return (
    `Regarding your question about **${targetLabel}** in the ${objectLabel || 'assembly'}:\n\n` +
    `Components in this assembly are engineered around strict mechanical tolerances, thermal dissipation channels, and physical interconnects. You can ask specific questions about:\n` +
    `• Physical constants, masses, charges, or dimensions\n` +
    `• Material selection (alloys, polymers, semiconductors)\n` +
    `• Operating principles, horsepower, or torque\n` +
    `• Assembly relationships and failure modes`
  );
}

// Mini Chatbox API endpoint with 3-tier fallback architecture
app.post('/api/chat', async (req, res) => {
  const { message, history = [], context = {} } = req.body;
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const query = message.trim();
  const { objectId, objectLabel, selectedPart, activeParts = [] } = context;
  const currentObjectInfo =
    objectLabel || (objectId && OBJECTS[objectId] ? OBJECTS[objectId].label : '3D Mechanical Assembly');

  let contextDetails = `The user is interacting with an interactive 3D visualizer. Current model: "${currentObjectInfo}".`;
  if (selectedPart && selectedPart.name) {
    contextDetails += ` Currently inspected component: "${selectedPart.name}" (ID: ${selectedPart.id}). Description: "${selectedPart.description || ''}".`;
  }
  if (activeParts && activeParts.length > 0) {
    contextDetails += ` Available components in this 3D assembly: ${activeParts
      .map((p) => p.name || p.id)
      .join(', ')}.`;
  }

  const systemPrompt = `You are a world-class scientific, engineering, and hardware specialist assistant for an interactive 3D visualizer application.
${contextDetails}

The user may ask ANY question regarding components, objects, subatomic physics, mechanical engineering, materials, formulas, masses, charges, dimensions, operating principles, or comparisons.
Rules:
1. Provide accurate, professional, educational answers with quantitative values where relevant.
2. If asked about scientific constants (e.g. mass of proton, mass of electron, charge, speeds), provide the exact standard scientific values.
3. Structure answers cleanly using markdown bullet points or short paragraphs.
4. Keep the tone professional, objective, and helpful. Directly answer the user's inquiry.`;

  // Tier 1: Try configured Anthropic API Key
  if (process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'dummy_key') {
    try {
      const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022';
      const formattedMessages = [];
      if (Array.isArray(history)) {
        const cleanHistory = history
          .slice(-6)
          .filter(
            (m) =>
              m &&
              (m.role === 'user' || m.role === 'assistant') &&
              typeof m.content === 'string'
          );
        for (const h of cleanHistory) {
          formattedMessages.push({ role: h.role, content: h.content });
        }
      }
      formattedMessages.push({ role: 'user', content: query });

      const response = await anthropic.messages.create({
        model,
        max_tokens: 500,
        system: systemPrompt,
        messages: formattedMessages,
      });

      const textBlock = response.content.find((block) => block.type === 'text');
      if (textBlock && textBlock.text) {
        return res.json({
          reply: textBlock.text.trim(),
          source: 'claude-ai',
          model,
        });
      }
    } catch (err) {
      console.warn('Anthropic API chat exception (trying secondary AI engine):', err.message);
    }
  }

  // Tier 2: Free AI inference pipeline
  try {
    const aiMessages = [{ role: 'system', content: systemPrompt }];
    if (Array.isArray(history)) {
      history.slice(-4).forEach((h) => {
        if (h && (h.role === 'user' || h.role === 'assistant') && typeof h.content === 'string') {
          aiMessages.push({ role: h.role, content: h.content });
        }
      });
    }
    aiMessages.push({ role: 'user', content: query });

    const aiReply = await callFreeAI(aiMessages, 'openai', 7000);
    if (aiReply && aiReply.length > 5) {
      return res.json({
        reply: aiReply,
        source: 'ai-engine',
      });
    }
  } catch (err) {
    console.warn('Free AI inference exception (using scientific knowledge engine):', err.message);
  }

  // Tier 3: Comprehensive scientific & engineering domain intelligence engine
  const reply = generateSmartComponentAnswer(
    query,
    currentObjectInfo,
    selectedPart,
    activeParts,
    objectId
  );
  return res.json({
    reply,
    source: 'domain-engine',
  });
});

app.get('/api/chat/status', (req, res) => {
  res.json({
    configured: Boolean(
      process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'dummy_key'
    ),
  });
});

const PORT = parseInt(process.env.PORT, 10) || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Anthropic API key loaded: ${process.env.ANTHROPIC_API_KEY ? 'Yes (configured)' : 'No (missing)'}`);
});

// Also bind to port 3000 if not already in use for maximum convenience
if (PORT !== 3000) {
  const serverAlt = app.listen(3000, () => {
    console.log(`Also listening on http://localhost:3000`);
  });
  serverAlt.on('error', (err) => {
    // Port 3000 in use by something else, ignore gracefully
  });
}
