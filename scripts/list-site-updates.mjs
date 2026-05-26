import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

async function run() {
  const snap = await getDocs(collection(db, 'siteUpdates'));
  console.log(`Found ${snap.size} documents in 'siteUpdates' collection:`);
  snap.docs.forEach(doc => {
    const data = doc.data();
    console.log(`- ID: ${doc.id} | Title: "${data.title}" | ProjectId: "${data.projectId}" | Image: "${data.image}" | Images: ${JSON.stringify(data.images || [])}`);
  });
}

run().catch(console.error);
