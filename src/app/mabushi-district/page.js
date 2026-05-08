import ProjectDetailTemplate from '../../components/ProjectDetailTemplate';

export default function Page() {
  const data = {
    title: "Ellington Villa",
    heroImage: "https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU",
    heroDescription: "A vibrant, centrally located district offering seamless connectivity and modern urban living within Abuja's inner ring.",
    updatesLink: "/mabushi-district/updates",
    description: "Ellington Villa is the ultimate urban connector. Located at the heart of Abuja's inner ring road system, it offers unparalleled access to all major districts. Our smart developments here are engineered for those who value efficiency, security, and the pulse of the city.",
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
    ],
    sidebarAdviser: {
      name: "Ahmed Bello",
      role: "Mabushi Specialist",
      quote: "Location is everything. Ellington Villa places you right in the center of the action with all the security of a smart estate.",
      phone: "+234 810 001 5555",
      email: "a.bello@wisdomkwatismartcity.com",
      image: "https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa"
    },
    otherNeighborhoods: [
      { name: "Sunset Haven", district: "Katampe Ext.", link: "/katampe-extension", image: "https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1xYCnvanRHqSsdCeheY75jtAM5QS3AS0n" },
      { name: "Whispering Pines", district: "Karsana", link: "/karsana-district", image: "https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN" },
      { name: "Nimi Hills", district: "Guzape", link: "/guzape-estate", image: "https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP" }
    ],
    houseTypes: [
      { name: "The Sapphire", location: "Premium Class • 4BR Smart Villa", type: "Emerald Class Villa", beds: "4", baths: "4.5", size: "3,200 SQ FT", link: "/imperial-emerald", image: "https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" },
      { name: "The Emerald", location: "Premium Class • 5BR Smart Duplex", type: "Emerald Class Villa", beds: "5", baths: "6", size: "4,800 SQ FT", link: "/house-types", image: "https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" }
    ]
  };

  return <ProjectDetailTemplate {...data} />;
}
