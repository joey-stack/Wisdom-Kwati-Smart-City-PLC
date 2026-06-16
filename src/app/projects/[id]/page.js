export const dynamic = 'force-dynamic';

import React from 'react';
import { doc, getDoc, collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProjectDetailTemplate from '@/components/ProjectDetailTemplate';

const EMPTY_ARRAY = [];

const DEFAULT_ADVISER = {
  name: "Sarah Kwati",
  role: "Project Advisor",
  quote: "We are committed to delivering the ultimate standard in smart urban residential living.",
  phone: "+234 810 001 7777",
  email: "sarah.k@wisdomkwati.com",
  image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1f60lY6QnI4T6pUfN0V-V6y6W6h6h6h6h%26sz=w1200"
};

// Generate static params for all projects at build time for instant, zero-loading page loads
export async function generateStaticParams() {
  if (!db) return []; // Firebase not initialized (build env vars not set)
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
    }));
  } catch (err) {
    console.error('Failed to generate static params for projects:', err);
    return [];
  }
}

// Generate dynamic SEO metadata on the server
export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        title: data.name || 'Premium District',
        description: data.tagline || data.description || 'Premium real estate district at Wisdom Kwati Smart City.',
        alternates: {
          canonical: `/projects/${id}`,
        }
      };
    }
  } catch (err) {
    console.error('Failed to generate metadata:', err);
  }
  return {
    title: "Premium Smart District",
    description: "Premium smart district at Wisdom Kwati Smart City.",
    alternates: {
      canonical: `/projects/${id}`,
    }
  };
}

export default async function Page({ params }) {
  const { id } = await params;

  let title = "Loading Estate...";
  let heroImage = null;
  let heroVideo = null;
  let heroPoster = null;
  let heroDescription = "";
  let description = "";
  let highlights = EMPTY_ARRAY;
  let realEstateVibe = EMPTY_ARRAY;
  let nearbyFacilities = EMPTY_ARRAY;
  let marketSnapshot = EMPTY_ARRAY;
  let plotSizes = EMPTY_ARRAY;
  let sidebarAdviser = DEFAULT_ADVISER;
  let otherNeighborhoods = EMPTY_ARRAY;
  let houseTypesTitle = "";
  let houseTypes = EMPTY_ARRAY;
  let mapEmbedUrl = null;
  let updatesLink = null;

  try {
    // 1. Fetch project document
    const projectDoc = await getDoc(doc(db, 'projects', id));
    if (projectDoc.exists()) {
      const project = projectDoc.data();
      
      title = project.name || 'Premium District';
      if (project.heroImage) {
        heroImage = project.heroImage;
      }
      heroDescription = project.tagline || "";
      description = project.description || "";
      mapEmbedUrl = project.mapEmbedUrl || null;
      updatesLink = project.updatesLink || null;

      if (project.highlights && project.highlights.length > 0) {
        highlights = project.highlights;
      }

      if (project.realEstateVibe && project.realEstateVibe.length > 0) {
        realEstateVibe = project.realEstateVibe.map(v => ({
          category: v.title || v.category || '',
          details: v.description || v.details || ''
        }));
      }

      if (project.nearbyFacilities && project.nearbyFacilities.length > 0) {
        nearbyFacilities = project.nearbyFacilities.map(f => ({
          category: f.category || 'Location',
          establishment: f.name || f.establishment || '',
          travelTime: f.distance || f.travelTime || ''
        }));
      }

      if (project.marketSnapshot && project.marketSnapshot.length > 0) {
        marketSnapshot = project.marketSnapshot.map(s => ({
          plotCategory: s.metric || s.plotCategory || '',
          priceRange: s.value || s.priceRange || '',
          outlook: s.outlook || 'Stable Growth'
        }));
      }

      if (project.plotSizes && project.plotSizes.length > 0) {
        plotSizes = project.plotSizes.map(p => ({
          plotType: p.plotType || 'Standard Plot',
          dimensions: p.dimensions || '',
          area: p.area || p.size || '',
          availability: p.availability || 'Available'
        }));
      }

      // 2. Fetch advisor/agent in parallel with house types and other neighborhoods
      let advisorFetch = Promise.resolve(null);
      if (project.advisorId) {
        advisorFetch = getDoc(doc(db, 'advisors', project.advisorId)).catch(() => null);
      }

      let houseTypesFetch = Promise.resolve([]);
      if (project.houseTypeIds && project.houseTypeIds.length > 0) {
        houseTypesFetch = Promise.all(
          project.houseTypeIds.map(htId => getDoc(doc(db, 'houseTypes', htId)).catch(() => null))
        );
      }

      const neighborhoodsFetch = getDocs(query(collection(db, 'projects'), limit(15))).catch(() => null);

      const [advisorDoc, houseTypesDocs, neighborhoodsSnap] = await Promise.all([
        advisorFetch,
        houseTypesFetch,
        neighborhoodsFetch
      ]);

      // Resolve advisor
      if (advisorDoc && advisorDoc.exists()) {
        const adv = advisorDoc.data();
        sidebarAdviser = {
          name: adv.name || '',
          role: adv.role || '',
          quote: adv.quote || 'We are committed to delivering the ultimate standard in smart urban residential living.',
          phone: adv.phone || '+234 810 001 7777',
          email: adv.email || 'sarah.k@wisdomkwati.com',
          image: adv.image || 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1f60lY6QnI4T6pUfN0V-V6y6W6h6h6h6h%26sz=w1200'
        };
      } else if (project.agent && project.agent.name) {
        sidebarAdviser = {
          name: project.agent.name || '',
          role: project.agent.role || '',
          quote: project.agent.quote || 'We are committed to delivering the ultimate standard in smart urban residential living.',
          phone: project.agent.phone || '+234 810 001 7777',
          email: project.agent.email || 'sarah.k@wisdomkwati.com',
          image: project.agent.image || 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1f60lY6QnI4T6pUfN0V-V6y6W6h6h6h6h%26sz=w1200'
        };
      }

      // Resolve house types
      if (houseTypesDocs && houseTypesDocs.length > 0) {
        const resolvedHouseTypes = [];
        houseTypesDocs.forEach((htDoc, idx) => {
          if (htDoc && htDoc.exists()) {
            const ht = htDoc.data();
            const htId = project.houseTypeIds[idx];
            resolvedHouseTypes.push({
              id: htId,
              name: ht.classType || htId,
              tagline: ht.tagline || `${ht.beds || 0} Bedroom Smart Villa`,
              beds: ht.beds || 0,
              baths: ht.baths || 0,
              size: ht.size || 'N/A',
              image: ht.images && ht.images.length > 0 ? ht.images[0] : 'https://placehold.co/600x400/111/fff?text=Villa+Spec',
              estate: '',
            });
          }
        });
        houseTypes = resolvedHouseTypes;
      }

      // Resolve other neighborhoods
      if (neighborhoodsSnap) {
        const allProjects = [];
        neighborhoodsSnap.forEach((doc) => {
          const d = doc.data();
          if (!d.name) return;
          allProjects.push({
            id: doc.id,
            name: d.name,
            district: d.location || d.tagline || 'Nigeria',
            image: d.detailsImage || d.heroImage || 'https://placehold.co/1200x800/111/fff?text=Estate',
            link: `/projects/${doc.id}`,
            sortOrder: d.sortOrder,
          });
        });
        allProjects.sort((a, b) => {
          const orderA = a.sortOrder !== undefined && a.sortOrder !== null ? a.sortOrder : 999;
          const orderB = b.sortOrder !== undefined && b.sortOrder !== null ? b.sortOrder : 999;
          if (orderA !== orderB) {
            return orderA - orderB;
          }
          return a.name.localeCompare(b.name);
        });
        otherNeighborhoods = allProjects.filter(p => p.id !== id).slice(0, 4);
      }
    }
  } catch (err) {
    console.error('Server error preloading project detail page:', err);
  }

  return (
    <ProjectDetailTemplate
      title={title}
      heroImage={heroImage}
      heroVideo={heroVideo}
      heroPoster={heroPoster}
      heroDescription={heroDescription}
      description={description}
      highlights={highlights}
      realEstateVibe={realEstateVibe}
      nearbyFacilities={nearbyFacilities}
      marketSnapshot={marketSnapshot}
      plotSizes={plotSizes}
      sidebarAdviser={sidebarAdviser}
      otherNeighborhoods={otherNeighborhoods}
      houseTypesTitle={houseTypesTitle}
      houseTypes={houseTypes}
      mapEmbedUrl={mapEmbedUrl}
      updatesLink={updatesLink}
      projectId={id}
    />
  );
}
