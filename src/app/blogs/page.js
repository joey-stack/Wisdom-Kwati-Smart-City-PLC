'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import '../../styles/blogs.css';

function BlogCard({ blog }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let timer;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
          if (timer) clearTimeout(timer);
        }
      },
      { threshold: 0.01, rootMargin: '50px 0px 50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Failsafe backup timeout: force reveal after 250ms
    timer = setTimeout(() => {
      setIsVisible(true);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    }, 250);

    return () => {
      if (timer) clearTimeout(timer);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Link
      ref={ref}
      href={`/blogs/${blog.slug}`}
      className={`blog-card wksc-reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="blog-card-image">
        <img loading="lazy" src={blog.image || 'https://placehold.co/600x400/111/fff?text=Blog'} alt={blog.title} referrerPolicy="no-referrer" />
      </div>
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-date">{blog.date}</span>
          <span className="blog-dot">•</span>
          <span className="blog-category">{blog.category}</span>
        </div>
        <h3 className="blog-card-title">{blog.title}</h3>
        {blog.excerpt && (
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '8px 0 16px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {blog.excerpt}
          </p>
        )}
        <div className="blog-card-author">
          <div className="blog-author-avatar">
            <img src={`https://ui-avatars.com/api/?name=${(blog.author || 'WK').replace(' ', '+')}&background=random`} alt={blog.author} />
          </div>
          <span className="blog-author-name">{blog.author || 'James Miller'}</span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const blogsSnap = await getDocs(collection(db, 'blogs'));
        let loadedBlogs = blogsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort by createdAt or date
        loadedBlogs.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        setBlogs(loadedBlogs);
      } catch (err) {
        console.error('Failed to load blogs from Firestore:', err);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setHeaderVisible(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const filteredBlogs = blogs.filter(blog => {
    if (blog.published === false) return false;
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'FEATURED') return !!blog.featured;
    return blog.category?.toUpperCase() === activeCategory.toUpperCase();
  });

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: 'var(--bg-main)', color: 'var(--text-primary)', fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div className="label-square" style={{ width: '40px', height: '40px', margin: '0 auto 20px', backgroundColor: 'var(--accent-green)', borderRadius: '4px' }}></div>
          <h2 style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.1em' }}>LOADING BLOGS & INSIGHTS...</h2>
        </div>
      </div>
    );
  }

  return (
    <main className="blogs-page">
      {/* Custom Card Cursor */}
      <div id="card-cursor" className="card-cursor">
          <span>READ</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>

      <div className="container-1380">
        <header className={`blogs-header wksc-reveal ${headerVisible ? 'is-visible' : ''}`}>
          <div className="blogs-label">
            <div className="label-square"></div>
            <span>BLOGS & INSIGHTS</span>
            <div className="label-square"></div>
          </div>
          <h1 className="blogs-headline">
            Everything you ever wanted to know about buying, selling, and living better
          </h1>
          
          <div className="blogs-filters">
            <button 
              className={`filter-pill ${activeCategory === 'ALL' ? 'active' : ''}`}
              onClick={() => setActiveCategory('ALL')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
              ALL
            </button>
            <button 
              className={`filter-pill ${activeCategory === 'FEATURED' ? 'active' : ''}`}
              onClick={() => setActiveCategory('FEATURED')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              FEATURED
            </button>
            <button 
              className={`filter-pill ${activeCategory === 'GUIDE' ? 'active' : ''}`}
              onClick={() => setActiveCategory('GUIDE')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              GUIDE
            </button>
            <button 
              className={`filter-pill ${activeCategory === 'LIFESTYLE' ? 'active' : ''}`}
              onClick={() => setActiveCategory('LIFESTYLE')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              LIFESTYLE
            </button>
            <button 
              className={`filter-pill ${activeCategory === 'NEWS' ? 'active' : ''}`}
              onClick={() => setActiveCategory('NEWS')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              NEWS
            </button>
          </div>
        </header>

        <div className="blogs-grid">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </main>
  );
}
