const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Look for service account key in current folder
const serviceAccountPath = path.join(process.cwd(), 'service-account.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('\n❌ ERROR: service-account.json not found in the root directory!');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// 1. Projects
const STATIC_PROJECTS = [
  { id: "ellington-villa", name: "Ellington Villa", location: "Mabushi, Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200", state: "abuja", neighborhood: "mabushi", estate: "ellington villa" },
  { id: "nimi-hills", name: "Nimi Hills", location: "Guzape, Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP%26sz=w1200", state: "abuja", neighborhood: "guzape", estate: "nimi hills" },
  { id: "palm-haven", name: "Palm Haven", location: "Apo Tafyi, Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1eMbw99C0kjQqbNZoyN4rieCduY_uNnuZ%26sz=w1200", state: "abuja", neighborhood: "apo tafyi", estate: "palm haven" },
  { id: "kwati-city", name: "Kwati City", location: "Maitama II, Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1y65H-RgWhwbiZ0ZlJKay6Qj4bYtHZL6D%26sz=w1200", state: "abuja", neighborhood: "maitama ii", estate: "kwati city" },
  { id: "royal-city", name: "Royal City", location: "Kuje, Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200", state: "abuja", neighborhood: "kuje", estate: "royal city" },
  { id: "beverly-hills", name: "Beverly Hills", location: "Kuje, Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1SMA1L09Z3xg6nV7hIpSs8BAOM70IHb8s%26sz=w1200", state: "abuja", neighborhood: "kuje", estate: "beverly hills" },
  { id: "lakeside-view", name: "Lakeside View", location: "Kuje, Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200", state: "abuja", neighborhood: "kuje", estate: "lakeside view" },
  { id: "whispering-pines", name: "Whispering Pines", location: "Karsana, Abuja", image: "https://lh3.googleusercontent.com/u/0/d/1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN", state: "abuja", neighborhood: "karsana", estate: "whispering pines" },
  { id: "wisdom-kwati-smart-city", name: "Wisdom Kwati Smart City", location: "Karshi, Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1s5vsiqmbnMMTONiebu1vG2r_Yvcfd6KL%26sz=w1200", state: "abuja", neighborhood: "karshi", estate: "wisdom kwati smart city" },
  { id: "the-hof-community", name: "The HOF Community", location: "Life Camp, Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1K9BgIgXG_xT9slAfRl32icd95C1bmoOz%26sz=w1200", state: "abuja", neighborhood: "life camp", estate: "the hof community" },
  { id: "fintiri-extension", name: "Fintiri Extension", location: "Yola, Adamawa", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1KGLdqvAPmRLFCi_vYeKe8nJ0yms7idqb%26sz=w1200", state: "adamawa", neighborhood: "yola", estate: "fintiri extension" },
  { id: "murg-city", name: "Murg City", location: "Katampe Ext., Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1hxVqzWX7fTw6I2a2KMNgz53N9JAmgzO4%26sz=w1200", state: "abuja", neighborhood: "katampe ext.", estate: "murg city" },
  { id: "sunset-haven", name: "Sunset Haven", location: "Katampe Ext., Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1dP8dOZmR2Fg7mUkXUDiByr06e64h50Lh%26sz=w1200", state: "abuja", neighborhood: "katampe ext.", estate: "sunset haven" },
  { id: "usulo-city", name: "Usulo City", location: "Kuje, Abuja", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1W78PkCZEKS_smIJHqajeKCdtYev7yGpZ%26sz=w1200", state: "abuja", neighborhood: "kuje", estate: "usulo city" },
  { id: "lagos-ekpe", name: "Lagos Ekpe", location: "Epe, Lagos", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=11vBQAjvTsw6D_nR3Llikz7MLeCMUWJ34%26sz=w1200", state: "lagos", neighborhood: "epe", estate: "lagos ekpe" },
  { id: "sunbrook-estate", name: "Sunbrook Estate", location: "Yola, Adamawa", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1U1e8GB0DuhRemMH1LBYizaFHB9Gx-uLb%26sz=w1200", state: "adamawa", neighborhood: "yola", estate: "sunbrook estate" },
  { id: "garden-eden", name: "Garden Eden Estate", location: "Port Harcourt, Rivers", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1UlrWanL0sHutgi7BJQqadeXWXY9G3jLm%26sz=w1200", state: "rivers", neighborhood: "port harcourt", estate: "garden eden estate" },
  { id: "ph-rumu-olumeni", name: "PH Rumu-olumeni", location: "Port Harcourt, Rivers", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1U5Q-8bVvFGhPl8TJXrMk-s1EhexRPW7c%26sz=w1200", state: "rivers", neighborhood: "port harcourt", estate: "ph rumu-olumeni" }
];

// 2. House Types
const STATIC_HOUSE_TYPES = [
  { id: "imperial-emerald", name: "The Imperial Emerald", location: "Premium Class • 7BR Fully Detached", type: "Emerald Class Villa", estate: "maitama ii", neighborhood: "maitama ii", propType: "detached", beds: 7, baths: 8, size: "12,500 SQ FT", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200", classType: "Emerald Class Villa" },
  { id: "royal-emerald", name: "The Royal Emerald", location: "Premium Class • 5BR Fully Detached", type: "Emerald Class Villa", estate: "guzape ii", neighborhood: "guzape ii", propType: "detached", beds: 5, baths: 6, size: "8,200 SQ FT", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200", classType: "Emerald Class Villa" },
  { id: "star-sapphire", name: "The Star Sapphire", location: "Smart Class • 4BR Pent-House", type: "Sapphire Class Penthouse", estate: "katampe extension", neighborhood: "katampe extension", propType: "duplex", beds: 4, baths: 5, size: "5,500 SQ FT", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200", classType: "Sapphire Class Penthouse" },
  { id: "blue-sapphire", name: "The Blue Sapphire", location: "Smart Class • 4BR Fully Detached", type: "Sapphire Class Duplex", estate: "karsana", neighborhood: "karsana", propType: "duplex", beds: 4, baths: 4, size: "4,200 SQ FT", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200", classType: "Sapphire Class Duplex" },
  { id: "white-sapphire", name: "The White Sapphire", location: "Smart Class • 4BR Semi-Detached", type: "Sapphire Class Duplex", estate: "mabushi", neighborhood: "mabushi", propType: "duplex", beds: 4, baths: 4, size: "3,800 SQ FT", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200", classType: "Sapphire Class Duplex" },
  { id: "black-onyx", name: "The Black Onyx", location: "Smart Class • 3BR Bungalow", type: "Onyx Class Bungalow", estate: "sangere numa", neighborhood: "adamawa", propType: "bungalow", beds: 3, baths: 3, size: "2,400 SQ FT", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1xDix9g0as7V5dV9U_uggWnkr_kdl5SpX%26sz=w1200", classType: "Onyx Class Bungalow" },
  { id: "red-onyx", name: "The Red Onyx", location: "Smart Class • 2BR Bungalow", type: "Onyx Class Bungalow", estate: "sangere numa", neighborhood: "adamawa", propType: "bungalow", beds: 2, baths: 2, size: "1,800 SQ FT", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EvTJIVwYq5NcbH33A3opCXBuNFyWNS92%26sz=w1200", classType: "Onyx Class Bungalow" },
  { id: "silver-pearl", name: "The Silver Pearl", location: "Luxury Class • 3BR Apartment", type: "Pearl Class Apartment", estate: "life camp", neighborhood: "life camp", propType: "flat", beds: 3, baths: 3, size: "2,200 SQ FT", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1cBO3as-XL4ecKLz_xur4TxlVn1eqbi4D%26sz=w1200", classType: "Pearl Class Apartment" },
  { id: "white-pearl", name: "The White Pearl", location: "Luxury Class • 2BR Apartment", type: "Pearl Class Apartment", estate: "life camp", neighborhood: "life camp", propType: "flat", beds: 2, baths: 2, size: "1,600 SQ FT", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1YpYFPwZQUCf0k9tWJp13Y1kYzKe7npmJ%26sz=w1200", classType: "Pearl Class Apartment" }
];

// 3. Blogs
const STATIC_BLOGS = [
  { title: "First-time homebuyer's guide — everything you need to know before...", category: "GUIDE", date: "DEC 9, 2024", author: "JAMES MILLER", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200" },
  { title: "How to prepare your home before selling — simple steps that make a big impact", category: "GUIDE", date: "DEC 9, 2024", author: "JAMES MILLER", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200" },
  { title: "How to rent out your property safely and successfully — a complete owner's guide", category: "GUIDE", date: "DEC 10, 2024", author: "JAMES MILLER", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200" },
  { title: "The future of smart homes — what's trending in home tech for 2025", category: "NEWS", date: "DEC 11, 2024", author: "RYAN MILFORD", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200" },
  { title: "Real estate trends 2025 — what's shaping the property market this year", category: "NEWS", date: "JAN 3, 2025", author: "JAMES MILLER", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200" },
  { title: "How AI is changing the way homes are bought and sold", category: "NEWS", date: "DEC 5, 2024", author: "RYAN MILFORD", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200" },
  { title: "Rising property hotspots in 2025 — where smart buyers are heading next", category: "NEWS", date: "DEC 5, 2024", author: "RYAN MILFORD", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200" },
  { title: "Smart tips for real estate investing in 2025 — building wealth with confidence", category: "GUIDE", date: "DEC 5, 2024", author: "JAMES MILLER", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200" },
  { title: "7 simple upgrades that make your home feel luxurious", category: "LIFESTYLE", date: "FEB 5, 2025", author: "RYAN MILFORD", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200" },
  { title: "Clever ways to make small spaces feel brighter, airier, and bigger", category: "LIFESTYLE", date: "JAN 20, 2025", author: "JAMES MILLER", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200" },
  { title: "Weekend home refresh ideas that make your space feel brand new", category: "LIFESTYLE", date: "SEP 24, 2024", author: "JAMES MILLER", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200" },
  { title: "Transform your home for the new season — simple refresh ideas for every style", category: "LIFESTYLE", date: "DEC 5, 2024", author: "JAMES MILLER", image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200" }
];

const getSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

async function seedData() {
  try {
    console.log('Seeding projects...');
    for (const proj of STATIC_PROJECTS) {
      const docRef = db.collection('projects').doc(proj.id);
      await docRef.set({
        name: proj.name,
        tagline: proj.location,
        state: proj.state,
        neighborhood: proj.neighborhood,
        heroImage: proj.image,
        detailsImage: proj.image,
        description: 'Premium smart estate built for the modern lifestyle.',
        createdAt: new Date().toISOString()
      }, { merge: true });
    }
    console.log(`✅ Seeded ${STATIC_PROJECTS.length} projects`);

    console.log('Seeding house types...');
    for (const ht of STATIC_HOUSE_TYPES) {
      const docRef = db.collection('houseTypes').doc(ht.id);
      await docRef.set({
        name: ht.name,
        classType: ht.classType,
        tagline: ht.location,
        beds: String(ht.beds),
        baths: String(ht.baths),
        size: ht.size,
        images: [ht.image],
        createdAt: new Date().toISOString()
      }, { merge: true });
    }
    console.log(`✅ Seeded ${STATIC_HOUSE_TYPES.length} house types`);

    console.log('Seeding blogs...');
    for (const blog of STATIC_BLOGS) {
      const slug = getSlug(blog.title);
      const docRef = db.collection('blogs').doc(slug);
      await docRef.set({
        title: blog.title,
        category: blog.category,
        date: blog.date,
        author: blog.author,
        image: blog.image,
        createdAt: new Date().toISOString()
      }, { merge: true });
    }
    console.log(`✅ Seeded ${STATIC_BLOGS.length} blogs`);

    console.log('\n🎉 All dummy data seeded successfully into Firestore!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR seeding data:', error);
    process.exit(1);
  }
}

seedData();
