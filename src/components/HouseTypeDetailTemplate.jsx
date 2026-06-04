'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialShare from './SocialShare';
import HouseTypeCard from './cards/HouseTypeCard';
import { resolveMediaUrl } from '@/lib/media';

// Re-initialize GSAP ScrollTrigger so reveal animations pick up the newly rendered DOM elements.
function useRefreshScrollTrigger(ready) {
  useEffect(() => {
    if (!ready) return;
    // Small timeout lets React flush the new DOM before GSAP scans it
    const t = setTimeout(() => {
      if (typeof window !== 'undefined' && window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
      // Also manually reveal any still-hidden reveal-on-scroll elements on this page
      document.querySelectorAll('.hd-container, .hd-left-col, .hd-right-col, .hd-hero-content, .hd-specs-bar-wrapper, .hd-description, .hd-gallery, .hd-amenities-section, .hd-interior-section, .hd-video-section, .hd-estate-section, .hd-related-section, .hd-agent-card, .hd-inquiry-box').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'none';
        el.style.clipPath = 'none';
        el.style.visibility = 'visible';
      });
    }, 80);
    return () => clearTimeout(t);
  }, [ready]);
}

export default function HouseTypeDetailTemplate({ id, data, parentProject, advisor, relatedProperties, availableEstates = [] }) {
  // Refresh GSAP ScrollTrigger once component mounts
  useRefreshScrollTrigger(!!data);

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

  // Helper: safely extract text from amenity item
  const getAmenityName = (item) => {
    if (!item) return '';
    if (typeof item === 'string') return item;
    return item.name || item.label || '';
  };

  // Gallery fallbacks
  const images = data.images || [];
  const heroImage   = resolveMediaUrl(images[0] || 'https://placehold.co/1200x800/111/fff?text=Smart+Villa');
  const galImage1   = resolveMediaUrl(images[0] || heroImage);
  const galImage2   = resolveMediaUrl(images[1] || heroImage);
  const galImage3   = resolveMediaUrl(images[2] || heroImage);
  const galImage4   = resolveMediaUrl(images[3] || heroImage);
  const galImage5   = resolveMediaUrl(images[4] || heroImage);

  // Interior and exterior specs - support both {metric, details} (from CMS) and {title, description} (legacy)
  const interiorRows = (data.interiorSpecs || []).map(row => ({
    label: row.metric || row.title || '',
    value: row.details || row.description || ''
  }));
  const exteriorRows = (data.exteriorSpecs || []).map(row => ({
    label: row.metric || row.title || '',
    value: row.details || row.description || ''
  }));

  const amenities = data.amenities || [];
  const hasAmenities = amenities.length > 0;
  const hasInterior  = interiorRows.length > 0;
  const hasExterior  = exteriorRows.length > 0;

  return (
    <main>
      {/* Custom Card Cursor */}
      <div id="card-cursor" className="card-cursor">
        <span>VIEW</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>

      {/* Hero Section */}
      <section className="hd-hero">

        {/* Gallery Lightbox */}
        <div id="gallery-lightbox" className="hd-lightbox" aria-hidden="true">
          <div className="hd-lightbox-backdrop"></div>
          <button className="hd-lightbox-close" aria-label="Close gallery">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div className="hd-lightbox-counter"><span id="lb-current">1</span> / <span id="lb-total">{images.length > 0 ? images.length : 5}</span></div>
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
            <Image width={200} height={150} style={{ objectFit: 'cover' }} src={galImage1} alt="Property gallery image 1" data-index="0" referrerPolicy="no-referrer" />
            <Image width={200} height={150} style={{ objectFit: 'cover' }} src={galImage2} alt="Property gallery image 2" data-index="1" referrerPolicy="no-referrer" />
            <Image width={200} height={150} style={{ objectFit: 'cover' }} src={galImage3} alt="Property gallery image 3" data-index="2" referrerPolicy="no-referrer" />
            <Image width={200} height={150} style={{ objectFit: 'cover' }} src={galImage4} alt="Property gallery image 4" data-index="3" referrerPolicy="no-referrer" />
            <Image width={200} height={150} style={{ objectFit: 'cover' }} src={galImage5} alt="Property gallery image 5" data-index="4" referrerPolicy="no-referrer" />
          </div>
          <div id="lb-srcs" style={{ display: "none" }}>
            <span>{galImage1}</span> <span>{galImage2}</span> <span>{galImage3}</span> <span>{galImage4}</span> <span>{galImage5}</span>
          </div>
        </div>

        <div className="hd-hero-image">
          <Image width={1920} height={1080} priority={true} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={heroImage} alt={data.classType} referrerPolicy="no-referrer" />
        </div>
        <div className="hd-hero-overlay"></div>
        <div className="hd-hero-content">
          <div className="hd-hero-location">
            <div className="hd-location-dot"></div>
            {parentProject ? parentProject.name : 'Abuja, Nigeria'}
            <div className="hd-location-dot"></div>
          </div>
          <h1 className="hd-hero-title">{data.classType}</h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "18px", letterSpacing: "0.05em", opacity: "0.9", marginTop: "-10px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
            {data.tagline || `${data.beds || 0} Bedroom Smart Villa`}
          </p>
        </div>
      </section>


      {/* Main Content */}
      <main className="hd-container">
        <div className="hd-main-grid">

          {/* Left Column */}
          <div className="hd-left-col">

            {/* Description */}
            <section className="hd-description">
              <p className="hd-description-text">
                {data.description || `${data.classType} is a premium smart villa offering world-class living standards with intelligent automation and sustainable design.`}
              </p>
            </section>

            {/* Bento Gallery */}
            <section className="hd-gallery">
              <div className="hd-gallery-item hd-gal-1">
                <Image width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={galImage1} alt="Property View 1" referrerPolicy="no-referrer" />
              </div>
              <div className="hd-gallery-item hd-gal-2">
                <Image width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={galImage2} alt="Property View 2" referrerPolicy="no-referrer" />
              </div>
              <div className="hd-gallery-item hd-gal-3">
                <Image width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={galImage3} alt="Property View 3" referrerPolicy="no-referrer" />
              </div>
              <div className="hd-gallery-item hd-gal-4">
                <Image width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={galImage4} alt="Property View 4" referrerPolicy="no-referrer" />
              </div>
              <div className="hd-gallery-item hd-gal-5">
                <Image width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={galImage5} alt="Property View 5" referrerPolicy="no-referrer" />
              </div>
              <a href="#" className="hd-view-all-btn" id="view-all-images-btn">
                <div className="flip-text">
                  <span>VIEW ALL IMAGES</span>
                  <span aria-hidden="true">VIEW ALL IMAGES</span>
                </div>
              </a>
            </section>

            {/* Amenities Section */}
            {hasAmenities && (
              <section className="hd-amenities-section">
                <div className="hd-section-line"></div>
                <div className="hd-section-header">
                  <div className="hd-section-label">
                    <div className="label-square"></div>
                    <span className="label-text">AMENITIES</span>
                  </div>
                  <h2 className="hd-section-headline">Property Amenities</h2>
                </div>
                <div className="hd-amenities-grid">
                  {amenities.map((item, idx) => (
                    <div key={idx} className="hd-amenity-tag">
                      <i className="fa-solid fa-circle-check" aria-hidden="true" style={{ color: 'var(--accent-green)', marginRight: '6px' }}></i>
                      {getAmenityName(item)}
                    </div>
                  ))}
                </div>

              </section>
            )}

            {/* Interior Features Section */}
            {hasInterior && (
              <section className="hd-interior-section">
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
                  {interiorRows.map((row, idx) => (
                    <div key={idx} className="hd-int-table-row">
                      <span className="hd-int-label">{row.label}</span>
                      <span className="hd-int-value">{row.value}</span>
                    </div>
                  ))}
                </div>

              </section>
            )}

            {/* Exterior & Building Features Section */}
            {hasExterior && (
              <section className="hd-interior-section">
                <div className="hd-section-line"></div>
                <div className="hd-section-header">
                  <div className="hd-section-label">
                    <div className="label-square"></div>
                    <span className="label-text">EXTERIOR</span>
                  </div>
                  <h2 className="hd-section-headline">Exterior &amp; Building Features</h2>
                </div>
                <p className="hd-section-subtitle">Key details of the property exterior:</p>
                <div className="hd-interior-table">
                  <div className="hd-int-table-header">
                    <span>Feature</span>
                    <span>Details</span>
                  </div>
                  {exteriorRows.map((row, idx) => (
                    <div key={idx} className="hd-int-table-row">
                      <span className="hd-int-label">{row.label}</span>
                      <span className="hd-int-value">{row.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}



            {/* Featured Estate */}
            {((availableEstates && availableEstates.length > 0) || parentProject) && (
              <section className="hd-estate-section">
                <div className="hd-section-line"></div>
                <div className="hd-section-header">
                  <div className="hd-section-label">
                    <div className="label-square"></div>
                    <span className="label-text">FEATURED DISTRICT</span>
                  </div>
                  <h2 className="hd-section-headline">Available in these estates</h2>
                </div>
                <div className="hd-estate-grid" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {availableEstates && availableEstates.length > 0 ? (
                    availableEstates.map((est) => (
                      <Link key={est.id} href={`/projects/${est.id}`} className="hd-estate-tag">
                        <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                        {est.name}
                      </Link>
                    ))
                  ) : (
                    <Link href={`/projects/${parentProject.id}`} className="hd-estate-tag">
                      <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                      {parentProject.name}
                    </Link>
                  )}
                </div>
              </section>
            )}

            <SocialShare title={data.classType} />
          </div>

          {/* Right Column (Sidebar) */}
          <aside className="hd-right-col">
            <div className="hd-sidebar">

              {/* Agent / Advisor Card */}
              <div className="hd-agent-card">
                {advisor ? (
                  <>
                    <div className="hd-agent-header">
                      <span className="hd-agent-listed-by">YOUR PROJECT ADVISOR</span>
                      <div className="hd-agent-top">
                        <Image width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={resolveMediaUrl(advisor.image || 'https://placehold.co/100x100/111/fff?text=Advisor')} alt={advisor.name} className="hd-agent-img" />
                        <div className="hd-agent-identity">
                          <h4 className="hd-agent-name">{advisor.name}</h4>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{advisor.role}</span>
                        </div>
                      </div>
                      {advisor.quote && (
                        <p className="hd-agent-subtext" style={{ fontStyle: 'italic' }}>"{advisor.quote}"</p>
                      )}
                    </div>

                    <hr className="hd-agent-divider" />

                    {advisor.email && (
                      <>
                        <div className="hd-agent-contact-row">
                          <div className="hd-agent-contact-info">
                            <span className="hd-contact-label">Email</span>
                            <a href={`mailto:${advisor.email}`} className="hd-contact-value">{advisor.email}</a>
                          </div>
                          <div className="hd-agent-contact-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="2,4 12,13 22,4"></polyline></svg>
                          </div>
                        </div>
                        <hr className="hd-agent-divider" />
                      </>
                    )}

                    {advisor.phone && (
                      <>
                        <div className="hd-agent-contact-row">
                          <div className="hd-agent-contact-info">
                            <span className="hd-contact-label">Phone</span>
                            <a href={`tel:${advisor.phone}`} className="hd-contact-value">{advisor.phone}</a>
                          </div>
                          <div className="hd-agent-contact-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.07 2.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path></svg>
                          </div>
                        </div>
                        {advisor.whatsapp && <hr className="hd-agent-divider" />}
                      </>
                    )}

                    {advisor.whatsapp && (
                      <div className="hd-agent-contact-row">
                        <div className="hd-agent-contact-info">
                          <span className="hd-contact-label">WhatsApp</span>
                          <a href={advisor.whatsapp} target="_blank" rel="noreferrer" className="hd-contact-value">Chat on WhatsApp</a>
                        </div>
                        <div className="hd-agent-contact-icon">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        </div>
                      </div>
                    )}

                    {advisor.whatsapp && (
                      <a href={advisor.whatsapp} target="_blank" rel="noreferrer" className="hd-agent-cta">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                        Message on WhatsApp
                      </a>
                    )}
                  </>
                ) : (
                  <>
                    <div className="hd-agent-header">
                      <span className="hd-agent-listed-by">CONTACT US</span>
                      <h4 className="hd-agent-name">Customer Experience Centre</h4>
                      <p className="hd-agent-subtext">Reach our team directly for inquiries, viewing bookings, and investment consultations.</p>
                    </div>
                    <hr className="hd-agent-divider" />
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
                    <div className="hd-agent-contact-row">
                      <div className="hd-agent-contact-info">
                        <span className="hd-contact-label">Phone</span>
                        <a href="tel:+2348100015555" className="hd-contact-value">+234 810 001 5555</a>
                      </div>
                      <div className="hd-agent-contact-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.07 2.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path></svg>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Inquiry Form */}
              <div className="hd-inquiry-box">
                <h3>Inquire about this property</h3>
                <p>Our dedicated advisors will contact you shortly to arrange a private viewing or site tour.</p>
                <form className="hd-inquiry-form">
                  <div className="hd-form-group">
                    <input type="text" placeholder="Full Name" aria-label="Full name" required />
                  </div>
                  <div className="hd-form-group">
                    <input type="email" placeholder="Email Address" aria-label="Email address" required />
                  </div>
                  <div className="hd-form-group">
                    <input type="tel" placeholder="Phone Number" aria-label="Phone number" required />
                  </div>
                  <div className="hd-form-group">
                    <textarea rows="4" placeholder={`I'm interested in ${data.classType}. Please provide more details.`} aria-label="Your message"></textarea>
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
        <section className="hd-related-section">
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

            <div className="wksc-ht-grid wksc-ht-grid--home" id="related-properties-grid">
              {relatedProperties.map((row, idx) => (
                <HouseTypeCard
                  key={row.id || idx}
                  id={row.id}
                  name={row.classType}
                  tagline={row.tagline || 'Premium Smart Class'}
                  beds={row.beds || 0}
                  baths={row.baths || 0}
                  size={row.size || 'N/A'}
                  image={row.images && row.images.length > 0 ? row.images[0] : 'https://placehold.co/600x400/111/fff?text=Villa+Spec'}
                  estate={row.estate || ''}
                />
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
