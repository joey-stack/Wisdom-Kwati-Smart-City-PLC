import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDW5075X4k9QTJzRpkKClT48GYUgSiVpw4",
  authDomain: "wk-smart-city-plc.firebaseapp.com",
  projectId: "wk-smart-city-plc",
  storageBucket: "wk-smart-city-plc.firebasestorage.app",
  messagingSenderId: "335014067510",
  appId: "1:335014067510:web:4c55a9f259133dcee04797",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  const slug = 'what-c-of-o-really-means';
  console.log('Querying for slug:', slug);
  try {
    const q = query(collection(db, 'blogs'), where('slug', '==', slug), limit(1));
    const querySnap = await getDocs(q);
    console.log('Query empty?', querySnap.empty);
    if (!querySnap.empty) {
      console.log('Found doc:', querySnap.docs[0].id, querySnap.docs[0].data());
    } else {
      console.log('No documents matched!');
    }
  } catch (err) {
    console.error('Error querying:', err);
  }
  process.exit(0);
}

test();
