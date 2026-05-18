'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Page({ params }) {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [parentProject, setParentProject] = useState(null);
  const [relatedProperties, setRelatedProperties] = useState([]);

  useEffect(() => {
    async function loadHouseType() {
      try {
        const docRef = doc(db, 'houseTypes', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const ht = docSnap.data();
          setData(ht);

          // Find the parent project where this house type is listed
          const projectsRef = collection(db, 'projects');
          const projectsSnap = await getDocs(projectsRef);
          let foundProject = null;
          
          projectsSnap.forEach((projDoc) => {
            const projData = projDoc.data();
            if (projData.houseTypeIds && projData.houseTypeIds.includes(id)) {
              foundProject = {
                id: projDoc.id,
                name: projData.name || 'Premium District',
                ...projData
              };
            }
          });

          if (foundProject) {
            setParentProject(foundProject);
          }

          // Load other house types for related properties listing
          const houseTypesList = [];
          const htRef = collection(db, 'houseTypes');
          const htSnap = await getDocs(htRef);
          htSnap.forEach((htDoc) => {
            if (htDoc.id !== id) {
              const htData = htDoc.data();
              houseTypesList.push({
                id: htDoc.id,
                ...htData
              });
            }
          });
          setRelatedProperties(houseTypesList.slice(0, 2));
        }
      } catch (err) {
        console.error('Error fetching dynamic house type:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHouseType();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div className="label-square" style={{ width: '40px', height: '40px', margin: '0 auto 20px', backgroundColor: 'var(--accent-green)', borderRadius: '4px' }}></div>
          <h2 style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.1em' }}>LOADING SPECIFICATION...</h2>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>SPECIFICATION NOT FOUND</h2>
          <Link href="/house-types" className="btn-pill" style={{ background: 'var(--accent-green)', border: 'none', color: '#000', padding: '12px 24px', textDecoration: 'none', borderRadius: '50px', fontWeight: '700' }}>
            BACK TO LISTING
          </Link>
        </div>
      </div>
    );
  }

  // Gallery fallbacks
  const heroImage = data.images && data.images.length > 0 ? data.images[0] : 'https://placehold.co/1200x800/111/fff?text=Smart+Villa+Hero';
  const galImage1 = data.images && data.images.length > 1 ? data.images[1] : heroImage;
  const galImage2 = data.images && data.images.length > 2 ? data.images[2] : heroImage;
  const galImage3 = data.images && data.images.length > 3 ? data.images[3] : heroImage;
  const galImage4 = data.images && data.images.length > 4 ? data.images[4] : heroImage;
  const galImage5 = heroImage;

  return (
    <main>
      {/* Custom Card Cursor */}
      <div id="card-cursor" className="card-cursor">
        <span>VIEW</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>

      {/* Hero Section */}
      <section className="hd-hero">
        {/* Gallery Lightbox (Fullscreen) */}
        <div id="gallery-lightbox" className="hd-lightbox" aria-hidden="true">
          <div className="hd-lightbox-backdrop"></div>
          <button className="hd-lightbox-close" aria-label="Close gallery">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div className="hd-lightbox-counter"><span id="lb-current">1</span> / <span id="lb-total">5</span></div>
          <div className="hd-lightbox-caption">
            <strong>{data.classType}</strong> &mdash; {parentProject ? parentProject.name : 'Abuja, Nigeria'}
          </div>
          <div className="hd-lightbox-stage">
            <img loading="lazy" id="lb-img" src={null} alt="Gallery image" />
          </div>
          <button className="hd-lightbox-nav hd-lightbox-prev" id="lb-prev" aria-label="Previous image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button className="hd-lightbox-nav hd-lightbox-next" id="lb-next" aria-label="Next image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          <div className="hd-lightbox-thumbs" id="lb-thumbs">
            <img loading="lazy" src={galImage1} alt="1" data-index="0" referrerPolicy="no-referrer" />
            <img loading="lazy" src={galImage2} alt="2" data-index="1" referrerPolicy="no-referrer" />
            <img loading="lazy" src={galImage3} alt="3" data-index="2" referrerPolicy="no-referrer" />
            <img loading="lazy" src={galImage4} alt="4" data-index="3" referrerPolicy="no-referrer" />
            <img loading="lazy" src={galImage5} alt="5" data-index="4" referrerPolicy="no-referrer" />
          </div>
          <div id="lb-srcs" style={{ display: "none" }}>
            <span>{galImage1}</span> <span>{galImage2}</span> <span>{galImage3}</span> <span>{galImage4}</span> <span>{galImage5}</span>
          </div>
        </div>

        <div className="hd-hero-image">
          <img loading="lazy" src={heroImage} alt={data.classType} referrerPolicy="no-referrer" />
        </div>
        <div className="hd-hero-overlay"></div>
        <div className="hd-hero-content reveal-on-scroll">
          <div className="hd-hero-location">
            <div className="hd-location-dot"></div>
            {parentProject ? parentProject.name : 'Abuja, Nigeria'}
            <div className="hd-location-dot"></div>
          </div>
          <h1 className="hd-hero-title">{data.classType}</h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "18px", letterSpacing: "0.05em", opacity: "0.9", marginTop: "-10px" }}>
            {data.tagline || `${data.beds || 0} Bedroom Smart Villa`}
          </p>
        </div>
      </section>

      {/* Specs Bar */}
      <div className="hd-container reveal-on-scroll">
        <div className="hd-specs-bar-wrapper">
          <div className="hd-specs-bar">
            {/* ROW 1 */}
            <div className="hd-spec-item">
              <i className="fa-solid fa-tag hd-spec-icon"></i>
              <span className="hd-spec-label">Type</span>
              <span className="hd-spec-value">{data.classType || 'Villa'}</span>
            </div>
            <div className="hd-spec-item">
              <i className="fa-solid fa-money-bill-wave hd-spec-icon"></i>
              <span className="hd-spec-label">Price</span>
              <span className="hd-spec-value">{data.price || 'Contact for Price'}</span>
            </div>
            <div className="hd-spec-item">
              <i className="fa-solid fa-bed hd-spec-icon"></i>
              <span className="hd-spec-label">Beds</span>
              <span className="hd-spec-value">{data.beds || '0'}</span>
            </div>
            <div className="hd-spec-item">
              <i className="fa-solid fa-bath hd-spec-icon"></i>
              <span className="hd-spec-label">Baths</span>
              <span className="hd-spec-value">{data.baths || '0'}</span>
            </div>
            <div className="hd-spec-item">
              <i className="fa-solid fa-maximize hd-spec-icon"></i>
              <span className="hd-spec-label">Size</span>
              <span className="hd-spec-value">{data.size || 'N/A'}</span>
            </div>

            {/* ROW 2 */}
            <div className="hd-spec-item">
              <i className="fa-solid fa-vector-square hd-spec-icon"></i>
              <span className="hd-spec-label">Lot Size</span>
              <span className="hd-spec-value">{data.lotSize || 'N/A'}</span>
            </div>
            <div className="hd-spec-item">
              <i className="fa-solid fa-calendar-days hd-spec-icon"></i>
              <span className="hd-spec-label">Built in</span>
              <span className="hd-spec-value">{data.builtIn || '2026'}</span>
            </div>
            <div className="hd-spec-item">
              <i className="fa-solid fa-stairs hd-spec-icon"></i>
              <span className="hd-spec-label">Floors</span>
              <span className="hd-spec-value">{data.floors || '2'} stories</span>
            </div>
            <div className="hd-spec-item">
              <i className="fa-solid fa-car-side hd-spec-icon"></i>
              <span className="hd-spec-label">Parking</span>
              <span className="hd-spec-value">{data.parking || '2+'}</span>
            </div>
            <div className="hd-spec-item">
              <i className="fa-solid fa-id-badge hd-spec-icon"></i>
              <span className="hd-spec-label">Property ID</span>
              <span className="hd-spec-value">{data.propertyId || `WKSC-SPEC-${id.toUpperCase().slice(0, 3)}`}</span>
            </div>
          </div>

          <div className="hd-download-wrapper">
            <a href="#" className="hd-download-btn">
              <div className="flip-text">
                <span>DOWNLOAD BROCHURE</span>
                <span aria-hidden="true">DOWNLOAD BROCHURE</span>
              </div>
              <i className="fa-solid fa-cloud-arrow-down"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="hd-container">
        <div className="hd-main-grid">
          
          {/* Left Column */}
          <div className="hd-left-col">
            
            {/* Description */}
            <section className="hd-description reveal-on-scroll">
              <p className="hd-description-text">{data.description}</p>
            </section>

            {/* Bento Gallery */}
            <section className="hd-gallery reveal-on-scroll">
              <div className="hd-gallery-item hd-gal-1">
                <img loading="lazy" src={galImage1} alt="Property View 1" referrerPolicy="no-referrer" />
              </div>
              <div className="hd-gallery-item hd-gal-2">
                <img loading="lazy" src={galImage2} alt="Property View 2" referrerPolicy="no-referrer" />
              </div>
              <div className="hd-gallery-item hd-gal-3">
                <img loading="lazy" src={galImage3} alt="Property View 3" referrerPolicy="no-referrer" />
              </div>
              <div className="hd-gallery-item hd-gal-4">
                <img loading="lazy" src={galImage4} alt="Property View 4" referrerPolicy="no-referrer" />
              </div>
              <div className="hd-gallery-item hd-gal-5">
                <img loading="lazy" src={galImage5} alt="Property View 5" referrerPolicy="no-referrer" />
              </div>
              
              <a href="#" className="hd-view-all-btn" id="view-all-images-btn">
                <div className="flip-text">
                  <span>VIEW ALL IMAGES</span>
                  <span aria-hidden="true">VIEW ALL IMAGES</span>
                </div>
              </a>
            </section>

            {/* Amenities Section */}
            {data.amenities && data.amenities.length > 0 && (
              <section className="hd-amenities-section reveal-on-scroll">
                <div className="hd-section-line"></div>
                <div className="hd-section-header">
                  <div className="hd-section-label">
                    <div className="label-square"></div>
                    <span className="label-text">AMENITIES</span>
                  </div>
                  <h2 className="hd-section-headline">Property Amenities</h2>
                </div>
                <div className="hd-amenities-grid">
                  {data.amenities.map((item, idx) => (
                    <div key={idx} className="hd-amenity-tag">
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-green)', marginRight: '6px' }}></i> {item}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interior Features Section */}
            {data.interiorSpecs && data.interiorSpecs.length > 0 && (
              <section className="hd-interior-section reveal-on-scroll">
                <div className="hd-section-line"></div>
                <div className="hd-section-header">
                  <div className="hd-section-label">
                    <div className="label-square"></div>
                    <span className="label-text">INTERIOR</span>
                  </div>
                  <h2 className="hd-section-headline">Interior Features</h2>
                </div>
                <p className="hd-section-subtitle">Below are the key interior specifications:</p>
                
                <div className="hd-interior-table">
                  <div className="hd-int-table-header">
                    <span>Feature</span>
                    <span>Details</span>
                  </div>
                  {data.interiorSpecs.map((row, idx) => (
                    <div key={idx} className="hd-int-table-row">
                      <span className="hd-int-label">{row.title}</span>
                      <span className="hd-int-value">{row.description}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Exterior & Building Features Section */}
            {data.exteriorSpecs && data.exteriorSpecs.length > 0 && (
              <section className="hd-interior-section reveal-on-scroll">
                <div className="hd-section-line"></div>
                <div className="hd-section-header">
                  <div className="hd-section-label">
                    <div className="label-square"></div>
                    <span className="label-text">EXTERIOR</span>
                  </div>
                  <h2 className="hd-section-headline">Exterior Features</h2>
                </div>
                <p className="hd-section-subtitle">Key details of the property exterior:</p>
                
                <div className="hd-interior-table">
                  <div className="hd-int-table-header">
                    <span>Feature</span>
                    <span>Details</span>
                  </div>
                  {data.exteriorSpecs.map((row, idx) => (
                    <div key={idx} className="hd-int-table-row">
                      <span className="hd-int-label">{row.title}</span>
                      <span className="hd-int-value">{row.description}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 360 Video placeholder */}
            <section className="hd-video-section reveal-on-scroll">
              <div className="hd-video-placeholder">
                <div className="hd-video-play">
                  <i className="fa-solid fa-play" style={{ fontSize: "24px", marginLeft: "5px" }}></i>
                </div>
                <h3>360° Virtual Tour</h3>
                <p style={{ opacity: "0.7", maxWidth: "300px", fontSize: "14px" }}>Cinematic high-fidelity walkthrough coming soon. Experience the future of living.</p>
              </div>
            </section>
            
            {/* Featured Estate */}
            {parentProject && (
              <section className="hd-estate-section reveal-on-scroll">
                <div className="hd-section-line"></div>
                <div className="hd-section-header">
                  <div className="hd-section-label">
                    <div className="label-square"></div>
                    <span className="label-text">FEATURED DISTRICT</span>
                  </div>
                  <h2 className="hd-section-headline">Available in these estates</h2>
                </div>
                <div className="hd-estate-grid">
                  <Link href={`/${parentProject.id}`} className="hd-estate-tag">
                    <i className="fa-solid fa-location-dot"></i>
                    {parentProject.name}
                  </Link>
                </div>
              </section>
            )}

          </div>

          {/* Right Column (Sidebar) */}
          <aside className="hd-right-col">
            <div className="hd-sidebar">
              
              {/* Contact Card */}
              <div className="hd-agent-card reveal-on-scroll">
                <div className="hd-agent-header">
                  <span className="hd-agent-listed-by">CONTACT US</span>
                  <h4 className="hd-agent-name">Customer Experience Centre</h4>
                  <p className="hd-agent-subtext">Reach our team directly for inquiries, viewing bookings, and investment consultations.</p>
                </div>

                <hr className="hd-agent-divider" />

                {/* Email row */}
                <div className="hd-agent-contact-row">
                  <div className="hd-agent-contact-info">
                    <span className="hd-contact-label">Email</span>
                    <a href="mailto:hello@wisdomkwatismartcity.com" className="hd-contact-value">hello@wisdomkwatismartcity.com</a>
                  </div>
                  <div className="hd-agent-contact-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="2,4 12,13 22,4"></polyline></svg>
                  </div>
                </div>

                <hr className="hd-agent-divider" />

                {/* Phone row */}
                <div className="hd-agent-contact-row">
                  <div className="hd-agent-contact-info">
                    <span className="hd-contact-label">Phone</span>
                    <a href="tel:+2348100015555" className="hd-contact-value">+234 810 001 5555</a>
                  </div>
                  <div className="hd-agent-contact-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.07 2.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path></svg>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="hd-inquiry-box reveal-on-scroll">
                <h3>Inquire about this property</h3>
                <p>Our dedicated advisors will contact you shortly to arrange a private viewing or site tour.</p>
                
                <form className="hd-inquiry-form">
                  <div className="hd-form-group">
                    <input type="text" placeholder="Full Name" required />
                  </div>
                  <div className="hd-form-group">
                    <input type="email" placeholder="Email Address" required />
                  </div>
                  <div className="hd-form-group">
                    <input type="tel" placeholder="Phone Number" required />
                  </div>
                  <div className="hd-form-group">
                    <textarea rows="4" placeholder={`I'm interested in ${data.classType}. Please provide more details.`}></textarea>
                  </div>
                  <button type="submit" className="hd-submit-btn">
                    <div className="flip-text">
                      <span>SEND INQUIRY</span>
                      <span aria-hidden="true">SEND INQUIRY</span>
                    </div>
                  </button>
                </form>
              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* Related Listings */}
      {relatedProperties.length > 0 && (
        <section className="hd-related-section reveal-on-scroll">
          <div className="hd-container">
            <div className="hd-section-line"></div>
            <div className="hd-section-header">
              <div className="hd-section-label">
                <div className="label-square"></div>
                <span className="label-text">RELATED PROPERTIES</span>
              </div>
              <h2 className="hd-section-headline">
                If this one caught your eye,<br /> these might just seal the deal.
              </h2>
            </div>
            
            <div className="portfolio-grid" id="related-properties-grid">
              {relatedProperties.map((row, idx) => (
                <Link key={idx} href={`/house-types/${row.id}`} className="ht-card reveal-on-scroll">
                  <div className="ht-card-image">
                    <img loading="lazy" src={row.images && row.images.length > 0 ? row.images[0] : 'https://placehold.co/600x400/111/fff?text=Villa+Spec'} alt={row.classType} referrerPolicy="no-referrer" />
                  </div>
                  <div className="ht-card-info">
                    <div className="ht-card-left">
                      <h3 className="ht-card-name">{row.classType}</h3>
                      <p className="ht-card-location">{row.tagline || 'Premium Smart Class'}</p>
                    </div>
                    <div className="ht-card-right">
                      <p className="ht-card-type">{row.classType}</p>
                      <div className="ht-card-specs">
                        <span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path>
                          </svg> {row.beds || 0}
                        </span>
                        <span className="ht-dot"></span>
                        <span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                            <path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path>
                          </svg> {row.baths || 0}
                        </span>
                        <span className="ht-dot"></span>
                        <span>{row.size || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="hd-related-footer" style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
              <Link href="/house-types" className="btn-pill" style={{ backgroundColor: "var(--accent-green)", border: "none", color: "#000", fontWeight: "600", textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <div className="flip-text">
                  <span>VIEW PROPERTIES</span>
                  <span aria-hidden="true">VIEW PROPERTIES</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px" }}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
