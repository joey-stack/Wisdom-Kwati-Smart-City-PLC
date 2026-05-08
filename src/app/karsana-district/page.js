import ProjectDetailTemplate from '../../components/ProjectDetailTemplate';

export default function Page() {
  const data = {
    title: "Whispering Pines",
    heroImage: "https://images.weserv.nl/?url=drive.google.com/uc?id=1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN",
    heroDescription: "A family-centric smart district focused on sustainability, green spaces, and community-driven innovation in Abuja.",
    updatesLink: "/karsana-district/updates",
    description: "Karsana Smart District is designed for the modern Nigerian family. Situated in a rapidly growing corridor of the FCT, this district emphasizes \"life in balance\"—integrating solar energy, pedestrian-friendly streets, and expansive recreational parks into a secure residential ecosystem.",
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
    ],
    sidebarAdviser: {
      name: "Fatima Usman",
      role: "Karsana District Specialist",
      quote: "Karsana is one of Abuja's fastest-growing family districts. I'll help you find the right opportunity.",
      phone: "+234 810 002 5555",
      email: "f.usman@wisdomkwatismartcity.com",
      image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa"
    },
    otherNeighborhoods: [
      { name: "Sunset Haven", district: "Katampe Extension", link: "/katampe-extension", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1N1h-Lh-e_Y7Pj13iHw1K1g1dI5hI4S6b" },
      { name: "Guzape II Estate", district: "Guzape II", link: "/guzape-estate", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1WdD5qj8xY_6C-T4S9j1R9M0cK2A6R8sE" },
      { name: "Ellington Villa 2", district: "Mabushi District", link: "/mabushi-district", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1ZJ1cM1F0tV9P9N9rT9M8sE7R6A5W4D3F" }
    ],
    houseTypes: [
      { name: "The Sapphire", location: "Premium Class • 4BR Smart Villa", type: "Sapphire Class Villa", beds: "4", baths: "4.5", size: "3,200 SQ FT", link: "/blue-sapphire", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" },
      { name: "The Emerald", location: "Luxury Class • 5BR Smart Duplex", type: "Emerald Class Villa", beds: "5", baths: "6", size: "4,800 SQ FT", link: "/imperial-emerald", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT" }
    ]
  };

  return <ProjectDetailTemplate {...data} />;
}
