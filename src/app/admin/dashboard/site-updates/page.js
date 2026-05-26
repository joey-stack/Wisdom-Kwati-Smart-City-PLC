'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminSiteUpdatesPage() {
  const [updates, setUpdates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectFilter, setProjectFilter] = useState('ALL');

  useEffect(() => {
    // Load projects for mapping names
    async function loadProjects() {
      try {
        const snap = await getDocs(collection(db, 'projects'));
        const list = snap.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
        setProjects(list);
      } catch (err) {
        console.error('Error fetching projects list:', err);
      }
    }
    loadProjects();

    // Live subscription to site updates
    const unsubscribe = onSnapshot(collection(db, 'siteUpdates'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by date descending
      list.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
      setUpdates(list);
      setLoading(false);
    }, (err) => {
      console.error('Error listening to site updates:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete the site update: "${title}"?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'siteUpdates', id));
    } catch (err) {
      console.error('Failed to delete site update:', err);
      alert('Error deleting site update.');
    }
  };

  const getProjectName = (projectId) => {
    const proj = projects.find(p => p.id === projectId);
    return proj ? proj.name : 'Unknown Estate';
  };

  const resolveMediaUrl = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com/file/d/') || url.includes('drive.google.com/open?id=')) {
      let fileId = '';
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        fileId = match[1];
      } else {
        try {
          const urlObj = new URL(url);
          fileId = urlObj.searchParams.get('id');
        } catch (e) {}
      }
      if (fileId) {
        return `https://images.weserv.nl/?url=${encodeURIComponent(`https://drive.google.com/uc?export=view&id=${fileId}`)}&w=1600&output=webp&q=85`;
      }
    }
    return url;
  };

  const filteredUpdates = updates.filter(update => {
    return projectFilter === 'ALL' || update.projectId === projectFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-skeleton-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header view */}
      <header className="admin-header">
        <div className="admin-title-group">
          <h1>Site Updates Manager</h1>
          <p>Publish construction progress, landmark achievements, and photos for specific smart estates.</p>
        </div>
        <Link href="/admin/dashboard/site-updates/create" className="admin-btn active" style={{ textDecoration: 'none' }}>
          + Add Progress Update
        </Link>
      </header>

      {/* Filter and Search Ribbon */}
      <div style={{ marginBottom: '24px' }}>
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '350px',
            padding: '12px 16px',
            borderRadius: '4px',
            border: '1px solid var(--admin-border)',
            backgroundColor: 'var(--admin-surface-light)',
            color: 'var(--admin-text-primary)',
            fontSize: '13px',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="ALL">All Projects / Estates</option>
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      {/* Roster Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredUpdates.length === 0 ? (
          <div className="admin-section-card" style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
            No progress updates recorded. Click "+ Add Progress Update" to begin.
          </div>
        ) : (
          filteredUpdates.map((update) => (
            <div key={update.id} className="admin-section-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                {/* Progress Image */}
                <div style={{ width: '80px', height: '80px', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--admin-bg)', border: '1px solid var(--admin-border)', flexShrink: 0 }}>
                  <img
                    src={resolveMediaUrl(update.image) || 'https://placehold.co/150x150/111/fff?text=Progress'}
                    alt={update.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/150x150/111/fff?text=Progress';
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--admin-text-primary)', margin: '0 0 4px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                    {update.title}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--admin-accent)', fontWeight: 600 }}>
                      {getProjectName(update.projectId)}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--admin-text-secondary)' }}>
                      {update.date || 'No Date'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              {update.description && (
                <p style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', lineHeight: '1.5', margin: '0 0 16px 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {update.description}
                </p>
              )}

              {/* Action Buttons */}
              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', borderTop: '1px solid var(--admin-border)', paddingTop: '16px' }}>
                <Link 
                  href={`/admin/dashboard/site-updates/${update.id}`}
                  className="admin-btn"
                  style={{ flex: 1, textAlign: 'center', fontSize: '11px', textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}
                >
                  Edit Update
                </Link>
                <button
                  onClick={() => handleDelete(update.id, update.title)}
                  className="admin-btn"
                  style={{ flex: 1, fontSize: '11px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                  Delete Update
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
