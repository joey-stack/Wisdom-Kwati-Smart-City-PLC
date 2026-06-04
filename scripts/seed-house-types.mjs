/**
 * Seed script: Populates Firestore houseTypes with rich dummy data
 * matching the house-template.page.js design exactly.
 *
 * Run with: node scripts/seed-house-types.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------- Load .env.local ----------
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

console.log('🔥 Connecting to Firebase project:', firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ---------- House Types Data ----------
const HOUSE_TYPES = [

  // ─── 1. THE IMPERIAL EMERALD ───────────────────────────────────────────────
  {
    id: 'imperial-emerald',
    classType:   'The Imperial Emerald',
    tagline:     '7 Bedroom Mansion',
    price:       '₦2,850,000,000',
    description: 'The Imperial Emerald is the crown jewel of luxury living by Wisdom Kwati Smart City Plc. This magnificent seven-bedroom mansion, set on an expansive 1,000 sqm plot, is designed for homeowners who demand prestige, space, and unparalleled comfort. Showcasing grand architecture, exquisite finishes, and cutting-edge smart technology, The Imperial Emerald offers an elevated lifestyle where elegance meets innovation. From its impressive entrance and expansive living spaces to its premium recreational and entertainment features, every detail has been carefully crafted to deliver a world-class living experience. Whether featured within any of our smart city sites, The Imperial Emerald stands as a symbol of success, sophistication, and timeless luxury.',
    beds: 7, baths: 7,
    size: '12,500 SQ FT', lotSize: '1,000 SQM',
    floors: 3, parking: '6 Cars + EV Charging',
    builtIn: 'Q2 2026 — Completion Stage',
    propertyId: 'WK-IE-EMR-001',
    brochureUrl: 'https://drive.google.com/file/d/1O2RgTr-EYUK3OeId5-vmUfS56dxypP-U/view?usp=drive_link',
    images: [
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200',
    ],
    amenities: [
      { name: 'Seven spacious en-suite bedrooms', iconClass: 'icon-bed' },
      { name: 'Fully fitted luxury kitchen', iconClass: 'icon-kitchen' },
      { name: 'Secondary service kitchen', iconClass: 'icon-kitchen' },
      { name: 'Multiple living and lounge areas', iconClass: 'icon-lounge' },
      { name: 'Private family lounge', iconClass: 'icon-lounge' },
      { name: 'Home office/study', iconClass: 'icon-study' },
      { name: 'Smart home automation system', iconClass: 'icon-smart' },
      { name: 'Solar power system', iconClass: 'icon-solar' },
      { name: 'Private cinema room', iconClass: 'icon-cinema' },
      { name: 'Gym/fitness room', iconClass: 'icon-gym' },
      { name: 'Walk-in closets', iconClass: 'icon-closet' },
      { name: 'Private balconies', iconClass: 'icon-balcony' },
      { name: 'Guest suite', iconClass: 'icon-bed' },
      { name: 'Guest toilet', iconClass: 'icon-bath' },
      { name: 'Swimming pool', iconClass: 'icon-pool' },
      { name: 'Landscaped private garden', iconClass: 'icon-garden' },
      { name: "Boys' Quarters (BQ)", iconClass: 'icon-service' },
      { name: 'Ample parking space', iconClass: 'icon-parking' },
      { name: '24/7 security and access control', iconClass: 'icon-security' },
      { name: 'Reliable water supply', iconClass: 'icon-water' },
      { name: 'Well-paved roads and drainage', iconClass: 'icon-road' },
      { name: 'Street lighting', iconClass: 'icon-lighting' },
      { name: 'High-speed internet infrastructure', iconClass: 'icon-internet' },
      { name: 'Recreational and green spaces', iconClass: 'icon-garden' }
    ],
    interiorSpecs: [
      { metric: 'Bedrooms',    details: '7 bedrooms (including Guest Bedroom and Primary Bedroom)' },
      { metric: 'Bathrooms',   details: '7 En-suite bathrooms + W/C' },
      { metric: 'Living Room', details: 'Grand living room area (45.2m²)' },
      { metric: 'Kitchen',     details: 'Expansive kitchen space (20m²)' },
      { metric: 'Additional Spaces', details: 'Dining area, Home Cinema, Gym, Private Study, Anteroom, and Lobby' }
    ],
    exteriorSpecs: [
      { metric: 'Architecture',    details: 'Monumental villa design with defined front and side elevations' },
      { metric: 'Garden / Outdoor', details: 'Features expansive terrace spaces on the pent floor' },
      { metric: 'Visual Orientation', details: 'Grand facade with modern glass and structured architectural detailing' },
      { metric: 'Circulation',     details: 'Grand central stair hall connecting all floors' }
    ],
    floorPlan: [
      { floor: 'Ground Floor', room: 'Living Room', area: '45.2' },
      { floor: 'Ground Floor', room: 'Kitchen', area: '20' },
      { floor: 'Ground Floor', room: 'Dining', area: '17.8' },
      { floor: 'Ground Floor', room: 'Guest Bedroom', area: '12' },
      { floor: 'Ground Floor', room: 'Gym', area: '22.1' },
      { floor: 'First Floor', room: 'Bedroom', area: '20' },
      { floor: 'First Floor', room: 'Bedroom', area: '15' },
      { floor: 'First Floor', room: 'Bedroom', area: '14' },
      { floor: 'First Floor', room: 'Family Sitting Room', area: '18' },
      { floor: 'First Floor', room: 'Private Study', area: '22' },
      { floor: 'Pent Floor', room: 'Primary Bedroom', area: '42' },
      { floor: 'Pent Floor', room: 'Primary Lounge', area: '22' },
      { floor: 'Pent Floor', room: 'Cinema', area: '17' }
    ],
    createdAt: new Date().toISOString(),
  },

  // ─── 2. THE ROYAL EMERALD ──────────────────────────────────────────────────
  {
    id: 'royal-emerald',
    classType:   'The Royal Emerald',
    tagline:     '5 Bedroom Fully Detached Duplex',
    price:       '₦1,650,000,000',
    description: 'The Royal Emerald is a distinguished five-bedroom fully detached duplex that embodies elegance, comfort, and smart living. Situated on a generous 500 sqm plot, this beautifully designed residence offers the perfect balance of luxury and functionality for modern families. Featuring spacious interiors, contemporary architecture, premium finishes, and intelligent home technology, The Royal Emerald delivers an exceptional living experience. Whether located within any of our smart city sites, this remarkable home reflects the quality, innovation, and excellence that define every Wisdom Kwati Smart City development.',
    beds: 5, baths: 5,
    size: '8,200 SQ FT', lotSize: '500 SQM',
    floors: 3, parking: '4 Cars + EV Charging',
    builtIn: 'Q3 2026 — Pre-Delivery',
    propertyId: 'WK-RE-EMR-002',
    brochureUrl: 'https://drive.google.com/file/d/1O2RgTr-EYUK3OeId5-vmUfS56dxypP-U/view?usp=drive_link',
    images: [
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1xDix9g0as7V5dV9U_uggWnkr_kdl5SpX%26sz=w1200',
    ],
    amenities: [
      { name: 'Five spacious en-suite bedrooms', iconClass: 'icon-bed' },
      { name: 'Fully fitted modern kitchen', iconClass: 'icon-kitchen' },
      { name: 'Spacious living and dining areas', iconClass: 'icon-lounge' },
      { name: 'Family lounge', iconClass: 'icon-lounge' },
      { name: 'Smart home automation system', iconClass: 'icon-smart' },
      { name: 'Solar power system', iconClass: 'icon-solar' },
      { name: 'Guest toilet', iconClass: 'icon-bath' },
      { name: 'Walk-in closet in the master bedroom', iconClass: 'icon-closet' },
      { name: 'Private balconies', iconClass: 'icon-balcony' },
      { name: 'Home office/study', iconClass: 'icon-study' },
      { name: 'Landscaped private garden', iconClass: 'icon-garden' },
      { name: 'Ample parking space', iconClass: 'icon-parking' },
      { name: "Boys' Quarters (BQ)", iconClass: 'icon-service' },
      { name: '24/7 security and access control', iconClass: 'icon-security' },
      { name: 'Reliable water supply', iconClass: 'icon-water' },
      { name: 'Well-paved roads and drainage', iconClass: 'icon-road' },
      { name: 'Street lighting', iconClass: 'icon-lighting' },
      { name: 'High-speed internet infrastructure', iconClass: 'icon-internet' },
      { name: 'Recreational and green spaces', iconClass: 'icon-garden' },
      { name: 'Estate management services', iconClass: 'icon-service' }
    ],
    interiorSpecs: [
      { metric: 'Bedrooms',    details: '5 bedrooms (including Primary Bedroom and BQ)' },
      { metric: 'Bathrooms',   details: '5 En-suite bathrooms + W/C' },
      { metric: 'Living Room', details: 'Grand living room area (34.3m²)' },
      { metric: 'Kitchen',     details: 'Expansive kitchen space (28.7m²)' },
      { metric: 'Additional Spaces', details: 'Dining area, Family Lounge, Anteroom, Lobby, and Service Quarters' }
    ],
    exteriorSpecs: [
      { metric: 'Architecture',    details: 'Modern fully detached duplex design with defined front and side elevations' },
      { metric: 'Garden / Outdoor', details: 'Includes extensive balcony and terrace spaces across floors' },
      { metric: 'Visual Orientation', details: 'Striking multi-level facade with contemporary architectural detailing' },
      { metric: 'Circulation',     details: 'Dedicated internal stairwell connecting ground, first, and pent floors' }
    ],
    floorPlan: [
      { floor: 'Ground Floor', room: 'Living Room', area: '34.3' },
      { floor: 'Ground Floor', room: 'Kitchen', area: '28.7' },
      { floor: 'Ground Floor', room: 'Dining', area: '8.9' },
      { floor: 'Ground Floor', room: 'Anteroom', area: '8.8' },
      { floor: 'Ground Floor', room: 'BQ', area: '12' },
      { floor: 'First Floor', room: 'Family Lounge', area: '18.5' },
      { floor: 'First Floor', room: 'Bedroom', area: '20.2' },
      { floor: 'First Floor', room: 'Bedroom', area: '20.8' },
      { floor: 'First Floor', room: 'Bedroom', area: '17.4' },
      { floor: 'Pent Floor', room: 'Primary Bedroom', area: '35.1' },
      { floor: 'Pent Floor', room: 'Bedroom', area: '27.4' }
    ],
    createdAt: new Date().toISOString(),
  },

  // ─── 3. THE STAR SAPPHIRE ─────────────────────────────────────────────────
  {
    id: 'star-sapphire',
    classType:   'The Star Sapphire',
    tagline:     '4 Bedroom Fully Detached Classic Villa',
    price:       '₦780,000,000',
    description: 'The Star Sapphire is a beautifully designed four-bedroom fully detached classic villa that blends timeless elegance with modern smart living. Set on a well-planned 350 sqm plot, this residence offers a refined lifestyle experience tailored for families who appreciate comfort, space efficiency, and architectural sophistication. With its classic villa styling, well-structured layout, and premium finishes, The Star Sapphire delivers a warm and luxurious home environment while maintaining functionality and modern convenience. It stands as a distinguished option within any Wisdom Kwati Smart City development, offering residents both prestige and practicality.',
    beds: 4, baths: 4,
    size: '5,500 SQ FT', lotSize: '350 SQM',
    floors: 2, parking: '3 Cars',
    builtIn: 'Q4 2026 — Off-Plan',
    propertyId: 'WK-SS-SAP-003',
    brochureUrl: 'https://drive.google.com/file/d/1O2RgTr-EYUK3OeId5-vmUfS56dxypP-U/view?usp=drive_link',
    images: [
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200',
    ],
    amenities: [
      { name: 'Four spacious en-suite bedrooms', iconClass: 'icon-bed' },
      { name: 'Fully fitted modern kitchen', iconClass: 'icon-kitchen' },
      { name: 'Family lounge', iconClass: 'icon-lounge' },
      { name: 'Spacious living and dining areas', iconClass: 'icon-lounge' },
      { name: 'Smart home automation system', iconClass: 'icon-smart' },
      { name: 'Solar power system', iconClass: 'icon-solar' },
      { name: 'Private garden', iconClass: 'icon-garden' },
      { name: 'Guest toilet', iconClass: 'icon-bath' },
      { name: 'Private balconies', iconClass: 'icon-balcony' },
      { name: 'Walk-in closets', iconClass: 'icon-closet' },
      { name: 'Ample parking space', iconClass: 'icon-parking' },
      { name: '24/7 security', iconClass: 'icon-security' },
      { name: 'Reliable water supply', iconClass: 'icon-water' },
      { name: 'Well-paved roads and drainage', iconClass: 'icon-road' },
      { name: 'Street lighting', iconClass: 'icon-lighting' },
      { name: 'High-speed internet infrastructure', iconClass: 'icon-internet' },
      { name: 'Recreational and green spaces', iconClass: 'icon-garden' }
    ],
    interiorSpecs: [
      { metric: 'Bedrooms', details: '4 bedrooms (including 1 Primary Bedroom)' },
      { metric: 'Bathrooms', details: '4 En-suite bathrooms + W/C' },
      { metric: 'Living Room', details: 'Impressive grand living room area (36m²)' },
      { metric: 'Kitchen', details: 'Expansive kitchen space (18m²)' },
      { metric: 'Additional Spaces', details: 'Dining area, lobby, store, anteroom, and terrace' }
    ],
    exteriorSpecs: [
      { metric: 'Architecture', details: 'Contemporary fully detached duplex design with front and side views' },
      { metric: 'Garden / Outdoor', details: 'Includes terrace, veranda, and patio spaces' },
      { metric: 'Visual Orientation', details: 'Modern facade with defined front and side elevations' },
      { metric: 'Circulation', details: 'Dedicated internal stairway system' }
    ],
    floorPlan: [
      { floor: 'Ground Floor', room: 'Living Room', area: '36' },
      { floor: 'Ground Floor', room: 'Kitchen', area: '18' },
      { floor: 'Ground Floor', room: 'Dining', area: '10' },
      { floor: 'Ground Floor', room: 'Bedroom', area: '16' },
      { floor: 'Ground Floor', room: 'Ante Room', area: '6.4' },
      { floor: 'Ground Floor', room: 'Patio', area: '6.4' },
      { floor: 'First Floor', room: 'Primary Bedroom', area: '25' },
      { floor: 'First Floor', room: 'Bedroom', area: '12' },
      { floor: 'First Floor', room: 'Bedroom', area: '18' },
      { floor: 'First Floor', room: 'Living Room', area: '12.8' },
      { floor: 'First Floor', room: 'Terrace', area: '6.7' }
    ],
    createdAt: new Date().toISOString(),
  },

  // ─── 6. THE WHITE PEARL ────────────────────────────────────────────────────
  {
    id: 'white-pearl',
    classType:   'The White Pearl',
    tagline:     '2 Bedroom Block of Flats',
    price:       '₦120,000,000',
    description: 'The White Pearl is a thoughtfully designed two-bedroom block of flats that delivers comfort, simplicity, and modern smart living by Wisdom Kwati Smart City Plc. Sitting on a shared 650 sqm plot, this residential prototype is tailored for young professionals, small families, and investors seeking affordable quality within a secure and well-planned environment. With efficient layouts, contemporary finishes, and smart infrastructure integration, The White Pearl maximizes space while maintaining a clean, elegant, and functional living experience.',
    beds: 2, baths: 2,
    size: '2,400 SQ FT', lotSize: 'Shared 650 SQM',
    floors: 1, parking: '2 Cars',
    builtIn: 'Q1 2026 — Ready',
    propertyId: 'WK-WP-PRL-006',
    brochureUrl: 'https://drive.google.com/file/d/1O2RgTr-EYUK3OeId5-vmUfS56dxypP-U/view?usp=drive_link',
    images: [
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1xDix9g0as7V5dV9U_uggWnkr_kdl5SpX%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    ],
    amenities: [
      { name: 'Two-bedroom apartment units (multiple flats)', iconClass: 'icon-bed' },
      { name: 'Spacious living and dining areas', iconClass: 'icon-lounge' },
      { name: 'Fully fitted modern kitchens', iconClass: 'icon-kitchen' },
      { name: 'En-suite master bedrooms', iconClass: 'icon-bed' },
      { name: 'Private balconies', iconClass: 'icon-balcony' },
      { name: 'Smart home readiness', iconClass: 'icon-smart' },
      { name: 'Solar power support system', iconClass: 'icon-solar' },
      { name: 'Ample parking space', iconClass: 'icon-parking' },
      { name: '24/7 security and access control', iconClass: 'icon-security' },
      { name: 'Reliable water supply', iconClass: 'icon-water' },
      { name: 'Well-paved roads and drainage', iconClass: 'icon-road' },
      { name: 'Street lighting', iconClass: 'icon-lighting' },
      { name: 'High-speed internet infrastructure', iconClass: 'icon-internet' },
      { name: 'Recreational and green spaces', iconClass: 'icon-garden' },
      { name: 'Estate management services', iconClass: 'icon-service' }
    ],
    interiorSpecs: [
      { metric: 'Bedrooms', details: '2 bedrooms' },
      { metric: 'Bathrooms', details: '2 En-suite bathrooms + W/C' },
      { metric: 'Living Room', details: 'Spacious living room area (20m²)' },
      { metric: 'Kitchen', details: 'Dedicated kitchen space (7.2m²)' },
      { metric: 'Additional Spaces', details: 'Dining area, lobby, and sit-out/patio' }
    ],
    exteriorSpecs: [
      { metric: 'Architecture', details: 'Contemporary block of flats design' },
      { metric: 'Garden / Outdoor', details: 'Includes terrace, sit-out, and patio spaces' },
      { metric: 'Visual Orientation', details: 'Multi-level facade with defined front and side views' },
      { metric: 'Circulation', details: 'Central Stair Hall serving all levels' }
    ],
    createdAt: new Date().toISOString()
  },

  // ─── 7. THE SILVER PEARL ───────────────────────────────────────────────────
  {
    id: 'silver-pearl',
    classType:   'The Silver Pearl',
    tagline:     '3 Bedroom Block of Flats',
    price:       '$4,500,000',
    description: 'The Silver Pearl is a modern three-bedroom block of flats designed for comfortable and affordable urban living by Wisdom Kwati Smart City. Set on a shared 750 sqm plot, this well-planned residential building combines efficiency, functionality, and contemporary design to meet the needs of small families, young professionals, and investors. Each apartment is thoughtfully designed with spacious interiors, quality finishes, and smart living features that enhance convenience and security. The Silver Pearl offers a serene community lifestyle while maintaining easy access to modern estate infrastructure and services.',
    beds: 3, baths: 3,
    size: '2,200 sq ft', lotSize: 'Shared 750 SQM',
    floors: 1, parking: '2',
    builtIn: '2024',
    propertyId: 'WKSC-PL-001',
    brochureUrl: 'https://drive.google.com/file/d/1O2RgTr-EYUK3OeId5-vmUfS56dxypP-U/view?usp=drive_link',
    images: [
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1cBO3as-XL4ecKLz_xur4TxlVn1eqbi4D%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1YpYFPwZQUCf0k9tWJp13Y1kYzKe7npmJ%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200'
    ],
    amenities: [
      { name: 'Three-bedroom apartments (multiple units)', iconClass: 'icon-bed' },
      { name: 'Spacious living and dining areas', iconClass: 'icon-lounge' },
      { name: 'Fully fitted modern kitchens', iconClass: 'icon-kitchen' },
      { name: 'En-suite master bedrooms', iconClass: 'icon-bed' },
      { name: 'Family lounge', iconClass: 'icon-lounge' },
      { name: 'Smart home readiness', iconClass: 'icon-smart' },
      { name: 'Solar power support', iconClass: 'icon-solar' },
      { name: 'Private balconies', iconClass: 'icon-balcony' },
      { name: 'Ample parking space', iconClass: 'icon-parking' },
      { name: '24/7 security and access control', iconClass: 'icon-security' },
      { name: 'Reliable water supply', iconClass: 'icon-water' },
      { name: 'Well-paved roads and drainage', iconClass: 'icon-road' },
      { name: 'Street lighting', iconClass: 'icon-lighting' },
      { name: 'High-speed internet infrastructure', iconClass: 'icon-internet' },
      { name: 'Recreational and green spaces', iconClass: 'icon-garden' },
      { name: 'Estate management services', iconClass: 'icon-service' }
    ],
    interiorSpecs: [
      { metric: 'Bedrooms', details: '3 bedrooms (including 1 Primary Bedroom)' },
      { metric: 'Bathrooms', details: '3 En-suite bathrooms + W/C' },
      { metric: 'Living Room', details: 'Generous living room area (21.2m²)' },
      { metric: 'Kitchen', details: 'Dedicated kitchen space (12m²)' },
      { metric: 'Additional Spaces', details: 'Dining area, lobby, store, and patio' }
    ],
    exteriorSpecs: [
      { metric: 'Architecture', details: 'Modern block of flats design with front and side views' },
      { metric: 'Garden / Outdoor', details: 'Includes veranda and patio spaces' },
      { metric: 'Visual Orientation', details: 'Multi-level facade with defined front and side views' },
      { metric: 'Circulation', details: 'Central Stair Hall serving all levels' }
    ],
    createdAt: new Date().toISOString()
  },

  // ─── 8. THE BLUE SAPPHIRE ──────────────────────────────────────────────────
  {
    id: 'blue-sapphire',
    classType:   'The Blue Sapphire',
    tagline:     '4 Bedroom Fully Detached Duplex',
    price:       '$8,500,000',
    description: 'The Blue Sapphire is a premium four-bedroom fully detached duplex thoughtfully designed to deliver luxury, comfort, and smart living within a Wisdom Kwati Smart City development. Sitting on a generous 350 sqm plot, this elegant home combines contemporary architecture with spacious interiors, making it ideal for families, professionals, and investors seeking a modern lifestyle. From its expansive living areas to its smart home features and energy-efficient design, every detail has been carefully crafted to provide convenience, security, and long-term value. The Blue Sapphire offers residents the opportunity to enjoy a serene, well-planned environment while benefiting from the innovation and quality that define every Wisdom Kwati Smart City community.',
    beds: 4, baths: 4,
    size: '4,200 sq ft', lotSize: '350 SQM',
    floors: 2, parking: '2',
    builtIn: '2024',
    propertyId: 'WKSC-SA-001',
    brochureUrl: 'https://drive.google.com/file/d/1O2RgTr-EYUK3OeId5-vmUfS56dxypP-U/view?usp=drive_link',
    images: [
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200'
    ],
    amenities: [
      { name: 'Four spacious en-suite bedrooms', iconClass: 'icon-bed' },
      { name: 'Fully fitted modern kitchen', iconClass: 'icon-kitchen' },
      { name: 'Elegant living and dining areas', iconClass: 'icon-lounge' },
      { name: 'Family lounge', iconClass: 'icon-lounge' },
      { name: 'Smart home automation system', iconClass: 'icon-smart' },
      { name: 'Solar power system', iconClass: 'icon-solar' },
      { name: 'Guest toilet', iconClass: 'icon-bath' },
      { name: 'Walk-in closet in master bedroom', iconClass: 'icon-closet' },
      { name: 'Private balconies', iconClass: 'icon-balcony' },
      { name: 'Study/home office', iconClass: 'icon-study' },
      { name: 'Landscaped mini garden', iconClass: 'icon-garden' },
      { name: 'Ample parking space', iconClass: 'icon-parking' },
      { name: '24/7 security and access control', iconClass: 'icon-security' },
      { name: 'Reliable water supply', iconClass: 'icon-water' },
      { name: 'Well-paved roads and drainage', iconClass: 'icon-road' },
      { name: 'Street lighting', iconClass: 'icon-lighting' },
      { name: 'High-speed internet infrastructure', iconClass: 'icon-internet' },
      { name: 'Recreational and green spaces', iconClass: 'icon-garden' },
      { name: 'Estate management services', iconClass: 'icon-service' }
    ],
    interiorSpecs: [
      { metric: 'Bedrooms', details: '4 bedrooms (including 1 Primary Bedroom)' },
      { metric: 'Bathrooms', details: '4 En-suite bathrooms + W/C' },
      { metric: 'Living Room', details: 'Grand living room area (22.5m²)' },
      { metric: 'Kitchen', details: 'Spacious kitchen space (8.4m²)' },
      { metric: 'Additional Spaces', details: 'Dining area, Family Lounge, Anteroom, and Lobby' }
    ],
    exteriorSpecs: [
      { metric: 'Architecture', details: 'Contemporary semi-detached duplex design with front and side views' },
      { metric: 'Garden / Outdoor', details: 'Includes veranda, patio, and balcony spaces' },
      { metric: 'Visual Orientation', details: 'Modern facade with defined front and side elevations' },
      { metric: 'Circulation', details: 'Dedicated stairways serving all levels' }
    ],
    createdAt: new Date().toISOString()
  },

  // ─── 9. THE JADE TERRACE ───────────────────────────────────────────────────
  {
    id: 'jade-terrace',
    classType:   'The Jade Terrace',
    tagline:     '4 Bedroom Terrace Duplex',
    price:       '₦185,000,000',
    description: 'The Jade Terrace is a stylish four-bedroom terrace duplex designed for modern families and professionals seeking comfort, affordability, and smart living. Situated on a 200 sqm plot, this contemporary home maximizes space and functionality without compromising on elegance. Featuring modern architecture, well-planned interiors, and smart technology integration, The Jade Terrace offers a perfect blend of convenience, security, and sophistication. Whether for first-time homeowners, growing families, or investors, this beautifully designed residence delivers exceptional value and a vibrant lifestyle across any Wisdom Kwati Smart City site.',
    beds: 4, baths: 4,
    size: '3,200 SQ FT', lotSize: '200 SQM',
    floors: 3, parking: '2 Cars',
    builtIn: 'Q2 2026 — Under Construction',
    propertyId: 'WK-JT-JAD-007',
    brochureUrl: 'https://drive.google.com/file/d/1O2RgTr-EYUK3OeId5-vmUfS56dxypP-U/view?usp=drive_link',
    images: [
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200'
    ],
    amenities: [
      { name: 'Four spacious en-suite bedrooms', iconClass: 'icon-bed' },
      { name: 'Fully fitted modern kitchen', iconClass: 'icon-kitchen' },
      { name: 'Spacious living and dining area', iconClass: 'icon-lounge' },
      { name: 'Family lounge', iconClass: 'icon-lounge' },
      { name: 'Smart home automation system', iconClass: 'icon-smart' },
      { name: 'Solar power system', iconClass: 'icon-solar' },
      { name: 'Guest toilet', iconClass: 'icon-bath' },
      { name: 'Private balcony', iconClass: 'icon-balcony' },
      { name: 'Walk-in closet in the master bedroom', iconClass: 'icon-closet' },
      { name: 'Dedicated parking space', iconClass: 'icon-parking' },
      { name: '24/7 security and access control', iconClass: 'icon-security' },
      { name: 'Reliable water supply', iconClass: 'icon-water' },
      { name: 'Well-paved roads and drainage', iconClass: 'icon-road' },
      { name: 'Street lighting', iconClass: 'icon-lighting' },
      { name: 'High-speed internet infrastructure', iconClass: 'icon-internet' },
      { name: 'Recreational and green spaces', iconClass: 'icon-garden' },
      { name: "Children's play area", iconClass: 'icon-service' },
      { name: 'Estate management services', iconClass: 'icon-service' }
    ],
    interiorSpecs: [
      { metric: 'Bedrooms', details: "4 bedrooms (including Madam's Bedroom and Primary Bedroom)" },
      { metric: 'Bathrooms', details: '4 En-suite bathrooms + W/C' },
      { metric: 'Living Room', details: 'Grand open-plan living and dining area (31.3m²)' },
      { metric: 'Kitchen', details: 'Modern kitchen with adjoining pantry (15m²)' },
      { metric: 'Additional Spaces', details: 'Private Lounge, Study, Anteroom, and Service Quarters' }
    ],
    exteriorSpecs: [
      { metric: 'Architecture', details: 'Elegant multi-level terrace design with defined front and side elevations' },
      { metric: 'Garden / Outdoor', details: 'Features a variety of private balconies and terraces across all floors' },
      { metric: 'Visual Orientation', details: 'Sophisticated row-terrace design with consistent front/side aesthetic' },
      { metric: 'Circulation', details: 'Central internal stairways connecting all floors' }
    ],
    floorPlan: [
      { floor: 'Ground Floor', room: 'Living Room & Dining', area: '31.3' },
      { floor: 'Ground Floor', room: 'Kitchen', area: '15' },
      { floor: 'Ground Floor', room: 'Service Quarters', area: '10.9' },
      { floor: 'Ground Floor', room: 'Anteroom', area: '6.4' },
      { floor: 'Ground Floor', room: 'Pantry/Store', area: '2.1 / 2.3' },
      { floor: 'First Floor', room: "Madam's Bedroom", area: '19.5' },
      { floor: 'First Floor', room: 'Bedroom', area: '16.8' },
      { floor: 'First Floor', room: 'Bedroom', area: '16.3' },
      { floor: 'Second Floor', room: 'Primary Bedroom', area: '23.3' },
      { floor: 'Second Floor', room: 'Private Lounge', area: '21.3' },
      { floor: 'Second Floor', room: 'Study', area: '11.6' }
    ],
    createdAt: new Date().toISOString()
  },

  // ─── 10. THE BLACK ONYX ────────────────────────────────────────────────────
  {
    id: 'black-onyx',
    classType:   'The Black Onyx',
    tagline:     '3 Bedroom Smart Class Detached Bungalow',
    price:       '₦145,000,000',
    description: 'The Black Onyx is the smart entry point into Wisdom Kwati Smart City living — a beautifully designed three-bedroom detached bungalow that packs incredible value, technology and style into 2,400 sq ft. Perfect for young families and professionals, it features a fully fitted kitchen, integrated smart home system, solar power and a private garden — all within a secure, serviced smart estate.',
    beds: 3, baths: 3,
    size: '2,400 SQ FT', lotSize: '450 SQM',
    floors: 1, parking: '2 Cars',
    builtIn: 'Q1 2026 — Ready',
    propertyId: 'WK-BO-ONX-006',
    brochureUrl: 'https://drive.google.com/file/d/1O2RgTr-EYUK3OeId5-vmUfS56dxypP-U/view?usp=drive_link',
    images: [
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1xDix9g0as7V5dV9U_uggWnkr_kdl5SpX%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    ],
    amenities: [
      { name: 'Smart Home Automation',  iconClass: 'icon-smart' },
      { name: 'Solar Power System',     iconClass: 'icon-solar' },
      { name: '24/7 Security Patrol',   iconClass: 'icon-security' },
      { name: 'Fibre Optic Internet',   iconClass: 'icon-internet' },
      { name: 'Fully Fitted Kitchen',   iconClass: 'icon-kitchen' },
      { name: 'Underground Drainage',   iconClass: 'icon-drainage' },
      { name: 'Full Power Backup',      iconClass: 'icon-power' },
    ],
    interiorSpecs: [
      { metric: 'Bedrooms',      details: '3 (all ensuite)' },
      { metric: 'Bathrooms',     details: '3 full — modern tiled finishes' },
      { metric: 'Living Room',   details: 'Open-plan with large sliding doors to garden' },
      { metric: 'Kitchen',       details: 'Fully fitted kitchen — imported cabinetry, cooker & dishwasher' },
      { metric: 'Flooring',      details: 'Premium imported tiles throughout' },
      { metric: 'Smart Home',    details: 'Smart lighting, smart locks and security cameras via app' },
    ],
    exteriorSpecs: [
      { metric: 'Architecture', details: 'Modern bungalow with flat roof and angular facade' },
      { metric: 'Garden',       details: 'Private garden with landscaped lawn and patio' },
      { metric: 'Parking',      details: '2-car covered carport' },
      { metric: 'Security',     details: 'Estate perimeter wall, CCTV & 24/7 security' },
      { metric: 'Energy',       details: '5kW solar system + inverter backup' },
    ],
    createdAt: new Date().toISOString(),
  },

  // ─── 11. THE RED ONYX ──────────────────────────────────────────────────────
  {
    id: 'red-onyx',
    classType:   'The Red Onyx',
    tagline:     '2 Bedroom Smart Class Detached Bungalow',
    price:       '₦115,000,000',
    description: 'The Red Onyx is a beautifully designed two-bedroom detached bungalow offering modern smart living at an exceptional value. Featuring a compact and highly efficient 1,800 sq ft layout, it comes equipped with a fully fitted kitchen, smart home readiness, solar integration, and private outdoor spaces — perfect for compact modern families, downsizers, or savvy investors.',
    beds: 2, baths: 2,
    size: '1,800 SQ FT', lotSize: '300 SQM',
    floors: 1, parking: '2 Cars',
    builtIn: 'Q1 2026 — Ready',
    propertyId: 'WK-RO-ONX-005',
    brochureUrl: 'https://drive.google.com/file/d/1O2RgTr-EYUK3OeId5-vmUfS56dxypP-U/view?usp=drive_link',
    images: [
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1EvTJIVwYq5NcbH33A3opCXBuNFyWNS92%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    ],
    amenities: [
      { name: 'Smart Home Automation',  iconClass: 'icon-smart' },
      { name: 'Solar Power System',     iconClass: 'icon-solar' },
      { name: '24/7 Security Patrol',   iconClass: 'icon-security' },
      { name: 'Fibre Optic Internet',   iconClass: 'icon-internet' },
      { name: 'Fully Fitted Kitchen',   iconClass: 'icon-kitchen' },
      { name: 'Underground Drainage',   iconClass: 'icon-drainage' },
      { name: 'Full Power Backup',      iconClass: 'icon-power' },
    ],
    interiorSpecs: [
      { metric: 'Bedrooms',      details: '2 (both en-suite)' },
      { metric: 'Bathrooms',     details: '2 full — modern tiled finishes' },
      { metric: 'Living Room',   details: 'Open-plan with large sliding doors to garden' },
      { metric: 'Kitchen',       details: 'Fully fitted kitchen — imported cabinetry, cooker & dishwasher' },
      { metric: 'Flooring',      details: 'Premium imported tiles throughout' },
      { metric: 'Smart Home',    details: 'Smart lighting, smart locks and security cameras via app' },
    ],
    exteriorSpecs: [
      { metric: 'Architecture', details: 'Modern bungalow with flat roof and angular facade' },
      { metric: 'Garden',       details: 'Private garden with landscaped lawn and patio' },
      { metric: 'Parking',      details: '2-car covered carport' },
      { metric: 'Security',     details: 'Estate perimeter wall, CCTV & 24/7 security' },
      { metric: 'Energy',       details: '3kW solar system + inverter backup' },
    ],
    createdAt: new Date().toISOString(),
  }

];

// ---------- Write to Firestore ----------
async function seed() {
  // 1. Delete inactive house types from Firestore
  console.log('🧹 Cleaning up inactive house types in Firestore...');
  const activeIds = new Set(HOUSE_TYPES.map(ht => ht.id));
  try {
    const querySnapshot = await getDocs(collection(db, 'houseTypes'));
    for (const d of querySnapshot.docs) {
      if (!activeIds.has(d.id)) {
        await deleteDoc(doc(db, 'houseTypes', d.id));
        console.log(`  🗑️  Deleted inactive from Firestore: ${d.id}`);
      }
    }
  } catch (err) {
    console.error('  ⚠️  Firestore cleanup failed:', err.message);
  }

  // 2. Write active house types
  let success = 0;
  for (const ht of HOUSE_TYPES) {
    const { id, ...data } = ht;
    try {
      await setDoc(doc(db, 'houseTypes', id), data);
      console.log(`  ✅  Written: ${id} — ${data.classType}`);
      success++;
    } catch (err) {
      console.error(`  ❌  Failed: ${id}`, err.message);
    }
  }
  console.log(`\n🏁 Done. ${success}/${HOUSE_TYPES.length} house types seeded to Firestore.`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
