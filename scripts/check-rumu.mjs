import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envPath = join(__dirname, '..', '.env.local');
const envRaw = readFileSync(envPath, 'utf8');
const env = Object.fromEntries(
  envRaw.split('\n')
    .filter(l => l.trim() && !l.startsWith('#'))
    .map(l => {
      const [key, ...rest] = l.split('=');
      return [key.trim(), rest.join('=').trim().replace(/^["']|["']$/g, '')];
    })
);

const firebaseConfig = {
  apiKey:            env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

async function checkProject() {
  const snap = await getDocs(collection(db, 'projects'));
  console.log('--- FINDING RUMU OLUMENI ---');
  snap.forEach(docSnap => {
    const data = docSnap.data();
    if (docSnap.id.includes('rumu') || (data.name && data.name.toLowerCase().includes('rumu'))) {
      console.log(`Document ID: ${docSnap.id}`);
      console.log(`Name: ${data.name}`);
      console.log(`Hero Image: ${data.heroImage}`);
      console.log(`Details Image: ${data.detailsImage}`);
      console.log(`Image (legacy): ${data.image}`);
      console.log(`Location: ${data.location}`);
      console.log('------------------------------------');
    }
  });
  process.exit(0);
}

checkProject().catch(err => {
  console.error(err);
  process.exit(1);
});
