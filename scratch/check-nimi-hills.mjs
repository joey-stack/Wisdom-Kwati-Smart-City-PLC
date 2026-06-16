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
    console.log(`Checking projects:`);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      if (id.includes('nimi') || data.name?.toLowerCase().includes('nimi')) {
        console.log(`MATCHED ID: ${id}`);
        console.log(JSON.stringify(data, null, 2));
      }
    });
  } catch (err) {
    console.error('Error running check:', err);
  }
}

run();
