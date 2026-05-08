import ProjectDetailTemplate from '../../components/ProjectDetailTemplate';

export default function Page() {
  const data = {
    title: "Wisdom Kwati Smart City",
    heroImage: "https://images.weserv.nl/?url=drive.google.com/uc?id=1s5vsiqmbnMMTONiebu1vG2r_Yvcfd6KL",
    heroDescription: "Our flagship ultra-modern megacity project in Karshi, Abuja.",
    updatesLink: "/wisdom-kwati-smart-city/updates",
    description: "Wisdom Kwati Smart City in Karshi is the crown jewel of our portfolio. It is a fully integrated megacity designed to showcase the pinnacle of smart urban planning, sustainable energy, and ultra-modern architecture.",
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
    ],
    sidebarAdviser: {
      name: "Samuel Kwati",
      role: "Megacity Specialist",
      quote: "Wisdom Kwati Smart City is the future of urban living in Africa. It is an unparalleled investment in tomorrow's infrastructure.",
      phone: "+234 810 001 8888",
      email: "samuel.k@wisdomkwati.com",
      image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa"
    },
    otherNeighborhoods: [
      { name: "Sunset Haven", district: "Katampe Ext.", link: "/katampe-extension", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1xYCnvanRHqSsdCeheY75jtAM5QS3AS0n" },
      { name: "Whispering Pines", district: "Karsana", link: "/karsana-district", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN" },
      { name: "Ellington Villa", district: "Mabushi", link: "/mabushi-district", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU" },
      { name: "Nimi Hills", district: "Guzape", link: "/guzape-estate", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP" }
    ],
    houseTypes: []
  };

  return <ProjectDetailTemplate {...data} />;
}
