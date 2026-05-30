import React from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HouseTypeDetailTemplate from '@/components/HouseTypeDetailTemplate';

// Generate static params for all house types at build time for instant, zero-loading page loads
export async function generateStaticParams() {
  try {
    const querySnapshot = await getDocs(collection(db, 'houseTypes'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (err) {
    console.error('Failed to generate static params for house types:', err);
    return [];
  }
}

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

      // Resolve parent project
      projectsSnap.forEach((projDoc) => {
        const projData = projDoc.data();
        if (Array.isArray(projData.houseTypeIds) && projData.houseTypeIds.includes(id)) {
          parentProject = { id: projDoc.id, name: projData.name || 'Premium District', ...projData };
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
    <HouseTypeDetailTemplate
      id={id}
      data={data}
      parentProject={parentProject}
      advisor={advisor}
      relatedProperties={relatedProperties}
    />
  );
}
