'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import HouseTypeCard from './cards/HouseTypeCard';

/**
 * RecentListingsSection — homepage "Recent Listings" section.
 *
 * Client island: fetches the most recently added house types from
 * Firestore and renders them using the shared HouseTypeCard template.
 * Shows up to 2 cards on the homepage (full archive at /house-types).
 */
export default function RecentListingsSection() {
  const [houseTypes, setHouseTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    getDocs(collection(db, 'houseTypes'))
      .then(snap => {
        const list = [];
        snap.forEach(doc => {
          const d = doc.data();
          if (!d.classType) return; // skip shell documents

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
            name: d.classType,
            tagline: d.tagline || `${d.beds || 0}-Bedroom Smart Villa`,
            beds: d.beds || 0,
            baths: d.baths || 0,
            size: d.size || 'N/A',
            price: d.price || null,
            image: d.images && d.images.length > 0
              ? d.images[0]
              : 'https://placehold.co/800x600/eaeaea/999?text=Smart+Villa',
            estate: d.estate || '',
            createdAtDate,
          });
        });

        // Sort descending (newest first)
        list.sort((a, b) => b.createdAtDate - a.createdAtDate);

        setHouseTypes(list.slice(0, 2));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  /* ── Skeleton (shown only while request is in-flight) ── */
  if (!mounted || loading) {
    return (
      <div className="wksc-ht-grid wksc-ht-grid--home">
        {[1, 2].map(i => (
          <div key={i} className="wksc-ht-card" style={{ pointerEvents: 'none' }}>
            <div className="wksc-ht-card__image-wrapper">
              <div className="wksc-ht-card__image wksc-skeleton" />
            </div>
            <div className="wksc-ht-card__body" style={{ gap: '12px' }}>
              <div style={{ height: '18px', width: '62%', background: 'var(--bg-surface)', borderRadius: '6px' }} className="wksc-skeleton" />
              <div style={{ height: '13px', width: '80%', background: 'var(--bg-surface)', borderRadius: '6px' }} className="wksc-skeleton" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ── No data found ── */
  if (houseTypes.length === 0) return null;

  /* ── Cards ── */
  return (
    <div className="wksc-ht-grid wksc-ht-grid--home">
      {houseTypes.map(ht => (
        <HouseTypeCard key={ht.id} {...ht} />
      ))}
    </div>
  );
}
