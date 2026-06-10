'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const careerGridRef = useRef(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const q = query(collection(db, 'careers'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const list = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setJobs(list);
        setFilteredJobs(list);
      } catch (err) {
        console.error('Error fetching careers:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = jobs;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title?.toLowerCase().includes(q) || 
        job.intro?.toLowerCase().includes(q)
      );
    }

    if (selectedLocation !== 'All') {
      result = result.filter(job => {
        const loc = (job.location || '').toLowerCase();
        if (selectedLocation === 'Abuja') return loc.includes('abuja');
        if (selectedLocation === 'Lagos') return loc.includes('lagos');
        if (selectedLocation === 'Yola') return loc.includes('yola');
        if (selectedLocation === 'Remote') return loc.includes('remote');
        return true;
      });
    }

    if (selectedType !== 'All') {
      result = result.filter(job => {
        const type = (job.employmentType || '').toLowerCase();
        if (selectedType === 'Full Time') return type.includes('full');
        if (selectedType === 'Contract') return type.includes('contract') || type.includes('project');
        if (selectedType === 'Part Time') return type.includes('part');
        return true;
      });
    }

    setFilteredJobs(result);
  }, [searchQuery, selectedLocation, selectedType, jobs]);

  // GSAP-like entrance transitions for cards
  useEffect(() => {
    if (loading || filteredJobs.length === 0 || !careerGridRef.current) return;
    const cards = careerGridRef.current.querySelectorAll('.career-card');
    requestAnimationFrame(() => {
      cards.forEach((card, i) => {
        card.style.transition = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(35px)';
        card.style.visibility = 'hidden';
        
        setTimeout(() => {
          card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          card.style.opacity = '1';
          card.style.visibility = 'visible';
          card.style.transform = 'translateY(0)';
        }, i * 80 + 50);
      });
    });
  }, [filteredJobs, loading]);

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

  const locations = ['All', 'Abuja', 'Lagos', 'Yola', 'Remote'];
  const types = ['All', 'Full Time', 'Contract', 'Part Time'];

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLocation('All');
    setSelectedType('All');
  };

  return (
    <main style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', paddingTop: '140px', paddingBottom: '100px' }}>
      <div className="container container-1380">
        
        {/* Hero Section */}
        <section className="career-section" style={{ padding: '40px 0 60px' }}>
          <div className="career-header sidebar-layout" style={{ marginBottom: '40px' }}>
            <div className="career-label">
              <div className="label-square"></div>
              <span className="label-text">CAREER - OPEN POSITIONS</span>
            </div>
            <h1 className="career-headline" style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.02em', marginTop: '16px' }}>
              Join a company where ideas matter, growth is real, and Mondays actually feel good.
            </h1>
          </div>
        </section>

        {/* Filter bar */}
        <section className="ht-filter-section" style={{ padding: '0 0 40px', marginBottom: '20px' }}>
          <div className="ht-filter-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end' }}>
            
            {/* Search Input */}
            <div className="ht-filter-item" style={{ flex: '2 1 300px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                <i className="fa-solid fa-magnifying-glass" style={{ marginRight: '6px' }}></i> Search Roles
              </label>
              <div className="ht-select-wrapper">
                <input 
                  type="text" 
                  placeholder="Search by job title or keyword..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Location Select */}
            <div className="ht-filter-item" style={{ flex: '1 1 200px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                <i className="fa-solid fa-location-dot" style={{ marginRight: '6px' }}></i> Location
              </label>
              <div className="ht-select-wrapper">
                <select 
                  value={selectedLocation} 
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            {/* Job Type Select */}
            <div className="ht-filter-item" style={{ flex: '1 1 200px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                <i className="fa-solid fa-clock" style={{ marginRight: '6px' }}></i> Job Type
              </label>
              <div className="ht-select-wrapper">
                <select 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {types.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>

            {/* Reset Button */}
            {(searchQuery || selectedLocation !== 'All' || selectedType !== 'All') && (
              <div className="ht-filter-action">
                <button className="ht-filter-reset-btn" onClick={resetFilters}>
                  <i className="fa-solid fa-arrow-rotate-left"></i> Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Listings Grid */}
        <section className="career-section" style={{ padding: '0' }}>
          <div className="career-grid" ref={careerGridRef}>
            {loading ? (
              <div style={{ gridColumn: '1 / -1', padding: '100px 0', textAlign: 'center', width: '100%' }}>
                <div className="admin-skeleton-spinner" style={{ margin: '0 auto' }}></div>
                <h3 style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '24px', color: 'var(--text-secondary)' }}>
                  Loading career opportunities...
                </h3>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', padding: '80px 40px', textAlign: 'center', width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                <i className="fa-solid fa-briefcase" style={{ fontSize: '40px', color: 'var(--text-muted)', marginBottom: '20px' }}></i>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>No Matching Roles Found</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
                  We couldn't find any job openings matching your search criteria. Try adjusting your filters or search keywords.
                </p>
                <button className="btn-pill" onClick={resetFilters} style={{ margin: '0 auto' }}>
                  <div className="flip-text">
                    <span>CLEAR FILTERS</span>
                    <span aria-hidden="true">CLEAR FILTERS</span>
                  </div>
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="career-card" 
                  style={{ 
                    opacity: 0, 
                    visibility: 'hidden', 
                    transform: 'translateY(35px)',
                    width: '100%'
                  }}
                >
                  <h3 className="job-title" style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)', fontFamily: 'var(--font-header)', minHeight: '58px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {job.title}
                  </h3>
                  
                  <div className="job-info-list">
                    <div className="job-info-pill">
                      <i className="fa-solid fa-calendar-days"></i>
                      <span>{formatSummaryDate(job.date)}</span>
                    </div>
                    <div className="job-info-pill">
                      <i className="fa-solid fa-clock"></i>
                      <span>{job.employmentType?.toUpperCase() || 'FULL TIME'}</span>
                    </div>
                    <div className="job-info-pill">
                      <i className={getSalaryIcon(job.salaryRange || '')}></i>
                      <span>{job.salaryRange?.toUpperCase() || 'COMPETITIVE'}</span>
                    </div>
                    <div className="job-info-pill">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>{job.location?.toUpperCase() || 'ABUJA, NIGERIA'}</span>
                    </div>
                    <div className="job-info-pill">
                      <i className={getWorkplaceIcon(job.location || '', job.employmentType || '')}></i>
                      <span>{getWorkplaceLabel(job.location || '', job.employmentType || '')}</span>
                    </div>
                  </div>

                  <Link href={`/careers/${job.slug}`} className="btn-pill" style={{ width: '100%', marginTop: 'auto' }}>
                    <div className="flip-text">
                      <span>VIEW JOB DETAILS</span>
                      <span aria-hidden="true">VIEW JOB DETAILS</span>
                    </div>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px' }}>
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
