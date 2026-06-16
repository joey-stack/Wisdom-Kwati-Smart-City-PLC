import { initializeApp } from 'firebase/app';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

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

const projectsToDelete = [
  'garden-eden',
  'kwati-farms-resort',
  'kwati-residence-asokoro',
  'royal-city-kuje-phase-2',
  'wisdom-kwati-smart-city-karshi'
];

async function run() {
  try {
    for (const projId of projectsToDelete) {
      console.log(`Deleting project: ${projId}...`);
      await deleteDoc(doc(db, 'projects', projId));
      console.log(`✅ Deleted ${projId}`);
    }
    console.log('🎉 Done deleting unwanted projects.');
  } catch (err) {
    console.error('Error deleting projects:', err);
  }
}

run();
