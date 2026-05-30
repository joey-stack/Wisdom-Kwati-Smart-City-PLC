import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  try {
    const q = query(collection(db, 'careers'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    console.log(`Ordered query found ${snap.docs.length} docs`);
    
    const q2 = query(collection(db, 'careers'));
    const snap2 = await getDocs(q2);
    console.log(`Unordered query found ${snap2.docs.length} docs`);
    
    if (snap2.docs.length > 0) {
        snap2.docs.forEach(d => console.log(d.id, "=>", d.data()));
    }
  } catch (e) {
    console.log('Error:', e.message);
  }
}
test();
