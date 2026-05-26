'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const getSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

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

    // Failsafe backup timeout: force reveal after 250ms in case observer fails to trigger due to smooth scrolling or mounting delays
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

  const slug = blog.slug || getSlug(blog.title);

  return (
    <Link
      ref={ref}
      href={`/blogs/${slug}`}
      className={`blog-card wksc-reveal ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="blog-card-image">
        <img
          loading="lazy"
          src={blog.image || 'https://placehold.co/600x400/111/fff?text=Blog'}
          alt={blog.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/600x400/111/fff?text=Blog';
          }}
        />
      </div>
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-date">{blog.date}</span>
          <span className="blog-dot">•</span>
          <span className="blog-category">{blog.category}</span>
        </div>
        <h3 className="blog-card-title">{blog.title}</h3>
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

export default function RecentBlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    async function loadRecentBlogs() {
      try {
        const snap = await getDocs(collection(db, 'blogs'));
        const list = [];
        snap.forEach((doc) => {
          const data = doc.data();
          if (data.published === false) return; // skip unpublished blogs
          list.push({
            id: doc.id,
            ...data
          });
        });

        // Sort descending (newest first) based on createdAt or date
        list.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));

        // Take the 4 most recent blogs
        setBlogs(list.slice(0, 4));
      } catch (err) {
        console.error('Error fetching recent blogs:', err);
      } finally {
        setLoading(false);
      }
    }

    loadRecentBlogs();
  }, []);

  if (!mounted || loading) {
    return (
      <div className="blogs-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="blog-card" style={{ pointerEvents: 'none' }}>
            <div className="blog-card-image wksc-skeleton" style={{ height: '200px', background: 'var(--bg-surface)' }} />
            <div className="blog-card-content" style={{ gap: '10px' }}>
              <div style={{ height: '12px', width: '40%', background: 'var(--bg-surface)', borderRadius: '4px' }} className="wksc-skeleton" />
              <div style={{ height: '20px', width: '90%', background: 'var(--bg-surface)', borderRadius: '4px' }} className="wksc-skeleton" />
              <div style={{ height: '20px', width: '70%', background: 'var(--bg-surface)', borderRadius: '4px' }} className="wksc-skeleton" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <div className="blogs-grid">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
