import ProjectDetailTemplate from '../../components/ProjectDetailTemplate';

export default function Page() {
  const data = {
    title: "Nimi Hills",
    heroVideo: "https://drive.google.com/uc?export=download&id=1WkaEVNo0ii8zkmYXHDOd5MOFwDcz7VKi",
    heroDescription: "An exclusive hilltop sanctuary offering breathtaking panoramic views and ultra-luxury living spaces in Abuja's most prestigious expansion.",
    updatesLink: "/guzape-estate/updates",
    description: "Nimi Hills is designed for those who seek to live above it all. With its unique hilly topography providing natural security and stunning vistas, this district is the future of Abuja's ultra-premium real estate market, combining architectural audacity with smart engineering.",
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
      { plotType: "Grand Mansion Plot", dimensions: "30m × 60m", area: "1,800 sqm", availability: "Limited" }
    ],
    sidebarAdviser: {
      name: "Ahmed Bello",
      role: "Nimi Hills Specialist",
      quote: "Nimi Hills is the crown jewel of Abuja's expansion. Secure your hilltop legacy today before availability closes.",
      phone: "+234 810 001 5555",
      email: "a.bello@wisdomkwatismartcity.com",
      image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa"
    },
    otherNeighborhoods: [
      { name: "Sunset Haven", district: "Katampe Ext.", link: "/katampe-extension", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1xYCnvanRHqSsdCeheY75jtAM5QS3AS0n" },
      { name: "Whispering Pines", district: "Karsana", link: "/karsana-district", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN" },
      { name: "Ellington Villa", district: "Mabushi", link: "/mabushi-district", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU" }
    ],
    houseTypes: [
      { name: "The Sapphire", location: "Premium Class • 4BR Smart Villa", type: "Emerald Class Villa", beds: "4", baths: "4.5", size: "3,200 SQ FT", link: "/imperial-emerald", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" },
      { name: "The Emerald", location: "Premium Class • 5BR Smart Duplex", type: "Emerald Class Villa", beds: "5", baths: "6", size: "4,800 SQ FT", link: "/house-types", image: "https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" }
    ]
  };

  return <ProjectDetailTemplate {...data} />;
}