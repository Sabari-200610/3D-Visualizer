// Each object has: a label, a viewRadius (camera distance), an
// explodeDistance, and a list of parts (id, name, color, geometry,
// position, description, simple, technical, partCategory, finish, dimensions,
// and optionally rotation/transparent/opacity/metalness/roughness).
//
// Component descriptions are bundled locally for instant, offline-first
// rendering, and can also be enhanced dynamically by Claude AI via the backend.

const OBJECTS = {
  "computer": {
    "label": "Computer Workstation",
    "category": "Electronics",
    "icon": "💻",
    "viewRadius": 6.5,
    "explodeDistance": 1.4,
    "parts": [
      {
        "id": "case",
        "name": "Case Chassis & Glass",
        "color": 2830911,
        "geometry": {
          "type": "box",
          "args": [
            2.2,
            2.6,
            2.2
          ]
        },
        "position": [
          0,
          0.2,
          0
        ],
        "transparent": true,
        "opacity": 0.18,
        "description": "The structural chassis that securely houses and protects all internal hardware while directing intake and exhaust cooling airflow.",
        "partCategory": "Chassis & Thermal Enclosure",
        "finish": "SPCC Steel & Tempered Glass",
        "dimensions": "450 × 215 × 480 mm (Mid-Tower)",
        "simple": "The outer metal and glass box that holds and protects all internal computer hardware while channeling airflow.",
        "technical": "Electromagnetically shielded (EMI) steel enclosure with isolated power supply basement and filtered airflow baffles providing positive static pressure cooling."
      },
      {
        "id": "motherboard",
        "name": "Motherboard",
        "color": 2060106,
        "geometry": {
          "type": "box",
          "args": [
            1.9,
            0.05,
            1.9
          ]
        },
        "position": [
          0,
          -0.75,
          0
        ],
        "description": "The primary printed circuit board that connects the CPU, memory, expansion cards, and storage through high-speed communication buses.",
        "partCategory": "Multi-Layer Printed Circuit Board",
        "finish": "FR-4 Matte Solder Mask & Gold Traces",
        "dimensions": "ATX Standard (305 × 244 mm)",
        "simple": "The main circuit board that connects all the computer parts together so they can communicate and receive power.",
        "technical": "High-density 8-to-12-layer printed circuit board (FR-4) integrating CPU socket, PCIe 5.0 lanes, DDR5 memory traces, multi-phase VRM power delivery, and high-speed bus interfaces."
      },
      {
        "id": "cpu",
        "name": "CPU (Processor)",
        "color": 3718648,
        "geometry": {
          "type": "box",
          "args": [
            0.5,
            0.14,
            0.5
          ]
        },
        "position": [
          -0.4,
          -0.6,
          0.4
        ],
        "description": "The Central Processing Unit executes program instructions, performs mathematical and logical computations, and orchestrates system tasks.",
        "partCategory": "Core Microprocessor Die",
        "finish": "Nickel-Plated Copper IHS & Silicon Die",
        "dimensions": "Socket LGA1700 (37.5 × 45.0 mm)",
        "simple": "The brain of the computer that carries out program instructions and processes calculations.",
        "technical": "Synchronous multi-core microarchitecture silicon die fabricated via deep ultraviolet lithography. Executes instructions via pipelined Fetch-Decode-Execute cycles across arithmetic logic units (ALUs), floating-point units, and multi-tier L1/L2/L3 caches."
      },
      {
        "id": "ram1",
        "name": "RAM Stick (Channel A)",
        "color": 16098851,
        "geometry": {
          "type": "box",
          "args": [
            0.12,
            0.6,
            0.32
          ]
        },
        "position": [
          0.35,
          -0.4,
          0.5
        ],
        "description": "High-speed volatile system memory that stores active programs and operating system data for instantaneous nanosecond CPU access.",
        "partCategory": "Volatile Synchronous DRAM (Channel A)",
        "finish": "Gold-Plated DIMM Fingers & Aluminum Heat Spreader",
        "dimensions": "133.35 × 31.25 × 7.0 mm",
        "simple": "Fast working memory stick that holds open programs and files so the processor can read them instantly.",
        "technical": "DDR5 synchronous dynamic RAM module operating in dual-channel Bank A with on-die ECC, transfer rates >6,000 MT/s, and low nanosecond CAS latencies."
      },
      {
        "id": "ram2",
        "name": "RAM Stick (Channel B)",
        "color": 16098851,
        "geometry": {
          "type": "box",
          "args": [
            0.12,
            0.6,
            0.32
          ]
        },
        "position": [
          0.55,
          -0.4,
          0.5
        ],
        "description": "Secondary memory module operating in dual-channel mode, doubling memory bandwidth to 128-bit for smooth multitasking and heavy workloads.",
        "partCategory": "Volatile Synchronous DRAM (Channel B)",
        "finish": "Gold-Plated DIMM Fingers & Aluminum Heat Spreader",
        "dimensions": "133.35 × 31.25 × 7.0 mm",
        "simple": "The matching second memory stick, doubling the data highway to keep heavy programs running fast.",
        "technical": "Paired DDR5 memory module running in dual-channel Bank B, expanding bus width to 128-bit for concurrent memory access interleaving."
      },
      {
        "id": "gpu",
        "name": "GPU (Graphics Card)",
        "color": 4906624,
        "geometry": {
          "type": "box",
          "args": [
            1.7,
            0.22,
            0.65
          ]
        },
        "position": [
          0,
          -0.9,
          0.65
        ],
        "description": "Dedicated visual processor equipped with thousands of parallel compute cores engineered to render 3D graphics, video streams, and AI models.",
        "partCategory": "Parallel Graphics Accelerator",
        "finish": "Die-Cast Aluminum Shroud & Copper Vapor Chamber",
        "dimensions": "285 × 120 × 42 mm (Dual Slot)",
        "simple": "A specialized processor designed to render complex 3D graphics, visual effects, and gaming simulations.",
        "technical": "Massively parallel graphics processing unit containing thousands of stream processor cores, tensor compute cores, and high-bandwidth GDDR6X VRAM communicating over a 256-bit memory bus."
      },
      {
        "id": "psu",
        "name": "Power Supply (PSU)",
        "color": 9741240,
        "geometry": {
          "type": "box",
          "args": [
            1,
            0.85,
            0.95
          ]
        },
        "position": [
          0,
          0.9,
          -0.55
        ],
        "description": "Converts high-voltage alternating current (AC) from the wall socket into regulated low-voltage direct current (+12V, +5V, +3.3V) for components.",
        "partCategory": "Switched-Mode Power Supply",
        "finish": "SECC Steel with Powder Coating",
        "dimensions": "ATX Standard: 150 × 140 × 86 mm",
        "simple": "Converts high-voltage household alternating current into safe, clean direct current for internal computer components.",
        "technical": "Switch-mode power supply unit (SMPS) utilizing active power factor correction (PFC > 0.99) and DC-to-DC resonant LLC topology to deliver regulated +12V, +5V, and +3.3V rails at 80-Plus Gold efficiency (>90%)."
      },
      {
        "id": "disk",
        "name": "Storage Drive (SSD)",
        "color": 14870768,
        "geometry": {
          "type": "box",
          "args": [
            0.9,
            0.14,
            0.9
          ]
        },
        "position": [
          0,
          -1.05,
          -0.5
        ],
        "description": "Non-volatile solid-state storage drive that permanently retains the operating system, user files, and application data without power.",
        "partCategory": "Non-Volatile Flash Storage",
        "finish": "M.2 2280 PCB with Graphene Heat Pad",
        "dimensions": "M.2 2280 (80.0 × 22.0 × 2.3 mm)",
        "simple": "Fast permanent storage drive where your operating system, games, and files remain safely saved even when turned off.",
        "technical": "M.2 NVMe solid-state drive utilizing 3D TLC/QLC NAND flash memory and a multi-channel controller over PCIe 4.0 x4 lanes, delivering sequential reads up to 7,000 MB/s."
      },
      {
        "id": "fan",
        "name": "Cooling Fan",
        "color": 1844273,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.42,
            0.42,
            0.1,
            20
          ]
        },
        "position": [
          0,
          0.2,
          -1.15
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Forces high-velocity air across thermal heatsinks and exhausts warm air out of the case to maintain safe silicon temperatures.",
        "partCategory": "Active Forced-Air Heat Dissipation",
        "finish": "PBT Polymer Housing & Fluid Bearings",
        "dimensions": "120 × 120 × 25 mm",
        "simple": "Spins to blow cool air through the computer case and push out heat generated by the processor and graphics card.",
        "technical": "Pulse-width modulated (PWM) 4-pin brushless DC axial fan with hydrodynamic bearings, generating 65 CFM airflow and 2.1 mm H2O static pressure to dissipate thermal wattage."
      }
    ]
  },
  "atom": {
    "label": "Quantum Atom",
    "category": "Science & Concepts",
    "icon": "⚛️",
    "viewRadius": 4.5,
    "explodeDistance": 1.1,
    "parts": [
      {
        "id": "nucleus",
        "name": "Nucleus",
        "color": 16098851,
        "geometry": {
          "type": "sphere",
          "args": [
            0.42,
            20,
            20
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "description": "The dense central core made of positively charged protons and neutral neutrons, bound together by the strong nuclear force and holding 99.9% of atomic mass.",
        "partCategory": "Atomic Nucleus (Baryons)",
        "finish": "Strong-Force Bound Nucleons",
        "dimensions": "Ø ~1.75 fm (1.75 × 10⁻¹⁵ m)",
        "simple": "The tiny, dense core at the very center of an atom made of protons and neutrons that holds virtually all of the atom's weight.",
        "technical": "Femtometer-scale (~1.75 fm) composite nuclear core bound by the residual strong nuclear force mediating gluon exchange between quarks, overcoming Coulomb electrostatic repulsion between protons and accounting for >99.94% of total atomic mass."
      },
      {
        "id": "electron1",
        "name": "Electron (Orbital 1)",
        "color": 3718648,
        "geometry": {
          "type": "sphere",
          "args": [
            0.12,
            14,
            14
          ]
        },
        "position": [
          1.3,
          0,
          0
        ],
        "description": "A fundamental subatomic lepton carrying a negative elementary charge, orbiting in a defined quantum energy shell around the nucleus.",
        "partCategory": "Subatomic Lepton (Inner Shell)",
        "finish": "Quantum Probability Wavepacket",
        "dimensions": "Point Particle (< 10⁻¹⁸ m)",
        "simple": "A negatively charged subatomic particle that zips around the central nucleus in the lowest, innermost energy level.",
        "technical": "Fundamental spin-1/2 lepton with negative elementary charge (-1.602 × 10⁻¹⁹ C) and rest mass 9.109 × 10⁻³¹ kg, occupying the ground-state 1s spherical orbital with zero angular momentum."
      },
      {
        "id": "electron2",
        "name": "Electron (Orbital 2)",
        "color": 3718648,
        "geometry": {
          "type": "sphere",
          "args": [
            0.12,
            14,
            14
          ]
        },
        "position": [
          -0.9,
          0.9,
          0.3
        ],
        "description": "A valence-shell electron whose quantum probability distribution governs chemical bonding, molecular geometry, and reactions.",
        "partCategory": "Subatomic Lepton (Valence Shell)",
        "finish": "Quantum Probability Wavepacket",
        "dimensions": "Point Particle (< 10⁻¹⁸ m)",
        "simple": "An electron in an outer orbital shell whose interactions with other atoms determine chemical bonding and chemical reactions.",
        "technical": "Valence-shell lepton whose spatial wave-function probability distribution defines hybridization geometry (sp, sp², sp³) and chemical valence bonding potentials with neighboring atoms."
      },
      {
        "id": "electron3",
        "name": "Electron (Orbital 3)",
        "color": 3718648,
        "geometry": {
          "type": "sphere",
          "args": [
            0.12,
            14,
            14
          ]
        },
        "position": [
          0.2,
          -1.1,
          -0.6
        ],
        "description": "An outer electron whose transitions between energy levels absorb or emit photons of light with discrete frequencies.",
        "partCategory": "Subatomic Lepton (Excited State)",
        "finish": "Quantum Probability Wavepacket",
        "dimensions": "Point Particle (< 10⁻¹⁸ m)",
        "simple": "An outer electron that absorbs or releases discrete bursts of light (photons) whenever it jumps between energy levels.",
        "technical": "Quantum-confined lepton undergoing radiative transitions between discrete eigenstates, emitting or absorbing electromagnetic radiation with frequency ν = ΔE/h conforming to the Planck-Einstein relation."
      }
    ]
  },
  "solar-system": {
    "label": "Solar System",
    "category": "Science & Concepts",
    "icon": "🪐",
    "viewRadius": 30,
    "explodeDistance": 5,
    "parts": [
      {
        "id": "sun",
        "name": "The Sun",
        "color": 16753920,
        "geometry": {
          "type": "sphere",
          "args": [
            1.6,
            32,
            32
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "materialType": "star",
        "description": "A G-type main-sequence star fusing 600 million tons of hydrogen per second, radiating 3.8e26 watts of energy that illuminates and anchors the solar system.",
        "partCategory": "G-Type Main-Sequence Star",
        "finish": "Gaseous Plasma & Photosphere",
        "dimensions": "Ø 1,392,700 km (109 × Earth)",
        "simple": "The Sun is the massive star at the center of our solar system whose gravitational pull keeps all planets in orbit while radiating the light and heat that makes life on Earth possible.",
        "technical": "A G2V spectral-class yellow dwarf star comprising 99.86% of solar system mass (1.989 × 10³⁰ kg). Core proton-proton chain nuclear fusion converts 600M tons of hydrogen into helium per second at ~15.7M K, radiating 3.828 × 10²⁶ W total luminosity."
      },
      {
        "id": "mercury",
        "name": "Mercury",
        "color": 8026746,
        "geometry": {
          "type": "sphere",
          "args": [
            0.18,
            20,
            20
          ]
        },
        "position": [
          1.85,
          0.09,
          2.1
        ],
        "materialType": "rocky",
        "description": "Innermost and smallest planet, heavily cratered, with extreme temperature swings from -173C to 427C and a disproportionately large iron core.",
        "partCategory": "Terrestrial Rocky Planet",
        "finish": "Silicate & Basaltic Regolith",
        "dimensions": "Ø 4,879 km (0.38 × Earth)",
        "simple": "Mercury is the smallest planet and closest to the Sun. It has a heavily cratered rocky surface with no atmosphere to trap heat, causing extreme temperatures from scorching days to freezing nights.",
        "technical": "Terrestrial planet orbiting at 0.387 AU with an 87.97-day period and 3:2 spin-orbit resonance. Possesses a massive metallic iron-nickel core occupying ~85% of planetary radius, a global dipole magnetic field (1.1% of Earth), and a tenuous surface-bounded exosphere."
      },
      {
        "id": "venus",
        "name": "Venus",
        "color": 15254890,
        "geometry": {
          "type": "sphere",
          "args": [
            0.28,
            24,
            24
          ]
        },
        "position": [
          -3.02,
          0.04,
          3.06
        ],
        "materialType": "rocky",
        "description": "Earth twin in size, shrouded in sulfuric acid clouds with surface temperatures of 465C from a runaway greenhouse effect and retrograde rotation.",
        "partCategory": "Terrestrial Rocky Planet",
        "finish": "Dense Supercritical CO2 & Sulfuric Cloud Deck",
        "dimensions": "Ø 12,104 km (0.95 × Earth)",
        "simple": "Venus is similar in size to Earth but covered in thick, toxic clouds of sulfuric acid. A runaway greenhouse effect makes it the hottest planet in the solar system, hotter than an oven day and night.",
        "technical": "Terrestrial planet with a dense 93-bar atmosphere composed of 96.5% CO2 with sulfuric acid cloud decks. Runaway greenhouse effect maintains a uniform surface temperature of 737 K (464°C). Exhibits retrograde slow rotation (243 Earth days)."
      },
      {
        "id": "earth",
        "name": "Earth",
        "color": 2784713,
        "geometry": {
          "type": "sphere",
          "args": [
            0.32,
            28,
            28
          ]
        },
        "position": [
          -4.14,
          0,
          -4.34
        ],
        "materialType": "earth",
        "description": "The only known planet harboring life, with liquid oceans covering 71% of surface, a protective magnetosphere, an oxygen-nitrogen atmosphere, and the Moon.",
        "partCategory": "Habitable Terrestrial Planet",
        "finish": "Liquid Hydrosphere & Silicate Crust",
        "dimensions": "Ø 12,742 km (Mean Radius 6,371 km)",
        "simple": "Earth is our home planet and the only known world to harbor life. It has vast liquid oceans, a protective atmosphere rich in nitrogen and oxygen, and a magnetic field shielding us from solar radiation.",
        "technical": "Differentiated terrestrial planet with active plate tectonics, liquid outer core geodynamo producing a protective magnetosphere, and nitrogen-oxygen atmosphere (78% N2, 21% O2). Water covers 70.8% of surface at the triple point of water."
      },
      {
        "id": "mars",
        "name": "Mars",
        "color": 12665870,
        "geometry": {
          "type": "sphere",
          "args": [
            0.24,
            22,
            22
          ]
        },
        "position": [
          3.18,
          0.07,
          7.12
        ],
        "materialType": "rocky",
        "description": "The Red Planet with iron-oxide soils, Olympus Mons (21 km tall volcano), polar ice caps, and Valles Marineris canyon system.",
        "partCategory": "Terrestrial Rocky Planet",
        "finish": "Ferric Oxide (Rust) Regolith & Basalt",
        "dimensions": "Ø 6,779 km (0.53 × Earth)",
        "simple": "Mars is known as the Red Planet because iron minerals in its soil oxidize (rust). It has thin air, polar ice caps, the largest volcano in the solar system, and ancient dried river valleys.",
        "technical": "Terrestrial planet characterized by iron-oxide-rich basaltic regolith, thin CO2 atmosphere (6.1 mbar surface pressure), and remnant crustal remanent magnetization. Houses Olympus Mons shield volcano (21.9 km elevation) and Valles Marineris rift system."
      },
      {
        "id": "jupiter",
        "name": "Jupiter",
        "color": 13142842,
        "geometry": {
          "type": "sphere",
          "args": [
            0.92,
            32,
            32
          ]
        },
        "position": [
          7.13,
          0.04,
          -7.84
        ],
        "materialType": "gas-giant",
        "description": "The largest planet with the Great Red Spot storm larger than Earth, 95 known moons, and a magnetic field 20,000x stronger than Earth.",
        "partCategory": "Gas Giant Planet",
        "finish": "Dense Hydrogen-Helium Cloud Belts",
        "dimensions": "Ø 139,820 km (11.0 × Earth)",
        "simple": "Jupiter is the largest planet in our solar system, so big that all other planets could fit inside it. It is a giant ball of gas with swirling storm bands, including the famous Great Red Spot.",
        "technical": "Gas giant with mass of 1.898 × 10²⁷ kg (317.8 Earth masses). Atmosphere predominantly molecular hydrogen (89%) and helium (10%) transitioning to metallic hydrogen at ~200 GPa. Features an internal dynamo generating a 4.2-gauss equatorial magnetic field."
      },
      {
        "id": "saturn",
        "name": "Saturn",
        "color": 14995857,
        "geometry": {
          "type": "sphere",
          "args": [
            0.78,
            32,
            32
          ]
        },
        "position": [
          -13.73,
          0.02,
          2.67
        ],
        "materialType": "gas-giant",
        "description": "The ringed jewel of the solar system, the least dense planet, with an iconic ring system of ice and rock spanning 282,000 km.",
        "partCategory": "Gas Giant Planet",
        "finish": "Ammonia Ice Haze & Chromophores",
        "dimensions": "Ø 116,460 km (9.14 × Earth)",
        "simple": "Saturn is a magnificent gas giant best known for its bright, spectacular ring system made of billions of chunks of ice and rock orbiting around its equator.",
        "technical": "Gas giant planet with lowest mean density in the solar system (0.687 g/cm³, less than liquid water). Atmospheric composition of 96% H2 and 3% He. Driven by internal helium precipitation (rainout) releasing gravitational potential energy as thermal excess."
      },
      {
        "id": "saturn-ring",
        "name": "Saturn Ring System",
        "color": 13942928,
        "geometry": {
          "type": "cylinder",
          "args": [
            1.4,
            2.6,
            0.04,
            64
          ]
        },
        "position": [
          -13.73,
          0.02,
          2.67
        ],
        "materialType": "ring",
        "transparent": true,
        "opacity": 0.8,
        "description": "Billions of ice and rock particles from dust to mountain-sized boulders orbiting Saturn in the equatorial plane with a 26.7 degree axial tilt.",
        "partCategory": "Planetary Ring System",
        "finish": "Micro-to-Metric Water-Ice Clasts",
        "dimensions": "Outer Span: 282,000 km (Thickness ~10 m)",
        "simple": "Saturn's rings are an extensive, paper-thin sheet of glistening ice and rock particles ranging in size from tiny dust specks to massive house-sized boulders orbiting the planet.",
        "technical": "Dynamic planetary ring system extending from 66,300 km to 480,000 km from Saturn's center with typical thickness of only ~10 meters. Composed of 99% pure water-ice clasts interacting via gravitational shepherd resonances with inner moons."
      },
      {
        "id": "uranus",
        "name": "Uranus",
        "color": 8251624,
        "geometry": {
          "type": "sphere",
          "args": [
            0.54,
            28,
            28
          ]
        },
        "position": [
          16.82,
          -0.02,
          4.83
        ],
        "materialType": "ice-giant",
        "description": "The sideways ice giant rotating on its side with 97.8 degree axial tilt, surrounded by faint vertical rings and a pale cyan methane atmosphere.",
        "partCategory": "Ice Giant Planet",
        "finish": "Hydrogen, Helium & Methane Haze",
        "dimensions": "Ø 50,724 km (4.0 × Earth)",
        "simple": "Uranus is an icy giant planet that looks pale blue-green due to methane in its air. Uniquely, it rotates tilted completely on its side, rolling around the Sun like a ball.",
        "technical": "Ice giant planet with a 97.77° axial tilt causing extreme 42-year hemispheric seasons. Interior mantle consists of hot, dense slush of water, ammonia, and methane ices overlying a small silicate-iron core. Atmosphere exhibits lowest planetary temperature (49 K)."
      },
      {
        "id": "neptune",
        "name": "Neptune",
        "color": 4150458,
        "geometry": {
          "type": "sphere",
          "args": [
            0.5,
            28,
            28
          ]
        },
        "position": [
          -1.3,
          -0.09,
          -20.96
        ],
        "materialType": "ice-giant",
        "description": "The windiest planet with storms reaching 2,100 km/h. Deep azure blue from methane light absorption with active storm systems.",
        "partCategory": "Ice Giant Planet",
        "finish": "Deep Azure Methane Fluid Mantle",
        "dimensions": "Ø 49,244 km (3.86 × Earth)",
        "simple": "Neptune is a dark, cold, and stormy deep blue ice giant located farthest from the Sun. It experiences supersonic winds that are the fastest recorded anywhere in the solar system.",
        "technical": "Outermost ice giant orbiting at 30.1 AU with an internal heat mechanism driving supersonic atmospheric jet streams up to 2,100 km/h (Mach 2+). Deep azure hue results from red light absorption by atmospheric methane at 600 nm."
      },
      {
        "id": "pluto",
        "name": "Pluto (Dwarf Planet)",
        "color": 12298378,
        "geometry": {
          "type": "sphere",
          "args": [
            0.14,
            16,
            16
          ]
        },
        "position": [
          -9.07,
          0.6,
          22.76
        ],
        "materialType": "rocky",
        "description": "A dwarf planet in the Kuiper Belt with a heart-shaped nitrogen ice plain (Tombaugh Regio) and a 17 degree inclined elliptical orbit.",
        "partCategory": "Kuiper Belt Dwarf Planet",
        "finish": "Nitrogen, Methane & Water-Ice Regolith",
        "dimensions": "Ø 2,377 km (0.19 × Earth)",
        "simple": "Pluto is an icy dwarf planet situated far out in the Kuiper Belt. It features glaciers of frozen nitrogen, rugged mountains of hard water ice, and a prominent heart-shaped plain.",
        "technical": "Trans-Neptunian dwarf planet in 2:3 orbital resonance with Neptune (plutino). Surface dominated by volatile nitrogen, methane, and carbon monoxide ices overlying a rigid water-ice bedrock. Houses the nitrogen-ice glacier basin Sputnik Planitia."
      }
    ]
  },
  "tv": {
    "label": "Smart Television (OLED TV)",
    "category": "Electronics",
    "icon": "📺",
    "viewRadius": 6,
    "explodeDistance": 1.3,
    "parts": [
      {
        "id": "screen",
        "name": "Display Screen",
        "color": 658964,
        "geometry": {
          "type": "box",
          "args": [
            2.4,
            1.4,
            0.08
          ]
        },
        "position": [
          0,
          0.3,
          0.1
        ],
        "description": "Front glass and polarizer panel with an array of red, green, and blue subpixels that produce crisp, high-resolution visual imagery.",
        "partCategory": "Display Panel & Subpixel Array",
        "finish": "Aluminosilicate Glass & Anti-Glare Polarizer",
        "dimensions": "1,230 × 710 × 4.5 mm (55-Inch Panel)",
        "simple": "The front glass panel containing millions of tiny red, green, and blue subpixels that produce crisp video pictures.",
        "technical": "OLED / Quantum-Dot LED matrix featuring 3840 × 2160 (4K UHD) self-emissive organic subpixels with high dynamic contrast ratio and 120 Hz refresh rate."
      },
      {
        "id": "backlight",
        "name": "Backlight Panel",
        "color": 14870768,
        "geometry": {
          "type": "box",
          "args": [
            2.2,
            1.2,
            0.05
          ]
        },
        "position": [
          0,
          0.3,
          -0.02
        ],
        "description": "High-efficiency LED illumination array placed behind liquid crystals with diffusers to distribute uniform, bright backlight across the entire screen.",
        "partCategory": "Full-Array Local Dimming Backlight",
        "finish": "Optical Diffuser & Mini-LED Array",
        "dimensions": "1,220 × 700 × 12.0 mm",
        "simple": "A grid of bright LEDs behind the screen that lights up the picture evenly.",
        "technical": "Direct full-array Mini-LED backlight matrix with hundreds of local dimming zones dynamically modulated to achieve peak luminance >1,500 nits."
      },
      {
        "id": "mainboard",
        "name": "Main Board / Processor",
        "color": 2060106,
        "geometry": {
          "type": "box",
          "args": [
            1,
            0.5,
            0.05
          ]
        },
        "position": [
          0,
          -0.3,
          -0.12
        ],
        "description": "The television computer motherboard handling video signal decoding, smart TV operating system logic, image upscaling, and HDMI audio/video inputs.",
        "partCategory": "SoC Video Processing Mainboard",
        "finish": "Multi-Layer FR-4 PCB & Heatsink",
        "dimensions": "220 × 180 × 15.0 mm",
        "simple": "The computer board inside the TV that decodes streaming video, controls apps, and drives the display.",
        "technical": "Embedded SoC motherboard running AI image upscaling algorithms, HDMI 2.1 eARC decoders, and timing controller (T-CON) driving row/column column gate drivers."
      },
      {
        "id": "speaker",
        "name": "Stereo Speakers",
        "color": 2830911,
        "geometry": {
          "type": "box",
          "args": [
            1,
            0.15,
            0.15
          ]
        },
        "position": [
          0,
          -0.65,
          -0.05
        ],
        "description": "Electromagnetic sound transducers with tuned bass chambers producing dynamic stereo audio, dialogue clarity, and surround sound effects.",
        "partCategory": "Acoustic Sound Transducers",
        "finish": "Neodymium Drivers in Bass Reflex Chamber",
        "dimensions": "140 × 45 × 35 mm (Dual Module)",
        "simple": "Stereo speakers that produce clear dialogue, music, and sound effects.",
        "technical": "Down-firing full-range stereo acoustic modules with neodymium magnets and passive bass radiators delivering 20W RMS output."
      },
      {
        "id": "stand",
        "name": "Mount Stand",
        "color": 9741240,
        "geometry": {
          "type": "box",
          "args": [
            0.5,
            0.4,
            0.4
          ]
        },
        "position": [
          0,
          -1,
          0
        ],
        "description": "Sturdy weighted metal base supporting the television securely on media consoles, preventing tipping and providing swivel adjustment.",
        "partCategory": "Structural Counterweight Stand",
        "finish": "Brushed Die-Cast Aluminum",
        "dimensions": "550 × 260 × 60 mm",
        "simple": "The weighted metal base that holds the TV upright safely on a table.",
        "technical": "Rigid die-cast aluminum pedestal base providing center-of-gravity ballast and anti-tip stability."
      }
    ]
  },
  "mobile-phone": {
    "label": "Flagship Smartphone",
    "category": "Electronics",
    "icon": "📱",
    "viewRadius": 4,
    "explodeDistance": 0.9,
    "parts": [
      {
        "id": "body",
        "name": "Body / Frame",
        "color": 2830911,
        "geometry": {
          "type": "box",
          "args": [
            0.9,
            1.8,
            0.15
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "transparent": true,
        "opacity": 0.18,
        "description": "Aerospace-grade aluminum chassis with integrated antenna bands that protects internal electronic silicon and provides structural rigidity.",
        "partCategory": "Aerospace Structural Chassis",
        "finish": "Grade-5 Titanium & Ceramic Shield",
        "dimensions": "146.7 × 71.5 × 7.8 mm",
        "simple": "The sleek outer frame and glass body that protects internal electronics from drops and water.",
        "technical": "Precision CNC-machined titanium-aluminum unibody chassis with IP68 water/dust ingress sealing and internal structural ribbing."
      },
      {
        "id": "screen",
        "name": "Touchscreen Display",
        "color": 658964,
        "geometry": {
          "type": "box",
          "args": [
            0.82,
            1.7,
            0.02
          ]
        },
        "position": [
          0,
          0,
          0.09
        ],
        "description": "High-refresh-rate OLED capacitive multi-touch display supporting millions of vibrant colors and responsive finger gesture recognition.",
        "partCategory": "Flexible OLED Display & Digitizer",
        "finish": "Ceramic Shield Glass & Oleophobic Coating",
        "dimensions": "6.1-Inch (1,179 × 2,556 Pixels)",
        "simple": "The sharp touch-sensitive screen where you view apps, tap, and swipe.",
        "technical": "LTPO Super Retina OLED display capable of dynamic 1–120 Hz ProMotion refresh rates and 2,000 nits peak outdoor brightness with capacitive touch sensing."
      },
      {
        "id": "battery",
        "name": "Lithium-Ion Battery",
        "color": 1844273,
        "geometry": {
          "type": "box",
          "args": [
            0.6,
            1,
            0.05
          ]
        },
        "position": [
          0,
          -0.1,
          -0.02
        ],
        "description": "High-density rechargeable lithium polymer cell that supplies regulated electrical energy to all onboard sensors and computing modules.",
        "partCategory": "Lithium-Ion Polymer Chemical Cell",
        "finish": "Laminated Aluminum Pouch Cell",
        "dimensions": "88.0 × 45.0 × 4.2 mm (3,274 mAh)",
        "simple": "A rechargeable chemical battery providing all-day power for the phone.",
        "technical": "Single-cell lithium cobalt oxide (LiCoO2) polymer pouch battery delivering 3,274 mAh at 3.87V nominal with integrated PCM overcurrent protection."
      },
      {
        "id": "chip",
        "name": "SoC Processor Chip",
        "color": 3718648,
        "geometry": {
          "type": "box",
          "args": [
            0.25,
            0.25,
            0.03
          ]
        },
        "position": [
          0.2,
          0.5,
          -0.02
        ],
        "description": "System-on-Chip (SoC) combining CPU cores, neural AI acceleration, GPU silicon, and wireless modem onto a microscopic semiconductor die.",
        "partCategory": "System-on-Chip (SoC) Processor",
        "finish": "3nm Silicon Die & Integrated Heat Spreader",
        "dimensions": "12.5 × 12.0 × 0.8 mm",
        "simple": "The central chip containing the CPU, graphics, and AI engine powering all apps and games.",
        "technical": "Monolithic 3-nanometer SoC integrating a 6-core 64-bit CPU, 6-core GPU with hardware ray tracing, and a 16-core Neural Engine processing 35 trillion operations/sec."
      },
      {
        "id": "camera",
        "name": "Camera Module",
        "color": 9741240,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.08,
            0.08,
            0.03,
            16
          ]
        },
        "position": [
          -0.28,
          0.75,
          -0.09
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Multi-element optical glass lens paired with a high-resolution CMOS image sensor and optical image stabilization (OIS) for vivid photography.",
        "partCategory": "Multi-Sensor Optical Imaging System",
        "finish": "Sapphire Crystal Lenses & Magnetics",
        "dimensions": "32.0 × 30.0 × 8.5 mm Module",
        "simple": "The multi-lens camera module that takes high-resolution photos and steady 4K videos.",
        "technical": "Triple-camera array with sensor-shift optical image stabilization (OIS), 48MP quad-pixel sensor, f/1.78 7-element lens, and LiDAR depth scanner."
      }
    ]
  },
  "refrigerator": {
    "label": "Modern Refrigerator",
    "category": "Appliances",
    "icon": "🧊",
    "viewRadius": 6.5,
    "explodeDistance": 1.3,
    "parts": [
      {
        "id": "body",
        "name": "Insulated Cabinet",
        "color": 14870768,
        "geometry": {
          "type": "box",
          "args": [
            1.6,
            2.6,
            1.4
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "transparent": true,
        "opacity": 0.16,
        "description": "Double-walled steel outer casing filled with dense polyurethane foam insulation to prevent ambient room heat from infiltrating the cold interior.",
        "partCategory": "Insulated Cabinet Enclosure",
        "finish": "Pre-Coated Steel & Cyclopentane Foam",
        "dimensions": "600 × 650 × 1,750 mm (Gross 380L)",
        "simple": "The insulated outer cabinet that keeps cool air inside and prevents room heat from warming up your food.",
        "technical": "Double-walled cabinet structure injected with high-density polyurethane rigid foam insulation (thermal conductivity k ~ 0.020 W/m·K) to minimize ambient thermal leakage."
      },
      {
        "id": "door",
        "name": "Sealed Door",
        "color": 13358561,
        "geometry": {
          "type": "box",
          "args": [
            1.55,
            2.5,
            0.1
          ]
        },
        "position": [
          0,
          0,
          0.72
        ],
        "description": "Insulated door with airtight perimeter magnetic gaskets that seal the compartment, preventing cold air leakage and condensation.",
        "partCategory": "Sealed Magnetic Door Assembly",
        "finish": "Fingerprint-Resistant Stainless Steel",
        "dimensions": "595 × 1,720 × 65 mm",
        "simple": "The front door with an airtight magnetic rubber seal that keeps warm air from leaking into the fridge.",
        "technical": "Hinged stainless-steel door panel fitted with peripheral flexible PVC magnetic gasket ensuring continuous hermetic sealing against cabinet face."
      },
      {
        "id": "compressor",
        "name": "Compressor Pump",
        "color": 2830911,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.3,
            0.3,
            0.35,
            20
          ]
        },
        "position": [
          0.5,
          -1.15,
          -0.4
        ],
        "description": "Electric motor pump that pressurizes refrigerant gas, raising its temperature and pumping it through the closed thermodynamic cooling loop.",
        "partCategory": "Vapor-Compression Refrigerant Pump",
        "finish": "Cast Iron Housing & Vibration Dampers",
        "dimensions": "220 × 180 × 190 mm (1/5 HP)",
        "simple": "The motor pump at the back that compresses refrigerant gas to circulate cold air through the refrigerator.",
        "technical": "Hermetic reciprocating inverter compressor using R600a (isobutane) refrigerant, raising suction vapor pressure and temperature via polytropic compression."
      },
      {
        "id": "coils",
        "name": "Condenser & Evaporator Coils",
        "color": 9741240,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.35,
            0.35,
            0.05,
            20
          ]
        },
        "position": [
          0,
          -1.2,
          -0.6
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Heat exchange tubing where refrigerant expands into cold vapor to absorb internal heat, then condenses outdoors to expel warmth.",
        "partCategory": "Condenser & Evaporator Heat Exchanger",
        "finish": "Copper Tubing with Aluminum Fins",
        "dimensions": "Evaporator: 480 × 260 × 45 mm",
        "simple": "Tubes that release heat outside on the back and absorb warmth from inside the fridge to keep it cold.",
        "technical": "Dual heat exchangers: rear air-cooled wire-on-tube condenser rejecting latent heat of condensation, and finned evaporator absorbing latent heat of vaporization."
      },
      {
        "id": "shelf-top",
        "name": "Upper Tempered Shelf",
        "color": 3718648,
        "geometry": {
          "type": "box",
          "args": [
            1.4,
            0.05,
            1.1
          ]
        },
        "position": [
          0,
          0.3,
          0
        ],
        "description": "Spill-proof tempered safety glass shelf designed for organized, hygienic food and beverage storage with clear visibility.",
        "partCategory": "Tempered Glass Storage Shelf",
        "finish": "Thermal-Toughened Float Glass",
        "dimensions": "520 × 380 × 4.0 mm (Load 25 kg)",
        "simple": "A sturdy glass shelf in the upper section for storing drinks, dairy, and everyday food containers.",
        "technical": "Spill-proof tempered safety glass shelf with injection-molded front retainer lip capable of supporting concentrated 25 kg static loads without deflection."
      },
      {
        "id": "shelf-bottom",
        "name": "Lower Storage Shelf",
        "color": 3718648,
        "geometry": {
          "type": "box",
          "args": [
            1.4,
            0.05,
            1.1
          ]
        },
        "position": [
          0,
          -0.4,
          0
        ],
        "description": "Reinforced lower shelf positioned above the vegetable crisper bins, engineered to safely support heavy cookware and containers.",
        "partCategory": "Crisper Cover & Heavy Storage Shelf",
        "finish": "Thermal-Toughened Safety Glass",
        "dimensions": "520 × 420 × 4.0 mm (Load 30 kg)",
        "simple": "The lower glass shelf covering the humidity-controlled vegetable and fruit crisper drawer.",
        "technical": "Heavy-duty tempered glass shelf serving as the upper boundary seal for the vegetable humidity drawer, maintaining 85–90% relative humidity."
      }
    ]
  },
  "car": {
    "label": "Automobile Powertrain",
    "category": "Vehicles",
    "icon": "🚗",
    "viewRadius": 7,
    "explodeDistance": 1.5,
    "parts": [
      {
        "id": "chassis",
        "name": "Chassis / Frame",
        "color": 9741240,
        "geometry": {
          "type": "box",
          "args": [
            1,
            0.5,
            2.6
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "transparent": true,
        "opacity": 0.2,
        "description": "High-strength steel unibody platform providing torsional rigidity, crash crumple zones, and mounting fixtures for suspension and drivetrain.",
        "partCategory": "Structural Load-Bearing Chassis",
        "finish": "E-Coated Advanced High-Strength Steel",
        "dimensions": "Wheelbase 2,850 mm | Track 1,620 mm",
        "simple": "The rigid structural backbone of the vehicle that supports the body, engine, and suspension while protecting passengers.",
        "technical": "High-strength hydroformed steel ladder/unibody chassis engineered for torsional rigidity (>25,000 Nm/deg) with crumple zones engineered to absorb kinetic impact energy."
      },
      {
        "id": "cabin",
        "name": "Cabin / Passenger Shell",
        "color": 3718648,
        "geometry": {
          "type": "box",
          "args": [
            0.9,
            0.5,
            1.2
          ]
        },
        "position": [
          0,
          0.5,
          -0.1
        ],
        "transparent": true,
        "opacity": 0.25,
        "description": "Reinforced passenger safety cage with aerodynamic glass windows, ergonomic seating, climate control, and digital driving controls.",
        "partCategory": "Passenger Safety Cell & Body",
        "finish": "Galvanized Stamped Steel & Enamel Paint",
        "dimensions": "4,750 × 1,850 × 1,450 mm",
        "simple": "The outer passenger compartment and roof that shelters occupants in comfort and safety.",
        "technical": "Stiff passenger safety cell reinforced with ultra-high-strength boron steel B-pillars and side impact intrusion beams."
      },
      {
        "id": "engine",
        "name": "Engine / Power Unit",
        "color": 2830911,
        "geometry": {
          "type": "box",
          "args": [
            0.7,
            0.4,
            0.6
          ]
        },
        "position": [
          0,
          0.05,
          1
        ],
        "description": "Powerplant converting chemical fuel combustion or electrical battery energy into rotational mechanical torque to propel the vehicle.",
        "partCategory": "Internal Combustion Powertrain",
        "finish": "Cast Aluminum Alloy & Spheroidal Iron",
        "dimensions": "580 × 520 × 640 mm | 2.0L Displacement",
        "simple": "The powerhouse of the car that burns fuel and air to create rotating motion that drives the wheels.",
        "technical": "Four-stroke internal combustion engine operating on the Otto cycle (Intake, Compression, Power, Exhaust). Features dual overhead camshafts (DOHC), direct gasoline injection, and variable valve timing yielding high thermal efficiency."
      },
      {
        "id": "fuel-tank",
        "name": "Fuel Tank / Battery Pack",
        "color": 16098851,
        "geometry": {
          "type": "box",
          "args": [
            0.6,
            0.3,
            0.5
          ]
        },
        "position": [
          0,
          -0.1,
          -1
        ],
        "description": "Reinforced energy storage reservoir holding liquid fuel or high-voltage lithium battery cells that feed the vehicle powertrain.",
        "partCategory": "High-Density Fuel Storage Reservoir",
        "finish": "Multi-Layer High-Density Polyethylene",
        "dimensions": "850 × 550 × 260 mm (Capacity 65 Liters)",
        "simple": "A sealed container that safely stores gasoline or diesel to feed the engine.",
        "technical": "Multi-layer blow-molded HDPE fuel reservoir with EVAP vapor recovery canister, roll-over check valves, and internal submerged high-pressure fuel pump."
      },
      {
        "id": "wheel-fl",
        "name": "Front-Left Wheel",
        "color": 1844273,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.3,
            0.3,
            0.25,
            20
          ]
        },
        "position": [
          0.55,
          -0.3,
          0.85
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "description": "Steering and braking wheel assembly with pneumatic rubber tire, alloy rim, disc brake rotor, and independent suspension strut.",
        "partCategory": "Front-Left Wheel & Steering Assembly",
        "finish": "Clear-Coated Forged Alloy & Vulcanized Rubber",
        "dimensions": "225/45R18 (Ø 660 mm × 225 mm)",
        "simple": "The front-left wheel and tire providing road grip, steering direction, and braking.",
        "technical": "Forged aluminum-alloy rim mounted with steel-belted radial tire; connects via steering knuckle, MacPherson strut, and ventilated disc brake rotor."
      },
      {
        "id": "wheel-fr",
        "name": "Front-Right Wheel",
        "color": 1844273,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.3,
            0.3,
            0.25,
            20
          ]
        },
        "position": [
          -0.55,
          -0.3,
          0.85
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "description": "Front-right steering wheel providing cornering grip, directional control, and high-performance front axle stopping power.",
        "partCategory": "Front-Right Wheel & Steering Assembly",
        "finish": "Clear-Coated Forged Alloy & Vulcanized Rubber",
        "dimensions": "225/45R18 (Ø 660 mm × 225 mm)",
        "simple": "The front-right wheel and tire providing road grip, steering direction, and braking.",
        "technical": "Matching front-right wheel assembly linking to rack-and-pinion steering tie rod and ABS wheel speed sensor."
      },
      {
        "id": "wheel-bl",
        "name": "Rear-Left Wheel",
        "color": 1844273,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.3,
            0.3,
            0.25,
            20
          ]
        },
        "position": [
          0.55,
          -0.3,
          -0.85
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "description": "Rear-left drive and stability wheel maintaining rear axle traction, lateral road grip, and shock absorption over bumps.",
        "partCategory": "Rear-Left Drive Wheel & Suspension",
        "finish": "Clear-Coated Forged Alloy & Vulcanized Rubber",
        "dimensions": "225/45R18 (Ø 660 mm × 225 mm)",
        "simple": "The rear-left wheel that transmits propulsion power to the pavement and cushions road bumps.",
        "technical": "Rear driven wheel coupled via multi-link independent suspension and CV half-shaft transmitting drive torque."
      },
      {
        "id": "wheel-br",
        "name": "Rear-Right Wheel",
        "color": 1844273,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.3,
            0.3,
            0.25,
            20
          ]
        },
        "position": [
          -0.55,
          -0.3,
          -0.85
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "description": "Rear-right wheel transferring drive torque smoothly to the pavement and stabilizing vehicle balance during acceleration.",
        "partCategory": "Rear-Right Drive Wheel & Suspension",
        "finish": "Clear-Coated Forged Alloy & Vulcanized Rubber",
        "dimensions": "225/45R18 (Ø 660 mm × 225 mm)",
        "simple": "The rear-right wheel that transmits propulsion power to the pavement and cushions road bumps.",
        "technical": "Matching rear-right drive wheel assembly with solid disc brake and integrated electronic parking brake caliper."
      }
    ]
  },
  "bicycle": {
    "label": "Road Bicycle",
    "category": "Vehicles",
    "icon": "🚲",
    "viewRadius": 18,
    "explodeDistance": 6,
    "parts": [
      {
        "id": "frame",
        "name": "Diamond Frame",
        "color": 3718648,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.15,
            0.15,
            6,
            16
          ]
        },
        "position": [
          0,
          2.5,
          0
        ],
        "rotation": [
          0,
          0,
          0.7853981633974483
        ],
        "description": "The core structural backbone of the bicycle connecting the front fork, pedals, and rear wheel hub. It distributes rider weight evenly and absorbs road vibrations.",
        "partCategory": "Lightweight Diamond Frame",
        "finish": "Double-Butted 6061-T6 Aluminum",
        "dimensions": "Frame Size 54 cm | Wheelbase 990 mm",
        "simple": "The main metal framework that holds the bicycle together and connects all the parts.",
        "technical": "Dual-triangle diamond geometry constructed of double-butted 6061-T6 aluminum or seamless carbon fiber, optimizing vertical compliance for rider comfort while resisting lateral pedaling deflection."
      },
      {
        "id": "front-wheel",
        "name": "Front Wheel",
        "color": 2830911,
        "geometry": {
          "type": "cylinder",
          "args": [
            2.2,
            2.2,
            0.35,
            32
          ]
        },
        "position": [
          4,
          2.2,
          0
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Provides steering directional control and forward rolling motion, fitted with rubber pneumatic tire and spoke tension system.",
        "partCategory": "Front Steered Wheel & Quick-Release Hub",
        "finish": "Anodized Double-Wall Alloy & Stainless Spokes",
        "dimensions": "700c (Ø 622 mm × 25 mm Tire)",
        "simple": "The front wheel that steers the bicycle and rolls over road surfaces.",
        "technical": "32-spoke radially laced 700c rim with cartridge sealed bearing hub, absorbing road shocks and stabilizing steering via gyroscopic precession."
      },
      {
        "id": "back-wheel",
        "name": "Rear Wheel",
        "color": 2830911,
        "geometry": {
          "type": "cylinder",
          "args": [
            2.2,
            2.2,
            0.35,
            32
          ]
        },
        "position": [
          -4,
          2.2,
          0
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "The driven wheel attached to the rear cassette, transforming chain rotation from pedal power into forward propulsion.",
        "partCategory": "Rear Driven Wheel & Cassette Hub",
        "finish": "Anodized Double-Wall Alloy & Stainless Spokes",
        "dimensions": "700c (Ø 622 mm × 25 mm Tire)",
        "simple": "The rear wheel that receives pedaling power from the chain to propel the bicycle forward.",
        "technical": "3-cross tangential spoked rear wheel carrying an 11-speed freehub cassette, transferring driving torque efficiently to the road surface."
      },
      {
        "id": "handlebar",
        "name": "Handlebar & Stem",
        "color": 9741240,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.15,
            0.15,
            3.5,
            16
          ]
        },
        "position": [
          3.2,
          4.8,
          0
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Steering interface gripped by the cyclist, housing the brake levers and gear shifters for navigation.",
        "partCategory": "Steering Cockpit & Drop Handlebars",
        "finish": "Shot-Peened Anodized Aluminum",
        "dimensions": "Width 420 mm | Clamp Ø 31.8 mm",
        "simple": "The handlebars used by the rider to steer, balance, and reach the brake and gear levers.",
        "technical": "Aerodynamic road drop handlebar clamped to an alloy stem, allowing multiple hand positions for ergonomic leverage and aerodynamic posture."
      },
      {
        "id": "seat",
        "name": "Bicycle Saddle",
        "color": 1976635,
        "geometry": {
          "type": "box",
          "args": [
            1.8,
            0.4,
            1
          ]
        },
        "position": [
          -1.6,
          4.3,
          0
        ],
        "rotation": [
          0,
          0,
          0.1
        ],
        "description": "Ergonomic seat supporting the cyclist posture and pedaling leverage mounted atop the adjustable seatpost.",
        "partCategory": "Ergonomic Saddle & Seatpost",
        "finish": "Microfiber Cover & Carbon-Reinforced Base",
        "dimensions": "275 × 145 mm | Post Ø 27.2 mm",
        "simple": "The padded seat that supports the rider's weight during cycling.",
        "technical": "Anatomically contoured bicycle saddle with pelvic relief channel supported on hollow titanium rails and an adjustable aluminum seatpost."
      },
      {
        "id": "pedals",
        "name": "Pedals & Crankset",
        "color": 16098851,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.5,
            0.5,
            1.4,
            16
          ]
        },
        "position": [
          -0.5,
          1.3,
          0
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Mechanical levers rotated by rider foot effort, driving the front chainring gear.",
        "partCategory": "Crankset & Pedaling Lever Mechanism",
        "finish": "Forged Aluminum Alloy & Cro-Mo Spindles",
        "dimensions": "Crank Arm Length: 172.5 mm",
        "simple": "The foot pedals and metal arms you push with your feet to spin the chain.",
        "technical": "Pair of 172.5 mm forged alloy crank arms rotating in a sealed bottom bracket bearing, converting reciprocating leg force into rotational torque."
      },
      {
        "id": "chain",
        "name": "Drive Chain & Sprocket",
        "color": 6583435,
        "geometry": {
          "type": "box",
          "args": [
            3.8,
            0.2,
            0.15
          ]
        },
        "position": [
          -2.2,
          1.3,
          0.3
        ],
        "description": "Interlinked metal roller chain transferring torque from the front pedal crank to the rear wheel cassette.",
        "partCategory": "Roller Chain Mechanical Transmission",
        "finish": "Heat-Treated Chrome-Plated Steel",
        "dimensions": "Pitch 12.7 mm (1/2\") × Width 5.5 mm",
        "simple": "The metal roller chain that transfers the pedaling power from your feet to spin the rear wheel.",
        "technical": "Bushed 1/2\" pitch roller chain engaging tooth profiles on the front chainring and rear cassette sprockets, transferring rider torque with >98% mechanical transmission efficiency."
      }
    ]
  },
  "laptop": {
    "label": "Precision Laptop",
    "category": "Electronics",
    "icon": "💻",
    "viewRadius": 12,
    "explodeDistance": 4,
    "parts": [
      {
        "id": "screen",
        "name": "Display Screen (Lid)",
        "color": 3718648,
        "geometry": {
          "type": "box",
          "args": [
            5,
            3.4,
            0.2
          ]
        },
        "position": [
          0,
          2.2,
          -1.6
        ],
        "rotation": [
          -0.35,
          0,
          0
        ],
        "description": "High-definition LED/OLED visual display panel housed inside an aluminum protective lid enclosure.",
        "partCategory": "Display Screen & Aluminum Lid",
        "finish": "Anodized CNC Aluminum & IPS Panel",
        "dimensions": "312 × 221 × 4.2 mm (14.2\" Display)",
        "simple": "The slim display lid that opens up to show high-resolution pictures, videos, and apps.",
        "technical": "14.2-inch Liquid Retina IPS display (3024 × 1964 resolution) with mini-LED backlighting, 120 Hz ProMotion variable refresh, and 1,600 nits peak HDR brightness."
      },
      {
        "id": "hinge",
        "name": "Display Hinge",
        "color": 9741240,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.12,
            0.12,
            4.4,
            16
          ]
        },
        "position": [
          0,
          0.6,
          -1.6
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "description": "Friction torque hinge allowing smooth opening and closing while routing video data cables between base and screen.",
        "partCategory": "Friction Torque Display Hinge",
        "finish": "Manganese-Alloy Spring Steel",
        "dimensions": "Length: 260 mm | Barrel Ø 6.5 mm",
        "simple": "The smooth metal pivot that lets you open, angle, and close the laptop screen with one finger.",
        "technical": "Dual balanced friction torque hinges with internal routing conduits for eDP display ribbon cables and Wi-Fi antenna coax leads, cycle-tested to 30,000 openings."
      },
      {
        "id": "keyboard",
        "name": "Keyboard Deck",
        "color": 2830911,
        "geometry": {
          "type": "box",
          "args": [
            4.6,
            0.1,
            2
          ]
        },
        "position": [
          0,
          0.55,
          -0.4
        ],
        "description": "Scissor-switch or mechanical input matrix allowing alphanumeric typing and system shortcut interaction.",
        "partCategory": "Scissor-Switch Backlit Keyboard",
        "finish": "Laser-Etched PBT Keycaps",
        "dimensions": "275 × 110 × 4.5 mm",
        "simple": "The backlit keyboard used for typing documents, emails, and computer commands.",
        "technical": "Full-pitch scissor-switch keyboard mechanism with 1.0 mm key travel, individual white LED backlighting, and integrated capacitive power/biometric sensor."
      },
      {
        "id": "trackpad",
        "name": "Multi-touch Trackpad",
        "color": 6583435,
        "geometry": {
          "type": "box",
          "args": [
            1.6,
            0.08,
            1.1
          ]
        },
        "position": [
          0,
          0.52,
          1.1
        ],
        "description": "Glass capacitive touch surface registering multi-finger gestures, pointer clicks, and haptic feedback.",
        "partCategory": "Haptic Force-Touch Trackpad",
        "finish": "Chemically Etched Matte Glass",
        "dimensions": "130 × 82 × 3.5 mm",
        "simple": "The smooth glass touch area that responds to finger swipes, taps, and clicks with realistic vibrations.",
        "technical": "Multi-touch capacitive sensor with four peripheral strain gauges and linear resonant haptic actuators (taptic engine) simulating realistic mechanical clicks."
      },
      {
        "id": "motherboard",
        "name": "Motherboard & Processor",
        "color": 2060106,
        "geometry": {
          "type": "box",
          "args": [
            3.6,
            0.1,
            1.8
          ]
        },
        "position": [
          0,
          0.25,
          -0.4
        ],
        "description": "The primary printed circuit board holding CPU, GPU, RAM chips, SSD storage, and thermal cooling heatpipes.",
        "partCategory": "Mainboard & Vapor Chamber Assembly",
        "finish": "High-Density HDI PCB & Copper Pipe",
        "dimensions": "240 × 120 × 1.2 mm",
        "simple": "The ultra-compact circuit board that houses the processor, memory chips, and copper cooling pipes.",
        "technical": "12-layer High Density Interconnect (HDI) logic board integrating SoC processor with unified memory architecture (UMA) and ultra-thin sintered copper heatpipes."
      },
      {
        "id": "battery",
        "name": "Lithium Battery Cells",
        "color": 16098851,
        "geometry": {
          "type": "box",
          "args": [
            4.2,
            0.15,
            1.2
          ]
        },
        "position": [
          0,
          0.22,
          1
        ],
        "description": "Rechargeable multi-cell lithium polymer chemical battery powering the laptop during untethered operation.",
        "partCategory": "Multi-Cell Lithium-Polymer Battery",
        "finish": "Laminated Aluminum Pouch Multi-Pack",
        "dimensions": "280 × 95 × 4.5 mm (70 Wh)",
        "simple": "Rechargeable battery packs filling the inside of the laptop to give up to 18 hours of wireless work.",
        "technical": "6-cell lithium-ion polymer pouch battery pack configured in 3S2P delivering 70 Watt-hours at 11.4V nominal with integrated battery management system (BMS)."
      }
    ]
  },
  "washing-machine": {
    "label": "Front-Load Washer",
    "category": "Appliances",
    "icon": "🌀",
    "viewRadius": 14,
    "explodeDistance": 5,
    "parts": [
      {
        "id": "drum",
        "name": "Stainless Steel Drum",
        "color": 9741240,
        "geometry": {
          "type": "cylinder",
          "args": [
            1.8,
            1.8,
            2.8,
            32
          ]
        },
        "position": [
          0,
          0.2,
          0
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Perforated spin basket holding clothes, rotating at high RPM to agitate water and centrifuge liquid out during spin cycles.",
        "partCategory": "Centrifugal Spin Basket",
        "finish": "Laser-Perforated AISI 304 Stainless Steel",
        "dimensions": "Basket Ø 500 mm × Depth 340 mm (65L)",
        "simple": "The perforated metal drum that rotates clothes in water and detergent, spinning fast to remove moisture.",
        "technical": "Dynamic stainless-steel drum with wave paddles and micro-perforations rotating up to 1,400 RPM, generating centrifugal forces exceeding 300 Gs during extraction."
      },
      {
        "id": "door",
        "name": "Front Glass Porthole Door",
        "color": 3718648,
        "geometry": {
          "type": "cylinder",
          "args": [
            1.4,
            1.4,
            0.3,
            32
          ]
        },
        "position": [
          0,
          0.2,
          2.1
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "transparent": true,
        "opacity": 0.8,
        "description": "Watertight sealed tempered glass door with electromagnetic safety lock allowing visibility into the wash cycle.",
        "partCategory": "Porthole Door & Gasket Hatch",
        "finish": "Tempered Borosilicate Glass & EPDM Gasket",
        "dimensions": "Outer Ring Ø 480 mm | Glass Ø 360 mm",
        "simple": "The round glass front door that seals tightly to keep water from leaking out while clothes wash.",
        "technical": "Double-glazed tempered glass porthole with concave deflection profile and electromagnetic bi-metal safety interlock preventing opening during cycle."
      },
      {
        "id": "control-panel",
        "name": "Digital Control Panel & Dial",
        "color": 2830911,
        "geometry": {
          "type": "box",
          "args": [
            4.2,
            1,
            0.4
          ]
        },
        "position": [
          0,
          2.3,
          1.9
        ],
        "description": "User interface featuring rotary program selectors, LED timing readouts, temperature, and spin speed settings.",
        "partCategory": "Digital User Interface & Rotary Encoder",
        "finish": "UV-Coated Acrylic & Capacitive LED Display",
        "dimensions": "595 × 120 × 40 mm",
        "simple": "The dial and digital touch display where you select wash cycles, water temperatures, and spin speeds.",
        "technical": "Microcontroller user interface panel with optical rotary encoder selector, capacitive touch sensors, and LED segment timer display."
      },
      {
        "id": "motor",
        "name": "Direct Drive Inverter Motor",
        "color": 16098851,
        "geometry": {
          "type": "cylinder",
          "args": [
            1.1,
            1.1,
            1.2,
            24
          ]
        },
        "position": [
          0,
          0.2,
          -1.8
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Brushless DC electric motor attached straight to the rear drum shaft without belts, delivering quiet high-torque rotation.",
        "partCategory": "Direct-Drive Permanent Magnet Motor",
        "finish": "Brushless DC Stator & Neodymium Rotor",
        "dimensions": "Stator Ø 280 mm × Depth 55 mm",
        "simple": "A quiet, powerful electric motor attached directly to the drum shaft without any belts.",
        "technical": "Brushless 3-phase permanent magnet direct drive motor (BLDC) mounted directly on drum shaft, eliminating pulley belts and delivering high torque at low acoustic noise."
      },
      {
        "id": "water-pump",
        "name": "Drainage Water Pump & Filter",
        "color": 2060106,
        "geometry": {
          "type": "box",
          "args": [
            1.2,
            1,
            1.2
          ]
        },
        "position": [
          1.2,
          -2.1,
          1.2
        ],
        "description": "Centrifugal pump that expels soapy waste water out through the rear discharge hose and traps lint debris.",
        "partCategory": "Centrifugal Drainage Pump & Lint Filter",
        "finish": "Glass-Filled Polypropylene & Neoprene",
        "dimensions": "160 × 120 × 110 mm (30W Flow 15 L/min)",
        "simple": "A small motorized pump that empties dirty water out through the drain hose and traps lint.",
        "technical": "Synchronous permanent-magnet centrifugal drain pump with debris impeller and accessible coin/lint filter chamber delivering 15 L/min discharge head."
      }
    ]
  },
  "air-conditioner": {
    "label": "Inverter Air Conditioner",
    "category": "Appliances",
    "icon": "❄️",
    "viewRadius": 16,
    "explodeDistance": 5.5,
    "parts": [
      {
        "id": "indoor-unit",
        "name": "Indoor Blower Unit",
        "color": 16317180,
        "geometry": {
          "type": "box",
          "args": [
            5.2,
            1.8,
            1.4
          ]
        },
        "position": [
          0,
          3.2,
          0
        ],
        "description": "Wall-mounted interior console containing air filters, motorized louvers, and the whisper-quiet cross-flow fan.",
        "partCategory": "Indoor Evaporator & Air Handler",
        "finish": "High-Impact Polystyrene (HIPS)",
        "dimensions": "820 × 280 × 215 mm",
        "simple": "The sleek white unit mounted on your wall that blows cool, dehumidified air into the room.",
        "technical": "Wall-mounted split air handler with motorized directional louvers, electrostatic dust filter, and low-noise tangential cross-flow fan moving up to 600 m³/h."
      },
      {
        "id": "cooling-coil",
        "name": "Evaporator Cooling Coil",
        "color": 3718648,
        "geometry": {
          "type": "box",
          "args": [
            4.6,
            1.2,
            0.8
          ]
        },
        "position": [
          0,
          3.2,
          -0.1
        ],
        "description": "Finned copper tubing where liquid refrigerant expands, absorbing heat from indoor room air and condensing humidity.",
        "partCategory": "Evaporator Heat Exchanger Coil",
        "finish": "Hydrophilic Blue-Fin Aluminum & Copper",
        "dimensions": "680 × 220 × 35 mm",
        "simple": "The chilled copper and aluminum fins inside that absorb heat and moisture from the room air.",
        "technical": "Multi-bend copper tube evaporator with hydrophilic blue-fin aluminum coatings promoting rapid condensate runoff and preventing microbial growth."
      },
      {
        "id": "outdoor-unit",
        "name": "Outdoor Condenser Casing",
        "color": 9741240,
        "geometry": {
          "type": "box",
          "args": [
            4.4,
            3.2,
            2
          ]
        },
        "position": [
          0,
          -2.2,
          0
        ],
        "description": "Weatherproof metal exterior housing containing the refrigerant compressor, expansion valve, and electrical inverter.",
        "partCategory": "Outdoor Condenser Casing",
        "finish": "Galvannealed Steel with Powder Coating",
        "dimensions": "780 × 540 × 290 mm",
        "simple": "The rugged metal unit installed outside that pumps refrigerant and expels heat into the outdoor air.",
        "technical": "Weather-resistant IPX4 powder-coated steel outdoor cabinet housing the hermetic rotary inverter compressor, condenser coil, and expansion valve."
      },
      {
        "id": "fan",
        "name": "Condenser Cooling Fan",
        "color": 2830911,
        "geometry": {
          "type": "cylinder",
          "args": [
            1.2,
            1.2,
            0.3,
            24
          ]
        },
        "position": [
          0.8,
          -2.2,
          1.1
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Heavy-duty axial propeller fan expelling rejected thermal heat outdoors across the condenser fins.",
        "partCategory": "Outdoor Axial Condenser Fan",
        "finish": "Glass-Fiber Reinforced Polypropylene",
        "dimensions": "Fan Ø 420 mm | 3 Aerodynamic Blades",
        "simple": "The large propeller fan on the outdoor unit that pushes hot air away from the metal coils.",
        "technical": "High-efficiency 3-blade axial fan driven by variable-speed DC motor, moving 1,800 m³/h of ambient air across condenser coils to dissipate heat."
      }
    ]
  },
  "airplane": {
    "label": "Commercial Airplane",
    "category": "Vehicles",
    "icon": "✈️",
    "viewRadius": 18,
    "explodeDistance": 5.5,
    "parts": [
      {
        "id": "fuselage",
        "name": "Fuselage",
        "color": 14870768,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.9,
            0.9,
            11,
            32
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "The primary aerodynamic cylindrical body housing the pressurized passenger cabin, cargo hold, and critical flight systems.",
        "partCategory": "Pressurized Semi-Monocoque Airframe",
        "finish": "Alclad 2024-T3 Aluminum & Polyurethane",
        "dimensions": "Length 37.6 m × Cabin Ø 3.95 m",
        "simple": "The long central body of the airplane that holds passengers, cargo, and controls.",
        "technical": "Pressurized semi-monocoque aerodynamic cylindrical fuselage composed of aluminum-lithium skin riveted over annular formers and longitudinal stringers, maintaining 8.6 psi cabin pressure differential at 38,000 ft."
      },
      {
        "id": "wings",
        "name": "Main Wings",
        "color": 9741240,
        "geometry": {
          "type": "box",
          "args": [
            12,
            0.18,
            2.4
          ]
        },
        "position": [
          0,
          -0.2,
          0.2
        ],
        "description": "High-lift aerodynamic airfoils engineered with internal fuel tanks, flaps, and slats to generate vertical lift during flight.",
        "partCategory": "Aerodynamic Lifting Airfoil",
        "finish": "Carbon Composite & 7075-T6 Spars",
        "dimensions": "Wingspan 35.8 m | Wing Area 125 m²",
        "simple": "The large aerodynamic wings that generate lift so the plane can rise and fly through the air.",
        "technical": "Supercritical airfoil lifting surfaces generating upward aerodynamic lift according to Bernoulli's principle and Newton's third law. Houses integral wet-wing fuel tanks, slats, and flaps."
      },
      {
        "id": "tail-fin",
        "name": "Vertical Tail Fin",
        "color": 3718648,
        "geometry": {
          "type": "box",
          "args": [
            0.18,
            2.6,
            2
          ]
        },
        "position": [
          0,
          1.8,
          -4.6
        ],
        "description": "The vertical stabilizer equipped with the rudder to provide directional yaw stability and navigational heading control.",
        "partCategory": "Vertical Stabilizer & Rudder",
        "finish": "Carbon-Fiber Reinforced Polymer (CFRP)",
        "dimensions": "Height: 6.4 m | Rudder Span 5.2 m",
        "simple": "The upright fin at the back that keeps the airplane flying straight and controls left/right turning (yaw).",
        "technical": "Vertical stabilizer fin and hinged hydraulic rudder providing directional yaw stability and trim compensation during engine-out operations."
      },
      {
        "id": "engine-left",
        "name": "Port Turbofan Engine",
        "color": 3359061,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.55,
            0.55,
            2.2,
            24
          ]
        },
        "position": [
          -3.2,
          -0.9,
          0.4
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "High-bypass turbofan jet engine mounted on the left wing compressing intake air to produce massive forward propulsion thrust.",
        "partCategory": "High-Bypass Turbofan Propulsion (Port)",
        "finish": "Single-Crystal Nickel Superalloy & Titanium",
        "dimensions": "Nacelle Length 3.2 m | Fan Ø 1.75 m",
        "simple": "The left jet engine that sucks in air, burns jet fuel, and blasts out hot thrust to fly the plane.",
        "technical": "High-bypass turbofan jet engine (bypass ratio 10:1) generating 27,000 lbf thrust; multi-stage axial compressor driven by high-pressure turbine."
      },
      {
        "id": "engine-right",
        "name": "Starboard Turbofan Engine",
        "color": 3359061,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.55,
            0.55,
            2.2,
            24
          ]
        },
        "position": [
          3.2,
          -0.9,
          0.4
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "High-bypass turbofan jet engine mounted on the right wing delivering balanced thrust and auxiliary electrical power.",
        "partCategory": "High-Bypass Turbofan Propulsion (Starboard)",
        "finish": "Single-Crystal Nickel Superalloy & Titanium",
        "dimensions": "Nacelle Length 3.2 m | Fan Ø 1.75 m",
        "simple": "The right jet engine providing balanced thrust and electrical/pneumatic power for the aircraft.",
        "technical": "Twin turbofan powerplant delivering matched symmetric thrust and driving integrated drive generators (IDGs) for aircraft electrical buses."
      },
      {
        "id": "landing-gear",
        "name": "Landing Gear",
        "color": 1976635,
        "geometry": {
          "type": "box",
          "args": [
            2.2,
            1,
            0.8
          ]
        },
        "position": [
          0,
          -1.3,
          -0.5
        ],
        "description": "Retractable undercarriage with hydraulic oleo shock struts and heavy-duty rubber wheels designed for runway takeoff and landing.",
        "partCategory": "Retractable Oleo-Pneumatic Gear",
        "finish": "High-Strength 300M Alloy Steel",
        "dimensions": "Strut Stroke 450 mm | Wheel Ø 1.05 m",
        "simple": "The heavy-duty wheels and shock absorbers that support the plane on the runway and fold away in flight.",
        "technical": "Tricycle retractable landing gear with oleo-pneumatic nitrogen/oil shock struts absorbing landing sink rates up to 10 ft/s, fitted with multi-disc carbon brakes."
      },
      {
        "id": "cockpit",
        "name": "Flight Deck Cockpit",
        "color": 165063,
        "geometry": {
          "type": "sphere",
          "args": [
            0.88,
            24,
            24
          ]
        },
        "position": [
          0,
          0.35,
          5
        ],
        "transparent": true,
        "opacity": 0.75,
        "description": "The forward flight deck containing pilot avionics, navigation multi-function displays, and fly-by-wire controls.",
        "partCategory": "Integrated Glass Cockpit Avionics",
        "finish": "Anti-Glare Polycarbonate & Instrument Paneling",
        "dimensions": "Flight Deck Volume ~8.5 m³",
        "simple": "The command cabin at the front where the pilots steer the aircraft using flight computers and displays.",
        "technical": "Dual-pilot flight deck featuring fly-by-wire flight control computers, Primary Flight Displays (PFD), Navigation Displays (ND), and autopilot flight directors."
      }
    ]
  },
  "smartwatch": {
    "label": "Smartwatch",
    "category": "High-End Devices",
    "icon": "⌚",
    "viewRadius": 5.5,
    "explodeDistance": 1.3,
    "parts": [
      {
        "id": "case",
        "name": "Watch Case",
        "color": 3359061,
        "geometry": {
          "type": "box",
          "args": [
            1.8,
            2.2,
            0.45
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "description": "Aerospace-grade titanium or aluminum enclosure providing water resistance, structural durability, and component shielding.",
        "partCategory": "Aerospace Grade Unibody Case",
        "finish": "Aerospace Grade 7000-Series Aluminum",
        "dimensions": "44.0 × 38.0 × 10.7 mm",
        "simple": "The sleek metal body of the watch that holds all electronic sensors and resists water.",
        "technical": "Precision CNC-milled 7000-series aluminum chassis with 50-meter ISO 22810 water resistance rating, acoustic speaker ports, and microphone cavity."
      },
      {
        "id": "display",
        "name": "Display Screen",
        "color": 988970,
        "geometry": {
          "type": "box",
          "args": [
            1.55,
            1.95,
            0.05
          ]
        },
        "position": [
          0,
          0,
          0.25
        ],
        "description": "High-brightness OLED capacitive touchscreen protected by scratch-resistant sapphire crystal glass.",
        "partCategory": "Always-On AMOLED Touchscreen",
        "finish": "Ion-X Strengthened Glass & AMOLED",
        "dimensions": "1.9-Inch (396 × 484 Pixels, 1,000 nits)",
        "simple": "The bright touch-sensitive face of the watch that shows notifications, heart rate, and apps.",
        "technical": "Low-temperature polycrystalline oxide (LTPO) AMOLED flexible display with 326 ppi pixel density, 1,000 nits peak brightness, and integrated touch sensor."
      },
      {
        "id": "crown",
        "name": "Digital Crown",
        "color": 16098851,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.22,
            0.22,
            0.28,
            20
          ]
        },
        "position": [
          0.98,
          0.45,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "description": "Precision rotary dial button with haptic feedback used for smooth scrolling, zooming, and interface navigation.",
        "partCategory": "Digital Crown Rotary Controller",
        "finish": "Micro-Grooved Aluminum & Optical Sensor",
        "dimensions": "Crown Ø 6.5 mm × Depth 2.2 mm",
        "simple": "The small rotating dial on the side used to scroll through menus and adjust volume with click vibrations.",
        "technical": "Micro-machined rotary encoder with optical angular sensing and linear haptic tactile pulse generation for precise interface navigation."
      },
      {
        "id": "strap",
        "name": "Watch Strap",
        "color": 1976635,
        "geometry": {
          "type": "box",
          "args": [
            1.4,
            4.4,
            0.16
          ]
        },
        "position": [
          0,
          0,
          -0.15
        ],
        "description": "Flexible fluoroelastomer sports band engineered for ergonomic wrist comfort, secure fastening, and daily durability.",
        "partCategory": "Interchangeable Sports Band",
        "finish": "Custom Fluoroelastomer Polymer",
        "dimensions": "Lug Width 22 mm | Length 210 mm",
        "simple": "The flexible, sweat-resistant silicone strap that keeps the watch securely fastened to your wrist.",
        "technical": "High-performance synthetic fluoroelastomer strap with pin-and-tuck closure, resistant to skin oils, perspiration, and UV degradation."
      },
      {
        "id": "battery",
        "name": "Lithium Battery",
        "color": 4674921,
        "geometry": {
          "type": "box",
          "args": [
            1.3,
            1.4,
            0.12
          ]
        },
        "position": [
          0,
          -0.1,
          -0.05
        ],
        "description": "Custom-shaped miniature lithium-polymer rechargeable cell delivering steady all-day power for processing and wireless radios.",
        "partCategory": "Miniature Lithium-Polymer Cell",
        "finish": "Laminated Foil Pouch Cell",
        "dimensions": "26.0 × 22.0 × 3.8 mm (308 mAh)",
        "simple": "The compact rechargeable battery inside that powers the watch for up to 18–36 hours.",
        "technical": "Custom shaped 308 mAh lithium-ion polymer cell operating at 3.85V nominal, supporting fast inductive magnetic charging."
      },
      {
        "id": "sensor",
        "name": "Heart-Rate Sensor",
        "color": 2278750,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.55,
            0.55,
            0.08,
            24
          ]
        },
        "position": [
          0,
          0,
          -0.26
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Optical bio-sensor cluster utilizing green and infrared LEDs with photodiodes to measure heart rate and blood oxygenation.",
        "partCategory": "Photoplethysmography (PPG) Sensor",
        "finish": "Zirconia Ceramic & Sapphire Crystal",
        "dimensions": "Sensor Cluster Ø 18.0 mm",
        "simple": "The glowing green and infrared lights on the back that monitor your heart rate and blood oxygen.",
        "technical": "Multi-wavelength optical sensor array with green and infrared LEDs paired with photodiodes measuring blood volume changes (PPG) and ECG cardiac electrical signals."
      }
    ]
  },
  "wireless-earbuds": {
    "label": "Wireless Earbuds",
    "category": "High-End Devices",
    "icon": "🎧",
    "viewRadius": 5,
    "explodeDistance": 1.35,
    "parts": [
      {
        "id": "shell-left",
        "name": "Left Earbud Shell",
        "color": 16317180,
        "geometry": {
          "type": "sphere",
          "args": [
            0.42,
            24,
            24
          ]
        },
        "position": [
          -0.95,
          0.45,
          0.25
        ],
        "description": "Acoustic in-ear enclosure housing the left sound canal, dual beamforming microphones, capacitive touch stem, and medical-grade silicone ear tip.",
        "partCategory": "Acoustic Enclosure (Left)",
        "finish": "High-Gloss Ceramic Polycarbonate",
        "dimensions": "30.9 × 21.8 × 24.0 mm (~5.3 g)",
        "simple": "The ergonomic left earbud that fits snugly in your ear, holding the audio speaker and microphones.",
        "technical": "Acoustically tuned vented polycarbonate shell with IPX4 sweat resistance, beamforming dual microphones, and capacitive touch stem."
      },
      {
        "id": "shell-right",
        "name": "Right Earbud Shell",
        "color": 16317180,
        "geometry": {
          "type": "sphere",
          "args": [
            0.42,
            24,
            24
          ]
        },
        "position": [
          0.95,
          0.45,
          0.25
        ],
        "description": "Mirrored acoustic in-ear shell housing the right sound chamber, proximity sensor, capacitive force sensor for gesture controls, and gold charging contacts.",
        "partCategory": "Acoustic Enclosure (Right)",
        "finish": "High-Gloss Ceramic Polycarbonate",
        "dimensions": "30.9 × 21.8 × 24.0 mm (~5.3 g)",
        "simple": "The matching right earbud providing stereo sound and active noise cancellation.",
        "technical": "Symmetric right earbud housing Bluetooth 5.3 SoC, custom audio amplifier, and inward-facing microphone for adaptive EQ."
      },
      {
        "id": "case",
        "name": "Charging Case",
        "color": 14870768,
        "geometry": {
          "type": "box",
          "args": [
            2.5,
            1.8,
            1.1
          ]
        },
        "position": [
          0,
          -0.65,
          -0.1
        ],
        "description": "Precision magnetic charging cradle with spring-tensioned clamshell lid, USB-C port, wireless induction charging coil, and multi-color status LED.",
        "partCategory": "Magnetic Charging Storage Case",
        "finish": "High-Gloss Polycarbonate Enclosure",
        "dimensions": "45.2 × 60.6 × 21.7 mm (~50.8 g)",
        "simple": "The pocket-sized charging case that protects the earbuds and recharges them when not in use.",
        "technical": "Molded clamshell charging case with neodymium magnetic retention docks, Qi wireless inductive receiver, and USB-C port."
      },
      {
        "id": "battery",
        "name": "Lithium Battery",
        "color": 4674921,
        "geometry": {
          "type": "box",
          "args": [
            1.8,
            0.9,
            0.4
          ]
        },
        "position": [
          0,
          -0.85,
          -0.12
        ],
        "description": "High-density 520mAh lithium-polymer pouch cell providing up to 30 hours of reserve listening power with integrated protection circuit module.",
        "partCategory": "Rechargeable Li-Ion Reserve Cell",
        "finish": "Laminated Aluminum Pouch Cell",
        "dimensions": "38.0 × 28.0 × 4.8 mm (520 mAh)",
        "simple": "The high-capacity battery inside the case providing multiple recharges for all-day listening.",
        "technical": "520 mAh lithium-polymer reserve battery cell delivering 30+ hours of reserve listening power with integrated safety PCM."
      },
      {
        "id": "driver",
        "name": "Speaker Driver",
        "color": 14251782,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.32,
            0.32,
            0.18,
            24
          ]
        },
        "position": [
          0,
          0.75,
          0.55
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Custom 11mm high-excursion dynamic audio transducer with N52 neodymium magnet, pure copper voice coil, and ultra-thin titanium composite diaphragm.",
        "partCategory": "Dynamic Audio Driver Transducer",
        "finish": "Titanium Composite & Neodymium N52",
        "dimensions": "Transducer Ø 11.0 mm × Depth 2.8 mm",
        "simple": "The miniature speaker inside that vibrates to produce rich bass, clear vocals, and detailed treble.",
        "technical": "Custom 11 mm dynamic acoustic driver featuring ultra-thin titanium composite diaphragm and N52 neodymium magnetic motor delivering 20 Hz – 20 kHz frequency response."
      }
    ]
  },
  "printer-3d": {
    "label": "3D Printer",
    "category": "High-End Devices",
    "icon": "🖨️",
    "viewRadius": 12,
    "explodeDistance": 3.5,
    "parts": [
      {
        "id": "frame",
        "name": "Structural Frame",
        "color": 3359061,
        "geometry": {
          "type": "box",
          "args": [
            3.8,
            4.2,
            3.6
          ]
        },
        "position": [
          0,
          1.8,
          0
        ],
        "transparent": true,
        "opacity": 0.18,
        "description": "Rigid aluminum extrusion gantry providing extreme torsional stability and mounting rails for orthogonal axes.",
        "partCategory": "Structural T-Slot Gantry",
        "finish": "Anodized 2040/2020 Aluminum Extrusion",
        "dimensions": "475 × 470 × 620 mm",
        "simple": "The rigid metal frame that supports the moving axes and keeps the print head steady.",
        "technical": "Rigid V-slot aluminum extrusion gantry providing torsional rigidity and precision linear motion guide rails for orthogonal X, Y, and Z axes."
      },
      {
        "id": "bed",
        "name": "Print Bed",
        "color": 16098851,
        "geometry": {
          "type": "box",
          "args": [
            2.8,
            0.15,
            2.8
          ]
        },
        "position": [
          0,
          0.2,
          0
        ],
        "description": "Heated aluminum platform topped with textured spring-steel PEI sheet to optimize first-layer adhesion and prevent warping.",
        "partCategory": "Heated Spring-Steel Print Bed",
        "finish": "Textured PEI Powder-Coated Spring Steel",
        "dimensions": "235 × 235 × 3.0 mm (Build 220×220 mm)",
        "simple": "The heated flat platform where melted plastic is laid down layer-by-layer to build the 3D model.",
        "technical": "Heated aluminum bed with 24V silicone heater pad (250W, up to 110°C) topped by removable magnetic textured PEI spring steel for thermal first-layer adhesion."
      },
      {
        "id": "extruder",
        "name": "Extruder & Nozzle",
        "color": 3718648,
        "geometry": {
          "type": "box",
          "args": [
            0.7,
            0.8,
            0.7
          ]
        },
        "position": [
          0,
          1.6,
          0
        ],
        "description": "Direct-drive printhead assembly containing filament feeder gears, thermal heatsink, heater block, and brass extrusion nozzle.",
        "partCategory": "Direct-Drive Hotend & Extruder",
        "finish": "CNC Brass Nozzle & Aluminum Heat Sink",
        "dimensions": "85 × 65 × 75 mm (Nozzle Ø 0.4 mm)",
        "simple": "The motorized print head that melts plastic filament at high temperature and squirts it out the nozzle.",
        "technical": "Direct-drive dual-gear extruder coupled to an all-metal bimetallic heatbreak and cartridge-heated brass nozzle (up to 300°C) with part-cooling blower."
      },
      {
        "id": "spool",
        "name": "Filament Spool",
        "color": 15680580,
        "geometry": {
          "type": "cylinder",
          "args": [
            1.1,
            1.1,
            0.6,
            24
          ]
        },
        "position": [
          1.8,
          3.8,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "description": "Top-mounted 1kg reel of 1.75mm thermoplastic printing filament smoothly feeding material into the extruder toolhead.",
        "partCategory": "Thermoplastic Filament Spool",
        "finish": "Extruded Polylactic Acid (PLA) 1.75 mm",
        "dimensions": "Spool Ø 200 mm × 65 mm (1.0 kg)",
        "simple": "A 1-kilogram reel of colorful plastic wire that is pulled into the extruder to build objects.",
        "technical": "1 kg spool of 1.75 mm diameter precision thermoplastic filament (PLA/PETG) with ±0.02 mm dimensional tolerance feeding into extruder runout sensor."
      },
      {
        "id": "steppers",
        "name": "Stepper Motors",
        "color": 1976635,
        "geometry": {
          "type": "box",
          "args": [
            0.8,
            0.8,
            0.8
          ]
        },
        "position": [
          -1.8,
          0.3,
          -1.6
        ],
        "description": "Precision brushless stepper motors driving reinforced timing belts and lead screws for sub-millimeter positioning accuracy.",
        "partCategory": "Hybrid Bipolar Stepper Motors",
        "finish": "NEMA 17 Powder-Coated Steel",
        "dimensions": "42 × 42 × 40 mm (NEMA 17 Standard)",
        "simple": "High-precision motors that move the print head and bed in microscopic, accurate steps.",
        "technical": "Bipolar hybrid stepper motors with 1.8° step angle (200 steps/rev) driven by silent TMC2209 stepper drivers with 1/256 microstepping interpolation."
      }
    ]
  },
  "mri-machine": {
    "label": "MRI Machine",
    "category": "Medical Devices",
    "icon": "🧲",
    "viewRadius": 14,
    "explodeDistance": 4,
    "parts": [
      {
        "id": "gantry",
        "name": "Main Magnet Bore & Gantry",
        "color": 16317180,
        "geometry": {
          "type": "cylinder",
          "args": [
            2.6,
            2.6,
            3.2,
            32
          ]
        },
        "position": [
          0,
          2.2,
          -0.6
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Superconducting cylindrical cryostat containing liquid helium coils that generate a homogeneous 3.0 Tesla magnetic field.",
        "partCategory": "Superconducting 3.0T Cryogenic Magnet",
        "finish": "Liquid Helium Cryostat & Polycarbonate Shell",
        "dimensions": "Bore Ø 70 cm | Outer Length 165 cm",
        "simple": "The large donut-shaped tunnel where patients lie down, containing a powerful magnet that sees inside the body.",
        "technical": "Superconducting solenoid magnet immersed in liquid helium cryostat (4.2 K), generating a highly homogeneous 3.0 Tesla static magnetic field (B0) to align nuclear spins of hydrogen protons in tissue."
      },
      {
        "id": "gradient-coils",
        "name": "Gradient Coils",
        "color": 3718648,
        "geometry": {
          "type": "cylinder",
          "args": [
            1.4,
            1.4,
            2.9,
            28
          ]
        },
        "position": [
          0,
          2.2,
          -0.6
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "transparent": true,
        "opacity": 0.35,
        "description": "Fast-switching electromagnetic coils modulating the magnetic field along X, Y, and Z axes for spatial imaging slice encoding.",
        "partCategory": "Spatial Encoding Gradient Coils",
        "finish": "Water-Cooled Epoxy Resin Cast Coil",
        "dimensions": "Inner Ø 65 cm | Slew Rate 200 T/m/s",
        "simple": "Magnetic coils inside the tunnel that switch on and off rapidly to pinpoint the exact 3D location of scanned tissues.",
        "technical": "Three-axis electromagnetic gradient coils (Gx, Gy, Gz) switching at high slew rates to modulate the static B0 field linearly, allowing frequency and phase encoding of NMR signals."
      },
      {
        "id": "patient-table",
        "name": "Patient Table",
        "color": 9741240,
        "geometry": {
          "type": "box",
          "args": [
            1.2,
            0.4,
            5.2
          ]
        },
        "position": [
          0,
          1.1,
          1.2
        ],
        "description": "Motorized non-magnetic carbon-fiber bed with hydraulic height and longitudinal drive positioning the patient inside the bore.",
        "partCategory": "Non-Magnetic Patient Positioning Couch",
        "finish": "Carbon-Fiber Composite & Low-Friction Bearings",
        "dimensions": "2,200 × 520 × 120 mm (Max Load 250 kg)",
        "simple": "A motorized table made of non-metal materials that smoothly slides the patient into the center of the scanner.",
        "technical": "Non-ferromagnetic carbon-fiber motorized examination bed with sub-millimeter longitudinal servo drive indexing patients into the magnet isocenter."
      },
      {
        "id": "control-console",
        "name": "Control Console",
        "color": 1976635,
        "geometry": {
          "type": "box",
          "args": [
            1.6,
            1.4,
            0.8
          ]
        },
        "position": [
          3.2,
          1,
          2.2
        ],
        "description": "Diagnostic workstation outside the RF shielded scan room where technicians configure scan protocols and reconstruct 3D slice data.",
        "partCategory": "Diagnostic Imaging Workstation",
        "finish": "Dual Clinical LCDs & Processing Rack",
        "dimensions": "1,400 × 800 × 1,100 mm Workstation",
        "simple": "The computer console in the control room where technologists set up scans and view 3D medical images.",
        "technical": "Host computing workstation outside the RF-shielded Faraday room, running pulse sequence controllers and GPU Fourier transform engines reconstructing slice datasets."
      }
    ]
  },
  "human-heart": {
    "label": "Human Heart",
    "category": "Science & Concepts",
    "icon": "🫀",
    "viewRadius": 9,
    "explodeDistance": 2.2,
    "parts": [
      {
        "id": "left-ventricle",
        "name": "Left Ventricle",
        "color": 10033947,
        "geometry": {
          "type": "sphere",
          "args": [
            1.1,
            28,
            28
          ]
        },
        "position": [
          -0.45,
          -0.6,
          0.2
        ],
        "description": "The thickest muscular chamber of the heart that contracts with high pressure to pump oxygen-rich blood through the aortic valve into systemic circulation.",
        "partCategory": "Ventricular Pumping Chamber",
        "finish": "Cardiac Striated Myocardium",
        "dimensions": "~12 × 8.5 × 6 cm | Wall 10–12 mm",
        "simple": "The main pumping chamber of the heart that contracts with strong muscular force to pump oxygen-rich blood out to the entire body.",
        "technical": "Thick-walled myocardial chamber generating systemic systolic arterial pressures (~120 mmHg). Receives oxygenated blood from the left atrium via the bicuspid (mitral) valve and ejects stroke volume (~70 mL) across the aortic semilunar valve."
      },
      {
        "id": "right-ventricle",
        "name": "Right Ventricle",
        "color": 12131356,
        "geometry": {
          "type": "sphere",
          "args": [
            0.95,
            24,
            24
          ]
        },
        "position": [
          0.55,
          -0.5,
          0.35
        ],
        "description": "Pumps low-pressure deoxygenated blood through the pulmonary valve into the pulmonary trunk and lungs for oxygenation.",
        "partCategory": "Pulmonary Pumping Chamber",
        "finish": "Cardiac Striated Myocardium",
        "dimensions": "Wall Thickness: 3–5 mm | Volume ~70 mL",
        "simple": "The lower chamber on the right side of the heart that pumps oxygen-poor blood to the lungs to pick up fresh oxygen.",
        "technical": "Low-pressure chamber generating pulmonary arterial pressures (~25/10 mmHg). Pumps deoxygenated blood through the pulmonary semilunar valve into the pulmonary trunk for alveolar gas exchange."
      },
      {
        "id": "left-atrium",
        "name": "Left Atrium",
        "color": 14251782,
        "geometry": {
          "type": "sphere",
          "args": [
            0.75,
            24,
            24
          ]
        },
        "position": [
          -0.6,
          0.8,
          -0.4
        ],
        "description": "Receives freshly oxygenated blood returning from the lungs via pulmonary veins and transfers it into the left ventricle through the mitral valve.",
        "partCategory": "Atrial Inflow Chamber",
        "finish": "Pectinate Endocardial Lining",
        "dimensions": "Volume ~50–60 mL",
        "simple": "The upper holding chamber on the left side that receives fresh, oxygenated blood returning from the lungs.",
        "technical": "Smooth-walled posterior chamber receiving oxygenated pulmonary venous return from four pulmonary veins; empties into the left ventricle across the mitral valve during ventricular diastole."
      },
      {
        "id": "right-atrium",
        "name": "Right Atrium",
        "color": 2450411,
        "geometry": {
          "type": "sphere",
          "args": [
            0.8,
            24,
            24
          ]
        },
        "position": [
          0.9,
          0.7,
          0.1
        ],
        "description": "Receives deoxygenated systemic venous return from the superior and inferior vena cava and routes it through the tricuspid valve into the right ventricle.",
        "partCategory": "Atrial Inflow & Pacemaker Node",
        "finish": "Endocardial Muscle & SA Node",
        "dimensions": "Volume ~50–60 mL",
        "simple": "The upper chamber on the right side that receives deoxygenated blood returning from the body.",
        "technical": "Chamber receiving deoxygenated systemic venous return from the superior and inferior venae cavae; houses the Sinoatrial (SA) node pacemaker regulating intrinsic myocardial electrical conduction."
      },
      {
        "id": "aorta",
        "name": "Aorta",
        "color": 15680580,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.45,
            0.45,
            2.2,
            24
          ]
        },
        "position": [
          -0.1,
          1.9,
          0
        ],
        "rotation": [
          0.2,
          0,
          -0.25
        ],
        "description": "The primary and largest systemic artery emerging from the left ventricle, arching over the pulmonary trunk to supply oxygenated blood to the body.",
        "partCategory": "Systemic Elastic Artery",
        "finish": "Endothelium & Elastic Laminae",
        "dimensions": "Lumen Ø 25–30 mm | Length ~30 cm",
        "simple": "The largest artery in the human body, carrying oxygen-rich blood directly from the heart out to all bodily organs.",
        "technical": "High-compliance elastic systemic artery with thick tunica media rich in elastin laminations, dampening systolic pulsatile pressure spikes (Windkessel effect) and distributing oxygenated blood at ~120 mmHg."
      },
      {
        "id": "major-veins",
        "name": "Major Veins (Vena Cava & Pulmonary)",
        "color": 1920728,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.4,
            0.4,
            2.6,
            20
          ]
        },
        "position": [
          1.1,
          1.4,
          -0.3
        ],
        "description": "Large vascular conduits including the Superior & Inferior Vena Cava returning systemic venous blood, and pulmonary veins channeling blood to the left atrium.",
        "partCategory": "Venous Return Conduits",
        "finish": "Vascular Endothelium & Smooth Muscle",
        "dimensions": "Lumen Ø 20–22 mm",
        "simple": "The large blood vessels (venae cavae and pulmonary veins) that carry blood back into the heart chambers.",
        "technical": "High-capacitance, low-pressure venous conduits (Superior and Inferior Vena Cava and Pulmonary Veins) returning systemic and pulmonary blood to atrial chambers at central venous pressures of 2–6 mmHg."
      }
    ]
  },
  "human-eye": {
    "label": "Human Eye",
    "category": "Science & Concepts",
    "icon": "👁️",
    "viewRadius": 7.5,
    "explodeDistance": 1.8,
    "parts": [
      {
        "id": "cornea",
        "name": "Cornea",
        "color": 3718648,
        "geometry": {
          "type": "sphere",
          "args": [
            0.85,
            28,
            28
          ]
        },
        "position": [
          0,
          0,
          1.45
        ],
        "transparent": true,
        "opacity": 0.45,
        "description": "The clear, curved anterior outer dome providing approximately two-thirds of the eye’s total optical refractive power and protecting internal structures.",
        "partCategory": "Anterior Refractive Media",
        "finish": "Avascular Collagenous Lamellae",
        "dimensions": "Ø 11.5 mm | Central Thickness 0.52 mm",
        "simple": "The clear, dome-shaped front window of the eye that protects internal parts and focuses incoming light onto the lens.",
        "technical": "Avascular transparent collagenous tissue providing approximately +43 diopters (~70%) of total ocular refractive power. Comprises five distinct histological layers with a refractive index of 1.376."
      },
      {
        "id": "iris",
        "name": "Iris",
        "color": 165063,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.78,
            0.78,
            0.06,
            32
          ]
        },
        "position": [
          0,
          0,
          1.25
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "The pigmented muscular ring with dilator and sphincter pupillae muscles that adjust the central pupil diameter in response to ambient illumination.",
        "partCategory": "Muscular Pupillary Aperture",
        "finish": "Chromatophore Melanin Pigment",
        "dimensions": "Ø 12.0 mm | Aperture Ø 2–8 mm",
        "simple": "The colored circular muscle in the eye that controls how much light enters by widening or narrowing the pupil.",
        "technical": "Pigmented contractile diaphragm dividing anterior and posterior chambers. Regulates pupillary diameter (2 to 8 mm) via autonomic sphincter and dilator pupillae muscles in response to retinal illuminance."
      },
      {
        "id": "lens",
        "name": "Lens",
        "color": 9684477,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.65,
            0.65,
            0.22,
            28
          ]
        },
        "position": [
          0,
          0,
          0.95
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "transparent": true,
        "opacity": 0.7,
        "description": "A flexible, biconvex crystalline structure that dynamically alters focal curvature (accommodation) to focus light sharply onto the retina.",
        "partCategory": "Accommodative Biconvex Lens",
        "finish": "Crystalline Protein Fiber Matrix",
        "dimensions": "Ø 10.0 mm | Axial Thickness 4.0 mm",
        "simple": "A clear, flexible disc behind the iris that changes shape to help you switch focus smoothly between near and far objects.",
        "technical": "Biconvex, transparent crystalline structure suspended by ciliary zonules. Undergoes active accommodation to add +15 to +29 diopters of optical power by altering anterior surface curvature (refractive index gradient 1.386–1.406)."
      },
      {
        "id": "retina",
        "name": "Retina",
        "color": 14251782,
        "geometry": {
          "type": "sphere",
          "args": [
            1.5,
            32,
            32
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "description": "The photoreceptive neurosensory lining containing millions of rod and cone cells, converting focused light patterns into biochemical neural impulses.",
        "partCategory": "Photoreceptive Neuroepithelium",
        "finish": "Neurosensory Photoreceptor Layer",
        "dimensions": "Surface Area ~1,100 mm² | Thickness 0.2 mm",
        "simple": "The light-sensitive surface lining the back of the eye that turns light images into nerve signals sent to the brain.",
        "technical": "Multilayered neurosensory tunic containing ~120M rod photoreceptors (scotopic vision) and ~6M cone photoreceptors (photopic color vision). Phototransduction cascades hyperpolarize bipolar cells, initiating action potentials in ganglion axons."
      },
      {
        "id": "optic-nerve",
        "name": "Optic Nerve",
        "color": 16707722,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.35,
            0.35,
            1.8,
            20
          ]
        },
        "position": [
          0.2,
          -0.1,
          -1.9
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "A bundled cable of over one million retinal ganglion cell axons shielded in myelin, transmitting visual information directly to the visual cortex.",
        "partCategory": "Cranial Nerve II (Visual Pathway)",
        "finish": "Myelinated Oligodendrocyte Sheath",
        "dimensions": "Ø 3.5–4.0 mm | Length ~45 mm",
        "simple": "The cable of nerve fibers that carries visual signals from the retina directly into the brain for processing.",
        "technical": "Cranial Nerve II conduit consisting of ~1.2 million myelinated retinal ganglion cell axons shielded in meningeal sheaths, transmitting encoded visual action potentials directly to the lateral geniculate nucleus (LGN) and visual cortex."
      }
    ]
  },
  "wind-turbine": {
    "label": "Wind Turbine",
    "category": "Machineries",
    "icon": "🌬️",
    "viewRadius": 18,
    "explodeDistance": 3.5,
    "parts": [
      {
        "id": "foundation",
        "name": "Base Foundation",
        "color": 9741240,
        "geometry": {
          "type": "cylinder",
          "args": [
            2.5,
            2.7,
            0.6,
            24
          ]
        },
        "position": [
          0,
          -6,
          0
        ],
        "description": "Massive reinforced concrete gravity foundation anchored deep into the ground, providing structural ballast to resist extreme aerodynamic thrust and overturning moments.",
        "partCategory": "Geotechnical Ballast Foundation",
        "finish": "Reinforced Post-Tensioned Concrete",
        "dimensions": "Base Ø 18.0 m | Depth 3.5 m",
        "simple": "A massive concrete base deep underground that keeps the gigantic turbine upright against high winds.",
        "technical": "Post-tensioned reinforced concrete gravity-base foundation (1,500+ tons) anchored into bedrock, counteracting extreme aerodynamic overturning moments up to 100,000 kNm."
      },
      {
        "id": "tower",
        "name": "Tower",
        "color": 14673388,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.38,
            0.72,
            11.2,
            24
          ]
        },
        "position": [
          0,
          -0.1,
          0
        ],
        "description": "Tapered tubular structural steel mast elevating the nacelle and rotor into higher-velocity laminar wind streams, equipped with an internal service ladder and power busbars.",
        "partCategory": "Tubular Steel Structural Mast",
        "finish": "Heavy Anti-Corrosive Epoxy Coated Steel",
        "dimensions": "Hub Height: 90 m | Base Ø 4.5 m",
        "simple": "The tall steel tower that elevates the spinning blades high into stronger, smoother winds.",
        "technical": "Multi-section rolled structural steel cylindrical mast (S355 grade) designed to avoid resonant frequencies matching the blade passing frequency (1P/3P)."
      },
      {
        "id": "nacelle",
        "name": "Nacelle",
        "color": 14870768,
        "geometry": {
          "type": "box",
          "args": [
            1.2,
            1.1,
            2.6
          ]
        },
        "position": [
          0,
          5.8,
          -0.3
        ],
        "description": "Aerodynamic machinery enclosure atop the tower housing the main drive shaft, mechanical disc brake, high-ratio step-up gearbox, generator, and yaw drive motors.",
        "partCategory": "Powertrain & Generator Nacelle",
        "finish": "Fiberglass Reinforced Polyester Housing",
        "dimensions": "12.5 × 4.2 × 4.0 m (~80 Tons)",
        "simple": "The school-bus-sized machinery house at the top of the tower holding the gearbox and electric generator.",
        "technical": "Machinery enclosure housing planetary step-up gearbox (1:100 ratio), doubly-fed induction generator (DFIG 2.5 MW), disc brakes, and active yaw azimuth drive."
      },
      {
        "id": "rotor-hub",
        "name": "Rotor Hub",
        "color": 2450411,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.55,
            0.18,
            0.9,
            24
          ]
        },
        "position": [
          0,
          5.8,
          1.25
        ],
        "rotation": [
          1.5707963267948966,
          0,
          0
        ],
        "description": "Cast-iron spinner nose cone that mounts the three aerodynamic blades, housing independent pitch mechanisms that angle blades to maximize power or feather in storm winds.",
        "partCategory": "Cast Iron Pitch-Controlled Hub",
        "finish": "Ductile Cast Iron (EN-GJS-400-18U-LT)",
        "dimensions": "Hub Ø 4.2 m | Weight 18 Tons",
        "simple": "The central spinning nose that holds the three blades and twists them to catch the wind just right.",
        "technical": "Nodular cast-iron rotor hub equipped with independent electro-mechanical pitch drive mechanisms rotating blades from 0° (power) to 90° (feathered storm shutdown)."
      },
      {
        "id": "blades",
        "name": "Blades (3)",
        "color": 16317180,
        "geometry": {
          "type": "box",
          "args": [
            0.35,
            9.6,
            0.2
          ]
        },
        "position": [
          0,
          5.8,
          1.45
        ],
        "description": "Trio of aerodynamic fiberglass and carbon-fiber composite airfoil blades spaced 120° apart that harvest kinetic energy from the wind to drive the main rotor shaft.",
        "partCategory": "Aerodynamic Rotor Airfoils",
        "finish": "Gel-Coated Carbon/Glass Epoxy Composite",
        "dimensions": "Rotor Ø 110 m | Blade Length 53.5 m",
        "simple": "Three massive aerodynamic blades that catch the wind and spin around to capture wind energy.",
        "technical": "Trio of aerodynamically twisted fiberglass/carbon-fiber composite airfoils with variable pitch control, maximizing lift-to-drag ratio (L/D > 100) to harvest up to 59.3% kinetic energy (Betz limit)."
      }
    ]
  },
  "solar-panel": {
    "label": "Solar Panel",
    "category": "Machineries",
    "icon": "☀️",
    "viewRadius": 8.5,
    "explodeDistance": 1.8,
    "parts": [
      {
        "id": "mounting-bracket",
        "name": "Mounting Bracket",
        "color": 6583435,
        "geometry": {
          "type": "box",
          "args": [
            3.4,
            1.3,
            4.2
          ]
        },
        "position": [
          0,
          -0.65,
          -0.2
        ],
        "description": "Structural galvanized steel and extruded aluminum racking system with dual triangular tilt legs angled at 30° to orient the solar module toward optimal solar zenith angle.",
        "partCategory": "Structural Racking & Tilt Frame",
        "finish": "Hot-Dip Galvanized & Anodized 6005-T5",
        "dimensions": "1,650 × 990 × 450 mm (Tilt 30°)",
        "simple": "The heavy-duty metal legs that hold the solar panel tilted toward the sun at the best angle.",
        "technical": "Structural aluminum racking system with triangular tilt legs pre-angled at 30° to optimize seasonal solar irradiance and withstand 140 km/h wind loads."
      },
      {
        "id": "frame",
        "name": "Frame",
        "color": 3359061,
        "geometry": {
          "type": "box",
          "args": [
            3.2,
            0.12,
            5
          ]
        },
        "position": [
          0,
          0.45,
          0
        ],
        "rotation": [
          -0.5235987755982988,
          0,
          0
        ],
        "description": "Corrosion-resistant anodized aluminum perimeter framing that provides mechanical rigidity, thermal expansion tolerance, and IP-rated watertight seals around the photovoltaic laminate.",
        "partCategory": "Anodized Aluminum Perimeter Frame",
        "finish": "Corrosion-Resistant Anodized 6063 Aluminum",
        "dimensions": "1,680 × 1,000 × 35 mm",
        "simple": "The protective aluminum border that holds the glass and solar cells securely together.",
        "technical": "Extruded anodized aluminum perimeter framing with drainage weep holes and internal silicone hermetic sealing channel."
      },
      {
        "id": "pv-surface",
        "name": "Photovoltaic Cells / Panel Surface",
        "color": 994140,
        "geometry": {
          "type": "box",
          "args": [
            3.05,
            0.04,
            4.85
          ]
        },
        "position": [
          0,
          0.52,
          0
        ],
        "rotation": [
          -0.5235987755982988,
          0,
          0
        ],
        "description": "Matrix of 72 monocrystalline silicon photovoltaic wafer cells wired with conductive silver busbars and protected under anti-reflective, high-transmittance tempered safety glass.",
        "partCategory": "Monocrystalline Photovoltaic Matrix",
        "finish": "Anti-Reflective ARC Tempered Glass",
        "dimensions": "1,650 × 980 × 3.2 mm (72 Cells, 400W)",
        "simple": "The dark blue silicon cells that turn sunlight directly into clean electrical energy.",
        "technical": "Matrix of 72 P-N junction monocrystalline silicon wafer cells with conductive silver busbars under 3.2 mm low-iron tempered glass, converting solar photons via the photovoltaic effect (STC efficiency 20.8%)."
      },
      {
        "id": "junction-box",
        "name": "Junction Box",
        "color": 1976635,
        "geometry": {
          "type": "box",
          "args": [
            0.65,
            0.22,
            0.45
          ]
        },
        "position": [
          0,
          0.28,
          -0.8
        ],
        "rotation": [
          -0.5235987755982988,
          0,
          0
        ],
        "description": "Weatherproof IP68 rear electrical enclosure containing bypass diodes to prevent cell hot-spots, terminating in UV-resistant DC output cables with locking MC4 solar connectors.",
        "partCategory": "Rear Junction Box & Bypass Diodes",
        "finish": "UV-Stabilized Polycarbonate (IP68)",
        "dimensions": "120 × 90 × 28 mm",
        "simple": "The waterproof electrical box on the back that sends the collected power out through heavy cables.",
        "technical": "IP68 weatherproof terminal enclosure housing 3 Schottky bypass diodes to prevent hot-spot shading degradation, terminating in 4 mm² PV cables with locking MC4 connectors."
      }
    ]
  },
  "resistor": {
    "label": "Carbon Film Resistor (1kΩ)",
    "category": "Electronic Components",
    "icon": "⚡",
    "viewRadius": 3.5,
    "explodeDistance": 0.65,
    "parts": [
      {
        "id": "resistor-body",
        "name": "Ceramic Resistor Body",
        "color": 13808780,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.28,
            0.28,
            1.4,
            24
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.1,
        "roughness": 0.6,
        "description": "Cylindrical high-alumina ceramic substrate rod coated with a micro-thin resistive carbon film spiral-cut to achieve precisely 1,000 ohms of electrical resistance.",
        "partCategory": "Passive Resistive Element",
        "finish": "Conformal Pyrolytic Carbon Film",
        "dimensions": "Ø 2.5 × 6.5 mm (Axial-0.25W)",
        "simple": "The core ceramic cylinder coated with a thin layer of carbon that resists electrical current to control voltages safely.",
        "technical": "Cylindrical high-alumina ceramic substrate rod coated with a pyrolytic carbon film spiral-cut to achieve precisely 1,000 Ω (1 kΩ). Rated for 0.25 W power dissipation, conforming to Ohm's Law (V = IR) with negative temperature coefficient."
      },
      {
        "id": "lead-left",
        "name": "Axial Metal Lead (Left)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            1.25,
            16
          ]
        },
        "position": [
          -1.3,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Tinned solder-plated copper lead wire welded securely into the left end-cap cup for robust through-hole circuit mounting.",
        "partCategory": "Axial Terminal Lead (Left)",
        "finish": "Matte Electro-Tinned Copper Lead",
        "dimensions": "Ø 0.6 mm × 28 mm",
        "simple": "The left metal wire pin that connects the resistor into an electrical circuit or breadboard.",
        "technical": "Electro-tinned solderable copper lead wire welded to a stamped steel end-cap cup, providing low contact resistance (<0.01 Ω) and high tensile pull strength."
      },
      {
        "id": "lead-right",
        "name": "Axial Metal Lead (Right)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            1.25,
            16
          ]
        },
        "position": [
          1.3,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Opposing axial terminal lead providing mechanical anchoring and electrical continuity with neighboring circuit nodes.",
        "partCategory": "Axial Terminal Lead (Right)",
        "finish": "Matte Electro-Tinned Copper Lead",
        "dimensions": "Ø 0.6 mm × 28 mm",
        "simple": "The right metal wire pin completing the electrical connection for current passing through the resistor.",
        "technical": "Opposing axial terminal lead providing mechanical anchoring and circuit continuity for through-hole PCB assembly."
      },
      {
        "id": "band-1",
        "name": "Color Band 1 (Brown = 1)",
        "color": 9127187,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.295,
            0.295,
            0.1,
            24
          ]
        },
        "position": [
          -0.42,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.1,
        "roughness": 0.5,
        "description": "First significant digit of the EIA resistor color code standard; brown signifies the numerical digit 1.",
        "partCategory": "EIA Color Code Band 1 (Brown = 1)",
        "finish": "High-Temperature Enamel Ink",
        "dimensions": "Width: 0.8 mm",
        "simple": "The first colored ring (Brown), representing the number 1 in the standard resistor color code.",
        "technical": "First significant digit per EIA-RS-279 standard; brown signifies the numerical value 1."
      },
      {
        "id": "band-2",
        "name": "Color Band 2 (Black = 0)",
        "color": 1579035,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.295,
            0.295,
            0.1,
            24
          ]
        },
        "position": [
          -0.18,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.1,
        "roughness": 0.5,
        "description": "Second significant digit of the color code; black signifies the numerical digit 0, forming the base number 10.",
        "partCategory": "EIA Color Code Band 2 (Black = 0)",
        "finish": "High-Temperature Enamel Ink",
        "dimensions": "Width: 0.8 mm",
        "simple": "The second colored ring (Black), representing the number 0, making the base number 10.",
        "technical": "Second significant digit; black signifies the numerical value 0, forming the two-digit base integer 10."
      },
      {
        "id": "band-3",
        "name": "Color Band 3 (Red = ×100)",
        "color": 14231078,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.295,
            0.295,
            0.1,
            24
          ]
        },
        "position": [
          0.08,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.1,
        "roughness": 0.5,
        "description": "Decimal multiplier band; red represents 10² (multiply by 100), establishing a nominal resistance of 10 × 100 = 1,000 Ω (1 kΩ).",
        "partCategory": "EIA Color Multiplier Band (Red = ×100)",
        "finish": "High-Temperature Enamel Ink",
        "dimensions": "Width: 0.8 mm",
        "simple": "The multiplier ring (Red), multiplying 10 by 100 to give 1,000 ohms (1 kilo-ohm).",
        "technical": "Decimal multiplier band; red represents 10² (multiply by 100), producing nominal resistance of 10 × 100 = 1,000 Ω (1 kΩ)."
      },
      {
        "id": "band-4",
        "name": "Color Band 4 (Gold = ±5% Tolerance)",
        "color": 15381256,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.295,
            0.295,
            0.1,
            24
          ]
        },
        "position": [
          0.44,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.8,
        "roughness": 0.25,
        "description": "Manufacturing tolerance indicator; metallic gold denotes a ±5% tolerance band, guaranteeing actual resistance falls within 950 Ω to 1,050 Ω.",
        "partCategory": "EIA Tolerance Band (Gold = ±5%)",
        "finish": "Metallic Gold Enamel Ink",
        "dimensions": "Width: 0.8 mm",
        "simple": "The gold ring indicating that the actual resistance is guaranteed to be within ±5% of 1,000 ohms.",
        "technical": "Manufacturing tolerance indicator; metallic gold denotes ±5% tolerance band, guaranteeing actual resistance falls within 950 Ω to 1,050 Ω."
      }
    ]
  },
  "electrolytic-capacitor": {
    "label": "Electrolytic Capacitor (470µF)",
    "category": "Electronic Components",
    "icon": "🔋",
    "viewRadius": 3.8,
    "explodeDistance": 0.7,
    "parts": [
      {
        "id": "can-body",
        "name": "Aluminum Enclosure Can",
        "color": 1981066,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.55,
            0.55,
            1.5,
            32
          ]
        },
        "position": [
          0,
          0.35,
          0
        ],
        "metalness": 0.15,
        "roughness": 0.55,
        "description": "Extruded aluminum canister with insulated PVC heat-shrink sleeve enclosing rolled anode and cathode aluminum foils interleaved with liquid electrolyte-soaked paper.",
        "partCategory": "Polarized Electrolytic Storage",
        "finish": "Extruded Aluminum & PVC Sleeve",
        "dimensions": "Can: Ø 8.0 × 11.5 mm",
        "simple": "A metal cylinder that stores electrical energy like a mini-battery to smooth out voltage spikes and dips in power supplies.",
        "technical": "Hermetically sealed aluminum electrolytic capacitor utilizing an etched high-purity aluminum foil anode, liquid electrolyte-impregnated paper separator, and thin Al2O3 dielectric. Rated 470 µF at 25V DC with low ESR ripple current filtering."
      },
      {
        "id": "vent-cap",
        "name": "Aluminum Safety Vent Cap",
        "color": 12634320,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.54,
            0.54,
            0.05,
            32
          ]
        },
        "position": [
          0,
          1.11,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.25,
        "description": "Stamped cross-score pressure relief vent on top designed to rupture safely in case of over-voltage or reverse polarity, venting gas without violent explosion.",
        "partCategory": "Pressure Relief Safety Vent",
        "finish": "Cross-Scored Stamped Aluminum",
        "dimensions": "Ø 7.8 mm Vent Cross",
        "simple": "Safety grooves stamped on top designed to split open safely if pressure builds up, preventing an explosion.",
        "technical": "Cross-scored structural relief vent stamped into the top aluminum dome. Engineered to rupture controllably at ~1.5–2.0 MPa internal pressure during overvoltage or reverse bias, safely releasing hydrogen gas."
      },
      {
        "id": "polarity-stripe",
        "name": "Negative Polarity Stripe (Cathode Indicator)",
        "color": 15857145,
        "geometry": {
          "type": "box",
          "args": [
            0.16,
            1.48,
            0.05
          ]
        },
        "position": [
          -0.54,
          0.35,
          0
        ],
        "metalness": 0.1,
        "roughness": 0.6,
        "description": "Continuous white stripe printed with negative minus (−) symbols running vertically down the cathode terminal side to prevent incorrect reverse-voltage insertion.",
        "partCategory": "Polarity Identification Band",
        "finish": "Screen-Printed Insulating Ink",
        "dimensions": "Stripe Width: 3.0 mm",
        "simple": "A white stripe with minus signs pointing out the negative leg so you don't connect it backwards.",
        "technical": "High-contrast silkscreened cathode polarity indicator with minus ('-') symbols identifying the negative terminal, essential for polarized dielectric orientation in DC circuits."
      },
      {
        "id": "rubber-seal",
        "name": "Rubber Bottom Seal",
        "color": 988970,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.52,
            0.52,
            0.1,
            24
          ]
        },
        "position": [
          0,
          -0.42,
          0
        ],
        "metalness": 0.05,
        "roughness": 0.85,
        "description": "Hermetic vulcanized rubber bung sealing the bottom of the aluminum can to preserve electrolyte moisture and insulate the two exiting lead wires.",
        "partCategory": "Hermetic End Seal",
        "finish": "Ethylene Propylene Diene Rubber (EPDM)",
        "dimensions": "Plug Ø 7.8 × 2.5 mm",
        "simple": "A tight rubber plug at the bottom that seals the liquid electrolyte inside and prevents it from drying out.",
        "technical": "High-temperature EPDM rubber bung molded around terminal leads, maintaining hermetic seal to prevent liquid electrolyte evaporation over operating life up to 105°C."
      },
      {
        "id": "lead-positive",
        "name": "Positive Lead (Longer)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            1.4,
            16
          ]
        },
        "position": [
          0.2,
          -1.15,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "The visibly longer anode terminal lead (+); standard electronics convention dictates making this lead longer so engineers can instantly verify positive polarity.",
        "partCategory": "Anode Terminal Lead (+)",
        "finish": "Tinned Copper-Clad Steel",
        "dimensions": "Ø 0.6 mm × 25 mm",
        "simple": "The longer wire leg representing the positive electrical connection (+).",
        "technical": "Through-hole longer anode lead welded to internal aluminum foil tab; designated positive (+) terminal with standard 3.5 mm radial pin pitch."
      },
      {
        "id": "lead-negative",
        "name": "Negative Lead (Shorter)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            0.9,
            16
          ]
        },
        "position": [
          -0.2,
          -0.9,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "The shorter cathode terminal lead (−) aligned with the exterior minus stripe; connecting this lead to the negative or ground potential is essential to avoid destroying the dielectric.",
        "partCategory": "Cathode Terminal Lead (-)",
        "finish": "Tinned Copper-Clad Steel",
        "dimensions": "Ø 0.6 mm × 20 mm",
        "simple": "The shorter wire leg representing the negative electrical connection (-), aligned with the minus stripe.",
        "technical": "Through-hole shorter cathode lead welded to cathode foil tab; aligned adjacent to the exterior polarity indicator stripe."
      }
    ]
  },
  "transistor": {
    "label": "Transistor (TO-92 Package)",
    "category": "Electronic Components",
    "icon": "🎛️",
    "viewRadius": 3.5,
    "explodeDistance": 0.65,
    "parts": [
      {
        "id": "body-curve",
        "name": "Molded Epoxy Body (Rounded Back)",
        "color": 1579035,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.42,
            0.42,
            0.85,
            24
          ]
        },
        "position": [
          0,
          0.35,
          -0.05
        ],
        "metalness": 0.1,
        "roughness": 0.65,
        "description": "Semicircular curved profile of the classic TO-92 thermoset epoxy package hermetically encapsulating the three-layer silicon semiconductor die.",
        "partCategory": "Bipolar Junction Transistor (BJT)",
        "finish": "Molded Epoxy Novolac (TO-92)",
        "dimensions": "4.6 × 4.6 × 3.6 mm",
        "simple": "A miniature electronic switch and amplifier that uses a small current at one pin to control a much larger current between the other two.",
        "technical": "Silicon NPN bipolar junction transistor (BJT) housed in a standardized TO-92 plastic encapsulation. Amplifies signal current (hFE ~ 100–300) and switches collector currents (Ic up to 800 mA) with low saturation voltage Vce(sat)."
      },
      {
        "id": "body-flat",
        "name": "Epoxy Face (Laser Stamped Flat)",
        "color": 2565930,
        "geometry": {
          "type": "box",
          "args": [
            0.76,
            0.85,
            0.18
          ]
        },
        "position": [
          0,
          0.35,
          0.16
        ],
        "metalness": 0.1,
        "roughness": 0.65,
        "description": "Flat front surface laser-marked with device part numbers (e.g., 2N3904 or 2N2222), serving as the physical keying face for pin identification.",
        "partCategory": "Component Index Face & Marking",
        "finish": "Laser-Etched Epoxy Face",
        "dimensions": "4.6 × 4.6 mm Flat Face",
        "simple": "The flat front surface of the transistor where the part number is stamped, helping you orient the pins correctly.",
        "technical": "Planar index surface bearing laser-marked component identification (e.g., 2N3904 / BC547) establishing standardized pinout orientation looking from left to right."
      },
      {
        "id": "lead-emitter",
        "name": "Emitter Lead",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.032,
            0.032,
            1.25,
            16
          ]
        },
        "position": [
          -0.24,
          -0.68,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Heavily doped terminal that injects majority charge carriers into the base region; passes the total circuit current (IE = IB + IC).",
        "partCategory": "Emitter Terminal (E)",
        "finish": "Matte Tin-Plated Leadframe",
        "dimensions": "Ø 0.45 mm × 14 mm",
        "simple": "The emitter leg that releases electrons into the circuit when the transistor turns on.",
        "technical": "Heavily N-doped emitter region lead designed to inject majority charge carriers into the base junction; low forward dynamic resistance."
      },
      {
        "id": "lead-base",
        "name": "Base Lead",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.032,
            0.032,
            1.25,
            16
          ]
        },
        "position": [
          0,
          -0.68,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "The ultra-thin central control terminal; injecting a small base-emitter current activates the conduction channel between collector and emitter.",
        "partCategory": "Base Control Terminal (B)",
        "finish": "Matte Tin-Plated Leadframe",
        "dimensions": "Ø 0.45 mm × 14 mm",
        "simple": "The base control leg: feeding a small current here opens the gate to let a larger current flow.",
        "technical": "Ultra-thin, lightly P-doped central base layer modulating the electrostatic potential barrier between emitter and collector via input base current Ib."
      },
      {
        "id": "lead-collector",
        "name": "Collector Lead",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.032,
            0.032,
            1.25,
            16
          ]
        },
        "position": [
          0.24,
          -0.68,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Terminal that collects majority charge carriers sweeping across the reverse-biased collector-base junction, handling primary power dissipation.",
        "partCategory": "Collector Terminal (C)",
        "finish": "Matte Tin-Plated Leadframe",
        "dimensions": "Ø 0.45 mm × 14 mm",
        "simple": "The collector leg that collects electrons and handles the main power load of the circuit.",
        "technical": "Moderately N-doped collector region with large junction area engineered for thermal dissipation and handling collector-emitter voltages up to 45V."
      }
    ]
  },
  "diode": {
    "label": "Rectifier Diode (1N4007)",
    "category": "Electronic Components",
    "icon": "➡️",
    "viewRadius": 3.2,
    "explodeDistance": 0.6,
    "parts": [
      {
        "id": "diode-body",
        "name": "Semiconductor Epoxy Body (P-N Junction)",
        "color": 1579035,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.25,
            0.25,
            1.05,
            24
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.1,
        "roughness": 0.6,
        "description": "Molded black epoxy cylinder enclosing a single silicon p-n crystal that permits electric current to flow freely in the forward direction while blocking reverse current.",
        "partCategory": "P-N Junction Rectifier",
        "finish": "Passivated Molded Epoxy (DO-41)",
        "dimensions": "DO-41 (Ø 2.7 × 5.2 mm)",
        "simple": "A one-way electrical valve that lets current flow smoothly in one direction while blocking it in reverse.",
        "technical": "Silicon P-N junction rectifier diode (1N4007) exhibiting asymmetric forward conduction (forward drop Vf ~ 0.7V at 1A) and blocking reverse breakdown voltages up to 1,000V Peak Inverse Voltage (PIV)."
      },
      {
        "id": "cathode-band",
        "name": "Cathode Band Indicator",
        "color": 14870768,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.265,
            0.265,
            0.15,
            24
          ]
        },
        "position": [
          0.35,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.8,
        "roughness": 0.25,
        "description": "Distinctive silver/white ring painted around one end of the cylinder to denote the negative cathode (−) terminal of the diode.",
        "partCategory": "Cathode Polarity Marker",
        "finish": "Silver Epoxy Silk-Screen",
        "dimensions": "Band Width: 1.0 mm",
        "simple": "A silver ring marking the negative side (cathode) where current exits.",
        "technical": "High-contrast silver cathode marking band indicating the N-doped terminal of the P-N junction, showing current flows toward this terminal during forward conduction."
      },
      {
        "id": "lead-anode",
        "name": "Anode Lead (+)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            1.15,
            16
          ]
        },
        "position": [
          -1.08,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Axial tinned copper wire lead connecting to the internal p-type semiconductor material; forward current enters through this terminal.",
        "partCategory": "Anode Terminal (+)",
        "finish": "Matte Tinned Copper Leads",
        "dimensions": "Ø 0.8 mm × 26 mm",
        "simple": "The positive wire leg where electric current enters the diode.",
        "technical": "P-doped junction terminal lead. Current enters through this terminal when positive forward bias exceeds the ~0.7V silicon barrier threshold."
      },
      {
        "id": "lead-cathode",
        "name": "Cathode Lead (-)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            1.15,
            16
          ]
        },
        "position": [
          1.08,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Axial metal wire lead on the banded end connecting to the n-type silicon; forward current exits through this terminal.",
        "partCategory": "Cathode Terminal (-)",
        "finish": "Matte Tinned Copper Leads",
        "dimensions": "Ø 0.8 mm × 26 mm",
        "simple": "The negative wire leg where electric current leaves the diode, located next to the silver band.",
        "technical": "N-doped junction terminal lead adjacent to the silver cathode stripe. Blocks reverse current flow with leakage current < 5 µA."
      }
    ]
  },
  "led": {
    "label": "Light Emitting Diode (5mm LED)",
    "category": "Electronic Components",
    "icon": "💡",
    "viewRadius": 3.5,
    "explodeDistance": 0.65,
    "parts": [
      {
        "id": "lens-dome",
        "name": "Epoxy Optical Dome",
        "color": 15680580,
        "geometry": {
          "type": "sphere",
          "args": [
            0.42,
            24,
            20
          ]
        },
        "position": [
          0,
          0.62,
          0
        ],
        "transparent": true,
        "opacity": 0.78,
        "metalness": 0.08,
        "roughness": 0.15,
        "description": "Optically clear tinted epoxy dome acting as a hemispherical focusing lens that projects electroluminescent photons emitted from the semiconductor crystal.",
        "partCategory": "Optical Collimating Dome",
        "finish": "Optical-Grade Transparent Epoxy",
        "dimensions": "Ø 5.0 mm Hemispherical Dome",
        "simple": "The rounded clear plastic top that focuses light from the glowing chip into a bright beam.",
        "technical": "Convex hemispherical optical epoxy dome lens focusing radiated 625 nm photons into a 30° viewing cone via internal refraction."
      },
      {
        "id": "lens-base",
        "name": "Translucent Epoxy Base",
        "color": 16281969,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.42,
            0.42,
            0.65,
            24
          ]
        },
        "position": [
          0,
          0.2,
          0
        ],
        "transparent": true,
        "opacity": 0.6,
        "metalness": 0.08,
        "roughness": 0.15,
        "description": "Molded cylindrical base featuring an outer seating flange and an integrated flat edge on the rim directly marking the cathode lead.",
        "partCategory": "Encapsulation Base & Flat Index",
        "finish": "Cast Epoxy Resin with Flange",
        "dimensions": "Flange Ø 5.8 × 1.0 mm",
        "simple": "The flat-rimmed base of the plastic case that holds the wire pins and indicates polarity with a flat edge.",
        "technical": "Epoxy flange ring incorporating an asymmetric flat notch on the cathode side to provide tactile and visual polarity orientation for automated insertion."
      },
      {
        "id": "internal-anvil",
        "name": "Reflective Cavity Anvil & Die",
        "color": 16707722,
        "geometry": {
          "type": "box",
          "args": [
            0.18,
            0.22,
            0.12
          ]
        },
        "position": [
          0,
          0.32,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.25,
        "description": "Microscopic gallium arsenide/phosphide semiconductor die sitting inside a reflective leadframe cup that directs light upward through the epoxy dome.",
        "partCategory": "Reflective Anvil & Die Mount",
        "finish": "Silver-Plated Copper Alloy",
        "dimensions": "Die Cavity: 1.2 × 1.2 mm",
        "simple": "The tiny metal cup inside holding the glowing semiconductor chip and reflecting light upward.",
        "technical": "Leadframe anvil cup holding the Gallium Arsenide Phosphide (GaAsP) P-N junction die, using a reflective conical well to project photon emission forward via electron-hole radiative recombination."
      },
      {
        "id": "lead-anode",
        "name": "Anode (Longer Lead)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.032,
            0.032,
            1.35,
            16
          ]
        },
        "position": [
          -0.15,
          -0.78,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "The intentionally longer metal lead (+); connects to the smaller internal post via a microscopic gold bonding wire for positive voltage supply.",
        "partCategory": "Anode Terminal (+)",
        "finish": "Solder-Coated Copper Alloy",
        "dimensions": "Ø 0.5 mm × 28 mm (Long)",
        "simple": "The longer wire leg that connects to positive voltage (+).",
        "technical": "Longer through-hole terminal lead connected internally via thin gold bond wire to the top P-contact of the semiconductor die."
      },
      {
        "id": "lead-cathode",
        "name": "Cathode (Shorter Lead)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.032,
            0.032,
            0.95,
            16
          ]
        },
        "position": [
          0.15,
          -0.58,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "The shorter metal lead (−); anchored directly to the large internal reflective anvil on the side aligned with the flat edge on the plastic rim.",
        "partCategory": "Cathode Terminal (-)",
        "finish": "Solder-Coated Copper Alloy",
        "dimensions": "Ø 0.5 mm × 25 mm (Short)",
        "simple": "The shorter wire leg that connects to ground or negative (-), aligned with the flat edge.",
        "technical": "Shorter through-hole terminal lead monolithic with the reflective anvil cup and aligned with the flat index edge of the epoxy rim."
      }
    ]
  },
  "ic-chip": {
    "label": "IC Chip (DIP-8 Package)",
    "category": "Electronic Components",
    "icon": "🔲",
    "viewRadius": 4,
    "explodeDistance": 0.75,
    "parts": [
      {
        "id": "dip-body",
        "name": "Molded Plastic DIP Body",
        "color": 1579035,
        "geometry": {
          "type": "box",
          "args": [
            1.7,
            0.38,
            0.85
          ]
        },
        "position": [
          0,
          0.2,
          0
        ],
        "metalness": 0.1,
        "roughness": 0.65,
        "description": "Dual In-line Package (DIP) body molded from flame-retardant epoxy encapsulation resin protecting the microscopic silicon die and delicate gold bond wires.",
        "partCategory": "Monolithic Integrated Circuit (DIP-8)",
        "finish": "Flame-Retardant Thermoset Epoxy",
        "dimensions": "DIP-8 Standard (9.8 × 6.4 × 3.3 mm)",
        "simple": "A microchip containing a complete miniature electronic circuit with transistors and resistors packed into a durable black casing with 8 pins.",
        "technical": "Monolithic silicon integrated circuit in a standard Dual In-Line Package (DIP-8). Houses an operational amplifier / timer silicon die wire-bonded to copper leadframe pins with 0.1\" (2.54 mm) spacing. Notch and dot identify Pin 1 index reference."
      },
      {
        "id": "notch-indicator",
        "name": "Orientation Notch (Pin 1 Indicator)",
        "color": 4144966,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.13,
            0.13,
            0.4,
            16
          ]
        },
        "position": [
          -0.85,
          0.2,
          0
        ],
        "metalness": 0.15,
        "roughness": 0.5,
        "description": "Semicircular indexing notch molded into one end of the chip body; pin 1 is universally standardized as the first pin to the left of this notch.",
        "partCategory": "Orientation Alignment Notch",
        "finish": "Molded Semicircular Keyway",
        "dimensions": "Radius 1.2 mm Semi-Circle",
        "simple": "A half-moon indentation on one end that shows which way to insert the chip into a circuit board.",
        "technical": "Mechanical keying notch molded into the package end face to guarantee correct orientation during PCB mounting; Pin 1 is located immediately to the left of this notch."
      },
      {
        "id": "pin-1-dot",
        "name": "Pin 1 Index Dot",
        "color": 7434618,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.05,
            0.05,
            0.02,
            12
          ]
        },
        "position": [
          -0.6,
          0.395,
          0.25
        ],
        "metalness": 0.2,
        "roughness": 0.5,
        "description": "Laser-etched dimple providing redundant visual orientation confirmation for pin 1 during pick-and-place automated manufacturing.",
        "partCategory": "Pin 1 Optical Index Dot",
        "finish": "Molded Circular Indentation",
        "dimensions": "Ø 0.8 mm Index Indent",
        "simple": "A tiny molded dimple next to Pin 1 confirming the starting pin for circuit wiring.",
        "technical": "Laser or mold indentation placed directly adjacent to Pin 1, providing unequivocal pin numbering index reference."
      },
      {
        "id": "pin-1",
        "name": "Pin Leg 1 (Index Reference Pin)",
        "color": 13751771,
        "geometry": {
          "type": "box",
          "args": [
            0.08,
            0.45,
            0.04
          ]
        },
        "position": [
          -0.55,
          -0.12,
          0.45
        ],
        "metalness": 0.85,
        "roughness": 0.22,
        "description": "Stiff tin-plated copper-alloy terminal leg marking the start of counter-clockwise pin numbering.",
        "partCategory": "Index Reference Terminal (Pin 1)",
        "finish": "Matte Tin-Plated Copper Leadframe",
        "dimensions": "Pitch 2.54 mm | Leg 3.2 mm",
        "simple": "Pin 1: The starting reference pin on the microchip.",
        "technical": "Corner terminal leg 1; typically serves as Offset Null (op-amps) or Ground/Trigger (timers); reference node for counter-clockwise pin numbering."
      },
      {
        "id": "pin-2",
        "name": "Pin Leg 2 (Input Terminal)",
        "color": 13751771,
        "geometry": {
          "type": "box",
          "args": [
            0.08,
            0.45,
            0.04
          ]
        },
        "position": [
          -0.18,
          -0.12,
          0.45
        ],
        "metalness": 0.85,
        "roughness": 0.22,
        "description": "Second dual-in-line pin spaced at the standard 2.54 mm (0.1 inch) grid pitch.",
        "partCategory": "Input / Inverting Terminal (Pin 2)",
        "finish": "Matte Tin-Plated Copper Leadframe",
        "dimensions": "Pitch 2.54 mm | Leg 3.2 mm",
        "simple": "Pin 2: A signal input pin connecting to the internal circuit.",
        "technical": "High-impedance analog input terminal (e.g., Inverting Input (-) in op-amps, Trigger in 555 timers)."
      },
      {
        "id": "pin-3",
        "name": "Pin Leg 3 (Input Terminal)",
        "color": 13751771,
        "geometry": {
          "type": "box",
          "args": [
            0.08,
            0.45,
            0.04
          ]
        },
        "position": [
          0.18,
          -0.12,
          0.45
        ],
        "metalness": 0.85,
        "roughness": 0.22,
        "description": "Third through-hole lead leg connecting to internal semiconductor circuit blocks.",
        "partCategory": "Input / Non-Inverting Terminal (Pin 3)",
        "finish": "Matte Tin-Plated Copper Leadframe",
        "dimensions": "Pitch 2.54 mm | Leg 3.2 mm",
        "simple": "Pin 3: A control or input pin handling incoming signals.",
        "technical": "Secondary input or output node (e.g., Non-Inverting Input (+) in op-amps, Output in 555 timers)."
      },
      {
        "id": "pin-4",
        "name": "Pin Leg 4 (Ground / Negative Rail)",
        "color": 13751771,
        "geometry": {
          "type": "box",
          "args": [
            0.08,
            0.45,
            0.04
          ]
        },
        "position": [
          0.55,
          -0.12,
          0.45
        ],
        "metalness": 0.85,
        "roughness": 0.22,
        "description": "Corner terminal leg typically allocated to system ground (GND) or negative supply voltage (V−).",
        "partCategory": "Supply Negative / Ground (Pin 4)",
        "finish": "Matte Tin-Plated Copper Leadframe",
        "dimensions": "Pitch 2.54 mm | Leg 3.2 mm",
        "simple": "Pin 4: The ground or negative power supply pin.",
        "technical": "Negative supply rail connection (V- or GND), providing zero-volt reference potential for internal silicon sub-circuits."
      },
      {
        "id": "pin-5",
        "name": "Pin Leg 5 (Opposing Terminal)",
        "color": 13751771,
        "geometry": {
          "type": "box",
          "args": [
            0.08,
            0.45,
            0.04
          ]
        },
        "position": [
          0.55,
          -0.12,
          -0.45
        ],
        "metalness": 0.85,
        "roughness": 0.22,
        "description": "Terminal pin on the opposing long row, continuing the counter-clockwise numbering loop.",
        "partCategory": "Control / Compensation (Pin 5)",
        "finish": "Matte Tin-Plated Copper Leadframe",
        "dimensions": "Pitch 2.54 mm | Leg 3.2 mm",
        "simple": "Pin 5: A control or frequency compensation pin.",
        "technical": "Control voltage terminal or phase compensation input on opposing pin row."
      },
      {
        "id": "pin-6",
        "name": "Pin Leg 6 (Output Terminal)",
        "color": 13751771,
        "geometry": {
          "type": "box",
          "args": [
            0.08,
            0.45,
            0.04
          ]
        },
        "position": [
          0.18,
          -0.12,
          -0.45
        ],
        "metalness": 0.85,
        "roughness": 0.22,
        "description": "Internal output stage connection delivering processed electrical signals to external circuits.",
        "partCategory": "Output Driver Terminal (Pin 6)",
        "finish": "Matte Tin-Plated Copper Leadframe",
        "dimensions": "Pitch 2.54 mm | Leg 3.2 mm",
        "simple": "Pin 6: The main output pin delivering the processed electrical signal.",
        "technical": "Low-impedance output terminal delivering amplified analog voltage or rail-to-rail digital pulse stream."
      },
      {
        "id": "pin-7",
        "name": "Pin Leg 7 (Positive Supply Rail)",
        "color": 13751771,
        "geometry": {
          "type": "box",
          "args": [
            0.08,
            0.45,
            0.04
          ]
        },
        "position": [
          -0.18,
          -0.12,
          -0.45
        ],
        "metalness": 0.85,
        "roughness": 0.22,
        "description": "Positive supply voltage pin (VCC / V+) providing electrical energy to internal transistor networks.",
        "partCategory": "Positive Supply Rail (Pin 7)",
        "finish": "Matte Tin-Plated Copper Leadframe",
        "dimensions": "Pitch 2.54 mm | Leg 3.2 mm",
        "simple": "Pin 7: The positive power supply pin delivering electrical power to the chip.",
        "technical": "Positive DC power supply rail (V+ / Vcc), typically rated from +4.5V to +18V DC."
      },
      {
        "id": "pin-8",
        "name": "Pin Leg 8 (Corner Reference Pin)",
        "color": 13751771,
        "geometry": {
          "type": "box",
          "args": [
            0.08,
            0.45,
            0.04
          ]
        },
        "position": [
          -0.55,
          -0.12,
          -0.45
        ],
        "metalness": 0.85,
        "roughness": 0.22,
        "description": "Final pin directly opposite pin 1 across the dual-in-line package width.",
        "partCategory": "Supply / Strobe Terminal (Pin 8)",
        "finish": "Matte Tin-Plated Copper Leadframe",
        "dimensions": "Pitch 2.54 mm | Leg 3.2 mm",
        "simple": "Pin 8: Supply voltage or control reset pin completing the package pinout.",
        "technical": "Upper corner terminal functioning as Vcc supply rail (timers) or strobe/compensation pin."
      }
    ]
  },
  "relay": {
    "label": "Electromechanical Relay (12V)",
    "category": "Electronic Components",
    "icon": "🔁",
    "viewRadius": 4.2,
    "explodeDistance": 0.8,
    "parts": [
      {
        "id": "relay-housing",
        "name": "Translucent Blue Housing",
        "color": 2450411,
        "geometry": {
          "type": "box",
          "args": [
            1.6,
            1.15,
            1.05
          ]
        },
        "position": [
          0,
          0.52,
          0
        ],
        "transparent": true,
        "opacity": 0.35,
        "metalness": 0.1,
        "roughness": 0.25,
        "description": "Translucent dust-proof plastic casing protecting mechanical contact points, armature pivots, and the coil winding from air contamination.",
        "partCategory": "Protective Dust Enclosure",
        "finish": "Translucent Polycarbonate (Blue)",
        "dimensions": "19.0 × 15.5 × 15.0 mm",
        "simple": "The blue plastic outer box that seals the internal mechanical switch away from dirt, dust, and moisture.",
        "technical": "Flame-retardant translucent polycarbonate enclosure providing IP50 environmental sealing and electrical isolation between coil and contacts up to 1,500V AC."
      },
      {
        "id": "copper-coil",
        "name": "Copper Coil Winding",
        "color": 11817737,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.28,
            0.28,
            0.68,
            24
          ]
        },
        "position": [
          -0.35,
          0.48,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.25,
        "description": "Multi-turn spool of polyurethane-enameled copper wire generating an electromagnetic field when energized by low-power control circuitry.",
        "partCategory": "Electromagnetic Solenoid Winding",
        "finish": "Polyurethane-Enameled Copper Magnet Wire",
        "dimensions": "Ø 8.0 × 10.0 mm | 1,200 Turns",
        "simple": "A coil of thin copper wire that turns into a magnet when powered by electricity.",
        "technical": "Precision wound copper solenoid (approx. 400 Ω resistance, 400 mW coil power at 12V DC), generating magnetic flux according to Ampere's Law (B = µnI)."
      },
      {
        "id": "iron-core",
        "name": "Ferromagnetic Iron Core",
        "color": 6583435,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.12,
            0.12,
            0.74,
            16
          ]
        },
        "position": [
          -0.35,
          0.48,
          0
        ],
        "metalness": 0.8,
        "roughness": 0.3,
        "description": "Solid high-permeability soft iron cylinder concentrating magnetic flux lines to maximize electromagnetic pulling force on the armature.",
        "partCategory": "Ferromagnetic Flux Core",
        "finish": "Soft Silicon Iron Pole Piece",
        "dimensions": "Cylinder Ø 3.5 × 9.5 mm",
        "simple": "A solid iron cylinder inside the coil that concentrates the magnetic field to pull the switch lever.",
        "technical": "High-permeability soft magnetic iron pole piece channeling magnetic lines of flux with low magnetic remanence to prevent contact latching when de-energized."
      },
      {
        "id": "armature-lever",
        "name": "Armature Lever",
        "color": 9741240,
        "geometry": {
          "type": "box",
          "args": [
            0.75,
            0.07,
            0.25
          ]
        },
        "position": [
          0.12,
          0.84,
          0
        ],
        "rotation": [
          0,
          0,
          -0.08
        ],
        "metalness": 0.82,
        "roughness": 0.28,
        "description": "Spring-loaded magnetic lever attracted down toward the coil pole face when energized, mechanically displacing the movable contact point.",
        "partCategory": "Mechanical Armature & Return Spring",
        "finish": "Spring Steel & Beryllium Copper",
        "dimensions": "Lever 12.0 × 4.5 × 0.8 mm",
        "simple": "A pivoting metal lever that snaps downward when the magnet turns on, moving the switch contacts.",
        "technical": "Pivoting ferromagnetic armature lever balanced by a beryllium-copper return leaf spring, snapping into contact position in under 10 milliseconds."
      },
      {
        "id": "contact-stationary",
        "name": "Stationary Contact Point",
        "color": 14870768,
        "geometry": {
          "type": "sphere",
          "args": [
            0.085,
            16,
            16
          ]
        },
        "position": [
          0.55,
          0.84,
          0
        ],
        "metalness": 0.92,
        "roughness": 0.18,
        "description": "Fixed silver-alloy contact point designed to switch high-power external loads with low contact resistance and high arc erosion resistance.",
        "partCategory": "Stationary Contact Points (NO/NC)",
        "finish": "Silver Nickel Alloy (AgNi90/10)",
        "dimensions": "Contact Rivet Ø 2.0 mm",
        "simple": "Fixed metal contact buttons that the moving switch lever presses against.",
        "technical": "Solid silver-nickel contact rivets formulated to resist electrical arc erosion and contact welding under inductive switching loads up to 10A @ 250V AC."
      },
      {
        "id": "contact-movable",
        "name": "Movable Contact Point",
        "color": 14870768,
        "geometry": {
          "type": "sphere",
          "args": [
            0.085,
            16,
            16
          ]
        },
        "position": [
          0.55,
          0.73,
          0
        ],
        "metalness": 0.92,
        "roughness": 0.18,
        "description": "Opposing silver contact sphere mounted on the flexible bronze leaf spring of the armature mechanism.",
        "partCategory": "Movable Common Contact Leaf",
        "finish": "Silver Nickel Contact Rivet",
        "dimensions": "Contact Rivet Ø 2.0 mm",
        "simple": "The moving contact button carried by the lever that flips between the two circuit positions.",
        "technical": "Flexible contact leaf executing break-before-make double-throw (SPDT) switching between Normally Closed (NC) and Normally Open (NO) terminals."
      },
      {
        "id": "pin-coil-1",
        "name": "Coil Terminal Pin 1 (A1)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            0.42,
            12
          ]
        },
        "position": [
          -0.52,
          -0.16,
          -0.32
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Underneath PCB solder pin delivering input actuation current to the electromagnetic coil.",
        "partCategory": "Coil Activation Pin 1 (A1)",
        "finish": "Tinned Brass PCB Terminal",
        "dimensions": "Ø 0.8 mm × 4.5 mm",
        "simple": "Input pin 1 for powering the internal electromagnet coil.",
        "technical": "Solderable through-hole terminal pin connected to the start of the 12V solenoid winding."
      },
      {
        "id": "pin-coil-2",
        "name": "Coil Terminal Pin 2 (A2)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            0.42,
            12
          ]
        },
        "position": [
          -0.52,
          -0.16,
          0.32
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Return/ground pin completing the low-voltage electromagnetic coil circuit.",
        "partCategory": "Coil Activation Pin 2 (A2)",
        "finish": "Tinned Brass PCB Terminal",
        "dimensions": "Ø 0.8 mm × 4.5 mm",
        "simple": "Input pin 2 for completing the electromagnet coil circuit.",
        "technical": "Opposing coil terminal pin completing the DC solenoid circuit."
      },
      {
        "id": "pin-com",
        "name": "Common Terminal Pin (COM)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            0.42,
            12
          ]
        },
        "position": [
          0.15,
          -0.16,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Center common terminal pin electrically bonded to the movable contact arm.",
        "partCategory": "Common Switch Terminal (COM)",
        "finish": "Tinned Brass Heavy-Duty Terminal",
        "dimensions": "0.8 × 1.2 × 4.5 mm",
        "simple": "The common terminal where the incoming electrical load wire connects.",
        "technical": "Primary circuit terminal connected directly to the movable armature leaf; rated for 10A continuous AC current."
      },
      {
        "id": "pin-no",
        "name": "Normally Open Pin (NO)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            0.42,
            12
          ]
        },
        "position": [
          0.55,
          -0.16,
          0.28
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Load terminal that establishes electrical connection with COM only when the relay coil is actively powered.",
        "partCategory": "Normally Open Terminal (NO)",
        "finish": "Tinned Brass Heavy-Duty Terminal",
        "dimensions": "0.8 × 1.2 × 4.5 mm",
        "simple": "The normally open pin: electricity only flows here when the relay coil is powered on.",
        "technical": "Load contact terminal that remains open during quiescent state and closes upon coil energization."
      },
      {
        "id": "pin-nc",
        "name": "Normally Closed Pin (NC)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            0.42,
            12
          ]
        },
        "position": [
          0.55,
          -0.16,
          -0.28
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Load terminal maintaining electrical connection with COM in the resting unenergized state; breaks open on actuation.",
        "partCategory": "Normally Closed Terminal (NC)",
        "finish": "Tinned Brass Heavy-Duty Terminal",
        "dimensions": "0.8 × 1.2 × 4.5 mm",
        "simple": "The normally closed pin: electricity flows here by default until the relay turns on and disconnects it.",
        "technical": "Load contact terminal that provides continuity in quiescent unpowered state and breaks connection upon coil activation."
      }
    ]
  },
  "transformer": {
    "label": "Step-Down Transformer",
    "category": "Electronic Components",
    "icon": "⚡",
    "viewRadius": 4.5,
    "explodeDistance": 0.85,
    "parts": [
      {
        "id": "core-e",
        "name": "Laminated E-Core (Silicon Steel)",
        "color": 4674921,
        "geometry": {
          "type": "box",
          "args": [
            1.85,
            1.45,
            0.52
          ]
        },
        "position": [
          0,
          0.55,
          0
        ],
        "metalness": 0.78,
        "roughness": 0.32,
        "description": "Stack of varnished silicon-steel E-laminations engineered to conduct magnetic flux with minimal eddy current dissipation and hysteresis losses.",
        "partCategory": "Laminated E-Core (Silicon Steel)",
        "finish": "Grain-Oriented Laminated Silicon Steel",
        "dimensions": "28.0 × 24.0 × 14.0 mm",
        "simple": "E-shaped stacked metal plates that guide magnetic lines of force through the coils with minimal energy loss.",
        "technical": "Stacked assembly of insulated grain-oriented silicon steel (0.35 mm laminations) forming an E-shape to channel magnetic flux while suppressing eddy current power losses."
      },
      {
        "id": "core-i",
        "name": "Laminated I-Core Keeper Cap",
        "color": 3359061,
        "geometry": {
          "type": "box",
          "args": [
            1.85,
            0.26,
            0.56
          ]
        },
        "position": [
          0,
          1.34,
          0
        ],
        "metalness": 0.78,
        "roughness": 0.32,
        "description": "Overlapping I-shaped steel lamination keeper block clamped tightly across the E-core open limbs to create a closed, continuous magnetic circuit.",
        "partCategory": "Laminated I-Core Keeper",
        "finish": "Grain-Oriented Laminated Silicon Steel",
        "dimensions": "28.0 × 6.0 × 14.0 mm",
        "simple": "The flat metal bar clamped against the E-core to close the magnetic loop completely.",
        "technical": "Matching I-bar laminated keeper completing the closed ferromagnetic magnetic flux loop, minimizing magnetic reluctance and flux leakage."
      },
      {
        "id": "coil-primary",
        "name": "Primary Coil Cylinder (Input)",
        "color": 11817737,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.32,
            0.32,
            0.88,
            24
          ]
        },
        "position": [
          -0.48,
          0.55,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.22,
        "description": "Input copper winding wrapped around the left core leg; energized by AC voltage to generate alternating magnetic flux through the iron core.",
        "partCategory": "Primary High-Voltage Winding (Input)",
        "finish": "Dual-Coated Enamelled Copper Magnet Wire",
        "dimensions": "Coil Ø 18 mm | ~2,300 Turns",
        "simple": "The input coil made of many turns of thin wire that connects to high-voltage mains power.",
        "technical": "High-voltage input winding (e.g. 230V AC) wound with fine insulated copper wire (Ø 0.15 mm), creating an alternating magnetic flux in the core."
      },
      {
        "id": "coil-secondary",
        "name": "Secondary Coil Cylinder (Output)",
        "color": 14251782,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.35,
            0.35,
            0.88,
            24
          ]
        },
        "position": [
          0.48,
          0.55,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.22,
        "description": "Secondary copper winding around the right core leg; inductively picks up the alternating magnetic field to produce a galvanic, stepped-down output voltage.",
        "partCategory": "Secondary Low-Voltage Winding (Output)",
        "finish": "Heavy-Gauge Enamelled Copper Wire",
        "dimensions": "Coil Ø 22 mm | ~120 Turns",
        "simple": "The output coil made of fewer turns of thicker wire that delivers safe, lower voltage at higher current.",
        "technical": "Low-voltage output winding (e.g. 12V AC) wound with heavy-gauge copper wire (Ø 0.8 mm), inducing voltage via Faraday's Law (Vp/Vs = Np/Ns) with galvanic isolation."
      },
      {
        "id": "bobbin-base",
        "name": "Bobbin Mounting Base",
        "color": 1976635,
        "geometry": {
          "type": "box",
          "args": [
            2.1,
            0.16,
            0.82
          ]
        },
        "position": [
          0,
          -0.22,
          0
        ],
        "metalness": 0.15,
        "roughness": 0.65,
        "description": "Rigid insulating plastic bobbin flange anchoring the magnetic assembly and securing through-hole circuit terminal pins.",
        "partCategory": "Molded Bobbin & Coil Former",
        "finish": "Glass-Filled Nylon PBT Polymer",
        "dimensions": "22.0 × 20.0 × 18.0 mm",
        "simple": "The plastic spool that holds the coils neatly separated from each other and from the metal core.",
        "technical": "Dielectric coil spool former providing 4,000V AC breakdown isolation between primary and secondary windings in compliance with safety standards."
      },
      {
        "id": "pin-pri-1",
        "name": "Primary Input Pin 1",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            0.38,
            12
          ]
        },
        "position": [
          -0.65,
          -0.42,
          -0.24
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "High-voltage AC mains line input pin soldered to the primary winding.",
        "partCategory": "Primary Input Terminal 1",
        "finish": "Solderable Tinned Copper Pin",
        "dimensions": "Ø 1.0 mm × 5.0 mm",
        "simple": "Mains AC voltage input pin 1.",
        "technical": "Through-hole terminal pin connecting the start of the primary high-voltage winding."
      },
      {
        "id": "pin-pri-2",
        "name": "Primary Input Pin 2",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            0.38,
            12
          ]
        },
        "position": [
          -0.65,
          -0.42,
          0.24
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "High-voltage AC neutral input pin completing the primary circuit.",
        "partCategory": "Primary Input Terminal 2",
        "finish": "Solderable Tinned Copper Pin",
        "dimensions": "Ø 1.0 mm × 5.0 mm",
        "simple": "Mains AC voltage input pin 2.",
        "technical": "Through-hole terminal pin completing the primary mains supply circuit."
      },
      {
        "id": "pin-sec-1",
        "name": "Secondary Output Pin 1",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            0.38,
            12
          ]
        },
        "position": [
          0.65,
          -0.42,
          -0.24
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Low-voltage isolated AC output pin feeding power rectifier circuits.",
        "partCategory": "Secondary Output Terminal 1",
        "finish": "Solderable Tinned Copper Pin",
        "dimensions": "Ø 1.2 mm × 5.0 mm",
        "simple": "Stepped-down low-voltage AC output pin 1.",
        "technical": "High-current secondary output terminal pin delivering safe transformed AC voltage."
      },
      {
        "id": "pin-sec-2",
        "name": "Secondary Output Pin 2",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.035,
            0.035,
            0.38,
            12
          ]
        },
        "position": [
          0.65,
          -0.42,
          0.24
        ],
        "metalness": 0.85,
        "roughness": 0.2,
        "description": "Secondary reference output pin completing the low-voltage circuit.",
        "partCategory": "Secondary Output Terminal 2",
        "finish": "Solderable Tinned Copper Pin",
        "dimensions": "Ø 1.2 mm × 5.0 mm",
        "simple": "Stepped-down low-voltage AC output pin 2.",
        "technical": "High-current secondary output terminal pin completing the secondary load circuit."
      }
    ]
  },
  "fuse": {
    "label": "Glass Cartridge Fuse",
    "category": "Electronic Components",
    "icon": "🛡️",
    "viewRadius": 3.5,
    "explodeDistance": 0.65,
    "parts": [
      {
        "id": "glass-body",
        "name": "Clear Glass Cylinder Body",
        "color": 14742270,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.28,
            0.28,
            1.45,
            24
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "transparent": true,
        "opacity": 0.32,
        "metalness": 0.08,
        "roughness": 0.12,
        "description": "Transparent high-heat borosilicate glass tube that allows visual inspection of the internal filament while safely containing arc energy when blown.",
        "partCategory": "Transparent Arc-Quenching Tube",
        "finish": "High-Temperature Borosilicate Glass",
        "dimensions": "5.2 × 20.0 mm Cylinder Body",
        "simple": "A clear glass cylinder that protects the delicate fuse wire and lets you see if it has blown.",
        "technical": "Thermal-shock-resistant borosilicate glass cylinder capable of containing internal electrical arc plasma and pressure during violent short-circuit rupture up to 1,500A."
      },
      {
        "id": "cap-left",
        "name": "Silver Metal End Cap (Left)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.31,
            0.31,
            0.44,
            24
          ]
        },
        "position": [
          -0.88,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.88,
        "roughness": 0.22,
        "description": "Nickel-plated brass contact ferrule cap crimped to the glass cartridge, establishing reliable electrical connection in fuse clips.",
        "partCategory": "Conductive End Ferrule (Left)",
        "finish": "Nickel-Plated Brass Contact Cap",
        "dimensions": "Ø 5.2 × 5.0 mm Cup",
        "simple": "A shiny metal cap on the left that clips into a fuse holder and conducts electricity.",
        "technical": "Deep-drawn nickel-plated brass ferrule cap providing low contact resistance (<0.005 Ω) when snapped into spring-loaded fuse clips."
      },
      {
        "id": "cap-right",
        "name": "Silver Metal End Cap (Right)",
        "color": 13751771,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.31,
            0.31,
            0.44,
            24
          ]
        },
        "position": [
          0.88,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.88,
        "roughness": 0.22,
        "description": "Opposing silver contact cap stamped with voltage and current ratings (e.g. 5A 250V), sealing the opposite end of the glass tube.",
        "partCategory": "Conductive End Ferrule (Right)",
        "finish": "Nickel-Plated Brass Contact Cap",
        "dimensions": "Ø 5.2 × 5.0 mm Cup",
        "simple": "The matching metal cap on the right completing the circuit.",
        "technical": "Opposing conductive ferrule crimped and soldered to the internal fusible element, rated for 250V AC working voltage."
      },
      {
        "id": "filament-wire",
        "name": "Thin Wire Filament Cylinder",
        "color": 16436245,
        "geometry": {
          "type": "cylinder",
          "args": [
            0.024,
            0.024,
            1.4,
            12
          ]
        },
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          1.5707963267948966
        ],
        "metalness": 0.85,
        "roughness": 0.25,
        "description": "Calibrated low-melting point alloy link wire visible through the clear glass; safely melts via Joule heating (I²R) when overcurrent conditions persist.",
        "partCategory": "Calibrated Fusible Element",
        "finish": "Precision Silver-Copper Fusible Alloy",
        "dimensions": "Ø 0.08 mm × 16.0 mm Wire",
        "simple": "A very thin wire inside that melts and breaks the circuit if dangerous excess current flows, preventing fires.",
        "technical": "Calibrated eutectic silver-copper alloy wire engineered to melt rapidly via Joule heating (Q = I²Rt) when continuous current exceeds 2.0A rating, safely opening the circuit in milliseconds."
      },
      {
        "id": "solder-left",
        "name": "Internal Solder Anchor (Left)",
        "color": 9741240,
        "geometry": {
          "type": "sphere",
          "args": [
            0.075,
            16,
            16
          ]
        },
        "position": [
          -0.68,
          0,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.25,
        "description": "Internal solder bead securing the wire filament mechanically and electrically to the inside of the left cap.",
        "partCategory": "Internal Hermetic Solder Anchor (Left)",
        "finish": "Lead-Free High-Melting Solder Joint",
        "dimensions": "Solder Bead Ø 1.5 mm",
        "simple": "A drop of solder anchoring the fuse wire to the left metal cap.",
        "technical": "High-melting-point eutectic solder anchor securing the fusible filament under mechanical tension to the end-cap interior."
      },
      {
        "id": "solder-right",
        "name": "Internal Solder Anchor (Right)",
        "color": 9741240,
        "geometry": {
          "type": "sphere",
          "args": [
            0.075,
            16,
            16
          ]
        },
        "position": [
          0.68,
          0,
          0
        ],
        "metalness": 0.85,
        "roughness": 0.25,
        "description": "Opposing internal solder junction securing the fusible filament wire to the right cap.",
        "partCategory": "Internal Hermetic Solder Anchor (Right)",
        "finish": "Lead-Free High-Melting Solder Joint",
        "dimensions": "Solder Bead Ø 1.5 mm",
        "simple": "A drop of solder anchoring the fuse wire to the right metal cap.",
        "technical": "Matching solder anchor completing the hermetic electrical bridge between filament and right contact cap."
      }
    ]
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { OBJECTS };
}
