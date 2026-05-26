'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProjectCard from './cards/ProjectCard';

/**
 * NeighborhoodSection — homepage "Our Neighborhoods" section.
 *
 * Client island: fetches projects from Firestore and renders them
 * using the shared ProjectCard template.
 * Shows up to 3 cards on the homepage (full archive at /projects).
 */
export default function NeighborhoodSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    getDocs(collection(db, 'projects'))
      .then(snap => {
        const list = [];
        snap.forEach(doc => {
          const d = doc.data();
          if (!d.name) return; // skip shell documents
          if (!d.heroImage && !d.detailsImage) return; // skip docs without images

          // Parse createdAt supporting both Timestamp objects and ISO strings
          let createdAtDate = new Date(0);
          if (d.createdAt) {
            if (typeof d.createdAt.toDate === 'function') {
              createdAtDate = d.createdAt.toDate();
            } else {
              createdAtDate = new Date(d.createdAt);
            }
          }

          list.push({
            id: doc.id,
            name: d.name,
            location: d.location || d.tagline || 'Nigeria',
            image: d.detailsImage || d.heroImage || 'https://placehold.co/800x600/eaeaea/999?text=Estate',
            createdAtDate,
          });
        });

        // Sort descending (newest first)
        list.sort((a, b) => b.createdAtDate - a.createdAtDate);

        setProjects(list.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* ── Skeleton ── */
  if (!mounted || loading) {
    return (
      <div className="wksc-proj-grid">
        {[1, 2, 3].map(i => (
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
    );
  }

  /* ── No data ── */
  if (projects.length === 0) return null;

  /* ── Cards ── */
  return (
    <div className="wksc-proj-grid">
      {projects.map(proj => (
        <ProjectCard key={proj.id} {...proj} />
      ))}
    </div>
  );
}
