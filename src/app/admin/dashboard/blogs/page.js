'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { collection, deleteDoc, doc, onSnapshot, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { resolveMediaUrl } from '@/lib/media';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
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

    const items = [...filteredBlogs];
    const draggedItem = items[sourceIndex];
    items.splice(sourceIndex, 1);
    items.splice(index, 0, draggedItem);

    // Map reorder to original main list
    const sourceBlogId = filteredBlogs[sourceIndex].id;
    const targetBlogId = filteredBlogs[index].id;

    const sourceIdxInMain = blogs.findIndex(b => b.id === sourceBlogId);
    const targetIdxInMain = blogs.findIndex(b => b.id === targetBlogId);

    const mainItems = [...blogs];
    const [movedItem] = mainItems.splice(sourceIdxInMain, 1);
    mainItems.splice(targetIdxInMain, 0, movedItem);

    setBlogs(mainItems);
    setDraggedIndex(null);
    setDragOverIndex(null);

    setSavingOrder(true);
    try {
      const batch = writeBatch(db);
      mainItems.forEach((b, idx) => {
        const docRef = doc(db, 'blogs', b.id);
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
    // Live subscription to blogs
    const unsubscribe = onSnapshot(collection(db, 'blogs'), (snapshot) => {
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
        return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
      });
      
      if (!savingOrderRef.current) {
        setBlogs(list);
      }
      setLoading(false);
    }, (err) => {
      console.error('Error listening to blogs:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete the blog post: "${title}"?`)) {
      return;
    }
    try {
      await deleteDoc(doc(db, 'blogs', id));
    } catch (err) {
      console.error('Failed to delete blog post:', err);
      alert('Error deleting blog post.');
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || blog.category?.toUpperCase() === categoryFilter.toUpperCase();
    return matchesSearch && matchesCategory;
  });

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
          <h1>Blog Posts Manager</h1>
          <p>Create, edit, and publish articles. Drag and drop cards to rearrange display order.</p>
        </div>
        <Link href="/admin/dashboard/blogs/create" className="admin-btn active" style={{ textDecoration: 'none' }}>
          + Write New Post
        </Link>
      </header>

      {/* Filter and Search Ribbon */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1',
            minWidth: '250px',
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
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: '12px 16px',
            borderRadius: '4px',
            border: '1px solid var(--admin-border)',
            backgroundColor: 'var(--admin-surface-light)',
            color: 'var(--admin-text-primary)',
            fontSize: '13px',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="ALL">All Categories</option>
          <option value="GUIDE">Guide</option>
          <option value="NEWS">News</option>
          <option value="LIFESTYLE">Lifestyle</option>
        </select>
      </div>

      {/* Blog Listing Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredBlogs.length === 0 ? (
          <div className="admin-section-card" style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: 'var(--admin-text-secondary)' }}>
            No blog posts found. Click "+ Write New Post" to start.
          </div>
        ) : (
          filteredBlogs.map((blog, index) => {
            const isDragging = index === draggedIndex;
            const isDragOver = index === dragOverIndex;

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
                key={blog.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleDrop(e, index)}
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
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                {/* Blog Image */}
                <div style={{ width: '80px', height: '80px', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'var(--admin-bg)', border: '1px solid var(--admin-border)', flexShrink: 0 }}>
                  <img
                    src={resolveMediaUrl(blog.image) || 'https://placehold.co/150x150/111/fff?text=Blog'}
                    alt={blog.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/150x150/111/fff?text=Blog';
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--admin-text-primary)', margin: '0 0 4px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                    {blog.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--admin-accent)', fontWeight: 600, textTransform: 'uppercase' }}>
                      {blog.category || 'GUIDE'}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--admin-text-secondary)' }}>•</span>
                    <span style={{ fontSize: '11px', color: 'var(--admin-text-secondary)' }}>
                      {blog.date || 'No Date'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              {blog.excerpt && (
                <p style={{ fontSize: '13px', color: 'var(--admin-text-secondary)', lineHeight: '1.5', margin: '0 0 16px 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {blog.excerpt}
                </p>
              )}

              {/* Meta details */}
              <div style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '20px', marginTop: 'auto' }}>
                <div><strong>Author:</strong> {blog.author || 'Anonymous'}</div>
                <div><strong>Slug:</strong> <code style={{ color: 'var(--admin-accent)' }}>{blog.slug}</code></div>
                <div><strong>Sort Order:</strong> <span style={{ color: 'var(--admin-accent)' }}>{blog.sortOrder !== undefined && blog.sortOrder !== null ? blog.sortOrder : '999 (Default)'}</span></div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid var(--admin-border)', paddingTop: '16px' }}>
                <Link 
                  href={`/admin/dashboard/blogs/${blog.id}`}
                  className="admin-btn"
                  style={{ flex: 1, textAlign: 'center', fontSize: '11px', textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}
                >
                  Edit Article
                </Link>
                <button
                  onClick={() => handleDelete(blog.id, blog.title)}
                  className="admin-btn"
                  style={{ flex: 1, fontSize: '11px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                >
                  Delete Post
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
