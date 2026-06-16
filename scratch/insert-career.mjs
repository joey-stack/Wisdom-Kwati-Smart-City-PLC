import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDW5075X4k9QTJzRpkKClT48GYUgSiVpw4",
  authDomain: "wk-smart-city-plc.firebaseapp.com",
  projectId: "wk-smart-city-plc",
  storageBucket: "wk-smart-city-plc.firebasestorage.app",
  messagingSenderId: "335014067510",
  appId: "1:335014067510:web:4c55a9f259133dcee04797"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const payload = {
  title: "Business Development and Brand Communication Strategist",
  slug: "business-development-and-brand-communication-strategist",
  intro: "We are seeking a strategic and results-driven Business Development and Brand Communication Strategist to lead growth initiatives and strengthen brand positioning for Wisdom Kwati Group. The role combines business development, partnership building, and brand strategy to drive revenue and enhance market presence in the competitive Fintech landscape.",
  role: "Business Development and Brand Communication Strategist",
  location: "Lagos / Abuja (Hybrid)",
  employmentType: "Full Time",
  experienceLevel: "8–10 years of experience",
  salaryRange: "Competitive (Fintech Industry Standard)",
  workingHours: "Standard business hours",
  reportsTo: "Head of Growth / Executive Management",
  howToApply: "careers@wisdomkwatigroup.com",
  responsibilities: [
    "Lead strategic growth initiatives and strengthen brand positioning for Wisdom Kwati Group.",
    "Identify, develop, and secure high-impact strategic partnerships in the fintech sector.",
    "Align business development targets with brand communication goals to drive group revenue.",
    "Enhance corporate market presence in a competitive Fintech, Tech, and Brands landscape.",
    "Formulate and execute communication strategies that elevate brand equity and market visibility."
  ],
  perks: [
    "Grow Your Career: Clear and rewarding progression paths within the group.",
    "Make Real Impact: Strategic, high-visibility role directly influencing group growth.",
    "Collaborate & Innovate: Synergistic work environment with industry-leading professionals.",
    "Reap Rewards & Benefits: Competitive salary packages, performance bonuses, and industry perks."
  ],
  requirements: [
    {
      skill: "Bachelor's Degree",
      description: "Required in Business Administration, Marketing, Brand Management, Mass Comm, PR, Economics, Finance, or Banking."
    },
    {
      skill: "Master's Degree / MBA",
      description: "Masters in Business Administration (MBA) or MSc in Marketing, Strategy, Business Dev, or Innovation."
    },
    {
      skill: "Professional Marketing Cert",
      description: "CIM (Chartered Institute of Marketing) or equivalent Strategic Marketing/Brand certification."
    },
    {
      skill: "Digital Marketing Tools",
      description: "Proficiency with Google Digital Garage, Meta Blueprint, HubSpot, Google Analytics, and SQL."
    },
    {
      skill: "Sales & Business Development",
      description: "Experience with structured sales methodologies (e.g. Sandler Sales, SPIN Selling)."
    },
    {
      skill: "Fintech Domain Knowledge",
      description: "Fintech-specific credentials (e.g., CCAF Fintech courses, CFA) are a strong advantage."
    }
  ],
  date: new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }),
  createdAt: new Date().toISOString()
};

async function run() {
  try {
    console.log("Saving job opening to Firestore...");
    await setDoc(doc(db, 'careers', payload.slug), payload);
    console.log("🎉 SUCCESS: Job opening saved successfully!");
  } catch (err) {
    console.error("❌ ERROR: Failed to save job opening:", err);
  }
}

run();
