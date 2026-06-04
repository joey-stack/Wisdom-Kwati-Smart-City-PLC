/**
 * Seed script: Populates Firestore `projects` collection with real estate data
 * matching the existing estate pages and the company's profile portfolio.
 *
 * Run with: node scripts/seed-projects.mjs
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

const projects = [
  {
    id: 'beverly-hills',
    name: 'Beverly Hills District',
    tagline: 'An ultra-premium enclave nestled in the heart of Abuja, crafted for those who demand the very finest in smart residential living.',
    description: 'Beverly Hills District is Wisdom Kwati\'s flagship Abuja project — a masterclass in ultra-luxury smart estate design. Set across meticulously landscaped terrain, each plot is engineered for intelligent living with fiber connectivity, AI-powered security, and full smart home automation as standard.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    highlights: [
      'Certificate of Occupancy (C of O) Title',
      'AI-Powered Perimeter & Biometric Access',
      'Smart Grid with Full Solar Backup',
      'Fibre-to-the-Home Broadband',
      'Underground Drainage & Utility Networks',
      'Concrete Interlocked Internal Roads'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Security', description: 'Elite Gated with AI Vehicle Scanning' },
      { title: 'Infrastructure', description: 'Ultra-Premium Smart Grid' },
      { title: 'Environment', description: 'Prestigious / Serene / Exclusive' }
    ],
    nearbyFacilities: [
      { category: 'Governance', name: 'Abuja FCT Secretariat', distance: '10 mins' },
      { category: 'Healthcare', name: 'National Hospital Abuja', distance: '14 mins' },
      { category: 'Aviation', name: 'Nnamdi Azikiwe International Airport', distance: '35 mins' },
      { category: 'Shopping', name: 'Jabi Lake Mall', distance: '18 mins' },
      { category: 'Education', name: 'British Nigerian Academy', distance: '12 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Plot', value: '₦45,000,000 – ₦60,000,000', outlook: 'High-Growth Potential' },
      { metric: '1,000 SQM Plot', value: '₦85,000,000 – ₦110,000,000', outlook: 'Premium Investment' }
    ],
    plotSizes: [
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Limited Availability' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Available' }
    ],
    houseTypeIds: ['imperial-emerald', 'royal-emerald'],
    status: 'active',
    location: 'Abuja, FCT',
    state: 'Abuja',
    neighborhood: 'Kuje',
    updatesLink: '/projects/beverly-hills',
    createdAt: new Date().toISOString()
  },
  {
    id: 'kwati-city',
    name: 'Kwati City',
    tagline: 'A visionary mixed-use smart city development redefining urban living across Nigeria\'s fastest-growing residential corridors.',
    description: 'Kwati City is Wisdom Kwati\'s most ambitious project — a fully integrated smart city spanning residential, commercial, and recreational zones. Every home is equipped with renewable energy systems, smart metering, and high-speed connectivity. Designed to set the standard for 21st-century Nigerian urban development.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Mixed-use Smart City Master Plan',
      'Solar-Powered Street Lighting',
      'Fully Automated Smart Home Integration',
      'International School & Medical Centre',
      'Shopping & Commercial Districts',
      '24/7 Smart Security Command Centre'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'City Type', description: 'Mixed-Use Smart City' },
      { title: 'Infrastructure', description: 'Grade A Smart Grid & Roads' },
      { title: 'Atmosphere', description: 'Vibrant / Connected / Forward-Looking' }
    ],
    nearbyFacilities: [
      { category: 'Transport', name: 'Major Expressway Access', distance: '5 mins' },
      { category: 'Healthcare', name: 'Wisdom Kwati Medical Hub', distance: 'On-site' },
      { category: 'Education', name: 'Kwati City International School', distance: 'On-site' },
      { category: 'Recreation', name: 'City Park & Sports Complex', distance: 'On-site' }
    ],
    marketSnapshot: [
      { metric: '300 SQM Residential', value: '₦25,000,000 – ₦35,000,000', outlook: 'Strong Capital Growth' },
      { metric: '600 SQM Commercial', value: '₦70,000,000 – ₦95,000,000', outlook: 'High ROI' }
    ],
    plotSizes: [
      { size: '300 SQM', dimensions: '20m × 15m', availability: 'Available' },
      { size: '600 SQM', dimensions: '30m × 20m', availability: 'Limited' }
    ],
    houseTypeIds: ['black-onyx', 'royal-emerald'],
    status: 'active',
    location: 'Yola, Adamawa',
    state: 'Adamawa',
    neighborhood: 'Jimeta',
    updatesLink: '/projects/kwati-city',
    createdAt: new Date().toISOString()
  },
  {
    id: 'royal-city',
    name: 'Royal City',
    tagline: 'A majestic residential kingdom in Kuje, Abuja — where grand architecture meets intelligent smart home living.',
    description: 'Royal City offers a majestic residential experience in Kuje, Abuja. This exclusive estate features expansive detached homes, grand architectural designs, and an uncompromised level of smart security, making it a true kingdom for its residents. Each home benefits from uninterrupted power, high-speed internet, and automated living systems.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200',
    highlights: [
      'Expansive Detached Grand Villas',
      'Smart Security Perimeter with CCTV',
      'Uninterrupted Power Supply (Solar + Grid)',
      'Fully Paved Internal Roads',
      'Water Treatment & Supply System',
      'Community Clubhouse & Recreation Park'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Architecture', description: 'Grand / Palatial / Timeless' },
      { title: 'Security', description: 'Gated with 24/7 Armed Patrol' },
      { title: 'Power', description: 'Solar + Grid Hybrid — 24hr Supply' }
    ],
    nearbyFacilities: [
      { category: 'Education', name: 'Kuje Area Council Schools', distance: '8 mins' },
      { category: 'Healthcare', name: 'Kuje General Hospital', distance: '10 mins' },
      { category: 'Markets', name: 'Kuje Main Market', distance: '12 mins' },
      { category: 'Aviation', name: 'Nnamdi Azikiwe Airport', distance: '30 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Plot', value: '₦18,000,000 – ₦28,000,000', outlook: 'Growth Market' },
      { metric: '1,000 SQM Plot', value: '₦35,000,000 – ₦50,000,000', outlook: 'Steady Appreciation' }
    ],
    plotSizes: [
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Available' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Available' }
    ],
    houseTypeIds: ['imperial-emerald'],
    status: 'active',
    location: 'Kuje, Abuja FCT',
    state: 'Abuja',
    neighborhood: 'Kuje',
    updatesLink: '/projects/royal-city',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sunset-haven',
    name: 'Sunset Haven',
    tagline: 'Where golden-hour living meets smart estate perfection in Katampe Extension — Abuja\'s most serene smart address.',
    description: 'Sunset Haven is a boutique smart estate in Katampe Extension (with Phase 1 situated on Dawaki Plot C10 104 and 105), designed for discerning buyers who value tranquility, privacy, and intelligent living. Mapped on a registered C of O title, it features smart-ready infrastructure including central water treatment plants, solar street lighting, and 24-hour manned gatehouses as standard.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1xYCnvanRHqSsdCeheY75jtAM5QS3AS0n%26sz=w1200',
    highlights: [
      'Elevated Terrain with Panoramic Views',
      'Smart Home Ready Infrastructure',
      'Biometric & Camera Perimeter Security',
      'Fibre Broadband & 5G-Ready Towers',
      'Landscaped Parks & Walking Trails',
      'Premium Interlocked Road Network'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Setting', description: 'Elevated / Panoramic / Serene' },
      { title: 'Security', description: 'Biometric Gated Access' },
      { title: 'Infrastructure', description: 'Premium Smart-Ready Grade' }
    ],
    nearbyFacilities: [
      { category: 'Shopping', name: 'Jabi Lake Mall', distance: '20 mins' },
      { category: 'Healthcare', name: 'Garki Hospital', distance: '22 mins' },
      { category: 'Leisure', name: 'Katampe Recreation Park', distance: '5 mins' },
      { category: 'Transport', name: 'Airport Road Access', distance: '10 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM', value: '₦40,000,000 – ₦55,000,000', outlook: 'Prime Location Premium' }
    ],
    plotSizes: [
      { size: '200 SQM', dimensions: '20m × 10m', availability: 'Available' },
      { size: '650 SQM', dimensions: '32.5m × 20m', availability: 'Limited' },
      { size: '750 SQM', dimensions: '37.5m × 20m', availability: 'Limited' }
    ],
    houseTypeIds: ['royal-emerald'],
    status: 'active',
    location: 'Katampe Extension, Abuja',
    state: 'Abuja',
    neighborhood: 'Katampe Extension',
    updatesLink: '/projects/sunset-haven',
    createdAt: new Date().toISOString()
  },
  {
    id: 'wisdom-kwati-smart-city',
    name: 'Wisdom Kwati Smart City',
    tagline: 'Nigeria\'s premier fully-integrated smart city — a new benchmark for 21st century urban civilisation.',
    description: 'Wisdom Kwati Smart City is the flagship of Wisdom Kwati\'s vision for Nigeria\'s future. This master-planned development integrates residential, commercial, institutional, and recreational zones into a single connected ecosystem. Powered by renewable energy and governed by intelligent infrastructure, it represents the gold standard in smart urban development.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN%26sz=w1200',
    highlights: [
      'Fully Integrated Smart City Infrastructure',
      'Renewable Energy — 100% Solar Grid',
      'AI-Powered Traffic & Security Systems',
      'Smart Metering for All Utilities',
      'World-Class Healthcare & Education Facilities',
      'High-Speed Fibre & 5G Networks Throughout'
    ],
    realEstateVibe: [
      { title: 'Development Type', description: 'Fully Integrated Smart City' },
      { title: 'Energy', description: '100% Renewable Solar-Powered Grid' },
      { title: 'Governance', description: 'Smart Management & AI Systems' },
      { title: 'Vision', description: 'Nigeria\'s Future Urban Standard' }
    ],
    nearbyFacilities: [
      { category: 'Healthcare', name: 'Wisdom Kwati Smart Hospital', distance: 'On-site' },
      { category: 'Education', name: 'WK Smart City Academy', distance: 'On-site' },
      { category: 'Recreation', name: 'Grand City Park & Amphitheatre', distance: 'On-site' },
      { category: 'Commerce', name: 'Smart City Commercial Hub', distance: 'On-site' }
    ],
    marketSnapshot: [
      { metric: 'Residential Plot (500 SQM)', value: '₦50,000,000 – ₦75,000,000', outlook: 'Landmark Investment' },
      { metric: 'Commercial Plot (1,000 SQM)', value: '₦120,000,000 – ₦180,000,000', outlook: 'Exceptional ROI' }
    ],
    plotSizes: [
      { size: '500 SQM Residential', dimensions: '25m × 20m', availability: 'Phase 1 Available' },
      { size: '1,000 SQM Commercial', dimensions: '40m × 25m', availability: 'Phase 1 Available' }
    ],
    houseTypeIds: ['imperial-emerald', 'royal-emerald', 'black-onyx'],
    status: 'active',
    location: 'Abuja, FCT & Multiple States',
    state: 'Adamawa',
    neighborhood: 'Demsa',
    updatesLink: '/projects/wisdom-kwati-smart-city',
    createdAt: new Date().toISOString()
  },
  {
    id: 'garden-eden',
    name: 'Garden Eden Estate',
    tagline: 'A lush, tranquil smart residential community where nature and technology coexist in perfect harmony.',
    description: 'Garden Eden Estate draws inspiration from nature\'s finest design principles — lush greenery, open spaces, and clean air — combined with Wisdom Kwati\'s world-class smart infrastructure. This is a community for families seeking quality of life, safety, and the comfort of modern intelligent living.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Expansive Green Parks & Gardens',
      'Smart Irrigation & Landscaping System',
      'Child-Safe Gated Community Design',
      'Solar-Powered Street Lights',
      'Smart Security with Perimeter CCTV',
      'Community Clubhouse & Playground'
    ],
    realEstateVibe: [
      { title: 'Environment', description: 'Nature-Integrated Smart Estate' },
      { title: 'Target', description: 'Family-Oriented Community' },
      { title: 'Green Space', description: '40% Landscaped Common Areas' },
      { title: 'Security', description: 'Child-Safe Smart Perimeter' }
    ],
    nearbyFacilities: [
      { category: 'Education', name: 'Primary & Secondary Schools', distance: '5 mins' },
      { category: 'Healthcare', name: 'Community Health Centre', distance: '8 mins' },
      { category: 'Markets', name: 'Local Food Market', distance: '10 mins' },
      { category: 'Recreation', name: 'Public Recreation Park', distance: '3 mins' }
    ],
    marketSnapshot: [
      { metric: '400 SQM Plot', value: '₦20,000,000 – ₦30,000,000', outlook: 'Family Market Growth' }
    ],
    plotSizes: [
      { size: '400 SQM', dimensions: '20m × 20m', availability: 'Available' },
      { size: '600 SQM', dimensions: '30m × 20m', availability: 'Available' }
    ],
    houseTypeIds: ['imperial-emerald'],
    status: 'active',
    location: 'Nigeria',
    state: 'Abuja',
    neighborhood: 'Asokoro',
    updatesLink: '/projects/garden-eden',
    createdAt: new Date().toISOString()
  },
  {
    id: 'lagos-ekpe',
    name: 'Lagos Ekpe Smart City',
    tagline: 'A transformative coastal smart city rising in Lagos State — Nigeria\'s next great economic hub.',
    description: 'Lagos Ekpe Smart City is Wisdom Kwati\'s landmark coastal development in Lagos State (situated in Epe). Strategically positioned along the Lagos waterfront corridor, this mixed-use smart city is engineered for Nigeria\'s commercial capital, attracting both residential buyers and commercial investors seeking premium smart-city living near the coast.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    highlights: [
      'Coastal Smart City Development',
      'Waterfront Views & Marina Access',
      'Full Smart Home Automation',
      'Grade A Commercial Zones',
      'International Connectivity & Fibre Grid',
      '24/7 Smart Security Infrastructure'
    ],
    realEstateVibe: [
      { title: 'Setting', description: 'Coastal / Waterfront Smart City' },
      { title: 'Market', description: 'Lagos Premium Residential & Commercial' },
      { title: 'Infrastructure', description: 'Smart City Grade A' },
      { title: 'Appeal', description: 'Investment & End-User Balanced' }
    ],
    nearbyFacilities: [
      { category: 'Transport', name: 'Lagos Waterway & Ferry Terminal', distance: '5 mins' },
      { category: 'Aviation', name: 'Murtala Muhammed International Airport', distance: '45 mins' },
      { category: 'Commerce', name: 'Victoria Island Business District', distance: '30 mins' },
      { category: 'Healthcare', name: 'Eko Hospital', distance: '35 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Residential', value: '₦55,000,000 – ₦80,000,000', outlook: 'Lagos Premium Market' },
      { metric: '1,000 SQM Commercial', value: '₦130,000,000 – ₦200,000,000', outlook: 'High Commercial ROI' }
    ],
    plotSizes: [
      { size: '300 SQM', dimensions: '20m × 15m', availability: 'Available' },
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Phase 1 Open' },
      { size: '600 SQM', dimensions: '30m × 20m', availability: 'Limited' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Limited' }
    ],
    houseTypeIds: ['royal-emerald', 'black-onyx'],
    status: 'active',
    location: 'Ekpe, Lagos State',
    state: 'Lagos',
    neighborhood: 'Epe',
    updatesLink: '/projects/lagos-ekpe',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ph-rumu-olumeni',
    name: 'Port Harcourt Rumu-Olumeni',
    tagline: 'A premium smart residential district transforming Port Harcourt\'s most sought-after expansion corridor.',
    description: 'Port Harcourt Rumu-Olumeni is Wisdom Kwati\'s flagship Rivers State development, bringing smart estate infrastructure to one of Nigeria\'s most economically dynamic cities. Strategically positioned in the Rumu-Olumeni axis, this estate combines premium architecture with intelligent home automation, offering an unmatched standard of living for Port Harcourt\'s elite.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200',
    highlights: [
      'Smart Estate Infrastructure in PH',
      'Certificate of Occupancy (C of O)',
      'Full Electrical & Solar Hybrid Power',
      'AI Security & Perimeter Access Control',
      'Sealed Interlocked Internal Roads',
      'Proximity to Oil & Gas Commercial Hub'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Location Advantage', description: 'Oil & Gas Hub Proximity' },
      { title: 'Infrastructure', description: 'Premium Smart-Ready Grade' },
      { title: 'Market', description: 'Port Harcourt Executive Residential' }
    ],
    nearbyFacilities: [
      { category: 'Commerce', name: 'Port Harcourt Business District', distance: '20 mins' },
      { category: 'Healthcare', name: 'University of Port Harcourt Teaching Hospital', distance: '15 mins' },
      { category: 'Aviation', name: 'Port Harcourt International Airport', distance: '40 mins' },
      { category: 'Shopping', name: 'Polo Avenue Mall', distance: '25 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Plot', value: '₦30,000,000 – ₦45,000,000', outlook: 'PH Premium Growth' },
      { metric: '1,000 SQM Plot', value: '₦60,000,000 – ₦85,000,000', outlook: 'Strong Investor Demand' }
    ],
    plotSizes: [
      { size: '150 SQM', dimensions: '15m × 10m', availability: 'Available' },
      { size: '250 SQM', dimensions: '25m × 10m', availability: 'Available' },
      { size: '350 SQM', dimensions: '25m × 14m', availability: 'Available' },
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Available' },
      { size: '800 SQM', dimensions: '40m × 20m', availability: 'Available' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Available' },
      { size: '2,000 SQM', dimensions: '50m × 40m', availability: 'Limited' }
    ],
    houseTypeIds: ['imperial-emerald', 'black-onyx'],
    status: 'active',
    location: 'Rumu-Olumeni, Port Harcourt, Rivers State',
    state: 'Rivers',
    neighborhood: 'Rumu-Olumeni',
    updatesLink: '/projects/ph-rumu-olumeni',
    createdAt: new Date().toISOString()
  },
  {
    id: 'whispering-pines',
    name: 'Whispering Pines',
    tagline: 'A quiet smart sanctuary in Karsana, engineered with comprehensive infrastructure and security.',
    description: 'Whispering Pines in Karsana, Abuja is designed for families who refuse to compromise on a functional life. Backed by a registered C of O title, the estate operates central water treatment, solar-powered street lighting, and 24-hour smart security. It bridges the gap between natural tranquility and full urban connectivity, offering terraced homes and blocks of flats.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Certificate of Occupancy (C of O) Title',
      'On-Site Central Water Treatment Plant',
      'Solar-Powered Street Lighting Grid',
      'Smart Security CCTV Perimeter Monitoring',
      '24-Hour Manned Estate Gatehouse',
      'Concrete Paved Internal Road Network'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Water', description: 'Central Water Treatment Plant' },
      { title: 'Power', description: 'Solar Street Lights Grid' },
      { title: 'Security', description: '24/7 CCTV & Manned Gatehouse' }
    ],
    nearbyFacilities: [
      { category: 'Governance', name: 'Abuja FCT Secretariat', distance: '15 mins' },
      { category: 'Healthcare', name: 'Gwarinpa General Hospital', distance: '10 mins' },
      { category: 'Leisure', name: 'Jabi Lake Mall', distance: '12 mins' }
    ],
    marketSnapshot: [
      { metric: '200 SQM Plot', value: '₦18,000,000 – ₦25,000,000', outlook: 'High-Growth Potential' },
      { metric: '500 SQM Plot', value: '₦40,000,000 – ₦55,000,000', outlook: 'Premium Investment' }
    ],
    plotSizes: [
      { size: '200 SQM', dimensions: '20m × 10m', availability: 'Available' },
      { size: '225 SQM', dimensions: '22.5m × 10m', availability: 'Available' },
      { size: '350 SQM', dimensions: '25m × 14m', availability: 'Available' },
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Available' },
      { size: '650 SQM', dimensions: '32.5m × 20m', availability: 'Limited' },
      { size: '750 SQM', dimensions: '37.5m × 20m', availability: 'Limited' }
    ],
    houseTypeIds: ['blue-sapphire', 'star-sapphire', 'white-pearl', 'silver-pearl'],
    status: 'active',
    location: 'Karsana, Abuja',
    state: 'Abuja',
    neighborhood: 'Karsana',
    updatesLink: '/projects/whispering-pines',
    createdAt: new Date().toISOString()
  },
  {
    id: 'epitome-valley',
    name: 'Epitome Valley',
    tagline: 'A smart-ready valley community in Katampe Extension Plot 250, designed for long-term capital preservation.',
    description: 'Epitome Valley brings intelligent living to Katampe Extension Plot 250. Every plot is mapped for full utility integration—including central water treatment, solar lighting, and 24-hour manned gatehouses. It features a range of terrace, semi-detached, and fully-detached duplexes, making it one of the most secure and structurally sound communities in the capital territory.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    highlights: [
      'Certificate of Occupancy (C of O) Title',
      'Full Utility Mapped Infrastructure',
      'Smart Security Cameras & Guard Patrols',
      'Central Water Treatment Systems',
      'Solar-Powered Internal Road Lighting'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Setting', description: 'Serene Valley Topography' },
      { title: 'Security', description: '24/7 Guarded Gatehouse' },
      { title: 'Utilities', description: 'Central Water & Solar Grid' }
    ],
    nearbyFacilities: [
      { category: 'Shopping', name: 'Jabi Lake Mall', distance: '18 mins' },
      { category: 'Healthcare', name: 'National Hospital Abuja', distance: '20 mins' },
      { category: 'Leisure', name: 'Katampe Hills', distance: '8 mins' }
    ],
    marketSnapshot: [
      { metric: '250 SQM Plot', value: '₦22,000,000 – ₦30,000,000', outlook: 'Steady Growth' },
      { metric: '450 SQM Plot', value: '₦38,000,000 – ₦48,000,000', outlook: 'High Demand' }
    ],
    plotSizes: [
      { size: '200 SQM', dimensions: '20m × 10m', availability: 'Available' },
      { size: '250 SQM', dimensions: '25m × 10m', availability: 'Available' },
      { size: '450 SQM', dimensions: '22.5m × 20m', availability: 'Available' },
      { size: '650 SQM', dimensions: '32.5m × 20m', availability: 'Limited' },
      { size: '750 SQM', dimensions: '37.5m × 20m', availability: 'Limited' }
    ],
    houseTypeIds: ['royal-emerald'],
    status: 'active',
    location: 'Katampe Extension, Abuja',
    state: 'Abuja',
    neighborhood: 'Katampe Extension',
    updatesLink: '/projects/epitome-valley',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sunshine-estate',
    name: 'Sunshine Estate',
    tagline: 'Elevated smart living in Katampe Extension Plot 49, featuring premium villa options.',
    description: 'Sunshine Estate offers a high-elevation smart residential community on Plot 49 of Katampe Extension. Designed to counter Abuja\'s housing deficit with technical excellence, it supports options up to a seven-bedroom luxury villa on 1,000 SQM. The estate features tarred internal road networks, smart security monitoring, and continuous water treatment.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Certificate of Occupancy (C of O) Title',
      'Elevated Mapped Plots up to 1000 SQM',
      'Smart Security & Biometric Gate Access',
      'Solar-Powered Street Lights',
      'Central Water Treatment System'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Elevation', description: 'High-Elevation Windward Slope' },
      { title: 'Scale', description: 'Up to 1000 SQM Mansion Plots' },
      { title: 'Security', description: 'Biometric Access Control' }
    ],
    nearbyFacilities: [
      { category: 'Leisure', name: 'Katampe Recreation Park', distance: '6 mins' },
      { category: 'Commerce', name: 'Central Business District', distance: '15 mins' },
      { category: 'Aviation', name: 'Nnamdi Azikiwe Airport', distance: '35 mins' }
    ],
    marketSnapshot: [
      { metric: '450 SQM Plot', value: '₦42,000,000 – ₦52,000,000', outlook: 'Premium Growth' },
      { metric: '1,000 SQM Plot', value: '₦90,000,000 – ₦115,000,000', outlook: 'Ultra-Premium Tier' }
    ],
    plotSizes: [
      { size: '200 SQM', dimensions: '20m × 10m', availability: 'Available' },
      { size: '250 SQM', dimensions: '25m × 10m', availability: 'Available' },
      { size: '450 SQM', dimensions: '22.5m × 20m', availability: 'Available' },
      { size: '650 SQM', dimensions: '32.5m × 20m', availability: 'Limited' },
      { size: '750 SQM', dimensions: '37.5m × 20m', availability: 'Limited' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Limited' }
    ],
    houseTypeIds: ['imperial-emerald', 'royal-emerald'],
    status: 'active',
    location: 'Katampe Extension, Abuja',
    state: 'Abuja',
    neighborhood: 'Katampe Extension',
    updatesLink: '/projects/sunshine-estate',
    createdAt: new Date().toISOString()
  },
  {
    id: 'katampe-plot-1384',
    name: 'Katampe Plot 1384 Development',
    tagline: 'A boutique smart duplex community in Katampe Extension, optimized for close-knit security.',
    description: 'This development at Katampe Extension Plot 1384 features six exclusive units of four-bedroom semi-detached duplexes with BQs on a 1,500 SQM parcel. Meticulously engineered for low density and high security, it offers full solar street lighting, water treatment, and gated access.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200',
    highlights: [
      'Boutique Low-Density Duplex Parcel',
      '4-Bedroom Duplexes with BQs',
      '24-Hour Gated Access Control',
      'Solar-Powered Security Lighting',
      'Water Treatment Plant Integrated'
    ],
    realEstateVibe: [
      { title: 'Density', description: 'Boutique 6-Unit Cluster' },
      { title: 'Build Tier', description: 'Executive Duplexes with BQs' },
      { title: 'Security', description: 'Gated Access Control' },
      { title: 'Utilities', description: 'Centralized Water & Solar' }
    ],
    nearbyFacilities: [
      { category: 'Shopping', name: 'Jabi Lake Mall', distance: '18 mins' },
      { category: 'Governance', name: 'FCT Secretariat', distance: '16 mins' }
    ],
    marketSnapshot: [
      { metric: '250 SQM Plot + Duplex', value: '₦75,000,000 – ₦90,000,000', outlook: 'Completed Turnkey Value' }
    ],
    plotSizes: [
      { size: '250 SQM', dimensions: '25m × 10m', availability: 'Available' }
    ],
    houseTypeIds: ['star-sapphire'],
    status: 'active',
    location: 'Katampe Extension, Abuja',
    state: 'Abuja',
    neighborhood: 'Katampe Extension',
    updatesLink: '/projects/katampe-plot-1384',
    createdAt: new Date().toISOString()
  },
  {
    id: 'octa-residence',
    name: 'Octa Residence',
    tagline: 'Modern smart vertical residency and duplexes in Jahi Phase 2.',
    description: 'Octa Residence brings structured, tech-integrated living to Jahi Phase 2. Mapped with a registered C of O, the estate offers 4-bedroom semi-detached duplexes and 3-bedroom blocks of flats (G+6) connected to central solar infrastructure, water treatment, and 24-hour manned gatehouses.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Certificate of Occupancy (C of O) Title',
      'Jahi Phase 2 Prime Access Corridor',
      'G+6 Block of Flats Option',
      'Central Water Treatment & Solar Lights',
      '24/7 Security Patrol & CCTV Control'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Location', description: 'Jahi Phase 2 Core' },
      { title: 'Density', description: 'Medium Density Apartments & Duplexes' },
      { title: 'Security', description: '24/7 Manned Gatehouse' }
    ],
    nearbyFacilities: [
      { category: 'Commerce', name: 'Jahi Commercial Hub', distance: '5 mins' },
      { category: 'Education', name: 'Gwarinpa Schools Corridor', distance: '10 mins' },
      { category: 'Healthcare', name: 'Medicaid Hospital Jahi', distance: '8 mins' }
    ],
    marketSnapshot: [
      { metric: '225 SQM Plot', value: '₦28,000,000 – ₦36,000,000', outlook: 'Steady Appreciation' },
      { metric: '350 SQM Plot', value: '₦45,000,000 – ₦58,000,000', outlook: 'High Demand' }
    ],
    plotSizes: [
      { size: '225 SQM', dimensions: '22.5m × 10m', availability: 'Available' },
      { size: '350 SQM', dimensions: '25m × 14m', availability: 'Available' },
      { size: '750 SQM', dimensions: '37.5m × 20m', availability: 'Limited' }
    ],
    houseTypeIds: ['star-sapphire'],
    status: 'active',
    location: 'Jahi Phase 2, Abuja',
    state: 'Abuja',
    neighborhood: 'Jahi',
    updatesLink: '/projects/octa-residence',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ellington-villa-1',
    name: 'Ellington Villa 1',
    tagline: 'Premium smart apartment blocks in Mabushi Phase 1, built for modern urban professionals.',
    description: 'Ellington Villa 1 is a boutique vertical community in Mabushi Phase 1. It features two and three-bedroom smart blocks of flats (G+6) powered by independent solar grids, water treatment, and 24-hour manned gatehouses, offering maximum security and structural integrity.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Mabushi Phase 1 Central Access',
      'G+6 Modern Smart Flat Structures',
      'Independent Solar Utility Grid',
      'Central Water Treatment Systems',
      'Concrete Interlocked Parking Lots'
    ],
    realEstateVibe: [
      { title: 'Setting', description: 'Urban Apartment District' },
      { title: 'Density', description: 'High-Density G+6 Blocks' },
      { title: 'Utilities', description: 'Solar Grid & Water Treatment' },
      { title: 'Target', description: 'Professionals & Rental Investors' }
    ],
    nearbyFacilities: [
      { category: 'Commerce', name: 'Mabushi Ultra-Modern Market', distance: '4 mins' },
      { category: 'Transport', name: 'Shehu Shagari Way Access', distance: '5 mins' },
      { category: 'Leisure', name: 'Abuja City Park', distance: '12 mins' }
    ],
    marketSnapshot: [
      { metric: '2-Bedroom Smart Flat', value: '₦45,000,000 – ₦55,000,000', outlook: 'Strong Rental Yield' },
      { metric: '3-Bedroom Smart Flat', value: '₦60,000,000 – ₦75,000,000', outlook: 'Excellent Capital Growth' }
    ],
    plotSizes: [
      { size: '650 SQM', dimensions: '32.5m × 20m', availability: 'Available' },
      { size: '750 SQM', dimensions: '37.5m × 20m', availability: 'Limited' }
    ],
    houseTypeIds: [],
    status: 'active',
    location: 'Mabushi Phase 1, Abuja',
    state: 'Abuja',
    neighborhood: 'Mabushi',
    updatesLink: '/projects/ellington-villa-1',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ellington-villa-2',
    name: 'Ellington Villa 2',
    tagline: 'A family-focused smart estate in Mabushi Phase 2, combining flats and detached homes.',
    description: 'Ellington Villa 2 expands the Mabushi portfolio with family-oriented 4-bedroom semi-detached duplexes and 5-bedroom luxury fully-detached duplexes. Equipped with central water treatment, solar-powered lighting, and round-the-clock smart camera security, it ensures peaceful and stable urban living.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    highlights: [
      'Mabushi Phase 2 Family-Centric Layout',
      'Terraced and Detached Duplex Options',
      'Smart Security CCTV Coverage',
      'Central Water Treatment Plant',
      '24-Hour Armed Access Patrol'
    ],
    realEstateVibe: [
      { title: 'Layout', description: 'Mixed Flat & Duplex Enclave' },
      { title: 'Power', description: 'Solar & Grid Hybrid Utilities' },
      { title: 'Target', description: 'Family Residentials & Landlords' },
      { title: 'Security', description: 'Double Gatehouse Control' }
    ],
    nearbyFacilities: [
      { category: 'Education', name: 'Mabushi International Schools', distance: '8 mins' },
      { category: 'Healthcare', name: 'Federal Medical Centre', distance: '15 mins' }
    ],
    marketSnapshot: [
      { metric: '225 SQM Plot', value: '₦32,000,000 – ₦40,000,000', outlook: 'Steady Value Rise' },
      { metric: '350 SQM Plot', value: '₦50,000,000 – ₦65,000,000', outlook: 'High Demand' }
    ],
    plotSizes: [
      { size: '225 SQM', dimensions: '22.5m × 10m', availability: 'Available' },
      { size: '350 SQM', dimensions: '25m × 14m', availability: 'Available' },
      { size: '650 SQM', dimensions: '32.5m × 20m', availability: 'Limited' }
    ],
    houseTypeIds: ['blue-sapphire'],
    status: 'active',
    location: 'Mabushi Phase 2, Abuja',
    state: 'Abuja',
    neighborhood: 'Mabushi',
    updatesLink: '/projects/ellington-villa-2',
    createdAt: new Date().toISOString()
  },
  {
    id: 'guzape-ii-estate',
    name: 'Guzape II Smart District',
    tagline: 'An elite smart district in Guzape II, engineered for high-altitude serenity and class.',
    description: 'Guzape II is Wisdom Kwati\'s premier high-altitude smart district in Abuja. Mapped on a C of O title, this elite estate supports custom villas up to 7-bedroom options on 1,000 SQM. It is fully integrated with central water treatment, solar road lighting, and manned security gatehouses.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    highlights: [
      'Certificate of Occupancy (C of O) Title',
      'High-Altitude Panoramic Topography',
      'Villas up to 1000 SQM Mapped Plots',
      'Smart security & AI Perimeter Guards',
      'Tarred Internal Roads & Formal Naming'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Setting', description: 'Elite High-Altitude Slopes' },
      { title: 'Security', description: 'AI Gated Perimeter Control' },
      { title: 'Tier', description: 'High-Net-Worth Residential' }
    ],
    nearbyFacilities: [
      { category: 'Governance', name: 'Asokoro Diplomatic Zone', distance: '12 mins' },
      { category: 'Healthcare', name: 'Garki General Hospital', distance: '10 mins' },
      { category: 'Aviation', name: 'Nnamdi Azikiwe Airport', distance: '38 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Plot', value: '₦60,000,000 – ₦80,000,000', outlook: 'Rapid Capital Gain' },
      { metric: '1,000 SQM Plot', value: '₦110,000,000 – ₦140,000,000', outlook: 'VVIP Investment' }
    ],
    plotSizes: [
      { size: '200 SQM', dimensions: '20m × 10m', availability: 'Available' },
      { size: '250 SQM', dimensions: '25m × 10m', availability: 'Available' },
      { size: '450 SQM', dimensions: '22.5m × 20m', availability: 'Available' },
      { size: '650 SQM', dimensions: '32.5m × 20m', availability: 'Available' },
      { size: '750 SQM', dimensions: '37.5m × 20m', availability: 'Limited' },
      { size: '800 SQM', dimensions: '40m × 20m', availability: 'Limited' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Limited' }
    ],
    houseTypeIds: ['imperial-emerald', 'royal-emerald', 'blue-sapphire'],
    status: 'active',
    location: 'Guzape II, Abuja',
    state: 'Abuja',
    neighborhood: 'Guzape',
    updatesLink: '/projects/guzape-ii-estate',
    createdAt: new Date().toISOString()
  },
  {
    id: 'maitama-ii-estate',
    name: 'Maitama II Smart Extension',
    tagline: 'A secure smart extension in Maitama II, providing advanced utilities and palatial layouts.',
    description: 'Maitama II extends the premium Abuja portfolio, offering plots from 200 to 1,000 SQM. It supports smart terrace duplexes, semi-detached duplexes, and palatial 7-bedroom luxury villas connected to a central utility grid, water treatment plants, and smart security monitoring.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Maitama II High-Growth Corridor',
      'Premium Smart Grid Utilities',
      'C of O Mapped Residential Plots',
      'Solar-Powered Street Lights',
      '24/7 Smart Guard Patrol'
    ],
    realEstateVibe: [
      { title: 'Setting', description: 'Premium Extension Hub' },
      { title: 'Utilities', description: 'Central Water & Solar street Lights' },
      { title: 'Security', description: '24/7 Guardhouse & CCTV' },
      { title: 'Title', description: 'Certificate of Occupancy (C of O)' }
    ],
    nearbyFacilities: [
      { category: 'Governance', name: 'Maitama Diplomatic Quarter', distance: '10 mins' },
      { category: 'Healthcare', name: 'Maitama District Hospital', distance: '8 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Plot', value: '₦70,000,000 – ₦90,000,000', outlook: 'Premium Appreciation' },
      { metric: '1,000 SQM Plot', value: '₦130,000,000 – ₦160,000,000', outlook: 'Ultra-Premium Tier' }
    ],
    plotSizes: [
      { size: '200 SQM', dimensions: '20m × 10m', availability: 'Available' },
      { size: '250 SQM', dimensions: '25m × 10m', availability: 'Available' },
      { size: '450 SQM', dimensions: '22.5m × 20m', availability: 'Available' },
      { size: '650 SQM', dimensions: '32.5m × 20m', availability: 'Available' },
      { size: '750 SQM', dimensions: '37.5m × 20m', availability: 'Limited' },
      { size: '800 SQM', dimensions: '40m × 20m', availability: 'Limited' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Limited' }
    ],
    houseTypeIds: ['imperial-emerald', 'royal-emerald'],
    status: 'active',
    location: 'Maitama II, Abuja',
    state: 'Abuja',
    neighborhood: 'Maitama',
    updatesLink: '/projects/maitama-ii-estate',
    createdAt: new Date().toISOString()
  },
  {
    id: 'gousa-idu-district',
    name: 'Gousa Idu District',
    tagline: 'A strategic, low-density smart community near Abuja\'s industrial and railway hub.',
    description: 'Gousa Idu District is engineered for proximity to Abuja\'s growing industrial corridor. Mapped for plots up to 1,200 SQM, the estate supports a full range of properties, including blocks of flats, detached duplexes, and 7-bedroom luxury mansions, all backed by 24-hour security and clean water systems.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Proximity to Idu Industrial & Rail Hub',
      'Expansive Mansion Plots up to 1200 SQM',
      'Tarred Road Networks & Smart Drainage',
      'Central Water Treatment Systems',
      '24/7 Security Gatehouse Patrol'
    ],
    realEstateVibe: [
      { title: 'Location', description: 'Idu Industrial Axis Proximity' },
      { title: 'Transport', description: 'Idu Rail Station - 8 mins' },
      { title: 'Infrastructure', description: 'Independent Road & Solar Networks' },
      { title: 'Scale', description: 'Low Density Estate Mapped Up to 1200 SQM' }
    ],
    nearbyFacilities: [
      { category: 'Transport', name: 'Idu Railway Station', distance: '8 mins' },
      { category: 'Governance', name: 'Science and Tech Park Idu', distance: '5 mins' },
      { category: 'Healthcare', name: 'Turkish Hospital Abuja', distance: '12 mins' }
    ],
    marketSnapshot: [
      { metric: '500 SQM Plot', value: '₦22,000,000 – ₦30,000,000', outlook: 'Industrial Growth Zone' },
      { metric: '1,000 SQM Plot', value: '₦45,000,000 – ₦60,000,000', outlook: 'Strong Yield Potentials' }
    ],
    plotSizes: [
      { size: '200 SQM', dimensions: '20m × 10m', availability: 'Available' },
      { size: '250 SQM', dimensions: '25m × 10m', availability: 'Available' },
      { size: '450 SQM', dimensions: '22.5m × 20m', availability: 'Available' },
      { size: '500 SQM', dimensions: '25m × 20m', availability: 'Available' },
      { size: '650 SQM', dimensions: '32.5m × 20m', availability: 'Available' },
      { size: '750 SQM', dimensions: '37.5m × 20m', availability: 'Limited' },
      { size: '1,000 SQM', dimensions: '40m × 25m', availability: 'Limited' },
      { size: '1,200 SQM', dimensions: '40m × 30m', availability: 'Limited' }
    ],
    houseTypeIds: ['imperial-emerald', 'royal-emerald', 'blue-sapphire'],
    status: 'active',
    location: 'Gousa Idu District, Abuja',
    state: 'Abuja',
    neighborhood: 'Idu',
    updatesLink: '/projects/gousa-idu-district',
    createdAt: new Date().toISOString()
  },
  {
    id: 'giri-estate',
    name: 'Giri Estate',
    tagline: 'Affordable smart bungalows in Giri, designed to make reliable housing accessible.',
    description: 'Giri Estate is Wisdom Kwati\'s commitment to bridging the housing deficit for middle-income earners in the FCT. Located along the airport road corridor, it features 2 and 3-bedroom smart bungalows on 300 SQM plots, fully equipped with estate security, clean water, and solar-powered street lighting.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    highlights: [
      'Airport Road Corridor Proximity',
      'Affordable 2 & 3-Bedroom Smart Bungalows',
      'Solar-Powered Street Lights',
      'Gated Entry with 24-Hour security',
      'Independent Water Supply Access'
    ],
    realEstateVibe: [
      { title: 'Affordability', description: 'High-Value Entry-Level Tier' },
      { title: 'Layout', description: 'Detached Smart Bungalows' },
      { title: 'Security', description: 'Gated Community' },
      { title: 'Access', description: 'Direct Airport Road Corridor' }
    ],
    nearbyFacilities: [
      { category: 'Transport', name: 'Airport Road Expressway', distance: '3 mins' },
      { category: 'Education', name: 'University of Abuja Giri Campus', distance: '6 mins' },
      { category: 'Healthcare', name: 'UniAbuja Teaching Hospital', distance: '12 mins' }
    ],
    marketSnapshot: [
      { metric: '300 SQM Plot + Bungalow', value: '₦12,000,000 – ₦16,000,000', outlook: 'Stable End-User Market' }
    ],
    plotSizes: [
      { size: '300 SQM', dimensions: '20m × 15m', availability: 'Available' }
    ],
    houseTypeIds: ['black-onyx', 'red-onyx'],
    status: 'active',
    location: 'Giri, Abuja',
    state: 'Abuja',
    neighborhood: 'Giri',
    updatesLink: '/projects/giri-estate',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ph-ipo-1',
    name: 'Port Harcourt IPO 1',
    tagline: 'A secure, high-growth investment land district in Port Harcourt IPO 1.',
    description: 'PH - IPO 1 is a strategic land development in Port Harcourt, offering serviced plots of 300 and 465 SQM. Mapped for rapid capital appreciation, the estate features concrete interlocked internal roads, central water treatment, solar lighting, and 24-hour gated security control.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    highlights: [
      'High-Appreciation Oil Corridor Land',
      'C of O Serviced Plots (300 & 465 SQM)',
      'Solar Street Lights & Security Patrols',
      'Water Treatment Plant On-site',
      'Concrete Interlocked Road Systems'
    ],
    realEstateVibe: [
      { title: 'Land Title', description: 'Certificate of Occupancy (C of O)' },
      { title: 'Purpose', description: 'Serviced Plots / High Appreciation' },
      { title: 'Utilities', description: 'Solar & Central Water Plant' },
      { title: 'Security', description: 'Gated Patrol Team' }
    ],
    nearbyFacilities: [
      { category: 'Commerce', name: 'PH Greater City Expansion Zone', distance: '10 mins' },
      { category: 'Transport', name: 'East-West Road Expressway', distance: '15 mins' }
    ],
    marketSnapshot: [
      { metric: '300 SQM Plot', value: '₦10,000,000 – ₦14,000,000', outlook: 'High appreciation Rate' },
      { metric: '465 SQM Plot', value: '₦15,000,000 – ₦20,000,000', outlook: 'High Investor Growth' }
    ],
    plotSizes: [
      { size: '300 SQM', dimensions: '20m × 15m', availability: 'Available' },
      { size: '465 SQM', dimensions: '23.25m × 20m', availability: 'Available' }
    ],
    houseTypeIds: [],
    status: 'active',
    location: 'PH - IPO 1, Port Harcourt, Rivers State',
    state: 'Rivers',
    neighborhood: 'IPO 1',
    updatesLink: '/projects/ph-ipo-1',
    createdAt: new Date().toISOString()
  },
  {
    id: 'ph-abara-etche',
    name: 'Port Harcourt Abara-Etche',
    tagline: 'Strategic residential and commercial land plots in Port Harcourt\'s Abara-Etche corridor.',
    description: 'PH - Abara-Etche brings Wisdom Kwati\'s smart layout infrastructure to Rivers State\'s fastest-growing expansion axis. Offering 300 and 465 SQM serviced land plots, it guarantees central water treatment, solar-powered streets, and round-the-clock gated security.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200',
    highlights: [
      'Port Harcourt East Expansion Axis',
      'Fully Serviced Residential Land Plots',
      'Independent Water Treatment Plant',
      'Solar street Lights & Gated Security',
      'Durable Drainage System Completed'
    ],
    realEstateVibe: [
      { title: 'Region', description: 'Port Harcourt East Corridor' },
      { title: 'Product', description: 'Fully Serviced Investment Land' },
      { title: 'Security', description: '24/7 Gated Perimeter Manned' },
      { title: 'Utilities', description: 'Independent Solar & Water treatment' }
    ],
    nearbyFacilities: [
      { category: 'Education', name: 'Rivers State University Extension', distance: '12 mins' },
      { category: 'Transport', name: 'Airport Road Junction', distance: '18 mins' }
    ],
    marketSnapshot: [
      { metric: '300 SQM Plot', value: '₦8,000,000 – ₦12,000,000', outlook: 'Early-Buyer Opportunity' },
      { metric: '465 SQM Plot', value: '₦12,000,000 – ₦18,000,000', outlook: 'Steady Appreciation' }
    ],
    plotSizes: [
      { size: '300 SQM', dimensions: '20m × 15m', availability: 'Available' },
      { size: '465 SQM', dimensions: '23.25m × 20m', availability: 'Available' }
    ],
    houseTypeIds: [],
    status: 'active',
    location: 'PH - Abara-Etche, Port Harcourt, Rivers State',
    state: 'Rivers',
    neighborhood: 'Abara-Etche',
    updatesLink: '/projects/ph-abara-etche',
    createdAt: new Date().toISOString()
  },
  {
    id: 'sangere-numa',
    name: 'Sangere Numa',
    tagline: 'Northern innovation meets tradition in Yola\'s premier smart bungalow community.',
    description: 'Sangere Numa is Wisdom Kwati\'s landmark estate in Adamawa State, built to provide modern smart living in the North. Spanning 300 to 850 SQM plots, it features 2 and 3-bedroom bungalows equipped with solar-powered street lights, central water treatment, and gated security patrols.',
    heroImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200',
    highlights: [
      'Yola\'s Premier Smart Bungalow Estate',
      '300 to 850 SQM Serviced Plots',
      'Solar-Powered Street Lighting',
      'Water Treatment Systems On-site',
      '24/7 Guarded Manned Gatehouse'
    ],
    realEstateVibe: [
      { title: 'Region', description: 'Yola Smart Residential' },
      { title: 'Density', description: 'Low-Density Bungalow Layout' },
      { title: 'Utilities', description: 'On-site Water treatment & Solar' },
      { title: 'Security', description: 'Manned gatehouse Patrols' }
    ],
    nearbyFacilities: [
      { category: 'Education', name: 'Federal University of Technology Yola', distance: '10 mins' },
      { category: 'Aviation', name: 'Yola International Airport', distance: '15 mins' },
      { category: 'Healthcare', name: 'Federal Medical Centre Yola', distance: '12 mins' }
    ],
    marketSnapshot: [
      { metric: '300 SQM Plot + Bungalow', value: '₦15,000,000 – ₦22,000,000', outlook: 'Steady Regional Demand' },
      { metric: '450 SQM Plot + Bungalow', value: '₦22,000,000 – ₦30,000,000', outlook: 'Premium Family Growth' }
    ],
    plotSizes: [
      { size: '300 SQM', dimensions: '20m × 15m', availability: 'Available' },
      { size: '450 SQM', dimensions: '22.5m × 20m', availability: 'Available' },
      { size: '850 SQM', dimensions: '34m × 25m', availability: 'Limited' }
    ],
    houseTypeIds: ['black-onyx', 'red-onyx'],
    status: 'active',
    location: 'Sangere Numa, Yola, Adamawa State',
    state: 'Adamawa',
    neighborhood: 'Jimeta',
    updatesLink: '/projects/sangere-numa',
    createdAt: new Date().toISOString()
  }
];

async function seed() {
  console.log(`\nSeeding ${projects.length} projects to Firestore...\n`);

  for (const project of projects) {
    const { id, ...data } = project;
    try {
      await setDoc(doc(db, 'projects', id), data, { merge: true });
      console.log(`  ✅ ${id} — "${data.name}"`);
    } catch (err) {
      console.error(`  ❌ ${id} — Failed: ${err.message}`);
    }
  }

  console.log('\n✅ All projects seeded successfully!\n');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
