'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { resolveMediaUrl } from '@/lib/media';

export default function AdminAdvisorsPage() {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Live subscription to advisors
    const unsubscribe = onSnapshot(collection(db, 'advisors'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAdvisors(list);
      setLoading(false);
    }, (err) => {
      console.error('Error listening to advisors:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to remove advisor ${name}? This will unbind them from any linked estates.`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'advisors', id));
    } catch (err) {
      console.error('Failed to delete advisor:', err);
      alert('Error deleting advisor.');
    }
  };

  const filteredAdvisors = advisors.filter(adv => 
    adv.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    adv.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1>Project Advisors Manager</h1>
          <p>Register and edit reusable real estate specialists assigned to smart districts.</p>
        </div>
        <Link href="/admin/dashboard/advisors/create" className="admin-btn active" style={{ textDecoration: 'none' }}>
          + Add New Advisor
        </Link>
      </header>

      {/* Filter and Search Ribbon */}
      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Search by name or specialty role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
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

      {/* Roster Listing Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredAdvisors.length === 0 ? (
          <div className="admin-section-card" style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
            No advisors registered. Click "+ Add New Advisor" above to begin.
          </div>
        ) : (
          filteredAdvisors.map((advisor) => (
            <div key={advisor.id} className="admin-section-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                {/* Advisor Avatar */}
                <div style={{ width: '64px', height: '64px', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--admin-bg)', border: '1px solid var(--admin-border)', flexShrink: 0 }}>
                  <img
                    src={resolveMediaUrl(advisor.image) || 'https://placehold.co/150x150/111/fff?text=Advisor'}
                    alt={advisor.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/150x150/111/fff?text=Advisor';
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--admin-text-primary)', margin: '0 0 4px 0' }}>
                    {advisor.name}
                  </h3>
                  <span style={{ fontSize: '12px', color: 'var(--admin-accent)', fontWeight: 600 }}>
                    {advisor.role || 'Property Specialist'}
                  </span>
                </div>
              </div>

              {/* Bio summary / quote preview */}
              {advisor.quote && (
                <div style={{ 
                  backgroundColor: 'var(--admin-bg)', 
                  borderLeft: '2px solid var(--admin-accent)', 
                  padding: '8px 12px', 
                  fontSize: '12px', 
                  color: 'var(--admin-text-secondary)',
                  fontStyle: 'italic',
                  marginBottom: '16px',
                  lineHeight: '1.5'
                }}>
                  "{advisor.quote}"
                </div>
              )}

              {/* Coordinates details */}
              <div style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                <div><strong>Email:</strong> {advisor.email || 'N/A'}</div>
                <div><strong>Phone:</strong> {advisor.phone || 'N/A'}</div>
              </div>

              {/* Action Buttons */}
              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', borderTop: '1px solid var(--admin-border)', paddingTop: '16px' }}>
                <Link 
                  href={`/admin/dashboard/advisors/${advisor.id}`}
                  className="admin-btn"
                  style={{ flex: 1, textAlign: 'center', fontSize: '11px', textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}
                >
                  Edit Details
                </Link>
                <button
                  onClick={() => handleDelete(advisor.id, advisor.name)}
                  className="admin-btn"
                  style={{ flex: 1, fontSize: '11px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                  Remove Specialist
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
