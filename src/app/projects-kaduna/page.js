'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProjectCard from '@/components/cards/ProjectCard';

export default function Page() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function loadProjects() {
      try {
        const snap = await getDocs(collection(db, 'projects'));
        const list = [];
        snap.forEach((doc) => {
          const d = doc.data();
          if (!d.name) return;
          const state = (d.state || d.location || '').toLowerCase();
          // Filter for Kaduna
          if (!state.includes('kaduna') && doc.id !== 'kaduna-smart-district') return;
          list.push({
            id: doc.id,
            name: d.name,
            location: d.location || d.tagline || 'Nigeria',
            image: d.detailsImage || d.heroImage || 'https://placehold.co/1200x800/111/fff?text=Estate',
          });
        });
        list.sort((a, b) => a.name.localeCompare(b.name));
        setProjects(list);
      } catch (err) {
        console.error('Error fetching Kaduna projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <main>
      {/* Custom Card Cursor */}
      <div id="card-cursor" className="card-cursor">
        <span>VIEW</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>

      <main className="pj-main-content" style={{ background: "var(--bg-main)", paddingTop: "140px", paddingBottom: "120px" }}>
        {/* Hero Section */}
        <section className="pj-hero-section">
          <div className="container container-1380" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "32px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
              KADUNA PROJECTS
              <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
            </div>
            <h1 className="pj-hero-title" style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "40px", fontStyle: "normal", fontWeight: "500", lineHeight: "44px", color: "var(--text-primary)", marginBottom: "64px" }}>
              High-density smart residency and commercial<br />
              integration in the heart of Kaduna hub.
            </h1>
          </div>
        </section>

        {/* Listings Grid */}
        <section className="pj-grid-section">
          <div className="container container-1380">
            {!mounted || loading ? (
              <div className="wksc-proj-grid" id="project-grid">
                {[1, 2, 3].map((i) => (
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
            ) : projects.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '60px 0', fontFamily: 'var(--font-main)', fontSize: '15px', color: 'var(--text-secondary)' }}>
                No projects found in Kaduna district.
              </p>
            ) : (
              <div className="wksc-proj-grid" id="project-grid">
                {projects.map((proj) => (
                  <ProjectCard
                    key={proj.id}
                    id={proj.id}
                    name={proj.name}
                    location={proj.location}
                    image={proj.image}
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
