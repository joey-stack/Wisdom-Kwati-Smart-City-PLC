'use client';
import { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function PromoForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plotSize: '',
    investmentPurpose: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      if (db) {
        await addDoc(collection(db, 'leads'), {
          ...formData,
          estate: 'Sunset Haven',
          type: 'lead',
          source: 'Landing Page - Sunset Haven',
          status: 'pending',
          createdAt: new Date().toISOString()
        });
      } else {
        console.warn('Firebase DB is not initialized. Skipping Firestore save.');
      }
      
      // Email Fallback Logic
      const subject = encodeURIComponent(`Investment Pack Request: ${formData.name} - Sunset Haven`);
      const body = encodeURIComponent(
        `New Investment Pack Request:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPreferred Plot Size: ${formData.plotSize}\nInvestment Purpose: ${formData.investmentPurpose}`
      );
      window.location.href = `mailto:hello@wisdomkwatismartcity.com?subject=${subject}&body=${body}`;

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="w-full mt-6">
        <div className="pd-hero-alert pd-hero-alert-success mb-6">
          ✓ Your request has been received. An advisor will contact you shortly!
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6">
      <form onSubmit={handleSubmit} className="pd-hero-form">
        <div className="pd-hero-form-row">
          <div className="pd-hero-form-group full-width-field">
            <label htmlFor="name">FULL NAME *</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              required
              placeholder="Jane Smith"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
        </div>

        <div className="pd-hero-form-row">
          <div className="pd-hero-form-group">
            <label htmlFor="email">EMAIL ADDRESS *</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              required
              placeholder="jane@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
          <div className="pd-hero-form-group">
            <label htmlFor="phone">PHONE</label>
            <input 
              type="tel" 
              id="phone"
              name="phone" 
              placeholder="+234 (00) 000 0000"
              value={formData.phone}
              onChange={handleChange}
              disabled={submitting}
            />
          </div>
        </div>

        <div className="pd-hero-form-row">
          <div className="pd-hero-form-group">
            <label htmlFor="plotSize">PREFERRED PLOT SIZE</label>
            <select 
              id="plotSize"
              name="plotSize" 
              value={formData.plotSize}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="" disabled>Select plot size</option>
              <option value="500sqm">500sqm</option>
              <option value="700sqm">700sqm</option>
              <option value="1000sqm">1000sqm</option>
              <option value="Undecided">Undecided</option>
            </select>
          </div>
          <div className="pd-hero-form-group">
            <label htmlFor="investmentPurpose">INVESTMENT PURPOSE</label>
            <select 
              id="investmentPurpose"
              name="investmentPurpose" 
              value={formData.investmentPurpose}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="" disabled>Select purpose</option>
              <option value="Residential">Residential</option>
              <option value="Land Banking">Land Banking</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
        </div>

        <div className="pd-hero-form-actions mt-4" style={{ gridTemplateColumns: '1fr' }}>
          <button 
            type="submit" 
            className="pd-hero-submit-btn"
            disabled={submitting}
          >
            <div className="flip-text">
              <span>{submitting ? 'SUBMITTING...' : 'SCHEDULE INSPECTION'}</span>
              <span aria-hidden="true">{submitting ? 'SUBMITTING...' : 'SCHEDULE INSPECTION'}</span>
            </div>
          </button>
        </div>
      </form>

      {/* Contact Info appended below form */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h4 className="text-[10px] font-bold text-[#1a1a1a] tracking-[0.15em] uppercase mb-4" style={{ fontFamily: 'var(--font-header)' }}>
          CONTACT US
        </h4>
        <div className="flex flex-col gap-3">
          <a href="tel:+2347066618999" className="flex items-center gap-3 text-[13px] text-[#4e5a69] hover:text-[var(--accent-green)] font-medium transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            +234 706 661 8999
          </a>
          <a href="https://wa.me/2347066618999" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] text-[#4e5a69] hover:text-[var(--accent-green)] font-medium transition-colors" style={{ fontFamily: 'var(--font-body)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            WhatsApp Us
          </a>
          <div className="flex items-start gap-3 text-[13px] text-[#4e5a69] font-medium" style={{ fontFamily: 'var(--font-body)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <span>Wisdom Kwati Smart City,<br/>Abuja, Nigeria.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
