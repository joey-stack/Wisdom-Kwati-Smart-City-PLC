'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminCreateAdvisorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    image: '',
    quote: '',
    whatsapp: '',
    bio: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      setError('Please provide at least the Name and Specialty Role.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'advisors'), {
        ...formData,
        createdAt: new Date().toISOString()
      });
      router.push('/admin/dashboard/advisors');
    } catch (err) {
      console.error('Failed to create advisor:', err);
      setError('Error saving advisor to database.');
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header view */}
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <div className="admin-title-group">
          <h1>Add New Advisor</h1>
          <p>Register a new real estate specialist for assigned estate listings.</p>
        </div>
        <Link href="/admin/dashboard/advisors" className="admin-btn" style={{ textDecoration: 'none', width: 'auto', padding: '10px 20px' }}>
          ← Back to Roster
        </Link>
      </header>

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '12px 16px', borderRadius: '4px', marginBottom: '24px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {/* Editor Card Container */}
      <div className="admin-section-card" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Kolawole Davies"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Specialty Role *
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Lead Abuja Sales Advisor"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="kolawole@wisdomkwatismartcity.com"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 810 000 0000"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Photo URL & Live Preview Rendering Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'end' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Profile Photo URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/... or paste any hosted link"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '10px', color: 'var(--admin-text-secondary)', marginBottom: '4px', fontWeight: 600 }}>LIVE PREVIEW</span>
              <div style={{ width: '70px', height: '70px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)' }}>
                <img
                  src={formData.image || 'https://placehold.co/150x150/111/fff?text=Photo'}
                  alt="Live Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/150x150/111/fff?text=Photo';
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                WhatsApp Direct Link
              </label>
              <input
                type="url"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="https://wa.me/2348100000000"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Signature Quote (Displays in detail views)
              </label>
              <input
                type="text"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                placeholder="e.g. Securing legacy properties in Katampe district"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Full Biography
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Provide a short description of their experience and property expertise..."
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
            ></textarea>
          </div>

          <button
            type="submit"
            className="admin-btn active"
            disabled={submitting}
            style={{ width: '100%', marginTop: '12px' }}
          >
            {submitting ? 'Creating Advisor Record...' : 'Publish Advisor Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
