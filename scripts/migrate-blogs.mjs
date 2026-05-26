/**
 * Migration script: Ensures all Firestore `blogs` documents have:
 * 1. A `slug` field (matching their document ID).
 * 2. A `published` field (defaulting to true).
 * 3. Rich `content` and `excerpt` fields copied from the dummy data list.
 *
 * Run with: node scripts/migrate-blogs.mjs
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

// Source of rich data for the original 6 blogs
const sourceBlogs = [
  {
    title: "First-time homebuyer's guide — everything you need to know before...",
    excerpt: "Buying your first property is a landmark achievement, but the process can be overwhelming. Learn how to plan budgets, structure financing, and inspect foundations.",
    content: "Buying your very first home is one of the most rewarding achievements of your life. Yet, navigating mortgages, interest rates, down payments, and negotiating details can feel like a secondary job. With structural planning and architectural clarity, you can confidently turn this complex puzzle into your ultimate success story.\n\nAssess Your True Financial Health First:\nBefore opening real estate listing portals, sit down with a solid spreadsheet. Real cost parameters go way beyond your monthly mortgage payment. Factoring in property insurance, estate taxes, monthly maintenance caps, and utility buffers is crucial for sustainable homeownership. Aim to keep housing expenses below 28% of your gross monthly income.\n\nThe Power of Pre-Approval:\nPre-qualification is a friendly estimate, but a pre-approval is a verified commitment from your lender. It gives you a rock-solid price ceiling and shows builders you have direct funding power, instantly giving you the leverage to close deals ahead of competitors in high-demand smart districts."
  },
  {
    title: "How to prepare your home before selling — simple steps that make a big impact",
    excerpt: "Preparing your home for listing requires strategic upgrades. Learn simple, low-cost modifications to boost valuation and attract smart buyers.",
    content: "When listing a luxury property, first impressions dictate final deal closures. Buyers are looking for layout flow, material authenticity, and structural peace of mind. By implementing minor spatial edits and premium details, you can dramatically accelerate sales negotiations.\n\nDeep Clean and De-Personalize:\nRemove all highly personal items so prospective buyers can project their own family goals onto the rooms. A neutral layout sells faster.\n\nCircadian Lighting Arrays:\nEnsure all window screens are clean to let in natural daylight. Replace old high-glare lightbulbs with warm LED layers at eye level to create a welcoming, upscale atmosphere."
  },
  {
    title: "How to rent out your property safely and successfully — a complete owner's guide",
    excerpt: "A complete owner's guide to landlord success, managing security deposits, lease agreements, tenant vetting, and long-term passive income grids.",
    content: "Renting out real estate is a powerful passive income engine, but it comes with critical legal and physical maintenance obligations. Establishing standard templates for vetting and maintenance ensures high occupancy rates and reliable returns.\n\nRigorous Tenant Vetting:\nAlways verify credit scores, employment histories, and previous landlord references. Vetting tenants carefully protects your physical asset.\n\nProfessional Lease Agreements:\nDraft clean, unambiguous lease documents specifying utility bounds, security deposit limits, and tenant maintenance boundaries, ensuring complete legal safety for both parties."
  },
  {
    title: "The future of smart homes — what's trending in home tech for 2025",
    excerpt: "The next generation of living is connected, autonomous, and energy-neutral. Discover the leading automation patterns defining luxury real estate.",
    content: "Step into any modern residence today, and you'll see smart light bulbs or voice assistants. But the future of smart homes isn't just about isolated voice triggers; it's about unified systems that automatically manage your lifestyle footprint. In 2025, homes are transitioning from simple connected structures into intelligent living sanctuaries.\n\nThe Rise of Unified IoT Ecosystems:\nHistorically, smart home gadgets existed in closed vertical silos. Today, universal standards like Matter enable devices from different platforms to coordinate locally, allowing your HVAC, automated windows, solar battery cells, and circadian light arrays to work together in harmony without lag.\n\nEnergy-Neutral Autonomy:\nIntelligent homes are taking direct control of energy usage. AI algorithms can predict local weather patterns, pre-cool rooms using solar surplus, and dynamically balance your load grid to run your smart appliances at peak efficiency, bringing bills to absolute zero."
  },
  {
    title: "Real estate trends 2025 — what's shaping the property market this year",
    excerpt: "Economic shifts, remote work requirements, and sustainable energy grids are transforming real estate. What smart buyers need to track.",
    content: "The property market in 2025 is undergoing structural transformations. High interest rates have pushed investors toward high-yield rental units and energy-efficient residences. Sustainable smart communities are seeing maximum valuation increases compared to standard unintegrated developments.\n\nDecentralization to Smart Districts:\nAs high-speed internet becomes ubiquitous, buyers are opting for outlying smart districts offering clean water grids, solar microgrids, and green spaces, moving away from congested metropolitan centers."
  },
  {
    title: "7 simple upgrades that make your home feel luxurious",
    excerpt: "Elevating the daily experience through light, texture, and geometry. Simple upgrades to create a calm, spacious luxury aesthetic.",
    content: "We spend a vast portion of our lives within our homes. Yet, we often tolerate cluttered layouts, dim lighting, and stagnant air flow. Transitioning your property from a place where you just sleep into a high-end personal sanctuary doesn't require complete structural demolition. It is about applying design principles that prioritize human well-being.\n\nCurate a Harmonious Natural Palette:\nColors have direct psychological impacts. By introducing soft organic earth tones, stone textures, warm wood grains, and low-gloss finishes, you instantly soothe the nervous system. Avoid harsh primary synthetics; embrace materials that age gracefully.\n\nCommand the Architecture of Light:\nProper lighting is the ultimate luxury. Maximize natural daylight entry by keeping window lines clear and choosing lightweight window treatments. For evening spaces, avoid direct overhead glare by layering warm accent lamps and eye-level cove spotlights."
  }
];

async function migrate() {
  console.log('Fetching all blogs...');
  const snap = await getDocs(collection(db, 'blogs'));
  console.log(`Found ${snap.size} blogs to inspect/migrate.`);

  for (const blogDoc of snap.docs) {
    const data = blogDoc.data();
    const docId = blogDoc.id;
    const updates = {};

    // 1. Ensure slug exists
    if (!data.slug) {
      updates.slug = docId;
    }

    // 2. Ensure published is set
    if (data.published === undefined) {
      updates.published = true;
    }

    // 3. Populate missing content and excerpt for original 6
    if (!data.content || !data.excerpt) {
      // Find matching source blog by title (using fuzzy match)
      const titleLower = (data.title || '').toLowerCase();
      const match = sourceBlogs.find(sb => titleLower.startsWith(sb.title.toLowerCase().substring(0, 15)));
      
      if (match) {
        if (!data.content) updates.content = match.content;
        if (!data.excerpt) updates.excerpt = match.excerpt;
        console.log(`  ✍️ Found source match for "${data.title}": Adding content and excerpt.`);
      }
    }

    if (Object.keys(updates).length > 0) {
      await updateDoc(doc(db, 'blogs', docId), updates);
      console.log(`  ✅ Migrated: ${docId}`);
    } else {
      console.log(`  ➖ Already correct: ${docId}`);
    }
  }

  console.log('\n🎉 Blog migration completed successfully!');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Fatal migration error:', err);
  process.exit(1);
});
