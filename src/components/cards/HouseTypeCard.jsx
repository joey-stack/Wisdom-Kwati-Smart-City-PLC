'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Inline SVGs so no icon-library dependency is needed here
const BedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14" />
  </svg>
);

const BathIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2" />
    <path d="M4 14h16M8 8V5a1 1 0 011-1h2" />
  </svg>
);

/**
 * Extracts the gemstone class label from the classType name.
 * e.g. "The Imperial Emerald" → "Emerald Class Villa"
 *      "The Blue Sapphire"    → "Sapphire Class Villa"
 *      "The Jade Terrace"     → "Jade Class Villa"
 */
function getGemstoneClass(name) {
  if (!name) return '';
  // Known gemstone words that appear as the last word in classType
  const gemstones = [
    'Emerald', 'Sapphire', 'Onyx', 'Pearl', 'Opal',
    'Quartz', 'Jade', 'Diamond', 'Ruby', 'Topaz',
    'Amethyst', 'Garnet', 'Aquamarine',
  ];
  const words = name.replace(/^The\s+/i, '').split(/\s+/);
  // Last word is usually the gemstone family
  const last = words[words.length - 1];
  if (gemstones.some(g => g.toLowerCase() === last.toLowerCase())) {
    return `${last} Class Villa`;
  }
  // If suffix is a house type keyword, use the word before it
  const typeWords = ['Terrace', 'SMART', 'Duplex', 'Bungalow', 'Apartment', 'Penthouse'];
  if (typeWords.some(t => t.toLowerCase() === last.toLowerCase()) && words.length >= 2) {
    const gem = words[words.length - 2];
    if (gemstones.some(g => g.toLowerCase() === gem.toLowerCase())) {
      return `${gem} Class Villa`;
    }
  }
  return words.join(' ') + ' Class';
}

/**
 * HouseTypeCard — premium reusable card for house types.
 *
 * Props:
 *   id       – Firestore document ID (used in the href)
 *   name     – classType / display name
 *   tagline  – short description or auto-generated
 *   beds     – number of bedrooms
 *   baths    – number of bathrooms
 *   size     – floor size string (e.g. "4,200 sq ft") or 'N/A'
 *   image    – URL of the first image
 *   estate   – estate / location name (e.g. "Karsana Estate")
 *
 * Used on:
 *   – Homepage "Recent Listings" section (via RecentListingsSection)
 *   – /house-types archive page
 */
export default function HouseTypeCard({ id, name, tagline, beds, baths, size, image, estate }) {
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

  const gemstoneClass = getGemstoneClass(name);

  return (
    <Link
      ref={ref}
      href={`/house-types/${id}`}
      className={`wksc-ht-card wksc-reveal ${isVisible ? 'is-visible' : ''}`}
    >

      {/* ─── Image with Hover Overlay ─── */}
      <div className="wksc-ht-card__image-wrapper">
        <div className="wksc-ht-card__image">
          <img
            loading="lazy"
            src={image}
            alt={name}
            referrerPolicy="no-referrer"
            onError={e => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/800x600/eaeaea/999?text=Smart+Villa';
            }}
          />
          {/* Hover Circle Overlay */}
          <div className="wksc-ht-card__hover-overlay">
            <div className="wksc-ht-view-circle">
              <span>VIEW</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Body: Two Rows ─── */}
      <div className="wksc-ht-card__body">

        {/* Row 1: Name (left) + Gemstone Class (right) */}
        <div className="wksc-ht-card__row">
          <h3 className="wksc-ht-card__name">{name}</h3>
          <span className="wksc-ht-card__class">{gemstoneClass}</span>
        </div>

        {/* Row 2: Tagline (left) + Specs with dots (right) */}
        <div className="wksc-ht-card__row">
          {tagline && <p className="wksc-ht-card__tagline">{tagline}</p>}
          <div className="wksc-ht-card__specs">
            <span className="wksc-ht-card__spec">
              <BedIcon />
              <span>{beds}</span>
            </span>
            <span className="wksc-ht-card__dot">•</span>
            <span className="wksc-ht-card__spec">
              <BathIcon />
              <span>{baths}</span>
            </span>
            {size && size !== 'N/A' && (
              <>
                <span className="wksc-ht-card__dot">•</span>
                <span className="wksc-ht-card__spec wksc-ht-spec--size">
                  {size}
                </span>
              </>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}
