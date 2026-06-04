'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc, updateDoc, collection, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const DEFAULT_ADVISORS = {
  'samuel-kwati': {
    name: 'Samuel Kwati',
    role: 'Lead Property Specialist',
    email: 's.kwati@wisdomkwatismartcity.com',
    phone: '+234 810 002 5555',
    image: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa%26sz=w1200',
    quote: 'The HOF Community offers an exceptional balance of luxury and community living in one of Abuja\'s most desirable districts.',
    whatsapp: 'https://wa.me/2348100025555',
    bio: 'Lead property advisor specializing in smart architectural designs and luxury perimeter investments throughout Abuja and Port Harcourt.',
    createdAt: new Date().toISOString()
  },
  'fatima-usman': {
    name: 'Fatima Usman',
    role: 'Yola Region Specialist',
    email: 'f.usman@wisdomkwatismartcity.com',
    phone: '+234 810 002 5555',
    image: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa%26sz=w1200',
    quote: 'Experience the security and luxury of a smart city right here in Yola. Join our growing community at Sunbrook Estate.',
    whatsapp: 'https://wa.me/2348100025555',
    bio: 'Experienced real estate specialist focused on premium residential smart developments across the Yola region.',
    createdAt: new Date().toISOString()
  }
};

const STATIC_PROJECT_DEFAULTS = {
  'wisdom-kwati-smart-city': {
    highlights: [
      "Flagship smart megacity infrastructure",
      "100% renewable energy integration",
      "Advanced AI traffic and security systems",
      "World-class commercial and leisure hubs",
      "Premium ultra-modern residential zones"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Right of Occupancy (R of O)" },
      { category: "Security Level", details: "Maximum / City-Wide AI" },
      { category: "Infrastructure", details: "Ultra-Modern Smart Grid" },
      { category: "Atmosphere", details: "Futuristic / Premium / Majestic" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "Karshi General Hospital", travelTime: "10 mins" },
      { category: "Shopping", establishment: "Future WKSC Mega Mall", travelTime: "0 mins" },
      { category: "Aviation", establishment: "Nnamdi Azikiwe Int. Airport", travelTime: "45 mins" },
      { category: "Education", establishment: "Future WKSC University", travelTime: "0 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦50M – ₦100M", outlook: "High Capital Appreciation" },
      { plotCategory: "Premium Plots", priceRange: "₦120M – ₦250M", outlook: "Exclusive Views" },
      { plotCategory: "Commercial Lots", priceRange: "₦300M+", outlook: "Developer Grade Investment" }
    ],
    plotSizes: [
      { plotType: "Starter Plot", dimensions: "12m × 25m", area: "300 sqm", availability: "Available" },
      { plotType: "Standard Plot", dimensions: "15m × 30m", area: "450 sqm", availability: "Available" },
      { plotType: "Executive Plot", dimensions: "18m × 36m", area: "648 sqm", availability: "Limited" }
    ]
  },
  'katampe-extension': {
    highlights: [
      "Underground power cabling system (Zero overhead wires)",
      "Dedicated fibre-optic backbone for high-speed internet",
      "Advanced storm drainage and erosion control engineering",
      "24/7 Rapid Response security patrols & CCTV perimeter",
      "Eco-friendly waste management & central sewage treatment"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Certificate of Occupancy (C of O)" },
      { category: "Security Level", details: "Military-Grade Perimeter / Smart AI Surveillance" },
      { category: "Infrastructure", details: "Advanced Smart Grid / Underground Utilities" },
      { category: "Atmosphere", details: "Elite / Architectural / High-Privacy" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "Turkish Nizamye Hospital", travelTime: "10 mins" },
      { category: "Shopping", establishment: "Jabi Lake Mall", travelTime: "15 mins" },
      { category: "Aviation", establishment: "Nnamdi Azikiwe Int'l Airport", travelTime: "35 mins" },
      { category: "Education", establishment: "The Regent Secondary School", travelTime: "12 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦45M – ₦90M", outlook: "High Demand / Fast Absorption" },
      { plotCategory: "Corner Plots", priceRange: "₦95M – ₦160M", outlook: "Premium Location Uplift" },
      { plotCategory: "Estate Lots (Bulk)", priceRange: "₦200M – ₦500M+", outlook: "Developer & Investor Grade" }
    ],
    plotSizes: [
      { plotType: "Starter Plot", dimensions: "15m × 30m", area: "450 sqm", availability: "Available" },
      { plotType: "Standard Plot", dimensions: "18m × 36m", area: "648 sqm", availability: "Available" },
      { plotType: "Executive Plot", dimensions: "20m × 40m", area: "800 sqm", availability: "Limited" },
      { plotType: "Grand Estate Lot", dimensions: "30m × 60m", area: "1,800 sqm", availability: "On Request" }
    ]
  },
  'karsana-district': {
    highlights: [
      "Solar-powered street lighting & common area grids",
      "Centralized smart water management & filtration",
      "Dedicated pedestrian walkways and bicycle lanes",
      "Automated access control & 24/7 security monitoring",
      "Community parks with children's play zones & sports courts"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Right of Occupancy (R of O)" },
      { category: "Security Level", details: "Smart Guard Patrols / Gated" },
      { category: "Infrastructure", details: "Eco-Integrated & Sustainable" },
      { category: "Atmosphere", details: "Family-Friendly / Serene" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "Limi Hospital", travelTime: "12 mins" },
      { category: "Shopping", establishment: "Next Cash & Carry", travelTime: "8 mins" },
      { category: "Aviation", establishment: "Nnamdi Azikiwe International", travelTime: "40 mins" },
      { category: "Transport", establishment: "Abuja Metro Rail Station", travelTime: "15 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦25M – ₦55M", outlook: "High Demand / Fast Absorption" },
      { plotCategory: "Corner Plots", priceRange: "₦60M – ₦100M", outlook: "Premium Location Uplift" },
      { plotCategory: "Estate Lots (Bulk)", priceRange: "₦120M – ₦300M+", outlook: "Developer & Investor Grade" }
    ],
    plotSizes: [
      { plotType: "Starter Plot", dimensions: "12m × 24m", area: "288 sqm", availability: "Available" },
      { plotType: "Standard Plot", dimensions: "15m × 30m", area: "450 sqm", availability: "Available" },
      { plotType: "Executive Plot", dimensions: "18m × 36m", area: "648 sqm", availability: "Limited" },
      { plotType: "Grand Estate Lot", dimensions: "25m × 50m", area: "1,250 sqm", availability: "On Request" }
    ]
  },
  'mabushi-district': {
    highlights: [
      "Paved inner-ring road boulevards",
      "Centralized fiber-optic internet connection",
      "Advanced smart street lighting systems",
      "24/7 Gated security & AI access control",
      "Walking distance to major commercial hubs"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Certificate of Occupancy (C of O)" },
      { category: "Security Level", details: "High-fidelity Perimeter / Gated" },
      { category: "Infrastructure", details: "Urban Smart Utility Grid" },
      { category: "Atmosphere", details: "Dynamic / Central / Secure" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "Limi Hospital", travelTime: "8 mins" },
      { category: "Shopping", establishment: "Next Cash & Carry", travelTime: "5 mins" },
      { category: "Aviation", establishment: "Airport", travelTime: "35 mins" },
      { category: "Education", establishment: "Creative Learning School", travelTime: "10 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦40M – ₦85M", outlook: "Stable Investment Growth" },
      { plotCategory: "Corner Plots", priceRange: "₦90M – ₦150M", outlook: "High Commercial Value" },
      { plotCategory: "Estate Lots (Bulk)", priceRange: "₦200M – ₦450M+", outlook: "Prime Development Grade" }
    ],
    plotSizes: [
      { plotType: "Residential Plot", dimensions: "15m × 30m", area: "450 sqm", availability: "Available" },
      { plotType: "Standard Plot", dimensions: "18m × 36m", area: "648 sqm", availability: "Available" },
      { plotType: "Commercial lot", dimensions: "20m × 40m", area: "800 sqm", availability: "Limited" }
    ]
  },
  'guzape-estate': {
    highlights: [
      "Premium hilltop infrastructure with panoramic views",
      "Gated elite community with automated access",
      "Advanced smart grid & underground utilities",
      "Exclusive clubhouses and private recreational zones",
      "24/7 High-fidelity security patrols"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Certificate of Occupancy (C of O)" },
      { category: "Security Level", details: "Elite Gated / AI Perimeter" },
      { category: "Infrastructure", details: "Ultra-Premium Smart Grid" },
      { category: "Atmosphere", details: "Prestigious / Serene / Private" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "National Hospital", travelTime: "12 mins" },
      { category: "Shopping", establishment: "Abuja Central Area", travelTime: "15 mins" },
      { category: "Aviation", establishment: "Airport", travelTime: "40 mins" },
      { category: "Education", establishment: "British Nigerian Academy", travelTime: "10 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦80M – ₦150M", outlook: "Rapid Capital Appreciation" },
      { plotCategory: "Corner Plots", priceRange: "₦160M – ₦250M", outlook: "Ultra-Premium Demand" },
      { plotCategory: "Estate Lots (Bulk)", priceRange: "₦300M – ₦800M+", outlook: "Investment Portfolios" }
    ],
    plotSizes: [
      { plotType: "Standard Plot", dimensions: "18m × 36m", area: "648 sqm", availability: "Available" },
      { plotType: "Executive Plot", dimensions: "20m × 40m", area: "800 sqm", availability: "Available" },
      { plotType: "Grand Mansion Plot", dimensions: "30m × 60m", area: "1800 sqm", availability: "Limited" }
    ]
  },
  'palm-haven': {
    highlights: [
      "Modern mid-rise smart apartments",
      "High-speed fiber-optic connectivity",
      "Tropical landscaped community areas",
      "24/7 power and security surveillance",
      "Integrated smart lighting and cooling"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Right of Occupancy (R of O)" },
      { category: "Security Level", details: "High / Gated Access" },
      { category: "Infrastructure", details: "Modern Smart Utility Grid" },
      { category: "Atmosphere", details: "Vibrant / Tropical / Modern" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "Apo General Hospital", travelTime: "10 mins" },
      { category: "Shopping", establishment: "Shoprite Apo", travelTime: "15 mins" },
      { category: "Aviation", establishment: "Nnamdi Azikiwe Int. Airport", travelTime: "35 mins" },
      { category: "Education", establishment: "Premium International Schools", travelTime: "10 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Apartment Units", priceRange: "₦30M – ₦60M", outlook: "High Rental Yield" },
      { plotCategory: "Penthouses", priceRange: "₦80M – ₦120M", outlook: "Exclusive Views" },
      { plotCategory: "Estate Lots (Bulk)", priceRange: "₦200M+", outlook: "Developer Grade Investment" }
    ],
    plotSizes: [
      { plotType: "Starter Plot", dimensions: "12m × 25m", area: "300 sqm", availability: "Available" },
      { plotType: "Standard Plot", dimensions: "15m × 30m", area: "450 sqm", availability: "Available" },
      { plotType: "Executive Plot", dimensions: "18m × 36m", area: "648 sqm", availability: "Limited" }
    ]
  },
  'maitama-district': {
    highlights: [
      "Military-grade perimeter security & drone patrols",
      "Ultra-premium smart utility grid (24/7 Power)",
      "Dedicated ultra-high-speed fiber network",
      "Elite private parks & exclusive boulevards",
      "Automated access control & smart waste systems"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Certificate of Occupancy (C of O)" },
      { category: "Security Level", details: "Ultra-Elite / Armed Response" },
      { category: "Infrastructure", details: "Full-Scale Smart Grid" },
      { category: "Atmosphere", details: "Regal / Private / Exclusive" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "Maitama District Hospital", travelTime: "10 mins" },
      { category: "Shopping", establishment: "Transcorp Hilton Arcade", travelTime: "12 mins" },
      { category: "Aviation", establishment: "Airport", travelTime: "45 mins" },
      { category: "Education", establishment: "International Community School", travelTime: "15 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦100M – ₦200M", outlook: "Stable Elite Demand" },
      { plotCategory: "Corner Plots", priceRange: "₦220M – ₦350M", outlook: "High Asset Recognition" },
      { plotCategory: "Estate Lots (Bulk)", priceRange: "₦500M – ₦1.2B+", outlook: "Global Investment Grade" }
    ],
    plotSizes: [
      { plotType: "Executive Plot", dimensions: "20m × 40m", area: "800 sqm", availability: "Available" },
      { plotType: "Grand Estate Plot", dimensions: "30m × 60m", area: "1800 sqm", availability: "Available" },
      { plotType: "Ambassadorial Lot", dimensions: "50m × 100m", area: "5000 sqm", availability: "On Request" }
    ]
  },
  'royal-city': {
    highlights: [
      "Grand detached architectural designs",
      "Maximum security and AI surveillance",
      "Underground premium utility networks",
      "Exclusive clubhouse and sports facilities",
      "Lush, manicured streetscapes"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Right of Occupancy (R of O)" },
      { category: "Security Level", details: "Maximum / Gated Access" },
      { category: "Infrastructure", details: "Premium Smart Utility Grid" },
      { category: "Atmosphere", details: "Majestic / Exclusive / Grand" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "Kuje General Hospital", travelTime: "15 mins" },
      { category: "Shopping", establishment: "Local Shopping Malls", travelTime: "10 mins" },
      { category: "Aviation", establishment: "Nnamdi Azikiwe Int. Airport", travelTime: "25 mins" },
      { category: "Education", establishment: "Premium International Schools", travelTime: "15 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦30M – ₦60M", outlook: "High Capital Appreciation" },
      { plotCategory: "Premium Plots", priceRange: "₦70M – ₦100M", outlook: "Exclusive Views" },
      { plotCategory: "Estate Lots (Bulk)", priceRange: "₦200M+", outlook: "Developer Grade Investment" }
    ],
    plotSizes: [
      { plotType: "Starter Plot", dimensions: "12m × 25m", area: "300 sqm", availability: "Available" },
      { plotType: "Standard Plot", dimensions: "15m × 30m", area: "450 sqm", availability: "Available" },
      { plotType: "Executive Plot", dimensions: "18m × 36m", area: "648 sqm", availability: "Limited" }
    ]
  },
  'beverly-hills': {
    highlights: [
      "Gated premium security community",
      "Underground power and fiber-optic networks",
      "Lush recreational parks and green spaces",
      "Advanced smart home integration readiness",
      "Exclusive club house and sports facilities"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Right of Occupancy (R of O)" },
      { category: "Security Level", details: "Maximum / AI Surveillance" },
      { category: "Infrastructure", details: "Premium Smart Grid" },
      { category: "Atmosphere", details: "Exclusive / Serene / Luxurious" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "Kuje General Hospital", travelTime: "15 mins" },
      { category: "Shopping", establishment: "Local Markets", travelTime: "10 mins" },
      { category: "Aviation", establishment: "Nnamdi Azikiwe Int. Airport", travelTime: "20 mins" },
      { category: "Education", establishment: "Premium International Schools", travelTime: "15 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦40M – ₦80M", outlook: "High Capital Appreciation" },
      { plotCategory: "Premium Plots", priceRange: "₦90M – ₦150M", outlook: "Exclusive Views" },
      { plotCategory: "Estate Lots (Bulk)", priceRange: "₦200M – ₦500M+", outlook: "Developer Grade Investment" }
    ],
    plotSizes: [
      { plotType: "Starter Plot", dimensions: "12m × 25m", area: "300 sqm", availability: "Available" },
      { plotType: "Standard Plot", dimensions: "15m × 30m", area: "450 sqm", availability: "Available" },
      { plotType: "Executive Plot", dimensions: "18m × 36m", area: "648 sqm", availability: "Limited" }
    ]
  },
  'lakeside-view': {
    highlights: [
      "Waterfront promenades and lush parks",
      "Gated secure perimeter with AI surveillance",
      "Smart home ready infrastructure",
      "Dedicated leisure and clubhouse facilities",
      "Eco-friendly waste and water management"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Right of Occupancy (R of O)" },
      { category: "Security Level", details: "High / Gated Access" },
      { category: "Infrastructure", details: "Modern Smart Utility Grid" },
      { category: "Atmosphere", details: "Tranquil / Natural / Serene" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "Kuje General Hospital", travelTime: "15 mins" },
      { category: "Shopping", establishment: "Local Shopping Malls", travelTime: "10 mins" },
      { category: "Aviation", establishment: "Nnamdi Azikiwe Int. Airport", travelTime: "25 mins" },
      { category: "Education", establishment: "Premium International Schools", travelTime: "15 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦20M – ₦50M", outlook: "High Capital Appreciation" },
      { plotCategory: "Waterfront Plots", priceRange: "₦60M – ₦90M", outlook: "Exclusive Views" },
      { plotCategory: "Estate Lots (Bulk)", priceRange: "₦150M+", outlook: "Developer Grade Investment" }
    ],
    plotSizes: [
      { plotType: "Starter Plot", dimensions: "12m × 25m", area: "300 sqm", availability: "Available" },
      { plotType: "Standard Plot", dimensions: "15m × 30m", area: "450 sqm", availability: "Available" },
      { plotType: "Executive Plot", dimensions: "18m × 36m", area: "648 sqm", availability: "Limited" }
    ]
  },
  'sunbrook-estate': {
    highlights: [
      "Solar-integrated street lighting & common grids",
      "Gated elite community with 24/7 security patrols",
      "Dedicated high-speed fiber internet backbone",
      "Paved internal roads with smart drainage",
      "Centrally located near academic and transport hubs"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Certificate of Occupancy (C of O)" },
      { category: "Security Level", details: "High / Gated community" },
      { category: "Infrastructure", details: "Modern Smart Grid Utility" },
      { category: "Atmosphere", details: "Peaceful / Community / Secure" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "FMC Yola", travelTime: "15 mins" },
      { category: "Shopping", establishment: "Jimeta Shopping Complex", travelTime: "20 mins" },
      { category: "Aviation", establishment: "Yola Airport", travelTime: "10 mins" },
      { category: "Education", establishment: "MAUTECH / AUN", travelTime: "10 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦5M – ₦12M", outlook: "High Appreciation Potential" },
      { plotCategory: "Corner Plots", priceRange: "₦15M – ₦25M", outlook: "Prime Residential Value" },
      { plotCategory: "Estate Lots (Bulk)", priceRange: "₦50M – ₦100M+", outlook: "Investor Grade Portfolios" }
    ],
    plotSizes: [
      { plotType: "Starter Plot", dimensions: "15m × 30m", area: "450 sqm", availability: "Available" },
      { plotType: "Executive Plot", dimensions: "20m × 40m", area: "800 sqm", availability: "Available" },
      { plotType: "Ambassadorial Lot", dimensions: "30m × 60m", area: "1800 sqm", availability: "Limited" }
    ]
  },
  'fintiri-extension': {
    highlights: [
      "Solar-integrated street lighting & common grids",
      "Gated elite community with 24/7 security patrols",
      "Dedicated high-speed fiber internet backbone",
      "Paved internal roads with smart drainage",
      "Centrally located near academic and transport hubs"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Certificate of Occupancy (C of O)" },
      { category: "Security Level", details: "High / Gated community" },
      { category: "Infrastructure", details: "Modern Smart Grid Utility" },
      { category: "Atmosphere", details: "Peaceful / Community / Secure" }
    ],
    nearbyFacilities: [
      { category: "Health", establishment: "FMC Yola", travelTime: "15 mins" },
      { category: "Shopping", establishment: "Jimeta Shopping Complex", travelTime: "20 mins" },
      { category: "Aviation", establishment: "Yola Airport", travelTime: "10 mins" },
      { category: "Education", establishment: "MAUTECH / AUN", travelTime: "10 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦5M – ₦12M", outlook: "High Appreciation Potential" },
      { plotCategory: "Corner Plots", priceRange: "₦15M – ₦25M", outlook: "Prime Residential Value" },
      { plotCategory: "Estate Lots (Bulk)", priceRange: "₦50M – ₦100M+", outlook: "Investor Grade Portfolios" }
    ],
    plotSizes: [
      { plotType: "Starter Plot", dimensions: "15m × 30m", area: "450 sqm", availability: "Available" },
      { plotType: "Executive Plot", dimensions: "20m × 40m", area: "800 sqm", availability: "Available" },
      { plotType: "Ambassadorial Lot", dimensions: "30m × 60m", area: "1800 sqm", availability: "Limited" }
    ]
  },
  'hof-community': {
    highlights: [
      "Prime Life Camp location with excellent road networks",
      "24/7 high-level security and surveillance",
      "Modern architectural design and premium finishes",
      "Consistent power supply and treated water systems",
      "Proximity to shopping malls, schools, and hospitals"
    ],
    realEstateVibe: [
      { category: "Primary Title", details: "Right of Occupancy (R of O)" },
      { category: "Security Level", details: "Premium Gated / 24hr Patrol" },
      { category: "Infrastructure", details: "Modern Underground Drainage & Paved Roads" },
      { category: "Atmosphere", details: "Serene / Upscale / Community-Focused" }
    ],
    nearbyFacilities: [
      { category: "Shopping", establishment: "Jabi Lake Mall", travelTime: "10 mins" },
      { category: "Health", establishment: "Turkish Hospital", travelTime: "12 mins" },
      { category: "Leisure", establishment: "Idu Golf Course", travelTime: "15 mins" },
      { category: "Aviation", establishment: "Nnamdi Azikiwe Int. Airport", travelTime: "30 mins" }
    ],
    marketSnapshot: [
      { plotCategory: "Standard Plots", priceRange: "₦35M – ₦70M", outlook: "High Capital Appreciation" },
      { plotCategory: "Premium Plots", priceRange: "₦85M – ₦150M", outlook: "Exclusive Views" }
    ],
    plotSizes: [
      { plotType: "Starter Plot", dimensions: "12m × 25m", area: "300 sqm", availability: "Available" },
      { plotType: "Standard Plot", dimensions: "15m × 30m", area: "450 sqm", availability: "Available" }
    ]
  }
};

const DEFAULT_HOUSE_TYPES_BY_PROJECT = {
  'wisdom-kwati-smart-city': ['blue-sapphire', 'imperial-emerald'],
  'katampe-extension': ['star-sapphire', 'blue-sapphire', 'imperial-emerald', 'jade-terrace', 'quartz-terrace'],
  'karsana-district': ['blue-sapphire', 'imperial-emerald', 'jade-terrace', 'quartz-terrace'],
  'mabushi-district': ['white-sapphire', 'imperial-emerald'],
  'guzape-estate': ['royal-emerald', 'blue-sapphire', 'imperial-emerald'],
  'palm-haven': ['silver-pearl', 'white-pearl'],
  'maitama-district': ['imperial-emerald'],
  'royal-city': ['blue-sapphire', 'white-sapphire'],
  'beverly-hills': ['blue-sapphire', 'white-sapphire'],
  'lakeside-view': ['blue-sapphire', 'white-sapphire'],
  'sunbrook-estate': ['black-onyx', 'red-onyx'],
  'fintiri-extension': ['black-onyx', 'red-onyx'],
  'fintiri-home-estate': ['black-onyx', 'red-onyx'],
  'palm-nicole': ['black-onyx', 'red-onyx'],
  'hof-community': ['silver-pearl', 'white-pearl']
};

const countWords = (str) => {
  if (!str) return 0;
  const clean = str.trim();
  if (clean === '') return 0;
  return clean.split(/\s+/).length;
};

export default function AdminEditProjectPage({ params }) {
  const router = useRouter();
  const { id } = use(params);

  // Standard inputs
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [mapEmbedUrl, setMapEmbedUrl] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [detailsImage, setDetailsImage] = useState('');
  const [updatesLink, setUpdatesLink] = useState('');
  const [advisorId, setAdvisorId] = useState('');
  const [selectedHouseTypeIds, setSelectedHouseTypeIds] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [draggedHTIndex, setDraggedHTIndex] = useState(null);
  const [dragOverHTIndex, setDragOverHTIndex] = useState(null);

  // Multi-array specs (Dynamic Row Builders)
  const [realEstateVibe, setRealEstateVibe] = useState([
    { category: 'Primary Title', details: '' },
    { category: 'Security Level', details: '' },
    { category: 'Payment Plan', details: '' }
  ]);
  const [highlights, setHighlights] = useState([]);
  const [nearbyFacilities, setNearbyFacilities] = useState([]);
  const [plotSizes, setPlotSizes] = useState([]);
  const [marketSnapshot, setMarketSnapshot] = useState([]);

  // Tmp row inputs
  const [highlightInput, setHighlightInput] = useState('');
  const [vibeInput, setVibeInput] = useState({ category: '', details: '' });
  const [facilityInput, setFacilityInput] = useState({ category: '', establishment: '', travelTime: '' });
  const [plotInput, setPlotInput] = useState({ plotType: '', dimensions: '', area: '', availability: '' });
  const [snapshotInput, setSnapshotInput] = useState({ plotCategory: '', priceRange: '', outlook: '' });

  // Database listings
  const [advisors, setAdvisors] = useState([]);
  const [houseTypes, setHouseTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadFormData() {
      try {
        // Load dependencies
        const advisorsSnap = await getDocs(collection(db, 'advisors'));
        const houseTypesSnap = await getDocs(collection(db, 'houseTypes'));
        
        let loadedAdvisors = advisorsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        let updatedAdvisors = [...loadedAdvisors];
        let didCreate = false;

        for (const [key, defAdv] of Object.entries(DEFAULT_ADVISORS)) {
          const exists = loadedAdvisors.some(a => a.name.toLowerCase() === defAdv.name.toLowerCase() || a.id === key);
          if (!exists) {
            try {
              await setDoc(doc(db, 'advisors', key), defAdv);
              updatedAdvisors.push({ id: key, ...defAdv });
              didCreate = true;
            } catch (err) {
              console.error(`Failed to auto-create advisor ${key}:`, err);
            }
          }
        }

        setAdvisors(updatedAdvisors);
        setHouseTypes(houseTypesSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        // Load project
        const projectRef = doc(db, 'projects', id);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          const data = projectSnap.data();
          setName(data.name || '');
          setTagline(data.tagline || '');
          setDescription(data.description || '');
          setLocation(data.location || '');
          setMapEmbedUrl(data.mapEmbedUrl || '');
          setHeroImage(data.heroImage || '');
          setDetailsImage(data.detailsImage || '');
          setUpdatesLink(data.updatesLink || '');
          setSortOrder(data.sortOrder !== undefined && data.sortOrder !== null ? String(data.sortOrder) : '');

          // Resolve State
          let resolvedState = 'Abuja'; 
          const locLower = (data.location || '').toLowerCase();
          const stateFieldLower = (data.state || '').toLowerCase();

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
            const parts = (data.location || '').split(',');
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
            const nameLower = (data.name || '').toLowerCase();
            if (nameLower.includes('katampe')) resolvedNeighborhood = 'Katampe Extension';
            else if (nameLower.includes('karsana')) resolvedNeighborhood = 'Karsana';
            else if (nameLower.includes('mabushi')) resolvedNeighborhood = 'Mabushi';
            else if (nameLower.includes('guzape')) resolvedNeighborhood = 'Guzape';
            else if (nameLower.includes('maitama')) resolvedNeighborhood = 'Maitama';
            else if (nameLower.includes('rumu-olumeni') || nameLower.includes('port court')) resolvedNeighborhood = 'Rumu-Olumeni';
            else if (nameLower.includes('ekpe') || nameLower.includes('epe')) resolvedNeighborhood = 'Epe';
          }

          setState(data.state || resolvedState);
          setNeighborhood(data.neighborhood || resolvedNeighborhood);
          
          // Determine default advisor based on project slug if not set in Firestore
          let defaultAdvisorId = '';
          const yolaRegionSlugs = ['sunbrook-estate', 'fintiri-extension', 'fintiri-home-estate', 'palm-nicole', 'karsana-district', 'kaduna-smart-district', 'gousa-idu-district', 'ph-rumu-olumeni'];
          if (yolaRegionSlugs.includes(id)) {
            defaultAdvisorId = 'fatima-usman';
          } else {
            defaultAdvisorId = 'samuel-kwati';
          }
          setAdvisorId(data.advisorId || defaultAdvisorId);
          
          const defaultHouseTypeIds = DEFAULT_HOUSE_TYPES_BY_PROJECT[id] || [];
          setSelectedHouseTypeIds(data.houseTypeIds && data.houseTypeIds.length > 0 ? data.houseTypeIds : defaultHouseTypeIds);
          
          const projectDefaults = STATIC_PROJECT_DEFAULTS[id] || {
            highlights: [
              "24/7 Smart Surveillance", 
              "Solar Grid Integration", 
              "Fibre-to-the-Home Broadband", 
              "Fully Paved Access Roads"
            ],
            realEstateVibe: [
              { category: "Infrastructure", details: "State-of-the-art underground utility networks, concrete storm water channels." },
              { category: "Security", details: "Biometric perimeter controls, AI vehicle scanning, smart security patrols." }
            ],
            nearbyFacilities: [
              { category: "Transport", establishment: "International Airport Bypass Route", travelTime: "15 Mins" },
              { category: "Healthcare", establishment: "Premiere District Hospital", travelTime: "8 Mins" }
            ],
            marketSnapshot: [
              { plotCategory: "500 SQM", priceRange: "₦45,000,000 - ₦60,000,000", outlook: "High-Growth Potential" }
            ],
            plotSizes: [
              { plotType: "Standard", dimensions: "25m × 20m", area: "500 SQM", availability: "Limited Availability" }
            ]
          };

          setHighlights(data.highlights?.length > 0 ? data.highlights : projectDefaults.highlights);
          
          setRealEstateVibe(data.realEstateVibe?.length > 0 ? data.realEstateVibe.map(v => ({
            category: v.category || v.title || '',
            details: v.details || v.description || ''
          })) : projectDefaults.realEstateVibe);

          setNearbyFacilities(data.nearbyFacilities?.length > 0 ? data.nearbyFacilities.map(f => ({
            category: f.category || 'Location',
            establishment: f.establishment || f.name || '',
            travelTime: f.travelTime || f.distance || ''
          })) : projectDefaults.nearbyFacilities);

          setMarketSnapshot(data.marketSnapshot?.length > 0 ? data.marketSnapshot.map(s => ({
            plotCategory: s.plotCategory || s.metric || '',
            priceRange: s.priceRange || s.value || '',
            outlook: s.outlook || ''
          })) : projectDefaults.marketSnapshot);

          setPlotSizes(data.plotSizes?.length > 0 ? data.plotSizes.map(p => ({
            plotType: p.plotType || p.size || '',
            dimensions: p.dimensions || '',
            area: p.area || '',
            availability: p.availability || 'Available'
          })) : projectDefaults.plotSizes);
        } else {
          setError('Project details not found in database.');
        }
      } catch (err) {
        console.error('Failed to load project details:', err);
        setError('Error fetching project record from database.');
      } finally {
        setLoading(false);
      }
    }
    loadFormData();
  }, [id]);

  // Highlights handlers
  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights(prev => [...prev, highlightInput.trim()]);
    setHighlightInput('');
  };
  const removeHighlight = (idx) => {
    setHighlights(prev => prev.filter((_, i) => i !== idx));
  };

  // Vibe handlers
  const addVibe = () => {
    if (!vibeInput.category || !vibeInput.details) return;
    setRealEstateVibe(prev => [...prev, vibeInput]);
    setVibeInput({ category: '', details: '' });
  };
  const removeVibe = (idx) => {
    setRealEstateVibe(prev => prev.filter((_, i) => i !== idx));
  };

  // Facility handlers
  const addFacility = () => {
    if (!facilityInput.category || !facilityInput.establishment || !facilityInput.travelTime) return;
    setNearbyFacilities(prev => [...prev, facilityInput]);
    setFacilityInput({ category: '', establishment: '', travelTime: '' });
  };
  const removeFacility = (idx) => {
    setNearbyFacilities(prev => prev.filter((_, i) => i !== idx));
  };

  // Plot size handlers
  const addPlot = () => {
    if (!plotInput.plotType || !plotInput.dimensions || !plotInput.area || !plotInput.availability) return;
    setPlotSizes(prev => [...prev, plotInput]);
    setPlotInput({ plotType: '', dimensions: '', area: '', availability: '' });
  };
  const removePlot = (idx) => {
    setPlotSizes(prev => prev.filter((_, i) => i !== idx));
  };

  // Snapshot handlers
  const addSnapshot = () => {
    if (!snapshotInput.plotCategory || !snapshotInput.priceRange || !snapshotInput.outlook) return;
    setMarketSnapshot(prev => [...prev, snapshotInput]);
    setSnapshotInput({ plotCategory: '', priceRange: '', outlook: '' });
  };
  const removeSnapshot = (idx) => {
    setMarketSnapshot(prev => prev.filter((_, i) => i !== idx));
  };

  // House Specifications selector toggle
  const toggleHouseType = (htId) => {
    setSelectedHouseTypeIds(prev => 
      prev.includes(htId) ? prev.filter(id => id !== htId) : [...prev, htId]
    );
  };

  // Selected House Types Drag & Drop handlers
  const handleHTDragStart = (e, idx) => {
    e.dataTransfer.setData('text/plain', idx.toString());
    setDraggedHTIndex(idx);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleHTDragOver = (e, idx) => {
    e.preventDefault();
    if (draggedHTIndex === null) return;
    if (dragOverHTIndex !== idx) {
      setDragOverHTIndex(idx);
    }
  };
  const handleHTDrop = (e, idx) => {
    e.preventDefault();
    const sourceIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (isNaN(sourceIdx) || sourceIdx === idx) {
      setDraggedHTIndex(null);
      setDragOverHTIndex(null);
      return;
    }
    const list = [...selectedHouseTypeIds];
    const dragged = list[sourceIdx];
    list.splice(sourceIdx, 1);
    list.splice(idx, 0, dragged);
    setSelectedHouseTypeIds(list);
    setDraggedHTIndex(null);
    setDragOverHTIndex(null);
  };
  const handleHTDragEnd = () => {
    setDraggedHTIndex(null);
    setDragOverHTIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || !state || !neighborhood) {
      setError('Please fill in required fields: Name, District Location, State, and Neighborhood.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const docRef = doc(db, 'projects', id);
      const projectPayload = {
        name,
        tagline: tagline || '',
        description: description || '',
        location,
        state,
        neighborhood,
        mapEmbedUrl: mapEmbedUrl || '',
        heroImage: heroImage || '',
        detailsImage: detailsImage || '',
        updatesLink: updatesLink || '',
        advisorId: advisorId || '',
        houseTypeIds: selectedHouseTypeIds,
        highlights,
        realEstateVibe,
        nearbyFacilities,
        plotSizes,
        marketSnapshot,
        sortOrder: sortOrder !== '' ? parseInt(sortOrder, 10) : 999,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(docRef, projectPayload);
      router.push('/admin/dashboard/projects');
    } catch (err) {
      console.error('Error saving project changes:', err);
      setError('Failed to update project changes in database.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-skeleton-spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <div className="admin-title-group">
          <h1>Edit Estate Details</h1>
          <p>Update landing cover views, nearby facility matrices, and link featured specifications for {name}.</p>
        </div>
        <Link href="/admin/dashboard/projects" className="admin-btn" style={{ textDecoration: 'none', width: 'auto', padding: '10px 20px' }}>
          ← Back to Estates
        </Link>
      </header>

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '12px 16px', borderRadius: '4px', marginBottom: '24px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Core details card */}
        <div className="admin-section-card" style={{ padding: '32px' }}>
          <h3 className="admin-section-title" style={{ marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
            1. Core Estate Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Routing Slug (Read-only)
              </label>
              <input
                type="text"
                value={id}
                disabled
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-secondary)', fontSize: '13px', outline: 'none', cursor: 'not-allowed' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Estate Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Murg City Estate"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                <span>Tagline / Sub-headline</span>
                <span style={{ color: (tagline.trim() !== '' && (countWords(tagline) < 8 || countWords(tagline) > 12)) ? '#EF4444' : 'inherit' }}>
                  {countWords(tagline)} words (Target: 8-12)
                </span>
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Architectural masterpiece nestled in premium high hills"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: (tagline.trim() !== '' && (countWords(tagline) < 8 || countWords(tagline) > 12)) ? '1px solid #EF4444' : '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                District Location Name *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Katampe Ext., Abuja"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                State *
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              >
                <option value="">Select State</option>
                <option value="Abuja">Abuja</option>
                <option value="Lagos">Lagos</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Rivers">Rivers</option>
                <option value="Adamawa">Adamawa</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Neighborhood *
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="e.g. Kuje, Asokoro, Katampe"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
              <span>Estate Overview / Description</span>
              <span style={{ color: countWords(description) > 45 ? '#EF4444' : 'inherit' }}>
                {countWords(description)}/45 words
              </span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Ellington Villa is the ultimate urban connector. Located at the heart of Abuja's inner ring road system..."
              rows={4}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: countWords(description) > 45 ? '1px solid #EF4444' : '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Hero Cover Image URL
              </label>
              <input
                type="url"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="https://images.unsplash.com/... or paste hosted link"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Archive Card Thumbnail
              </label>
              <input
                type="url"
                value={detailsImage}
                onChange={(e) => setDetailsImage(e.target.value)}
                placeholder="https://images.unsplash.com/... or paste hosted link"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Site Updates Link
              </label>
              <input
                type="text"
                value={updatesLink}
                onChange={(e) => setUpdatesLink(e.target.value)}
                placeholder="https://... (URL to site updates or gallery)"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Google Maps iframe Src URL
              </label>
              <input
                type="url"
                value={mapEmbedUrl}
                onChange={(e) => setMapEmbedUrl(e.target.value)}
                placeholder="e.g. https://www.google.com/maps/embed?pb=..."
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Display Order / Priority (Sort Order)
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                placeholder="e.g. 1 (smaller numbers appear first, defining which show on homepage)"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
              <span style={{ fontSize: '10px', color: 'var(--admin-text-secondary)', marginTop: '4px', display: 'block' }}>
                Defines sorting priority on the frontend. Lower values come first. The top 3 (first row) will automatically show on the homepage.
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic table row configurators */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          
          {/* Highlights */}
          <div className="admin-section-card" style={{ padding: '24px', gridColumn: '1 / -1' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>District Highlights</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div style={{ color: 'var(--admin-text-primary)' }}>{h}</div>
                  <button type="button" onClick={() => removeHighlight(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px' }}>&times;</button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="e.g. 24/7 Smart Surveillance"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addHighlight();
                  }
                }}
                style={{ flex: 1, padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <button 
                type="button" 
                onClick={addHighlight}
                style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: 'var(--admin-accent)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ADD
              </button>
            </div>
          </div>

          {/* Real estate vibes */}
          <div className="admin-section-card" style={{ padding: '24px' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>2. Real Estate Vibes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {realEstateVibe.map((v, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: 'var(--admin-accent)' }}>{v.category}</strong>
                      <div style={{ color: 'var(--admin-text-secondary)', marginTop: '2px' }}>{v.details || <em style={{ color: '#888' }}>Not specified</em>}</div>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeVibe(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px' }}>&times;</button>
                </div>
              ))}
            </div>

            {/* Row builder inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Category (e.g. Title Document)"
                value={vibeInput.category}
                onChange={(e) => setVibeInput(prev => ({ ...prev, category: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Details (e.g. C of O)"
                value={vibeInput.details}
                onChange={(e) => setVibeInput(prev => ({ ...prev, details: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
            </div>
            <button type="button" onClick={addVibe} className="admin-btn" style={{ width: '100%', fontSize: '11px', padding: '6px' }}>
              + Add Vibe Row
            </button>
          </div>

          {/* Nearby Facilities */}
          <div className="admin-section-card" style={{ padding: '24px' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>3. Nearby Facilities</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {nearbyFacilities.map((f, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', flex: 1 }}>
                    <div><strong>Category:</strong> {f.category}</div>
                    <div><strong>Place:</strong> {f.establishment}</div>
                    <div><strong>Time:</strong> <span style={{ color: 'var(--admin-accent)' }}>{f.travelTime}</span></div>
                  </div>
                  <button type="button" onClick={() => removeFacility(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px', marginLeft: '10px' }}>&times;</button>
                </div>
              ))}
            </div>

            {/* Row builder inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Category (e.g. Education)"
                value={facilityInput.category}
                onChange={(e) => setFacilityInput(prev => ({ ...prev, category: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Establishment (e.g. Shoprite)"
                value={facilityInput.establishment}
                onChange={(e) => setFacilityInput(prev => ({ ...prev, establishment: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Travel Time (e.g. 10 Mins)"
                value={facilityInput.travelTime}
                onChange={(e) => setFacilityInput(prev => ({ ...prev, travelTime: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
            </div>
            <button type="button" onClick={addFacility} className="admin-btn" style={{ width: '100%', fontSize: '11px', padding: '6px' }}>
              + Add Facility Row
            </button>
          </div>

        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          
          {/* Plot Sizes */}
          <div className="admin-section-card" style={{ padding: '24px' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>4. Plot Sizes & Layouts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {plotSizes.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', flex: 1 }}>
                    <div><strong>Type:</strong> {p.plotType}</div>
                    <div><strong>Dimensions:</strong> {p.dimensions}</div>
                    <div><strong>Area:</strong> <span style={{ color: 'var(--admin-accent)' }}>{p.area}</span></div>
                    <div><strong>Status:</strong> {p.availability}</div>
                  </div>
                  <button type="button" onClick={() => removePlot(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px', marginLeft: '10px' }}>&times;</button>
                </div>
              ))}
            </div>

            {/* Row builder inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Plot Type (e.g. Residential)"
                value={plotInput.plotType}
                onChange={(e) => setPlotInput(prev => ({ ...prev, plotType: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Dimensions (e.g. 15m × 30m)"
                value={plotInput.dimensions}
                onChange={(e) => setPlotInput(prev => ({ ...prev, dimensions: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Area (e.g. 450 sqm)"
                value={plotInput.area}
                onChange={(e) => setPlotInput(prev => ({ ...prev, area: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Availability (e.g. Available)"
                value={plotInput.availability}
                onChange={(e) => setPlotInput(prev => ({ ...prev, availability: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
            </div>
            <button type="button" onClick={addPlot} className="admin-btn" style={{ width: '100%', fontSize: '11px', padding: '6px' }}>
              + Add Plot Size
            </button>
          </div>

          {/* Market Snapshot */}
          <div className="admin-section-card" style={{ padding: '24px' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>5. Market Snapshots</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {marketSnapshot.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', flex: 1 }}>
                    <div><strong>Plot:</strong> {s.plotCategory}</div>
                    <div><strong>Price:</strong> <span style={{ color: 'var(--admin-accent)' }}>{s.priceRange}</span></div>
                    <div><strong>Outlook:</strong> {s.outlook}</div>
                  </div>
                  <button type="button" onClick={() => removeSnapshot(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px', marginLeft: '10px' }}>&times;</button>
                </div>
              ))}
            </div>

            {/* Row builder inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Plot Cat (e.g. 500 SQM)"
                value={snapshotInput.plotCategory}
                onChange={(e) => setSnapshotInput(prev => ({ ...prev, plotCategory: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Price Range (e.g. ₦50M - ₦60M)"
                value={snapshotInput.priceRange}
                onChange={(e) => setSnapshotInput(prev => ({ ...prev, priceRange: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Outlook (e.g. Stable)"
                value={snapshotInput.outlook}
                onChange={(e) => setSnapshotInput(prev => ({ ...prev, outlook: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
            </div>
            <button type="button" onClick={addSnapshot} className="admin-btn" style={{ width: '100%', fontSize: '11px', padding: '6px' }}>
              + Add Snapshot Row
            </button>
          </div>

        </div>

        {/* Relational parameters panel (Advisor dropdown & House types checklists) */}
        <div className="admin-section-card" style={{ padding: '32px' }}>
          <h3 className="admin-section-title" style={{ marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
            6. Sales Specialist & Relational Linking
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            
            {/* Advisor picker */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Primary Assigned Advisor
              </label>
              <select
                value={advisorId}
                onChange={(e) => setAdvisorId(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
              >
                <option value="">Unassigned / General Customer Support</option>
                {advisors.map(adv => (
                  <option key={adv.id} value={adv.id}>
                    {adv.name} ({adv.role})
                  </option>
                ))}
              </select>
            </div>

            {/* House Types selector */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Select Featured House Types
              </label>
              
              {houseTypes.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', fontStyle: 'italic', padding: '8px 0' }}>
                  No house types registered yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '160px', overflowY: 'auto', padding: '8px', border: '1px solid var(--admin-border)', borderRadius: '4px', backgroundColor: 'var(--admin-bg)' }}>
                  {houseTypes.map(ht => (
                    <label key={ht.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', color: 'var(--admin-text-primary)' }}>
                      <input
                        type="checkbox"
                        checked={selectedHouseTypeIds.includes(ht.id)}
                        onChange={() => toggleHouseType(ht.id)}
                        style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                      />
                      <span>{ht.classType || ht.id} ({ht.beds || 0} Beds)</span>
                    </label>
                  ))}
                </div>
              )}

              {selectedHouseTypeIds.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Arrange Featured Spec Order (Drag to Reorder)
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '12px', border: '1px solid var(--admin-border)', borderRadius: '4px', backgroundColor: 'var(--admin-bg)' }}>
                    {selectedHouseTypeIds.map((htId, idx) => {
                      const ht = houseTypes.find(h => h.id === htId);
                      const nameLabel = ht ? (ht.classType || ht.id) : htId;
                      const isDragging = idx === draggedHTIndex;
                      const isDragOver = idx === dragOverHTIndex;
                      
                      let borderStyle = '1px solid var(--admin-border)';
                      let transformStyle = 'none';
                      
                      if (isDragging) {
                        borderStyle = '1px dashed var(--admin-accent)';
                      } else if (isDragOver && draggedHTIndex !== null) {
                        borderStyle = '2px solid var(--admin-accent)';
                        transformStyle = 'scale(1.05)';
                      }

                      return (
                        <div
                          key={htId}
                          draggable
                          onDragStart={(e) => handleHTDragStart(e, idx)}
                          onDragOver={(e) => handleHTDragOver(e, idx)}
                          onDragEnd={handleHTDragEnd}
                          onDrop={(e) => handleHTDrop(e, idx)}
                          style={{
                            padding: '8px 14px',
                            backgroundColor: 'var(--admin-surface-light)',
                            border: borderStyle,
                            borderRadius: '20px',
                            fontSize: '12px',
                            color: 'var(--admin-text-primary)',
                            cursor: 'grab',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            opacity: isDragging ? 0.4 : 1,
                            transform: transformStyle,
                            transition: 'all 0.15s ease',
                            userSelect: 'none'
                          }}
                        >
                          <span>☰ {nameLabel}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        <button
          type="submit"
          className="admin-btn active"
          disabled={submitting}
          style={{ width: '100%', padding: '16px', fontSize: '13px' }}
        >
          {submitting ? 'Saving Estate Changes...' : 'Save Estate Changes'}
        </button>

      </form>
    </div>
  );
}
