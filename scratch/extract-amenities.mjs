import { collection, getDocs } from 'firebase/firestore';
import { db } from '../src/lib/firebase.js';

async function extract() {
  try {
    const snap = await getDocs(collection(db, 'houseTypes'));
    const unique = new Map();
    snap.forEach(doc => {
      const data = doc.data();
      const amenities = data.amenities || [];
      amenities.forEach(a => {
        const name = typeof a === 'string' ? a : a.name;
        const icon = typeof a === 'string' ? 'icon-default' : (a.iconClass || 'icon-default');
        if (name) {
          unique.set(name.trim(), icon);
        }
      });
    });

    console.log('UNIQUE AMENITIES FOUND:');
    for (const [name, icon] of unique.entries()) {
      console.log(JSON.stringify({ name, iconClass: icon }));
    }
  } catch (err) {
    console.error(err);
  }
}

extract();
