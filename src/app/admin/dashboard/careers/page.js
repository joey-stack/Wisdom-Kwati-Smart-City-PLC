'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Realtime listener for careers collection
    const unsubscribe = onSnapshot(collection(db, 'careers'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setJobs(list);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching jobs:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete the job opening: "${title}"?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'careers', id));
    } catch (err) {
      console.error('Failed to delete job:', err);
      alert('Error deleting job listing.');
    }
  };

  const filteredJobs = jobs.filter(job => {
    return (
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-skeleton-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <header className="admin-header">
        <div className="admin-title-group">
          <h1>Careers Manager</h1>
          <p>Create, edit, and archive job postings for the Wisdom Kwati Smart City platform.</p>
        </div>
        <Link href="/admin/dashboard/careers/create" className="admin-btn active" style={{ textDecoration: 'none' }}>
          + Add New Position
        </Link>
      </header>

      {/* Filter Ribbon */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Search by job title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1',
            maxWidth: '400px',
            padding: '12px 16px',
            borderRadius: '4px',
            border: '1px solid var(--admin-border)',
            backgroundColor: 'var(--admin-surface-light)',
            color: 'var(--admin-text-primary)',
            fontSize: '13px',
            outline: 'none'
          }}
        />
      </div>

      {/* Jobs Roster Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredJobs.length === 0 ? (
          <div className="admin-section-card" style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
            No active positions found. Click "+ Add New Position" to launch a recruitment post.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="admin-section-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--admin-text-primary)', margin: '0 0 6px 0' }}>
                    {job.title}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--admin-text-secondary)' }}>
                    {job.employmentType} • {job.location}
                  </span>
                </div>
                <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '4px', backgroundColor: 'var(--admin-bg)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-secondary)', fontWeight: 600 }}>
                  Active
                </span>
              </div>

              {job.intro && (
                <p style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', lineHeight: '1.5', margin: '0 0 20px 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {job.intro}
                </p>
              )}

              {/* Core Details List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--admin-text-secondary)', marginBottom: '24px', marginTop: 'auto' }}>
                {job.salaryRange && <div><strong>Salary:</strong> {job.salaryRange}</div>}
                {job.reportsTo && <div><strong>Reports to:</strong> {job.reportsTo}</div>}
                <div><strong>Posted:</strong> {job.date || 'Available Now'}</div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--admin-border)', paddingTop: '16px' }}>
                <Link 
                  href={`/admin/dashboard/careers/${job.id}`}
                  className="admin-btn"
                  style={{ flex: 1, textAlign: 'center', fontSize: '11px', textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}
                >
                  Edit Profile
                </Link>
                <button
                  onClick={() => handleDelete(job.id, job.title)}
                  className="admin-btn"
                  style={{ flex: 1, fontSize: '11px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                  Delete Post
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
