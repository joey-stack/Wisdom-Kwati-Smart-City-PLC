/**
 * Migration script: Populates existing Firestore projects with resolved `state` and `neighborhood` fields.
 *
 * Run with: node scripts/migrate-projects-neighborhoods.mjs
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
  console.log('Fetching all projects from Firestore...');
  const snap = await getDocs(collection(db, 'projects'));
  
  console.log(`Found ${snap.size} projects. Starting migration...`);
  
  for (const document of snap.docs) {
    const d = document.data();
    const id = document.id.toLowerCase();
    
    // Resolve State
    let resolvedState = 'Abuja'; 
    const locLower = (d.location || '').toLowerCase();
    const stateFieldLower = (d.state || '').toLowerCase();

    if (
      stateFieldLower.includes('abuja') ||
      stateFieldLower.includes('fct') ||
      locLower.includes('abuja') ||
      locLower.includes('fct') ||
      id === 'beverly-hills' ||
      id === 'royal-city' ||
      id === 'sunset-haven' ||
      id === 'garden-eden'
    ) {
      resolvedState = 'Abuja';
    } else if (stateFieldLower.includes('lagos') || locLower.includes('lagos') || id.includes('lagos')) {
      resolvedState = 'Lagos';
    } else if (stateFieldLower.includes('kaduna') || locLower.includes('kaduna')) {
      resolvedState = 'Kaduna';
    } else if (
      stateFieldLower.includes('rivers') ||
      stateFieldLower.includes('ph') ||
      stateFieldLower.includes('port') ||
      locLower.includes('rivers') ||
      locLower.includes('ph') ||
      locLower.includes('port')
    ) {
      resolvedState = 'Rivers';
    } else if (
      stateFieldLower.includes('yola') ||
      stateFieldLower.includes('adamawa') ||
      locLower.includes('yola') ||
      locLower.includes('adamawa') ||
      id === 'kwati-city' ||
      id === 'wisdom-kwati-smart-city'
    ) {
      resolvedState = 'Adamawa';
    }

    // Resolve Neighborhood
    let resolvedNeighborhood = 'General';
    if (id === 'beverly-hills') resolvedNeighborhood = 'Kuje';
    else if (id === 'garden-eden') resolvedNeighborhood = 'Asokoro';
    else if (id === 'kwati-city') resolvedNeighborhood = 'Jimeta';
    else if (id === 'wisdom-kwati-smart-city') resolvedNeighborhood = 'Demsa';
    else {
      const parts = (d.location || '').split(',');
      if (parts.length > 0) {
        const first = parts[0].trim();
        if (
          first.toLowerCase() !== 'abuja' &&
          first.toLowerCase() !== 'lagos' &&
          first.toLowerCase() !== 'nigeria' &&
          first.toLowerCase() !== 'multiple states'
        ) {
          resolvedNeighborhood = first;
        }
      }
    }
    if (resolvedNeighborhood === 'General') {
      const nameLower = (d.name || '').toLowerCase();
      if (nameLower.includes('katampe')) resolvedNeighborhood = 'Katampe Extension';
      else if (nameLower.includes('karsana')) resolvedNeighborhood = 'Karsana';
      else if (nameLower.includes('mabushi')) resolvedNeighborhood = 'Mabushi';
      else if (nameLower.includes('guzape')) resolvedNeighborhood = 'Guzape';
      else if (nameLower.includes('maitama')) resolvedNeighborhood = 'Maitama';
      else if (nameLower.includes('rumu-olumeni') || nameLower.includes('port court')) resolvedNeighborhood = 'Rumu-Olumeni';
      else if (nameLower.includes('ekpe') || nameLower.includes('epe')) resolvedNeighborhood = 'Epe';
    }

    // Write back state and neighborhood fields to document, preserving existing ones
    const updatePayload = {
      state: d.state || resolvedState,
      neighborhood: d.neighborhood || resolvedNeighborhood
    };

    await updateDoc(doc(db, 'projects', document.id), updatePayload);
    console.log(`  ✅ ${document.id} -> State: "${updatePayload.state}", Neighborhood: "${updatePayload.neighborhood}"`);
  }
  
  console.log('\nMigration completed successfully!\n');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Fatal migration error:', err);
  process.exit(1);
});
