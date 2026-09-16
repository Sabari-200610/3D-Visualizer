// Each object has: a label, a viewRadius (camera distance), an
// explodeDistance, and a list of parts (id, name, color, geometry,
// position, description, and optionally rotation/transparent/opacity).
//
// Component descriptions are bundled locally for instant, offline-first
// rendering, and can also be enhanced dynamically by Claude AI via the backend.

const OBJECTS = {
  computer: {
    label: 'Computer',
    viewRadius: 6.5,
    explodeDistance: 1.4,
    parts: [
      {
        id: 'case',
        name: 'Case',
        color: 0x2b323f,
        geometry: { type: 'box', args: [2.2, 2.6, 2.2] },
        position: [0, 0.2, 0],
        transparent: true,
        opacity: 0.18,
        description: 'The structural chassis that securely houses and protects all internal hardware while directing intake and exhaust cooling airflow.'
      },
      {
        id: 'motherboard',
        name: 'Motherboard',
        color: 0x1f6f4a,
        geometry: { type: 'box', args: [1.9, 0.05, 1.9] },
        position: [0, -0.75, 0],
        description: 'The primary printed circuit board that connects the CPU, memory, expansion cards, and storage through high-speed communication buses.'
      },
      {
        id: 'cpu',
        name: 'CPU (Processor)',
        color: 0x38bdf8,
        geometry: { type: 'box', args: [0.5, 0.14, 0.5] },
        position: [-0.4, -0.6, 0.4],
        description: 'The Central Processing Unit executes program instructions, performs mathematical and logical computations, and orchestrates system tasks.'
      },
      {
        id: 'ram1',
        name: 'RAM Stick (Channel A)',
        color: 0xf5a623,
        geometry: { type: 'box', args: [0.12, 0.6, 0.32] },
        position: [0.35, -0.4, 0.5],
        description: 'High-speed volatile system memory that stores active programs and operating system data for instantaneous nanosecond CPU access.'
      },
      {
        id: 'ram2',
        name: 'RAM Stick (Channel B)',
        color: 0xf5a623,
        geometry: { type: 'box', args: [0.12, 0.6, 0.32] },
        position: [0.55, -0.4, 0.5],
        description: 'Secondary memory module operating in dual-channel mode, doubling memory bandwidth to 128-bit for smooth multitasking and heavy workloads.'
      },
      {
        id: 'gpu',
        name: 'GPU (Graphics Card)',
        color: 0x4ade80,
        geometry: { type: 'box', args: [1.7, 0.22, 0.65] },
        position: [0, -0.9, 0.65],
        description: 'Dedicated visual processor equipped with thousands of parallel compute cores engineered to render 3D graphics, video streams, and AI models.'
      },
      {
        id: 'psu',
        name: 'Power Supply (PSU)',
        color: 0x94a3b8,
        geometry: { type: 'box', args: [1.0, 0.85, 0.95] },
        position: [0, 0.9, -0.55],
        description: 'Converts high-voltage alternating current (AC) from the wall socket into regulated low-voltage direct current (+12V, +5V, +3.3V) for components.'
      },
      {
        id: 'disk',
        name: 'Storage Drive (SSD)',
        color: 0xe2e8f0,
        geometry: { type: 'box', args: [0.9, 0.14, 0.9] },
        position: [0, -1.05, -0.5],
        description: 'Non-volatile solid-state storage drive that permanently retains the operating system, user files, and application data without power.'
      },
      {
        id: 'fan',
        name: 'Cooling Fan',
        color: 0x1c2431,
        geometry: { type: 'cylinder', args: [0.42, 0.42, 0.1, 20] },
        position: [0, 0.2, -1.15],
        rotation: [Math.PI / 2, 0, 0],
        description: 'Forces high-velocity air across thermal heatsinks and exhausts warm air out of the case to maintain safe silicon temperatures.'
      },
    ],
  },

  atom: {
    label: 'Atom (simplified model)',
    viewRadius: 4.5,
    explodeDistance: 1.1,
    parts: [
      {
        id: 'nucleus',
        name: 'Nucleus',
        color: 0xf5a623,
        geometry: { type: 'sphere', args: [0.42, 20, 20] },
        position: [0, 0, 0],
        description: 'The dense central core made of positively charged protons and neutral neutrons, bound together by the strong nuclear force and holding 99.9% of atomic mass.'
      },
      {
        id: 'electron1',
        name: 'Electron (Orbital 1)',
        color: 0x38bdf8,
        geometry: { type: 'sphere', args: [0.12, 14, 14] },
        position: [1.3, 0, 0],
        description: 'A fundamental subatomic lepton carrying a negative elementary charge, orbiting in a defined quantum energy shell around the nucleus.'
      },
      {
        id: 'electron2',
        name: 'Electron (Orbital 2)',
        color: 0x38bdf8,
        geometry: { type: 'sphere', args: [0.12, 14, 14] },
        position: [-0.9, 0.9, 0.3],
        description: 'A valence-shell electron whose quantum probability distribution governs chemical bonding, molecular geometry, and reactions.'
      },
      {
        id: 'electron3',
        name: 'Electron (Orbital 3)',
        color: 0x38bdf8,
        geometry: { type: 'sphere', args: [0.12, 14, 14] },
        position: [0.2, -1.1, -0.6],
        description: 'An outer electron whose transitions between energy levels absorb or emit photons of light with discrete frequencies.'
      },
    ],
  },

  'solar-system': {
    label: 'Solar System (simplified)',
    viewRadius: 10,
    explodeDistance: 2.2,
    parts: [
      {
        id: 'sun',
        name: 'The Sun',
        color: 0xf5a623,
        geometry: { type: 'sphere', args: [0.8, 24, 24] },
        position: [0, 0, 0],
        description: 'A G-type main-sequence star at the gravitational center of our solar system, fusing hydrogen into helium and radiating the energy that sustains life.'
      },
      {
        id: 'mercury',
        name: 'Mercury',
        color: 0x94a3b8,
        geometry: { type: 'sphere', args: [0.12, 14, 14] },
        position: [1.6, 0, 0],
        description: 'The innermost terrestrial planet, characterized by a cratered silicate surface, a large metallic iron core, and extreme thermal swings.'
      },
      {
        id: 'venus',
        name: 'Venus',
        color: 0xf5a623,
        geometry: { type: 'sphere', args: [0.2, 14, 14] },
        position: [2.2, 0, 0.4],
        description: 'Earth’s twin in size, enveloped by a suffocating carbon dioxide atmosphere and sulfuric acid clouds causing a runaway greenhouse effect.'
      },
      {
        id: 'earth',
        name: 'Earth',
        color: 0x38bdf8,
        geometry: { type: 'sphere', args: [0.22, 16, 16] },
        position: [2.9, 0, -0.4],
        description: 'The third planet from the Sun and the only known world to harbor liquid oceans, a protective magnetic field, an oxygen atmosphere, and life.'
      },
      {
        id: 'mars',
        name: 'Mars',
        color: 0xef4444,
        geometry: { type: 'sphere', args: [0.16, 14, 14] },
        position: [3.6, 0, 0.2],
        description: 'The Red Planet, renowned for iron-oxide soil, dormant giant volcanoes like Olympus Mons, ancient dry riverbeds, and frozen polar ice caps.'
      },
    ],
  },

  tv: {
    label: 'Television (TV)',
    viewRadius: 6,
    explodeDistance: 1.3,
    parts: [
      {
        id: 'screen',
        name: 'Display Screen',
        color: 0x0a0e14,
        geometry: { type: 'box', args: [2.4, 1.4, 0.08] },
        position: [0, 0.3, 0.1],
        description: 'Front glass and polarizer panel with an array of red, green, and blue subpixels that produce crisp, high-resolution visual imagery.'
      },
      {
        id: 'backlight',
        name: 'Backlight Panel',
        color: 0xe2e8f0,
        geometry: { type: 'box', args: [2.2, 1.2, 0.05] },
        position: [0, 0.3, -0.02],
        description: 'High-efficiency LED illumination array placed behind liquid crystals with diffusers to distribute uniform, bright backlight across the entire screen.'
      },
      {
        id: 'mainboard',
        name: 'Main Board / Processor',
        color: 0x1f6f4a,
        geometry: { type: 'box', args: [1.0, 0.5, 0.05] },
        position: [0, -0.3, -0.12],
        description: 'The television computer motherboard handling video signal decoding, smart TV operating system logic, image upscaling, and HDMI audio/video inputs.'
      },
      {
        id: 'speaker',
        name: 'Stereo Speakers',
        color: 0x2b323f,
        geometry: { type: 'box', args: [1.0, 0.15, 0.15] },
        position: [0, -0.65, -0.05],
        description: 'Electromagnetic sound transducers with tuned bass chambers producing dynamic stereo audio, dialogue clarity, and surround sound effects.'
      },
      {
        id: 'stand',
        name: 'Mount Stand',
        color: 0x94a3b8,
        geometry: { type: 'box', args: [0.5, 0.4, 0.4] },
        position: [0, -1.0, 0],
        description: 'Sturdy weighted metal base supporting the television securely on media consoles, preventing tipping and providing swivel adjustment.'
      },
    ],
  },

  'mobile-phone': {
    label: 'Mobile Phone',
    viewRadius: 4,
    explodeDistance: 0.9,
    parts: [
      {
        id: 'body',
        name: 'Body / Frame',
        color: 0x2b323f,
        geometry: { type: 'box', args: [0.9, 1.8, 0.15] },
        position: [0, 0, 0],
        transparent: true,
        opacity: 0.18,
        description: 'Aerospace-grade aluminum chassis with integrated antenna bands that protects internal electronic silicon and provides structural rigidity.'
      },
      {
        id: 'screen',
        name: 'Touchscreen Display',
        color: 0x0a0e14,
        geometry: { type: 'box', args: [0.82, 1.7, 0.02] },
        position: [0, 0, 0.09],
        description: 'High-refresh-rate OLED capacitive multi-touch display supporting millions of vibrant colors and responsive finger gesture recognition.'
      },
      {
        id: 'battery',
        name: 'Lithium-Ion Battery',
        color: 0x1c2431,
        geometry: { type: 'box', args: [0.6, 1.0, 0.05] },
        position: [0, -0.1, -0.02],
        description: 'High-density rechargeable lithium polymer cell that supplies regulated electrical energy to all onboard sensors and computing modules.'
      },
      {
        id: 'chip',
        name: 'SoC Processor Chip',
        color: 0x38bdf8,
        geometry: { type: 'box', args: [0.25, 0.25, 0.03] },
        position: [0.2, 0.5, -0.02],
        description: 'System-on-Chip (SoC) combining CPU cores, neural AI acceleration, GPU silicon, and wireless modem onto a microscopic semiconductor die.'
      },
      {
        id: 'camera',
        name: 'Camera Module',
        color: 0x94a3b8,
        geometry: { type: 'cylinder', args: [0.08, 0.08, 0.03, 16] },
        position: [-0.28, 0.75, -0.09],
        rotation: [Math.PI / 2, 0, 0],
        description: 'Multi-element optical glass lens paired with a high-resolution CMOS image sensor and optical image stabilization (OIS) for vivid photography.'
      },
    ],
  },

  refrigerator: {
    label: 'Refrigerator',
    viewRadius: 6.5,
    explodeDistance: 1.3,
    parts: [
      {
        id: 'body',
        name: 'Insulated Cabinet',
        color: 0xe2e8f0,
        geometry: { type: 'box', args: [1.6, 2.6, 1.4] },
        position: [0, 0, 0],
        transparent: true,
        opacity: 0.16,
        description: 'Double-walled steel outer casing filled with dense polyurethane foam insulation to prevent ambient room heat from infiltrating the cold interior.'
      },
      {
        id: 'door',
        name: 'Sealed Door',
        color: 0xcbd5e1,
        geometry: { type: 'box', args: [1.55, 2.5, 0.1] },
        position: [0, 0, 0.72],
        description: 'Insulated door with airtight perimeter magnetic gaskets that seal the compartment, preventing cold air leakage and condensation.'
      },
      {
        id: 'compressor',
        name: 'Compressor Pump',
        color: 0x2b323f,
        geometry: { type: 'cylinder', args: [0.3, 0.3, 0.35, 20] },
        position: [0.5, -1.15, -0.4],
        description: 'Electric motor pump that pressurizes refrigerant gas, raising its temperature and pumping it through the closed thermodynamic cooling loop.'
      },
      {
        id: 'coils',
        name: 'Condenser & Evaporator Coils',
        color: 0x94a3b8,
        geometry: { type: 'cylinder', args: [0.35, 0.35, 0.05, 20] },
        position: [0, -1.2, -0.6],
        rotation: [Math.PI / 2, 0, 0],
        description: 'Heat exchange tubing where refrigerant expands into cold vapor to absorb internal heat, then condenses outdoors to expel warmth.'
      },
      {
        id: 'shelf-top',
        name: 'Upper Tempered Shelf',
        color: 0x38bdf8,
        geometry: { type: 'box', args: [1.4, 0.05, 1.1] },
        position: [0, 0.3, 0],
        description: 'Spill-proof tempered safety glass shelf designed for organized, hygienic food and beverage storage with clear visibility.'
      },
      {
        id: 'shelf-bottom',
        name: 'Lower Storage Shelf',
        color: 0x38bdf8,
        geometry: { type: 'box', args: [1.4, 0.05, 1.1] },
        position: [0, -0.4, 0],
        description: 'Reinforced lower shelf positioned above the vegetable crisper bins, engineered to safely support heavy cookware and containers.'
      },
    ],
  },

  car: {
    label: 'Car (simplified)',
    viewRadius: 7,
    explodeDistance: 1.5,
    parts: [
      {
        id: 'chassis',
        name: 'Chassis / Frame',
        color: 0x94a3b8,
        geometry: { type: 'box', args: [1.0, 0.5, 2.6] },
        position: [0, 0, 0],
        transparent: true,
        opacity: 0.2,
        description: 'High-strength steel unibody platform providing torsional rigidity, crash crumple zones, and mounting fixtures for suspension and drivetrain.'
      },
      {
        id: 'cabin',
        name: 'Cabin / Passenger Shell',
        color: 0x38bdf8,
        geometry: { type: 'box', args: [0.9, 0.5, 1.2] },
        position: [0, 0.5, -0.1],
        transparent: true,
        opacity: 0.25,
        description: 'Reinforced passenger safety cage with aerodynamic glass windows, ergonomic seating, climate control, and digital driving controls.'
      },
      {
        id: 'engine',
        name: 'Engine / Power Unit',
        color: 0x2b323f,
        geometry: { type: 'box', args: [0.7, 0.4, 0.6] },
        position: [0, 0.05, 1.0],
        description: 'Powerplant converting chemical fuel combustion or electrical battery energy into rotational mechanical torque to propel the vehicle.'
      },
      {
        id: 'fuel-tank',
        name: 'Fuel Tank / Battery Pack',
        color: 0xf5a623,
        geometry: { type: 'box', args: [0.6, 0.3, 0.5] },
        position: [0, -0.1, -1.0],
        description: 'Reinforced energy storage reservoir holding liquid fuel or high-voltage lithium battery cells that feed the vehicle powertrain.'
      },
      {
        id: 'wheel-fl',
        name: 'Front-Left Wheel',
        color: 0x1c2431,
        geometry: { type: 'cylinder', args: [0.3, 0.3, 0.25, 20] },
        position: [0.55, -0.3, 0.85],
        rotation: [0, 0, Math.PI / 2],
        description: 'Steering and braking wheel assembly with pneumatic rubber tire, alloy rim, disc brake rotor, and independent suspension strut.'
      },
      {
        id: 'wheel-fr',
        name: 'Front-Right Wheel',
        color: 0x1c2431,
        geometry: { type: 'cylinder', args: [0.3, 0.3, 0.25, 20] },
        position: [-0.55, -0.3, 0.85],
        rotation: [0, 0, Math.PI / 2],
        description: 'Front-right steering wheel providing cornering grip, directional control, and high-performance front axle stopping power.'
      },
      {
        id: 'wheel-bl',
        name: 'Rear-Left Wheel',
        color: 0x1c2431,
        geometry: { type: 'cylinder', args: [0.3, 0.3, 0.25, 20] },
        position: [0.55, -0.3, -0.85],
        rotation: [0, 0, Math.PI / 2],
        description: 'Rear-left drive and stability wheel maintaining rear axle traction, lateral road grip, and shock absorption over bumps.'
      },
      {
        id: 'wheel-br',
        name: 'Rear-Right Wheel',
        color: 0x1c2431,
        geometry: { type: 'cylinder', args: [0.3, 0.3, 0.25, 20] },
        position: [-0.55, -0.3, -0.85],
        rotation: [0, 0, Math.PI / 2],
        description: 'Rear-right wheel transferring drive torque smoothly to the pavement and stabilizing vehicle balance during acceleration.'
      },
    ],
  },

  bicycle: {
    label: 'Bicycle',
    viewRadius: 18,
    explodeDistance: 6,
    parts: [
      {
        id: 'frame',
        name: 'Diamond Frame',
        color: 0x38bdf8,
        geometry: { type: 'cylinder', args: [0.15, 0.15, 6, 16] },
        position: [0, 2.5, 0],
        rotation: [0, 0, Math.PI / 4],
        description: 'The core structural backbone of the bicycle connecting the front fork, pedals, and rear wheel hub. It distributes rider weight evenly and absorbs road vibrations.'
      },
      {
        id: 'front-wheel',
        name: 'Front Wheel',
        color: 0x2b323f,
        geometry: { type: 'cylinder', args: [2.2, 2.2, 0.35, 32] },
        position: [4, 2.2, 0],
        rotation: [Math.PI / 2, 0, 0],
        description: 'Provides steering directional control and forward rolling motion, fitted with rubber pneumatic tire and spoke tension system.'
      },
      {
        id: 'back-wheel',
        name: 'Rear Wheel',
        color: 0x2b323f,
        geometry: { type: 'cylinder', args: [2.2, 2.2, 0.35, 32] },
        position: [-4, 2.2, 0],
        rotation: [Math.PI / 2, 0, 0],
        description: 'The driven wheel attached to the rear cassette, transforming chain rotation from pedal power into forward propulsion.'
      },
      {
        id: 'handlebar',
        name: 'Handlebar & Stem',
        color: 0x94a3b8,
        geometry: { type: 'cylinder', args: [0.15, 0.15, 3.5, 16] },
        position: [3.2, 4.8, 0],
        rotation: [0, 0, Math.PI / 2],
        description: 'Steering interface gripped by the cyclist, housing the brake levers and gear shifters for navigation.'
      },
      {
        id: 'seat',
        name: 'Bicycle Saddle',
        color: 0x1e293b,
        geometry: { type: 'box', args: [1.8, 0.4, 1.0] },
        position: [-1.6, 4.3, 0],
        rotation: [0, 0, 0.1],
        description: 'Ergonomic seat supporting the cyclist posture and pedaling leverage mounted atop the adjustable seatpost.'
      },
      {
        id: 'pedals',
        name: 'Pedals & Crankset',
        color: 0xf5a623,
        geometry: { type: 'cylinder', args: [0.5, 0.5, 1.4, 16] },
        position: [-0.5, 1.3, 0],
        rotation: [Math.PI / 2, 0, 0],
        description: 'Mechanical levers rotated by rider foot effort, driving the front chainring gear.'
      },
      {
        id: 'chain',
        name: 'Drive Chain & Sprocket',
        color: 0x64748b,
        geometry: { type: 'box', args: [3.8, 0.2, 0.15] },
        position: [-2.2, 1.3, 0.3],
        description: 'Interlinked metal roller chain transferring torque from the front pedal crank to the rear wheel cassette.'
      },
    ],
  },

  laptop: {
    label: 'Laptop',
    viewRadius: 12,
    explodeDistance: 4,
    parts: [
      {
        id: 'screen',
        name: 'Display Screen (Lid)',
        color: 0x38bdf8,
        geometry: { type: 'box', args: [5.0, 3.4, 0.2] },
        position: [0, 2.2, -1.6],
        rotation: [-0.35, 0, 0],
        description: 'High-definition LED/OLED visual display panel housed inside an aluminum protective lid enclosure.'
      },
      {
        id: 'hinge',
        name: 'Display Hinge',
        color: 0x94a3b8,
        geometry: { type: 'cylinder', args: [0.12, 0.12, 4.4, 16] },
        position: [0, 0.6, -1.6],
        rotation: [0, 0, Math.PI / 2],
        description: 'Friction torque hinge allowing smooth opening and closing while routing video data cables between base and screen.'
      },
      {
        id: 'keyboard',
        name: 'Keyboard Deck',
        color: 0x2b323f,
        geometry: { type: 'box', args: [4.6, 0.1, 2.0] },
        position: [0, 0.55, -0.4],
        description: 'Scissor-switch or mechanical input matrix allowing alphanumeric typing and system shortcut interaction.'
      },
      {
        id: 'trackpad',
        name: 'Multi-touch Trackpad',
        color: 0x64748b,
        geometry: { type: 'box', args: [1.6, 0.08, 1.1] },
        position: [0, 0.52, 1.1],
        description: 'Glass capacitive touch surface registering multi-finger gestures, pointer clicks, and haptic feedback.'
      },
      {
        id: 'motherboard',
        name: 'Motherboard & Processor',
        color: 0x1f6f4a,
        geometry: { type: 'box', args: [3.6, 0.1, 1.8] },
        position: [0, 0.25, -0.4],
        description: 'The primary printed circuit board holding CPU, GPU, RAM chips, SSD storage, and thermal cooling heatpipes.'
      },
      {
        id: 'battery',
        name: 'Lithium Battery Cells',
        color: 0xf5a623,
        geometry: { type: 'box', args: [4.2, 0.15, 1.2] },
        position: [0, 0.22, 1.0],
        description: 'Rechargeable multi-cell lithium polymer chemical battery powering the laptop during untethered operation.'
      },
    ],
  },

  'washing-machine': {
    label: 'Washing Machine',
    viewRadius: 14,
    explodeDistance: 5,
    parts: [
      {
        id: 'drum',
        name: 'Stainless Steel Drum',
        color: 0x94a3b8,
        geometry: { type: 'cylinder', args: [1.8, 1.8, 2.8, 32] },
        position: [0, 0.2, 0],
        rotation: [Math.PI / 2, 0, 0],
        description: 'Perforated spin basket holding clothes, rotating at high RPM to agitate water and centrifuge liquid out during spin cycles.'
      },
      {
        id: 'door',
        name: 'Front Glass Porthole Door',
        color: 0x38bdf8,
        geometry: { type: 'cylinder', args: [1.4, 1.4, 0.3, 32] },
        position: [0, 0.2, 2.1],
        rotation: [Math.PI / 2, 0, 0],
        transparent: true,
        opacity: 0.8,
        description: 'Watertight sealed tempered glass door with electromagnetic safety lock allowing visibility into the wash cycle.'
      },
      {
        id: 'control-panel',
        name: 'Digital Control Panel & Dial',
        color: 0x2b323f,
        geometry: { type: 'box', args: [4.2, 1.0, 0.4] },
        position: [0, 2.3, 1.9],
        description: 'User interface featuring rotary program selectors, LED timing readouts, temperature, and spin speed settings.'
      },
      {
        id: 'motor',
        name: 'Direct Drive Inverter Motor',
        color: 0xf5a623,
        geometry: { type: 'cylinder', args: [1.1, 1.1, 1.2, 24] },
        position: [0, 0.2, -1.8],
        rotation: [Math.PI / 2, 0, 0],
        description: 'Brushless DC electric motor attached straight to the rear drum shaft without belts, delivering quiet high-torque rotation.'
      },
      {
        id: 'water-pump',
        name: 'Drainage Water Pump & Filter',
        color: 0x1f6f4a,
        geometry: { type: 'box', args: [1.2, 1.0, 1.2] },
        position: [1.2, -2.1, 1.2],
        description: 'Centrifugal pump that expels soapy waste water out through the rear discharge hose and traps lint debris.'
      },
    ],
  },

  'air-conditioner': {
    label: 'Split Air Conditioner',
    viewRadius: 16,
    explodeDistance: 5.5,
    parts: [
      {
        id: 'indoor-unit',
        name: 'Indoor Blower Unit',
        color: 0xf8fafc,
        geometry: { type: 'box', args: [5.2, 1.8, 1.4] },
        position: [0, 3.2, 0],
        description: 'Wall-mounted interior console containing air filters, motorized louvers, and the whisper-quiet cross-flow fan.'
      },
      {
        id: 'cooling-coil',
        name: 'Evaporator Cooling Coil',
        color: 0x38bdf8,
        geometry: { type: 'box', args: [4.6, 1.2, 0.8] },
        position: [0, 3.2, -0.1],
        description: 'Finned copper tubing where liquid refrigerant expands, absorbing heat from indoor room air and condensing humidity.'
      },
      {
        id: 'outdoor-unit',
        name: 'Outdoor Condenser Casing',
        color: 0x94a3b8,
        geometry: { type: 'box', args: [4.4, 3.2, 2.0] },
        position: [0, -2.2, 0],
        description: 'Weatherproof metal exterior housing containing the refrigerant compressor, expansion valve, and electrical inverter.'
      },
      {
        id: 'fan',
        name: 'Condenser Cooling Fan',
        color: 0x2b323f,
        geometry: { type: 'cylinder', args: [1.2, 1.2, 0.3, 24] },
        position: [0.8, -2.2, 1.1],
        rotation: [Math.PI / 2, 0, 0],
        description: 'Heavy-duty axial propeller fan expelling rejected thermal heat outdoors across the condenser fins.'
      },
    ],
  },
};