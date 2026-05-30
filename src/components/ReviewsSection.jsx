'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import gsap from 'gsap';

const FALLBACK_BG_IMAGE = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL&sz=w1200';

const DEFAULT_REVIEWS = [
  {
    id: 'chief-dr-chidi-okafor',
    name: 'Chief Dr. Chidi Okafor',
    designation: 'HOME OWNER, ABUJA',
    avatar: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU&sz=w1200',
    quote: 'Correcting a continent, one smart home at a time. WKSC is building the infrastructure we\'ve always deserved.',
    body: '',
    bgImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL&sz=w1200'
  },
  {
    id: 'the-adewale-family',
    name: 'The Adewale Family',
    designation: 'EPE SMART CITY, LAGOS',
    avatar: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1O3Z8A1oKWR8Dhd6b-42nbpVkHv4Zpzm0&sz=w1200',
    quote: 'I realized I didn\'t have to leave to arrive.',
    body: 'I used to think my best future lay outside Nigeria, but working with WKSC changed that. Their smart ecosystem in Lagos Epe mirrors the quality I saw in the UK, but with the warmth of home.',
    bgImage: ''
  },
  {
    id: 'engr-tunde-olayinka',
    name: 'Engr. Tunde Olayinka',
    designation: 'PORT HARCOURT',
    avatar: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EphZaDQ0d9sHKHve7TNmmsr_pFGEjzne&sz=w1200',
    quote: 'Finally, a smart ecosystem that actually works. The IoT integration in Port Harcourt is world-class.',
    body: '',
    bgImage: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EphZaDQ0d9sHKHve7TNmmsr_pFGEjzne&sz=w1200'
  },
  {
    id: 'amina-bello',
    name: 'Amina Bello',
    designation: 'HOME OWNER, YOLA',
    avatar: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1xYCnvanRHqSsdCeheY75jtAM5QS3AS0n&sz=w1200',
    quote: 'Bringing the future of healthy living to Yola.',
    body: 'I thought modern living would take decades to reach Yola, but WKSC delivered. From the solar grids to the water treatment plants, every detail ensures my family is safe and ready for the future.',
    bgImage: ''
  }
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const trackRef = useRef(null);
  const marqueeRef = useRef(null);
  
  // Drag states
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentTranslateXRef = useRef(0);
  const baseTranslateXRef = useRef(0);
  const moveDistanceRef = useRef(0);
  const dragThreshold = 5;
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const snap = await getDocs(collection(db, 'reviews'));
        if (snap.empty) {
          setReviews(DEFAULT_REVIEWS);
        } else {
          const list = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          list.sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeA - timeB;
          });
          setReviews(list);
        }
      } catch (err) {
        console.error('Failed to load reviews from Firestore, using defaults:', err);
        setReviews(DEFAULT_REVIEWS);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;

    const track = trackRef.current;
    if (!track) return;

    // Calculate move distance
    const moveDistance = track.scrollWidth / 2;
    moveDistanceRef.current = moveDistance;

    // Initialize GSAP marquee animation
    const marquee = gsap.to(track, {
      x: -moveDistance,
      duration: 45,
      ease: 'none',
      repeat: -1,
      overwrite: 'auto',
      force3D: true
    });

    window.reviewsMarquee = marquee;
    marqueeRef.current = marquee;

    // Pause on hover
    const onMouseEnter = () => {
      if (!isDraggingRef.current) {
        gsap.to(marquee, { timeScale: 0, duration: 0.6, ease: 'power2.out' });
      }
    };

    const onMouseLeave = () => {
      if (!isDraggingRef.current) {
        gsap.to(marquee, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
      }
    };

    const wrapper = track.parentElement;
    if (wrapper) {
      wrapper.addEventListener('mouseenter', onMouseEnter);
      wrapper.addEventListener('mouseleave', onMouseLeave);
    }

    // Pointer events for dragging/swiping
    const onPointerDown = (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      startXRef.current = e.clientX;

      // Pause marquee immediately
      marquee.pause();

      // Get current transform
      const transform = window.getComputedStyle(track).transform;
      let currentX = 0;
      if (transform && transform !== 'none') {
        const matrix = new DOMMatrix(transform);
        currentX = matrix.m41;
      }

      baseTranslateXRef.current = currentX;
      currentTranslateXRef.current = currentX;
      track.style.cursor = 'grabbing';
      track.style.transition = 'none';

      track.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;

      const dx = e.clientX - startXRef.current;
      if (Math.abs(dx) > dragThreshold) {
        hasDraggedRef.current = true;
      }

      let newX = baseTranslateXRef.current + dx;
      const dist = moveDistanceRef.current;

      if (dist > 0) {
        while (newX < -dist) {
          newX += dist;
        }
        while (newX > 0) {
          newX -= dist;
        }
      }

      currentTranslateXRef.current = newX;
      gsap.set(track, { x: newX });
    };

    const onPointerUp = (e) => {
      if (!isDraggingRef.current) return;

      isDraggingRef.current = false;
      track.style.cursor = '';

      try {
        track.releasePointerCapture(e.pointerId);
      } catch (err) {}

      const dist = moveDistanceRef.current;
      if (dist > 0) {
        const progress = -currentTranslateXRef.current / dist;
        marquee.progress(progress);
      }

      // Resume sliding
      marquee.play();
      gsap.to(marquee, { timeScale: 1, duration: 0.6, ease: 'power2.out' });
    };

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', onPointerUp);
    track.addEventListener('pointercancel', onPointerUp);

    // Dynamic resize handler
    const handleResize = () => {
      marquee.kill();
      gsap.set(track, { x: 0 });
      const newDistance = track.scrollWidth / 2;
      moveDistanceRef.current = newDistance;

      const newMarquee = gsap.to(track, {
        x: -newDistance,
        duration: 45,
        ease: 'none',
        repeat: -1,
        overwrite: 'auto',
        force3D: true
      });
      window.reviewsMarquee = newMarquee;
      marqueeRef.current = newMarquee;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      marquee.kill();
      if (window.reviewsMarquee === marquee) {
        window.reviewsMarquee = null;
      }
      if (wrapper) {
        wrapper.removeEventListener('mouseenter', onMouseEnter);
        wrapper.removeEventListener('mouseleave', onMouseLeave);
      }
      track.removeEventListener('pointerdown', onPointerDown);
      track.removeEventListener('pointermove', onPointerMove);
      track.removeEventListener('pointerup', onPointerUp);
      track.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [reviews]);

  if (!mounted || loading) {
    return (
      <section id="reviews" className="reviews-section" style={{ minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-skeleton-spinner"></div>
      </section>
    );
  }

  // Duplicate items array to create infinite scroll carousel
  const renderList = [...reviews, ...reviews];

  return (
    <section id="reviews" className="reviews-section" style={{ touchAction: 'pan-y' }}>
      <div className="reviews-container">
        <div className="section-line"></div>
        
        <div className="reviews-header sidebar-layout">
          <div className="reviews-label">
            <div className="label-square"></div>
            REVIEWS
          </div>
          <h2 className="reviews-headline">
            Stories from people who found their place with us
          </h2>
        </div>

        <div className="carousel-wrapper" style={{ touchAction: 'pan-y' }}>
          <div 
            ref={trackRef} 
            className="carousel-track" 
            style={{ 
              touchAction: 'pan-y', 
              userSelect: 'none', 
              WebkitUserSelect: 'none'
            }}
          >
            {renderList.map((review, index) => {
              const isImageCard = index % 2 === 0;
              const bg = review.bgImage || FALLBACK_BG_IMAGE;

              if (isImageCard) {
                return (
                  <div key={`${review.id}-${index}`} className="review-card image-card">
                    <img 
                      src={bg} 
                      alt={`${review.name} Review`} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="card-overlay">
                      <blockquote className="card-quote">"{review.quote}"</blockquote>
                      <div className="reviewer-identity-container">
                        <div className="reviewer-meta-group">
                          <span className="card-name">{review.name}</span>
                          <span className="card-meta">{review.designation}</span>
                        </div>
                        <div className="reviewer-avatar">
                          <img 
                            src={review.avatar} 
                            alt={review.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            referrerPolicy="no-referrer"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={`${review.id}-${index}`} className="review-card text-card">
                    <blockquote className="card-quote-main">"{review.quote}"</blockquote>
                    <p className="card-body">"{review.body || review.quote}"</p>
                    <div className="reviewer-identity-container">
                      <div className="reviewer-meta-group">
                        <span className="card-name">{review.name}</span>
                        <span className="card-meta">{review.designation}</span>
                      </div>
                      <div className="reviewer-avatar">
                        <img 
                          src={review.avatar} 
                          alt={review.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
