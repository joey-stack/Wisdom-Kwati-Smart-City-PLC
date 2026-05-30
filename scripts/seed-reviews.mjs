/**
 * Seed script: Populates the `reviews` collection in Firestore with the default homepage reviews.
 * Run with: node scripts/seed-reviews.mjs
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

const reviewsData = [
  {
    id: 'chief-dr-chidi-okafor',
    name: 'Chief Dr. Chidi Okafor',
    designation: 'HOME OWNER, ABUJA',
    avatar: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU&sz=w1200',
    quote: 'Correcting a continent, one smart home at a time. WKSC is building the infrastructure we\'ve always deserved.',
    body: '',
    bgImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL&sz=w1200',
    createdAt: new Date(Date.now() - 40000000).toISOString()
  },
  {
    id: 'the-adewale-family',
    name: 'The Adewale Family',
    designation: 'EPE SMART CITY, LAGOS',
    avatar: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1O3Z8A1oKWR8Dhd6b-42nbpVkHv4Zpzm0&sz=w1200',
    quote: 'I realized I didn\'t have to leave to arrive.',
    body: 'I used to think my best future lay outside Nigeria, but working with WKSC changed that. Their smart ecosystem in Lagos Epe mirrors the quality I saw in the UK, but with the warmth of home.',
    bgImage: '',
    createdAt: new Date(Date.now() - 30000000).toISOString()
  },
  {
    id: 'engr-tunde-olayinka',
    name: 'Engr. Tunde Olayinka',
    designation: 'PORT HARCOURT',
    avatar: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EphZaDQ0d9sHKHve7TNmmsr_pFGEjzne&sz=w1200',
    quote: 'Finally, a smart ecosystem that actually works. The IoT integration in Port Harcourt is world-class.',
    body: '',
    bgImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EphZaDQ0d9sHKHve7TNmmsr_pFGEjzne&sz=w1200',
    createdAt: new Date(Date.now() - 20000000).toISOString()
  },
  {
    id: 'amina-bello',
    name: 'Amina Bello',
    designation: 'HOME OWNER, YOLA',
    avatar: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1xYCnvanRHqSsdCeheY75jtAM5QS3AS0n&sz=w1200',
    quote: 'Bringing the future of healthy living to Adamawa.',
    body: 'I thought modern living would take decades to reach Yola, but WKSC delivered. From the solar grids to the water treatment plants, every detail ensures my family is safe and ready for the future.',
    bgImage: '',
    createdAt: new Date(Date.now() - 10000000).toISOString()
  }
];

async function seed() {
  console.log('Seeding reviews collection in Firestore...');
  
  for (const review of reviewsData) {
    await setDoc(doc(db, 'reviews', review.id), review);
    console.log(`  ✅ Seeded review: "${review.name}" with id: "${review.id}"`);
  }
  
  console.log('\nReviews collection seeded successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
