import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDW5075X4k9QTJzRpkKClT48GYUgSiVpw4",
  authDomain: "wk-smart-city-plc.firebaseapp.com",
  projectId: "wk-smart-city-plc",
  storageBucket: "wk-smart-city-plc.firebasestorage.app",
  messagingSenderId: "335014067510",
  appId: "1:335014067510:web:4c55a9f259133dcee04797"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const hofCommunityData = {
  name: "The HOF Community",
  location: "Life Camp, Abuja",
  state: "Abuja",
  neighborhood: "Life Camp",
  tagline: "Distinguished residential development in the heart of Abuja's prime corridor.",
  description: "A distinguished, FCDA-approved residential community in Life Camp. Meticulously designed for modern architectural elegance and secure urban living, it offers excellent connectivity and strong capital appreciation potential for homeowners and investors.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1K9BgIgXG_xT9slAfRl32icd95C1bmoOz&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1K9BgIgXG_xT9slAfRl32icd95C1bmoOz&sz=w1200",
  updatesLink: "/projects/hof-community",
  advisorId: "samuel-kwati",
  houseTypeIds: [],
  highlights: [
    "FCDA Approved development status.",
    "Strategically positioned for high accessibility within Abuja’s prime residential zone.",
    "Designed for modern community living with premium architectural standards.",
    "Excellent investment potential for capital appreciation and rental yield.",
    "Proximity to key city infrastructure, healthcare, and educational hubs."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "Secure and gated community environment" },
    { category: "Infrastructure", details: "Well-planned modern residential infrastructure" },
    { category: "Environment", details: "Prestigious, serene, and family-oriented" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Federal Secretariat", travelTime: "15 mins" },
    { category: "Healthcare", establishment: "National Hospital Abuja", travelTime: "20 mins" },
    { category: "Education", establishment: "Baze University", travelTime: "12 mins" },
    { category: "Shopping", establishment: "Jabi Lake Mall", travelTime: "18 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "35 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "3 Bedroom Quadruplex (180 SQM)", priceRange: "N18,000,000", outlook: "High-Growth Potential" },
    { plotCategory: "3 Bedroom Semi Detached Duplex (300 SQM)", priceRange: "N28,000,000", outlook: "Premium Investment" },
    { plotCategory: "5 Bedroom Detached Duplex (450 SQM)", priceRange: "N35,000,000", outlook: "Strong Appreciation Potential" }
  ],
  plotSizes: [
    { plotType: "Quadruplex Unit", dimensions: "Standard Layout", area: "180 SQM", availability: "Available" },
    { plotType: "Semi Detached Duplex", dimensions: "Standard Layout", area: "300 SQM", availability: "Available" },
    { plotType: "Detached Duplex", dimensions: "Standard Layout", area: "450 SQM", availability: "Available" }
  ],
  sortOrder: 999,
  createdAt: new Date().toISOString()
};

const kwatiCityMaitamaData = {
  name: "Kwati City, Maitama II",
  location: "Maitama II, Abuja",
  state: "Abuja",
  neighborhood: "Maitama",
  tagline: "A landmark smart development strategically positioned in Abuja's most prestigious corridor.",
  description: "A landmark, FCDA-approved smart city development in Abuja's prestigious Maitama II. Engineered for refined urban living, it offers high-end residential layouts, seamless business connectivity, and exceptional capital appreciation potential in a high-growth corridor.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1vdMFJGPHIiAOCtp5zqxqNvHRqR4Mr1da&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1vdMFJGPHIiAOCtp5zqxqNvHRqR4Mr1da&sz=w1200",
  updatesLink: "/projects/kwati-city-maitama-ii",
  advisorId: "samuel-kwati",
  houseTypeIds: ["white-pearl", "silver-pearl", "blue-sapphire", "star-sapphire", "jade-terrace", "royal-emerald", "imperial-emerald"],
  highlights: [
    "FCDA Approved development status.",
    "Located in the prestigious Maitama II district of Abuja.",
    "Strategically positioned for excellent accessibility to central business hubs.",
    "Designed to offer a premium, secure, and serene living environment.",
    "High investment appeal with significant potential for future capital appreciation."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "Strategically managed gated environment" },
    { category: "Infrastructure", details: "Well-planned layout for high-end residential use" },
    { category: "Environment", details: "Prestigious / Serene / Exclusive" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Maitama District & FCT Secretariats", travelTime: "10 mins" },
    { category: "Healthcare", establishment: "Maitama District Hospital", travelTime: "15 mins" },
    { category: "Education", establishment: "Nile University of Nigeria", travelTime: "20 mins" },
    { category: "Shopping", establishment: "Jabi Lake Mall", travelTime: "25 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "40 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "180 SQM - 350 SQM Plots", priceRange: "₦7,000,000 - ₦12,740,000", outlook: "High-Growth Potential" },
    { plotCategory: "500 SQM - 800 SQM Plots", priceRange: "₦19,500,000 - ₦28,600,000", outlook: "Premium Investment" },
    { plotCategory: "1,000 SQM Plot", priceRange: "₦36,400,000", outlook: "Strong Appreciation Potential" },
    { plotCategory: "1 Hectare", priceRange: "₦260,000,000", outlook: "Long-Term Wealth Preservation" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "18m x 10m", area: "180 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "25m x 10m", area: "250 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "25m x 14m", area: "350 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "25m x 20m", area: "500 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "32.5m x 20m", area: "650 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "37.5m x 20m", area: "750 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "40m x 20m", area: "800 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "40m x 25m", area: "1,000 SQM", availability: "Available" },
    { plotType: "Large Scale", dimensions: "100m x 100m", area: "1 Hectare", availability: "Available" }
  ],
  sortOrder: 2,
  createdAt: new Date().toISOString()
};

const deLuminariaData = {
  name: "De Luminaria Maitama II",
  location: "Maitama II, Abuja",
  state: "Abuja",
  neighborhood: "Maitama",
  tagline: "Refined smart luxury residence in Abuja's prestigious Maitama II district.",
  description: "A beacon of refined luxury in Abuja's prestigious Maitama II district. Fully FCDA-approved with a Certificate of Occupancy, this master-planned estate blends modern infrastructure with a serene, secure environment, presenting a premier choice for residential living and long-term investment.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU&sz=w1200",
  updatesLink: "/projects/maitama-ii-estate",
  advisorId: "samuel-kwati",
  houseTypeIds: ["white-pearl", "silver-pearl", "blue-sapphire", "star-sapphire", "jade-terrace", "royal-emerald", "imperial-emerald"],
  highlights: [
    "FCDA Approved with Certificate of Occupancy (C of O)",
    "Located in the prestigious Maitama II district",
    "Designed for premium, secure, and exclusive residential living",
    "Excellent accessibility to central business and government districts",
    "Strong investment potential with significant capital appreciation outlook"
  ],
  realEstateVibe: [
    { category: "Land Title", details: "Certificate of Occupancy (C of O)" },
    { category: "Security", details: "Strategically managed gated environment" },
    { category: "Infrastructure", details: "Planned layout for high-end residential use" },
    { category: "Environment", details: "Prestigious / Serene / Exclusive" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Maitama District & FCT Secretariats", travelTime: "10 mins" },
    { category: "Healthcare", establishment: "Maitama District Hospital", travelTime: "15 mins" },
    { category: "Education", establishment: "Nile University of Nigeria", travelTime: "20 mins" },
    { category: "Shopping", establishment: "Jabi Lake Mall", travelTime: "25 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "40 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "180 SQM - 350 SQM Plots", priceRange: "₦16.2M - ₦22.5M", outlook: "High-Growth Potential" },
    { plotCategory: "500 SQM - 750 SQM Plots", priceRange: "₦45M - ₦67.5M", outlook: "Premium Investment" },
    { plotCategory: "1,000 SQM Plot", priceRange: "₦90M", outlook: "Strong Appreciation Potential" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "18m x 10m", area: "180 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "25m x 10m", area: "250 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "25m x 14m", area: "350 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "25m x 20m", area: "500 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "32.5m x 20m", area: "650 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "37.5m x 20m", area: "750 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "40m x 25m", area: "1,000 SQM", availability: "Available" }
  ],
  sortOrder: 2,
  createdAt: new Date().toISOString()
};

const whisperingPinesData = {
  name: "Whispering Pines",
  location: "Karsana, Abuja",
  state: "Abuja",
  neighborhood: "Karsana",
  tagline: "Premier residential estate in the rapidly expanding Karsana district.",
  description: "A premier, FCDA-approved residential community in Abuja's high-growth Karsana district. Combining a serene lifestyle with strategic connectivity to the metropolis, it offers a secure, planned environment for homeowners and investors seeking long-term value and capital appreciation.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN&sz=w1200",
  updatesLink: "/projects/whispering-pines",
  advisorId: "samuel-kwati",
  houseTypeIds: ["blue-sapphire", "star-sapphire", "white-pearl", "silver-pearl", "jade-terrace", "royal-emerald", "imperial-emerald"],
  highlights: [
    "FCDA Approved development status.",
    "Strategically located in the high-growth Karsana district of Abuja.",
    "Excellent accessibility to major arterial roads connecting to the Abuja metropolis.",
    "Ideal environment for modern residential and family-oriented living.",
    "Strong investment potential due to ongoing infrastructural development in Karsana."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "Secure and accessible district" },
    { category: "Infrastructure", details: "Planned residential layout in Karsana" },
    { category: "Environment", details: "Serene, residential-focused, and well-connected" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Gwarinpa/Kubwa Governance Hubs", travelTime: "15 mins" },
    { category: "Healthcare", establishment: "Federal Medical Centre, Jabi", travelTime: "20 mins" },
    { category: "Education", establishment: "Nile University of Nigeria", travelTime: "15 mins" },
    { category: "Shopping", establishment: "Gwarinpa Shopping District", travelTime: "10 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "30 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "225 SQM Plot", priceRange: "N22,500,000", outlook: "High-Growth Potential" },
    { plotCategory: "350 SQM Plot", priceRange: "N30,000,000", outlook: "Strong Appreciation Potential" },
    { plotCategory: "500 SQM Plot", priceRange: "N50,000,000", outlook: "Premium Investment" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "~11m x 20m", area: "225 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "~14m x 25m", area: "350 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "~20m x 25m", area: "500 SQM", availability: "Available" }
  ],
  sortOrder: 4,
  createdAt: new Date().toISOString()
};

const palmHavenData = {
  name: "Palm Haven",
  location: "Apo Tafyi, Abuja",
  state: "Abuja",
  neighborhood: "Apo Tafyi",
  tagline: "A sophisticated residential development strategically positioned in Abuja's Apo-Tafyi district.",
  description: "An FCDA-approved master-planned community in Abuja's Apo-Tafyi district. Designed for modern luxury, Palm Haven blends architectural elegance with secure urban living, offering excellent business district accessibility, premium lifestyle amenities, and strong long-term capital appreciation and rental yield potential.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1eMbw99C0kjQqbNZoyN4rieCduY_uNnuZ&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1eMbw99C0kjQqbNZoyN4rieCduY_uNnuZ&sz=w1200",
  updatesLink: "/projects/palm-haven",
  advisorId: "samuel-kwati",
  houseTypeIds: ["silver-pearl", "white-pearl", "blue-sapphire", "star-sapphire", "jade-terrace", "royal-emerald", "imperial-emerald"],
  highlights: [
    "FCDA Approved development status.",
    "Strategically positioned in the high-growth Apo-Tafyi district of Abuja.",
    "Ideal environment for modern residential and family-oriented living.",
    "Strong investment appeal with a diverse range of residential options for optimal rental yields.",
    "Excellent accessibility to major road networks within the Abuja metropolis."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "Strategically managed gated environment" },
    { category: "Infrastructure", details: "Planned residential layout with modern utilities" },
    { category: "Environment", details: "Prestigious, serene, and family-oriented" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Apo Legislative Quarters", travelTime: "10 mins" },
    { category: "Healthcare", establishment: "Garki General Hospital", travelTime: "15 mins" },
    { category: "Education", establishment: "Nigerian Turkish Nile University", travelTime: "20 mins" },
    { category: "Shopping", establishment: "Shoprite, Apo Mall", travelTime: "8 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "35 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "250 SQM Plot", priceRange: "₦33,000,000", outlook: "High-Growth Potential" },
    { plotCategory: "450 SQM Plot", priceRange: "₦60,000,000", outlook: "Premium Investment" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "25m x 10m", area: "250 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "22.5m x 20m", area: "450 SQM", availability: "Available" }
  ],
  sortOrder: 999,
  createdAt: new Date().toISOString()
};


const murgCityData = {
  name: "Murg City",
  location: "Katampe Extension, Abuja",
  state: "Abuja",
  neighborhood: "Katampe Extension",
  tagline: "Africa's first AI-integrated smart community in Katampe Extension, Abuja.",
  description: "Africa’s first AI-integrated community located in prestigious Katampe Extension, Abuja. This FCDA-approved estate blends luxury residential design with cutting-edge smart infrastructure, offering advanced security, premium modern amenities, and excellent connectivity for strong property appreciation and long-term investment value.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1hxVqzWX7fTw6I2a2KMNgz53N9JAmgzO4&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1hxVqzWX7fTw6I2a2KMNgz53N9JAmgzO4&sz=w1200",
  updatesLink: "/projects/murg-city",
  advisorId: "samuel-kwati",
  houseTypeIds: [],
  highlights: [
    "FCDA Approved development status.",
    "Integrated smart community features, including AI-driven security and infrastructure.",
    "Comprehensive amenities such as hospitals, schools, sports centers, and shopping malls.",
    "Fully serviced with asphalt roads, power supply, and adequate water supply.",
    "Strategically located in the highly desirable Usuma, Katampe Extension district."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "24-Hours security, perimeter fence, and security post" },
    { category: "Infrastructure", details: "AI-integrated infrastructure, power, water, and asphalt roads" },
    { category: "Environment", details: "Well-landscaped, serene, and ultra-modern community" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Maitama District / Federal Secretariat", travelTime: "12 mins" },
    { category: "Healthcare", establishment: "Maitama District Hospital", travelTime: "15 mins" },
    { category: "Education", establishment: "Baze University / Nile University", travelTime: "18 mins" },
    { category: "Shopping", establishment: "Next Cash and Carry", travelTime: "15 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "35 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "240 SQM Plot", priceRange: "N15,000,000", outlook: "High-Growth Potential" },
    { plotCategory: "450 SQM Plot", priceRange: "N28,000,000", outlook: "Premium Investment" },
    { plotCategory: "540 SQM Plot", priceRange: "N33,600,000", outlook: "Strong Appreciation Potential" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "~12m x 20m", area: "240 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "~18m x 25m", area: "450 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "~20m x 27m", area: "540 SQM", availability: "Available" }
  ],
  sortOrder: 999,
  createdAt: new Date().toISOString()
};


const murgCityExclusiveData = {
  name: "Murg City Exclusive",
  location: "Katampe Extension, Abuja",
  state: "Abuja",
  neighborhood: "Katampe Extension",
  tagline: "Ultra-luxury residential community featuring golf courses and lakes in Katampe Extension.",
  description: "An FCDA-approved master-planned estate in Katampe Extension, Abuja, offering golf courses, artificial lakes, and a private clubhouse. It combines underground wiring and advanced security with premium recreational amenities, ensuring prestigious luxury living and high capital appreciation potential for investors.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1SgY9v0_USlmGyfIO1J9bE8TA4fbwYETM&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1SgY9v0_USlmGyfIO1J9bE8TA4fbwYETM&sz=w1200",
  updatesLink: "/projects/murg-city-exclusive",
  advisorId: "samuel-kwati",
  houseTypeIds: [],
  highlights: [
    "FCDA Approved development status.",
    "Located in the prestigious Usuma, Katampe Extension district.",
    "Features world-class recreational amenities including two standard golf courses and artificial lakes.",
    "Comprehensive facilities: Clubhouse, amusement park, medical centre, and sports centre.",
    "Advanced infrastructure: Underground wiring, solar streetlights, and 24-hour security."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "24-hour security, gated community, and surveillance" },
    { category: "Infrastructure", details: "Underground wiring, solar streetlights, and premium connectivity" },
    { category: "Environment", details: "Prestigious, serene, and exclusive landscape" },
    { category: "Recreation", details: "Golf courses, artificial lakes, amusement park, clubhouse" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Maitama District / Federal Secretariat", travelTime: "15 mins" },
    { category: "Healthcare", establishment: "Maitama District Hospital", travelTime: "18 mins" },
    { category: "Education", establishment: "Baze University / Nile University", travelTime: "20 mins" },
    { category: "Shopping", establishment: "Next Cash and Carry", travelTime: "15 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "35 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "350 SQM Plot", priceRange: "N43,800,000", outlook: "High-Growth Potential" },
    { plotCategory: "600 SQM Plot", priceRange: "N75,000,000", outlook: "Strong Appreciation Potential" },
    { plotCategory: "850 SQM Plot", priceRange: "N106,000,000", outlook: "Premium Investment" },
    { plotCategory: "1,000 SQM Plot", priceRange: "N125,000,000", outlook: "Premium Investment" },
    { plotCategory: "1,500 SQM Plot", priceRange: "N187,500,000", outlook: "Long-Term Wealth Preservation" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "~14m x 25m", area: "350 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "~20m x 30m", area: "600 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "~25m x 34m", area: "850 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "~25m x 40m", area: "1,000 SQM", availability: "Available" },
    { plotType: "Large Scale Plot", dimensions: "~30m x 50m", area: "1,500 SQM", availability: "Available" }
  ],
  sortOrder: 999,
  createdAt: new Date().toISOString()
};


const ellingtonVillaData = {
  name: "Ellington Villa",
  location: "Mabushi, Abuja",
  state: "Abuja",
  neighborhood: "Mabushi",
  tagline: "Prestigious residential development offering modern luxury in the central Mabushi district.",
  description: "An FCDA-approved prestigious residential development in Mabushi, Abuja. Engineered for modern luxury, it offers exceptional business district accessibility, premium lifestyle amenities, and a highly secure gated environment, making it an ideal choice for wealth preservation and high rental yields.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU&sz=w1200",
  updatesLink: "/projects/ellington-villa",
  advisorId: "samuel-kwati",
  houseTypeIds: ["white-pearl", "silver-pearl"],
  highlights: [
    "FCDA Approved development status.",
    "Located in the central and highly prestigious Mabushi district.",
    "Excellent connectivity to major road networks including the Nnamdi Azikiwe International Airport road.",
    "Ideal environment for modern, high-end residential living.",
    "Strong investment potential due to proximity to the Central Business District."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "Secure, gated, and professionally managed community" },
    { category: "Infrastructure", details: "Well-planned modern residential complex" },
    { category: "Environment", details: "Prestigious, serene, and centrally located" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Federal Secretariat / Ministries", travelTime: "10 mins" },
    { category: "Healthcare", establishment: "National Hospital Abuja", travelTime: "8 mins" },
    { category: "Education", establishment: "Baze University", travelTime: "15 mins" },
    { category: "Shopping", establishment: "Jabi Lake Mall", travelTime: "10 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "30 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "225 SQM Plot", priceRange: "₦32,000,000 – ₦40,000,000", outlook: "Steady Value Rise" },
    { plotCategory: "350 SQM Plot", priceRange: "₦50,000,000 – ₦65,000,000", outlook: "High Demand" },
    { plotCategory: "650 SQM - 750 SQM Plots", priceRange: "₦90,000,000 – ₦110,000,000", outlook: "Premium Investment" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "22.5m x 10m", area: "225 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "25m x 14m", area: "350 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "32.5m x 20m", area: "650 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "37.5m x 20m", area: "750 SQM", availability: "Limited" }
  ],
  sortOrder: 999,
  createdAt: new Date().toISOString()
};


const nimiHillsGuzapeData = {
  name: "Nimi Hills, Guzape",
  location: "Guzape, Abuja",
  state: "Abuja",
  neighborhood: "Guzape",
  tagline: "Ultra-luxury residential landmark offering an elite elevated living experience in Guzape.",
  description: "An FCDA-approved master-planned community in Guzape, Abuja, combining high-end architectural grandeur with premium recreational amenities, including private pools. It offers breathtaking elevated views, top-tier security, and seamless connectivity, promising elite residential luxury and unmatched long-term wealth preservation.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP&sz=w1200",
  updatesLink: "/projects/nimi-hills-guzape",
  advisorId: "samuel-kwati",
  houseTypeIds: ["white-pearl", "silver-pearl", "blue-sapphire", "star-sapphire", "jade-terrace", "royal-emerald", "imperial-emerald"],
  highlights: [
    "FCDA Approved development status.",
    "Located in the prestigious and highly elevated Guzape district.",
    "World-class amenities, including private swimming pools and extensive green areas.",
    "Elite infrastructure featuring paved internal roads and premium security systems.",
    "High investment appeal driven by exclusivity and strong demand in the Guzape corridor."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "24-hour security, gated community, and surveillance" },
    { category: "Infrastructure", details: "Paved roads, street lights, and modern utility networks" },
    { category: "Environment", details: "Prestigious, elevated, serene, and exclusive" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Asokoro/Aso Villa/Federal Secretariat", travelTime: "10 mins" },
    { category: "Healthcare", establishment: "Asokoro District Hospital", travelTime: "12 mins" },
    { category: "Education", establishment: "Lead British International School", travelTime: "15 mins" },
    { category: "Shopping", establishment: "Shoprite, Apo Mall", travelTime: "12 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "35 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "200 SQM - 450 SQM Plots", priceRange: "₦24,000,000 - ₦54,000,000", outlook: "High-Growth Potential" },
    { plotCategory: "650 SQM - 800 SQM Plots", priceRange: "₦78,000,000 - ₦96,000,000", outlook: "Premium Investment" },
    { plotCategory: "1,000 SQM Plot", priceRange: "₦120,000,000", outlook: "Strong Appreciation Potential" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "20m x 10m", area: "200 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "25m x 10m", area: "250 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "22.5m x 20m", area: "450 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "32.5m x 20m", area: "650 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "37.5m x 20m", area: "750 SQM", availability: "Limited" },
    { plotType: "Standard Plot", dimensions: "40m x 20m", area: "800 SQM", availability: "Limited" },
    { plotType: "Standard Plot", dimensions: "40m x 25m", area: "1,000 SQM", availability: "Limited" }
  ],
  sortOrder: 999,
  createdAt: new Date().toISOString()
};


const usuloCityKujeData = {
  name: "Usulo City, Kuje",
  location: "Kuje, Abuja",
  state: "Abuja",
  neighborhood: "Kuje",
  tagline: "Africa's first AI-integrated wellness community in the tranquil Kuje district.",
  description: "A groundbreaking FCDA-approved development in Kuje, Abuja. Proudly standing as Africa's first AI-integrated wellness community, it blends cutting-edge technology with serene surroundings, offering a refreshing lifestyle escape, advanced security, and high potential for sustained property value appreciation.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1W78PkCZEKS_smIJHqajeKCdtYev7yGpZ&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1W78PkCZEKS_smIJHqajeKCdtYev7yGpZ&sz=w1200",
  updatesLink: "/projects/usulo-city-kuje",
  advisorId: "samuel-kwati",
  houseTypeIds: [],
  highlights: [
    "FCDA Approved development status.",
    "Pioneering status as Africa’s first AI-integrated wellness community.",
    "Strategically positioned in the high-growth Kuje district.",
    "Designed for holistic living with an emphasis on nature and wellness.",
    "Strong investment appeal with flexible payment plans for Phase 2."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "AI-integrated smart community security" },
    { category: "Infrastructure", details: "Advanced smart infrastructure and wellness-focused layout" },
    { category: "Environment", details: "Serene, wellness-oriented, and naturally landscaped" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Kuje Area Council Secretariat", travelTime: "10 mins" },
    { category: "Healthcare", establishment: "Kuje General Hospital", travelTime: "12 mins" },
    { category: "Education", establishment: "Government Science & Technical College", travelTime: "15 mins" },
    { category: "Shopping", establishment: "Kuje Main Market", travelTime: "10 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "20 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "300 SQM Plot", priceRange: "N1,850,000", outlook: "High-Growth Potential" },
    { plotCategory: "500 SQM Plot", priceRange: "N3,100,000", outlook: "Strong Appreciation Potential" },
    { plotCategory: "1,000 SQM Plot", priceRange: "N6,200,000", outlook: "Premium Investment" },
    { plotCategory: "1 Hectare", priceRange: "N18,000,000", outlook: "Long-Term Wealth Preservation" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "~15m x 20m", area: "300 SQM", availability: "Pre-Sale" },
    { plotType: "Standard Plot", dimensions: "~20m x 25m", area: "500 SQM", availability: "Pre-Sale" },
    { plotType: "Standard Plot", dimensions: "~25m x 40m", area: "1,000 SQM", availability: "Pre-Sale" },
    { plotType: "Large Scale Plot", dimensions: "~100m x 100m", area: "1 Hectare", availability: "Pre-Sale" }
  ],
  sortOrder: 999,
  createdAt: new Date().toISOString()
};


const lakesideViewData = {
  name: "Lakeside View",
  location: "Kuje, Abuja",
  state: "Abuja",
  neighborhood: "Kuje",
  tagline: "Premium residential opportunity offering tranquility and strategic accessibility in Kuje, Abuja.",
  description: "An FCDA-approved residential community in Kuje, Abuja. Designed to combine immediate comfort with long-term capital appreciation, Lakeside View features well-planned road networks, street lighting, and dedicated play areas, offering a perfect balance of affordability and prestige in an expanding market corridor.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612&sz=w1200",
  updatesLink: "/projects/lakeside-view",
  advisorId: "samuel-kwati",
  houseTypeIds: [],
  highlights: [
    "FCDA Approved development status.",
    "Strategically located in the tranquil and high-growth Kuje district.",
    "Planned community features, including dedicated play areas and recreational spaces.",
    "Enhanced infrastructure, including well-planned road networks and street lighting.",
    "Prime investment opportunity offering excellent value for money in an expanding market."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "Secure and gated community environment" },
    { category: "Infrastructure", details: "Modern road networks and street lighting" },
    { category: "Environment", details: "Serene, residential-focused, and scenic" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Kuje Area Council Secretariat", travelTime: "10 mins" },
    { category: "Healthcare", establishment: "Kuje General Hospital", travelTime: "12 mins" },
    { category: "Education", establishment: "Government Science & Technical College", travelTime: "15 mins" },
    { category: "Shopping", establishment: "Kuje Main Market", travelTime: "10 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "20 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "300 SQM Plot", priceRange: "N3,000,000", outlook: "High-Growth Potential" },
    { plotCategory: "450 SQM Plot", priceRange: "N4,500,000", outlook: "Strong Appreciation Potential" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "~15m x 20m", area: "300 SQM", availability: "Available" },
    { plotType: "Standard Plot", dimensions: "~18m x 25m", area: "450 SQM", availability: "Available" }
  ],
  sortOrder: 999,
  createdAt: new Date().toISOString()
};



const beverlyHillsKujeData = {
  name: "Beverly Hills",
  location: "Kuje, Abuja",
  state: "Abuja",
  neighborhood: "Kuje",
  tagline: "Master-planned community offering modern architectural elegance in Kuje district, Abuja.",
  description: "An FCDA-approved master-planned community in Kuje, Abuja. Designed to combine modern architectural elegance with secure family-oriented living, it features well-planned road networks, street lighting, and dedicated play areas, offering immediate comfort and long-term value preservation.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1SMA1L09Z3xg6nV7hIpSs8BAOM70IHb8s&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1SMA1L09Z3xg6nV7hIpSs8BAOM70IHb8s&sz=w1200",
  updatesLink: "/projects/beverly-hills",
  advisorId: "samuel-kwati",
  houseTypeIds: [],
  highlights: [
    "FCDA Approved development status.",
    "Strategically positioned in the high-growth Kuje district of Abuja.",
    "Ideal environment for modern residential and family-oriented living.",
    "Planned community features, including dedicated play areas and recreational spaces.",
    "Enhanced infrastructure, including well-planned road networks and street lighting."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "Secure and gated community environment" },
    { category: "Infrastructure", details: "Modern road networks and street lighting" },
    { category: "Environment", details: "Serene, residential-focused, and family-oriented" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Kuje Area Council Secretariat", travelTime: "10 mins" },
    { category: "Healthcare", establishment: "Kuje General Hospital", travelTime: "12 mins" },
    { category: "Education", establishment: "Government Science & Technical College", travelTime: "15 mins" },
    { category: "Shopping", establishment: "Kuje Main Market", travelTime: "10 mins" },
    { category: "Aviation", establishment: "Nnamdi Azikiwe International Airport", travelTime: "20 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "300 SQM Plot", priceRange: "N2,500,000", outlook: "High-Growth Potential" },
    { plotCategory: "400 SQM Plot", priceRange: "N4,100,000", outlook: "Strong Appreciation Potential" },
    { plotCategory: "1,000 SQM Plot", priceRange: "N8,300,000", outlook: "Long-Term Wealth Preservation" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "~15m x 20m", area: "300 SQM", availability: "Sold Out" },
    { plotType: "Standard Plot", dimensions: "~18m x 22m", area: "400 SQM", availability: "Sold Out" },
    { plotType: "Standard Plot", dimensions: "~25m x 40m", area: "1,000 SQM", availability: "Sold Out" }
  ],
  sortOrder: 3,
  createdAt: new Date().toISOString()
};



const fintiriHomeEstateData = {
  name: "Fintiri Home Estate",
  location: "Sangere, Yola",
  state: "Yola",
  neighborhood: "Sangere",
  tagline: "Comfortable modern living spaces in the serene Sangere area of Yola.",
  description: "A comfortable modern residential development in Sangere, Yola. Engineered to make home ownership accessible, it offers fully finished and carcass options, flexible payment plans with a 20% down payment, secure community living, and excellent potential for long-term property appreciation.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1KGLdqvAPmRLFCi_vYeKe8nJ0yms7idqb&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1KGLdqvAPmRLFCi_vYeKe8nJ0yms7idqb&sz=w1200",
  updatesLink: "/projects/fintiri-home-estate",
  advisorId: "fatima-usman",
  houseTypeIds: ["black-onyx", "red-onyx"],
  highlights: [
    "Strategically positioned in the Sangere district of Yola.",
    "Offered in both \"Fully Finished\" and \"Carcas\" options to suit various budgets and preferences.",
    "Flexible payment structure with a 20% down payment option.",
    "Designed for a serene, residential-focused lifestyle.",
    "Strong investment potential in a developing area of Yola."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "Standard residential development" },
    { category: "Security", details: "Secure and peaceful neighborhood" },
    { category: "Infrastructure", details: "Well-planned layout in Sangere" },
    { category: "Environment", details: "Tranquil, residential, and growing" }
  ],
  nearbyFacilities: [
    { category: "Education", establishment: "Modibbo Adama University, Yola", travelTime: "10 mins" },
    { category: "Governance", establishment: "Yola North Local Government Secretariat", travelTime: "15 mins" },
    { category: "Healthcare", establishment: "Specialist Hospital Yola", travelTime: "20 mins" },
    { category: "Shopping", establishment: "Yola Main Market", travelTime: "25 mins" },
    { category: "Aviation", establishment: "Yola International Airport", travelTime: "30 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "300 SQM Plot", priceRange: "₦13,000,000 - ₦17,000,000", outlook: "High-Growth Potential" },
    { plotCategory: "450 SQM Plot", priceRange: "₦17,000,000 - ₦21,000,000", outlook: "Premium Investment" }
  ],
  plotSizes: [
    { plotType: "2 Bedroom Bungalow Plot", dimensions: "15m x 20m", area: "300 SQM", availability: "Available" },
    { plotType: "3 Bedroom Bungalow Plot", dimensions: "18m x 25m", area: "450 SQM", availability: "Available" }
  ],
  sortOrder: 999,
  createdAt: new Date().toISOString()
};


const palmNicoleData = {
  name: "Palm Nicole",
  location: "Sao Tome Road, Millennium City, Kaduna",
  state: "Kaduna",
  neighborhood: "Millennium City",
  tagline: "Strategically positioned residential development on Sao Tome Road, Millennium City.",
  description: "An FCDA-approved residential development in Millennium City, Kaduna. Offering secure living and rapid capital appreciation, it provides the perfect foundation for custom-built homes in a well-connected corridor, making home ownership accessible and highly rewarding.",
  heroImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ&sz=w1200",
  detailsImage: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ&sz=w1200",
  updatesLink: "/projects/palm-nicole",
  advisorId: "fatima-usman",
  houseTypeIds: ["black-onyx", "red-onyx"],
  highlights: [
    "FCDA Approved development status.",
    "Strategically positioned on Sao Tome Road, Millennium City, Kaduna.",
    "Located in a high-growth corridor with excellent accessibility to city hubs.",
    "Ideal environment for custom-built residential development and modern community living.",
    "Strong investment potential due to the rapid infrastructural expansion within Millennium City."
  ],
  realEstateVibe: [
    { category: "Land Title", details: "FCDA Approved" },
    { category: "Security", details: "Secure and accessible residential zone" },
    { category: "Infrastructure", details: "Well-planned layout in Millennium City" },
    { category: "Environment", details: "Serene, residential-focused, and well-connected" }
  ],
  nearbyFacilities: [
    { category: "Governance", establishment: "Kaduna State Government House", travelTime: "20 mins" },
    { category: "Healthcare", establishment: "Barau Dikko Teaching Hospital", travelTime: "25 mins" },
    { category: "Education", establishment: "Kaduna State University", travelTime: "20 mins" },
    { category: "Shopping", establishment: "Millennium City Commercial Hub", travelTime: "5 mins" },
    { category: "Aviation", establishment: "Kaduna International Airport", travelTime: "40 mins" }
  ],
  marketSnapshot: [
    { plotCategory: "450 SQM Plot", priceRange: "N1,500,000", outlook: "High-Growth Potential" }
  ],
  plotSizes: [
    { plotType: "Standard Plot", dimensions: "~18m x 25m", area: "450 SQM", availability: "Available" }
  ],
  sortOrder: 999,
  createdAt: new Date().toISOString()
};


async function run() {
  try {
    console.log('Writing HOF Community document...');
    await setDoc(doc(db, 'projects', 'hof-community'), hofCommunityData);
    console.log('✅ HOF Community successfully written.');

    console.log('Writing Kwati City, Maitama II document...');
    await setDoc(doc(db, 'projects', 'kwati-city-maitama-ii'), kwatiCityMaitamaData);
    console.log('✅ Kwati City, Maitama II successfully written.');

    console.log('Writing De Luminaria Maitama II document...');
    await setDoc(doc(db, 'projects', 'maitama-ii-estate'), deLuminariaData);
    console.log('✅ De Luminaria Maitama II successfully written.');

    console.log('Writing Whispering Pines document...');
    await setDoc(doc(db, 'projects', 'whispering-pines'), whisperingPinesData);
    console.log('✅ Whispering Pines successfully written.');

    console.log('Writing Palm Haven document...');
    await setDoc(doc(db, 'projects', 'palm-haven'), palmHavenData);
    console.log('✅ Palm Haven successfully written.');

    console.log('Writing Murg City document...');
    await setDoc(doc(db, 'projects', 'murg-city'), murgCityData);
    console.log('✅ Murg City successfully written.');

    console.log('Writing Murg City Exclusive document...');
    await setDoc(doc(db, 'projects', 'murg-city-exclusive'), murgCityExclusiveData);
    console.log('✅ Murg City Exclusive successfully written.');

    console.log('Writing Ellington Villa document...');
    await setDoc(doc(db, 'projects', 'ellington-villa'), ellingtonVillaData);
    console.log('✅ Ellington Villa successfully written.');

    console.log('Writing Nimi Hills, Guzape document...');
    await setDoc(doc(db, 'projects', 'nimi-hills-guzape'), nimiHillsGuzapeData);
    console.log('✅ Nimi Hills, Guzape successfully written.');

    console.log('Writing Usulo City, Kuje document...');
    await setDoc(doc(db, 'projects', 'usulo-city-kuje'), usuloCityKujeData);
    console.log('✅ Usulo City, Kuje successfully written.');

    console.log('Writing Lakeside View document...');
    await setDoc(doc(db, 'projects', 'lakeside-view'), lakesideViewData);
    console.log('✅ Lakeside View successfully written.');

    console.log('Writing Beverly Hills document...');
    await setDoc(doc(db, 'projects', 'beverly-hills'), beverlyHillsKujeData);
    console.log('✅ Beverly Hills successfully written.');

    console.log('Writing Fintiri Home Estate document...');
    await setDoc(doc(db, 'projects', 'fintiri-home-estate'), fintiriHomeEstateData);
    console.log('✅ Fintiri Home Estate successfully written.');

    console.log('Writing Palm Nicole document...');
    await setDoc(doc(db, 'projects', 'palm-nicole'), palmNicoleData);
    console.log('✅ Palm Nicole successfully written.');

    console.log('🎉 All updates completed successfully.');
  } catch (err) {
    console.error('Error writing/updating documents in Firestore:', err);
  }
}

run();
