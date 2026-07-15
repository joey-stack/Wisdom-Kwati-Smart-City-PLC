'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// If you're not using Firebase, you can remove these imports and the addDoc logic below.
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Script from 'next/script';

export default function SunsetHavenLandingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    plotSize: '',
    purpose: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'campaign-lead',
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          estate: 'Sunset Haven',
          plotSize: formData.plotSize,
          purpose: formData.purpose,
          source: 'Landing Page - Sunset Haven'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      
      setSubmitted(true);
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('An error occurred. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const renderForm = () => (
    <>
      {submitted ? (
        <div style={{ padding: '20px', backgroundColor: 'var(--accent-green)', color: '#000', fontWeight: 'bold', borderRadius: '5px', textAlign: 'center' }}>
          Thank you, {formData.fullName}! Your request has been received. Our investment consultants will contact you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', fontFamily: 'var(--font-header)' }}>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your full name" />
          </div>
          
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', fontFamily: 'var(--font-header)' }}>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone number" />
          </div>
          
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', fontFamily: 'var(--font-header)' }}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email address" />
          </div>
          
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', fontFamily: 'var(--font-header)' }}>Preferred Plot Size</label>
            <select name="plotSize" value={formData.plotSize} onChange={handleChange} required style={{ width: '100%', padding: '16px 20px', background: 'rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0, 0, 0, 0.05)', color: 'var(--text-primary)', borderRadius: '5px', fontFamily: 'inherit', appearance: 'none', fontSize: '14px' }}>
              <option value="">Select Plot Size</option>
              <option value="500sqm">500 SQM</option>
              <option value="700sqm">700 SQM</option>
              <option value="1000sqm">1000 SQM</option>
              <option value="Undecided">Undecided / I need advice</option>
            </select>
          </div>
          
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', fontFamily: 'var(--font-header)' }}>Investment Purpose</label>
            <select name="purpose" value={formData.purpose} onChange={handleChange} required style={{ width: '100%', padding: '16px 20px', background: 'rgba(0, 0, 0, 0.03)', border: '1px solid rgba(0, 0, 0, 0.05)', color: 'var(--text-primary)', borderRadius: '5px', fontFamily: 'inherit', appearance: 'none', fontSize: '14px' }}>
              <option value="">Select Purpose</option>
              <option value="Residential (To Build)">Residential (To Build)</option>
              <option value="Land Banking (Hold & Sell)">Land Banking (Hold & Sell)</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {error && <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{error}</p>}
          
          <button type="submit" disabled={submitting} className="btn-pill" style={{ width: "100%", justifyContent: "center", background: "var(--accent-green)", color: "#000", border: "none", marginTop: "10px", fontWeight: "600", borderRadius: "5px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            <div className="flip-text">
              <span style={{ color: "#000" }}>
                {submitting ? 'SUBMITTING...' : 'GET INVESTMENT PACK'}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', transition: 'transform 0.3s ease', stroke: "#000" }}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </span>
              <span aria-hidden="true" style={{ color: "#000" }}>
                {submitting ? 'SUBMITTING...' : 'GET INVESTMENT PACK'}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px', transition: 'transform 0.3s ease', stroke: "#000" }}><polyline points="9 18 15 12 9 6"></polyline></svg>
              </span>
            </div>
          </button>
        </form>
      )}
    </>
  );

  return (
    <div className="pd-page">
      {/* Meta Pixel Code */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4430762700508648');
            fbq('track', 'PageView');
          `
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=4430762700508648&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {/* End Meta Pixel Code */}

      {/* SECTION 1: HERO */}
      <header className="hero">
        <div className="hero-video-wrapper" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: 0 }}>
          <img src="/images/sunset-haven/hero.jpg" alt="Sunset Haven Aerial Katampe" referrerPolicy="no-referrer" fetchPriority="high" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.3)", zIndex: 1 }}></div>
        </div>
        
        <div className="hero-container" style={{ zIndex: 3, position: "relative" }}>
          <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <h1 className="headline reveal-type-lines" style={{ fontFamily: 'var(--font-body)', letterSpacing: '-0.04em', textTransform: 'uppercase', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.15', fontWeight: '500', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
              Own a Piece of <br /> 
              Abuja's Next <br /> 
              Generation <br /> 
              of Wealth
            </h1>
            <p className="subheadline reveal-type-lines" style={{ 
              fontSize: '16px', 
              lineHeight: '1.95', 
              maxWidth: '500px', 
              fontWeight: '500', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              color: '#fff8ed',
              opacity: 0.85,
              visibility: 'visible',
              marginBottom: '15px',
              textAlign: 'left'
            }}>
              Secure premium land in Sunset Haven, Katampe Extension before the next valuation increase. Request your private investment pack today for current pricing and available plots.
            </p>
            <div className="hero-card delay-1" style={{ flexShrink: 0, paddingBottom: '15px' }}>
              <button 
                className="cta-button" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log("Hero CTA clicked");
                  setIsModalOpen(true);
                }}
              >
                <div className="flip-text">
                  <span>GET INVESTMENT PACK</span>
                  <span aria-hidden="true">GET INVESTMENT PACK</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px" }}>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 2 & 3: MAIN CONTENT & SIDEBAR */}
      <main className="container-1380" style={{ paddingBottom: '120px' }}>
        <div className="pd-main-layout">
          {/* Left Column: Content */}
          <div className="pd-left-col">
            
            <section className="pd-section reveal-on-scroll">
              <h2 className="pd-section-title">Why Serious Investors Are Buying</h2>
              <p className="pd-description-text">
                Every successful property investor understands one principle: <strong>Money is made when you buy, not when you sell.</strong>
              </p>
              <p className="pd-description-text">
                Buying in the right location before appreciation begins creates significant long term value. Sunset Haven offers exactly that.
              </p>
              
              <ul className="pd-highlights" style={{ marginTop: '30px' }}>
                <li>Prime location in Katampe Extension</li>
                <li>Certificate of Occupancy (C of O)</li>
                <li>Excellent road network and infrastructure growth</li>
                <li>High capital appreciation potential</li>
                <li>Suitable for residential development</li>
                <li>Flexible wealth preservation asset</li>
                <li>Ideal for investors and homeowner</li>
              </ul>
            </section>

            <section className="pd-section reveal-on-scroll">
              <h2 className="pd-section-title">Who Is This Investment For?</h2>
              <div className="pd-table-container">
                <table className="pd-table">
                  <thead>
                    <tr>
                      <th>Target Profile</th>
                      <th>The Opportunity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pd-label-cell">Home Builders</td>
                      <td>Build your dream home in one of Abuja's fastest developing locations.</td>
                    </tr>
                    <tr>
                      <td className="pd-label-cell">Smart Investors</td>
                      <td>Buy now and benefit from future capital appreciation.</td>
                    </tr>
                    <tr>
                      <td className="pd-label-cell">Land Bankers</td>
                      <td>Acquire land today and preserve wealth in a tangible appreciating asset.</td>
                    </tr>
                    <tr>
                      <td className="pd-label-cell">Families</td>
                      <td>Leave behind an appreciating asset your children will thank you for.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="pd-section reveal-on-scroll">
              <h2 className="pd-section-title">What Makes Sunset Haven Different?</h2>
              <p className="pd-description-text">
                Unlike speculative locations with uncertain titles, Sunset Haven offers secure title documentation, strategic location, a planned residential environment, excellent investment fundamentals, and long-term appreciation potential.
              </p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '20px', textTransform: 'uppercase' }}>
                This is not about buying land. This is about securing tomorrow's wealth at today's price.
              </h3>
            </section>

            {/* Featured Estate Gallery */}
            <section className="pd-section reveal-on-scroll" style={{ marginBottom: '100px' }}>
              <h2 className="pd-section-title">Featured Estate Gallery</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <img src="/images/sunset-haven/hero.jpg" alt="Aerial View of Estate" style={{ width: '100%', borderRadius: '5px' }} />
                <img src="/images/sunset-haven/masterplan.jpg" alt="Master Plan" style={{ width: '100%', borderRadius: '5px' }} />
                <img src="/images/sunset-haven/road.jpg" alt="Road Network" style={{ width: '100%', borderRadius: '5px' }} />
                <img src="/images/sunset-haven/neighbourhood.jpg" alt="Neighbourhood" style={{ width: '100%', borderRadius: '5px' }} />
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Sidebar Form */}
          <aside className="pd-sidebar" id="investment-form">
            <div className="pd-sidebar-card reveal-on-scroll" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "5px", padding: "32px", boxShadow: "var(--shadow-soft)" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-green)", display: "block", marginBottom: "16px" }}>Investment Pack</span>
              <h3 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 16px" }}>Request Yours Today</h3>
              
              {renderForm()}
            </div>

            {/* Contact Info Card */}
            <div className="pd-sidebar-card reveal-on-scroll" style={{ marginTop: "24px", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "5px", padding: "32px", boxShadow: "var(--shadow-soft)" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-green)", display: "block", marginBottom: "16px" }}>Contact</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a href="tel:07066618999" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}>
                  <i className="fa-solid fa-phone" style={{ width: "14px", color: "var(--accent-green)" }}></i> 0706 661 8999
                </a>
                <a href="tel:08168333302" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}>
                  <i className="fa-solid fa-phone" style={{ width: "14px", color: "var(--accent-green)" }}></i> 0816 833 3302
                </a>
                <a href="mailto:hello@wisdomkwatismartcity.com" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}>
                  <i className="fa-solid fa-envelope" style={{ width: "14px", color: "var(--accent-green)" }}></i> hello@wisdomkwatismartcity.com
                </a>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "13px", color: "var(--text-primary)", lineHeight: "1.4" }}>
                  <i className="fa-solid fa-location-dot" style={{ width: "14px", color: "var(--accent-green)", marginTop: "4px" }}></i>
                  <div>2141 Katampe Rd,<br/>Kado, Abuja 900108, Federal Capital Territory, Nigeria</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile Sticky CTA */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px', background: 'var(--bg-main)', borderTop: '1px solid var(--border)', zIndex: 100 }} className="mobile-only">
        <button 
          className="btn-pill" 
          style={{ width: "100%", justifyContent: "center", background: "var(--accent-green)", color: "var(--text-primary)", border: "none", cursor: "pointer" }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Mobile Sticky CTA clicked");
            setIsModalOpen(true);
          }}
        >
          <div className="flip-text">
            <span>GET INVESTMENT PACK</span>
            <span aria-hidden="true">GET INVESTMENT PACK</span>
          </div>
        </button>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 992px) {
          .mobile-only { display: none !important; }
        }
      `}} />

      {/* Pop-up Modal for Investment Form */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setIsModalOpen(false)}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', width: '100%', maxWidth: '500px', padding: '40px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setIsModalOpen(false)} 
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '28px', lineHeight: '1' }}
              aria-label="Close Modal"
            >
              &times;
            </button>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-green)", display: "block", marginBottom: "16px" }}>Investment Pack</span>
            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '24px' }}>Request Yours Today</h3>
            {renderForm()}
          </div>
        </div>
      )}
    </div>
  );
}
