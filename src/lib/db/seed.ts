import {
  SiteSettings,
  PageSectionConfig,
  ServiceItem,
  BatteryBrand,
  BatteryProduct,
  VehicleBrand,
  ServiceLocation,
  Testimonial,
  FAQItem,
  ServiceRequest,
  LeadConversionEvent
} from '@/types';

export const initialSettings: SiteSettings = {
  id: 'site-config',
  companyName: 'Apex Battery & Mobile Auto Dubai',
  tagline: 'Professional On-Site Battery Replacement & Rapid Roadside Assistance Across Dubai',
  phonePrimary: '+971 4 000 0000',
  phoneEmergency: '+971 58 000 0000',
  whatsappNumber: '+971 58 000 0000',
  emailPrimary: 'dispatch@apexbattery.ae',
  addressText: 'Al Quoz Industrial Area 3, Dubai, United Arab Emirates [VERIFIED LOCATION PLACEHOLDER]',
  googleMapsUrl: 'https://maps.google.com/?q=Dubai',
  workingHours: 'Daily: 7:00 AM – 11:30 PM | Emergency Roadside Dispatch On Call',
  serviceStatusText: 'Mobile Response Units Currently Active Across Dubai Zones',
  emergencyActive: true,
  warrantyStandard: 'Official 12 to 24 Months Manufacturer Warranty with Free On-Site Replacement',
  serviceRadiusDescription: 'Serving Major Dubai Communities: Marina, Downtown, Al Barsha, Business Bay, JLT, Palm Jumeirah & surrounding districts.',
  metaTitle: 'Mobile Car Battery Replacement & Diagnostics Dubai | Apex Auto Service',
  metaDescription: 'Fast, on-site car battery replacement and vehicle diagnostics at your home, office, or roadside anywhere in Dubai. Battery testing before replacement. Genuine warranty.',
  updatedAt: new Date().toISOString()
};

export const initialSections: PageSectionConfig[] = [
  {
    id: 'sec-hero',
    pageSlug: 'home',
    sectionKey: 'hero',
    title: 'Car battery service, wherever you are.',
    subtitle: 'Mobile testing, genuine battery replacement, and roadside assistance delivered directly to your vehicle across Dubai.',
    badgeText: 'Mobile Units Active Across Dubai',
    primaryButtonText: 'Book Battery Service',
    primaryButtonUrl: '#request-service',
    secondaryButtonText: 'WhatsApp Us',
    secondaryButtonUrl: '#whatsapp-dispatch',
    isActive: true,
    displayOrder: 1
  },
  {
    id: 'sec-trust',
    pageSlug: 'home',
    sectionKey: 'trust_strip',
    title: 'Built around reliability and technical precision.',
    subtitle: 'Every replacement includes digital testing and certified recycling.',
    isActive: true,
    displayOrder: 2,
    contentData: {
      points: [
        { title: 'Mobile On-Site Service', desc: 'Technician arrives directly at your home, office, or roadside.' },
        { title: 'Digital Test First', desc: 'We verify battery health & alternator output before replacing.' },
        { title: '12–24 Months Warranty', desc: 'Official manufacturer warranties with digital registration.' },
        { title: 'Certified Recycling', desc: 'Depleted batteries safely reclaimed under Dubai standards.' }
      ]
    }
  },
  {
    id: 'sec-primary-service',
    pageSlug: 'home',
    sectionKey: 'primary_service',
    title: 'We test your battery first.',
    subtitle: 'A dead vehicle is often caused by an alternator fault or parasitic drain. Our technician checks cold cranking amps and charging voltage before recommending a replacement.',
    primaryButtonText: 'Book Battery Service',
    primaryButtonUrl: '#request-service',
    isActive: true,
    displayOrder: 3
  },
  {
    id: 'sec-how-it-works',
    pageSlug: 'home',
    sectionKey: 'how_it_works',
    title: 'How It Works',
    subtitle: 'Three straightforward steps from breakdown to driving again.',
    isActive: true,
    displayOrder: 4
  },
  {
    id: 'sec-battery-types',
    pageSlug: 'home',
    sectionKey: 'battery_types',
    title: 'Battery Options for Every Vehicle',
    subtitle: 'Standard SMF, EFB, and AGM Start-Stop units matched to your car’s electrical specifications.',
    isActive: true,
    displayOrder: 5
  },
  {
    id: 'sec-secondary-services',
    pageSlug: 'home',
    sectionKey: 'secondary_services',
    title: 'Other Automotive Services',
    subtitle: 'Essential roadside assistance and vehicle diagnostics to keep you moving.',
    isActive: true,
    displayOrder: 6
  },
  {
    id: 'sec-coverage',
    pageSlug: 'home',
    sectionKey: 'coverage_areas',
    title: 'Service Coverage Across Dubai',
    subtitle: 'Mobile units stationed near major arteries for realistic, rapid arrival times.',
    isActive: true,
    displayOrder: 7
  },
  {
    id: 'sec-testimonials',
    pageSlug: 'home',
    sectionKey: 'testimonials',
    title: 'Verified Experiences from Dubai Drivers',
    subtitle: 'Real diagnostic and battery replacement encounters across Dubai residences and roadsides.',
    isActive: true,
    displayOrder: 8
  },
  {
    id: 'sec-faqs',
    pageSlug: 'home',
    sectionKey: 'faqs',
    title: 'Frequently Asked Questions',
    subtitle: 'Clear answers on battery lifespans in UAE heat, warranty coverage, and dispatch times.',
    isActive: true,
    displayOrder: 9
  },
  {
    id: 'sec-final-cta',
    pageSlug: 'home',
    sectionKey: 'final_cta',
    title: 'Need help with your car?',
    subtitle: 'Book mobile battery service or send your live location on WhatsApp.',
    primaryButtonText: 'Book Battery Service',
    primaryButtonUrl: '#request-service',
    secondaryButtonText: 'WhatsApp Us',
    secondaryButtonUrl: 'https://wa.me/971580000000',
    isActive: true,
    displayOrder: 10
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: 'srv-battery-replacement',
    slug: 'car-battery-replacement',
    name: 'Mobile Car Battery Replacement',
    tagline: 'Hero On-Site Service with Full Electrical Testing',
    shortDescription: 'Professional battery delivery and installation at your home, office, basement, or roadside in Dubai. Includes charging system health check and old battery recycling.',
    fullDescription: 'Dubai’s harsh summer climate accelerates electrolyte evaporation and internal plate degradation, typically restricting battery lifespans to 18–24 months. Our mobile battery replacement service eliminates the stress of towing your car. A fully equipped service van arrives at your location with digital diagnostic tools, OEM-spec batteries (AGM, EFB, or SMF), memory savers to preserve vehicle computer settings, and certified automotive technicians.',
    iconName: 'BatteryCharging',
    features: [
      'Comprehensive 4-point electrical diagnostic test prior to replacement',
      'Memory saver connection to protect ECU, clock, and radio presets',
      'Terminal cleaning, corrosion prevention spray, and secure clamp fitting',
      'Electronic alternator load testing post-installation',
      'Official 12 to 24-month manufacturer warranty with digital documentation',
      'Eco-friendly removal and recycling of your depleted lead-acid battery'
    ],
    diagnosticSteps: [
      'Step 1: Open-circuit voltage and Cold Cranking Amps (CCA) electronic load test',
      'Step 2: Starter motor inrush current check to rule out mechanical seizure',
      'Step 3: Alternator regulated output voltage verification (13.8V – 14.4V target)',
      'Step 4: Parasitic battery drain / quiescent current inspection if repeated failure'
    ],
    isEmergency: true,
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
    estimatedTime: '25 – 40 min arrival',
    warrantyInfo: '12 – 24 Months Official Warranty Included',
    metaTitle: 'Mobile Car Battery Replacement Dubai | On-Site Battery Change',
    metaDescription: 'Stuck with a dead battery in Dubai? We deliver & install genuine Varta, Amaron, Bosch batteries on-site. Testing included. 12-24 mo warranty.'
  },
  {
    id: 'srv-battery-diagnostics',
    slug: 'battery-health-testing',
    name: 'Battery & Alternator Health Testing',
    tagline: 'Definitive Health Printout Before You Spend Money',
    shortDescription: 'Unsure if your battery is dead or if the alternator stopped charging? We perform on-site digital conductance tests and electrical load analysis.',
    fullDescription: 'Many drivers replace a battery prematurely when the actual culprit is a slipping alternator belt, parasitic dashcam drain, or corroded terminal cables. Our mobile diagnostic technician runs a complete electrical system evaluation right where your car is parked in Dubai.',
    iconName: 'Activity',
    features: [
      'Digital conductance test measuring real-time Cold Cranking Amps (CCA)',
      'State of Health (SOH) and State of Charge (SOC) percentage readings',
      'Alternator ripple voltage test to detect faulty rectifier diodes',
      'Starter motor cranking voltage drop analysis',
      'Transparent advice: if your battery is healthy, we simply jump-start and advise'
    ],
    isEmergency: false,
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
    estimatedTime: '30 – 45 min arrival',
    warrantyInfo: 'Diagnostic report provided via WhatsApp / SMS',
    metaTitle: 'Car Battery & Alternator Testing Dubai | Mobile Diagnostics',
    metaDescription: 'Accurate on-site car battery health check and alternator testing across Dubai. Avoid replacing a good battery with our digital load test.'
  },
  {
    id: 'srv-jump-start',
    slug: 'jump-start-service',
    name: 'Safe Emergency Jump-Start Assistance',
    tagline: 'Surge-Protected Booster Packs for Modern Electronics',
    shortDescription: 'Left headlights on or haven’t driven in weeks? Professional surge-protected booster start that safeguards your vehicle’s sensitive ECU computers.',
    fullDescription: 'Modern European and Japanese vehicles feature complex control modules, CAN-bus wiring, and infotainment computers that can be permanently damaged by incorrect jumper cable connections or unregulated voltage spikes. Our technicians use industrial micro-processor controlled jump packs with reverse polarity and over-voltage safeguards.',
    iconName: 'Zap',
    features: [
      'Industrial surge-protected booster equipment (no raw cable spikes)',
      'Reverse-polarity and spark-proof safety protocols',
      'Post-start alternator output verification to ensure battery recharges while driving',
      'Underground parking and tight basement garage access',
      'Option to upgrade to on-site replacement if battery fails load test immediately'
    ],
    isEmergency: true,
    isFeatured: true,
    isActive: true,
    displayOrder: 3,
    estimatedTime: '20 – 35 min arrival',
    warrantyInfo: 'Includes immediate alternator recharge check',
    metaTitle: 'Emergency Car Jump Start Dubai | Fast Mobile Booster Service',
    metaDescription: 'Need a jump start in Dubai? Safe, surge-protected mobile jump-start service for all cars, SUVs, and luxury vehicles. Rapid response.'
  },
  {
    id: 'srv-roadside-assistance',
    slug: 'roadside-assistance',
    name: 'Roadside Mechanical Triage & Assistance',
    tagline: 'On-Demand Support for Unexpected Breakdowns',
    shortDescription: 'Emergency roadside support when minor vehicle issues leave you stranded on Sheikh Zayed Road, Hessa Street, or in community parking lots.',
    fullDescription: 'From blown fuses and loose electrical connectors to minor mechanical triage, our service units carry essential roadside tooling to help get your vehicle operational or safely guided to your preferred workshop.',
    iconName: 'ShieldAlert',
    features: [
      'Rapid roadside arrival with safety hazard cones and beacons',
      'Basic electrical triage: blown fuses, relay checks, and sensor connectors',
      'Emergency fuel delivery (petrol top-up to reach the nearest station)',
      'Fluid top-up check (coolant, brake fluid level advisory)',
      'Direct coordination with vetted flatbed recovery partners if needed'
    ],
    isEmergency: true,
    isFeatured: false,
    isActive: true,
    displayOrder: 4,
    estimatedTime: '30 – 45 min arrival',
    warrantyInfo: 'Roadside safety standard compliant',
    metaTitle: 'Emergency Roadside Assistance Dubai | Fast Breakdown Support',
    metaDescription: 'Reliable roadside assistance in Dubai. Quick dispatch for dead batteries, emergency booster, fuel delivery, and minor mechanical triage.'
  },
  {
    id: 'srv-diagnostics',
    slug: 'car-diagnostics',
    name: 'OBD2 Computer Vehicle Diagnostics',
    tagline: 'Professional Scan Tool for Check Engine Lights & Fault Codes',
    shortDescription: 'Check engine light on or vehicle in limp mode? Mobile OBD2 computer scan at your driveway to read ECU fault codes and sensor readings.',
    fullDescription: 'Modern vehicles continuously monitor dozens of subsystems. If a warning light illuminates on your instrument cluster, our technicians carry advanced bi-directional diagnostic scanners capable of communicating with engine, transmission, ABS, airbag, and battery management modules.',
    iconName: 'Cpu',
    features: [
      'Complete diagnostic trouble code (DTC) scan across all control modules',
      'Battery management system (BMS) registration for newly installed AGM units',
      'Live sensor data stream logging (fuel trims, coolant temp, O2 sensors)',
      'Digital diagnostic summary report provided directly to your phone',
      'Clear explanations without misleading technical jargon'
    ],
    isEmergency: false,
    isFeatured: false,
    isActive: true,
    displayOrder: 5,
    estimatedTime: 'Scheduled or 45 min arrival',
    warrantyInfo: 'Includes complete fault report',
    metaTitle: 'Mobile Car Diagnostic Scan Dubai | Check Engine Light OBD2',
    metaDescription: 'Mobile OBD2 car computer diagnostic scan at your doorstep in Dubai. Read and clear fault codes, battery registration, and ECU checks.'
  },
  {
    id: 'srv-tyre-assistance',
    slug: 'tyre-puncture-assistance',
    name: 'Mobile Tyre Air & Puncture Assistance',
    tagline: 'On-Site Tyre Pressure Top-Up & Spare Wheel Change',
    shortDescription: 'Woke up to a flat tyre in your garage or basement? We inspect the tyre, inflate to OEM specifications, plug minor tread punctures, or mount your spare.',
    fullDescription: 'A flat tyre in Dubai heat is frustrating and hazardous on the highway. Our mobile van brings heavy-duty 12V air compressors, puncture repair plugs for tread nails, and hydraulic jacks suitable for sedans, 4x4s, and luxury vehicles.',
    iconName: 'Disc',
    features: [
      'On-site tyre pressure calibration using digital inflators',
      'Tubeless nail/screw tread puncture plugging on location',
      'Safe spare wheel installation using calibrated torque tools',
      'Lug nut inspection and wheel hub condition check',
      'Advisory on tread wear, dry rot, and summer heat safety limits'
    ],
    isEmergency: true,
    isFeatured: false,
    isActive: true,
    displayOrder: 6,
    estimatedTime: '30 – 45 min arrival',
    warrantyInfo: 'Puncture plug warranty for tread repairs',
    metaTitle: 'Mobile Tyre Puncture Repair & Spare Wheel Change Dubai',
    metaDescription: 'Flat tyre in Dubai? Mobile tyre inflation, tread puncture plugging, and spare wheel fitting at your home or roadside.'
  },
  {
    id: 'srv-ac-inspection',
    slug: 'car-ac-inspection',
    name: 'Air Conditioning Performance & Gas Check',
    tagline: 'Essential Summer Cooling Inspection & Pressure Diagnostics',
    shortDescription: 'Is your AC blowing warm air at traffic lights? On-site gauge pressure check, condenser fan evaluation, and cabin air filter inspection.',
    fullDescription: 'In UAE temperatures, vehicle air conditioning is not a luxury—it is critical. AC strain directly impacts alternator load and battery longevity. We perform on-site manifold gauge pressure readings, refrigerant checks, and condenser inspections to diagnose weak cooling.',
    iconName: 'Wind',
    features: [
      'High and low side manifold gauge pressure diagnostics',
      'Condenser coil dirt accumulation and auxiliary fan test',
      'AC compressor clutch engagement and alternator belt check',
      'Cabin pollen filter cleanliness assessment',
      'Vent temperature digital thermometer reading'
    ],
    isEmergency: false,
    isFeatured: false,
    isActive: true,
    displayOrder: 7,
    estimatedTime: 'Scheduled or 45 min arrival',
    warrantyInfo: 'Inspection report provided',
    metaTitle: 'Car AC Inspection & Cooling Check Dubai | Mobile Vehicle Service',
    metaDescription: 'Keep cool in Dubai heat. Mobile car AC pressure test, cooling inspection, and refrigerant diagnostics at your location.'
  }
];

export const initialBatteryBrands: BatteryBrand[] = [
  {
    id: 'brand-varta',
    slug: 'varta',
    name: 'VARTA Batteries',
    countryOfOrigin: 'Germany',
    warrantyStandard: 'Up to 24 Months Official Warranty',
    description: 'The preferred OEM battery for European luxury and German engineering (BMW, Mercedes-Benz, Audi, Porsche). Renowned for patented PowerFrame grid technology and superior start-stop AGM durability.',
    isFeatured: true,
    isActive: true,
    displayOrder: 1
  },
  {
    id: 'brand-amaron',
    slug: 'amaron',
    name: 'Amaron Hi-Life',
    countryOfOrigin: 'India (Johnson Controls Partnership)',
    warrantyStandard: 'Up to 18 Months Official Warranty',
    description: 'Specifically engineered for extreme high-heat environments. Amaron’s patented SilvenX alloy technology dramatically reduces water loss and resists corrosion in temperatures exceeding 50°C.',
    isFeatured: true,
    isActive: true,
    displayOrder: 2
  },
  {
    id: 'brand-bosch',
    slug: 'bosch',
    name: 'Bosch Automotive',
    countryOfOrigin: 'Germany',
    warrantyStandard: 'Up to 18 Months Official Warranty',
    description: 'Globally trusted high-cranking automotive batteries with maximum starting power and deep cyclic resistance for vehicles with heavy onboard electronic accessories.',
    isFeatured: true,
    isActive: true,
    displayOrder: 3
  },
  {
    id: 'brand-acdelco',
    slug: 'acdelco',
    name: 'ACDelco Supreme',
    countryOfOrigin: 'USA (General Motors)',
    warrantyStandard: '12 Months Official Warranty',
    description: 'The premier choice for American and GCC specification vehicles (GMC, Chevrolet, Ford, Cadillac). Maintenance-free calcium alloy design with high reserve capacity.',
    isFeatured: true,
    isActive: true,
    displayOrder: 4
  },
  {
    id: 'brand-solite',
    slug: 'solite',
    name: 'Solite Korea',
    countryOfOrigin: 'South Korea (Hyundai / Kia OEM)',
    warrantyStandard: '12 Months Official Warranty',
    description: 'Standard factory fitted OEM battery for Hyundai and Kia models. High electrical conductivity with internal flame arrestors for utmost safety.',
    isFeatured: false,
    isActive: true,
    displayOrder: 5
  }
];

export const initialBatteryProducts: BatteryProduct[] = [
  {
    id: 'bat-varta-agm-80',
    slug: 'varta-silver-dynamic-agm-80ah',
    brandId: 'brand-varta',
    brandName: 'VARTA',
    modelNumber: 'F21 (580 901 080)',
    batteryType: 'AGM',
    capacityAh: 80,
    coldCrankingAmps: 800,
    voltage: 12,
    dimensionsMm: '315 x 175 x 190 mm',
    warrantyMonths: 24,
    priceAed: 780,
    showPrice: true,
    isInStock: true,
    recommendedFor: ['BMW 3/5 Series', 'Mercedes-Benz C/E Class', 'Audi A4/A6', 'Porsche Macan'],
    features: ['Absorbent Glass Mat (AGM) technology', '3x cycle life of conventional batteries', 'Engineered for advanced Start-Stop systems', 'Leak-proof and maintenance free'],
    displayOrder: 1
  },
  {
    id: 'bat-varta-agm-95',
    slug: 'varta-silver-dynamic-agm-95ah',
    brandId: 'brand-varta',
    brandName: 'VARTA',
    modelNumber: 'G14 (595 901 085)',
    batteryType: 'AGM',
    capacityAh: 95,
    coldCrankingAmps: 850,
    voltage: 12,
    dimensionsMm: '353 x 175 x 190 mm',
    warrantyMonths: 24,
    priceAed: 890,
    showPrice: true,
    isInStock: true,
    recommendedFor: ['BMW X5/X6', 'Mercedes GLE/GLS', 'Range Rover Sport', 'Porsche Cayenne'],
    features: ['High Cold Cranking Amps (850 CCA)', 'Handles high parasitic drain of luxury SUVs', 'German engineering standards', 'Includes on-site ECU battery registration'],
    displayOrder: 2
  },
  {
    id: 'bat-amaron-pro-70',
    slug: 'amaron-pro-hilife-70ah',
    brandId: 'brand-amaron',
    brandName: 'Amaron',
    modelNumber: '85D23L / 95D26L',
    batteryType: 'SMF (Sealed)',
    capacityAh: 70,
    coldCrankingAmps: 600,
    voltage: 12,
    dimensionsMm: '260 x 173 x 225 mm',
    warrantyMonths: 18,
    priceAed: 420,
    showPrice: true,
    isInStock: true,
    recommendedFor: ['Toyota Camry / RAV4', 'Nissan Altima / X-Trail', 'Honda Accord / CR-V', 'Mazda 6 / CX-5'],
    features: ['SilvenX silver alloy heat-resistant plates', 'BIC vents for ultra-low water evaporation', 'Vibration-resistant rugged casing', 'Ideal for Dubai daily highway commuting'],
    displayOrder: 3
  },
  {
    id: 'bat-amaron-pro-100',
    slug: 'amaron-pro-hilife-100ah',
    brandId: 'brand-amaron',
    brandName: 'Amaron',
    modelNumber: '115D31L / 125D31L',
    batteryType: 'SMF (Sealed)',
    capacityAh: 100,
    coldCrankingAmps: 750,
    voltage: 12,
    dimensionsMm: '306 x 173 x 225 mm',
    warrantyMonths: 18,
    priceAed: 540,
    showPrice: true,
    isInStock: true,
    recommendedFor: ['Toyota Land Cruiser V6/V8', 'Nissan Patrol Y62', 'Lexus LX570', 'Mitsubishi Pajero'],
    features: ['Heavy-duty reserve capacity for 4x4s', 'Reinforced posts and terminals', 'High cranking output for large displacement V6/V8 engines', '18 months replacement warranty'],
    displayOrder: 4
  },
  {
    id: 'bat-bosch-s5-agm-70',
    slug: 'bosch-s5-agm-70ah',
    brandId: 'brand-bosch',
    brandName: 'Bosch',
    modelNumber: 'S5 A08',
    batteryType: 'AGM',
    capacityAh: 70,
    coldCrankingAmps: 760,
    voltage: 12,
    dimensionsMm: '278 x 175 x 190 mm',
    warrantyMonths: 18,
    priceAed: 690,
    showPrice: true,
    isInStock: true,
    recommendedFor: ['Volkswagen Golf / Tiguan', 'Audi A3/Q3', 'BMW 1/2 Series', 'Mini Cooper'],
    features: ['Continuous start-stop micro-hybrid performance', 'Patented silver grid technology', 'High deep-cycle discharge capability', 'Direct factory replacement fitment'],
    displayOrder: 5
  },
  {
    id: 'bat-acdelco-60',
    slug: 'acdelco-maintenance-free-60ah',
    brandId: 'brand-acdelco',
    brandName: 'ACDelco',
    modelNumber: 'S55D23L / 24R',
    batteryType: 'SMF (Sealed)',
    capacityAh: 60,
    coldCrankingAmps: 520,
    voltage: 12,
    dimensionsMm: '232 x 173 x 225 mm',
    warrantyMonths: 12,
    priceAed: 350,
    showPrice: true,
    isInStock: true,
    recommendedFor: ['Toyota Corolla / Yaris', 'Nissan Sunny / Tiida', 'Hyundai Elantra', 'Kia Cerato'],
    features: ['Maintenance-free sealed calcium design', 'Built-in hydrometer charge indicator', 'Reliable everyday commuting dependability', 'Affordable value backed by 12 mo warranty'],
    displayOrder: 6
  }
];

export const initialVehicleBrands: VehicleBrand[] = [
  {
    id: 'veh-toyota',
    slug: 'toyota',
    name: 'Toyota',
    originRegion: 'Japanese',
    commonBatteryType: 'SMF (Sealed Maintenance Free) 60Ah – 100Ah',
    notes: 'Land Cruiser & Prado typically require 90Ah–105Ah high-cranking D31 size; Camry/RAV4 use D23/D26 size.',
    isPopular: true,
    isActive: true,
    displayOrder: 1,
    models: [
      { name: 'Land Cruiser 300 / 200', yearRange: '2012–2024', batteryType: 'SMF (Sealed)', recommendedAh: 100, startStop: false },
      { name: 'Prado', yearRange: '2014–2024', batteryType: 'SMF (Sealed)', recommendedAh: 80, startStop: false },
      { name: 'Camry', yearRange: '2015–2024', batteryType: 'SMF (Sealed)', recommendedAh: 70, startStop: false },
      { name: 'RAV4', yearRange: '2016–2024', batteryType: 'SMF (Sealed)', recommendedAh: 65, startStop: false },
      { name: 'Corolla', yearRange: '2014–2024', batteryType: 'SMF (Sealed)', recommendedAh: 55, startStop: false }
    ]
  },
  {
    id: 'veh-nissan',
    slug: 'nissan',
    name: 'Nissan',
    originRegion: 'Japanese',
    commonBatteryType: 'SMF 65Ah – 100Ah (Patrol V8 requires 95Ah–105Ah)',
    notes: 'Patrol Y62 demands high Cold Cranking Amps due to 5.6L V8 engine compression.',
    isPopular: true,
    isActive: true,
    displayOrder: 2,
    models: [
      { name: 'Patrol Y62 (V8 / V6)', yearRange: '2013–2024', batteryType: 'SMF (Sealed)', recommendedAh: 100, startStop: false },
      { name: 'Altima', yearRange: '2015–2024', batteryType: 'SMF (Sealed)', recommendedAh: 65, startStop: false },
      { name: 'X-Trail', yearRange: '2016–2024', batteryType: 'SMF (Sealed)', recommendedAh: 70, startStop: false },
      { name: 'Sunny', yearRange: '2014–2024', batteryType: 'SMF (Sealed)', recommendedAh: 50, startStop: false }
    ]
  },
  {
    id: 'veh-bmw',
    slug: 'bmw',
    name: 'BMW',
    originRegion: 'European',
    commonBatteryType: 'AGM 80Ah – 105Ah (Requires ECU Battery Registration)',
    notes: 'Crucial: BMW Intelligent Battery Sensor (IBS) requires digital battery registration via OBD2 scanner to reset charging alternator curves.',
    isPopular: true,
    isActive: true,
    displayOrder: 3,
    models: [
      { name: 'X5 / X6', yearRange: '2015–2024', batteryType: 'AGM', recommendedAh: 95, startStop: true },
      { name: '5-Series (G30 / F10)', yearRange: '2014–2024', batteryType: 'AGM', recommendedAh: 90, startStop: true },
      { name: '3-Series (G20 / F30)', yearRange: '2015–2024', batteryType: 'AGM', recommendedAh: 80, startStop: true },
      { name: 'X3 / X4', yearRange: '2016–2024', batteryType: 'AGM', recommendedAh: 80, startStop: true },
      { name: '7-Series', yearRange: '2014–2024', batteryType: 'AGM', recommendedAh: 105, startStop: true }
    ]
  },
  {
    id: 'veh-mercedes',
    slug: 'mercedes-benz',
    name: 'Mercedes-Benz',
    originRegion: 'European',
    commonBatteryType: 'AGM 70Ah – 95Ah (Often includes auxiliary backup battery)',
    notes: 'Mercedes Start-Stop models use a main AGM battery in trunk or engine bay plus a secondary auxiliary voltage converter capacitor/battery.',
    isPopular: true,
    isActive: true,
    displayOrder: 4,
    models: [
      { name: 'E-Class (W213 / W212)', yearRange: '2014–2024', batteryType: 'AGM', recommendedAh: 80, startStop: true },
      { name: 'C-Class (W205 / W206)', yearRange: '2015–2024', batteryType: 'AGM', recommendedAh: 70, startStop: true },
      { name: 'GLE / GLS Class', yearRange: '2016–2024', batteryType: 'AGM', recommendedAh: 95, startStop: true },
      { name: 'G-Class (G63 AMG)', yearRange: '2015–2024', batteryType: 'AGM', recommendedAh: 95, startStop: true }
    ]
  },
  {
    id: 'veh-lexus',
    slug: 'lexus',
    name: 'Lexus',
    originRegion: 'Japanese',
    commonBatteryType: 'SMF or AGM 65Ah – 100Ah',
    notes: 'LX570 / LX600 requires 100Ah high reserve capacity. ES and RX series typically use 70Ah D26 size.',
    isPopular: true,
    isActive: true,
    displayOrder: 5,
    models: [
      { name: 'LX570 / LX600', yearRange: '2014–2024', batteryType: 'SMF (Sealed)', recommendedAh: 100, startStop: false },
      { name: 'RX350 / RX450h', yearRange: '2016–2024', batteryType: 'SMF (Sealed)', recommendedAh: 70, startStop: false },
      { name: 'ES350', yearRange: '2015–2024', batteryType: 'SMF (Sealed)', recommendedAh: 65, startStop: false },
      { name: 'IS300 / IS350', yearRange: '2016–2024', batteryType: 'SMF (Sealed)', recommendedAh: 65, startStop: false }
    ]
  },
  {
    id: 'veh-hyundai',
    slug: 'hyundai',
    name: 'Hyundai',
    originRegion: 'Korean',
    commonBatteryType: 'SMF or AGM 60Ah – 80Ah',
    notes: 'Modern Santa Fe and Tucson with Idle Stop & Go (ISG) require AGM or EFB replacement.',
    isPopular: true,
    isActive: true,
    displayOrder: 6,
    models: [
      { name: 'Tucson', yearRange: '2016–2024', batteryType: 'SMF (Sealed)', recommendedAh: 70, startStop: false },
      { name: 'Santa Fe', yearRange: '2015–2024', batteryType: 'SMF (Sealed)', recommendedAh: 80, startStop: false },
      { name: 'Elantra', yearRange: '2015–2024', batteryType: 'SMF (Sealed)', recommendedAh: 60, startStop: false }
    ]
  },
  {
    id: 'veh-ford',
    slug: 'ford',
    name: 'Ford',
    originRegion: 'American',
    commonBatteryType: 'SMF or AGM 65Ah – 85Ah',
    notes: 'F-150 and Explorer require high cold cranking capacity.',
    isPopular: true,
    isActive: true,
    displayOrder: 7,
    models: [
      { name: 'F-150', yearRange: '2015–2024', batteryType: 'SMF (Sealed)', recommendedAh: 80, startStop: false },
      { name: 'Explorer', yearRange: '2016–2024', batteryType: 'SMF (Sealed)', recommendedAh: 75, startStop: false },
      { name: 'Mustang', yearRange: '2015–2024', batteryType: 'SMF (Sealed)', recommendedAh: 65, startStop: false }
    ]
  },
  {
    id: 'veh-porsche',
    slug: 'porsche',
    name: 'Porsche',
    originRegion: 'Luxury/Exotic',
    commonBatteryType: 'AGM 80Ah – 105Ah (Requires OEM BMS Reset)',
    notes: 'Cayenne, Macan, and Panamera require dedicated AGM batteries and gateway adaptation via diagnostic tools.',
    isPopular: false,
    isActive: true,
    displayOrder: 8,
    models: [
      { name: 'Cayenne', yearRange: '2014–2024', batteryType: 'AGM', recommendedAh: 95, startStop: true },
      { name: 'Macan', yearRange: '2015–2024', batteryType: 'AGM', recommendedAh: 80, startStop: true },
      { name: 'Panamera', yearRange: '2014–2024', batteryType: 'AGM', recommendedAh: 95, startStop: true }
    ]
  }
];

export const initialServiceLocations: ServiceLocation[] = [
  {
    id: 'loc-marina',
    slug: 'dubai-marina',
    name: 'Dubai Marina & JBR',
    districtName: 'Dubai Marina / Jumeirah Beach Residence',
    zoneType: 'Coastal',
    estimatedEta: '20 – 30 min',
    isActive: true,
    isPriority: true,
    dispatchNote: 'Underground residential tower parking access equipped.',
    displayOrder: 1
  },
  {
    id: 'loc-downtown',
    slug: 'downtown-dubai',
    name: 'Downtown Dubai & DIFC',
    districtName: 'Downtown / Financial Centre',
    zoneType: 'Central',
    estimatedEta: '25 – 35 min',
    isActive: true,
    isPriority: true,
    dispatchNote: 'Fast access via Financial Centre Road and Al Asayel St.',
    displayOrder: 2
  },
  {
    id: 'loc-business-bay',
    slug: 'business-bay',
    name: 'Business Bay',
    districtName: 'Business Bay & Al Khaleej Al Tejari',
    zoneType: 'Central',
    estimatedEta: '20 – 30 min',
    isActive: true,
    isPriority: true,
    dispatchNote: 'Rapid mobile unit stationed near Marasi Drive.',
    displayOrder: 3
  },
  {
    id: 'loc-al-barsha',
    slug: 'al-barsha',
    name: 'Al Barsha & Barsha Heights (TECOM)',
    districtName: 'Al Barsha 1, 2, 3 & Heights',
    zoneType: 'Central',
    estimatedEta: '15 – 25 min',
    isActive: true,
    isPriority: true,
    dispatchNote: 'Primary operational hub proximity for ultra-rapid dispatch.',
    displayOrder: 4
  },
  {
    id: 'loc-palm-jumeirah',
    slug: 'palm-jumeirah',
    name: 'Palm Jumeirah',
    districtName: 'The Palm (Crescent, Fronds & Trunk)',
    zoneType: 'Coastal',
    estimatedEta: '25 – 35 min',
    isActive: true,
    isPriority: true,
    dispatchNote: 'Villa driveway and apartment basement access.',
    displayOrder: 5
  },
  {
    id: 'loc-jlt',
    slug: 'jumeirah-lakes-towers',
    name: 'Jumeirah Lakes Towers (JLT)',
    districtName: 'Clusters A through Z',
    zoneType: 'Central',
    estimatedEta: '20 – 30 min',
    isActive: true,
    isPriority: true,
    dispatchNote: 'Familiar with cluster lower concourses and visitor parking.',
    displayOrder: 6
  },
  {
    id: 'loc-dubai-hills',
    slug: 'dubai-hills-estate',
    name: 'Dubai Hills Estate & Al Quoz',
    districtName: 'Dubai Hills, Maple, Sidra & Al Quoz',
    zoneType: 'Central',
    estimatedEta: '20 – 30 min',
    isActive: true,
    isPriority: true,
    dispatchNote: 'Convenient villa community access via Al Khail Road.',
    displayOrder: 7
  },
  {
    id: 'loc-jumeirah',
    slug: 'jumeirah-umm-suqeim',
    name: 'Jumeirah & Umm Suqeim',
    districtName: 'Jumeirah 1, 2, 3, Umm Suqeim & Al Safa',
    zoneType: 'Coastal',
    estimatedEta: '25 – 35 min',
    isActive: true,
    isPriority: false,
    dispatchNote: 'Direct roadside and private villa residential dispatch.',
    displayOrder: 8
  },
  {
    id: 'loc-arabian-ranches',
    slug: 'arabian-ranches',
    name: 'Arabian Ranches & Motor City',
    districtName: 'Arabian Ranches 1 & 2, Motor City, Studio City',
    zoneType: 'South Dubai',
    estimatedEta: '30 – 40 min',
    isActive: true,
    isPriority: false,
    dispatchNote: 'Dedicated unit patrolling E311 / Al Qudra corridor.',
    displayOrder: 9
  },
  {
    id: 'loc-deira-bur-dubai',
    slug: 'deira-bur-dubai',
    name: 'Deira & Bur Dubai',
    districtName: 'Al Karama, Oud Metha, Deira & Al Rigga',
    zoneType: 'North Dubai',
    estimatedEta: '35 – 45 min',
    isActive: true,
    isPriority: false,
    dispatchNote: 'Subject to bridge and tunnel traffic during peak rush hours.',
    displayOrder: 10
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    customerName: 'Tariq M.',
    district: 'Downtown Dubai',
    vehicle: 'BMW 530i (2021)',
    rating: 5,
    serviceUsed: 'Mobile AGM Battery Replacement',
    reviewText: 'My BMW threw a battery discharge warning in the underground basement. The technician arrived in 28 minutes, tested the old AGM battery, and installed a genuine Varta. Most importantly, he registered the new battery in the BMW computer using his scanner so the alternator charges it properly. Exceptional professionalism.',
    date: '2026-10-14',
    isVerified: true,
    isFeatured: true,
    isActive: true
  },
  {
    id: 'test-2',
    customerName: 'Sarah H.',
    district: 'Dubai Marina',
    vehicle: 'Toyota RAV4 (2020)',
    rating: 5,
    serviceUsed: 'Battery Testing & Jump-Start',
    reviewText: 'My car wouldn’t start before morning school run. I called expecting to be forced into buying an expensive battery, but the technician tested it and showed me the printout: the battery was still at 85% health, only drained because a cabin light was left on. He jump-started it safely and tested the alternator. Honest, zero pressure, highly recommended.',
    date: '2026-10-22',
    isVerified: true,
    isFeatured: true,
    isActive: true
  },
  {
    id: 'test-3',
    customerName: 'Khalid A.',
    district: 'Palm Jumeirah',
    vehicle: 'Nissan Patrol Y62',
    rating: 5,
    serviceUsed: 'Emergency Battery Replacement',
    reviewText: 'Stuck in Palm Jumeirah with a dead Patrol battery right before an important dinner. Sent my live WhatsApp location, the team confirmed they had the 100Ah Amaron in stock, and the van pulled up within 30 minutes. Paid by card on location and received official warranty on WhatsApp right away.',
    date: '2026-11-02',
    isVerified: true,
    isFeatured: true,
    isActive: true
  },
  {
    id: 'test-4',
    customerName: 'Marcus V.',
    district: 'Jumeirah Lakes Towers',
    vehicle: 'Audi A6 (2019)',
    rating: 5,
    serviceUsed: 'Car Battery & Alternator Diagnostic',
    reviewText: 'Very clean service van, well-spoken mechanic with proper test equipment. Tested starter draw and charging voltage right on spot. Transparent AED pricing without hidden surprises.',
    date: '2026-11-05',
    isVerified: true,
    isFeatured: false,
    isActive: true
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Emergency & Response',
    question: 'How quickly can your mobile technician reach my vehicle in Dubai?',
    answer: 'In our core priority zones (Dubai Marina, JLT, Al Barsha, Business Bay, Downtown, Dubai Hills), our mobile service vans typically arrive within 20 to 35 minutes depending on real-time traffic conditions. When you message us on WhatsApp with your live location pin, our dispatch coordinator confirms the exact estimated arrival time before dispatching.',
    isActive: true,
    displayOrder: 1
  },
  {
    id: 'faq-2',
    category: 'Battery & Tech',
    question: 'Do you really test the battery before replacing it?',
    answer: 'Yes, 100%. We operate on a strict diagnostic-first standard. Before installing a new battery, our technician connects a digital conductance analyzer to test Cold Cranking Amps (CCA), State of Health (SOH), and alternator charging voltage. If your battery is simply discharged due to an interior light or sitting idle, we will recommend a safe jump-start instead of an unnecessary replacement.',
    isActive: true,
    displayOrder: 2
  },
  {
    id: 'faq-3',
    category: 'Battery & Tech',
    question: 'Why do car batteries in Dubai fail much faster than in Europe or North America?',
    answer: 'Dubai’s intense summer temperatures (often exceeding 45°C under the hood) accelerate the internal electrochemical reaction inside lead-acid batteries, leading to rapid electrolyte evaporation, internal grid corrosion, and positive plate shedding. As a result, automotive batteries in the UAE typically last between 1.5 to 2.5 years compared to 3 to 5 years in cooler climates.',
    isActive: true,
    displayOrder: 3
  },
  {
    id: 'faq-4',
    category: 'Battery & Tech',
    question: 'What is the difference between AGM, EFB, and standard SMF batteries?',
    answer: 'Standard SMF (Sealed Maintenance Free) batteries suit vehicles with conventional electrical loads. AGM (Absorbent Glass Mat) and EFB (Enhanced Flooded Battery) are engineered for modern vehicles with Intelligent Start-Stop systems, brake energy recuperation, and high electrical loads (BMW, Mercedes, Audi, Porsche, modern European/Japanese models). Installing a standard battery in a vehicle designed for AGM causes premature battery failure and computer error codes.',
    isActive: true,
    displayOrder: 4
  },
  {
    id: 'faq-5',
    category: 'Pricing & Warranty',
    question: 'Do your replacement batteries come with an official warranty?',
    answer: 'Yes. Every genuine battery we supply includes an official manufacturer warranty ranging from 12 to 24 months (depending on the brand and model selected: Varta up to 24 months, Amaron up to 18 months, ACDelco 12 months). Your warranty card and digital invoice are provided immediately upon installation.',
    isActive: true,
    displayOrder: 5
  },
  {
    id: 'faq-6',
    category: 'Pricing & Warranty',
    question: 'How do I pay on location? Is cash or card accepted?',
    answer: 'Our mobile technicians carry wireless POS card terminals accepting Visa, Mastercard, Apple Pay, and Google Pay. You may also pay in cash directly to the technician once the installation and alternator verification are completed.',
    isActive: true,
    displayOrder: 6
  },
  {
    id: 'faq-7',
    category: 'Battery & Tech',
    question: 'Will changing my battery reset my car computer, clock, or radio settings?',
    answer: 'No. Our technicians plug a dedicated automotive memory saver tool into your vehicle’s OBD2 port or 12V auxiliary socket before disconnecting the old battery terminals. This maintains constant low-voltage power to your engine control unit (ECU), transmission memory, digital clock, and navigation settings.',
    isActive: true,
    displayOrder: 7
  },
  {
    id: 'faq-8',
    category: 'Areas & Booking',
    question: 'Can you access underground tower basements and multi-level parking?',
    answer: 'Yes. Our mobile response fleet includes compact, clearance-height approved service vehicles equipped with portable heavy-duty jump booster packs, trolley battery carriers, and portable diagnostic analyzers specifically chosen to navigate low-clearance residential and commercial parking garages across Dubai Marina, JLT, and Downtown.',
    isActive: true,
    displayOrder: 8
  },
  {
    id: 'faq-9',
    category: 'Pricing & Warranty',
    question: 'Do you dispose of and recycle the old depleted battery?',
    answer: 'Yes. We safely remove your old battery and transport it for certified environmental recycling in compliance with Dubai environmental protection guidelines, preventing harmful lead and sulfuric acid contamination.',
    isActive: true,
    displayOrder: 9
  }
];

export const initialRequests: ServiceRequest[] = [
  {
    id: 'req-101',
    referenceNo: 'DXB-2611-01',
    customerName: 'Omar Al-Falasi',
    customerPhone: '+971 50 123 4567',
    customerWhatsapp: '+971 50 123 4567',
    vehicleBrand: 'Toyota',
    vehicleModel: 'Land Cruiser 300 (2022)',
    vehicleYear: '2022',
    serviceRequired: 'Car Battery Replacement',
    locationArea: 'Dubai Hills Estate',
    specificLocation: 'Maple 2, Villa 45',
    issueDescription: 'Car clicked repeatedly this morning and failed to crank. Original battery is now 2.5 years old.',
    urgency: 'EMERGENCY_NOW',
    status: 'COMPLETED',
    technicianNotes: 'Installed Amaron 100Ah D31L. Alternator tested at 14.2V. 18-month warranty registered.',
    source: 'WEBSITE_EMERGENCY',
    createdAt: '2026-11-10T08:15:00Z',
    updatedAt: '2026-11-10T09:10:00Z'
  },
  {
    id: 'req-102',
    referenceNo: 'DXB-2611-02',
    customerName: 'Chloe Bennett',
    customerPhone: '+971 52 987 6543',
    customerWhatsapp: '+971 52 987 6543',
    vehicleBrand: 'BMW',
    vehicleModel: 'X5 xDrive40i (2020)',
    vehicleYear: '2020',
    serviceRequired: 'Car Battery Replacement',
    locationArea: 'Dubai Marina',
    specificLocation: 'Marina Gate 2, Basement Parking P2',
    issueDescription: 'Yellow battery warning on dashboard. Start-stop no longer engages.',
    urgency: 'TODAY',
    status: 'DISPATCHED',
    technicianNotes: 'Technician en route with VARTA Silver Dynamic 95Ah AGM. OBD2 scanner packed for IBS battery registration.',
    source: 'SMART_FINDER',
    createdAt: '2026-11-11T13:40:00Z',
    updatedAt: '2026-11-11T14:05:00Z'
  },
  {
    id: 'req-103',
    referenceNo: 'DXB-2611-03',
    customerName: 'Rashid K.',
    customerPhone: '+971 55 456 7890',
    customerWhatsapp: '+971 55 456 7890',
    vehicleBrand: 'Nissan',
    vehicleModel: 'Patrol Y62',
    vehicleYear: '2019',
    serviceRequired: 'Safe Jump-Start & Alternator Check',
    locationArea: 'Business Bay',
    specificLocation: 'Near Bay Square, Building 5 parking',
    issueDescription: 'Hazard lights left on for 4 hours. Need emergency booster start.',
    urgency: 'EMERGENCY_NOW',
    status: 'NEW',
    source: 'WEBSITE_EMERGENCY',
    createdAt: '2026-11-11T14:45:00Z',
    updatedAt: '2026-11-11T14:45:00Z'
  }
];

export const initialEvents: LeadConversionEvent[] = [
  {
    id: 'evt-1',
    eventType: 'WHATSAPP_CLICK',
    pageUrl: '/',
    vehicleBrand: 'Toyota',
    locationDistrict: 'Dubai Marina',
    timestamp: '2026-11-11T10:14:22Z'
  },
  {
    id: 'evt-2',
    eventType: 'PHONE_CALL',
    pageUrl: '/services/car-battery-replacement',
    locationDistrict: 'Downtown Dubai',
    timestamp: '2026-11-11T11:02:18Z'
  },
  {
    id: 'evt-3',
    eventType: 'FINDER_COMPLETED',
    pageUrl: '/batteries/finder',
    vehicleBrand: 'BMW',
    timestamp: '2026-11-11T12:20:05Z'
  },
  {
    id: 'evt-4',
    eventType: 'EMERGENCY_FORM_SUBMIT',
    pageUrl: '/',
    vehicleBrand: 'Nissan',
    locationDistrict: 'Business Bay',
    timestamp: '2026-11-11T14:45:00Z'
  }
];
