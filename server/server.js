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

// Explain endpoint: accepts either { partId } or { query }
app.post('/api/explain', async (req, res) => {
  const { partId, query, objectLabel, partName } = req.body;
  const searchTerm = (partName || partId || query || '').trim();

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

  const defaultDesc = registryDesc || (catalogEntry
    ? catalogEntry.desc
    : (objectLabel 
        ? `The ${searchTerm} is an essential component of a ${objectLabel} that serves a critical structural, electrical, or functional role in its operation.`
        : `${searchTerm} is a hardware component or subsystem used within engineering and computer architectures.`));
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
      warning: 'No valid ANTHROPIC_API_KEY configured in server/.env',
    });
  }

  try {
    const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022';
    const message = await anthropic.messages.create({
      model,
      max_tokens: 140,
      messages: [
        {
          role: 'user',
          content: `In 2 clear, educational sentences, explain what ${contextSubject} is, what it does, and how it works. Keep it simple and fascinating for beginners. Plain text only, no markdown.`,
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
      model,
    });
  } catch (err) {
    console.error('Anthropic API error:', err.message);
    res.json({
      name,
      description: defaultDesc,
      source: 'fallback',
      isInScene,
      partId: targetPartId,
      category,
      warning: err.message,
    });
  }
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
