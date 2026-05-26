'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminEditBlogPage({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'GUIDE',
    author: 'JAMES MILLER',
    image: '',
    excerpt: '',
    content: '',
    date: '',
    published: true
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadBlogData() {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData({
            title: docSnap.data().title || '',
            slug: docSnap.data().slug || '',
            category: docSnap.data().category || 'GUIDE',
            author: docSnap.data().author || 'JAMES MILLER',
            image: docSnap.data().image || '',
            excerpt: docSnap.data().excerpt || '',
            content: docSnap.data().content || '',
            date: docSnap.data().date || '',
            published: docSnap.data().published !== false
          });
        } else {
          setError('Blog article not found.');
        }
      } catch (err) {
        console.error('Failed to load blog post:', err);
        setError('Error loading blog post from database.');
      } finally {
        setLoading(false);
      }
    }
    loadBlogData();
  }, [id]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: val };
      if (name === 'title' && !prev.slug) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      setError('Please provide at least a Title, Slug, and Article Content.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const docRef = doc(db, 'blogs', id);
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date().toISOString()
      });
      router.push('/admin/dashboard/blogs');
    } catch (err) {
      console.error('Failed to update blog post:', err);
      setError('Error saving changes to database.');
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete this article: "${formData.title}"? This action cannot be undone.`)) {
      return;
    }

    setSubmitting(true);
    try {
      await deleteDoc(doc(db, 'blogs', id));
      router.push('/admin/dashboard/blogs');
    } catch (err) {
      console.error('Failed to delete article:', err);
      setError('Failed to delete blog post from database.');
      setSubmitting(false);
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
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header view */}
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <div className="admin-title-group">
          <h1>Edit Blog Post</h1>
          <p>Modify article details, category fields, or body text.</p>
        </div>
        <Link href="/admin/dashboard/blogs" className="admin-btn" style={{ textDecoration: 'none', width: 'auto', padding: '10px 20px' }}>
          ← Back to Articles
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
          
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Article Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. 7 Simple Upgrades That Make Your Home Feel Luxurious"
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                URL Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="7-simple-upgrades-that-make-your-home-feel-luxurious"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
              >
                <option value="GUIDE">GUIDE</option>
                <option value="NEWS">NEWS</option>
                <option value="LIFESTYLE">LIFESTYLE</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Author Name
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. JAMES MILLER"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Display Date (e.g. DEC 9, 2024)
              </label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="e.g. FEB 5, 2025"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Featured Image URL & Preview */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'end' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Featured Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/... or paste image URL"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '10px', color: 'var(--admin-text-secondary)', marginBottom: '4px', fontWeight: 600 }}>IMAGE PREVIEW</span>
              <div style={{ width: '100px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)' }}>
                <img
                  src={formData.image || 'https://placehold.co/150x100/111/fff?text=No+Image'}
                  alt="Featured Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/150x100/111/fff?text=No+Image';
                  }}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Short Excerpt / Summary
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="2"
              maxLength="300"
              placeholder="Provide a brief summary of the article to show in search grids (max 300 chars)..."
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
            ></textarea>
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Article Body Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="12"
              required
              placeholder="Write the full content of the article here. You can use standard formatting..."
              style={{ width: '100%', padding: '16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', lineHeight: '1.6' }}
            ></textarea>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              name="published"
              id="published"
              checked={formData.published}
              onChange={handleChange}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="published" style={{ fontSize: '13px', color: 'var(--admin-text-primary)', cursor: 'pointer', fontWeight: 500 }}>
              Publish this article immediately (visible on front end)
            </label>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <button
              type="submit"
              className="admin-btn active"
              disabled={submitting}
              style={{ flex: 2, padding: '14px' }}
            >
              {submitting ? 'Saving Changes...' : 'Save Article Changes'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="admin-btn"
              disabled={submitting}
              style={{ flex: 1, padding: '14px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
            >
              Delete Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
