/**
 * Seed script: Populates Firestore `projects` collection with real estate data
 * matching the existing estate pages (guzape-estate, sunbrook-estate, port-harcourt-estate)
 * and the admin-created CMS projects (beverly-hills, kwati-city, etc.)
 *
 * Run with: node scripts/seed-projects.mjs
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDW5075X4k9QTJzRpkKClT48GYUgSiVpw4',
  authDomain: 'wk-smart-city-plc.firebaseapp.com',
  projectId: 'wk-smart-city-plc',
  storageBucket: 'wk-smart-city-plc.firebasestorage.app',
  messagingSenderId: '335014067510',
  appId: '1:335014067510:web:4c55a9f259133dcee04797'
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

const projects = [
  {
    id: 'beverly-hills',
    name: 'Beverly Hills District',
    tagline: 'An ultra-premium enclave nestled in the heart of Abuja, crafted for those who demand the very finest in smart residential living.',
    description: 'Beverly Hills District is Wisdom Kwati\'s flagship Abuja project — a masterclass in ultra-luxury smart estate design. Set across meticulously landscaped terrain, each plot is engineered for intelligent living with fiber connectivity, AI-powered security, and full smart home automation as standard.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    highlights: [
      'Certificate of Occupancy (C of O) Title',
      'AI-Powered Perimeter & Biometric Access',
      'Smart Grid with Full Solar Backup',
      'Fibre-to-the-Home Broadband',
      'Underground Drainage & Utility Networks',
      'Concrete Interlocked Internal Roads'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Security', description: 'Elite Gated with AI Vehicle Scanning' },
      { title: 'Infrastructure', description: 'Ultra-Premium Smart Grid' },
      { title: 'Environment', description: 'Prestigious / Serene / Exclusive' }
    ],
    nearbyFacilities: [
      { category: 'Governance', name: 'Abuja FCT Secretariat', distance: '10 mins' },
      { category: 'Healthcare', name: 'National Hospital Abuja', distance: '14 mins' },
      { category: 'Aviation', name: 'Nnamdi Azikiwe International Airport', distance: '35 mins' },
      { category: 'Shopping', name: 'Jabi Lake Mall', distance: '18 mins' },
      { category: 'Education', name: 'British Nigerian Academy', distance: '12 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Plot', value: '₦45,000,000 – ₦60,000,000', outlook: 'High-Growth Potential' },
      { metric: '1,000 SQM Plot', value: '₦85,000,000 – ₦110,000,000', outlook: 'Premium Investment' }
    ],
    plotSizes: [
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Limited Availability' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Available' }
    ],
    houseTypeIds: ['imperial-emerald', 'royal-emerald'],
    status: 'active',
    location: 'Abuja, FCT',
    state: 'Abuja',
    neighborhood: 'Kuje',
    updatesLink: '/projects/beverly-hills',
    createdAt: new Date().toISOString()
  },
  {
    id: 'kwati-city',
    name: 'Kwati City',
    tagline: 'A visionary mixed-use smart city development redefining urban living across Nigeria\'s fastest-growing residential corridors.',
    description: 'Kwati City is Wisdom Kwati\'s most ambitious project — a fully integrated smart city spanning residential, commercial, and recreational zones. Every home is equipped with renewable energy systems, smart metering, and high-speed connectivity. Designed to set the standard for 21st-century Nigerian urban development.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Mixed-use Smart City Master Plan',
      'Solar-Powered Street Lighting',
      'Fully Automated Smart Home Integration',
      'International School & Medical Centre',
      'Shopping & Commercial Districts',
      '24/7 Smart Security Command Centre'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'City Type', description: 'Mixed-Use Smart City' },
      { title: 'Infrastructure', description: 'Grade A Smart Grid & Roads' },
      { title: 'Atmosphere', description: 'Vibrant / Connected / Forward-Looking' }
    ],
    nearbyFacilities: [
      { category: 'Transport', name: 'Major Expressway Access', distance: '5 mins' },
      { category: 'Healthcare', name: 'Wisdom Kwati Medical Hub', distance: 'On-site' },
      { category: 'Education', name: 'Kwati City International School', distance: 'On-site' },
      { category: 'Recreation', name: 'City Park & Sports Complex', distance: 'On-site' }
    ],
    marketSnapshot: [
      { metric: '300 SQM Residential', value: '₦25,000,000 – ₦35,000,000', outlook: 'Strong Capital Growth' },
      { metric: '600 SQM Commercial', value: '₦70,000,000 – ₦95,000,000', outlook: 'High ROI' }
    ],
    plotSizes: [
      { size: '300 SQM', dimensions: '20m × 15m', availability: 'Available' },
      { size: '600 SQM', dimensions: '30m × 20m', availability: 'Limited' }
    ],
    houseTypeIds: ['black-onyx', 'royal-emerald'],
    status: 'active',
    location: 'Multiple States, Nigeria',
    state: 'Adamawa',
    neighborhood: 'Jimeta',
    updatesLink: '/projects/kwati-city',
    createdAt: new Date().toISOString()
  },
  {
    id: 'royal-city',
    name: 'Royal City',
    tagline: 'A majestic residential kingdom in Kuje, Abuja — where grand architecture meets intelligent smart home living.',
    description: 'Royal City offers a majestic residential experience in Kuje, Abuja. This exclusive estate features expansive detached homes, grand architectural designs, and an uncompromised level of smart security, making it a true kingdom for its residents. Each home benefits from uninterrupted power, high-speed internet, and automated living systems.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200',
    highlights: [
      'Expansive Detached Grand Villas',
      'Smart Security Perimeter with CCTV',
      'Uninterrupted Power Supply (Solar + Grid)',
      'Fully Paved Internal Roads',
      'Water Treatment & Supply System',
      'Community Clubhouse & Recreation Park'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Architecture', description: 'Grand / Palatial / Timeless' },
      { title: 'Security', description: 'Gated with 24/7 Armed Patrol' },
      { title: 'Power', description: 'Solar + Grid Hybrid — 24hr Supply' }
    ],
    nearbyFacilities: [
      { category: 'Education', name: 'Kuje Area Council Schools', distance: '8 mins' },
      { category: 'Healthcare', name: 'Kuje General Hospital', distance: '10 mins' },
      { category: 'Markets', name: 'Kuje Main Market', distance: '12 mins' },
      { category: 'Aviation', name: 'Nnamdi Azikiwe Airport', distance: '30 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Plot', value: '₦18,000,000 – ₦28,000,000', outlook: 'Growth Market' },
      { metric: '1,000 SQM Plot', value: '₦35,000,000 – ₦50,000,000', outlook: 'Steady Appreciation' }
    ],
    plotSizes: [
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Available' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Available' }
    ],
    houseTypeIds: ['imperial-emerald'],
    status: 'active',
    location: 'Kuje, Abuja FCT',
    state: 'Abuja',
    neighborhood: 'Kuje',
    updatesLink: '/projects/royal-city',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sunset-haven',
    name: 'Sunset Haven',
    tagline: 'Where golden-hour living meets smart estate perfection in Katampe Extension — Abuja\'s most serene smart address.',
    description: 'Sunset Haven is a boutique smart estate in Katampe Extension, designed for discerning buyers who value tranquility, privacy, and intelligent living. The estate\'s naturally elevated terrain offers sweeping views of Abuja\'s skyline at dusk — an experience unlike any other residential address in the FCT.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1xYCnvanRHqSsdCeheY75jtAM5QS3AS0n%26sz=w1200',
    highlights: [
      'Elevated Terrain with Panoramic Views',
      'Smart Home Ready Infrastructure',
      'Biometric & Camera Perimeter Security',
      'Fibre Broadband & 5G-Ready Towers',
      'Landscaped Parks & Walking Trails',
      'Premium Interlocked Road Network'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Setting', description: 'Elevated / Panoramic / Serene' },
      { title: 'Security', description: 'Biometric Gated Access' },
      { title: 'Infrastructure', description: 'Premium Smart-Ready Grade' }
    ],
    nearbyFacilities: [
      { category: 'Shopping', name: 'Jabi Lake Mall', distance: '20 mins' },
      { category: 'Healthcare', name: 'Garki Hospital', distance: '22 mins' },
      { category: 'Leisure', name: 'Katampe Recreation Park', distance: '5 mins' },
      { category: 'Transport', name: 'Airport Road Access', distance: '10 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM', value: '₦40,000,000 – ₦55,000,000', outlook: 'Prime Location Premium' }
    ],
    plotSizes: [
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Limited' }
    ],
    houseTypeIds: ['royal-emerald'],
    status: 'active',
    location: 'Katampe Extension, Abuja',
    state: 'Abuja',
    neighborhood: 'Katampe Extension',
    updatesLink: '/projects/sunset-haven',
    createdAt: new Date().toISOString()
  },
  {
    id: 'wisdom-kwati-smart-city',
    name: 'Wisdom Kwati Smart City',
    tagline: 'Nigeria\'s premier fully-integrated smart city — a new benchmark for 21st century urban civilisation.',
    description: 'Wisdom Kwati Smart City is the flagship of Wisdom Kwati\'s vision for Nigeria\'s future. This master-planned development integrates residential, commercial, institutional, and recreational zones into a single connected ecosystem. Powered by renewable energy and governed by intelligent infrastructure, it represents the gold standard in smart urban development.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN%26sz=w1200',
    highlights: [
      'Fully Integrated Smart City Infrastructure',
      'Renewable Energy — 100% Solar Grid',
      'AI-Powered Traffic & Security Systems',
      'Smart Metering for All Utilities',
      'World-Class Healthcare & Education Facilities',
      'High-Speed Fibre & 5G Networks Throughout'
    ],
    realEstateVibe: [
      { title: 'Development Type', description: 'Fully Integrated Smart City' },
      { title: 'Energy', description: '100% Renewable Solar-Powered Grid' },
      { title: 'Governance', description: 'Smart Management & AI Systems' },
      { title: 'Vision', description: 'Nigeria\'s Future Urban Standard' }
    ],
    nearbyFacilities: [
      { category: 'Healthcare', name: 'Wisdom Kwati Smart Hospital', distance: 'On-site' },
      { category: 'Education', name: 'WK Smart City Academy', distance: 'On-site' },
      { category: 'Recreation', name: 'Grand City Park & Amphitheatre', distance: 'On-site' },
      { category: 'Commerce', name: 'Smart City Commercial Hub', distance: 'On-site' }
    ],
    marketSnapshot: [
      { metric: 'Residential Plot (500 SQM)', value: '₦50,000,000 – ₦75,000,000', outlook: 'Landmark Investment' },
      { metric: 'Commercial Plot (1,000 SQM)', value: '₦120,000,000 – ₦180,000,000', outlook: 'Exceptional ROI' }
    ],
    plotSizes: [
      { size: '500 SQM Residential', dimensions: '25m × 20m', availability: 'Phase 1 Available' },
      { size: '1,000 SQM Commercial', dimensions: '40m × 25m', availability: 'Phase 1 Available' }
    ],
    houseTypeIds: ['imperial-emerald', 'royal-emerald', 'black-onyx'],
    status: 'active',
    location: 'Abuja, FCT & Multiple States',
    state: 'Adamawa',
    neighborhood: 'Demsa',
    updatesLink: '/projects/wisdom-kwati-smart-city',
    createdAt: new Date().toISOString()
  },
  {
    id: 'garden-eden',
    name: 'Garden Eden Estate',
    tagline: 'A lush, tranquil smart residential community where nature and technology coexist in perfect harmony.',
    description: 'Garden Eden Estate draws inspiration from nature\'s finest design principles — lush greenery, open spaces, and clean air — combined with Wisdom Kwati\'s world-class smart infrastructure. This is a community for families seeking quality of life, safety, and the comfort of modern intelligent living.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Expansive Green Parks & Gardens',
      'Smart Irrigation & Landscaping System',
      'Child-Safe Gated Community Design',
      'Solar-Powered Street Lights',
      'Smart Security with Perimeter CCTV',
      'Community Clubhouse & Playground'
    ],
    realEstateVibe: [
      { title: 'Environment', description: 'Nature-Integrated Smart Estate' },
      { title: 'Target', description: 'Family-Oriented Community' },
      { title: 'Green Space', description: '40% Landscaped Common Areas' },
      { title: 'Security', description: 'Child-Safe Smart Perimeter' }
    ],
    nearbyFacilities: [
      { category: 'Education', name: 'Primary & Secondary Schools', distance: '5 mins' },
      { category: 'Healthcare', name: 'Community Health Centre', distance: '8 mins' },
      { category: 'Markets', name: 'Local Food Market', distance: '10 mins' },
      { category: 'Recreation', name: 'Public Recreation Park', distance: '3 mins' }
    ],
    marketSnapshot: [
      { metric: '400 SQM Plot', value: '₦20,000,000 – ₦30,000,000', outlook: 'Family Market Growth' }
    ],
    plotSizes: [
      { size: '400 SQM', dimensions: '20m × 20m', availability: 'Available' },
      { size: '600 SQM', dimensions: '30m × 20m', availability: 'Available' }
    ],
    houseTypeIds: ['imperial-emerald'],
    status: 'active',
    location: 'Nigeria',
    state: 'Abuja',
    neighborhood: 'Asokoro',
    updatesLink: '/projects/garden-eden',
    createdAt: new Date().toISOString()
  },
  {
    id: 'lagos-ekpe',
    name: 'Lagos Ekpe Smart City',
    tagline: 'A transformative coastal smart city rising in Lagos State — Nigeria\'s next great economic hub.',
    description: 'Lagos Ekpe Smart City is Wisdom Kwati\'s landmark coastal development in Lagos State. Strategically positioned along the Lagos waterfront corridor, this mixed-use smart city is engineered for Nigeria\'s commercial capital, attracting both residential buyers and commercial investors seeking premium smart-city living near the coast.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    highlights: [
      'Coastal Smart City Development',
      'Waterfront Views & Marina Access',
      'Full Smart Home Automation',
      'Grade A Commercial Zones',
      'International Connectivity & Fibre Grid',
      '24/7 Smart Security Infrastructure'
    ],
    realEstateVibe: [
      { title: 'Setting', description: 'Coastal / Waterfront Smart City' },
      { title: 'Market', description: 'Lagos Premium Residential & Commercial' },
      { title: 'Infrastructure', description: 'Smart City Grade A' },
      { title: 'Appeal', description: 'Investment & End-User Balanced' }
    ],
    nearbyFacilities: [
      { category: 'Transport', name: 'Lagos Waterway & Ferry Terminal', distance: '5 mins' },
      { category: 'Aviation', name: 'Murtala Muhammed International Airport', distance: '45 mins' },
      { category: 'Commerce', name: 'Victoria Island Business District', distance: '30 mins' },
      { category: 'Healthcare', name: 'Eko Hospital', distance: '35 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Residential', value: '₦55,000,000 – ₦80,000,000', outlook: 'Lagos Premium Market' },
      { metric: '1,000 SQM Commercial', value: '₦130,000,000 – ₦200,000,000', outlook: 'High Commercial ROI' }
    ],
    plotSizes: [
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Phase 1 Open' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Limited' }
    ],
    houseTypeIds: ['royal-emerald', 'black-onyx'],
    status: 'active',
    location: 'Ekpe, Lagos State',
    state: 'Lagos',
    neighborhood: 'Epe',
    updatesLink: '/projects/lagos-ekpe',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ph-rumu-olumeni',
    name: 'Port Harcourt Rumu-Olumeni',
    tagline: 'A premium smart residential district transforming Port Harcourt\'s most sought-after expansion corridor.',
    description: 'Port Harcourt Rumu-Olumeni is Wisdom Kwati\'s flagship Rivers State development, bringing smart estate infrastructure to one of Nigeria\'s most economically dynamic cities. Strategically positioned in the Rumu-Olumeni axis, this estate combines premium architecture with intelligent home automation, offering an unmatched standard of living for Port Harcourt\'s elite.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200',
    highlights: [
      'Smart Estate Infrastructure in PH',
      'Certificate of Occupancy (C of O)',
      'Full Electrical & Solar Hybrid Power',
      'AI Security & Perimeter Access Control',
      'Sealed Interlocked Internal Roads',
      'Proximity to Oil & Gas Commercial Hub'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Location Advantage', description: 'Oil & Gas Hub Proximity' },
      { title: 'Infrastructure', description: 'Premium Smart-Ready Grade' },
      { title: 'Market', description: 'Port Harcourt Executive Residential' }
    ],
    nearbyFacilities: [
      { category: 'Commerce', name: 'Port Harcourt Business District', distance: '20 mins' },
      { category: 'Healthcare', name: 'University of Port Harcourt Teaching Hospital', distance: '15 mins' },
      { category: 'Aviation', name: 'Port Harcourt International Airport', distance: '40 mins' },
      { category: 'Shopping', name: 'Polo Avenue Mall', distance: '25 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Plot', value: '₦30,000,000 – ₦45,000,000', outlook: 'PH Premium Growth' },
      { metric: '1,000 SQM Plot', value: '₦60,000,000 – ₦85,000,000', outlook: 'Strong Investor Demand' }
    ],
    plotSizes: [
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Available' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Available' }
    ],
    houseTypeIds: ['imperial-emerald', 'black-onyx'],
    status: 'active',
    location: 'Rumu-Olumeni, Port Harcourt, Rivers State',
    state: 'Rivers',
    neighborhood: 'Rumu-Olumeni',
    updatesLink: '/projects/ph-rumu-olumeni',
    createdAt: new Date().toISOString()
  }
];

async function seed() {
  console.log(`\nSeeding ${projects.length} projects to Firestore...\n`);

  for (const project of projects) {
    const { id, ...data } = project;
    try {
      await setDoc(doc(db, 'projects', id), data, { merge: true });
      console.log(`  ✅ ${id} — "${data.name}"`);
    } catch (err) {
      console.error(`  ❌ ${id} — Failed: ${err.message}`);
    }
  }

  console.log('\n✅ All projects seeded successfully!\n');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
