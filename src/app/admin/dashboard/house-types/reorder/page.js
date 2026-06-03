'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { resolveMediaUrl } from '@/lib/media';

export default function ReorderHouseTypesPage() {
  const router = useRouter();
  const [houseTypes, setHouseTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const [dragOverIndex, setDragOverIndex] = useState(null);

  useEffect(() => {
    async function fetchHouseTypes() {
      try {
        const snap = await getDocs(collection(db, 'houseTypes'));
        const list = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Sort by existing sortOrder ascending first, then alphabetically by classType
        list.sort((a, b) => {
          const orderA = a.sortOrder !== undefined && a.sortOrder !== null ? a.sortOrder : 999;
          const orderB = b.sortOrder !== undefined && b.sortOrder !== null ? b.sortOrder : 999;
          if (orderA !== orderB) {
            return orderA - orderB;
          }
          return (a.classType || '').localeCompare(b.classType || '');
        });
        setHouseTypes(list);
      } catch (err) {
        console.error('Error fetching house types:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchHouseTypes();
  }, []);

  // HTML5 Drag & Drop handlers
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

  const handleDrop = (e, index) => {
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
    
    setHouseTypes(items);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Keyboard/Click Move fallback
  const moveItem = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= houseTypes.length) return;
    
    const items = [...houseTypes];
    const currentItem = items[index];
    items.splice(index, 1);
    items.splice(nextIndex, 0, currentItem);
    setHouseTypes(items);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update each houseType's sortOrder to match its current index
      await Promise.all(
        houseTypes.map((ht, idx) => {
          const docRef = doc(db, 'houseTypes', ht.id);
          return updateDoc(docRef, { sortOrder: idx + 1 });
        })
      );
      alert('House types ordering saved successfully!');
      router.push('/admin/dashboard/house-types');
    } catch (err) {
      console.error('Failed to save sorted order:', err);
      alert('Failed to save house spec ordering.');
    } finally {
      setSaving(false);
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
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <div className="admin-title-group">
          <h1>Arrange House Type Order</h1>
          <p>Drag and drop cards or use the arrows to define the exact layout order of house specifications on the public catalog page.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={handleSave} 
            disabled={saving} 
            className="admin-btn active"
            style={{ width: 'auto', padding: '10px 24px', cursor: 'pointer' }}
          >
            {saving ? 'Saving...' : 'Save Arrangement'}
          </button>
          <Link href="/admin/dashboard/house-types" className="admin-btn" style={{ textDecoration: 'none', width: 'auto', padding: '10px 20px' }}>
            Cancel
          </Link>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {houseTypes.length === 0 ? (
          <div className="admin-section-card" style={{ padding: '48px', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
            No house specifications available to reorder.
          </div>
        ) : (
          houseTypes.map((ht, idx) => {
            const isDragging = idx === draggedIndex;
            const isDragOver = idx === dragOverIndex;
            const thumbnail = ht.images && ht.images.length > 0
              ? resolveMediaUrl(ht.images[0])
              : 'https://placehold.co/100x100/111/fff?text=Villa';

            let borderTop = '1px solid var(--admin-border)';
            let borderBottom = '1px solid var(--admin-border)';
            let transformStyle = 'none';
            
            if (isDragging) {
              borderTop = '1px dashed var(--admin-accent)';
              borderBottom = '1px dashed var(--admin-accent)';
            } else if (isDragOver && draggedIndex !== null) {
              transformStyle = 'translateY(1px)';
              if (idx < draggedIndex) {
                borderTop = '3px solid var(--admin-accent)';
              } else {
                borderBottom = '3px solid var(--admin-accent)';
              }
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
                  alignItems: 'center',
                  padding: '16px 24px',
                  cursor: 'grab',
                  opacity: isDragging ? 0.4 : 1,
                  borderTop: borderTop,
                  borderBottom: borderBottom,
                  borderLeft: isDragging ? '1px dashed var(--admin-accent)' : '1px solid var(--admin-border)',
                  borderRight: isDragging ? '1px dashed var(--admin-accent)' : '1px solid var(--admin-border)',
                  backgroundColor: 'var(--admin-surface)',
                  transition: 'all 0.15s ease',
                  transform: transformStyle,
                  userSelect: 'none'
                }}
              >
                {/* Visual Drag Handle */}
                <div style={{ fontSize: '20px', color: 'var(--admin-text-secondary)', marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                  ☰
                </div>

                {/* Cover Preview */}
                <img
                  src={thumbnail}
                  alt={ht.classType || ht.id}
                  style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px', marginRight: '20px', border: '1px solid var(--admin-border)' }}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/100x100/111/fff?text=Villa';
                  }}
                />

                {/* Text Info */}
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--admin-text-primary)', margin: '0 0 2px 0', textTransform: 'uppercase' }}>
                    {ht.classType || ht.id}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', margin: 0 }}>
                    {ht.beds || 0} Beds · {ht.baths || 0} Baths · {ht.size || '0 SQM'}
                  </p>
                </div>

                {/* Display rank index */}
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--admin-accent)', marginRight: '32px', backgroundColor: 'var(--admin-bg)', padding: '4px 10px', borderRadius: '20px', border: '1px solid var(--admin-border)' }}>
                  Row {Math.floor(idx / 2) + 1} · Item {idx + 1}
                </div>

                {/* Fallback ordering buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => moveItem(idx, -1)}
                    disabled={idx === 0}
                    className="admin-btn"
                    style={{ padding: '6px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', minWidth: 'auto', background: 'var(--admin-surface-light)', cursor: idx === 0 ? 'not-allowed' : 'pointer' }}
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveItem(idx, 1)}
                    disabled={idx === houseTypes.length - 1}
                    className="admin-btn"
                    style={{ padding: '6px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', minWidth: 'auto', background: 'var(--admin-surface-light)', cursor: idx === houseTypes.length - 1 ? 'not-allowed' : 'pointer' }}
                    title="Move Down"
                  >
                    ▼
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
