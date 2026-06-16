import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

async function run() {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    console.log(`Found ${querySnapshot.size} projects in Firestore:\n`);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(`=== ID: ${doc.id} (Name: ${data.name}) ===`);
      console.log('marketSnapshot:', JSON.stringify(data.marketSnapshot, null, 2));
      console.log('plotSizes:', JSON.stringify(data.plotSizes, null, 2));
      console.log('\n');
    });
  } catch (err) {
    console.error('Error listing projects:', err);
  }
}

run();
