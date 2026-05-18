'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
  mapEmbedUrl: initialMapEmbedUrl
}) {
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
  const [sidebarAdviser, setSidebarAdviser] = useState(initialSidebarAdviser);
  const [otherNeighborhoods, setOtherNeighborhoods] = useState(initialOtherNeighborhoods);
  const [houseTypesTitle, setHouseTypesTitle] = useState(initialHouseTypesTitle);
  const [houseTypes, setHouseTypes] = useState(initialHouseTypes);
  const [mapEmbedUrl, setMapEmbedUrl] = useState(initialMapEmbedUrl);

  // Sync state if props change
  useEffect(() => {
    setTitle(initialTitle);
    setHeroImage(initialHeroImage);
    setHeroVideo(initialHeroVideo);
    setHeroPoster(initialHeroPoster);
    setHeroDescription(initialHeroDescription);
    setUpdatesLink(initialUpdatesLink);
    setDescription(initialDescription);
    setHighlights(initialHighlights);
    setRealEstateVibe(initialRealEstateVibe);
    setNearbyFacilities(initialNearbyFacilities);
    setMarketSnapshot(initialMarketSnapshot);
    setPlotSizes(initialPlotSizes);
    setSidebarAdviser(initialSidebarAdviser);
    setOtherNeighborhoods(initialOtherNeighborhoods);
    setHouseTypesTitle(initialHouseTypesTitle);
    setHouseTypes(initialHouseTypes);
    setMapEmbedUrl(initialMapEmbedUrl);
  }, [
    initialTitle, initialHeroImage, initialHeroVideo, initialHeroPoster,
    initialHeroDescription, initialUpdatesLink, initialDescription, initialHighlights,
    initialRealEstateVibe, initialNearbyFacilities, initialMarketSnapshot,
    initialPlotSizes, initialSidebarAdviser, initialOtherNeighborhoods,
    initialHouseTypesTitle, initialHouseTypes, initialMapEmbedUrl
  ]);

  // Load from CMS on mount if document exists
  useEffect(() => {
    async function fetchCmsData() {
      try {
        const path = window.location.pathname.replace(/^\/|\/$/g, '').split('/').pop();
        if (!path) return;

        const projectDoc = await getDoc(doc(db, 'projects', path));
        if (projectDoc.exists()) {
          const project = projectDoc.data();

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

          // Resolve relational advisor
          if (project.advisorId) {
            const advisorDoc = await getDoc(doc(db, 'advisors', project.advisorId));
            if (advisorDoc.exists()) {
              const advisor = advisorDoc.data();
              setSidebarAdviser({
                name: advisor.name || '',
                role: advisor.role || '',
                quote: advisor.quote || '',
                phone: advisor.phone || '',
                email: advisor.email || '',
                image: advisor.image || ''
              });
            }
          }

          // Resolve house specifications
          if (project.houseTypeIds && project.houseTypeIds.length > 0) {
            const houseTypesList = [];
            for (const htId of project.houseTypeIds) {
              const htDoc = await getDoc(doc(db, 'houseTypes', htId));
              if (htDoc.exists()) {
                const ht = htDoc.data();
                houseTypesList.push({
                  name: ht.classType || htId,
                  location: `${ht.beds || 0}BR Smart Villa`,
                  type: ht.classType || 'Villa spec',
                  beds: String(ht.beds || 0),
                  baths: String(ht.baths || 0),
                  size: ht.size || '',
                  link: `/house-types/${htId}`,
                  image: ht.images && ht.images.length > 0 ? ht.images[0] : 'https://placehold.co/600x400/111/fff?text=Villa+Spec'
                });
              }
            }
            if (houseTypesList.length > 0) {
              setHouseTypes(houseTypesList);
            }
          }
        }
      } catch (err) {
        console.error('CMS Frontend Fetch error:', err);
      }
    }
    fetchCmsData();
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
            <img fetchPriority="high" src={heroImage} alt={title} referrerPolicy="no-referrer" />
          )}
        </div>
        <div className="pd-hero-overlay"></div>
        <div className="pd-hero-content reveal-on-scroll">
          <h1 className="pd-hero-title" style={{ textTransform: 'uppercase' }}>{title}</h1>
          <p className="pd-hero-description">{heroDescription}</p>
          <Link href={updatesLink || "#"} className="btn-pill" style={{ marginTop: "30px", display: "inline-flex", background: "var(--accent-green)", color: "var(--text-primary)", border: "none" }}>
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
                <div style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                  <iframe 
                    src={mapEmbedUrl} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </section>
            )}
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
                    <img loading="lazy" src={item.image} alt={item.name} className="pd-compact-thumb" referrerPolicy="no-referrer" />
                    <div className="pd-compact-info">
                      <h4>{item.name}</h4>
                      {item.district && <p>, {item.district}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {sidebarAdviser && (
              <div className="pd-sidebar-card reveal-on-scroll" style={{ marginTop: "40px", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "4px", padding: "24px" }}>
                <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-green)", display: "block", marginBottom: "16px" }}>Project Advisor</span>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                  <img loading="lazy" src={sidebarAdviser.image} alt={sidebarAdviser.name} style={{ width: "56px", height: "56px", borderRadius: "4px", objectFit: "cover", flexShrink: "0" }} referrerPolicy="no-referrer" />
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
                <Link href="/contact" className="btn-pill" style={{ width: "100%", justifyContent: "center", background: "var(--text-primary)", color: "#fff", border: "none" }}>
                  <div className="flip-text">
                    <span>BOOK A CONSULTATION</span>
                    <span aria-hidden="true">BOOK A CONSULTATION</span>
                  </div>
                </Link>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* House Types Section */}
      <section className="pd-properties-section" style={{ background: "var(--bg-main)" }}>
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

          <div className="portfolio-grid pd-properties-grid">
            {houseTypes?.map((item, idx) => (
              <Link key={idx} href={item.link} className="ht-card reveal-on-scroll">
                <div className="ht-card-image">
                  <img loading="lazy" src={item.image} alt={item.name} referrerPolicy="no-referrer" />
                </div>
                <div className="ht-card-info">
                  <div className="ht-card-left">
                    <h3 className="ht-card-name" style={{ textTransform: 'capitalize' }}>{item.name}</h3>
                    <p className="ht-card-location" style={{ textTransform: 'capitalize' }}>{item.location}</p>
                  </div>
                  <div className="ht-card-right">
                    <p className="ht-card-type">{item.type}</p>
                    <div className="ht-card-specs">
                      <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path>
                        </svg> {item.beds}
                      </span>
                      <span className="ht-dot"></span>
                      <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                          <path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path>
                        </svg> {item.baths}
                      </span>
                      <span className="ht-dot"></span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </div>
              </Link>
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
