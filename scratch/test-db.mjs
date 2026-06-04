import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

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
    const docRef = doc(db, 'projects', 'abara-etche-estate');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Successfully connected and read document:', docSnap.data().name);
    } else {
      console.log('Document not found');
    }
  } catch (err) {
    console.error('Error connecting to Firestore:', err);
  }
}

run();
