'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HouseTypeCard from '@/components/cards/HouseTypeCard';

// Global in-memory cache for house types
let globalHouseTypesCache = null;

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

export default function Page() {
  const [houseTypes, setHouseTypes] = useState(() => globalHouseTypesCache || []);
  const [loading, setLoading] = useState(() => !globalHouseTypesCache);
  const [mounted, setMounted] = useState(false);

  /* ── Filter state ── */
  const [filterEstate, setFilterEstate] = useState('');
  const [filterBeds, setFilterBeds] = useState('');
  const [filterBaths, setFilterBaths] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
    async function loadHouseTypes() {
      try {
        const snap = await getDocs(collection(db, 'houseTypes'));
        const list = [];
        snap.forEach((doc) => {
          const d = doc.data();
          // Only include documents that have at least a classType (name)
          if (!d.classType) return;
          
          // Populate the global cache for instant route navigation
          getGlobalCache().houseTypes[doc.id] = d;

          list.push({
            id: doc.id,
            name: d.classType,
            tagline: d.tagline || `${d.beds || 0}BR Smart Villa`,
            beds: d.beds || 0,
            baths: d.baths || 0,
            size: d.size || 'N/A',
            price: d.price || null,
            image: d.images && d.images.length > 0
              ? d.images[0]
              : 'https://placehold.co/1200x800/111/fff?text=Smart+Villa',
            estate: d.estate || '',
            sortOrder: d.sortOrder,
          });
        });
        // Sort by sortOrder ascending, fallback to alphabetical
        list.sort((a, b) => {
          const orderA = a.sortOrder !== undefined && a.sortOrder !== null ? a.sortOrder : 999;
          const orderB = b.sortOrder !== undefined && b.sortOrder !== null ? b.sortOrder : 999;
          if (orderA !== orderB) {
            return orderA - orderB;
          }
          return (a.name || '').localeCompare(b.name || '');
        });
        globalHouseTypesCache = list;
        setHouseTypes(list);
      } catch (err) {
        console.error('Error fetching house types:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHouseTypes();
  }, []);

  /* ── Derive dynamic filter options from data ── */
  const estateOptions = useMemo(() => {
    const set = new Set();
    houseTypes.forEach(ht => {
      if (ht.estate) set.add(ht.estate);
    });
    return [...set].sort();
  }, [houseTypes]);

  const bedsOptions = useMemo(() => {
    const set = new Set();
    houseTypes.forEach(ht => {
      if (ht.beds) set.add(Number(ht.beds));
    });
    return [...set].sort((a, b) => a - b);
  }, [houseTypes]);

  const bathsOptions = useMemo(() => {
    const set = new Set();
    houseTypes.forEach(ht => {
      if (ht.baths) set.add(Number(ht.baths));
    });
    return [...set].sort((a, b) => a - b);
  }, [houseTypes]);

  /* Derive type from tagline keywords */
  const typeOptions = useMemo(() => {
    const typeKeywords = ['Bungalow', 'Duplex', 'Terrace', 'Apartment', 'Villa', 'Penthouse', 'Semi-Detached'];
    const found = new Set();
    houseTypes.forEach(ht => {
      const text = (ht.tagline || '').toLowerCase();
      typeKeywords.forEach(kw => {
        if (text.includes(kw.toLowerCase())) found.add(kw);
      });
    });
    return [...found].sort();
  }, [houseTypes]);

  const handleReset = () => {
    setFilterEstate('');
    setFilterBeds('');
    setFilterBaths('');
    setFilterType('');
  };

  const filteredHouseTypes = houseTypes.filter((ht) => {
    if (filterEstate && ht.estate !== filterEstate) return false;
    if (filterBeds && Number(ht.beds) !== Number(filterBeds)) return false;
    if (filterBaths && Number(ht.baths) !== Number(filterBaths)) return false;
    if (filterType) {
      const text = (ht.tagline || '').toLowerCase();
      if (!text.includes(filterType.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <main>
      {/* Custom Card Cursor */}
      <div id="card-cursor" className="card-cursor">
        <span>VIEW</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>

      <div className="ht-main-content" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
        {/* Hero Section */}
        <section className="ht-hero-section">
          <div className="container container-1380" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div className="ht-hero-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.07)', borderRadius: '100px', padding: '10px 20px', fontFamily: 'var(--font-main)', fontWeight: '700', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '32px' }}>
              <div className="label-square" style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--text-primary)', flexShrink: '0' }}></div>
              HOUSE TYPES
              <div className="label-square" style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--text-primary)', flexShrink: '0' }}></div>
            </div>
            <h1 className="ht-headline" style={{ fontFamily: "'Inter Display', sans-serif", fontSize: '40px', fontWeight: '500', lineHeight: '44px', color: 'var(--text-primary)', marginBottom: '48px' }}>
              Smart homes across our premium estates.
            </h1>
          </div>
        </section>

        {/* Filter Bar — 4 Dropdowns + Reset */}
        <section className="ht-filter-section">
          <div className="container container-1380">
            <div className="ht-filter-bar reveal-on-scroll">

              {/* Select Estate */}
              <div className="ht-filter-item">
                <label>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  SELECT ESTATE
                </label>
                <div className="ht-select-wrapper">
                  <select id="filter-estate" value={filterEstate} onChange={(e) => setFilterEstate(e.target.value)}>
                    <option value="">All Estates</option>
                    {estateOptions.map(est => (
                      <option key={est} value={est}>{est}</option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              {/* Select Beds */}
              <div className="ht-filter-item">
                <label>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14" /></svg>
                  SELECT BEDS
                </label>
                <div className="ht-select-wrapper">
                  <select id="filter-beds" value={filterBeds} onChange={(e) => setFilterBeds(e.target.value)}>
                    <option value="">Any Beds</option>
                    {bedsOptions.map(b => (
                      <option key={b} value={b}>{b} Bedrooms</option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              {/* Select Baths */}
              <div className="ht-filter-item">
                <label>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2" /><path d="M4 14h16M8 8V5a1 1 0 011-1h2" /></svg>
                  SELECT BATHS
                </label>
                <div className="ht-select-wrapper">
                  <select id="filter-baths" value={filterBaths} onChange={(e) => setFilterBaths(e.target.value)}>
                    <option value="">Any Baths</option>
                    {bathsOptions.map(b => (
                      <option key={b} value={b}>{b} Bathrooms</option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              {/* Select Type */}
              <div className="ht-filter-item">
                <label>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></svg>
                  SELECT TYPE
                </label>
                <div className="ht-select-wrapper">
                  <select id="filter-type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="">All Types</option>
                    {typeOptions.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              {/* Reset */}
              <div className="ht-filter-action">
                <button className="ht-filter-reset-btn" id="filter-reset" onClick={handleReset}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> RESET
                </button>
              </div>
            </div>

            {mounted && !loading && filteredHouseTypes.length === 0 && (
              <p id="ht-no-results" style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'var(--font-main)', fontSize: '15px', color: 'var(--text-secondary)' }}>
                {houseTypes.length === 0
                  ? 'No house types have been published yet.'
                  : 'No properties match your filters. Try adjusting your selection.'}
              </p>
            )}
          </div>
        </section>

        {/* Listings Grid — 2 per row */}
        <section className="ht-grid-section">
          <div className="container container-1380">
            {!mounted || loading ? (
              /* Loading skeleton */
              <div className="wksc-ht-grid" id="ht-grid">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="wksc-ht-card" style={{ opacity: 0.4, pointerEvents: 'none' }}>
                    <div className="wksc-ht-card__image-wrapper">
                      <div className="wksc-ht-card__image wksc-skeleton" />
                    </div>
                    <div className="wksc-ht-card__body" style={{ gap: '12px' }}>
                      <div style={{ height: '18px', width: '62%', background: 'var(--bg-surface)', borderRadius: '6px' }} />
                      <div style={{ height: '13px', width: '80%', background: 'var(--bg-surface)', borderRadius: '6px' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="wksc-ht-grid" id="ht-grid">
                {filteredHouseTypes.map((row) => (
                  <HouseTypeCard key={row.id} {...row} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
