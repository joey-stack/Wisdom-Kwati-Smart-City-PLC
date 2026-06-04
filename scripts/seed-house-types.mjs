/**
 * Seed script: Populates Firestore houseTypes with rich dummy data
 * matching the house-template.page.js design exactly.
 *
 * Run with: node scripts/seed-house-types.mjs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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
    tagline:     '7 Bedroom Premium Fully Detached Smart Villa',
    price:       '₦2,850,000,000',
    description: 'The Imperial Emerald is the crown jewel of Wisdom Kwati Smart City — a seven-bedroom fully detached ultra-luxury villa that redefines premium living. Commanding an expansive 12,500 sq ft of architectural brilliance, every detail has been crafted for those who demand nothing short of the extraordinary. From the grand double-height entrance foyer to the infinity-edge pool overlooking the estate, this is a home that speaks before you even step inside.',
    beds: 7, baths: 8,
    size: '12,500 SQ FT', lotSize: '2,500 SQM',
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
      { name: 'Smart Home Automation',     iconClass: 'icon-smart' },
      { name: 'Private Swimming Pool',     iconClass: 'icon-pool' },
      { name: '24/7 Security Patrol',      iconClass: 'icon-security' },
      { name: 'Solar Power System',        iconClass: 'icon-solar' },
      { name: 'Fibre Optic Internet',      iconClass: 'icon-internet' },
      { name: 'Electric Vehicle Charging', iconClass: 'icon-ev' },
      { name: 'Private Gym & Fitness',     iconClass: 'icon-gym' },
      { name: 'Wine Cellar',               iconClass: 'icon-wine' },
      { name: 'Home Theater / Cinema',     iconClass: 'icon-cinema' },
      { name: 'BBQ & Outdoor Kitchen',     iconClass: 'icon-bbq' },
      { name: '24/7 Concierge Service',    iconClass: 'icon-concierge' },
      { name: 'Full Power Backup',         iconClass: 'icon-power' },
    ],
    interiorSpecs: [
      { metric: 'Bedrooms',    details: '7 (all ensuite with walk-in wardrobes)' },
      { metric: 'Bathrooms',   details: '8 full bathrooms — Italian marble finishes throughout' },
      { metric: 'Living Room', details: 'Grand double-height ceiling — floor-to-ceiling glass walls open to panoramic views' },
      { metric: 'Kitchen',     details: 'Gourmet Italian kitchen — custom cabinetry, marble island, Miele & Sub-Zero appliances' },
      { metric: 'Flooring',    details: 'Imported Calacatta marble & engineered hardwood' },
      { metric: 'Master Suite',details: 'Private terrace + spa bathroom — deep soaking tub with estate views' },
      { metric: 'Home Theater',details: 'Soundproof Dolby Atmos cinema room' },
      { metric: 'Wine Cellar', details: 'Temperature-controlled — capacity 400+ bottles' },
      { metric: 'Smart Home',  details: 'Fully automated lighting, climate, sound, curtains & security via single app' },
    ],
    exteriorSpecs: [
      { metric: 'Architecture',     details: 'Contemporary Mediterranean fusion with Nigerian modernist accents' },
      { metric: 'Pool',             details: 'Infinity-edge heated swimming pool — overlooking the smart city gardens' },
      { metric: 'Outdoor Kitchen',  details: 'Fully equipped BBQ terrace & bar lounge' },
      { metric: 'Rooftop',          details: 'Sky lounge with fire pit — 360° panoramic sunset views' },
      { metric: 'Landscaping',      details: 'Lush private gardens, water features & stone pathways' },
      { metric: 'Garage',           details: '6-car underground garage with dedicated EV charging stations' },
      { metric: 'Security',         details: 'Gated entry, biometric access + 24/7 CCTV surveillance' },
      { metric: 'Facade',           details: 'Hand-laid Italian stone cladding, full-height glass curtain walls' },
    ],
    createdAt: new Date().toISOString(),
  },

  // ─── 2. THE ROYAL EMERALD ──────────────────────────────────────────────────
  {
    id: 'royal-emerald',
    classType:   'The Royal Emerald',
    tagline:     '5 Bedroom Premium Fully Detached Smart Villa',
    price:       '₦1,650,000,000',
    description: 'The Royal Emerald offers the pinnacle of five-bedroom detached luxury within the Wisdom Kwati Smart City. With a commanding façade of glass and natural stone, this villa blends smart technology with timeless elegance. Spread across 8,200 sq ft on a generous plot, it features an infinity-edge pool, home cinema, and a gourmet kitchen fitted with premium European appliances — designed for families who refuse to compromise.',
    beds: 5, baths: 6,
    size: '8,200 SQ FT', lotSize: '1,800 SQM',
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
      { name: 'Smart Home Automation',     iconClass: 'icon-smart' },
      { name: 'Private Swimming Pool',     iconClass: 'icon-pool' },
      { name: '24/7 Security Patrol',      iconClass: 'icon-security' },
      { name: 'Solar Power System',        iconClass: 'icon-solar' },
      { name: 'Fibre Optic Internet',      iconClass: 'icon-internet' },
      { name: 'Electric Vehicle Charging', iconClass: 'icon-ev' },
      { name: 'Home Theater / Cinema',     iconClass: 'icon-cinema' },
      { name: 'BBQ & Outdoor Kitchen',     iconClass: 'icon-bbq' },
      { name: 'Full Power Backup',         iconClass: 'icon-power' },
      { name: 'Balcony / Terrace',         iconClass: 'icon-balcony' },
    ],
    interiorSpecs: [
      { metric: 'Bedrooms',    details: '5 (all ensuite with walk-in wardrobes)' },
      { metric: 'Bathrooms',   details: '6 full bathrooms — Italian marble throughout' },
      { metric: 'Living Room', details: 'Open-plan double-volume living with floor-to-ceiling glazing' },
      { metric: 'Kitchen',     details: 'Custom Italian kitchen — Gaggenau appliances, waterfall island' },
      { metric: 'Flooring',    details: 'Imported travertine stone & wide-plank hardwood' },
      { metric: 'Master Suite',details: 'His & hers walk-in wardrobes, private spa bathroom with soaking tub' },
      { metric: 'Home Theater',details: 'Dedicated cinema room with surround sound' },
      { metric: 'Smart Home',  details: 'Full home automation — lighting, security, climate & AV' },
    ],
    exteriorSpecs: [
      { metric: 'Architecture',    details: 'Modernist tropical design — wide overhanging eaves, natural stone' },
      { metric: 'Pool',            details: 'Infinity-edge swimming pool with sun deck' },
      { metric: 'Outdoor Kitchen', details: 'Covered alfresco dining terrace with full BBQ setup' },
      { metric: 'Landscaping',     details: 'Manicured tropical gardens with water feature' },
      { metric: 'Garage',          details: '4-car garage with EV charging points' },
      { metric: 'Security',        details: 'Perimeter wall, gated entrance, 24/7 CCTV' },
    ],
    createdAt: new Date().toISOString(),
  },

  // ─── 3. THE STAR SAPPHIRE ─────────────────────────────────────────────────
  {
    id: 'star-sapphire',
    classType:   'The Star Sapphire',
    tagline:     '4 Bedroom Fully Detached Duplex',
    price:       '₦780,000,000',
    description: 'The Star Sapphire is an architectural marvel, designed to offer an elite and spacious living experience in a fully detached duplex format. Perfect for families seeking privacy and high-end comfort, this property showcases a thoughtful design that integrates expansive living areas with sophisticated private retreats. As a flagship offering within our smart estates, The Star Sapphire combines striking contemporary aesthetics with premium structural integrity, providing a grand residence that stands as a testament to luxury living in the capital city.',
    beds: 4, baths: 4,
    size: '5,500 SQ FT', lotSize: '800 SQM',
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
      { name: 'Private Terrace and Balcony spaces', iconClass: 'icon-balcony' },
      { name: 'Dedicated Patio area', iconClass: 'icon-patio' },
      { name: 'Spacious Anteroom and Lobby', iconClass: 'icon-lobby' },
      { name: 'Functional Service Store', iconClass: 'icon-storage' },
      { name: 'Designated Kitchen, Dining, and Living zones', iconClass: 'icon-kitchen' }
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

  // ─── 4. THE BLACK ONYX ────────────────────────────────────────────────────
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
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200',
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

  // ─── 5. THE WHITE SAPPHIRE ────────────────────────────────────────────────
  {
    id: 'white-sapphire',
    classType:   'The White Sapphire',
    tagline:     '4 Bedroom Smart Class Semi-Detached Duplex',
    price:       '₦280,000,000',
    description: 'The White Sapphire is a meticulously crafted four-bedroom semi-detached duplex that delivers premium smart living at an accessible price point. With its crisp white minimalist façade, open-plan living spaces and fully automated smart home system, this is the ideal home for families seeking intelligent design without excess. Located within Wisdom Kwati Smart City, it offers proximity to all community amenities.',
    beds: 4, baths: 4,
    size: '3,800 SQ FT', lotSize: '650 SQM',
    floors: 2, parking: '3 Cars',
    builtIn: 'Q2 2026 — Pre-Delivery',
    propertyId: 'WK-WS-SAP-005',
    brochureUrl: 'https://drive.google.com/file/d/1O2RgTr-EYUK3OeId5-vmUfS56dxypP-U/view?usp=drive_link',
    images: [
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1xDix9g0as7V5dV9U_uggWnkr_kdl5SpX%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=85&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200',
    ],
    amenities: [
      { name: 'Smart Home Automation',  iconClass: 'icon-smart' },
      { name: 'Solar Power System',     iconClass: 'icon-solar' },
      { name: '24/7 Security Patrol',   iconClass: 'icon-security' },
      { name: 'Fibre Optic Internet',   iconClass: 'icon-internet' },
      { name: 'Fully Fitted Kitchen',   iconClass: 'icon-kitchen' },
      { name: 'Balcony / Terrace',      iconClass: 'icon-balcony' },
      { name: 'Full Power Backup',      iconClass: 'icon-power' },
      { name: 'Underground Drainage',   iconClass: 'icon-drainage' },
    ],
    interiorSpecs: [
      { metric: 'Bedrooms',    details: '4 (all ensuite, master on top floor)' },
      { metric: 'Bathrooms',   details: '4 full — contemporary tiled finishes' },
      { metric: 'Living Room', details: 'Double-volume open-plan with balcony access' },
      { metric: 'Kitchen',     details: 'Fitted kitchen with built-in oven, hob and extractor' },
      { metric: 'Flooring',    details: 'Engineered wood upstairs, premium tiles downstairs' },
      { metric: 'Smart Home',  details: 'App-controlled lighting, AC, locks & CCTV' },
    ],
    exteriorSpecs: [
      { metric: 'Architecture', details: 'Minimalist white duplex with clean geometric lines' },
      { metric: 'Balcony',      details: 'First-floor wraparound balcony with glass railings' },
      { metric: 'Garden',       details: 'Front and rear landscaped garden' },
      { metric: 'Parking',      details: '3-car covered parking bay' },
      { metric: 'Security',     details: 'Gated compound with intercom and CCTV' },
    ],
    createdAt: new Date().toISOString(),
  },

  // ─── 6. THE WHITE PEARL ────────────────────────────────────────────────────
  {
    id: 'white-pearl',
    classType:   'The White Pearl',
    tagline:     '2 Bedroom Block of Flat',
    price:       '₦120,000,000',
    description: 'The White Pearl offers a sophisticated urban living solution, designed to maximize both comfort and functionality. Ideal for young professionals and modern families, this 2-bedroom apartment features a well-laid-out floor plan that optimizes every square meter to create a seamless living experience. As part of our signature residential developments, this property combines modern architectural aesthetics with smart community living, ensuring an ideal environment for those seeking a premium lifestyle in a secure, well-planned estate.',
    beds: 2, baths: 2,
    size: '2,400 SQ FT', lotSize: '450 SQM',
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
      { name: 'Private Terrace spaces', iconClass: 'icon-balcony' },
      { name: 'Sit-Out / Patio areas for relaxation', iconClass: 'icon-patio' },
      { name: 'Efficient Stair Hall access', iconClass: 'icon-stairs' },
      { name: 'Spacious Lobby and circulation areas', iconClass: 'icon-lobby' },
      { name: 'Designated Kitchen and Dining zones', iconClass: 'icon-kitchen' }
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
    tagline:     '3 Bedroom Block of Flat',
    price:       '$4,500,000',
    description: 'The Silver Pearl represents an exquisite 3-bedroom apartment designed to provide a perfect blend of space, luxury, and modern convenience. Ideal for growing families or discerning professionals, this unit is masterfully planned to offer a seamless transition between relaxation and entertainment. As part of our signature residential developments, The Silver Pearl integrates contemporary architectural style with highly functional interior spaces, ensuring a premium living experience within a secure and well-orchestrated smart community.',
    beds: 3, baths: 3,
    size: '2,200 sq ft', lotSize: 'N/A (Apartment)',
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
      { name: 'Dedicated Veranda spaces', iconClass: 'icon-balcony' },
      { name: 'Patio areas for outdoor relaxation', iconClass: 'icon-patio' },
      { name: 'Efficient Stair Hall access', iconClass: 'icon-stairs' },
      { name: 'Spacious Lobby and circulation areas', iconClass: 'icon-lobby' },
      { name: 'Dedicated Kitchen, Dining, and Storage zones', iconClass: 'icon-kitchen' }
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
    tagline:     '4 Bedroom Semi-Detached Duplex',
    price:       '$8,500,000',
    description: 'The Blue Sapphire is a masterpiece of contemporary residential design, offering a spacious and sophisticated living environment tailored for the modern family. This 4-bedroom semi-detached duplex elegantly balances aesthetic appeal with high-performance functionality, featuring generous living spaces, private lounges, and thoughtful architectural touches. As part of our signature residential developments, this property stands as an iconic choice for those who value privacy, prestige, and a premium lifestyle within a secure and smart community.',
    beds: 4, baths: 4,
    size: '4,200 sq ft', lotSize: '500 SQM',
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
      { name: 'Private Balcony and Patio spaces', iconClass: 'icon-balcony' },
      { name: 'Dedicated Anteroom and Lobby areas', iconClass: 'icon-lobby' },
      { name: 'Family Lounge for private relaxation', iconClass: 'icon-patio' },
      { name: 'Efficient Stair Hall access', iconClass: 'icon-stairs' },
      { name: 'Designated Kitchen, Dining, and Storage zones', iconClass: 'icon-kitchen' }
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
    tagline:     '4 Bedroom Smart Terrace Duplex',
    price:       '₦185,000,000',
    description: 'The Jade Terrace is a contemporary 4-bedroom smart terrace duplex designed for premium urban living. It balances space, utility, and modern home automation, providing an excellent lifestyle in a secure community.',
    beds: 4, baths: 4,
    size: '3,200 SQ FT', lotSize: '250 SQM',
    floors: 2, parking: '2 Cars',
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
      { name: 'Private Terrace and Balcony spaces', iconClass: 'icon-balcony' },
      { name: 'Smart Home Automation', iconClass: 'icon-smart' },
      { name: 'Efficient Stair Hall access', iconClass: 'icon-stairs' },
      { name: 'Designated Kitchen and Dining zones', iconClass: 'icon-kitchen' },
      { name: '24/7 Security Patrol', iconClass: 'icon-security' }
    ],
    interiorSpecs: [
      { metric: 'Bedrooms', details: '4 bedrooms (all ensuite)' },
      { metric: 'Bathrooms', details: '4 En-suite bathrooms + W/C' },
      { metric: 'Living Room', details: 'Spacious living room area (22.5m²)' },
      { metric: 'Kitchen', details: 'Modern kitchen space (8.4m²)' },
      { metric: 'Additional Spaces', details: 'Dining area, lobby, private balcony, and terrace' }
    ],
    exteriorSpecs: [
      { metric: 'Architecture', details: 'Modern terraced duplex architecture with private entry' },
      { metric: 'Garden / Outdoor', details: 'Private terrace and patio spaces' },
      { metric: 'Parking', details: '2 designated car parking spaces' },
      { metric: 'Circulation', details: 'Internal stairway connecting levels' }
    ],
    createdAt: new Date().toISOString()
  },

  // ─── 10. THE QUARTZ TERRACE ────────────────────────────────────────────────
  {
    id: 'quartz-terrace',
    classType:   'The Quartz Terrace',
    tagline:     '4 Bedroom Classic Terrace Duplex',
    price:       '₦165,000,000',
    description: 'The Quartz Terrace is an elegant 4-bedroom terrace duplex that offers the perfect blend of structural aesthetics, spacious rooms, and comfort. Designed for modern families, it includes premium interior fittings, dedicated parking, and private terrace access.',
    beds: 4, baths: 4,
    size: '3,000 SQ FT', lotSize: '200 SQM',
    floors: 2, parking: '2 Cars',
    builtIn: 'Q2 2026 — Under Construction',
    propertyId: 'WK-QT-QTZ-008',
    brochureUrl: 'https://drive.google.com/file/d/1O2RgTr-EYUK3OeId5-vmUfS56dxypP-U/view?usp=drive_link',
    images: [
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1cBO3as-XL4ecKLz_xur4TxlVn1eqbi4D%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1YpYFPwZQUCf0k9tWJp13Y1kYzKe7npmJ%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200',
      'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200'
    ],
    amenities: [
      { name: 'Private Balcony and Terrace spaces', iconClass: 'icon-balcony' },
      { name: 'Efficient Stair Hall access', iconClass: 'icon-stairs' },
      { name: 'Designated Kitchen and Dining zones', iconClass: 'icon-kitchen' },
      { name: '24/7 Security Patrol', iconClass: 'icon-security' }
    ],
    interiorSpecs: [
      { metric: 'Bedrooms', details: '4 bedrooms (including 1 Primary Bedroom)' },
      { metric: 'Bathrooms', details: '4 En-suite bathrooms + W/C' },
      { metric: 'Living Room', details: 'Generous living room area (20m²)' },
      { metric: 'Kitchen', details: 'Dedicated kitchen space (7.2m²)' },
      { metric: 'Additional Spaces', details: 'Dining area, lobby, balcony, and terrace' }
    ],
    exteriorSpecs: [
      { metric: 'Architecture', details: 'Classic terraced duplex design' },
      { metric: 'Garden / Outdoor', details: 'Private balcony and terrace zones' },
      { metric: 'Parking', details: '2-car parking bay' },
      { metric: 'Circulation', details: 'Stair Hall connecting ground and upper floor' }
    ],
    createdAt: new Date().toISOString()
  }

];

// ---------- Write to Firestore ----------
async function seed() {
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
