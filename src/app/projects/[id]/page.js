'use client';

import React from 'react';
import ProjectDetailTemplate from '@/components/ProjectDetailTemplate';

export default function Page() {
  return (
    <ProjectDetailTemplate
      title="Dynamic Smart Estate"
      heroImage="https://placehold.co/1200x800/111/fff?text=Smart+Estate+Hero"
      heroDescription="A master-planned luxury district curated by Wisdom Kwati Smart City."
      description="Architectural excellence and smart infrastructure designed to redefine contemporary living in Nigeria's most exclusive neighborhoods."
      highlights={["24/7 Smart Surveillance", "Solar Grid Integration", "Fibre-to-the-Home Broadband", "Fully Paved Access Roads"]}
      realEstateVibe={[
        { category: "Infrastructure", details: "State-of-the-art underground utility networks, concrete storm water channels." },
        { category: "Security", details: "Biometric perimeter controls, AI vehicle scanning, smart security patrols." }
      ]}
      nearbyFacilities={[
        { category: "Transport", establishment: "International Airport Bypass Route", travelTime: "15 Mins" },
        { category: "Healthcare", establishment: "Premiere District Hospital", travelTime: "8 Mins" }
      ]}
      marketSnapshot={[
        { plotCategory: "500 SQM", priceRange: "₦45,000,000 - ₦60,000,000", outlook: "High-Growth Potential" }
      ]}
      plotSizes={[
        { plotType: "Standard", dimensions: "25m x 20m", area: "500 SQM", availability: "Limited Availability" }
      ]}
      houseTypes={[]}
    />
  );
}
