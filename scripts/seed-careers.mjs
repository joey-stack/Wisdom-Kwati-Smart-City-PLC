/**
 * Seed script: Populates the `careers` collection in Firestore with the default job postings.
 * Run with: node scripts/seed-careers.mjs
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

const careersData = [
  {
    title: 'Marketing Coordinator',
    slug: 'marketing-coordinator',
    date: 'Wednesday, January 7, 2026 at 12:00 PM',
    intro: "We're looking for a Marketing Coordinator to help manage and grow the Wisdom Kwati Smart City brand. This role focuses on coordinating campaigns, managing listings, and creating engaging content that connects with our clients.",
    role: 'Marketing Coordinator',
    location: 'Abuja (Hybrid)',
    employmentType: 'Full Time',
    experienceLevel: '2+ years of experience in real estate marketing',
    salaryRange: '₦1.2M - ₦1.8M / year',
    workingHours: 'Standard business hours (flexibility requested)',
    reportsTo: 'Marketing Director',
    howToApply: 'careers@wisdomkwati.com',
    responsibilities: [
      'Coordinate and execute marketing campaigns, listings, and client outreach.',
      'Collaborate with agency partners to design promotional materials.',
      'Maintain company website, portals, and social media channels.',
      'Track and report performance metrics of marketing campaigns.',
      'Write engaging copy for newsletters, blogs, and local ads.',
      'Organize community events and client appreciation functions.'
    ],
    requirements: [
      { skill: 'Social media specialist', description: 'Professional experience running active campaigns' },
      { skill: 'Content creator', description: 'Strong copywriting skills and eyes for design details' },
      { skill: 'Team player', description: 'Collaborative mindset to coordinate with agents and managers' },
      { skill: 'Organized planner', description: 'High attention to detail and deadline management skills' },
      { skill: 'Real estate lover', description: 'Passion for properties and the real estate market' }
    ],
    perks: [
      'Competitive salary with performance bonuses',
      'Health insurance coverage (medical, dental, vision)',
      'Dynamic and modern workspace in high-end office',
      'Flexible working hours and hybrid work options',
      'Regular team events and outings',
      'Continuing education and professional development support'
    ],
    createdAt: new Date().toISOString()
  },
  {
    title: 'Real Estate Agent',
    slug: 'real-estate-agent',
    date: 'Friday, January 16, 2026 at 09:00 AM',
    intro: 'We are seeking dynamic, results-driven Real Estate Agents to connect buyers with their dream smart homes across our premium estate developments in Lagos.',
    role: 'Real Estate Agent',
    location: 'Lagos, Nigeria (On Site)',
    employmentType: 'Full Time',
    experienceLevel: '3+ years of active real estate sales experience',
    salaryRange: 'Commission-Based (High Yield)',
    workingHours: 'Flexible schedules based on client viewings',
    reportsTo: 'Head of Sales & Acquisitions',
    howToApply: 'careers@wisdomkwati.com',
    responsibilities: [
      'Represent WKSC developments to high-net-worth individuals and corporate buyers.',
      'Conduct guided tours of estate locations and house units.',
      'Negotiate sales contracts and assist buyers with payment plan schedules.',
      'Build and maintain a strong client relationship pipeline.',
      'Stay updated on local real estate market trends and property values.'
    ],
    requirements: [
      { skill: 'Deal Closer', description: 'Proven track record of high-value real estate sales' },
      { skill: 'Stellar Communicator', description: 'Outstanding presentation and negotiation capabilities' },
      { skill: 'Self-Starter', description: 'Highly motivated to prospect leads independently' },
      { skill: 'Lagos Market Expert', description: 'Deep understanding of high-growth Lagos real estate zones' }
    ],
    perks: [
      'High-paying commission structure (industry leading rates)',
      'Performance bonuses and luxury travel incentives',
      'Full marketing support (leads, ads, flyers, site transport)',
      'Direct access to exclusive inventory before public launch'
    ],
    createdAt: new Date().toISOString()
  },
  {
    title: 'Property Manager',
    slug: 'property-manager',
    date: 'Monday, June 8, 2026 at 10:00 AM',
    intro: 'We are looking for a professional Property Manager to coordinate operations, tenant relationships, and facility maintenance for our newly completed smart districts in Port Harcourt.',
    role: 'Property Manager',
    location: 'Port Harcourt (On Site)',
    employmentType: 'Full Time',
    experienceLevel: '4+ years of facility or property management experience',
    salaryRange: '₦2M - ₦3.5M / year',
    workingHours: 'Standard business hours with emergency on-call availability',
    reportsTo: 'Director of Estate Operations',
    howToApply: 'careers@wisdomkwati.com',
    responsibilities: [
      'Supervise estate facilities, green areas, and automated infrastructure.',
      'Coordinate tenant moves, lease agreements, and service charge collections.',
      'Oversee security, cleaning, and maintenance vendors.',
      'Address tenant inquiries, feedback, and maintenance requests.',
      'Prepare operational reports and facilities budgets.'
    ],
    requirements: [
      { skill: 'Operations Specialist', description: 'Strong knowledge of facility management operations' },
      { skill: 'Problem Solver', description: 'Quick responder to maintenance and emergency issues' },
      { skill: 'Vendor Coordinator', description: 'Experience managing maintenance contractors' },
      { skill: 'Financial Coordinator', description: 'Skilled in managing service charge ledgers and budgets' }
    ],
    perks: [
      'Competitive annual base salary with health benefits',
      'On-site official housing option or housing stipend',
      'Annual performance bonus based on estate satisfaction metrics',
      'Paid leave and professional development training'
    ],
    createdAt: new Date().toISOString()
  }
];

async function seed() {
  console.log('Seeding careers collection in Firestore...');
  
  for (const job of careersData) {
    await setDoc(doc(db, 'careers', job.slug), job);
    console.log(`  ✅ Seeded job: "${job.title}" with slug: "${job.slug}"`);
  }
  
  console.log('\nCareers collection seeded successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
