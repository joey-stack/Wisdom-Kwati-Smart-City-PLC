'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import '@/styles/careers.css';

export default function CareerDetailPage({ params }) {
  const { slug } = use(params);

  const [job, setJob] = useState(null);
  const [otherJobs, setOtherJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <div className="careers-table-wrapper">
              <table className="careers-table">
                <tbody>
                  <tr>
                    <td className="careers-label-cell">Role</td>
                    <td>{job.role || job.title}</td>
                  </tr>
                  <tr>
                    <td className="careers-label-cell">Location</td>
                    <td>{job.location || 'Abuja (Hybrid)'}</td>
                  </tr>
                  <tr>
                    <td className="careers-label-cell">Employment Type</td>
                    <td>{job.employmentType || 'Full time'}</td>
                  </tr>
                  {job.experienceLevel && (
                    <tr>
                      <td className="careers-label-cell">Experience Level</td>
                      <td>{job.experienceLevel}</td>
                    </tr>
                  )}
                  {job.salaryRange && (
                    <tr>
                      <td className="careers-label-cell">Salary Range</td>
                      <td>{job.salaryRange}</td>
                    </tr>
                  )}
                  {job.workingHours && (
                    <tr>
                      <td className="careers-label-cell">Working Hours</td>
                      <td>{job.workingHours}</td>
                    </tr>
                  )}
                  {job.reportsTo && (
                    <tr>
                      <td className="careers-label-cell">Reports to</td>
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
              <h2 className="careers-section-title">What we're looking for</h2>
              <div className="careers-table-wrapper">
                <table className="careers-table">
                  <tbody>
                    {job.requirements.map((req, idx) => (
                      <tr key={idx}>
                        <td className="careers-label-cell" style={{ fontWeight: '600' }}>
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
              <ul className="careers-list">
                {job.perks.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px', fontStyle: 'italic' }}>
                * Eligibility criteria applies — details handled during final contract review.
              </p>
            </div>
          )}

          {/* How to Apply Section */}
          <div className="careers-section">
            <h2 className="careers-section-title">How to apply</h2>
            <ul className="careers-list">
              <li>
                Submit your CV/Resume and Portfolio directly to{' '}
                <strong style={{ color: 'var(--text-primary)' }}>
                  {job.howToApply || 'careers@wisdomkwati.com'}
                </strong>.
              </li>
              <li>Ensure the subject line reads exactly: <strong>Application: {job.title}</strong></li>
              <li>Include a short cover letter explaining why you are excited to join Wisdom Kwati Smart City.</li>
            </ul>
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

            <a
              href={`mailto:${job.howToApply || 'careers@wisdomkwati.com'}?subject=Application:%20${encodeURIComponent(job.title)}`}
              className="careers-apply-btn"
            >
              Apply For This Job
            </a>
          </div>
        </aside>
      </div>

      {/* 3. Global Company Perks Grid (Full Width) */}
      <section className="company-perks-section">
        <div className="company-perks-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-primary)' }}>
            <div className="label-square" style={{ width: '8px', height: '8px', backgroundColor: 'var(--accent-green)', borderRadius: '2px' }}></div>
            WKSC Ecosystem Perks
          </div>
          <h2 style={{ fontFamily: 'var(--font-header)', fontSize: '32px', fontWeight: '700', marginTop: '16px', color: 'var(--text-primary)' }}>
            Why you'll love working with us
          </h2>
          
          <div className="company-perks-grid">
            <div className="company-perk-card">
              <div className="company-perk-icon">
                <i className="fa-solid fa-heart-pulse"></i>
              </div>
              <h3>Comprehensive Health</h3>
              <p>Top-tier private health coverages including comprehensive medical, dental, and optical packages for employees.</p>
            </div>

            <div className="company-perk-card">
              <div className="company-perk-icon">
                <i className="fa-solid fa-brain"></i>
              </div>
              <h3>Wellness & Care</h3>
              <p>Dedicated access to local mental wellness programs, counseling pathways, and fitness memberships.</p>
            </div>

            <div className="company-perk-card">
              <div className="company-perk-icon">
                <i className="fa-solid fa-umbrella-beach"></i>
              </div>
              <h3>Paid Time Off</h3>
              <p>Generous vacation parameters, sick leave buffers, and public holidays to make sure you stay fully rested.</p>
            </div>

            <div className="company-perk-card">
              <div className="company-perk-icon">
                <i className="fa-solid fa-lightbulb"></i>
              </div>
              <h3>Growth & Courses</h3>
              <p>Direct sponsorship for certifications, professional lectures, and career courses related to smart city planning.</p>
            </div>

            <div className="company-perk-card">
              <div className="company-perk-icon">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <h3>Modern Workspace</h3>
              <p>Equipped with state-of-the-art developer systems, hybrid schedules, and collaborative workspace designs.</p>
            </div>

            <div className="company-perk-card">
              <div className="company-perk-icon">
                <i className="fa-solid fa-piggy-bank"></i>
              </div>
              <h3>Financial Planning</h3>
              <p>Retirement savings match, performance bonuses, and direct incentives tied to community target milestones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom Open Positions Recommendations */}
      {otherJobs.length > 0 && (
        <section className="other-positions-section">
          <h2 className="other-positions-headline">
            If you're passionate, curious, and love making real impact, you'll fit right in.
          </h2>
          <div className="other-positions-grid">
            {otherJobs.map((item) => (
              <div key={item.id} className="careers-rec-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3>{item.title}</h3>
                  <div className="careers-rec-pills">
                    <span className="careers-rec-pill">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{item.location || 'Abuja'}</span>
                    </span>
                    <span className="careers-rec-pill">
                      <i className="fa-solid fa-clock"></i>
                      <span>{item.employmentType || 'Full time'}</span>
                    </span>
                    {item.salaryRange && (
                      <span className="careers-rec-pill">
                        <i className="fa-solid fa-wallet"></i>
                        <span>{item.salaryRange}</span>
                      </span>
                    )}
                  </div>
                </div>
                <Link href={`/careers/${item.slug}`} className="careers-rec-link">
                  <span>View Job Details</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
