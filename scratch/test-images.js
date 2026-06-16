import fetch from 'node-fetch';

const ids = [
  { name: 'Palm Haven', id: '1eMbw99C0kjQqbNZoyN4rieCduY_uNnuZ' },
  { name: 'Nimi Hills', id: '1K9BgIgXG_xT9slAfRl32icd95C1bmoOz' },
  { name: 'Ellington Villa', id: '1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU' }
];

async function check() {
  for (const item of ids) {
    const url = `https://drive.google.com/uc?export=view&id=${item.id}`;
    const weservUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
    
    try {
      const res = await fetch(url);
      console.log(`[Google Drive] ${item.name} (${item.id}): status = ${res.status}`);
      
      const resWeserv = await fetch(weservUrl);
      console.log(`[Weserv] ${item.name}: status = ${resWeserv.status}`);
    } catch (err) {
      console.error(`Error checking ${item.name}:`, err.message);
    }
  }
}

check();
