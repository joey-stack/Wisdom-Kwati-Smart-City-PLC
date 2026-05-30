'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/**
 * ProjectCard — premium reusable card for estate projects.
 *
 * Props:
 *   id       – Firestore document ID (used in the href)
 *   name     – project name (displayed capitalised)
 *   location – city / address string shown below name
 *   image    – URL of the hero image
 *
 * Used on:
 *   – Homepage "Neighborhoods" section (via NeighborhoodSection)
 *   – /projects archive page
 */
export default function ProjectCard({ id, name, location, image }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let timer;
    const currentRef = ref.current;
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

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Failsafe backup timeout: force reveal after 250ms in case observer fails to trigger due to smooth scrolling or mounting delays
    timer = setTimeout(() => {
      setIsVisible(true);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    }, 250);

    return () => {
      if (timer) clearTimeout(timer);
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Link
      ref={ref}
      href={`/projects/${id}`}
      className={`wksc-proj-card wksc-reveal ${isVisible ? 'is-visible' : ''}`}
    >

      {/* ─── Image Wrapper ─── */}
      <div className="wksc-proj-card__image-wrapper">
        <div className="wksc-proj-card__image">
          <img
            loading="lazy"
            src={image}
            alt={name}
            width="800"
            height="500"
            referrerPolicy="no-referrer"
            onError={e => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/800x600/eaeaea/999?text=Estate';
            }}
          />
        </div>
      </div>

      {/* ─── Info row ─── */}
      <div className="wksc-proj-card__info">
        <div className="wksc-proj-card__details">
          <h3 className="wksc-proj-card__name">{name}</h3>
          {location && (
            <p className="wksc-proj-card__location">{location}</p>
          )}
        </div>

        {/* Square chevron button */}
        <div className="wksc-proj-card__btn" aria-hidden="true">
          <ChevronIcon />
        </div>
      </div>

    </Link>
  );
}

