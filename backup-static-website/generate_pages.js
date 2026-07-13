const fs = require('fs');
const path = require('path');

const outDir = __dirname;

const products = [
    {
        filename: "water-filling-machine.html",
        title: "Water Filling Machine",
        category: "Bottle Filling Machines",
        seoTitle: "Mineral Water Filling Machine | Automatic Water Bottling Plant",
        seoDesc: "Leading manufacturer of automatic mineral water filling machines in India. High-speed washing, filling & capping for PET bottles. Request a quote today.",
        tagline: "High-Speed Monoblock Water Bottling Solutions",
        overview: "SHIV SHAKTI WATER EQUIPMENT PVT. LTD. manufactures heavy-duty, fully automatic Mineral Water Filling Machines designed for modern bottling plants. Our reliable 3-in-1 monoblock system integrates washing, filling, and capping into a single, compact framed unit. Built completely from SS 304/316 contact parts, it ensures 100% hygienic water packaging suitable for pack sizes ranging from 200ml to 2000ml. Engineered for minimal downtime and maximal precision, our filling lines help you achieve incredible production throughput while strictly adhering to international purity standards.",
        image: "prod_water_filling.png",
        topFeatures: [
            "Output capacity from 20 BPM up to 300 BPM",
            "Suitable for 200ml to 2000ml PET/Glass bottles",
            "Integrated Neck Handling Technology",
            "Advanced PLC Touchscreen Control"
        ],
        benefits: [
            { title: "No Bottle, No Fill System", desc: "Smart optical sensors ensure the valves only open when a bottle is securely positioned, saving water wastage." },
            { title: "Magnetic Capping Head", desc: "Provides constant torque to prevent cap damage and ensures absolute leak-proof sealing." },
            { title: "PLC Interface Control", desc: "Fully programmed with a touchscreen HMI for easy speed adjustment, volume tracking, and fault diagnosis." },
            { title: "SS 304/316 Construction", desc: "Food grade stainless steel is utilized on all contact parts supporting GMP standard layouts." }
        ],
        specs: [
            { k: "Production Capacity", v: "20 to 300 Bottles Per Minute (BPM)" },
            { k: "Bottle Size Supported", v: "200 ml to 2000 ml" },
            { k: "Machine Construction", v: "Contact Parts: SS 316. Outer Body: SS 304" },
            { k: "Power Requirement", v: "3 Phase, 440 V, 50Hz (5 kW - 15 kW)" },
            { k: "Automation Level", v: "Fully Automatic Multi-Head Machine" },
            { k: "Control System", v: "Delta / Mitsubishi PLC with 7\" Touch Screen" }
        ]
    },
    {
        filename: "juice-filling-machine.html",
        title: "Juice Filling Machine",
        category: "Bottle Filling Machines",
        seoTitle: "Hot Juice Filling Machine | RTS Beverage Bottling Plant",
        seoDesc: "Premium hot juice filling machines designed for fruit juices, pulps, and RTS beverages. Advanced temperature consistency and hygiene features.",
        tagline: "Advanced Hot Fill Technology for Beverages",
        overview: "Our Automatic Juice Filling Machines are specially designed for hot-fill applications, perfect for fruit juices, nectar, iced tea, and flavoured milk. Maintaining a consistent temperature is critical in juice packaging to ensure product shelf life and prevent contamination. Our machinery features a state-of-the-art recirculation system to maintain juice temperature right up to the filling nozzle. Designed with an advanced micro-negative pressure filling method, it delivers rapid, extremely precise fills without bubbling or overflow.",
        image: "prod_juice_filling.png",
        topFeatures: [
            "Micro-negative pressure hot filling (Up to 95°C)",
            "Automatic product recirculation system",
            "Integrated CIP (Clean-In-Place) compatibility",
            "Precision fill level accuracy (± 2mm)"
        ],
        benefits: [
            { title: "Temperature Stabilization", desc: "Maintains optimal liquid temperature during the entire fill process to ensure zero spoilage." },
            { title: "Pulp Flow Control", desc: "Specially designed wide-nozzle valves to accommodate juices with high pulp content smoothly." },
            { title: "CIP Ready", desc: "Equipped with automatic wash cups for effortless transition and high-temp cleaning between batches." },
            { title: "Heavy Duty Frame", desc: "Constructed with vibration-dampening heavy steel platforms to ensure precision at top speeds." }
        ],
        specs: [
            { k: "Production Capacity", v: "24 to 200 Bottles Per Minute (BPM)" },
            { k: "Filling Temperature", v: "60°C to 95°C (Adjustable)" },
            { k: "Bottle Type Compatibility", v: "Hot-fill PET, Glass Bottles" },
            { k: "Material of Construction", v: "SS 316L (Highest Grade) for liquid contact" },
            { k: "Cleaning Mechanism", v: "Integrated Dummy Cups for CIP" },
            { k: "Control System", v: "Touch Panel HMI Data Logging" }
        ]
    },
    {
        filename: "soda-filling-machine.html",
        title: "Soda Filling Machine",
        category: "Bottle Filling Machines",
        seoTitle: "CSD & Soda Filling Machine | Carbonated Drink Bottling",
        seoDesc: "High-pressure isobaric filling machines for soda and CSD. Prevent flat drinks with our precision counter-pressure bottling equipment.",
        tagline: "Isobaric Precision for Carbonated Soft Drinks (CSD)",
        overview: "Bottling carbonated beverages requires exact pressure handling. Our Automatic Soda Filling Machines utilize highly advanced iso-baric (counter-pressure) filling principles. Before the liquid enters the bottle, the pressure inside the bottle is equalized with the filler bowl, resulting in absolutely zero foaming or degassing. Perfect for club soda, sparkling water, and fizzy soft drinks. Backed by heavy pneumatic systems and leak-immune piping, our machine ensures your product stays highly carbonated from the plant to the customer's glass.",
        image: "prod_soda_filling.png",
        topFeatures: [
            "Advanced Counter-Pressure (Isobaric) Filling",
            "Anti-foaming operation technology",
            "Withstands high internal carbonation PSI",
            "Capable of handling PET and thick Glass"
        ],
        benefits: [
            { title: "Zero Carbonation Loss", desc: "Equalized pressurized filling chamber makes sure no CO2 escapes during the packaging transition." },
            { title: "Snift Valve Technology", desc: "Automatically slowly releases headspace pressure before capping to prevent liquid eruption." },
            { title: "Ultra-Seal Capping", desc: "High-tension cap applicators ensure that internal gas pressure doesn't compromise the bottle seal." },
            { title: "Tough Stainless Infrastructure", desc: "Thick-walled SS 316 filler bowls designed strictly to withstand immense internal PSI variations." }
        ],
        specs: [
            { k: "Production Capacity", v: "30 to 240 Bottles Per Minute (BPM)" },
            { k: "Filling Method", v: "Isobaric Counter-Pressure" },
            { k: "Operating Pressure", v: "Up to 5 - 7 Bar / 100 PSI" },
            { k: "Bottle Size Supported", v: "250 ml to 2000 ml" },
            { k: "Snifting Phase", v: "Adjustable electronic pneumatic snift" },
            { k: "Material of Construction", v: "SS 316 High-Pressure Contacts, SS 304 Body" }
        ]
    },
    {
        filename: "beer-filling-machine.html",
        title: "Beer Filling Machine",
        category: "Bottle Filling Machines",
        seoTitle: "Commercial Beer Filling Machine | Microbrewery Bottling",
        seoDesc: "Double pre-evacuation beer filling equipment ensuring near-zero dissolved oxygen. Robust stainless steel bottling for breweries.",
        tagline: "Oxygen-Free Bottling for Craft and Commercial Breweries",
        overview: "The greatest enemy of fresh beer is oxygen. The Shiv Shakti Beer Filling Machine is engineered with rigorous double pre-evacuation technology designed to flush bottles with CO2 multiple times before filing. This dramatically reduces dissolved oxygen (DO) pickup, drastically extending the shelf life and preserving the authentic flavor profile of your brew. Combining a long-tube filling mechanism to minimize agitation, and ultra-hygienic automated capping/crowning, it is the ultimate, affordable scaling solution for microbreweries and large-scale beer manufacturers alike.",
        image: "prod_beer_filling.png",
        topFeatures: [
            "Double pre-evacuation vacuum flushing",
            "Long-tube low-agitation liquid dispensing",
            "Supports Crown Corking and ROPP/Screw Caps",
            "Extremely low Total Packaged Oxygen (TPO)"
        ],
        benefits: [
            { title: "Double Pre-Evacuation", desc: "Evacuates air, flushes inert CO2, evacuates again. Ensures <50ppb oxygen pickup." },
            { title: "Foam Stimulation (Fobbing)", desc: "Controlled micro-jet of water post-fill causes foam to rise, pushing out remaining headspace air." },
            { title: "Versatile Crowning", desc: "High-speed magnetic or mechanical crowning heads built for heavy glass beer bottles." },
            { title: "Sanitary Layout", desc: "Sloped bases and zero dead-leg piping absolutely prevents microbial buildup in the brewhouse." }
        ],
        specs: [
            { k: "Production Capacity", v: "1000 to 12000 Bottles Per Hour" },
            { k: "Bottle Type", v: "Standard Glass Beer Containers (330ml, 650ml)" },
            { k: "Capping Type", v: "Crown Corking / ROPP Aluminum / Twist-off" },
            { k: "Vacuum Pump", v: "Liquid ring extremely high-suction vacuum" },
            { k: "Oxygen Pickup (TPO)", v: "Consistently under 0.05 mg/L" },
            { k: "Sanitation Standard", v: "100% Steam-Sterilizable (SIP) capable" }
        ]
    },
    {
        filename: "inkjet-batch-coding.html",
        title: "Inkjet Batch Coding",
        category: "Batch Coding Machine",
        seoTitle: "Industrial Inkjet Batch Coding Machine | MRP & Date Printers",
        seoDesc: "Continuous inkjet (CIJ) batch coding machines for printing MRP, Expiry, and Batch numbers on bottles at high speeds. Zero downtime printing.",
        tagline: "High-Velocity Clarity for Production Traceability",
        overview: "Ensure flawless compliance and product traceability with our Continuous Inkjet (CIJ) Batch Coding machines. Designed to seamlessly integrate directly over your conveyor lines, it prints dynamic information including Manufacturing Dates, Expiry Dates, MRP, Lot Numbers, and Barcodes in real-time. Whether printing on curved PET shoulders, damp glass, or flexible shrink wrap, the non-contact printhead guarantees crisp, instantly-drying text without slowing down production speed. The system is self-cleaning and engineered to prevent nozzle clogging during idle shifts.",
        image: "prod_inkjet_coding.png",
        topFeatures: [
            "Non-contact continuous inkjet (CIJ) technology",
            "High-speed precision (up to 300 meters/min)",
            "Automatic printhead self-flushing system",
            "Multi-line printing capabilities (up to 4 lines)"
        ],
        benefits: [
            { title: "Any-Surface Adhesion", desc: "Specialized solvent-based inks dry in under a second on plastics, glass, wrappers, and metals." },
            { title: "Smart Ink Management", desc: "Minimal makeup consumption with sealed cartridge systems ensures zero spillage and low running cost." },
            { title: "Intuitive Interface", desc: "Drag-and-drop touchscreen makes editing dates, prices, and logos incredibly simple for operators." },
            { title: "IP55/IP65 Industrial Build", desc: "Dust and washdown-proof enclosure protects internal electronics in harsh factory environments." }
        ],
        specs: [
            { k: "Printing Lines", v: "1 to 4 Lines of Text/Numbers/Logos" },
            { k: "Font Matrix", v: "5x5, 7x5, 9x7, 12x12, 16x16, 24x24" },
            { k: "Print Speed", v: "Up to 300 m/min (Single Line 7x5)" },
            { k: "Print Distance", v: "2mm to 15mm from product surface" },
            { k: "Consumables", v: "Dye-based Black, Colored, and UV-readable Inks" },
            { k: "Data Input", v: "USB interface, Ethernet, RS232" }
        ]
    },
    {
        filename: "sticker-labelling-machine.html",
        title: "Sticker Labelling Machine",
        category: "Labeling Machine",
        seoTitle: "Automatic Sticker Labelling Machine | Round & Flat Bottles",
        seoDesc: "High-precision wrap-around and double-sided sticker labelling machines for PET/Glass bottles. Servo-driven accuracy for flawless aesthetics.",
        tagline: "Flawless Branding Application at Every Speed",
        overview: "First impressions matter on retail shelves. Our Fully Automatic Sticker Labelling Machines guarantee perfect, bubble-free label placement every single time. Utilizing high-end servo or stepper motor technology, the machine continuously dispenses self-adhesive pressure-sensitive sticker labels onto passing bottles with an accuracy of ±1mm. Designed to handle round, flat, square, and oval containers, the highly adjustable applicator heads and heavy-duty conveyor synchronization make it a versatile asset for food, pharma, and beverage industries.",
        image: "prod_sticker_labelling.png",
        topFeatures: [
            "Partial, full wrap-around, or multi-side application",
            "No-Bottle, No-Label optical sensing",
            "Microprocessor controlled servo-dispenser",
            "In-built rolling mechanism for zero-bubble finish"
        ],
        benefits: [
            { title: "Pinpoint Placement Accuracy", desc: "Tolerances tightened to ±1mm using high-speed fiber-optic gap sensors." },
            { title: "Versatile Container Support", desc: "Simple screw adjustments allow rapid changeovers between diametrically different bottles." },
            { title: "Online Coding Integration", desc: "Can be perfectly synchronized with Inkjet or Thermal printers to print batch data directly onto the label before dispensing." },
            { title: "Low Maintenance Mechanics", desc: "Virtually wear-free stepper driver motors require zero lubrication or complex belt replacements." }
        ],
        specs: [
            { k: "Labeling Speed", v: "40 to 150 Bottles Per Minute" },
            { k: "Label Roll Diameter", v: "Max Inner 76mm / Max Outer 300mm" },
            { k: "Label Type", v: "Self-adhesive paper, transparent film, metalized" },
            { k: "Dispensing Motor", v: "High Torque Servo / Stepper Motor" },
            { k: "Accuracy", v: "± 1.0 mm" },
            { k: "Power Requirement", v: "Single Phase, 220V, 50Hz, 1.5 kW" }
        ]
    },
    {
        filename: "bopp-labelling-machine.html",
        title: "BOPP Labelling Machine",
        category: "Labeling Machine",
        seoTitle: "Hot Melt BOPP Labelling Machine | Wrap Around Labels",
        seoDesc: "Cost-effective Hot Melt Glue BOPP Labelling Machines for high-volume mineral water and beverage production lines. Fast, secure wrap-around application.",
        tagline: "High-Volume, Low-Cost Wrap Around Perfection",
        overview: "For mass-market bottled water and beverages, label aesthetics must meet cost-efficiency. Our BOPP Hot Melt Glue Labelling Machines wrap thin, vibrant film labels entirely around the bottle at extraordinary speeds, using merely drops of hot melt adhesive. This method is incredibly economical compared to standard stickers. The machine features an integrated rotary wheel design, a highly precise glue wheel array, and a rotary knife system that beautifully cuts the continuous roll into perfectly sized labels exactly when needed.",
        image: "prod_bopp_labelling.png",
        topFeatures: [
            "Tremendous economic savings on label material",
            "Incredibly fast rotary application (up to 300 BPM)",
            "Automatic tension control for continuous feed",
            "Precision servo-driven rotary cutter"
        ],
        benefits: [
            { title: "Minimal Glue Consumption", desc: "Glue is only applied in thin micro-strips at the leading and trailing edges of the BOPP label." },
            { title: "Endless Roll Capacity", desc: "Takes massive continuous label rolls, drastically minimizing the amount of machine stops for operator reloading." },
            { title: "Long-life Diamond Cutters", desc: "Extremely durable rotating cutting blades require infrequent sharpening, providing razor-clean cuts." },
            { title: "Safety Enclosures", desc: "Completely enclosed operation ensures operator safety around hot-melt glue tanks and high-speed rotary parts." }
        ],
        specs: [
            { k: "Production Speed", v: "100 to 300 Bottles Per Minute" },
            { k: "Label Material", v: "BOPP Film, OPP, Paper Wrap" },
            { k: "Container Types", v: "PET Round & Square, Glass Round" },
            { k: "Glue Type", v: "Standard Hot Melt Adhesive (Operating 130°C-160°C)" },
            { k: "Cutting Mechanism", v: "Rotary Knife on Central Drum" },
            { k: "Machine Weight", v: "Approx ~1500 KG to 3000 KG" }
        ]
    },
    {
        filename: "chemical-lab.html",
        title: "Chemical Lab Equipment",
        category: "Lab for Testing",
        seoTitle: "Water Chemical Testing Lab Equipment | BIS Standard Kits",
        seoDesc: "Comprehensive chemical lab equipment setups for mineral water testing. Ensure your water meets rigorous IS/ WHO safety and pH standards.",
        tagline: "Absolute Certainty in Water Chemistry",
        overview: "Quality cannot be guessed; it must be quantified. We provide complete, turn-key Chemical Laboratory equipment grids required for any commercial Packaged Drinking Water plant. From maintaining optimal pH and balancing Total Dissolved Solids (TDS), to detecting hard metals and determining precise ozone levels, our standardized lab tools ensure you continually pass rigorous IS-14543 and WHO standards. This empowers your in-house chemists with accurate, immediate feedback regarding your plant's internal purification health.",
        image: "prod_chemical_lab.png",
        topFeatures: [
            "Complete compliance with BIS regulations",
            "High-precision digital TDS and pH meters",
            "Ozone & Chlorine residue testing photometers",
            "Durable glassware and reagent kits"
        ],
        benefits: [
            { title: "Immediate Quality Feedback", desc: "Run daily batch tests directly at your facility without waiting for external third-party lab delays." },
            { title: "Digital Precision", desc: "Advanced micro-processor based benchtop meters yield accurate readouts unaffected by human error." },
            { title: "Regulatory Assurance", desc: "Ensures that state inspectors and auditors consistently find your production facility 100% compliant." },
            { title: "Comprehensive Setup", desc: "We provide absolutely everything: burettes, pipettes, analytical balances, hot plates, and safety gear." }
        ],
        specs: [
            { k: "Compliance Standard", v: "As per IS:14543 / IS:13428 / WHO" },
            { k: "Digital Equipment Included", v: "pH Meter, TDS Meter, Conductivity Meter, Turbidity Meter" },
            { k: "Analytical Balance", v: "Precision level up to 0.1 mg" },
            { k: "Heating Tools", v: "Digital Hot Plate / Water Bath" },
            { k: "Glassware Grade", v: "Borosilicate 3.3 Lab Grade" },
            { k: "Chemicals", v: "Initial supply of standard testing Reagents & Buffers" }
        ]
    },
    {
        filename: "micro-biology-lab.html",
        title: "Micro-Biology Lab Setup",
        category: "Lab for Testing",
        seoTitle: "Microbiology Lab Equipment for Water Bottling Plants",
        seoDesc: "Ensure zero bacterial contamination with our Microbiology Lab Setups. Incubators, laminar airflows, and autoclaves for safe drinking water.",
        tagline: "Guarding Consumer Health at the Microscopic Level",
        overview: "While chemical composition determines the taste and makeup of your water, microbiology determines its absolute safety. A single undetected bacterial colony can ruin a factory's reputation and harm consumers. Shiv Shakti provides comprehensive microbiological laboratory setups perfectly calibrated to culture, detect, and analyze pathogens like E. Coli, Coliforms, and Yeast/Molds. Our sterile setups give your quality control officers the sterile isolation environments and precision temperature incubation required for ironclad biological safety testing.",
        image: "prod_microbiology_lab.png",
        topFeatures: [
            "Complete biological detection readiness",
            "Sterile isolation via Laminar Airflow Units",
            "High-pressure Autoclave sterilizers",
            "Bacteriological digital BOD Incubators"
        ],
        benefits: [
            { title: "Contamination Prevention", desc: "Identify invisible biological threats before product leaves the warehouse floor." },
            { title: "Sterile Workspace", desc: "HEPA-filtered Laminar airflow benches guarantee that samples are not contaminated by ambient room air." },
            { title: "Precision Incubation", desc: "Digitally controlled PID heating ensures the exact temperature required to successfully culture specific pathogen samples." },
            { title: "Deep Sterilization", desc: "High-pressure saturated steam autoclaves completely sterilize used glassware and destroyed biological waste." }
        ],
        specs: [
            { k: "Regulatory Compliance", v: "IS-14543 standards for packaged water" },
            { k: "Laminar Airflow", v: "HEPA Filter 99.99% efficiency down to 0.3 micron" },
            { k: "Autoclave Capacity", v: "Standard Vertical SS 304 (20L to 50L)" },
            { k: "BOD Incubator", v: "Temperature Range: 5°C to 60°C Digital Control" },
            { k: "Microscope Included", v: "Binocular / Trinocular analytical microscope" },
            { k: "Additional Items", v: "Colony Counter, Millipore Filters, Petri Dishes" }
        ]
    },
    {
        filename: "r-o-plant.html",
        title: "Industrial R.O. Plant",
        category: "R.O Plant",
        seoTitle: "Industrial RO Water Purifier Plant | Reverse Osmosis Systems",
        seoDesc: "Heavy-duty Industrial Reverse Osmosis (R.O.) plants for mineral water manufacturing. Multi-stage filtration delivering extremely pure water outputs.",
        tagline: "The Heart of Purity: Multi-Stage Reverse Osmosis",
        overview: "The core of any successful bottling business begins with the highest quality of raw water purification. Our Industrial Reverse Osmosis (RO) plants are engineered to strip bore-well, municipal, or river water of 99% of dissolved solids, heavy metals, pesticides, and microbial contaminants. Utilizing heavy-duty high pressure feed pumps along with premium Dow/Hydranautics membranes, the system operates constantly with immense reliability. It comes fully integrated with multimedia sand filters, activated carbon systems, antiscalant dosing, and UV/Ozone final treatments, guaranteeing sweet-tasting, crystal clear drinking water.",
        image: "prod_water_filling.png",
        topFeatures: [
            "Output capacities scaling from 500 LPH to 20,000+ LPH",
            "Comprehensive Multi-stage pre-filtration array",
            "Premium quality Filmtec / Hydranautics membranes",
            "Fully automated microprocessor-based backwashing"
        ],
        benefits: [
            { title: "Maximized Yield Recovery", desc: "Efficient membrane configurations optimize the percentage of pure water recovered while minimizing reject waste." },
            { title: "Intelligent Antiscalant Dosing", desc: "Automated injection systems protect delicate membranes from calcium hardness, tripling their lifespan." },
            { title: "Stainless Steel Framework", desc: "Completely rust-proof SS 304 skid mounting guarantees the plant looks clean and professional for decades." },
            { title: "Ozonation Integration", desc: "Final stage ozone injection completely guarantees residual sterilization safely inside the finalized sealed bottle." }
        ],
        specs: [
            { k: "Plant Capacity", v: "500 LPH to 50,000 LPH options" },
            { k: "Pre-Filtration", v: "Sand Media / Activated Carbon / Micron Filters" },
            { k: "High Pressure Pump", v: "Vertical Multistage SS pump (Grundfos / CNP)" },
            { k: "RO Membrane Element", v: "Dow Filmtec / Toray / Hydranautics (8040 / 4040)" },
            { k: "Recovery Rate", v: "50% to 75% depending on Feed Water TDS" },
            { k: "Disinfection Stage", v: "UV Sterilizer + Automatic Ozone System" }
        ]
    },
    {
        filename: "fully-automatic-shrink-wrapping-machine.html",
        title: "Fully Automatic Shrink Wrapping Machine",
        category: "Shrink Wrapping Machine",
        seoTitle: "Fully Automatic Shrink Wrapping Machine | Web Sealer",
        seoDesc: "Automotive high-speed web sealer and shrink wrapping machines. Bundle wrap water bottles efficiently with PE film directly inline.",
        tagline: "Inline Heavy-Duty Bulk Bundling Solutions",
        overview: "Ditch the expensive corrugated cardboard cartons and utilize efficient PE film grouping. Our Fully Automatic Shrink Wrapping (Web Sealer) machines seamlessly connect directly to the end of your bottle packaging line. It automatically accumulates arriving bottles, groups them into matrices (e.g., 3x4, 4x6), wraps them tightly in a sleeve of heavy-duty Polyethylene (PE) shrink film, and conveys them through an industrial heat tunnel. They emerge tightly bound, sturdy, and ready to be loaded onto shipping pallets without any manual labor overhead.",
        image: "hero_machine_2.png",
        topFeatures: [
            "Fully inline automatic collation & grouping",
            "Heavy-duty heating tunnel with turbulent fans",
            "Teflon-coated sealing jaw ensures zero fumes/sticking",
            "Variable speed conveyor integration"
        ],
        benefits: [
            { title: "Drastic Cost Reduction", desc: "Replaces highly expensive cardboard boxes with drastically cheaper and more durable PE film packaging." },
            { title: "Zero Labor Intervention", desc: "Automatically counts, groups, pushes, seals, and shrinks without requiring a single human operator." },
            { title: "Robust Heating Profile", desc: "Double-insulated tunnel prevents heat loss, ensuring thick films shrink uniformly around complex bottle shapes." },
            { title: "Smart Accumulation", desc: "Sensors detect back-pressure from the filling line and auto-modulate speed to prevent bottle jamming." }
        ],
        specs: [
            { k: "Packing Speed", v: "8 to 15 Packs (Bundles) Per Minute" },
            { k: "Film Material Used", v: "LDPE Shrink Film (50 to 100 Microns)" },
            { k: "Bottle Collation Formats", v: "12, 24, 30 bottles per pack" },
            { k: "Heating Tunnel Temp", v: "Adjustable 150°C to 220°C" },
            { k: "Sealing Blade Mechanism", v: "Pneumatic powered hot knife (Teflon Coated)" },
            { k: "Power Consumption", v: "3 Phase, 440V, Approx 18 kW to 24 kW" }
        ]
    },
    {
        filename: "semi-automatic-shrink-wrapping-machine.html",
        title: "Semi Automatic Shrink Wrapping Machine",
        category: "Shrink Wrapping Machine",
        seoTitle: "Semi Automatic Web Sealer Shrink Wrapping Machine",
        seoDesc: "Affordable and highly durable semi-automatic shrink wrapping machines for medium scale water and beverage bottling setups.",
        tagline: "Affordable & Assured Bulk Packaging",
        overview: "Perfect for start-ups and medium-scale bottling operations, our Semi-Automatic Web Sealer & Shrink Wrapping machine provides the same robust final packaging quality as fully automatic systems, but at a fraction of the capital investment. An operator simply places the grouped bottles (or a pre-filled tray) onto the feeding platform and presses a button. The pneumatic pusher drives the bottles through the film curtain, the heated jaw seals the sleeve, and the bundle smoothly rolls through the high-temperature shrink tunnel, emerging factory-tight.",
        image: "hero_machine_3.png",
        topFeatures: [
            "User-friendly dual-push button safety operation",
            "Pneumatically driven sealing and pushing rams",
            "Industrial-grade Shrink Tunnel attached",
            "Easily adaptable to varying bottle sizes & formats"
        ],
        benefits: [
            { title: "Low Investment, High Output", desc: "An incredibly fast ROI (Return on Investment) compared to fully automated continuous lines." },
            { title: "Quick Changeovers", desc: "No complex PLC programs to change; simply adjust the guide rails manually in seconds for a different bottle size." },
            { title: "Thick Film Support", desc: "Heavy sealing jaws powered by compressed air easily cut and seal extra-heavy LDPE films for long-distance transport." },
            { title: "Cool-Down Fan Station", desc: "An integrated cooling fan at the exit exit instantly solidifies the hot plastic, holding the bottles firmly in place." }
        ],
        specs: [
            { k: "Packing Speed", v: "4 to 7 Packs Per Minute (Operator Dependent)" },
            { k: "Operation Type", v: "Semi-Auto (Manual grouping, Auto sealing/shrinking)" },
            { k: "Film Used", v: "LDPE Shrink Film" },
            { k: "Pneumatic Air Supply", v: "5 to 6 Bar Compressor required" },
            { k: "Tunnel Dimensions", v: "Varies; typically 1500mm Length x 600mm Width" },
            { k: "Power Input", v: "3 Phase, 440V, Approx 15 kW Elements" }
        ]
    },
    {
        filename: "fully-automatic-blow-moulding-machine.html",
        title: "Fully Automatic Blow Moulding Machine",
        category: "Pet Blow molding Machine",
        seoTitle: "Fully Automatic PET Blow Moulding Machine | Bottle Maker",
        seoDesc: "High-speed automatic PET stretch blow moulding machines. Manufacture your own PET bottles instantly on your production floor.",
        tagline: "Uninterrupted High-Speed Bottle Manufacturing",
        overview: "Eliminate the massive logistical costs of transporting empty bottles by manufacturing them exactly when you need them. The Fully Automatic PET Stretch Blow Moulding Machine takes compact, cheap PET preforms and magically stretches and blows them into finalized bottles at intense speeds. Featuring an automatic preform hopper, infrared heating ovens with independent zone control, and heavy-tonnage pneumatic clamping, this machine connects directly via air conveyors to your filling line. It is the pinnacle of vertical integration for modern packaging plants.",
        image: "hero_machine_4.png",
        topFeatures: [
            "Fully automated preform feeding to bottle ejection",
            "Advanced Infrared (IR) rotary heating ovens",
            "Servo-controlled stretching rods for uniform thickness",
            "High-pressure air recuperation system (Saves Power)"
        ],
        benefits: [
            { title: "Total Vertical Integration", desc: "Never depend on third-party bottle suppliers again. Drastically lower your cost-per-liter." },
            { title: "Perfect Wall Thickness", desc: "Independent heating lamps and advanced stretching profiles ensure minimum weight bottles with maximum crush resistance." },
            { title: "Rapid Mold Swap", desc: "Slide-out mold mounting designs allow you to switch bottle shapes (e.g., from 500ml to 1000ml) in under an hour." },
            { title: "Air Recovery", desc: "Captures the intense exhaust pressure after a blow cycle and re-routes it to drive the mechanical pneumatic cylinders." }
        ],
        specs: [
            { k: "Production Capacity", v: "2000 to 6000 Bottles Per Hour (Based on cavities)" },
            { k: "Number of Cavities", v: "2, 4, 6 cavity mold options" },
            { k: "Max Bottle Volume", v: "2.0 Liters (Standard Model)" },
            { k: "Air Compressor Needs", v: "High Pressure (30 Bar) + Low Pressure (8 Bar)" },
            { k: "Clamping Force", v: "Pneumatic or Servo Toggle (High Tonnage)" },
            { k: "Control Interface", v: "Advanced Touchscreen PLC with fault logging" }
        ]
    },
    {
        filename: "semi-automatic-blow-moulding-machine.html",
        title: "Semi Automatic Blow Moulding Machine",
        category: "Pet Blow molding Machine",
        seoTitle: "Semi Automatic PET Blow Moulding Machine",
        seoDesc: "Versatile and economical Semi-Automatic Pet Blow Moulding machines. Ideal for manufacturing diverse bottle shapes and sizes up to 20 Liters.",
        tagline: "Unmatched Flexibility in Bottle Production",
        overview: "The Semi-Automatic PET Blow Moulding Machine remains the foundational workhorse for hundreds of successful bottling businesses worldwide. It is split into two distinct units: a standalone Infrared Preform Heater, and the Main Blowing unit. An operator simply places heated preforms into the mold, hits dual-safety buttons, and the machine pneumatically locks the mold and blows the bottle. Its greatest advantage is incredible versatility and extremely low mold-replacement costs, making it ideal for producing unique geometries or large 20-Litre water jars.",
        image: "prod_juice_filling.png",
        topFeatures: [
            "Economical entry into self-manufacturing PET",
            "Standalone infrared continuous preform heater",
            "Can blow massive sizes (up to 20L Water Jars)",
            "Rugged, highly repairable mechanical design"
        ],
        benefits: [
            { title: "Supreme Versatility", desc: "Easily switch from blowing small 200ml rounded bottles to 5L square oil containers in the same afternoon." },
            { title: "Affordable Tooling", desc: "Simple 2-cavity or 1-cavity molds are incredibly cheap to CNC machine, allowing for infinite brand packaging experimentation." },
            { title: "Compact Footprint", desc: "Requires very little factory floor space compared to massive fully automated rotary blowers." },
            { title: "Dual Button Safety", desc: "Forces the operator to use both hands simultaneously to close the incredibly powerful mold clamp, ensuring zero accidents." }
        ],
        specs: [
            { k: "Production Capacity", v: "800 to 1200 Bottles Per Hour (1L Size)" },
            { k: "Heating Zones", v: "Adjustable Infrared Heaters with rotation" },
            { k: "Max Bottle Size", v: "Options available to blow 20 Liter / 5 Gallon Jars" },
            { k: "Mode of Operation", v: "Manual preform load, Auto Blow Cycle" },
            { k: "Mold Clamping", v: "Pneumatic / Hydro-Pneumatic Toggle" },
            { k: "Required Air", v: "High Pressure (25-30 Bar) Compressor Required" }
        ]
    }
];

// Fallback images logic (the user requested specific image names, let's use them by checking if they exist, or using fallbacks in HTML)
// Actually we will just output the HTML with the images the user provided as placeholders.

// HTML Template function
function generateHTML(p) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${p.seoTitle}</title>
    <meta name="description" content="${p.seoDesc}">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <!-- Header -->
    <header class="site-header scrolled" id="header">
        <div class="container header-container">
            <a href="index.html" class="logo">
                <img src="assets/images/shiv_shakti_logo.png" alt="SHIV SHAKTI WATER EQUIPMENT PVT. LTD. Logo">
            </a>
            <nav class="main-nav" id="mainNav">
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li class="has-dropdown">
                        <a href="products.html" class="active">Our Products <span class="arrow">&#9660;</span></a>
                        <ul class="dropdown">
                            <li class="has-subdropdown">
                                <a href="products.html#cat-bottle-filling">Bottle Filling Machines <span class="arrow">&#9654;</span></a>
                                <ul class="subdropdown">
                                    <li><a href="water-filling-machine.html">Water Filling Machine</a></li>
                                    <li><a href="juice-filling-machine.html">Juice Filling Machine</a></li>
                                    <li><a href="soda-filling-machine.html">Soda Filling Machine</a></li>
                                    <li><a href="beer-filling-machine.html">Beer Filling Machine</a></li>
                                </ul>
                            </li>
                            <li><a href="products.html#cat-batch-coding">Batch Coding <span class="arrow">&#9654;</span></a></li>
                            <li><a href="products.html#cat-labeling">Labeling Machines <span class="arrow">&#9654;</span></a></li>
                            <li><a href="products.html#cat-lab">Lab Equipment <span class="arrow">&#9654;</span></a></li>
                            <li><a href="products.html#cat-ro-plant">R.O Plant <span class="arrow">&#9654;</span></a></li>
                            <li><a href="products.html#cat-shrink">Shrink Wrapping <span class="arrow">&#9654;</span></a></li>
                            <li><a href="products.html#cat-blow">Blow Molding <span class="arrow">&#9654;</span></a></li>
                        </ul>
                    </li>
                    <li><a href="index.html#video">Video</a></li>
                    <li><a href="index.html#contact">Contact Us</a></li>
                </ul>
                <div class="header-actions">
                    <a href="index.html#quote" class="btn btn-orange nav-cta">Request A Quote</a>
                    <a href="index.html#brochure" class="btn btn-outline nav-cta secondary-cta">Download Broucher</a>
                </div>
            </nav>
            <button class="mobile-menu-toggle" id="mobileToggle" aria-label="Toggle Menu">
                <span class="hamburger" style="background: var(--text-main);"></span>
            </button>
        </div>
    </header>

    <!-- Page Header -->
    <section class="page-header" style="padding: 120px 0 40px;">
        <div class="container">
            <ul class="breadcrumb">
                <li><a href="index.html">Home</a></li>
                <li><a href="products.html">Our Products</a></li>
                <li><a href="products.html#cat-bottle-filling">${p.category}</a></li>
                <li>${p.title}</li>
            </ul>
        </div>
    </section>

    <!-- Product Detail Section -->
    <section class="section-padding bg-light" style="padding-top: 50px;">
        <div class="container">
            
            <!-- Hero / Overview -->
            <div class="product-detail-container">
                <div class="product-gallery">
                    <div class="main-img-wrapper">
                        <img src="assets/images/${p.image}" alt="${p.title}" id="mainImage" onerror="this.src='assets/images/prod_water_filling.png'">
                    </div>
                    <div class="thumbnail-grid">
                        <img src="assets/images/${p.image}" class="active" alt="Thumbnail 1" onerror="this.src='assets/images/prod_water_filling.png'">
                        <img src="assets/images/hero_machine_1.png" alt="Thumbnail 2">
                        <img src="assets/images/hero_machine_2.png" alt="Thumbnail 3">
                        <img src="assets/images/hero_machine_3.png" alt="Thumbnail 4">
                    </div>
                </div>
                
                <div class="product-overview">
                    <span style="color: var(--accent); font-weight: 600; text-transform: uppercase; font-size: 0.9rem; letter-spacing: 1px;">${p.category}</span>
                    <h1 style="margin-top: 5px;">${p.title}</h1>
                    <h3 style="color: var(--primary); font-size: 1.1rem; margin-bottom: 15px; font-weight: 500;">${p.tagline}</h3>
                    
                    <p>${p.overview}</p>
                    
                    <ul class="feature-list" style="margin-bottom: 30px;">
                        ${p.topFeatures.map(f => `<li><span class="icon">&#10003;</span> ${f}</li>`).join('\n                        ')}
                    </ul>

                    <div class="product-cta-group">
                        <a href="index.html#quote" class="btn btn-primary" style="margin-right: 15px;">Request A Quote</a>
                        <a href="https://wa.me/919712666160" target="_blank" class="btn btn-outline" style="border-color: #25D366; color: #25D366; margin-right: 15px; background: rgba(37, 211, 102, 0.1);">WhatsApp Us</a>
                        <a href="#brochure" class="btn btn-outline secondary-cta" style="border-color: var(--primary); color: var(--primary);">Download Specs PDF</a>
                    </div>
                </div>
            </div>

            <!-- Features & Benefits -->
            <div class="product-content-area">
                <h2 class="product-section-title">Features & Benefits</h2>
                <ul class="features-grid">
                    ${p.benefits.map(b => `<li>
                        <span class="icon">&#10003;</span>
                        <div>
                            <strong>${b.title}</strong>
                            <span style="display: block; color: var(--text-muted); font-size: 0.95rem; margin-top: 5px;">${b.desc}</span>
                        </div>
                    </li>`).join('\n                    ')}
                </ul>
            </div>

            <!-- Technical Specifications -->
            <div class="product-content-area">
                <h2 class="product-section-title">Technical Specifications</h2>
                <table class="spec-table">
                    <tbody>
                        ${p.specs.map(s => `<tr>
                            <th>${s.k}</th>
                            <td>${s.v}</td>
                        </tr>`).join('\n                        ')}
                    </tbody>
                </table>
            </div>

            <!-- Call to Action Footer Box -->
            <div class="product-content-area" style="background: var(--primary-dark); color: white; text-align: center; border-radius: 12px; padding: 40px;">
                <h2 style="color: var(--accent); margin-bottom: 15px;">Ready to Scale Your Production?</h2>
                <p style="font-size: 1.1rem; opacity: 0.9; margin-bottom: 25px; max-width: 700px; margin-left: auto; margin-right: auto;">Our engineering team is ready to design a custom solution integrating the ${p.title} directly into your facility layout.</p>
                <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                    <a href="index.html#quote" class="btn btn-primary" style="background: var(--accent); border-color: var(--accent); color: var(--primary-dark);">Get Immediate Pricing</a>
                    <a href="https://wa.me/919712666160" target="_blank" class="btn btn-outline" style="border-color: white;">Chat via WhatsApp</a>
                </div>
            </div>

            <!-- Related Products -->
            <div class="product-content-area" style="background: transparent; box-shadow: none; border: none; padding: 0;">
                <h2 class="product-section-title" style="border: none;">Explore Related Machinery</h2>
                <div class="product-grid" style="margin-top: 0;">
                    <!-- Auto Related 1 -->
                    <div class="product-card">
                        <div class="product-image">
                            <img src="assets/images/prod_juice_filling.png" alt="Juice Filling Machine" onerror="this.src='assets/images/prod_water_filling.png'">
                        </div>
                        <div class="product-info">
                            <h3>Juice Filling Machine</h3>
                            <a href="juice-filling-machine.html" class="read-more" style="margin-top: 10px;">View Details &rarr;</a>
                        </div>
                    </div>
                    <!-- Auto Related 2 -->
                    <div class="product-card">
                        <div class="product-image">
                            <img src="assets/images/prod_soda_filling.png" alt="Soda Filling Machine" onerror="this.src='assets/images/prod_water_filling.png'">
                        </div>
                        <div class="product-info">
                            <h3>Soda Filling Machine</h3>
                            <a href="soda-filling-machine.html" class="read-more" style="margin-top: 10px;">View Details &rarr;</a>
                        </div>
                    </div>
                    <!-- Auto Related 3 -->
                    <div class="product-card">
                        <div class="product-image">
                            <img src="assets/images/prod_inkjet_coding.png" alt="Inkjet Batch Coding" onerror="this.src='assets/images/prod_water_filling.png'">
                        </div>
                        <div class="product-info">
                            <h3>Inkjet Batch Coding</h3>
                            <a href="inkjet-batch-coding.html" class="read-more" style="margin-top: 10px;">View Details &rarr;</a>
                        </div>
                    </div>
                    <!-- Auto Related 4 -->
                    <div class="product-card">
                        <div class="product-image">
                            <img src="assets/images/prod_sticker_labelling.png" alt="Sticker Labelling Machine" onerror="this.src='assets/images/prod_water_filling.png'">
                        </div>
                        <div class="product-info">
                            <h3>Sticker Labelling Machine</h3>
                            <a href="sticker-labelling-machine.html" class="read-more" style="margin-top: 10px;">View Details &rarr;</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer" id="contact">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-about">
                    <img src="assets/images/shiv_shakti_logo.png" alt="Logo" class="footer-logo">
                    <p>Innovating the machinery landscape with sustainable, efficient, and heavy-duty engineering solutions.</p>
                </div>
                <div class="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="products.html">Machinery</a></li>
                        <li><a href="index.html#global-reach">Global Network</a></li>
                        <li><a href="index.html#certificate">Certifications</a></li>
                    </ul>
                </div>
                <div class="footer-contact">
                    <h4>Contact Us</h4>
                    <p>📍 Ahmedabad, Gujarat, India</p>
                    <p>📧 info@shivshaktiengineering.com</p>
                    <p>📞 +91 98765 43210</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 SHIV SHAKTI WATER EQUIPMENT PVT. LTD.. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Promotional Lead Popup -->
    <div id="leadPopup" class="popup-overlay">
        <div class="popup-content">
            <button class="popup-close" aria-label="Close">&times;</button>
            <div class="popup-body">
                <div class="popup-form-side">
                    <p class="popup-subtitle">GET MORE DETAILS<br>ABOUT OUR PRODUCT?</p>
                    <h2 class="popup-title">Fill Up This Form &<br>Download Brochure :</h2>
                    <form class="lead-form">
                        <input type="text" placeholder="Name" required>
                        <input type="tel" placeholder="Mobile Number" required>
                        <input type="email" placeholder="Email" required>
                        <input type="text" placeholder="kindly Inform Your Requirement" required>
                        <button type="submit" class="btn btn-orange">DOWNLOAD BROCHURE</button>
                    </form>
                </div>
                <div class="popup-image-side"></div>
            </div>
        </div>
    </div>

    <script src="js/main.js"></script>
    <script>
        // Simple script for Image Gallery Thumbnail swapping
        document.addEventListener('DOMContentLoaded', () => {
            const mainImg = document.querySelector('#mainImage');
            const thumbnails = document.querySelectorAll('.thumbnail-grid img');
            
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    mainImg.src = this.src;
                    
                    // remove active class
                    thumbnails.forEach(t => t.classList.remove('active'));
                    // add active to clicked
                    this.classList.add('active');
                });
            });
        });
    </script>
</body>
</html>`;
}

// Generate the files
for (const p of products) {
    const filePath = path.join(outDir, p.filename);
    const content = generateHTML(p);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Generated: ${p.filename}`);
}

console.log("SUCCESS: All 14 product pages generated!");

