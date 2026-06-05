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
  tagline: "Refined residential living in the prestigious Usuma district of Katampe Extension, Abuja.",
  description: "Sunset Haven, located in the prestigious Usuma district of Katampe Extension, Abuja, stands as a paragon of refined residential living. This FCDA-approved master-planned community is meticulously designed to offer a blend of modern architectural elegance and serene environmental harmony. With its prime location, the estate provides an exceptional opportunity for homeowners and investors to secure a prestigious address in one of Abuja’s most sought-after and rapidly appreciating residential corridors.The development is engineered to provide a lifestyle of comfort and exclusivity, benefiting from proximity to major business districts and high-end infrastructure. As a strategic investment, Sunset Haven is positioned to deliver substantial long-term capital appreciation, making it an essential cornerstone for those looking to preserve wealth and secure a high-quality living environment within the heart of the Federal Capital Territory.",
  heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1xYCnvanRHqSsdCeheY75jtAM5QS3AS0n&sz=w1200',
  detailsImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1xYCnvanRHqSsdCeheY75jtAM5QS3AS0n&sz=w1200',
  heroVideo: '',
  heroPoster: '',
  advisorId: 'samuel-kwati',
  highlights: [
    "FCDA Approved development status.",
    "Strategically positioned in the high-growth Usuma district of Katampe Extension.",
    "Ideal environment for luxury residential and family-oriented living.",
    "Strong investment appeal with proximity to central Abuja business districts.",
    "Excellent accessibility to major arterial roads connecting the city center."
  ],
  realEstateVibe: [
    { category: 'Land Title', details: 'FCDA Approved' },
    { category: 'Security', details: 'Elite gated community with 24/7 surveillance' },
    { category: 'Infrastructure', details: 'Planned residential layout with high-end utilities' },
    { category: 'Environment', details: 'Serene, prestigious, and lush' }
  ],
  nearbyFacilities: [
    { category: 'Governance', establishment: 'Federal Secretariat', travelTime: '15 mins' },
    { category: 'Healthcare', establishment: 'Maitama District Hospital', travelTime: '12 mins' },
    { category: 'Education', establishment: 'Lead British International School', travelTime: '10 mins' },
    { category: 'Shopping', establishment: 'Next Cash and Carry', travelTime: '15 mins' },
    { category: 'Aviation', establishment: 'Nnamdi Azikiwe International Airport', travelTime: '30 mins' }
  ],
  marketSnapshot: [
    { plotCategory: '500 SQM Plot', priceRange: '₦35,000,000', outlook: 'Premium Investment' },
    { plotCategory: '800 SQM Plot', priceRange: '₦55,000,000', outlook: 'Strong Appreciation Potential' },
    { plotCategory: '1,000 SQM Plot', priceRange: '₦70,000,000', outlook: 'Long-Term Wealth Preservation' }
  ],
  plotSizes: [
    { plotType: 'Standard Plot', dimensions: '25m × 20m', area: '500 SQM', availability: 'Available' },
    { plotType: 'Standard Plot', dimensions: '40m × 20m', area: '800 SQM', availability: 'Available' },
    { plotType: 'Standard Plot', dimensions: '40m × 25m', area: '1,000 SQM', availability: 'Available' }
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
    console.log('Successfully updated sunset-haven document in Firestore with new content.');
  } catch (err) {
    console.error('Error updating sunset-haven document:', err);
  }
}

run();
