import ProjectDetailTemplate from '../../components/ProjectDetailTemplate';

export default function Page() {
  const data = {
    title: "Sunset Haven",
    heroImage: "https://images.weserv.nl/?url=drive.google.com/uc?id=1dP8dOZmR2Fg7mUkXUDiByr06e64h50Lh",
    heroDescription: "An elite smart district engineered for premium living, featuring high-fidelity security and future-ready infrastructure in the heart of Abuja.",
    updatesLink: "/katampe-extension/updates",
    description: "Katampe Extension is Abuja's most ambitious residential undertaking. Designed as a fully integrated smart city district, it combines natural hilly topography with cutting-edge engineering to create a secure, serene, and sophisticated environment for Nigeria's elite.",
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
    ],
    sidebarAdviser: {
      name: "Ahmed Bello",
      role: "Sunset Haven Specialist",
      quote: "I specialize in high-net-worth acquisitions within this zone. Let's secure your legacy.",
      phone: "+234 810 001 5555",
      email: "a.bello@wisdomkwatismartcity.com",
      image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa"
    },
    otherNeighborhoods: [
      { name: "Whispering Pines", district: "Karsana District", link: "/karsana-district", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN" },
      { name: "Guzape II Estate", district: "Guzape II", link: "/guzape-estate", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP" },
      { name: "Ellington Villa 2", district: "Mabushi District", link: "/mabushi-district", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU" }
    ],
    houseTypes: [
      { name: "The Sapphire", location: "Premium Class • 4BR Smart Villa", type: "Sapphire Class Villa", beds: "4", baths: "4.5", size: "3,200 SQ FT", link: "/blue-sapphire", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" },
      { name: "The Emerald", location: "Luxury Class • 5BR Smart Duplex", type: "Emerald Class Villa", beds: "5", baths: "6", size: "4,800 SQ FT", link: "/imperial-emerald", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT" }
    ]
  };

  return <ProjectDetailTemplate {...data} />;
}
