'use client';

import React from 'react';
import Link from 'next/link';

export default function ProjectDetailTemplate({
  title,
  heroImage,
  heroVideo,
  heroPoster,
  heroDescription,
  updatesLink,
  description,
  highlights,
  realEstateVibe, // Array of { category, details }
  nearbyFacilities, // Array of { category, establishment, travelTime }
  marketSnapshot, // Array of { plotCategory, priceRange, outlook }
  plotSizes, // Array of { plotType, dimensions, area, availability }
  sidebarAdviser, // { name, role, quote, phone, email, image }
  otherNeighborhoods, // Array of { name, district, link, image }
  houseTypesTitle,
  houseTypes // Array of { name, location, type, beds, baths, size, link, image }
}) {
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
          <h1 className="pd-hero-title">{title}</h1>
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
              <section className="pd-section reveal-on-scroll" style={{ marginBottom: 0 }}>
                <div className="pd-section-title">Available Plot Sizes</div>
                <div className="pd-table-container">
                  <table className="pd-table"><thead><tr><th>Plot Type</th><th>Dimensions</th><th>Area</th><th>Availability</th></tr></thead><tbody>{plotSizes.map((row, idx) => (<tr key={idx}><td className="pd-label-cell">{row.plotType}</td><td>{row.dimensions}</td><td>{row.area}</td><td>{row.availability}</td></tr>))}</tbody></table>
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
                    <div className="pd-compact-flipper">
                      <div className="pd-compact-front">
                        <img loading="lazy" src={item.image} alt={item.name} className="pd-compact-thumb" referrerPolicy="no-referrer" />
                        <div className="pd-compact-info">
                          <h4>{item.name}</h4>
                          <p>{item.district}</p>
                        </div>
                      </div>
                      <div className="pd-compact-back">
                        <img loading="lazy" src={item.image} alt={item.name} className="pd-compact-thumb" referrerPolicy="no-referrer" />
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
                    <h3 className="ht-card-name">{item.name}</h3>
                    <p className="ht-card-location">{item.location}</p>
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
