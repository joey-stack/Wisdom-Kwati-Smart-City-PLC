export const dynamic = 'force-dynamic';

import React from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HouseTypeDetailTemplate from '@/components/HouseTypeDetailTemplate';

// This page is force-dynamic (always SSR) — generateStaticParams is not used.
// Pages are served live from Firebase on every request.

// Generate dynamic SEO metadata on the server
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const docRef = doc(db, 'houseTypes', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        title: `${data.classType || 'Premium Villa'} Specifications`,
        description: data.description || `${data.classType} is a premium smart villa spec in Wisdom Kwati Smart City.`,
        alternates: {
          canonical: `/house-types/${id}`,
        }
      };
    }
  } catch (err) {
    console.error('Failed to generate metadata:', err);
  }
  return {
    title: "Property Specifications",
    description: "Premium smart villa specifications at Wisdom Kwati Smart City.",
    alternates: {
      canonical: `/house-types/${id}`,
    }
  };
}

export default async function Page({ params }) {
  const { id } = await params;

  let data = null;
  let parentProject = null;
  let availableEstates = [];
  let advisor = null;
  let relatedProperties = [];

  try {
    // 1. Fetch main house type doc
    const docRef = doc(db, 'houseTypes', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      data = { id: docSnap.id, ...docSnap.data() };

      // 2. Fetch parent project and related properties in parallel
      const [projectsSnap, houseTypesSnap] = await Promise.all([
        getDocs(collection(db, 'projects')),
        getDocs(collection(db, 'houseTypes'))
      ]);

      // Resolve parent project & all available estates
      projectsSnap.forEach((projDoc) => {
        const projData = projDoc.data();
        if (Array.isArray(projData.houseTypeIds) && projData.houseTypeIds.includes(id)) {
          const est = { id: projDoc.id, name: projData.name || 'Premium District', ...projData };
          availableEstates.push(est);
          if (!parentProject) {
            parentProject = est;
          }
        }
      });

      // Resolve related properties (excluding current, slice top 2)
      const houseTypesList = [];
      houseTypesSnap.forEach((htDoc) => {
        if (htDoc.id !== id) {
          houseTypesList.push({ id: htDoc.id, ...htDoc.data() });
        }
      });
      relatedProperties = houseTypesList.slice(0, 2);

      // 3. Resolve advisor if assigned
      if (data.advisorId) {
        try {
          const advSnap = await getDoc(doc(db, 'advisors', data.advisorId));
          if (advSnap.exists()) {
            advisor = { id: advSnap.id, ...advSnap.data() };
          }
        } catch (e) {
          console.error('Failed to fetch advisor details:', e);
        }
      }
    }
  } catch (err) {
    console.error('Server error fetching house type:', err);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://wisdomkwatismartcityplc.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "House Types",
                "item": "https://wisdomkwatismartcityplc.com/house-types"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": data?.classType || "Specification",
                "item": `https://wisdomkwatismartcityplc.com/house-types/${id}`
              }
            ]
          })
        }}
      />
      {data && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "House",
              "name": data.classType,
              "description": data.description || `${data.classType} is a premium smart villa spec in Wisdom Kwati Smart City.`,
              "numberOfBedrooms": data.beds || undefined,
              "image": data.images?.[0] || undefined,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": parentProject?.name || "Abuja",
                "addressRegion": "FCT",
                "addressCountry": "NG"
              },
              "amenityFeature": (data.amenities || []).map(a => ({
                "@type": "LocationFeatureSpecification",
                "name": typeof a === 'string' ? a : a.name || a.label || '',
                "value": true
              }))
            })
          }}
        />
      )}
      <HouseTypeDetailTemplate
        id={id}
        data={data}
        parentProject={parentProject}
        availableEstates={availableEstates}
        advisor={advisor}
        relatedProperties={relatedProperties}
      />
    </>
  );
}
