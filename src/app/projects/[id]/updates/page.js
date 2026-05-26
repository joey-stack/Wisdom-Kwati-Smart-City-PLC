'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ProjectUpdatesPage({ params }) {
  const { id } = use(params);
  
  const [project, setProject] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const projectRef = doc(db, 'projects', id);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
          setProject({ id: projectSnap.id, ...projectSnap.data() });
        }

        const updatesQuery = query(
          collection(db, 'siteUpdates'),
          where('projectId', '==', id)
        );
        const updatesSnap = await getDocs(updatesQuery);
        const list = updatesSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        list.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
        setUpdates(list);
      } catch (err) {
        console.error('Failed to load project updates data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-US', options);
    } catch {
      return dateStr;
    }
  };

  const isVideo = (url) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    // Match common video extensions in the firebase storage url
    return lower.includes('.mp4') || lower.includes('.webm') || lower.includes('.mov');
  };

  const resolveMediaUrl = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com/file/d/') || url.includes('drive.google.com/open?id=')) {
      let fileId = '';
      const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        fileId = match[1];
      } else {
        try {
          const urlObj = new URL(url);
          fileId = urlObj.searchParams.get('id');
        } catch (e) {}
      }
      if (fileId) {
        return `https://images.weserv.nl/?url=${encodeURIComponent(`https://drive.google.com/uc?export=view&id=${fileId}`)}&w=1600&output=webp&q=85`;
      }
    }
    return url;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#F8FAF5', color: '#000', fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div className="label-square" style={{ width: '40px', height: '40px', margin: '0 auto 20px', backgroundColor: '#BEDE2D', borderRadius: '4px' }}></div>
          <h2 style={{ fontSize: '14px', fontWeight: '700', letterSpacing: '0.1em' }}>LOADING UPDATES...</h2>
        </div>
      </div>
    );
  }

  const projectName = project ? project.name : 'Estate';
  const latestSubHeadline = updates.length > 0 && updates[0].subHeadline ? updates[0].subHeadline : 'Latest infrastructural development progress logs and recorded archives.';

  return (
    <main style={{ backgroundColor: '#F8FAF5', minHeight: '100vh', padding: '60px 0', fontFamily: "'Outfit', sans-serif" }}>
      <div className="container-1380" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        
        {/* Dynamic Top Header */}
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EBEEDB', borderRadius: '100px', padding: '8px 24px', marginBottom: '24px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', color: '#000', textTransform: 'uppercase' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#BEDE2D', marginRight: '8px' }}></div>
          PROGRESS GALLERY
        </div>

        <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: '500', color: '#1A1A1A', margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
          {projectName} Updates
        </h1>

        <p style={{ fontSize: '16px', color: '#4A4A4A', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>
          {latestSubHeadline}
        </p>

        <Link href={`/projects/${id}`} style={{
          display: 'inline-flex',
          backgroundColor: '#BEDE2D',
          color: '#000',
          textDecoration: 'none',
          padding: '16px 32px',
          borderRadius: '4px',
          fontWeight: '600',
          fontSize: '14px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          transition: 'all 0.3s ease'
        }}>
          VIEW ESTATE DETAILS
        </Link>
      </div>

      <div style={{ width: '100%', height: '1px', backgroundColor: '#E5E7E0', margin: '60px 0' }}></div>

      <div className="container-1380" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {updates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#666' }}>
            <p>No site updates have been posted yet.</p>
          </div>
        ) : (
          updates.map((update, idx) => {
            const images = update.images && update.images.length > 0 ? update.images : (update.image ? [update.image] : []);
            if (images.length === 0 && !update.videoUrl) return null;

            return (
              <div key={update.id} style={{ marginBottom: '80px' }}>
                {/* Section Header (H4 and Description) */}
                <div style={{ marginBottom: '32px' }}>
                  <h4 style={{ fontSize: '24px', fontWeight: '600', color: '#1A1A1A', margin: '0 0 12px 0', letterSpacing: '-0.01em' }}>
                    {update.title}
                  </h4>
                  <p style={{ fontSize: '15px', color: '#4A4A4A', margin: '0 0 8px 0', lineHeight: '1.6', maxWidth: '800px' }}>
                    {update.description}
                  </p>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    As of {formatDate(update.date)}
                  </span>
                </div>

                {/* Gallery Grid/Masonry */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gridAutoRows: '280px',
                  gap: '16px'
                }}>
                  {images.map((url, imgIdx) => {
                    const resolvedUrl = resolveMediaUrl(url);
                    return (
                      <div key={imgIdx} style={{
                        borderRadius: '5px',
                        overflow: 'hidden',
                        backgroundColor: '#EBEEDB',
                        position: 'relative',
                        gridRowEnd: imgIdx % 5 === 0 ? 'span 2' : 'span 1'
                      }}>
                        {isVideo(url) ? (
                          <video
                            src={resolvedUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <img
                            src={resolvedUrl}
                            alt={`${update.title} - ${imgIdx + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            loading="lazy"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
