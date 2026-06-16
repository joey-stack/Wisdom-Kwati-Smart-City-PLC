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

const deletedList = [
  'garden-eden',
  'kwati-farms-resort',
  'kwati-residence-asokoro',
  'royal-city-kuje-phase-2',
  'wisdom-kwati-smart-city-karshi'
];

async function run() {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    console.log(`Found ${querySnapshot.size} total projects in Firestore:\n`);
    
    let hasDeleted = false;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      
      if (deletedList.includes(id)) {
        console.error(`❌ REGRESSION: Deleted project still in Firestore: ${id}`);
        hasDeleted = true;
      } else {
        console.log(`- ${id} (${data.name})`);
        console.log(`  heroImage:    ${data.heroImage}`);
        console.log(`  detailsImage: ${data.detailsImage}`);
      }
    });

    if (!hasDeleted) {
      console.log('\n🎉 SUCCESS: No deleted projects were found in Firestore!');
    } else {
      console.error('\n❌ FAILURE: Some deleted projects are still in Firestore.');
    }
  } catch (err) {
    console.error('Error running verification:', err);
  }
}

run();
