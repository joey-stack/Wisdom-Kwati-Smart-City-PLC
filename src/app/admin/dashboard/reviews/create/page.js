'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminCreateReviewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    avatar: '',
    quote: '',
    body: '',
    bgImage: ''
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    async function checkLimit() {
      try {
        const snap = await getDocs(collection(db, 'reviews'));
        setReviewsCount(snap.docs.length);
        if (snap.docs.length >= 8) {
          setError('Collection limit reached: A maximum of 8 reviews is allowed. You cannot submit new reviews.');
        }
      } catch (err) {
        console.error('Error checking reviews limit:', err);
      } finally {
        setLoading(false);
      }
    }
    checkLimit();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.designation || !formData.avatar || !formData.quote) {
      setError('Please fill in all required fields (Name, Designation, Avatar URL, and Quote).');
      return;
    }

    if (reviewsCount >= 8) {
      setError('Cannot add review: A maximum of 8 reviews is allowed.');
      return;
    }

    setSubmitting(true);
    setError('');

    // Generate a unique ID from name
    const reviewId = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();

    try {
      const docPayload = {
        id: reviewId,
        ...formData,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'reviews', reviewId), docPayload);
      router.push('/admin/dashboard/reviews');
    } catch (err) {
      console.error('Failed to create review:', err);
      setError('Error saving review to database.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-skeleton-spinner"></div>
      </div>
    );
  }

  const isLimitReached = reviewsCount >= 8;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <div className="admin-title-group">
          <h1>Add Customer Review</h1>
          <p>Publish a new customer review to the homepage marquee. Capped at 8 total.</p>
        </div>
        <Link href="/admin/dashboard/reviews" className="admin-btn" style={{ textDecoration: 'none', width: 'auto', padding: '10px 20px' }}>
          ← Back to Reviews
        </Link>
      </header>

      {error && (
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
          {error}
        </div>
      )}

      <div className="admin-section-card" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Reviewer Name & Designation */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Reviewer Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Chief Dr. Chidi Okafor"
                disabled={isLimitReached}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '4px',
                  border: '1px solid var(--admin-border)',
                  backgroundColor: 'var(--admin-surface-light)',
                  color: 'var(--admin-text-primary)',
                  fontSize: '13px',
                  outline: 'none'
                }}
                required
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Designation / Meta *
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. HOME OWNER, ABUJA"
                disabled={isLimitReached}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '4px',
                  border: '1px solid var(--admin-border)',
                  backgroundColor: 'var(--admin-surface-light)',
                  color: 'var(--admin-text-primary)',
                  fontSize: '13px',
                  outline: 'none'
                }}
                required
              />
            </div>
          </div>

          {/* Avatar URL */}
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Avatar Image URL *
            </label>
            <input
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="e.g. https://images.weserv.nl/?url=..."
              disabled={isLimitReached}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '4px',
                border: '1px solid var(--admin-border)',
                backgroundColor: 'var(--admin-surface-light)',
                color: 'var(--admin-text-primary)',
                fontSize: '13px',
                outline: 'none'
              }}
              required
            />
            <span style={{ fontSize: '11px', color: 'var(--admin-text-secondary)', marginTop: '4px', display: 'block' }}>
              Provide a valid absolute image web URL. Make sure it uses modern formatting or the direct weserv image accelerator wrapper.
            </span>
          </div>

          {/* Quote */}
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Testimonial Quote / Headline *
            </label>
            <textarea
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              placeholder="Provide a punchy direct quote..."
              disabled={isLimitReached}
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '4px',
                border: '1px solid var(--admin-border)',
                backgroundColor: 'var(--admin-surface-light)',
                color: 'var(--admin-text-primary)',
                fontSize: '13px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              required
            />
          </div>

          {/* Detailed Body (optional) */}
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Detailed Review Body (Optional)
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              placeholder="Optional supporting paragraph (displayed inside Text Cards)..."
              disabled={isLimitReached}
              rows={4}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '4px',
                border: '1px solid var(--admin-border)',
                backgroundColor: 'var(--admin-surface-light)',
                color: 'var(--admin-text-primary)',
                fontSize: '13px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
            <span style={{ fontSize: '11px', color: 'var(--admin-text-secondary)', marginTop: '4px', display: 'block' }}>
              Only rendered if this review falls on an odd index (Text Card). If even index (Image Card), this field is ignored.
            </span>
          </div>

          {/* Background Image URL (optional) */}
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Background Image URL (Optional, for Image Cards)
            </label>
            <input
              type="url"
              name="bgImage"
              value={formData.bgImage}
              onChange={handleChange}
              placeholder="e.g. https://images.weserv.nl/?url=..."
              disabled={isLimitReached}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '4px',
                border: '1px solid var(--admin-border)',
                backgroundColor: 'var(--admin-surface-light)',
                color: 'var(--admin-text-primary)',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <span style={{ fontSize: '11px', color: 'var(--admin-text-secondary)', marginTop: '4px', display: 'block' }}>
              Only rendered if this review falls on an even index (Image Card). If left empty, a high-fidelity WKSC estate background image is used as a fallback.
            </span>
          </div>

          {/* Submit Action */}
          <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--admin-border)', paddingTop: '24px', justifyContent: 'flex-end' }}>
            <Link 
              href="/admin/dashboard/reviews" 
              className="admin-btn"
              style={{ 
                textDecoration: 'none', 
                background: 'transparent', 
                border: '1px solid var(--admin-border)', 
                color: 'var(--admin-text-primary)',
                padding: '12px 24px'
              }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting || isLimitReached}
              className={`admin-btn ${isLimitReached ? '' : 'active'}`}
              style={{ 
                padding: '12px 24px',
                cursor: (submitting || isLimitReached) ? 'not-allowed' : 'pointer',
                opacity: (submitting || isLimitReached) ? 0.6 : 1
              }}
            >
              {submitting ? 'Saving Review...' : 'Publish Testimonial'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
