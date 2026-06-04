/**
 * Seed script: Populates Firestore `projects` collection with real estate data
 * matching the existing estate pages and the company's profile portfolio.
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
    houseTypeIds: [],
    status: 'active',
    location: 'Abuja, FCT',
    state: 'Abuja',
    neighborhood: 'Kuje',
    updatesLink: '/projects/beverly-hills',
    createdAt: new Date().toISOString()

  },
  {
    id: 'lagos-ekpe',
    name: 'Lagos Ekpe Smart City',
    tagline: 'A transformative coastal smart city rising in Lagos State — Nigeria\'s next great economic hub.',
    description: 'Lagos Ekpe Smart City is Wisdom Kwati\'s landmark coastal development in Lagos State (situated in Epe). Strategically positioned along the Lagos waterfront corridor, this mixed-use smart city is engineered for Nigeria\'s commercial capital, attracting both residential buyers and commercial investors seeking premium smart-city living near the coast.',
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
      { size: '300 SQM', dimensions: '20m × 15m', availability: 'Available' },
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Phase 1 Open' },
      { size: '600 SQM', dimensions: '30m × 20m', availability: 'Limited' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Limited' }
    ],
    houseTypeIds: [],
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
      { size: '150 SQM', dimensions: '15m × 10m', availability: 'Available' },
      { size: '250 SQM', dimensions: '25m × 10m', availability: 'Available' },
      { size: '350 SQM', dimensions: '25m × 14m', availability: 'Available' },
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Available' },
      { size: '800 SQM', dimensions: '40m × 20m', availability: 'Available' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Available' },
      { size: '2,000 SQM', dimensions: '50m × 40m', availability: 'Limited' }
    ],
    houseTypeIds: [],
    status: 'active',
    location: 'Rumu-Olumeni, Port Harcourt, Rivers State',
    state: 'Rivers',
    neighborhood: 'Rumu-Olumeni',
    updatesLink: '/projects/ph-rumu-olumeni',
    createdAt: new Date().toISOString()
  },
  {
    id: 'whispering-pines',
    name: 'Whispering Pines',
    tagline: 'A quiet smart sanctuary in Karsana, engineered with comprehensive infrastructure and security.',
    description: 'Whispering Pines in Karsana, Abuja is designed for families who refuse to compromise on a functional life. Backed by a registered C of O title, the estate operates central water treatment, solar-powered street lighting, and 24-hour smart security. It bridges the gap between natural tranquility and full urban connectivity, offering terraced homes and blocks of flats.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Certificate of Occupancy (C of O) Title',
      'On-Site Central Water Treatment Plant',
      'Solar-Powered Street Lighting Grid',
      'Smart Security CCTV Perimeter Monitoring',
      '24-Hour Manned Estate Gatehouse',
      'Concrete Paved Internal Road Network'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Water', description: 'Central Water Treatment Plant' },
      { title: 'Power', description: 'Solar Street Lights Grid' },
      { title: 'Security', description: '24/7 CCTV & Manned Gatehouse' }
    ],
    nearbyFacilities: [
      { category: 'Governance', name: 'Abuja FCT Secretariat', distance: '15 mins' },
      { category: 'Healthcare', name: 'Gwarinpa General Hospital', distance: '10 mins' },
      { category: 'Leisure', name: 'Jabi Lake Mall', distance: '12 mins' }
    ],
    marketSnapshot: [
      { metric: '200 SQM Plot', value: '₦18,000,000 – ₦25,000,000', outlook: 'High-Growth Potential' },
      { metric: '500 SQM Plot', value: '₦40,000,000 – ₦55,000,000', outlook: 'Premium Investment' }
    ],
    plotSizes: [
      { size: '200 SQM', dimensions: '20m × 10m', availability: 'Available' },
      { size: '225 SQM', dimensions: '22.5m × 10m', availability: 'Available' },
      { size: '350 SQM', dimensions: '25m × 14m', availability: 'Available' },
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Available' },
      { size: '650 SQM', dimensions: '32.5m × 20m', availability: 'Limited' },
      { size: '750 SQM', dimensions: '37.5m × 20m', availability: 'Limited' }
    ],
    houseTypeIds: ['blue-sapphire', 'star-sapphire', 'white-pearl', 'silver-pearl', 'jade-terrace', 'royal-emerald', 'imperial-emerald'],
    status: 'active',
    location: 'Karsana, Abuja',
    state: 'Abuja',
    neighborhood: 'Karsana',
    updatesLink: '/projects/whispering-pines',
    createdAt: new Date().toISOString()
  },
  {
    id: 'maitama-ii-estate',
    name: 'Maitama II Smart Extension',
    tagline: 'A secure smart extension in Maitama II, providing advanced utilities and palatial layouts.',
    description: 'Maitama II extends the premium Abuja portfolio, offering plots from 200 to 1,000 SQM. It supports smart terrace duplexes, semi-detached duplexes, and palatial 7-bedroom luxury villas connected to a central utility grid, water treatment plants, and smart security monitoring.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Maitama II High-Growth Corridor',
      'Premium Smart Grid Utilities',
      'C of O Mapped Residential Plots',
      'Solar-Powered Street Lights',
      '24/7 Smart Guard Patrol'
    ],
    realEstateVibe: [
      { title: 'Setting', description: 'Premium Extension Hub' },
      { title: 'Utilities', description: 'Central Water & Solar street Lights' },
      { title: 'Security', description: '24/7 Guardhouse & CCTV' },
      { title: 'Title', description: 'Certificate of Occupancy (C of O)' }
    ],
    nearbyFacilities: [
      { category: 'Governance', name: 'Maitama Diplomatic Quarter', distance: '10 mins' },
      { category: 'Healthcare', name: 'Maitama District Hospital', distance: '8 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Plot', value: '₦70,000,000 – ₦90,000,000', outlook: 'Premium Appreciation' },
      { metric: '1,000 SQM Plot', value: '₦130,000,000 – ₦160,000,000', outlook: 'Ultra-Premium Tier' }
    ],
    plotSizes: [
      { size: '200 SQM', dimensions: '20m × 10m', availability: 'Available' },
      { size: '250 SQM', dimensions: '25m × 10m', availability: 'Available' },
      { size: '450 SQM', dimensions: '22.5m × 20m', availability: 'Available' },
      { size: '650 SQM', dimensions: '32.5m × 20m', availability: 'Available' },
      { size: '750 SQM', dimensions: '37.5m × 20m', availability: 'Limited' },
      { size: '800 SQM', dimensions: '40m × 20m', availability: 'Limited' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Limited' }
    ],
    houseTypeIds: [],
    status: 'active',
    location: 'Maitama II, Abuja',
    state: 'Abuja',
    neighborhood: 'Maitama',
    updatesLink: '/projects/maitama-ii-estate',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sangere-numa',
    name: 'Sangere Numa',
    tagline: 'Northern innovation meets tradition in Yola\'s premier smart bungalow community.',
    description: 'Sangere Numa is Wisdom Kwati\'s landmark estate in Adamawa State, built to provide modern smart living in the North. Spanning 300 to 850 SQM plots, it features 2 and 3-bedroom bungalows equipped with solar-powered street lights, central water treatment, and gated security patrols.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    highlights: [
      'Yola\'s Premier Smart Bungalow Estate',
      '300 to 850 SQM Serviced Plots',
      'Solar-Powered Street Lighting',
      'Water Treatment Systems On-site',
      '24/7 Guarded Manned Gatehouse'
    ],
    realEstateVibe: [
      { title: 'Region', description: 'Yola Smart Residential' },
      { title: 'Density', description: 'Low-Density Bungalow Layout' },
      { title: 'Utilities', description: 'On-site Water treatment & Solar' },
      { title: 'Security', description: 'Manned gatehouse Patrols' }
    ],
    nearbyFacilities: [
      { category: 'Education', name: 'Federal University of Technology Yola', distance: '10 mins' },
      { category: 'Aviation', name: 'Yola International Airport', distance: '15 mins' },
      { category: 'Healthcare', name: 'Federal Medical Centre Yola', distance: '12 mins' }
    ],
    marketSnapshot: [
      { metric: '300 SQM Plot + Bungalow', value: '₦15,000,000 – ₦22,000,000', outlook: 'Steady Regional Demand' },
      { metric: '450 SQM Plot + Bungalow', value: '₦22,000,000 – ₦30,000,000', outlook: 'Premium Family Growth' }
    ],
    plotSizes: [
      { size: '300 SQM', dimensions: '20m × 15m', availability: 'Available' },
      { size: '450 SQM', dimensions: '22.5m × 20m', availability: 'Available' },
      { size: '850 SQM', dimensions: '34m × 25m', availability: 'Limited' }
    ],
    houseTypeIds: [],
    status: 'active',
    location: 'Sangere Numa, Yola, Adamawa State',
    state: 'Adamawa',
    neighborhood: 'Jimeta',
    updatesLink: '/projects/sangere-numa',
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
