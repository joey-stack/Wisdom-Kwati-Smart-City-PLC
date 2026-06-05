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

async function run() {
  try {
    const docRef = doc(db, 'projects', 'nimi-hills-guzape');
    await updateDoc(docRef, {
      heroVideo: '/assets/videos/nimi-hills-guzape.mp4'
    });
    console.log('Successfully updated nimi-hills-guzape heroVideo to /assets/videos/nimi-hills-guzape.mp4');
  } catch (err) {
    console.error('Error updating Firestore document:', err);
  }
}

run();
