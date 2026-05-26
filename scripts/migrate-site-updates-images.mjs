/**
 * Migration script: Upgrades existing `siteUpdates` documents in Firestore.
 * If the `images` array field is missing, it populates it with `[image]` if `image` is present.
 *
 * Run with: node scripts/migrate-site-updates-images.mjs
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

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

async function migrate() {
  console.log('Querying siteUpdates collection for migration...');
  const snap = await getDocs(collection(db, 'siteUpdates'));
  console.log(`Found ${snap.size} site update documents.`);
  
  let migratedCount = 0;
  for (const d of snap.docs) {
    const data = d.data();
    if (!data.images) {
      const images = data.image ? [data.image] : [];
      await updateDoc(doc(db, 'siteUpdates', d.id), {
        images: images
      });
      console.log(`  ✅ Migrated doc ${d.id} ("${data.title}") with images:`, images);
      migratedCount++;
    } else {
      console.log(`  ℹ️ Doc ${d.id} already has images array:`, data.images);
    }
  }
  console.log(`\nMigration completed! Successfully migrated ${migratedCount} documents.`);
  process.exit(0);
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
