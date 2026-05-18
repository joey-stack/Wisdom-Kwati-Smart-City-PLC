'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminHouseTypesPage() {
  const [houseTypes, setHouseTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Live subscription to house types
    const unsubscribe = onSnapshot(collection(db, 'houseTypes'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHouseTypes(list);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching house types:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete the house spec "${name}"? This will unbind it from any featured estates.`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'houseTypes', id));
    } catch (err) {
      console.error('Failed to delete house type:', err);
      alert('Error deleting house spec.');
    }
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
          <h1>House Specifications Manager</h1>
          <p>Register structural smart villa specs, interior/exterior detailed tables, and configure Bento photo galleries.</p>
        </div>
        <Link href="/admin/dashboard/house-types/create" className="admin-btn active" style={{ textDecoration: 'none' }}>
          + Add New Spec
        </Link>
      </header>

      {/* Roster Listing Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {houseTypes.length === 0 ? (
          <div className="admin-section-card" style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
            No house specifications registered. Click "+ Add New Spec" above to begin.
          </div>
        ) : (
          houseTypes.map((ht) => {
            const thumbnail = ht.images && ht.images.length > 0
              ? ht.images[0]
              : 'https://placehold.co/600x400/111/fff?text=Villa+Spec';

            return (
              <div key={ht.id} className="admin-section-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
                
                {/* Visual Cover Preview */}
                <div style={{ width: '100%', height: '160px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', marginBottom: '16px', position: 'relative' }}>
                  <img
                    src={thumbnail}
                    alt={ht.classType}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/600x400/111/fff?text=Villa+Spec';
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
                    {ht.size || '0 SQM'}
                  </span>
                </div>

                {/* Spec Title */}
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--admin-text-primary)', margin: '0 0 4px 0', textTransform: 'uppercase' }}>
                  {ht.classType || ht.id}
                </h3>
                
                {/* Grid details */}
                <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--admin-accent)', fontWeight: 600, marginBottom: '16px' }}>
                  <span>{ht.beds || 0} BEDROOMS</span>
                  <span>•</span>
                  <span>{ht.baths || 0} BATHROOMS</span>
                  <span>•</span>
                  <span>{ht.floors || 0} FLOORS</span>
                </div>

                {/* Technical data */}
                <div style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px', backgroundColor: 'var(--admin-bg)', padding: '12px', borderRadius: '4px', border: '1px solid var(--admin-border)' }}>
                  <div><strong>Spec Slug:</strong> <code style={{ color: 'var(--admin-accent)' }}>{ht.id}</code></div>
                  <div><strong>Plot Lot Size:</strong> {ht.lotSize || 'N/A'}</div>
                  <div><strong>Parking Spaces:</strong> {ht.parking || 'N/A'}</div>
                  <div><strong>Gallery Images:</strong> {ht.images?.length || 0} / 5 loaded</div>
                </div>

                {/* Action Buttons */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: '12px', borderTop: '1px solid var(--admin-border)', paddingTop: '16px' }}>
                  <Link 
                    href={`/admin/dashboard/house-types/${ht.id}`}
                    className="admin-btn"
                    style={{ flex: 1, textAlign: 'center', fontSize: '11px', textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}
                  >
                    Edit Spec Configuration
                  </Link>
                  <button
                    onClick={() => handleDelete(ht.id, ht.classType || ht.id)}
                    className="admin-btn"
                    style={{ flex: 1, fontSize: '11px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                  >
                    Remove Spec
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
