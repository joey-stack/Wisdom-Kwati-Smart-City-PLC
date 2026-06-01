'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { collection, deleteDoc, doc, onSnapshot, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminHouseTypesPage() {
  const [houseTypes, setHouseTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);

  // HTML5 Drag & Drop handlers for Kanban-like card sorting
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = async (e, index) => {
    e.preventDefault();
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (isNaN(sourceIndex) || sourceIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const items = [...houseTypes];
    const draggedItem = items[sourceIndex];
    items.splice(sourceIndex, 1);
    items.splice(index, 0, draggedItem);

    // Update local state immediately for a smooth, lag-free visual reorder
    setHouseTypes(items);
    setDraggedIndex(null);
    setDragOverIndex(null);

    // Persist new arrangement in Firestore as a single atomic batch
    setSavingOrder(true);
    try {
      const batch = writeBatch(db);
      items.forEach((ht, idx) => {
        const docRef = doc(db, 'houseTypes', ht.id);
        batch.update(docRef, { sortOrder: idx + 1 });
      });
      await batch.commit();
    } catch (err) {
      console.error('Failed to commit batch reorder:', err);
    } finally {
      setSavingOrder(false);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const savingOrderRef = useRef(savingOrder);
  useEffect(() => {
    savingOrderRef.current = savingOrder;
  }, [savingOrder]);

  useEffect(() => {
    // Live subscription to house types
    const unsubscribe = onSnapshot(collection(db, 'houseTypes'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      list.sort((a, b) => {
        const orderA = a.sortOrder !== undefined && a.sortOrder !== null ? a.sortOrder : 999;
        const orderB = b.sortOrder !== undefined && b.sortOrder !== null ? b.sortOrder : 999;
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        return (a.classType || '').localeCompare(b.classType || '');
      });

      if (!savingOrderRef.current) {
        setHouseTypes(list);
      }
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
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/admin/dashboard/house-types/reorder" className="admin-btn" style={{ textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}>
            ⇅ Arrange House Types
          </Link>
          <Link href="/admin/dashboard/house-types/create" className="admin-btn active" style={{ textDecoration: 'none' }}>
            + Add New Spec
          </Link>
        </div>
      </header>

      {/* Roster Listing Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {houseTypes.length === 0 ? (
          <div className="admin-section-card" style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
            No house specifications registered. Click "+ Add New Spec" above to begin.
          </div>
        ) : (
          houseTypes.map((ht, idx) => {
            const thumbnail = ht.images && ht.images.length > 0
              ? ht.images[0]
              : 'https://placehold.co/600x400/111/fff?text=Villa+Spec';

            const isDragging = idx === draggedIndex;
            const isDragOver = idx === dragOverIndex;

            let borderStyle = '1px solid var(--admin-border)';
            let transformStyle = 'none';

            if (isDragging) {
              borderStyle = '1px dashed var(--admin-accent)';
            } else if (isDragOver && draggedIndex !== null) {
              borderStyle = '2px solid var(--admin-accent)';
              transformStyle = 'scale(1.02)';
            }

            return (
              <div
                key={ht.id}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleDrop(e, idx)}
                className="admin-section-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  padding: '24px',
                  cursor: 'grab',
                  opacity: isDragging ? 0.4 : 1,
                  border: borderStyle,
                  transform: transformStyle,
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}
              >
                
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
                  <div><strong>Display Order:</strong> <span style={{ color: 'var(--admin-accent)' }}>{ht.sortOrder !== undefined && ht.sortOrder !== null ? ht.sortOrder : 'Not Set (999)'}</span></div>
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
