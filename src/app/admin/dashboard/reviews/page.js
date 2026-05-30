'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Realtime listener for reviews collection, ordered by createdAt
    const unsubscribe = onSnapshot(collection(db, 'reviews'), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort in ascending/descending order depending on design. Since they alternate, let's sort by createdAt asc so oldest (or first added) is first.
      list.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeA - timeB;
      });
      setReviews(list);
      setLoading(false);
    }, (err) => {
      console.error('Error fetching reviews:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete the review by: "${name}"?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'reviews', id));
    } catch (err) {
      console.error('Failed to delete review:', err);
      alert('Error deleting review.');
    }
  };

  const filteredReviews = reviews.filter(review => {
    return (
      review.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.quote?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const isLimitReached = reviews.length >= 8;

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
          <h1>Reviews & Testimonials</h1>
          <p>Manage the dynamic reviews slider on the homepage. Capped at a maximum of 8 reviews.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: isLimitReached ? '#EF4444' : 'var(--admin-text-secondary)' }}>
            {reviews.length} / 8 Reviews
          </span>
          {isLimitReached ? (
            <button 
              disabled 
              className="admin-btn" 
              style={{ opacity: 0.5, cursor: 'not-allowed', background: 'var(--admin-border)', color: 'var(--admin-text-secondary)' }}
              title="Maximum of 8 reviews reached. Delete an existing review to add a new one."
            >
              Limit Reached (8 Max)
            </button>
          ) : (
            <Link href="/admin/dashboard/reviews/create" className="admin-btn active" style={{ textDecoration: 'none' }}>
              + Add Review
            </Link>
          )}
        </div>
      </header>

      {isLimitReached && (
        <div style={{
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#EF4444',
          padding: '12px 16px',
          borderRadius: '4px',
          marginBottom: '24px',
          fontSize: '13px',
          fontWeight: 500
        }}>
          ⚠️ You have reached the limit of 8 reviews. You cannot add new reviews until you delete an existing one. This constraint ensures high performance on the homepage.
        </div>
      )}

      {/* Filter Ribbon */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Search by reviewer name, designation or quote..."
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

      {/* Reviews Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredReviews.length === 0 ? (
          <div className="admin-section-card" style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
            No reviews found. Click "+ Add Review" to add your first testimonial.
          </div>
        ) : (
          filteredReviews.map((review, index) => {
            const isImageCard = index % 2 === 0;
            return (
              <div 
                key={review.id} 
                className="admin-section-card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%', 
                  padding: '24px',
                  border: isImageCard ? '1px solid var(--admin-primary)' : '1px solid var(--admin-border)',
                  position: 'relative'
                }}
              >
                <span style={{ 
                  position: 'absolute', 
                  top: '12px', 
                  right: '12px', 
                  fontSize: '10px', 
                  padding: '2px 6px', 
                  borderRadius: '12px', 
                  backgroundColor: isImageCard ? 'rgba(var(--admin-primary-rgb), 0.1)' : 'var(--admin-bg)',
                  color: isImageCard ? 'var(--admin-primary)' : 'var(--admin-text-secondary)',
                  fontWeight: 600,
                  border: '1px solid var(--admin-border)'
                }}>
                  {isImageCard ? '🖼️ Even (Image Card)' : '📝 Odd (Text Card)'}
                </span>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                  {review.avatar && (
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        onError={(e) => { e.target.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU&sz=1200'; }}
                      />
                    </div>
                  )}
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--admin-text-primary)', margin: '0 0 2px 0' }}>
                      {review.name}
                    </h3>
                    <span style={{ fontSize: '11px', color: 'var(--admin-text-secondary)' }}>
                      {review.designation}
                    </span>
                  </div>
                </div>

                <blockquote style={{ 
                  fontSize: '13px', 
                  color: 'var(--admin-text-primary)', 
                  fontStyle: 'italic', 
                  lineHeight: '1.5', 
                  margin: '0 0 12px 0',
                  borderLeft: '2px solid var(--admin-border)',
                  paddingLeft: '10px'
                }}>
                  "{review.quote}"
                </blockquote>

                {review.body && (
                  <p style={{ 
                    fontSize: '12px', 
                    color: 'var(--admin-text-secondary)', 
                    lineHeight: '1.5', 
                    margin: '0 0 16px 0',
                    display: '-webkit-box', 
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical', 
                    overflow: 'hidden' 
                  }}>
                    {review.body}
                  </p>
                )}

                {isImageCard && (
                  <div style={{ fontSize: '11px', color: 'var(--admin-text-secondary)', marginBottom: '16px', background: 'var(--admin-bg)', padding: '6px 10px', borderRadius: '4px' }}>
                    <strong>Bg Image:</strong> {review.bgImage ? 'Set' : 'Using default fallback'}
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--admin-border)', paddingTop: '16px', marginTop: 'auto' }}>
                  <Link 
                    href={`/admin/dashboard/reviews/${review.id}`}
                    className="admin-btn"
                    style={{ flex: 1, textAlign: 'center', fontSize: '11px', textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}
                  >
                    Edit Review
                  </Link>
                  <button
                    onClick={() => handleDelete(review.id, review.name)}
                    className="admin-btn"
                    style={{ flex: 1, fontSize: '11px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                  >
                    Delete
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
