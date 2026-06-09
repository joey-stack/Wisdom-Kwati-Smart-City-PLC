'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { resolveMediaUrl } from '@/lib/media';
import '../../../styles/blog-single.css';
import '../../../styles/blogs.css';

export default function BlogDetailPage({ params }) {
  const { slug } = use(params);

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!slug || slug === 'undefined') return;

    let active = true;

    async function loadBlog() {
      try {
        setLoading(true);
        // Query blogs collection where slug field equals the slug parameter
        const q = query(collection(db, 'blogs'), where('slug', '==', slug), limit(1));
        const querySnap = await getDocs(q);

        if (!active) return;

        if (!querySnap.empty) {
          const docSnap = querySnap.docs[0];
          const docData = docSnap.data();
          setBlog({ id: docSnap.id, ...docData });

          // Load other related blogs
          const relQ = query(collection(db, 'blogs'), limit(5));
          const relSnap = await getDocs(relQ);
          if (active) {
            const relList = relSnap.docs
              .map(d => ({ id: d.id, ...d.data() }))
              .filter(item => item.slug !== slug)
              .slice(0, 4);
            setRelatedBlogs(relList);
          }
        } else {
          // Fallback: Try direct document ID lookup (for legacy posts)
          const docRef = doc(db, 'blogs', slug);
          const docSnap = await getDoc(docRef);
          if (!active) return;
          if (docSnap.exists()) {
            const docData = docSnap.data();
            setBlog({ id: docSnap.id, ...docData });

            const relQ = query(collection(db, 'blogs'), limit(5));
            const relSnap = await getDocs(relQ);
            if (active) {
              const relList = relSnap.docs
                .map(d => ({ id: d.id, ...d.data() }))
                .filter(item => item.slug !== slug)
                .slice(0, 4);
              setRelatedBlogs(relList);
            }
          } else {
            setBlog(null);
          }
        }
      } catch (err) {
        console.error('Error fetching blog details:', err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }
    loadBlog();

    return () => {
      active = false;
    };
  }, [slug]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const getSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: 'var(--bg-main)', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div className="label-square" style={{ width: '40px', height: '40px', margin: '0 auto 20px', backgroundColor: 'var(--accent-green)', borderRadius: '4px' }}></div>
          <h2 style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.1em' }}>LOADING INSIGHT ARTICLE...</h2>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: 'var(--bg-main)', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '20px' }}>ARTICLE NOT FOUND</h2>
          <Link href="/blogs" className="btn-pill" style={{ background: 'var(--accent-green)', border: 'none', color: '#000', padding: '12px 24px', textDecoration: 'none', borderRadius: '50px', fontWeight: '700' }}>
            BACK TO BLOGS & INSIGHTS
          </Link>
        </div>
      </div>
    );
  }

  // Calculate read time based on word count
  const words = blog.content ? blog.content.split(/\s+/).length : 200;
  const readTime = `${Math.max(1, Math.ceil(words / 200))} MIN READ`;

  return (
    <main className="blog-single-page">
      <div className="blog-single-container">
        
        {/* Back Link */}
        <Link href="/blogs" className="back-to-blogs-link" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          color: 'var(--text-secondary)',
          fontWeight: '600',
          fontSize: '14px',
          marginBottom: '32px',
          transition: 'color 0.3s ease'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)' }}><polyline points="9 18 15 12 9 6"></polyline></svg>
          BACK TO BLOGS & INSIGHTS
        </Link>

        {/* Blog Header */}
        <header className="blog-single-header">
          <div className="blog-single-label">
            <div className="label-square"></div>
            <span>{blog.category}</span>
            <div className="label-square"></div>
          </div>
          <h1 className="blog-single-title">{blog.title}</h1>
          
          <div className="blog-single-meta">
            <div className="blog-single-meta-item">
              <div className="blog-single-avatar">
                <Image width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={`https://ui-avatars.com/api/?name=${(blog.author || 'WK').replace(' ', '+')}&background=random`} alt={blog.author} />
              </div>
              <span className="blog-single-author-name">{blog.author || 'James Miller'}</span>
            </div>
            <div className="blog-single-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>{blog.date}</span>
            </div>
            <div className="blog-single-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>{readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="blog-single-featured-image">
          <Image width={1920} height={1080} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={resolveMediaUrl(blog.image, 2000) || 'https://placehold.co/1200x800/111/fff?text=Blog+Header'} alt={blog.title} referrerPolicy="no-referrer" priority={true} unoptimized={true} />
        </div>

        {/* Layout: Sidebar + Article Body */}
        <div className="blog-single-layout">
          
          {/* Sidebar */}
          <aside className="blog-single-sidebar">
            <div className="sidebar-widget">
              <h4 className="widget-title">Share Article</h4>
              <div className="share-links">
                <button className="share-btn" aria-label="Share on Twitter" onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); }}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
                <button className="share-btn" aria-label="Share on LinkedIn" onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); }}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </button>
                <button className="share-btn" aria-label="Share on Facebook" onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!'); }}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </button>
              </div>
            </div>

            <div className="sidebar-widget">
              <h4 className="widget-title">Insights Newsletter</h4>
              {subscribed ? (
                <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '14px', fontStyle: 'italic' }}>
                  ✓ Thank you! You&apos;re subscribed.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">SUBSCRIBE</button>
                </form>
              )}
            </div>
          </aside>

          {/* Main Article Body */}
          <article className="blog-single-body">
            {blog.excerpt && <p className="blog-single-lead" style={{ fontSize: '20px', fontWeight: '500', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>{blog.excerpt}</p>}
            
            {/* Split paragraphs by newlines and render */}
            {blog.content?.split('\n').map((paragraph, idx) => {
              const text = paragraph.trim();
              if (!text) return null;
              if (text.endsWith(':')) {
                return <h2 key={idx} style={{ marginTop: '32px' }}>{text.slice(0, -1)}</h2>;
              }
              return <p key={idx}>{text}</p>;
            })}

            {blog.quote && (
              <blockquote>
                &ldquo;{blog.quote}&rdquo;
              </blockquote>
            )}

            {blog.tipContent && (
              <div className="blog-single-tip-box">
                <div className="blog-single-tip-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  {blog.tipTitle || 'TIP'}
                </div>
                <p className="blog-single-tip-content">{blog.tipContent}</p>
              </div>
            )}

            {/* Was this helpful Widget */}
            <div className="feedback-widget">
              <span className="feedback-question">Was this article helpful to you?</span>
              {hasVoted ? (
                <span className="feedback-thanks">✓ Thank you for your feedback!</span>
              ) : (
                <div className="feedback-actions">
                  <button className="feedback-btn" onClick={() => setHasVoted(true)}>YES</button>
                  <button className="feedback-btn" onClick={() => setHasVoted(true)}>NO</button>
                </div>
              )}
            </div>
          </article>
        </div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <section className="related-posts-section">
            <h3 className="related-title">More Related Stories</h3>
            <div className="blogs-grid">
              {relatedBlogs.map((item) => (
                <Link href={`/blogs/${item.slug}`} key={item.id} className="blog-card">
                  <div className="blog-card-image">
                    <Image width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={resolveMediaUrl(item.image) || 'https://placehold.co/600x400/111/fff?text=Blog'} alt={item.title} referrerPolicy="no-referrer" unoptimized={true} />
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-date">{item.date}</span>
                      <span className="blog-dot">•</span>
                      <span className="blog-category">{item.category}</span>
                    </div>
                    <h3 className="blog-card-title">{item.title}</h3>
                    <div className="blog-card-author">
                      <div className="blog-author-avatar">
                        <Image width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={`https://ui-avatars.com/api/?name=${(item.author || 'WK').replace(' ', '+')}&background=random`} alt={item.author} />
                      </div>
                      <span className="blog-author-name">{item.author || 'James Miller'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="blog-cta-container">
              <Link href="/blogs" className="blog-cta-btn">
                <div className="flip-text">
                  <span data-hover="READ ALL BLOGS">READ ALL BLOGS</span>
                </div>
                <div className="arrow-circle">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </Link>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
