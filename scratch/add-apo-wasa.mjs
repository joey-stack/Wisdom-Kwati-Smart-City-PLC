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

const apoWasaData = {
  name: 'Apo Wasa',
  tagline: "Visionary master-planned community in one of Abuja's most promising expansion corridors.",
  description: "Apo Wasa stands as a visionary project within the Wisdom Kwati Smart City portfolio, strategically located in one of Abuja's most promising expansion corridors. This FCDA-approved development is meticulously designed to offer a blend of modern infrastructure and long-term investment viability, catering to those who prioritize strategic location and sustainable growth. With its expansive landscape and clear title, it serves as a premier destination for both discerning homeowners and savvy real estate investors aiming for significant capital appreciation in the Federal Capital Territory. The estate is engineered to provide a balanced environment, combining essential urban amenities with the tranquility of a master-planned community. Its proximity to key infrastructure and arterial routes ensures excellent accessibility to the heart of the city, making Apo Wasa a cornerstone for wealth preservation and quality living in Abuja’s evolving real estate market.",
  heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU&sz=w1200',
  detailsImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU&sz=w1200',
  heroVideo: '',
  heroPoster: '',
  advisorId: 'samuel-kwati',
  highlights: [
    "FCDA Approved development status.",
    "Strategically positioned in the high-growth Apo Wasa district.",
    "Ideal environment for modern residential and commercial development.",
    "Planned community features designed for sustainable living.",
    "Strong investment potential due to strategic location within Abuja’s expansion path."
  ],
  realEstateVibe: [
    { category: 'Land Title', details: 'FCDA Approved' },
    { category: 'Security', details: 'Secure and planned gated community' },
    { category: 'Infrastructure', details: 'Integrated utility and road networks' },
    { category: 'Environment', details: 'Serene, accessible, and fast-developing' }
  ],
  nearbyFacilities: [
    { category: 'Governance', establishment: 'Apo District Secretariat', travelTime: '10 mins' },
    { category: 'Healthcare', establishment: 'Garki General Hospital', travelTime: '15 mins' },
    { category: 'Education', establishment: 'Nigerian Turkish Nile University', travelTime: '20 mins' },
    { category: 'Shopping', establishment: 'Shoprite, Apo Mall', travelTime: '12 mins' },
    { category: 'Aviation', establishment: 'Nnamdi Azikiwe International Airport', travelTime: '35 mins' }
  ],
  marketSnapshot: [
    { plotCategory: '250 SQM Plot', priceRange: '₦9,000,000', outlook: 'High-Growth Potential' },
    { plotCategory: '350 SQM Plot', priceRange: '₦12,500,000', outlook: 'Strong Appreciation Potential' },
    { plotCategory: '500 SQM Plot', priceRange: '₦18,000,000', outlook: 'Premium Investment' },
    { plotCategory: '1,000 SQM Plot', priceRange: '₦36,000,000', outlook: 'Long-Term Wealth Preservation' },
    { plotCategory: '1 Hectare Plot', priceRange: '₦200,000,000', outlook: 'Strategic Asset Holding' }
  ],
  plotSizes: [
    { plotType: 'Compact Plot', dimensions: '25m × 10m', area: '250 SQM', availability: 'Available' },
    { plotType: 'Residential Plot', dimensions: '25m × 14m', area: '350 SQM', availability: 'Available' },
    { plotType: 'Standard Plot', dimensions: '25m × 20m', area: '500 SQM', availability: 'Available' },
    { plotType: 'Large Plot', dimensions: '40m × 25m', area: '1,000 SQM', availability: 'Available' },
    { plotType: 'Commercial/Large Plot', dimensions: '100m × 100m', area: '1 Hectare', availability: 'Available' }
  ],
  houseTypeIds: ['royal-emerald', 'jade-terrace'],
  status: 'active',
  location: 'Apo Wasa, Abuja',
  state: 'Abuja',
  neighborhood: 'Apo Wasa',
  updatesLink: '/projects/apo-wasa',
  sortOrder: 16,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

async function run() {
  try {
    const docRef = doc(db, 'projects', 'apo-wasa');
    await setDoc(docRef, apoWasaData);
    console.log('Successfully added apo-wasa project document in Firestore.');
  } catch (err) {
    console.error('Error adding apo-wasa project document:', err);
  }
}

run();
