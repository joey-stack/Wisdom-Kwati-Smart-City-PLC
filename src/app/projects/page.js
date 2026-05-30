'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProjectCard from '@/components/cards/ProjectCard';

// Global in-memory cache for projects
let globalProjectsCache = null;

export default function Page() {
  const [projects, setProjects] = useState(() => globalProjectsCache || []);
  const [loading, setLoading] = useState(() => !globalProjectsCache);
  const [filterState, setFilterState] = useState('');
  const [filterNeighborhood, setFilterNeighborhood] = useState('');
  const [filterEstateName, setFilterEstateName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
    async function loadProjects() {
      try {
        const snap = await getDocs(collection(db, 'projects'));
        const list = [];
        snap.forEach((doc) => {
          const d = doc.data();
          // Only render projects that have a name — empty shell docs are skipped
          if (!d.name) return;

          // Resolve State
          let resolvedState = d.state || '';
          if (!resolvedState) {
            resolvedState = 'Abuja'; // default fallback
            const locLower = (d.location || '').toLowerCase();
            const stateFieldLower = (d.state || '').toLowerCase();
            const id = doc.id.toLowerCase();

            if (
              stateFieldLower.includes('abuja') ||
              stateFieldLower.includes('fct') ||
              locLower.includes('abuja') ||
              locLower.includes('fct') ||
              id === 'beverly-hills' ||
              id === 'royal-city' ||
              id === 'sunset-haven' ||
              id === 'garden-eden'
            ) {
              resolvedState = 'Abuja';
            } else if (stateFieldLower.includes('lagos') || locLower.includes('lagos') || id.includes('lagos')) {
              resolvedState = 'Lagos';
            } else if (stateFieldLower.includes('kaduna') || locLower.includes('kaduna')) {
              resolvedState = 'Kaduna';
            } else if (
              stateFieldLower.includes('rivers') ||
              stateFieldLower.includes('ph') ||
              stateFieldLower.includes('port') ||
              locLower.includes('rivers') ||
              locLower.includes('ph') ||
              locLower.includes('port')
            ) {
              resolvedState = 'Rivers';
            } else if (
              stateFieldLower.includes('yola') ||
              stateFieldLower.includes('adamawa') ||
              locLower.includes('yola') ||
              locLower.includes('adamawa') ||
              id === 'kwati-city' ||
              id === 'wisdom-kwati-smart-city'
            ) {
              resolvedState = 'Adamawa';
            }
          }

          // Resolve Neighborhood
          let resolvedNeighborhood = d.neighborhood || '';
          if (!resolvedNeighborhood) {
            resolvedNeighborhood = 'General';
            const id = doc.id.toLowerCase();
            if (id === 'beverly-hills') resolvedNeighborhood = 'Kuje';
            else if (id === 'garden-eden') resolvedNeighborhood = 'Asokoro';
            else if (id === 'kwati-city') resolvedNeighborhood = 'Jimeta';
            else if (id === 'wisdom-kwati-smart-city') resolvedNeighborhood = 'Demsa';
            else {
              const parts = (d.location || '').split(',');
              if (parts.length > 0) {
                const first = parts[0].trim();
                if (
                  first.toLowerCase() !== 'abuja' &&
                  first.toLowerCase() !== 'lagos' &&
                  first.toLowerCase() !== 'nigeria' &&
                  first.toLowerCase() !== 'multiple states'
                ) {
                  resolvedNeighborhood = first;
                }
              }
            }
            if (resolvedNeighborhood === 'General') {
              const nameLower = d.name.toLowerCase();
              if (nameLower.includes('katampe')) resolvedNeighborhood = 'Katampe Extension';
              else if (nameLower.includes('karsana')) resolvedNeighborhood = 'Karsana';
              else if (nameLower.includes('mabushi')) resolvedNeighborhood = 'Mabushi';
              else if (nameLower.includes('guzape')) resolvedNeighborhood = 'Guzape';
              else if (nameLower.includes('maitama')) resolvedNeighborhood = 'Maitama';
              else if (nameLower.includes('rumu-olumeni') || nameLower.includes('port court')) resolvedNeighborhood = 'Rumu-Olumeni';
              else if (nameLower.includes('ekpe') || nameLower.includes('epe')) resolvedNeighborhood = 'Epe';
            }
          }

          list.push({
            id: doc.id,
            name: d.name,
            location: d.location || d.tagline || 'Nigeria',
            state: resolvedState,
            neighborhood: resolvedNeighborhood,
            image: d.detailsImage || d.heroImage || 'https://placehold.co/1200x800/111/fff?text=Estate',
          });
        });
        // Alphabetical sort
        list.sort((a, b) => a.name.localeCompare(b.name));
        globalProjectsCache = list;
        setProjects(list);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Dynamic Options derived from state
  const stateOptions = Array.from(new Set(projects.map((p) => p.state))).sort();
  const neighborhoodOptions = Array.from(
    new Set(
      projects
        .filter((p) => !filterState || p.state === filterState)
        .map((p) => p.neighborhood)
    )
  ).sort();
  const estateOptions = Array.from(
    new Set(
      projects
        .filter(
          (p) =>
            (!filterState || p.state === filterState) &&
            (!filterNeighborhood || p.neighborhood === filterNeighborhood)
        )
        .map((p) => p.name)
    )
  ).sort();

  const handleStateChange = (val) => {
    setFilterState(val);
    setFilterNeighborhood('');
    setFilterEstateName('');
  };

  const handleNeighborhoodChange = (val) => {
    setFilterNeighborhood(val);
    setFilterEstateName('');
  };

  const handleReset = () => {
    setFilterState('');
    setFilterNeighborhood('');
    setFilterEstateName('');
    setSearchQuery('');
  };

  const filteredProjects = projects.filter((proj) => {
    if (filterState && proj.state !== filterState) return false;
    if (filterNeighborhood && proj.neighborhood !== filterNeighborhood) return false;
    if (filterEstateName && proj.name !== filterEstateName) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        proj.name.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q) ||
        proj.state.toLowerCase().includes(q) ||
        proj.neighborhood.toLowerCase().includes(q)
      );
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

      <main className="pj-main-content" style={{ background: 'var(--bg-main)', paddingTop: '140px', paddingBottom: '120px' }}>
        {/* Hero Section */}
        <section className="pj-hero-section">
          <div className="container container-1380" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.07)', borderRadius: '100px', padding: '10px 20px', fontFamily: 'var(--font-main)', fontWeight: '700', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '32px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--text-primary)', flexShrink: '0' }}></div>
              PROJECTS
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'var(--text-primary)', flexShrink: '0' }}></div>
            </div>
            <h1 className="pj-hero-title" style={{ fontFamily: "'Inter Display', sans-serif", fontSize: '40px', fontWeight: '500', lineHeight: '44px', color: 'var(--text-primary)', marginBottom: '64px' }}>
              Estates engineered for smart, secure living.
            </h1>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="pj-filter-section" style={{ marginBottom: '60px' }}>
          <div className="container container-1380">
            <div className="ht-filter-bar reveal-on-scroll">
              {/* State Filter */}
              <div className="ht-filter-item">
                <label>
                  <i className="fa-solid fa-map" style={{ fontSize: '10px' }}></i> STATE
                </label>
                <div className="ht-select-wrapper">
                  <select
                    id="filter-state"
                    value={filterState}
                    onChange={(e) => handleStateChange(e.target.value)}
                  >
                    <option value="">All States</option>
                    {stateOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              {/* Neighborhood Filter */}
              <div className="ht-filter-item">
                <label>
                  <i className="fa-solid fa-location-dot" style={{ fontSize: '10px' }}></i> NEIGHBORHOOD
                </label>
                <div className="ht-select-wrapper">
                  <select
                    id="filter-neighborhood"
                    value={filterNeighborhood}
                    onChange={(e) => handleNeighborhoodChange(e.target.value)}
                  >
                    <option value="">All Neighborhoods</option>
                    {neighborhoodOptions.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              {/* Estate Name Filter */}
              <div className="ht-filter-item">
                <label>
                  <i className="fa-solid fa-building" style={{ fontSize: '10px' }}></i> ESTATE NAME
                </label>
                <div className="ht-select-wrapper">
                  <select
                    id="filter-estate"
                    value={filterEstateName}
                    onChange={(e) => setFilterEstateName(e.target.value)}
                  >
                    <option value="">All Estates</option>
                    {estateOptions.map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              {/* Search */}
              <div className="ht-filter-item">
                <label>
                  <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '10px' }}></i> SEARCH
                </label>
                <div className="ht-select-wrapper ht-search-wrapper">
                  <input
                    type="text"
                    id="filter-search"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Reset */}
              <div className="ht-filter-action">
                <button className="ht-filter-reset-btn" id="filter-reset" onClick={handleReset}>
                  &times; RESET
                </button>
              </div>
            </div>

            {mounted && !loading && filteredProjects.length === 0 && (
              <p id="pj-no-results" style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'var(--font-main)', fontSize: '15px', color: 'var(--text-secondary)' }}>
                {projects.length === 0
                  ? 'No projects have been published yet.'
                  : 'No projects match your filters. Try adjusting your search.'}
              </p>
            )}
          </div>
        </section>

        {/* Listings Grid */}
        <section className="pj-grid-section">
          <div className="container container-1380">
            {!mounted || loading ? (
              /* Loading skeleton */
              <div className="wksc-proj-grid" id="project-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="wksc-proj-card" style={{ pointerEvents: 'none' }}>
                    <div className="wksc-proj-card__image wksc-skeleton" style={{ borderRadius: '5px' }} />
                    <div className="wksc-proj-card__info">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                        <div style={{ height: '17px', width: '60%', background: 'var(--bg-surface)', borderRadius: '6px' }} className="wksc-skeleton" />
                        <div style={{ height: '12px', width: '40%', background: 'var(--bg-surface)', borderRadius: '6px' }} className="wksc-skeleton" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="wksc-proj-grid" id="project-grid">
                {filteredProjects.map((row) => (
                  <ProjectCard
                    key={row.id}
                    id={row.id}
                    name={row.name}
                    location={row.location}
                    image={row.image}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </main>
  );
}
