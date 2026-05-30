'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { doc, getDoc, collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HouseTypeCard from './cards/HouseTypeCard';
import SocialShare from './SocialShare';

const DEFAULT_ADVISER = {
  name: "Sarah Kwati",
  role: "Project Advisor",
  quote: "We are committed to delivering the ultimate standard in smart urban residential living.",
  phone: "+234 810 001 7777",
  email: "sarah.k@wisdomkwati.com",
  image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1f60lY6QnI4T6pUfN0V-V6y6W6h6h6h6h%26sz=w1200"
};

// Global module-level cache helper to optimize page-to-page navigation and share fetched Firestore documents globally
const getGlobalCache = () => {
  if (typeof window !== 'undefined') {
    if (!window.wkscCache) {
      window.wkscCache = {
        houseTypes: {},
        projects: {},
        advisors: {},
        parentProjects: {},
        relatedHouseTypes: {},
        otherNeighborhoodsCache: null
      };
    }
    return window.wkscCache;
  }
  return {
    houseTypes: {},
    projects: {},
    advisors: {},
    parentProjects: {},
    relatedHouseTypes: {},
    otherNeighborhoodsCache: null
  };
};

export default function ProjectDetailTemplate({
  title: initialTitle,
  heroImage: initialHeroImage,
  heroVideo: initialHeroVideo,
  heroPoster: initialHeroPoster,
  heroDescription: initialHeroDescription,
  updatesLink: initialUpdatesLink,
  description: initialDescription,
  highlights: initialHighlights,
  realEstateVibe: initialRealEstateVibe,
  nearbyFacilities: initialNearbyFacilities,
  marketSnapshot: initialMarketSnapshot,
  plotSizes: initialPlotSizes,
  sidebarAdviser: initialSidebarAdviser,
  otherNeighborhoods: initialOtherNeighborhoods,
  houseTypesTitle: initialHouseTypesTitle,
  houseTypes: initialHouseTypes,
  mapEmbedUrl: initialMapEmbedUrl,
  projectId
}) {
  const cache = getGlobalCache();
  const projectCache = cache.projects;
  const houseTypesCache = cache.houseTypes;
  const advisorsCache = cache.advisors;

  const [title, setTitle] = useState(initialTitle);
  const [heroImage, setHeroImage] = useState(initialHeroImage);
  const [heroVideo, setHeroVideo] = useState(initialHeroVideo);
  const [heroPoster, setHeroPoster] = useState(initialHeroPoster);
  const [heroDescription, setHeroDescription] = useState(initialHeroDescription);
  const [updatesLink, setUpdatesLink] = useState(initialUpdatesLink);
  const [description, setDescription] = useState(initialDescription);
  const [highlights, setHighlights] = useState(initialHighlights);
  const [realEstateVibe, setRealEstateVibe] = useState(initialRealEstateVibe);
  const [nearbyFacilities, setNearbyFacilities] = useState(initialNearbyFacilities);
  const [marketSnapshot, setMarketSnapshot] = useState(initialMarketSnapshot);
  const [plotSizes, setPlotSizes] = useState(initialPlotSizes);
  const [sidebarAdviser, setSidebarAdviser] = useState(initialSidebarAdviser || DEFAULT_ADVISER);
  const [otherNeighborhoods, setOtherNeighborhoods] = useState(initialOtherNeighborhoods);
  const [houseTypesTitle, setHouseTypesTitle] = useState(initialHouseTypesTitle);
  const [houseTypes, setHouseTypes] = useState(initialHouseTypes);
  const [mapEmbedUrl, setMapEmbedUrl] = useState(initialMapEmbedUrl);

  const resolvedProjectId = projectId || (typeof window !== 'undefined' ? window.location.pathname.replace(/^\/|\/$/g, '').split('/').pop() : '');

  // Sync state if props change
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
    if (initialHeroImage) setHeroImage(initialHeroImage);
    if (initialHeroVideo) setHeroVideo(initialHeroVideo);
    if (initialHeroPoster) setHeroPoster(initialHeroPoster);
    if (initialHeroDescription) setHeroDescription(initialHeroDescription);
    if (initialUpdatesLink) setUpdatesLink(initialUpdatesLink);
    if (initialDescription) setDescription(initialDescription);
    if (initialHighlights && initialHighlights.length > 0) setHighlights(initialHighlights);
    if (initialRealEstateVibe && initialRealEstateVibe.length > 0) setRealEstateVibe(initialRealEstateVibe);
    if (initialNearbyFacilities && initialNearbyFacilities.length > 0) setNearbyFacilities(initialNearbyFacilities);
    if (initialMarketSnapshot && initialMarketSnapshot.length > 0) setMarketSnapshot(initialMarketSnapshot);
    if (initialPlotSizes && initialPlotSizes.length > 0) setPlotSizes(initialPlotSizes);
    if (initialSidebarAdviser) setSidebarAdviser(initialSidebarAdviser);
    if (initialOtherNeighborhoods && initialOtherNeighborhoods.length > 0) setOtherNeighborhoods(initialOtherNeighborhoods);
    if (initialHouseTypesTitle) setHouseTypesTitle(initialHouseTypesTitle);
    if (initialHouseTypes && initialHouseTypes.length > 0) setHouseTypes(initialHouseTypes);
    if (initialMapEmbedUrl) setMapEmbedUrl(initialMapEmbedUrl);
  }, [
    initialTitle, initialHeroImage, initialHeroVideo, initialHeroPoster,
    initialHeroDescription, initialUpdatesLink, initialDescription, initialHighlights,
    initialRealEstateVibe, initialNearbyFacilities, initialMarketSnapshot,
    initialPlotSizes, initialSidebarAdviser, initialOtherNeighborhoods,
    initialHouseTypesTitle, initialHouseTypes, initialMapEmbedUrl
  ]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Load from CMS on mount if document exists
  useEffect(() => {
    // If the data was pre-rendered and pre-fetched on the server, skip client-side Firestore queries
    if (initialTitle && initialTitle !== "Loading Estate...") {
      console.log("[CMS Server Render Hit] Skipping client-side database queries for project data.");
      return;
    }

    async function fetchCmsData() {
      try {
        const path = window.location.pathname.replace(/^\/|\/$/g, '').split('/').pop();
        console.log("[CMS Debug] pathname:", window.location.pathname, "-> parsed path:", path);
        if (!path) return;

        let project;
        if (projectCache[path]) {
          project = projectCache[path];
          console.log("[CMS Cache Hit] project data:", project);
        } else {
          const projectDoc = await getDoc(doc(db, 'projects', path));
          console.log("[CMS Debug] projectDoc exists:", projectDoc.exists());
          if (projectDoc.exists()) {
            project = projectDoc.data();
            projectCache[path] = project;
          }
        }

        if (project) {
          if (project.name) setTitle(project.name);
          if (project.heroImage) {
            setHeroImage(project.heroImage);
            setHeroVideo(null);
            setHeroPoster(null);
          }
          if (project.tagline) setHeroDescription(project.tagline);
          if (project.description) setDescription(project.description);
          if (project.mapEmbedUrl) setMapEmbedUrl(project.mapEmbedUrl);
          if (project.updatesLink) setUpdatesLink(project.updatesLink);
          
          if (project.highlights && project.highlights.length > 0) {
            setHighlights(project.highlights);
          }

          if (project.realEstateVibe && project.realEstateVibe.length > 0) {
            setRealEstateVibe(project.realEstateVibe.map(v => ({
              category: v.title || v.category || '',
              details: v.description || v.details || ''
            })));
          }

          if (project.nearbyFacilities && project.nearbyFacilities.length > 0) {
            setNearbyFacilities(project.nearbyFacilities.map(f => ({
              category: f.category || 'Location',
              establishment: f.name || f.establishment || '',
              travelTime: f.distance || f.travelTime || ''
            })));
          }

          if (project.marketSnapshot && project.marketSnapshot.length > 0) {
            setMarketSnapshot(project.marketSnapshot.map(s => ({
              plotCategory: s.metric || s.plotCategory || '',
              priceRange: s.value || s.priceRange || '',
              outlook: s.outlook || 'Stable Growth'
            })));
          }

          if (project.plotSizes && project.plotSizes.length > 0) {
            setPlotSizes(project.plotSizes.map(p => ({
              plotType: p.size || p.plotType || '',
              dimensions: p.dimensions || '',
              area: p.size || p.area || '',
              availability: p.availability || 'Available'
            })));
          }

          // Resolve relational or embedded advisor/agent (Prioritizing advisorId)
          if (project.advisorId) {
            console.log("[CMS Debug] Fetching advisor from collection with advisorId:", project.advisorId);
            let advisor;
            if (advisorsCache[project.advisorId]) {
              advisor = advisorsCache[project.advisorId];
              console.log("[CMS Cache Hit] Setting sidebar advisor from cache:", advisor);
            } else {
              const advisorDoc = await getDoc(doc(db, 'advisors', project.advisorId));
              console.log("[CMS Debug] advisorDoc exists:", advisorDoc.exists());
              if (advisorDoc.exists()) {
                advisor = advisorDoc.data();
                advisorsCache[project.advisorId] = advisor;
              }
            }

            if (advisor) {
              setSidebarAdviser({
                name: advisor.name || '',
                role: advisor.role || '',
                quote: advisor.quote || 'We are committed to delivering the ultimate standard in smart urban residential living.',
                phone: advisor.phone || '+234 810 001 7777',
                email: advisor.email || 'sarah.k@wisdomkwati.com',
                image: advisor.image || 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1f60lY6QnI4T6pUfN0V-V6y6W6h6h6h6h%26sz=w1200'
              });
            } else if (project.agent && project.agent.name) {
              console.log("[CMS Debug] Assigned advisorId doc does not exist. Falling back to project.agent:", project.agent);
              setSidebarAdviser({
                name: project.agent.name || '',
                role: project.agent.role || '',
                quote: project.agent.quote || 'We are committed to delivering the ultimate standard in smart urban residential living.',
                phone: project.agent.phone || '+234 810 001 7777',
                email: project.agent.email || 'sarah.k@wisdomkwati.com',
                image: project.agent.image || 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1f60lY6QnI4T6pUfN0V-V6y6W6h6h6h6h%26sz=w1200'
              });
            } else {
              setSidebarAdviser(DEFAULT_ADVISER);
            }
          } else if (project.agent && project.agent.name) {
            console.log("[CMS Debug] No advisorId set. Using legacy project.agent:", project.agent);
            setSidebarAdviser({
              name: project.agent.name || '',
              role: project.agent.role || '',
              quote: project.agent.quote || 'We are committed to delivering the ultimate standard in smart urban residential living.',
              phone: project.agent.phone || '+234 810 001 7777',
              email: project.agent.email || 'sarah.k@wisdomkwati.com',
              image: project.agent.image || 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1f60lY6QnI4T6pUfN0V-V6y6W6h6h6h6h%26sz=w1200'
            });
          } else {
            console.log("[CMS Debug] No agent or advisorId defined in Firestore project doc, setting default adviser");
            setSidebarAdviser(DEFAULT_ADVISER);
          }

          // Resolve house specifications
          if (project.houseTypeIds && project.houseTypeIds.length > 0) {
            const houseTypesList = [];
            const idsToFetch = [];

            project.houseTypeIds.forEach(htId => {
              if (houseTypesCache[htId]) {
                const ht = houseTypesCache[htId];
                houseTypesList.push({
                  id: htId,
                  name: ht.classType || htId,
                  tagline: ht.tagline || `${ht.beds || 0} Bedroom Smart Villa`,
                  beds: ht.beds || 0,
                  baths: ht.baths || 0,
                  size: ht.size || 'N/A',
                  image: ht.images && ht.images.length > 0 ? ht.images[0] : 'https://placehold.co/600x400/111/fff?text=Villa+Spec',
                  estate: '',
                });
              } else {
                idsToFetch.push(htId);
              }
            });

            if (idsToFetch.length > 0) {
              const promises = idsToFetch.map(htId => getDoc(doc(db, 'houseTypes', htId)));
              const docsResolved = await Promise.all(promises);
              docsResolved.forEach((htDoc, index) => {
                if (htDoc.exists()) {
                  const ht = htDoc.data();
                  const htId = idsToFetch[index];
                  houseTypesCache[htId] = ht;
                  houseTypesList.push({
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
            }

            if (houseTypesList.length > 0) {
              setHouseTypes(houseTypesList);
              // Share parent project and related properties globally to ensure instant detail page loading
              project.houseTypeIds.forEach(htId => {
                cache.parentProjects[htId] = { id: path, name: project.name || 'Premium District', ...project };
                cache.relatedHouseTypes[htId] = houseTypesList.filter(h => h.id !== htId).slice(0, 2).map(h => ({
                  id: h.id,
                  ...houseTypesCache[h.id]
                }));
              });
            }
          }
        }
      } catch (err) {
        console.error('CMS Frontend Fetch error:', err);
      }
    }
    fetchCmsData();
  }, []);

  // Fetch other neighborhoods dynamically from Firestore
  useEffect(() => {
    // Skip client-side Firestore query if preloaded on the server
    if (initialOtherNeighborhoods && initialOtherNeighborhoods.length > 0) {
      console.log("[CMS Server Render Hit] Skipping other neighborhoods client-side query.");
      return;
    }

    async function fetchOtherNeighborhoods() {
      try {
        const path = window.location.pathname.replace(/^\/|\/$/g, '').split('/').pop();
        
        let allProjects = [];
        if (otherNeighborhoodsCache) {
          allProjects = otherNeighborhoodsCache;
          console.log("[CMS Cache Hit] other neighborhoods list");
        } else {
          const queryRef = query(collection(db, 'projects'), limit(15));
          const snap = await getDocs(queryRef);
          snap.forEach((doc) => {
            const d = doc.data();
            if (!d.name) return;
            allProjects.push({
              id: doc.id,
              name: d.name,
              district: d.location || d.tagline || 'Nigeria',
              image: d.detailsImage || d.heroImage || 'https://placehold.co/1200x800/111/fff?text=Estate',
              link: `/projects/${doc.id}`
            });
          });
          otherNeighborhoodsCache = allProjects;
        }

        const list = allProjects.filter(p => p.id !== path);
        setOtherNeighborhoods(list.slice(0, 4));
      } catch (err) {
        console.error('Error fetching other neighborhoods:', err);
      }
    }
    fetchOtherNeighborhoods();
  }, []);

  const videoRef = React.useRef(null);
  React.useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current && heroVideo) {
        try {
          videoRef.current.muted = true;
          videoRef.current.defaultMuted = true;
          videoRef.current.load();
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              setTimeout(() => {
                if (videoRef.current) videoRef.current.play().catch(() => {});
              }, 1000);
            });
          }
        } catch (err) {}
      }
    };
    playVideo();
  }, [heroVideo]);

  // AEO/GEO Schema for AI Citations
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": title,
    "description": heroDescription || description,
    "image": heroImage,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": title.split(' ')[0],
      "addressRegion": "Abuja",
      "addressCountry": "NG"
    },
    "amenityFeature": highlights?.map(h => ({
      "@type": "LocationFeatureSpecification",
      "name": h,
      "value": true
    })),
    "additionalProperty": realEstateVibe?.map(v => ({
      "@type": "PropertyValue",
      "name": v.category,
      "value": v.details
    }))
  };

  return (
    <div className="pd-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Custom Card Cursor */}
      <div id="card-cursor" className="card-cursor">
        <span>VIEW</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>

      {/* Hero Section */}
      <section className="pd-hero">
        <div className="pd-hero-image">
          {heroVideo ? (
            <div className="bg-video-wrapper" style={{ 
              position: "absolute", 
              top: "0", 
              left: "0", 
              width: "100%", 
              height: "100%", 
              overflow: "hidden",
              zIndex: "0"
            }}>
              <video 
                ref={videoRef}
                autoPlay 
                muted 
                loop 
                playsInline 
                crossOrigin="anonymous"
                poster={heroPoster}
                onLoadedData={(e) => {
                    e.currentTarget.play().catch(() => {});
                }}
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  pointerEvents: "none"
                }}
              >
                <source 
                  src={heroVideo.includes('drive.google.com') 
                    ? `https://drive.google.com/uc?export=download&id=${heroVideo.includes('/d/') ? heroVideo.split('/d/')[1].split('/')[0] : (heroVideo.includes('id=') ? heroVideo.split('id=')[1].split('&')[0] : heroVideo)}`
                    : heroVideo} 
                  type="video/mp4" 
                />
              </video>
              
              {/* Professional Interaction Shield */}
              <div style={{ 
                position: "absolute", 
                top: "0", 
                left: "0", 
                width: "100%", 
                height: "100%", 
                background: "transparent", 
                zIndex: "1",
                pointerEvents: "all"
              }}></div>
            </div>
          ) : (
            <Image width={1920} height={1080} priority={true} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={heroImage} alt={title} referrerPolicy="no-referrer" />
          )}
        </div>
        <div className="pd-hero-overlay"></div>
        <div className="pd-hero-content reveal-on-scroll">
          <h1 className="pd-hero-title" style={{ textTransform: 'uppercase' }}>{title}</h1>
          <p className="pd-hero-description">{heroDescription}</p>
          <Link href={`/projects/${resolvedProjectId}/updates`} className="btn-pill" style={{ marginTop: "30px", display: "inline-flex", backgroundColor: "var(--accent-green)", color: "var(--text-primary)", borderWidth: 0 }}>
            <div className="flip-text">
              <span>VIEW SITE UPDATES</span>
              <span aria-hidden="true">VIEW SITE UPDATES</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px" }}><polyline points="9 18 15 12 9 6"></polyline></svg>
          </Link>
        </div>
      </section>

      <main className="container-1380">
        <div className="pd-main-layout">
          {/* Left Column */}
          <div className="pd-left-col">
            {/* Description */}
            <section className="pd-section reveal-on-scroll">
              <p className="pd-description-text">
                {description}
              </p>
              {highlights && (
                <>
                  <div className="pd-section-title">District Highlights</div>
                  <ul className="pd-highlights">
                    {highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </section>

            {/* Estate Vibe */}
            {realEstateVibe && (
              <section className="pd-section reveal-on-scroll">
                <div className="pd-section-title">Real Estate Vibe</div>
                <div className="pd-table-container">
                  <table className="pd-table"><thead><tr><th>Category</th><th>Specifications & Details</th></tr></thead><tbody>{realEstateVibe.map((row, idx) => (<tr key={idx}><td className="pd-label-cell">{row.category}</td><td>{row.details}</td></tr>))}</tbody></table>
                </div>
              </section>
            )}

            {/* Nearby Facilities */}
            {nearbyFacilities && (
              <section className="pd-section reveal-on-scroll">
                <div className="pd-section-title">Nearby Facilities</div>
                <div className="pd-table-container">
                  <table className="pd-table"><thead><tr><th>Category</th><th>Establishment</th><th>Travel Time</th></tr></thead><tbody>{nearbyFacilities.map((row, idx) => (<tr key={idx}><td className="pd-label-cell">{row.category}</td><td>{row.establishment}</td><td>{row.travelTime}</td></tr>))}</tbody></table>
                </div>
              </section>
            )}

            {/* Market Snapshot */}
            {marketSnapshot && (
              <section className="pd-section reveal-on-scroll">
                <div className="pd-section-title">Market Snapshot</div>
                <div className="pd-table-container">
                  <table className="pd-table"><thead><tr><th>Plot Category</th><th>Price Range</th><th>Investment Outlook</th></tr></thead><tbody>{marketSnapshot.map((row, idx) => (<tr key={idx}><td className="pd-label-cell">{row.plotCategory}</td><td>{row.priceRange}</td><td>{row.outlook}</td></tr>))}</tbody></table>
                </div>
              </section>
            )}

            {/* Plot Sizes */}
            {plotSizes && (
              <section className="pd-section reveal-on-scroll">
                <div className="pd-section-title">Available Plot Sizes</div>
                <div className="pd-table-container">
                  <table className="pd-table"><thead><tr><th>Plot Type</th><th>Dimensions</th><th>Area</th><th>Availability</th></tr></thead><tbody>{plotSizes.map((row, idx) => (<tr key={idx}><td className="pd-label-cell">{row.plotType}</td><td>{row.dimensions}</td><td>{row.area}</td><td>{row.availability}</td></tr>))}</tbody></table>
                </div>
              </section>
            )}

            {/* Estate Map */}
            {mapEmbedUrl && (
              <section className="pd-section reveal-on-scroll" style={{ marginBottom: 0 }}>
                <div className="pd-section-title">Location Map</div>
                <div style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--border)' }}>
                  <iframe 
                    src={mapEmbedUrl} 
                    title="Estate location map"
                    width="100%" 
                    height="100%" 
                    style={{ borderWidth: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </section>
            )}

            <SocialShare title={title} />
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="pd-sidebar">
            <div className="pd-neighborhoods-sticky-wrapper">
              <div className="pd-sidebar-header reveal-on-scroll">
                <div className="pd-sidebar-label">OTHER NEIGHBORHOODS</div>
                <h2 className="pd-sidebar-headline">Each area has its own charm — let’s help you find your match.</h2>
              </div>
              <div className="pd-compact-list reveal-on-scroll">
                {otherNeighborhoods?.map((item, idx) => (
                  <Link key={idx} href={item.link} className="pd-compact-item">
                    <div className="pd-compact-flipper">
                      <div className="pd-compact-front">
                        <Image width={70} height={70} className="pd-compact-thumb" src={item.image} alt={item.name} referrerPolicy="no-referrer" />
                        <div className="pd-compact-info">
                          <h4>{item.name}</h4>
                          <p>{item.district}</p>
                        </div>
                      </div>
                      <div className="pd-compact-back">
                        <Image width={70} height={70} className="pd-compact-thumb" src={item.image} alt={item.name} referrerPolicy="no-referrer" />
                        <div className="pd-compact-info">
                          <h4>{item.name}</h4>
                          <p>{item.district}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {sidebarAdviser && (
              <div className="pd-sidebar-card" suppressHydrationWarning={true}>
                <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-green)", display: "block", marginBottom: "16px" }}>Project Advisor</span>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <Image width={56} height={56} src={sidebarAdviser.image} alt={sidebarAdviser.name} style={{ width: "56px", height: "56px", borderRadius: "4px", objectFit: "cover", flexShrink: "0" }} referrerPolicy="no-referrer" />
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>{sidebarAdviser.name}</h3>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "0" }}>{sidebarAdviser.role}</p>
                  </div>
                </div>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>&ldquo;{sidebarAdviser.quote}&rdquo;</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                  <a href={`tel:${sidebarAdviser.phone}`} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}>
                    <i className="fa-solid fa-phone" style={{ width: "14px", color: "var(--accent-green)" }}></i> {sidebarAdviser.phone}
                  </a>
                  <a href={`mailto:${sidebarAdviser.email}`} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}>
                    <i className="fa-solid fa-envelope" style={{ width: "14px", color: "var(--accent-green)" }}></i> {sidebarAdviser.email}
                  </a>
                </div>
                <button 
                  type="button"
                  className="btn-pill btn-book-consultation" 
                  data-advisor-email={sidebarAdviser.email}
                  data-advisor-name={sidebarAdviser.name}
                  style={{ width: "100%", justifyContent: "center", background: "var(--text-primary)", color: "#fff", border: "none", cursor: "pointer" }}
                >
                  <div className="flip-text">
                    <span>BOOK A CONSULTATION</span>
                    <span aria-hidden="true">BOOK A CONSULTATION</span>
                  </div>
                </button>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* House Types Section */}
      <section className="pd-properties-section">
        <div className="portfolio-container-main">
          <div className="section-line"></div>
          <div className="portfolio-header sidebar-layout pd-properties-header">
            <div className="portfolio-label">
              <div className="label-square"></div>
              HOUSE TYPES
            </div>
            <h2 className="portfolio-headline">
              {houseTypesTitle || `House types in ${title}`}
            </h2>
          </div>

          <div className="wksc-ht-grid pd-properties-grid">
            {houseTypes?.map((item, idx) => (
              <HouseTypeCard key={item.id || idx} {...item} />
            ))}
          </div>
          <div className="portfolio-footer" style={{ display: "flex", justifyContent: "center", marginTop: "80px", paddingBottom: "0" }}>
            <Link href="/house-types" className="btn-pill" style={{ backgroundColor: "var(--accent-green)", border: "none", color: "#000", fontWeight: "600", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="flip-text">
                <span>VIEW ALL PROPERTIES</span>
                <span aria-hidden="true">VIEW ALL PROPERTIES</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
