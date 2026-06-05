import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

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

const newDescription = "Apo Wasa is a visionary, FCDA-approved master-planned community strategically located in Abuja's high-growth expansion corridor. Combining modern infrastructure with serene surroundings, the estate offers exceptional accessibility and premier investment potential, making it the perfect choice for discerning homeowners and savvy real estate investors.";

async function run() {
  try {
    const docRef = doc(db, 'projects', 'apo-wasa');
    await updateDoc(docRef, {
      description: newDescription
    });
    console.log('Successfully updated apo-wasa description in Firestore.');
  } catch (err) {
    console.error('Error updating apo-wasa description:', err);
  }
}

run();
