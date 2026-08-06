import { Product } from '../types';

import riceMillImg from '../assets/images/rice-mill.jpg';
import grindingMachineImg from '../assets/images/grinding-machine.jpg';
import chaffCutterImg from '../assets/images/chaff-cutter.jpg';
import hammerMillImg from '../assets/images/hammer-mill.jpg';
import garriProcessingImg from '../assets/images/garri-processing.jpg';
import waterPumpImg from '../assets/images/water-pump.jpg';
import powerTillerImg from '../assets/images/power-tiller.jpg';
import grainDestonerImg from '../assets/images/grain-destoner.jpg';
import maizeShellerImg from '../assets/images/maize-sheller.jpg';
import sparePartsImg from '../assets/images/spare-parts.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'igaf-pm-01',
    slug: 'commercial-rice-mill-plant',
    name: 'IGAF Commercial Heavy-Duty Rice Mill Unit',
    shortName: 'Commercial Rice Mill',
    category: 'Rice Mills',
    machineType: 'Commercial Rice Processing Plant',
    tagline: 'High-yield rice hulling, de-stoning, and polishing processing unit for maximum grain recovery.',
    description: 'Engineered for commercial rice processors in Nasarawa and Northern Nigeria. Combines paddy cleaning, de-husking, paddy separation, and precision polishing in one continuous, high-efficiency operation.',
    fullOverview: 'The IGAF Commercial Rice Mill Unit is built to handle local paddy varieties including FARO 44, FARO 52, and indigenous white/brown rice. Designed with heavy-duty cast iron frames and durable rubber rollers, this unit reduces broken grain percentages to under 5% while separating husk, bran, and small stones efficiently. Ideal for commercial rice millers, agricultural cooperatives, and commercial farm setups in Keffi, Lafia, and surrounding states.',
    priceEstimate: 'Est. ₦4,500,000 – ₦5,200,000',
    priceNumeric: 4800000,
    powerSource: 'Diesel Engine',
    capacity: '1,500 kg – 2,500 kg / Hour',
    enginePower: '28 HP – 35 HP Heavy Duty Diesel Engine',
    weight: '680 kg',
    warranty: '12 Months IGAF Warranty',
    isFeatured: true,
    isNew: true,
    mainImage: riceMillImg,
    galleryImages: [
      riceMillImg,
      grainDestonerImg,
      sparePartsImg
    ],
    specs: [
      { label: 'Paddy Hulling Rate', value: '≥ 95%' },
      { label: 'Broken Rice Ratio', value: '≤ 4.5%' },
      { label: 'Engine Type', value: 'Water-cooled Single/Double Cylinder Diesel' },
      { label: 'De-stoning Efficiency', value: '99.8%' },
      { label: 'Operating Speed', value: '1,450 RPM' },
      { label: 'Polishing Method', value: 'Jet-Air Friction Rice Polisher' },
      { label: 'Chassis Material', value: 'Reinforced Carbon Steel & Heavy Cast Metal' }
    ],
    features: [
      'Integrated vibratory paddy cleaner removes straw, dust, and stones before hulling',
      'High-grade dual rubber rollers with quick clearance adjustment lever',
      'Integrated air blower system for instant husk and chaff separation',
      'High-grade stainless steel sieve screens built for high continuous throughput',
      'Compact footprint with high structural stability for continuous daily milling',
      'Includes spare belt set, spare rubber rollers, and maintenance toolkit'
    ],
    uses: [
      'Commercial Rice Milling Facilities',
      'Farmers Cooperatives & Outgrower Schemes',
      'Custom Rice Processing for local markets in Nasarawa, FCT Abuja & Benue',
      'Seed Paddy Cleaning and Grain Grading'
    ],
    includedAccessories: [
      '2 Extra Sets of High-Density Rubber Rollers',
      'Replacement Steel Sieves & Belts',
      'Tool Kit & Engine Maintenance Manual',
      'Initial Engine Oil & Filter Set'
    ]
  },
  {
    id: 'igaf-gm-02',
    slug: 'heavy-duty-grinding-machine',
    name: 'IGAF Multi-Grain Heavy Duty Grinding Machine',
    shortName: 'Multi-Grain Grinding Machine',
    category: 'Grinding Machines',
    machineType: 'Plate & Disc Grain Mill',
    tagline: 'High-speed wet and dry grinding mill for maize, guinea corn, millet, beans, and cassava.',
    description: 'Essential multi-purpose grinding machine widely trusted across Nasarawa State. Equipped with cast steel grinding plates capable of fine flour or coarse meal production.',
    fullOverview: 'Built for continuous high-torque operation, the IGAF Multi-Grain Grinding Machine handles both dry grain (maize, millet, sorghum) and wet produce (beans for akara/moi-moi, soaked cassava, tomatoes, pepper). Features precision adjustable plate spacing for ultra-fine flour or coarse cattle feed texture.',
    priceEstimate: 'Est. ₦850,000 – ₦1,050,000',
    priceNumeric: 950000,
    powerSource: 'Diesel Engine',
    capacity: '400 kg – 800 kg / Hour',
    enginePower: '8 HP – 12 HP Water-Cooled Diesel Engine',
    weight: '145 kg',
    warranty: '12 Months IGAF Warranty',
    isFeatured: true,
    mainImage: grindingMachineImg,
    galleryImages: [
      grindingMachineImg,
      sparePartsImg
    ],
    specs: [
      { label: 'Disc Diameter', value: '300 mm Heavy Alloy Steel Discs' },
      { label: 'Grinding Capability', value: 'Wet & Dry Materials' },
      { label: 'Spindle Speed', value: '1,200 – 1,400 RPM' },
      { label: 'Fuel Consumption', value: '0.8 Liters Diesel / Hour' },
      { label: 'Hopper Capacity', value: '25 kg Galvanized Steel Hopper' },
      { label: 'Frame Structure', value: 'Angle Iron Reinforced Stand with Dampers' }
    ],
    features: [
      'Dual wet & dry grinding capability with instant fineness adjustment knob',
      'Heat-treated wear-resistant alloy plates for extended service life',
      'Reinforced steel hopper with manual flow control gate',
      'Heavy-duty cast iron housing prevents vibration during long operation',
      'Compatible with diesel, petrol, or 3-phase electric motors'
    ],
    uses: [
      'Commercial Food Processing Centers',
      'Local Grain Millers in Keffi, Akwanga & Lafia',
      'Poultry & Livestock Feed Preparation',
      'Cassava & Bean Paste Milling'
    ],
    includedAccessories: [
      '2 Pairs of Replacement Alloy Grinding Discs',
      'V-Belts & Pulley',
      'Grease Gun & Spanners'
    ]
  },
  {
    id: 'igaf-cc-03',
    slug: 'high-capacity-chaff-cutter',
    name: 'IGAF Commercial Motorized Chaff Cutter',
    shortName: 'Chaff & Fodder Cutter',
    category: 'Chaff Cutters',
    machineType: 'Forage & Straw Chopper',
    tagline: 'Precision fodder and crop straw cutter for cattle, goat, sheep, and silage preparation.',
    description: 'High-speed forage chopping machine designed to turn green grass, corn stalks, sugarcane tops, and dry straw into easily digestible livestock feed.',
    fullOverview: 'The IGAF Motorized Chaff Cutter is engineered specifically for livestock farmers, dairy owners, and fattening centers across Nasarawa State and Northern Nigeria. It utilizes hardened high-carbon rotary steel blades to slice green pasture, elephant grass, maize stalks, and rice straw at high speed, maximizing feed conversion rates for cattle, sheep, and goats.',
    priceEstimate: 'Est. ₦750,000 – ₦950,000',
    priceNumeric: 850000,
    powerSource: 'Diesel Engine',
    capacity: '1,000 kg – 2,000 kg / Hour',
    enginePower: '7.5 HP Diesel / Petrol Engine or Electric Motor',
    weight: '110 kg',
    warranty: '12 Months IGAF Warranty',
    isFeatured: true,
    mainImage: chaffCutterImg,
    galleryImages: [
      chaffCutterImg,
      sparePartsImg
    ],
    specs: [
      { label: 'Cutting Length', value: '10 mm – 35 mm (Adjustable Gear System)' },
      { label: 'Blade Quantity', value: '4 High-Carbon Manganese Steel Blades' },
      { label: 'Feeder System', value: 'Automatic Feed Roller Mechanism' },
      { label: 'Safety Feature', value: 'Reverse/Forward Clutch Gearbox Guard' },
      { label: 'Discharge Chute', value: '360° Rotating Elevated Discharge Spout' }
    ],
    features: [
      'Automatic feed roller pulls in thick crop stalks safely without manual pushing',
      'Multi-speed gearbox to easily select long or short cut lengths for silage',
      'Ultra-sharp manganese steel blades with long-edge retention',
      'Sturdy wheel transport base for easy movement around farm yards',
      'Reduces feed wastage by up to 40% by making tough stalks palatable'
    ],
    uses: [
      'Cattle Ranches & Feedlot Operations',
      'Dairy Farms & Livestock Cooperatives',
      'Silage Pit Preparation for Dry Season Feed Storage',
      'Poultry Litter Chopping'
    ],
    includedAccessories: [
      'Spare Set of 4 Precision Cutting Blades',
      'Blade Sharpening Stone',
      'Belt Guard & Safety Hood'
    ]
  },
  {
    id: 'igaf-hm-04',
    slug: 'industrial-hammer-mill',
    name: 'IGAF Heavy-Duty Industrial Hammer Mill',
    shortName: 'Industrial Hammer Mill',
    category: 'Hammer Mills',
    machineType: 'High-Impact Grain Crusher',
    tagline: 'High-volume grain, dried cassava, and feed ingredient pulverizer with interchangeable screens.',
    description: 'Heavy-duty impact crushing machine built for rapid size reduction of dry grains, cassava chips, maize cobs, bone meal, and animal feed ingredients.',
    fullOverview: 'The IGAF Industrial Hammer Mill utilizes a high-velocity rotating rotor outfitted with heat-treated hardened steel hammers. As grain or dry cassava enters the crushing chamber, high-frequency impacts shatter the material until it passes through calibrated interchangeable mesh screens. Perfect for feed mills, commercial poultry farms, and industrial cassava processing factories.',
    priceEstimate: 'Est. ₦2,200,000 – ₦2,600,000',
    priceNumeric: 2400000,
    powerSource: 'Diesel Engine',
    capacity: '800 kg – 1,800 kg / Hour',
    enginePower: '18 HP – 24 HP Heavy Diesel Engine',
    weight: '290 kg',
    warranty: '12 Months IGAF Warranty',
    isFeatured: true,
    mainImage: hammerMillImg,
    galleryImages: [
      hammerMillImg,
      sparePartsImg
    ],
    specs: [
      { label: 'Hammer Count', value: '16 – 24 Swing Hammers (High Hardness Alloy)' },
      { label: 'Rotor Speed', value: '2,800 RPM' },
      { label: 'Screen Hole Sizes', value: '1.5 mm, 2.0 mm, 3.0 mm, 5.0 mm, 8.0 mm' },
      { label: 'Cyclone Collector', value: 'Included Air Separator Cyclone & Bagging Spout' },
      { label: 'Chamber Thickness', value: '8 mm Reinforced Steel Plate' }
    ],
    features: [
      'High-speed swing hammer rotor delivers maximum pulverization efficiency',
      'Includes air-suction cyclone collector to prevent flour dust in workshop',
      'Quick-change screen mechanism for effortless mesh swaps',
      'Heavy-duty magnetic trap in feed chute catches stray metal particles',
      'Low operating temperature preserves nutrient quality in feeds'
    ],
    uses: [
      'Animal Feed Manufacturing Mills',
      'Poultry & Fish Feed Mash Production',
      'Cassava Flour & Starch Processing Plants',
      'Spices & Herbal Medicine Pulverization'
    ],
    includedAccessories: [
      '3 Interchangeable Stainless Mesh Screens',
      'Spare Hammer Set (16 Pcs)',
      'Dust Bag & Cyclone Fitting Kit'
    ]
  },
  {
    id: 'igaf-gp-05',
    slug: 'complete-garri-processing-machine',
    name: 'IGAF Complete Garri Processing Equipment Set',
    shortName: 'Garri Processing Plant',
    category: 'Garri Processing',
    machineType: 'Cassava Peeler, Grater, Press & Fryer',
    tagline: 'End-to-end cassava processing machinery line for high-grade Garri, Starch, and Cassava Flour.',
    description: 'Complete integrated cassava processing line including cassava washing & peeling machine, high-capacity grater, double-cylinder hydraulic de-watering press, and automated stainless garri fryer.',
    fullOverview: 'Cassava is a major cash crop in Nasarawa State. The IGAF Garri Processing Line is designed to standardize garri production into a clean, hygienic, and profitable commercial venture. From mechanical cassava peeling to fine grating, hydraulic de-watering, and heavy-duty stainless rotary frying, this machinery line maximizes yield and reduces labor costs dramatically.',
    priceEstimate: 'Est. ₦2,900,000 – ₦3,500,000',
    priceNumeric: 3200000,
    powerSource: 'Diesel Engine',
    capacity: '2 to 5 Tons Cassava Roots / Day',
    enginePower: 'Includes 10 HP Grater Diesel Engine & Hydraulic Pump',
    weight: '520 kg (Combined Units)',
    warranty: '12 Months IGAF Warranty',
    isFeatured: true,
    mainImage: garriProcessingImg,
    galleryImages: [
      garriProcessingImg,
      sparePartsImg
    ],
    specs: [
      { label: 'Peeling & Washing Unit', value: 'Rotary Brush & Water Spray Jet System' },
      { label: 'Grater Rotor', value: 'Stainless Steel Pierced Grating Drum' },
      { label: 'Pressing Pressure', value: '30-Ton Hydraulic Cylinder Press' },
      { label: 'Garri Fryer Type', value: 'Food-Grade Stainless Pan with Mechanical Paddle Stirrer' },
      { label: 'Heating Method', value: 'Gas / Firewood / Charcoal Furnace Compatible' }
    ],
    features: [
      'Food-grade stainless contact surfaces prevent cassava paste contamination',
      'High-torque grater yields fine uniform mash for optimal fermentation',
      'Double-frame hydraulic press dries cassava pulp within 15 minutes',
      'Automated mechanical stirrer inside fryer prevents charring and ensures uniform grain roasting',
      'Significantly lowers manual labor requirements for large-scale producers'
    ],
    uses: [
      'Commercial Garri Production Facilities (White & Yellow Garri)',
      'High Quality Cassava Flour (HQCF) Processing',
      'Cassava Starch Extraction',
      'Women Agro-Processing Cooperatives'
    ],
    includedAccessories: [
      'Extra Stainless Grater Drums',
      'Hydraulic Seals & Hose Kit',
      'Heavy Duty Mash Bags for Press'
    ]
  },
  {
    id: 'igaf-wp-06',
    slug: 'high-flow-irrigation-water-pump',
    name: 'IGAF Heavy-Duty Diesel & Petrol Irrigation Water Pumps',
    shortName: 'Irrigation Water Pump',
    category: 'Water Pumps',
    machineType: 'Centrifugal High-Flow Water Pump',
    tagline: 'High-lift, high-volume water pump for dry season farming, river suction, and dam irrigation.',
    description: 'Reliable 2-inch, 3-inch, and 4-inch agricultural water pumps built for continuous dry season farming along riverbanks and irrigation channels in Nasarawa State.',
    fullOverview: 'Dry season irrigation is critical for vegetable, rice, and maize farming in Keffi and surrounding river valleys. IGAF Water Pumps feature self-priming heavy cast aluminum pump bodies paired with ultra-durable diesel or petrol engines. Capable of pumping up to 60,000 Liters of water per hour across long field distances and vertical elevations.',
    priceEstimate: 'Est. ₦380,000 – ₦520,000',
    priceNumeric: 450000,
    powerSource: 'Diesel Engine',
    capacity: '35,000 – 65,000 Liters / Hour',
    enginePower: '6.5 HP Petrol / 7.0 HP Diesel Engine options',
    weight: '38 kg',
    warranty: '12 Months IGAF Warranty',
    isFeatured: true,
    isNew: true,
    mainImage: waterPumpImg,
    galleryImages: [
      waterPumpImg,
      sparePartsImg
    ],
    specs: [
      { label: 'Inlet / Outlet Size', value: '3 Inch (75mm) & 4 Inch (100mm)' },
      { label: 'Max Delivery Head', value: '28 Meters – 32 Meters' },
      { label: 'Max Suction Lift', value: '8 Meters Vertical Suction' },
      { label: 'Impeller Material', value: 'Heavy Duty Cast Iron Impeller' },
      { label: 'Pump Body', value: 'Corrosion-Resistant Die-Cast Aluminum Alloy' },
      { label: 'Frame', value: 'Tubular Steel Protective Roll Cage' }
    ],
    features: [
      'Self-priming design requires water fill only on initial start',
      'Silicon carbide mechanical seals resist abrasive sandy water',
      'Low oil level sensor automatically shuts engine to prevent damage',
      'High delivery head allows piping water up steep river banks',
      'Compact, lightweight roll-cage for easy manual carry across farm beds'
    ],
    uses: [
      'Dry Season Rice, Pepper & Tomato Irrigation',
      'Dam & River Water Transfer to Farmlands',
      'Fish Pond Water Exchanging & Drainage',
      'Construction & Flood Water Pumping'
    ],
    includedAccessories: [
      'Suction Strainer Basket',
      'Hose Couplings & Heavy Clamps',
      'Spark Plug / Fuel Key Wrench'
    ]
  },
  {
    id: 'igaf-pt-07',
    slug: 'heavy-duty-power-tiller',
    name: 'IGAF Diesel Rotary Walking Tractor & Power Tiller',
    shortName: 'Diesel Power Tiller',
    category: 'Power Tillers',
    machineType: 'Walk-Behind Rotary Tiller & Mini-Tractor',
    tagline: 'Versatile rotary plowing, ridging, weeding, and haulage walking tractor for small & medium farms.',
    description: 'Multi-functional 12HP to 15HP diesel walking tractor equipped with rotary tiller attachment, double plow, ridger, and trailer hitch attachment.',
    fullOverview: 'The IGAF Power Tiller bridges the gap between manual hand-hoe tilling and expensive heavy farm tractors. Fitted with a high-torque water-cooled diesel engine and heavy-duty gear transmission, it effortlessly turns hard clay and sandy loam soils, prepares seedbeds, builds farm ridges, and can even haul loaded farm trailers up to 1,000 kg.',
    priceEstimate: 'Est. ₦1,300,000 – ₦1,600,000',
    priceNumeric: 1450000,
    powerSource: 'Diesel Engine',
    capacity: '0.4 – 0.6 Hectare / Hour Plowing',
    enginePower: '12 HP – 15 HP Water-Cooled Diesel Engine',
    weight: '320 kg',
    warranty: '12 Months IGAF Warranty',
    isFeatured: true,
    mainImage: powerTillerImg,
    galleryImages: [
      powerTillerImg,
      sparePartsImg
    ],
    specs: [
      { label: 'Tilling Width', value: '800 mm – 1,000 mm' },
      { label: 'Tilling Depth', value: '180 mm – 250 mm' },
      { label: 'Gearbox', value: '6 Forward + 2 Reverse Speeds' },
      { label: 'Tires', value: '6.00-12 Heavy Agricultural Lug Tires' },
      { label: 'Steering', value: 'Hand-Grip Clutch Steering Lock' },
      { label: 'Fuel Tank', value: '11.5 Liters Diesel' }
    ],
    features: [
      'High-performance direct injection diesel engine with low fuel consumption',
      'Includes 18-blade rotary tiller unit for instant seedbed preparation',
      'Dual headlight lighting system for early morning or late evening operations',
      'PTO drive shaft for powering external water pumps or threshers',
      'Ergonomic adjustable handlebars accommodate different operator heights'
    ],
    uses: [
      'Rice Field Paddy Preparation & Plowing',
      'Maize, Yam & Cassava Bed Ridging',
      'Orchard & Farm Bed Weeding',
      'Farm Produce Haulage with Trailer'
    ],
    includedAccessories: [
      'Rotary Tiller Box with Tilling Blades',
      'Single/Double Furrow Mouldboard Plow',
      'Bed Ridger Attachment',
      'Operator Maintenance Tool Kit'
    ]
  },
  {
    id: 'igaf-ds-09',
    slug: 'multi-crop-grain-destoner',
    name: 'IGAF Commercial Gravity Grain De-stoner & Cleaner',
    shortName: 'Multi-Crop Grain De-stoner',
    category: 'De-stoners & Cleaners',
    machineType: 'Vibratory Gravity Stone Separator',
    tagline: 'High-precision stone, mud, and sand remover for paddy rice, beans, sesame, and wheat.',
    description: 'Guarantees 100% stone-free grains for commercial millers and food processors across Nigeria. Uses blow-type airflow and inclined vibratory deck technology.',
    fullOverview: 'Stone contamination ruins milling equipment and lowers grain market value. The IGAF Gravity Grain De-stoner separates stones, gravel, glass fragments, and metallic particles from paddy rice, soya beans, sesame seeds, and sorghum with 99.9% accuracy. Perfect for rice mills and commercial grain processing centers in Keffi, Lafia, and Abuja.',
    priceEstimate: 'Est. ₦1,700,000 – ₦2,000,000',
    priceNumeric: 1850000,
    powerSource: 'Electric Motor',
    capacity: '1,200 kg – 2,500 kg / Hour',
    enginePower: '2.2 kW – 3.0 kW Electric Motor (or Diesel Generator Compatible)',
    weight: '210 kg',
    warranty: '12 Months IGAF Warranty',
    isFeatured: true,
    isNew: true,
    mainImage: grainDestonerImg,
    galleryImages: [
      grainDestonerImg,
      sparePartsImg
    ],
    specs: [
      { label: 'De-stoning Precision', value: '99.9% Stone Removal Rate' },
      { label: 'Deck Angle', value: 'Adjustable 7° – 12° Inclination' },
      { label: 'Air Blower Fan', value: 'Dual Internal Centrifugal Blowers' },
      { label: 'Screen Type', value: 'Stainless Steel Woven Wire Mesh Deck' },
      { label: 'Noise Level', value: 'Low Vibration Anti-Shock Rubber Mounts' }
    ],
    features: [
      'Positive pressure airflow separates heavy stones from light grains continuously',
      'Includes transparent observation window to monitor deck separation live',
      'Dual stone discharge outlets prevent clogging during heavy runs',
      'Compact vertical design saves valuable processing floor space',
      'Dramatically elevates market value and price per bag of milled grain'
    ],
    uses: [
      'Commercial Rice & Bean De-stoning Plants',
      'Sesame Seed Export Processing',
      'Flour Mill Pre-Cleaning Operations',
      'Grain Merchant Processing Warehouses'
    ],
    includedAccessories: [
      'Spare Deck Sieves for Beans and Sesame',
      'Dust Collection Hood',
      'Maintenance Toolkit'
    ]
  },
  {
    id: 'igaf-md-10',
    slug: 'commercial-maize-dehusker-sheller',
    name: 'IGAF High-Capacity Maize Dehusker & Sheller Machine',
    shortName: 'Maize Dehusker & Sheller',
    category: 'Maize Dehuskers',
    machineType: 'Combine Husk Removal & Grain Sheller',
    tagline: 'Removes maize cobs from green/dry husks and shells clean grains in a single continuous pass.',
    description: 'Eliminates tedious manual maize peeling. High-capacity diesel-powered machine that de-husks corn cobs and shells clean kernels cleanly into bags.',
    fullOverview: 'Maize harvesting requires fast processing to prevent pest damage and mold. The IGAF Maize Dehusker & Sheller accepts unpeeled corn cobs directly from the farm, strips off husks cleanly, shells the kernels, and blows away dust and chaff through a heavy rear fan cyclone.',
    priceEstimate: 'Est. ₦1,200,000 – ₦1,500,000',
    priceNumeric: 1350000,
    powerSource: 'Diesel Engine',
    capacity: '2,000 kg – 3,500 kg / Hour',
    enginePower: '15 HP Diesel Engine',
    weight: '340 kg',
    warranty: '12 Months IGAF Warranty',
    isFeatured: true,
    isNew: true,
    mainImage: maizeShellerImg,
    galleryImages: [
      maizeShellerImg,
      sparePartsImg
    ],
    specs: [
      { label: 'Kernel Damage Rate', value: '≤ 1.0%' },
      { label: 'Husking Rate', value: '≥ 98%' },
      { label: 'Cleaning Fan', value: 'High Velocity Chaff Blower' },
      { label: 'Tire Base', value: 'Dual Heavy Pneumatic Transport Wheels' },
      { label: 'Feeder Tray', value: 'Extended Steel Hopper Tray for Continuous Loading' }
    ],
    features: [
      '2-in-1 dual operation: De-husking and Shelling simultaneously',
      'Heavy rubber husking rollers preserve soft corn grains without cracking',
      'Integrated grain elevator chute for direct bagging',
      'Heavy tow-bar attachment for easy field towing behind tractors or trucks'
    ],
    uses: [
      'Commercial Maize Farming Operations',
      'Grains Warehouses & Trading Hubs',
      'Contract Shelling Services for Smallholder Farmers'
    ],
    includedAccessories: [
      'Spare Rubber Husking Rollers',
      'Bagging Chute Attachment',
      'Tool Set'
    ]
  },
  {
    id: 'igaf-sp-08',
    slug: 'genuine-spare-parts-accessories',
    name: 'IGAF Genuine Engine & Machine Spare Parts',
    shortName: 'Spare Parts & Accessories',
    category: 'Spare Parts',
    machineType: 'Engine Components & Wear Parts',
    tagline: '100% original replacement diesel engines, belts, grinding plates, rubber rollers, blades, and screens.',
    description: 'Complete stock of genuine replacement parts for all agricultural machines sold at our Masalacin Idi, Keffi showroom. Includes R175, R180, S195, S1100, S1115 diesel engine parts.',
    fullOverview: 'A farm machine is only as reliable as its spare parts availability. At Ibrahimawa Global and Farm (IGAF) Limited, we maintain a comprehensive, fully stocked warehouse of genuine replacement parts right at our Keffi store. We supply original grinding discs, chaff cutter blades, rice mill rubber rollers, screens, belts, fuel injectors, pistons, gaskets, and bearings directly to farmers and mechanics across Nasarawa, FCT Abuja, Plateau, and Kaduna States.',
    priceEstimate: 'Est. ₦15,000 – ₦250,000',
    priceNumeric: 150000,
    powerSource: 'Diesel Engine',
    capacity: 'Full Stock Available',
    enginePower: 'Parts for 5HP to 35HP Engines',
    weight: 'Varies by Part',
    warranty: 'IGAF Quality Guarantee',
    isFeatured: true,
    mainImage: sparePartsImg,
    galleryImages: [
      sparePartsImg,
      riceMillImg
    ],
    specs: [
      { label: 'Supported Engines', value: 'R175, R180, S195, S1100, S1115, Changchai, Changfa' },
      { label: 'Grinding Discs', value: 'Size 150, 200, 300 Alloy Steel Plates' },
      { label: 'Rice Mill Parts', value: 'Standard & High-Density Rubber Rollers, Hexagonal Screens' },
      { label: 'Chaff Cutter Blades', value: 'Heat-Treated High Carbon Manganese Blades' },
      { label: 'Transmission Belts', value: 'A, B, C, D Section Industrial V-Belts' }
    ],
    features: [
      '100% tested for exact dimension fitment and durability under heat',
      'Direct factory sourcing guarantees no counterfeit or low-grade metals',
      'Bulk wholesale discounts for regional machine dealers and mechanics',
      'Same-day pickup in Keffi or waybill delivery across Nigeria'
    ],
    uses: [
      'Routine Engine Overhaul & Maintenance',
      'Emergency Farm Machinery Repairs',
      'Replacement of Consumable Wear Items (Rollers, Blades, Belts)',
      'Wholesale Supply to Agro-Mechanics'
    ],
    includedAccessories: [
      'Individual Protective Packaging',
      'Technical Support & Installation Advice'
    ]
  }
];

export const CATEGORIES = [
  'All Products',
  'Grinding Machines',
  'Chaff Cutters',
  'Rice Mills',
  'Hammer Mills',
  'Garri Processing',
  'Water Pumps',
  'Power Tillers',
  'De-stoners & Cleaners',
  'Maize Dehuskers',
  'Spare Parts'
] as const;
