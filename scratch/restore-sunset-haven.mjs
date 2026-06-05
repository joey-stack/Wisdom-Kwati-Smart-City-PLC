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

const sunsetHavenData = {
  name: 'Sunset Haven',
  tagline: "Where golden-hour living meets smart estate perfection in Katampe Extension — Abuja's most serene smart address.",
  description: "Sunset Haven is a boutique smart estate in Katampe Extension (with Phase 1 situated on Dawaki Plot C10 104 and 105), designed for discerning buyers who value tranquility, privacy, and intelligent living. Mapped on a registered C of O title, it features smart-ready infrastructure including central water treatment plants, solar street lighting, and 24-hour manned gatehouses as standard.",
  heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1xYCnvanRHqSsdCeheY75jtAM5QS3AS0n&sz=w1200',
  detailsImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1xYCnvanRHqSsdCeheY75jtAM5QS3AS0n&sz=w1200',
  heroVideo: '',
  heroPoster: '',
  advisorId: 'samuel-kwati',
  highlights: [
    'Elevated Terrain with Panoramic Views',
    'Smart Home Ready Infrastructure',
    'Biometric & Camera Perimeter Security',
    'Fibre Broadband & 5G-Ready Towers',
    'Landscaped Parks & Walking Trails',
    'Premium Interlocked Road Network'
  ],
  realEstateVibe: [
    { category: 'Land Title', details: 'Certificate of Occupancy (C of O)' },
    { category: 'Setting', details: 'Elevated / Panoramic / Serene' },
    { category: 'Security', details: 'Biometric Gated Access' },
    { category: 'Infrastructure', details: 'Premium Smart-Ready Grade' }
  ],
  nearbyFacilities: [
    { category: 'Shopping', establishment: 'Jabi Lake Mall', travelTime: '20 mins' },
    { category: 'Healthcare', establishment: 'Garki Hospital', travelTime: '22 mins' },
    { category: 'Leisure', establishment: 'Katampe Recreation Park', travelTime: '5 mins' },
    { category: 'Transport', establishment: 'Airport Road Access', travelTime: '10 mins' }
  ],
  marketSnapshot: [
    { plotCategory: '500 SQM Plot', priceRange: '₦40,000,000 – ₦55,000,000', outlook: 'Prime Location Premium' }
  ],
  plotSizes: [
    { plotType: 'Standard Plot', dimensions: '20m × 10m', area: '200 SQM', availability: 'Available' },
    { plotType: 'Standard Plot', dimensions: '32.5m × 20m', area: '650 SQM', availability: 'Limited' },
    { plotType: 'Standard Plot', dimensions: '37.5m × 20m', area: '750 SQM', availability: 'Limited' }
  ],
  houseTypeIds: ['royal-emerald', 'jade-terrace'],
  status: 'active',
  location: 'Katampe Extension, Abuja',
  state: 'Abuja',
  neighborhood: 'Katampe Extension',
  updatesLink: '/projects/sunset-haven',
  sortOrder: 15,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

async function run() {
  try {
    const docRef = doc(db, 'projects', 'sunset-haven');
    await setDoc(docRef, sunsetHavenData);
    console.log('Successfully restored sunset-haven project document in Firestore.');
  } catch (err) {
    console.error('Error restoring sunset-haven project document:', err);
  }
}

run();
