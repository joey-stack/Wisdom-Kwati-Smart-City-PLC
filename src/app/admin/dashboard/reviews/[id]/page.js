'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminEditReviewPage({ params }) {
  const router = useRouter();
  const { id } = use(params);

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

  useEffect(() => {
    async function loadReviewData() {
      try {
        const docRef = doc(db, 'reviews', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name || '',
            designation: data.designation || '',
            avatar: data.avatar || '',
            quote: data.quote || '',
            body: data.body || '',
            bgImage: data.bgImage || ''
          });
        } else {
          setError('Review not found in database.');
        }
      } catch (err) {
        console.error('Error loading review details:', err);
        setError('Failed to fetch review details.');
      } finally {
        setLoading(false);
      }
    }

    loadReviewData();
  }, [id]);

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

    setSubmitting(true);
    setError('');

    try {
      const docRef = doc(db, 'reviews', id);
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      router.push('/admin/dashboard/reviews');
    } catch (err) {
      console.error('Failed to update review:', err);
      setError('Error saving review changes to database.');
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this review by "${formData.name}"?`)) {
      return;
    }
    setSubmitting(true);
    try {
      await deleteDoc(doc(db, 'reviews', id));
      router.push('/admin/dashboard/reviews');
    } catch (err) {
      console.error('Failed to delete review:', err);
      setError('Error deleting review.');
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

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <div className="admin-title-group">
          <h1>Edit Review</h1>
          <p>Update review contents, designation, avatar or backgrounds.</p>
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
              Provide a valid absolute image web URL.
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
              Only rendered if this review falls on an odd index (Text Card).
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
              Only rendered if this review falls on an even index (Image Card).
            </span>
          </div>

          {/* Submit Actions */}
          <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--admin-border)', paddingTop: '24px', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={handleDelete}
              disabled={submitting}
              style={{ 
                padding: '12px 24px',
                background: 'rgba(239, 68, 68, 0.1)', 
                color: '#EF4444', 
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: submitting ? 'not-allowed' : 'pointer'
              }}
            >
              Delete Review
            </button>
            <div style={{ display: 'flex', gap: '16px' }}>
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
                disabled={submitting}
                className="admin-btn active"
                style={{ 
                  padding: '12px 24px',
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                {submitting ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
