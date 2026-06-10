'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import '@/styles/careers.css';

const getSalaryIcon = (salary = '') => {
  if (salary.toLowerCase().includes('commission')) return 'fa-solid fa-percent';
  if (salary.includes('₦')) return 'fa-solid fa-naira-sign';
  return 'fa-solid fa-wallet';
};

const getWorkplaceIcon = (loc = '', type = '') => {
  const val = (loc + ' ' + type).toLowerCase();
  if (val.includes('hybrid')) return 'fa-solid fa-laptop-house';
  return 'fa-solid fa-building';
};

const getWorkplaceLabel = (loc = '', type = '') => {
  const val = (loc + ' ' + type).toLowerCase();
  if (val.includes('hybrid')) return 'HYBRID';
  return 'ON SITE';
};

const formatSummaryDate = (dateStr = '') => {
  if (!dateStr) return 'AVAILABLE NOW';
  const parts = dateStr.split(', ');
  if (parts.length >= 2) {
    const datePart = parts[1];
    const yearPart = parts[2]?.split(' at ')[0];
    if (datePart && yearPart) {
      const month = datePart.split(' ')[0].slice(0, 3).toUpperCase();
      const day = datePart.split(' ')[1];
      return `${month} ${day}, ${yearPart}`;
    }
  }
  return dateStr.toUpperCase();
};

const getPerkIcon = (perkText = '') => {
  const text = perkText.toLowerCase();
  if (text.includes('health') || text.includes('medical') || text.includes('insurance') || text.includes('dental') || text.includes('vision')) return 'fa-solid fa-heart-pulse';
  if (text.includes('vacation') || text.includes('leave') || text.includes('holiday') || text.includes('time off') || text.includes('recharge')) return 'fa-solid fa-umbrella-beach';
  if (text.includes('bonus') || text.includes('salary') || text.includes('commission') || text.includes('pay') || text.includes('allowance') || text.includes('allowances') || text.includes('equity') || text.includes('stock')) return 'fa-solid fa-coins';
  if (text.includes('learning') || text.includes('development') || text.includes('course') || text.includes('training') || text.includes('education') || text.includes('mentor') || text.includes('certif')) return 'fa-solid fa-graduation-cap';
  if (text.includes('gym') || text.includes('wellness') || text.includes('fitness') || text.includes('sport')) return 'fa-solid fa-dumbbell';
  if (text.includes('flexible') || text.includes('hybrid') || text.includes('remote') || text.includes('home') || text.includes('schedule')) return 'fa-solid fa-laptop-house';
  if (text.includes('snack') || text.includes('lunch') || text.includes('coffee') || text.includes('food') || text.includes('beverage')) return 'fa-solid fa-cookie-bite';
  if (text.includes('laptop') || text.includes('device') || text.includes('computer') || text.includes('equipment') || text.includes('tool')) return 'fa-solid fa-laptop';
  if (text.includes('retirement') || text.includes('pension') || text.includes('401') || text.includes('saving')) return 'fa-solid fa-piggy-bank';
  if (text.includes('team') || text.includes('event') || text.includes('retreat') || text.includes('bonding') || text.includes('social') || text.includes('celebrat')) return 'fa-solid fa-people-group';
  return 'fa-solid fa-gift'; // default generic perk icon
};

export default function CareerDetailPage({ params }) {
  const { slug } = use(params);

  const [job, setJob] = useState(null);
  const [otherJobs, setOtherJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Direct Apply Form States
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formLinkedin, setFormLinkedin] = useState('');
  const [formPortfolio, setFormPortfolio] = useState('');
  const [formCoverLetter, setFormCoverLetter] = useState('');
  const [formFile, setFormFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Social Share States
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const timer = setTimeout(() => {
        setShareUrl(currentUrl);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [slug]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!formFile) {
      setSubmitError('Please upload your Resume/CV to apply.');
      return;
    }
    
    if (formFile.size > 700 * 1024) {
      setSubmitError('File size must be under 700KB to fit on our free hosting plan. Please compress your PDF or choose a smaller file.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError('');

      // Helper function to read file as Base64
      const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };

      const base64Data = await fileToBase64(formFile);

      // Submit to API Route
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          candidateName: formName,
          candidateEmail: formEmail,
          candidatePhone: formPhone,
          linkedinUrl: formLinkedin,
          portfolioUrl: formPortfolio,
          coverLetter: formCoverLetter,
          resumeBase64: base64Data,
          resumeName: formFile.name,
          resumeType: formFile.type,
          jobTitle: job.title,
          jobId: job.id || slug,
          appliedAt: new Date().toISOString(),
          status: 'pending'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setSubmitSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormLinkedin('');
      setFormPortfolio('');
      setFormCoverLetter('');
      setFormFile(null);
    } catch (err) {
      console.error('[Apply Form Submit] Error:', err);
      setSubmitError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Lock body & html scroll when modal is active
  useEffect(() => {
    if (showApplyModal) {
      document.documentElement.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    };
  }, [showApplyModal]);

  useEffect(() => {
    async function loadJobData() {
      try {
        setLoading(true);
        // 1. Try fetching directly by document ID (slug)
        const docRef = doc(db, 'careers', slug);
        const docSnap = await getDoc(docRef);

        let jobItem = null;
        if (docSnap.exists()) {
          jobItem = { id: docSnap.id, ...docSnap.data() };
        } else {
          // Fallback: Query where slug == slug
          const q = query(collection(db, 'careers'), where('slug', '==', slug), limit(1));
          const querySnap = await getDocs(q);
          if (!querySnap.empty) {
            const d = querySnap.docs[0];
            jobItem = { id: d.id, ...d.data() };
          }
        }

        if (jobItem) {
          setJob(jobItem);

          // 2. Fetch other active jobs for the footer recommendation (Option A)
          const targetSlug = jobItem.slug || slug;
          const otherQ = query(
            collection(db, 'careers'),
            where('slug', '!=', targetSlug),
            limit(2)
          );
          const otherSnap = await getDocs(otherQ);
          const otherList = otherSnap.docs.map(d => ({
            id: d.id,
            ...d.data()
          }));
          setOtherJobs(otherList);
        }
      } catch (err) {
        console.error('Error loading career listing:', err);
      } finally {
        setLoading(false);
      }
    }
    loadJobData();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: 'var(--bg-main)', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div className="label-square" style={{ width: '40px', height: '40px', margin: '0 auto 20px', backgroundColor: 'var(--accent-green)', borderRadius: '2px' }}></div>
          <h2 style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase' }}>RETRIEVING CAREER PROFILE...</h2>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: 'var(--bg-main)', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase' }}>POSITION PROFILE NOT FOUND</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>The career opportunity you are looking for may have been filled or archived.</p>
          <Link href="/about#careers" className="btn-pill">
            <div className="flip-text">
              <span>EXPLORE CAREERS</span>
              <span aria-hidden="true">EXPLORE CAREERS</span>
            </div>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="careers-page">
      {/* 1. Hero Header Section */}
      <section className="careers-hero">
        <span className="careers-badge">Open Position</span>
        <h1 className="careers-title">{job.title}</h1>
        {job.intro && <p className="careers-intro">{job.intro}</p>}
      </section>

      {/* 2. Main Double Column Layout */}
      <div className="careers-main-layout">
        {/* Left column */}
        <div className="careers-left-col">
          {/* Position Details Table */}
          <div className="careers-section">
            <h2 className="careers-section-title">Position Details</h2>
            <div className="pd-table-container">
              <table className="pd-table">
                <tbody>
                  <tr>
                    <td className="pd-label-cell">Role</td>
                    <td>{job.role || job.title}</td>
                  </tr>
                  <tr>
                    <td className="pd-label-cell">Location</td>
                    <td>{job.location || 'Abuja (Hybrid)'}</td>
                  </tr>
                  <tr>
                    <td className="pd-label-cell">Employment Type</td>
                    <td>{job.employmentType || 'Full time'}</td>
                  </tr>
                  {job.experienceLevel && (
                    <tr>
                      <td className="pd-label-cell">Experience Level</td>
                      <td>{job.experienceLevel}</td>
                    </tr>
                  )}
                  {job.salaryRange && (
                    <tr>
                      <td className="pd-label-cell">Salary Range</td>
                      <td>{job.salaryRange}</td>
                    </tr>
                  )}
                  {job.workingHours && (
                    <tr>
                      <td className="pd-label-cell">Working Hours</td>
                      <td>{job.workingHours}</td>
                    </tr>
                  )}
                  {job.reportsTo && (
                    <tr>
                      <td className="pd-label-cell">Reports to</td>
                      <td>{job.reportsTo}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Responsibilities Section */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div className="careers-section">
              <h2 className="careers-section-title">Responsibilities</h2>
              <ul className="careers-list">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* What We're Looking For Section */}
          {job.requirements && job.requirements.length > 0 && (
            <div className="careers-section">
              <h2 className="careers-section-title">What we&apos;re looking for</h2>
              <div className="pd-table-container">
                <table className="pd-table">
                  <tbody>
                    {job.requirements.map((req, idx) => (
                      <tr key={idx}>
                        <td className="pd-label-cell" style={{ fontWeight: '600' }}>
                          {req.skill}
                        </td>
                        <td>{req.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Perks & Benefits Section */}
          {job.perks && job.perks.length > 0 && (
            <div className="careers-section">
              <h2 className="careers-section-title">Perks & benefits</h2>
              <div className="company-perks-grid" style={{ marginTop: '24px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px 20px' }}>
                {job.perks.map((item, idx) => (
                  <div key={idx} className="company-perk-card">
                    <div className="company-perk-icon">
                      <i className={getPerkIcon(item)} style={{ color: '#000000' }}></i>
                    </div>
                    <div className="company-perk-info" style={{ justifyContent: 'center' }}>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', lineHeight: '1.3' }}>{item}</h3>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '24px', fontStyle: 'italic' }}>
                * Eligibility criteria applies — details handled during final contract review.
              </p>
            </div>
          )}

          {/* How to Apply Section */}
          <div className="careers-section">
            <h2 className="careers-section-title">How to apply</h2>
            <p style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.5' }}>
              We offer two ways to submit your application. Please choose <strong>only one</strong> method:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'rgba(0,0,0,0.02)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  Option A: Apply Directly Online (Recommended)
                </h4>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Click the <strong>&quot;Apply For This Job&quot;</strong> button on the sidebar to fill in your application form and upload your CV/Resume directly from this page.
                </p>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.02)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  Option B: Apply via Email
                </h4>
                <ul className="careers-list" style={{ margin: 0, paddingLeft: '20px' }}>
                  <li style={{ marginBottom: '8px' }}>
                    Send your CV/Resume and Portfolio link to{' '}
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {job.howToApply || 'careers@wisdomkwati.com'}
                    </strong>.
                  </li>
                  <li style={{ marginBottom: '8px' }}>Ensure the email subject line reads exactly: <strong>Application: {job.title}</strong></li>
                  <li>Include a short cover letter explaining why you are excited to join Wisdom Kwati Smart City.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar */}
        <aside className="careers-sidebar">
          <div className="careers-sidebar-card">
            <h3>Role Highlights</h3>
            
            <div className="careers-sidebar-detail">
              <span>Location</span>
              <strong>{job.location}</strong>
            </div>

            <div className="careers-sidebar-detail">
              <span>Type</span>
              <strong>{job.employmentType}</strong>
            </div>

            {job.salaryRange && (
              <div className="careers-sidebar-detail">
                <span>Compensation</span>
                <strong>{job.salaryRange}</strong>
              </div>
            )}

            <div className="careers-sidebar-detail">
              <span>Date Posted</span>
              <strong>{job.date || 'Available Now'}</strong>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', margin: '20px 0 12px 0', lineHeight: '1.4' }}>
              Apply directly online or via email (please choose <strong>only one</strong> method).
            </p>

            <button
              onClick={() => {
                setShowApplyModal(true);
                setSubmitSuccess(false);
                setSubmitError('');
              }}
              className="careers-apply-btn"
              style={{ width: '100%', border: 'none', cursor: 'pointer' }}
            >
              Apply For This Job
            </button>

            <div className="share-section">
              <span className="share-title">Share this opportunity</span>
              <div className="share-buttons">
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="share-btn linkedin"
                  title="Share on LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this job opportunity at Wisdom Kwati Smart City: ${job.title}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="share-btn twitter"
                  title="Share on X"
                >
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="share-btn facebook"
                  title="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this job opening at Wisdom Kwati Smart City: ${job.title} - ${shareUrl}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="share-btn whatsapp"
                  title="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </a>
                <button 
                  onClick={handleCopyLink} 
                  className="share-btn copy"
                  title="Copy Link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <i className={copied ? "fa-solid fa-check" : "fa-regular fa-copy"}></i>
                </button>
              </div>
              <div className={`copied-toast ${copied ? 'show' : ''}`}>
                Link copied to clipboard!
              </div>
            </div>
          </div>
        </aside>
      </div>


      {/* 4. Bottom Open Positions Recommendations */}
      {otherJobs.length > 0 && (
        <section className="other-positions-section">
          <h2 className="other-positions-headline">
            If you&apos;re passionate, curious, and love making real impact, you&apos;ll fit right in.
          </h2>
          <div className="career-grid">
            {otherJobs.map((item) => (
              <div key={item.id} className="career-card">
                <h3 className="job-title">{item.title}</h3>
                
                <div className="job-info-list">
                  <div className="job-info-pill">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span>{formatSummaryDate(item.date)}</span>
                  </div>
                  <div className="job-info-pill">
                    <i className="fa-solid fa-clock"></i>
                    <span>{item.employmentType?.toUpperCase()}</span>
                  </div>
                  <div className="job-info-pill">
                    <i className={getSalaryIcon(item.salaryRange)}></i>
                    <span>{item.salaryRange?.toUpperCase()}</span>
                  </div>
                  <div className="job-info-pill">
                    <i className="fa-solid fa-location-dot"></i>
                    <span>{item.location?.toUpperCase()}</span>
                  </div>
                  <div className="job-info-pill">
                    <i className={getWorkplaceIcon(item.location, item.employmentType)}></i>
                    <span>{getWorkplaceLabel(item.location, item.employmentType)}</span>
                  </div>
                </div>

                <Link href={`/careers/${item.slug}`} className="btn-pill" style={{ width: '100%' }}>
                  <div className="flip-text">
                    <span>VIEW JOB DETAILS</span>
                    <span aria-hidden="true">VIEW JOB DETAILS</span>
                  </div>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Apply Modal popup */}
      {showApplyModal && (
        <div className="site-visit-modal-overlay active" style={{ zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto', padding: '40px 20px' }}>
          <div className="site-visit-modal-container" style={{ maxWidth: '600px', padding: '40px', maxHeight: 'none', overflowY: 'visible', margin: '0 auto' }}>
            <button 
              className="site-visit-modal-close" 
              onClick={() => setShowApplyModal(false)}
              style={{ cursor: 'pointer' }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(187, 227, 57, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <i className="fa-solid fa-check" style={{ color: 'var(--accent-green)', fontSize: '28px' }}></i>
                </div>
                <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>Application Submitted!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
                  Thank you for applying. We have received your application and resume. Our recruitment team will review your profile and contact you if your qualifications match the role.
                </p>
                <button 
                  onClick={() => setShowApplyModal(false)} 
                  className="btn-pill" 
                  style={{ margin: '0 auto' }}
                >
                  <div className="flip-text">
                    <span>CLOSE</span>
                    <span aria-hidden="true">CLOSE</span>
                  </div>
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit}>
                <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Apply Directly</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                  Role: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{job.title}</span>
                </p>

                {submitError && (
                  <div style={{ padding: '12px 16px', backgroundColor: 'rgba(235, 87, 87, 0.1)', color: '#eb5757', borderRadius: '6px', fontSize: '13px', marginBottom: '20px', fontWeight: '600' }}>
                    {submitError}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--text-secondary)' }}>Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Joey Stack" 
                      style={{ width: '100%', padding: '14px 16px', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: '14px' }} 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email Address *</label>
                      <input 
                        type="email" 
                        required 
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="e.g. joey@stack.com" 
                        style={{ width: '100%', padding: '14px 16px', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: '14px' }} 
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--text-secondary)' }}>Phone Number *</label>
                      <input 
                        type="tel" 
                        required 
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="e.g. +234 810 001 7777" 
                        style={{ width: '100%', padding: '14px 16px', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: '14px' }} 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--text-secondary)' }}>LinkedIn Profile</label>
                      <input 
                        type="url" 
                        value={formLinkedin}
                        onChange={(e) => setFormLinkedin(e.target.value)}
                        placeholder="https://linkedin.com/in/..." 
                        style={{ width: '100%', padding: '14px 16px', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: '14px' }} 
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--text-secondary)' }}>Portfolio / Website</label>
                      <input 
                        type="url" 
                        value={formPortfolio}
                        onChange={(e) => setFormPortfolio(e.target.value)}
                        placeholder="https://mywork.com" 
                        style={{ width: '100%', padding: '14px 16px', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: '14px' }} 
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--text-secondary)' }}>Resume / CV (PDF, Word, max 700KB) *</label>
                    <input 
                      type="file" 
                      required 
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFormFile(e.target.files[0])}
                      style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px dashed var(--border)', background: 'rgba(0,0,0,0.02)', color: 'var(--text-secondary)', fontSize: '13px' }} 
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--text-secondary)' }}>Cover Letter / Message</label>
                    <textarea 
                      rows="4" 
                      value={formCoverLetter}
                      onChange={(e) => setFormCoverLetter(e.target.value)}
                      placeholder="Tell us briefly why you want to join our smart city team..." 
                      style={{ width: '100%', padding: '14px 16px', borderRadius: '6px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontSize: '14px', resize: 'vertical' }} 
                    />
                  </div>
                </div>

                <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button 
                    type="button" 
                    onClick={() => setShowApplyModal(false)}
                    className="btn-pill" 
                    style={{ backgroundColor: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                  >
                    <div className="flip-text">
                      <span>CANCEL</span>
                      <span aria-hidden="true">CANCEL</span>
                    </div>
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="btn-pill"
                  >
                    <div className="flip-text">
                      <span>{submitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}</span>
                      <span aria-hidden="true">{submitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}</span>
                    </div>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
