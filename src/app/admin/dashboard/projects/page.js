'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Live subscription to advisors to resolve names
    const unsubAdvisors = onSnapshot(collection(db, 'advisors'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAdvisors(list);
    });

    // 2. Live subscription to projects
    const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(list);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching projects:', err);
      setLoading(false);
    });

    return () => {
      unsubAdvisors();
      unsubProjects();
    };
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete the project "${name}"? This action is permanent.`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('Error deleting project.');
    }
  };

  const getAdvisorName = (advisorId) => {
    const adv = advisors.find(a => a.id === advisorId);
    return adv ? adv.name : 'Unassigned / General Support';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-skeleton-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <header className="admin-header">
        <div className="admin-title-group">
          <h1>Estates & Districts Manager</h1>
          <p>Configure estate landing details, vibes matrices, map locations, and link sales specialists.</p>
        </div>
        <Link href="/admin/dashboard/projects/create" className="admin-btn active" style={{ textDecoration: 'none' }}>
          + Add New Estate
        </Link>
      </header>

      {/* Roster Listing Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {projects.length === 0 ? (
          <div className="admin-section-card" style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
            No estates registered yet. Click "+ Add New Estate" above to begin.
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="admin-section-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
              
              {/* Cover/Hero Preview */}
              <div style={{ width: '100%', height: '160px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', marginBottom: '16px', position: 'relative' }}>
                <img
                  src={project.heroImage || 'https://placehold.co/600x400/111/fff?text=Estate'}
                  alt={project.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400/111/fff?text=Estate';
                  }}
                />
                <span style={{ 
                  position: 'absolute', 
                  top: '12px', 
                  left: '12px', 
                  backgroundColor: 'rgba(10, 10, 12, 0.85)', 
                  color: 'var(--admin-text-primary)', 
                  padding: '4px 8px', 
                  borderRadius: '20px', 
                  fontSize: '9px',
                  fontWeight: 600,
                  border: '1px solid var(--admin-border)',
                  textTransform: 'uppercase'
                }}>
                  {project.location || 'Nigeria'}
                </span>
              </div>

              {/* Title Section */}
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--admin-text-primary)', margin: '0 0 4px 0' }}>
                {project.name}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', margin: '0 0 16px 0', fontStyle: 'italic', lineHeight: '1.4' }}>
                {project.tagline || 'No tagline set.'}
              </p>

              {/* Technical Specifications preview */}
              <div style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px', backgroundColor: 'var(--admin-bg)', padding: '12px', borderRadius: '4px', border: '1px solid var(--admin-border)' }}>
                <div><strong>Routing Slug:</strong> <code style={{ color: 'var(--admin-accent)' }}>{project.id}</code></div>
                <div><strong>Vibes Registered:</strong> {project.realEstateVibe?.length || 0} items</div>
                <div><strong>Facilities Nearby:</strong> {project.nearbyFacilities?.length || 0} locations</div>
                <div><strong>Assigned Advisor:</strong> <span style={{ color: 'var(--admin-accent)' }}>{getAdvisorName(project.advisorId)}</span></div>
              </div>

              {/* Action Buttons */}
              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', borderTop: '1px solid var(--admin-border)', paddingTop: '16px' }}>
                <Link 
                  href={`/admin/dashboard/projects/${project.id}`}
                  className="admin-btn"
                  style={{ flex: 1, textAlign: 'center', fontSize: '11px', textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}
                >
                  Edit Specifications
                </Link>
                <button
                  onClick={() => handleDelete(project.id, project.name)}
                  className="admin-btn"
                  style={{ flex: 1, fontSize: '11px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                  Delete Estate
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
