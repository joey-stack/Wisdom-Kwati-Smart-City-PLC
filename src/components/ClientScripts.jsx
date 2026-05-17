'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function ClientScripts() {
    const pathname = usePathname();

    useEffect(() => {
        initScripts();
    }, [pathname]);

    function initScripts() {
        if (typeof window === 'undefined') return;

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        const menuToggle = document.querySelector('.menu-toggle');
        const menuClose = document.querySelector('.menu-close');
        const mobileMenu = document.querySelector('.mobile-menu-overlay');
        const body = document.body;

        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', () => {
                body.classList.add('menu-active');
                body.classList.add('no-scroll');
                if (lenis) lenis.stop();
            });
        }

        if (menuClose) {
            menuClose.addEventListener('click', () => {
                body.classList.remove('menu-active');
                body.classList.remove('no-scroll');
                if (lenis) lenis.start();
            });
        }

        // Close menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-links > li > a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const parent = link.closest('.nav-item');
                if (parent && parent.querySelector('.mobile-accordion-content')) {
                    // It's an accordion toggle, don't close menu
                } else {
                    body.classList.remove('menu-active');
                }
            });
        });

        const compactCards = document.querySelectorAll('.mobile-compact-card');
        compactCards.forEach(card => {
            card.addEventListener('click', () => {
                body.classList.remove('menu-active');
            });
        });

        // Custom Card Cursor Tracking Logic
        const cardCursor = document.getElementById('card-cursor');
        const hoverableCards = document.querySelectorAll('.property-card, .neighborhood-card, .blog-card, .ht-card');

        if (cardCursor) {
            let mouseX = 0;
            let mouseY = 0;
            let cursorX = 0;
            let cursorY = 0;

            const onMouseMove = (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            };
            document.addEventListener('mousemove', onMouseMove);

            let reqId;
            const animateCursor = () => {
                cursorX += (mouseX - cursorX) * 0.22;
                cursorY += (mouseY - cursorY) * 0.22;

                cardCursor.style.left = `${cursorX}px`;
                cardCursor.style.top = `${cursorY}px`;

                reqId = requestAnimationFrame(animateCursor);
            };

            animateCursor();

            hoverableCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    cardCursor.classList.add('active');
                });

                card.addEventListener('mouseleave', () => {
                    cardCursor.classList.remove('active');
                });
            });
        }

        gsap.registerPlugin(ScrollTrigger);
        gsap.ticker.lagSmoothing(0);

            // Timeline Fill Animation
            const timelineSpine = document.querySelector('.timeline-spine');
            const processItems = document.querySelectorAll('.process-item');
            
            if (document.querySelector('.timeline-fill') && document.querySelector('.timeline-container')) {
                if (timelineSpine && processItems.length > 0) {
                    const updateHomeSpineHeight = () => {
                        const firstItem = processItems[0];
                        const lastItem = processItems[processItems.length - 1];
                        const firstMarker = firstItem.querySelector('.process-marker');
                        const lastMarker = lastItem.querySelector('.process-marker');
                        
                        if (firstMarker && lastMarker) {
                            // marker is translate(-28px), so visual center is offsetTop - 28 + (56/2) = offsetTop
                            const startY = firstItem.offsetTop + firstMarker.offsetTop;
                            const endY = lastItem.offsetTop + lastMarker.offsetTop;
                            const calculatedHeight = endY - startY;

                            timelineSpine.style.top = `${startY}px`;
                            timelineSpine.style.height = `${calculatedHeight}px`;
                        }
                    };
                    
                    updateHomeSpineHeight();
                    
                    // Use ResizeObserver to catch font loads and layout shifts
                    const resizeObserver = new ResizeObserver(() => {
                        updateHomeSpineHeight();
                    });
                    resizeObserver.observe(document.querySelector('.timeline-container'));
                    window.addEventListener('resize', updateHomeSpineHeight);
                }

                gsap.to('.timeline-fill', {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.timeline-container',
                        start: 'top 80%',
                        end: 'bottom 80%',
                        scrub: true
                    }
                });
            }

            // GSAP SEAMLESS REVIEWS MARQUEE
            const track = document.querySelector('.carousel-track');
            if (track) {
                const setupMarquee = () => {
                    const originalCards = Array.from(track.children);
                    // Prevent infinite cloning on route changes
                    if (!track.hasAttribute('data-cloned')) {
                        originalCards.forEach(card => {
                            const clone = card.cloneNode(true);
                            track.appendChild(clone);
                        });
                        track.setAttribute('data-cloned', 'true');
                    }

                    const moveDistance = track.scrollWidth / 2;

                    const marquee = gsap.to(track, {
                        x: -moveDistance,
                        duration: 45,
                        ease: "none",
                        repeat: -1,
                        overwrite: "auto",
                        force3D: true
                    });

                    const wrapper = document.querySelector('.carousel-wrapper');
                    if (wrapper) {
                        wrapper.addEventListener('mouseenter', () => {
                            gsap.to(marquee, { timeScale: 0, duration: 0.6, ease: "power2.out" });
                        });

                        wrapper.addEventListener('mouseleave', () => {
                            gsap.to(marquee, { timeScale: 1, duration: 0.6, ease: "power2.out" });
                        });
                    }

                    const lockScroll = () => {
                        gsap.to(marquee, { timeScale: 0, duration: 0.4, ease: "power1.out" });
                        if (lenis) lenis.stop();
                        body.classList.add('no-scroll');
                    };

                    const unlockScroll = () => {
                        gsap.to(marquee, { timeScale: 1, duration: 0.4, ease: "power1.out" });
                        if (lenis) lenis.start();
                        body.classList.remove('no-scroll');
                    };

                    const navItems = document.querySelectorAll('.nav-item.has-dropdown');
                    const megaWrappers = document.querySelectorAll('.mega-menu-wrapper');

                    navItems.forEach(item => {
                        item.addEventListener('mouseenter', lockScroll);
                        item.addEventListener('mouseleave', unlockScroll);
                    });

                    megaWrappers.forEach(menu => {
                        menu.addEventListener('mouseenter', lockScroll);
                        menu.addEventListener('mouseleave', unlockScroll);
                    });

                    window.addEventListener('resize', () => {
                        marquee.kill();
                        gsap.set(track, { x: 0 });
                        const newDistance = track.scrollWidth / 2;
                        gsap.to(track, {
                            x: -newDistance,
                            duration: 45,
                            ease: "none",
                            repeat: -1
                        });
                    });
                };
                setupMarquee();
            }

            // FAQ Accordion
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const trigger = item.querySelector('.faq-trigger');
                if (!trigger) return;
                trigger.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            });

            // --- RELIST STYLE TEXT REVEAL ---
            const splitReveal = (selector, type = 'chars', timeline = null) => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    const content = el.innerHTML;
                    gsap.set(el, { autoAlpha: 0 });
                    
                    if (type === 'chars') {
                        const text = el.innerText;
                        el.innerHTML = '';
                        const chars = text.split('').map(char => {
                            if (char === ' ') return '&nbsp;';
                            return `<span class="reveal-char" style="display:inline-block; transform:translateY(105%); opacity:0;">${char}</span>`;
                        }).join('');
                        el.innerHTML = chars;
                        
                        const anim = {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            stagger: 0.012,
                            ease: 'power4.out',
                            force3D: true,
                            onStart: () => gsap.set(el, { autoAlpha: 1 })
                        };

                        if (timeline) timeline.to(el.querySelectorAll('.reveal-char'), anim, 0);
                        else gsap.to(el.querySelectorAll('.reveal-char'), { ...anim, delay: 0.1 });

                    } else if (type === 'lines') {
                        const lines = content.split(/<br\s*\/?>/i);
                        el.innerHTML = '';
                        lines.forEach((line, index) => {
                            const wrapper = document.createElement('div');
                            wrapper.className = 'reveal-line-wrapper';
                            wrapper.style.overflow = 'hidden';
                            wrapper.style.verticalAlign = 'top';
                            wrapper.style.zIndex = lines.length - index;
                            wrapper.style.position = 'relative';
                            
                            const inner = document.createElement('div');
                            inner.className = 'reveal-line';
                            inner.style.transform = 'translateY(100%)';
                            inner.style.opacity = '0';
                            inner.style.filter = 'blur(10px)';
                            inner.innerHTML = line.trim();
                            
                            wrapper.appendChild(inner);
                            el.appendChild(wrapper);
                        });
                        
                        const anim = {
                            y: 0,
                            opacity: 1,
                            filter: 'blur(0px)',
                            duration: 1.0,
                            stagger: 0.08,
                            ease: 'power4.out',
                            force3D: true,
                            onStart: () => gsap.set(el, { autoAlpha: 1 })
                        };

                        if (timeline) timeline.to(el.querySelectorAll('.reveal-line'), anim, 0.05);
                        else gsap.to(el.querySelectorAll('.reveal-line'), { ...anim, delay: 0.15 });
                    }
                });
            };

            // --- UNIFIED HERO TIMELINE ---
            const heroTl = gsap.timeline({ delay: 0.05 });
            
            // 1. Text Reveals (Added to timeline)
            splitReveal('.hero .headline, .pd-hero-title', 'lines', heroTl);
            splitReveal('.hero .subheadline, .pd-hero-description', 'lines', heroTl);
            splitReveal('.reveal-type-lines', 'lines', heroTl);

            // 2. Hero Card & Other Elements
            const heroSelectors = [
                { el: document.querySelector('.hero .hero-card') },
                { el: document.querySelector('.about-page .hero-title') },
                { el: document.querySelector('.house-types-page .ht-headline') },
                { el: document.querySelector('.projects-page .pj-hero-title') }
            ];

            heroSelectors.forEach(({ el }) => {
                if (el) {
                    heroTl.fromTo(el, 
                        { y: 30, opacity: 0, filter: 'blur(12px)', clipPath: 'inset(0% 0% 100% 0%)', autoAlpha: 0 },
                        { 
                            y: 0, opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, 
                            duration: 1.2, ease: 'power4.out', force3D: true 
                        }, 
                        0.2 // Slight delay within timeline
                    );
                }
            });

            // --- HERO SCROLL BLUR CLEAR & PARALLAX ---
            const heroSections = document.querySelectorAll('.hero, .pd-hero');
            heroSections.forEach(section => {
                const overlay = section.querySelector('.grid-overlay, .pd-hero-overlay');
                const wrapper = section.querySelector('.hero-video-wrapper, .bg-video-wrapper');
                
                if (overlay) {
                    gsap.fromTo(overlay, 
                        { backdropFilter: 'blur(0px)', backgroundColor: 'rgba(0,0,0,0)', opacity: 0 },
                        {
                            backdropFilter: 'blur(30px)',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            opacity: 1,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top top',
                                end: 'bottom top',
                                scrub: 1,
                                invalidateOnRefresh: true
                            }
                        }
                    );
                }
                
                if (wrapper) {
                    gsap.fromTo(wrapper,
                        { scale: 1, y: '0%' },
                        {
                            scale: 1.2,
                            y: '20%',
                            ease: 'none',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top top',
                                end: 'bottom top',
                                scrub: 1,
                                invalidateOnRefresh: true
                            }
                        }
                    );
                }
            });

            // Multi-Page Reveal - Architectural Staggered Reveal
            const gridSelectors = [
                '.action-grid', '.ht-grid', '.locations-grid', '.neighborhood-grid', 
                '.team-grid', '.career-grid', '.values-grid', '.recognition-list',
                '.portfolio-grid', '.services-grid-body', '.uniqueness-grid', '.reviews-grid',
                '.projects-grid', '.who-container', '.mission-grid', '.background-grid', '.stats-subgrid'
            ];

            gridSelectors.forEach(selector => {
                const grid = document.querySelector(selector);
                if (grid) {
                    const items = grid.querySelectorAll('.reveal-on-scroll');
                    if (items.length > 0) {
                        ScrollTrigger.batch(items, {
                            onEnter: batch => gsap.fromTo(batch, 
                                { y: 40, opacity: 0, filter: 'blur(12px)', autoAlpha: 0 },
                                {
                                    y: 0, opacity: 1, filter: 'blur(0px)', autoAlpha: 1,
                                    duration: 1.2, stagger: 0.1, ease: 'power4.out', overwrite: true, clearProps: "filter"
                                }
                            ),
                            start: 'top 95%',
                            once: true
                        });
                    }
                }
            });

            const standaloneRevels = document.querySelectorAll('.reveal-on-scroll');
            standaloneRevels.forEach(el => {
                const isInsideGrid = gridSelectors.some(sel => el.closest(sel));
                if (!isInsideGrid) {
                    gsap.fromTo(el, 
                        { y: 30, opacity: 0, filter: 'blur(15px)', autoAlpha: 0 },
                        {
                            y: 0, opacity: 1, filter: 'blur(0px)', autoAlpha: 1,
                            duration: 1.2, ease: 'power4.out',
                            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
                            force3D: true,
                            clearProps: "filter"
                        }
                    );
                }
            });

            // Premium Stats Count-up
            const statCards = document.querySelectorAll('.stat-card');
            statCards.forEach(card => {
                const inner = card.querySelector('.stat-reveal-inner');
                const counter = card.querySelector('.count-up');
                if (!inner || !counter) return;

                const target = parseInt(counter.getAttribute('data-target'));
                const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' } });
                
                tl.to(inner, { y: 0, duration: 1.2, ease: 'power4.out' });
                tl.to(counter, {
                    innerText: target, duration: 2.2, snap: { innerText: 1 }, ease: 'power2.out',
                    onUpdate: function() { counter.innerHTML = Math.ceil(this.targets()[0].innerText); }
                }, "-=0.8");
            });

            // History Timeline Logic
            const historySpine = document.querySelector('.history-spine');
            const historySpineFill = document.querySelector('.history-spine-fill');
            const historyItems = document.querySelectorAll('.history-item');
            
            if (historySpine && historySpineFill && historyItems.length > 0) {
                const updateSpineHeight = () => {
                    const firstItem = historyItems[0];
                    const lastItem = historyItems[historyItems.length - 1];
                    const firstIndicator = firstItem.querySelector('.history-indicator');
                    const lastIndicator = lastItem.querySelector('.history-indicator');
                    
                    if (firstIndicator && lastIndicator) {
                        const startY = firstItem.offsetTop + firstIndicator.offsetTop; 
                        const endY = lastItem.offsetTop + lastIndicator.offsetTop; // Spine ends exactly at visual center
                        const calculatedHeight = endY - startY;

                        historySpine.style.top = `${startY}px`;
                        historySpine.style.height = `${calculatedHeight}px`;
                    }
                };

                updateSpineHeight();
                
                // Use ResizeObserver to catch font loads and layout shifts
                const historyResizeObserver = new ResizeObserver(() => {
                    updateSpineHeight();
                });
                historyResizeObserver.observe(historySpine.parentElement); // Observe the container
                window.addEventListener('resize', updateSpineHeight);

                gsap.to(historySpineFill, {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: historySpine, start: 'top 45%', end: 'bottom 45%', scrub: true
                    }
                });

                historyItems.forEach(item => {
                    const indicator = item.querySelector('.history-indicator');
                    const card = item.querySelector('.history-process-card');
                    const itemTl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' } });

                    itemTl.from(indicator, { scale: 0, opacity: 0, duration: 0.6, ease: 'back.out(2)' });
                    ScrollTrigger.create({
                        trigger: indicator, start: "center 45%",
                        onEnter: () => indicator.classList.add('active'),
                        onLeaveBack: () => indicator.classList.remove('active'),
                    });
                    itemTl.from(card, { x: 15, opacity: 0, filter: 'blur(8px)', clipPath: 'inset(0% 100% 0% 0%)', duration: 1.2, ease: 'expo.out' }, "-=0.4");
                });
            }
        
        // Modal Logic
        const siteVisitModal = document.getElementById('siteVisitModal');
        if (siteVisitModal) {
            const modalCloseBtn = siteVisitModal.querySelector('.site-visit-modal-close');
            const visitButtons = document.querySelectorAll('.nav-cta, .mobile-cta, .cta-button, .btn-pill, .action-link');
            
            const openSiteVisitModal = (e) => {
                const text = e.currentTarget.textContent.toLowerCase();
                if (text.includes('request a site visit') || text.includes('site visit')) {
                    e.preventDefault();
                    siteVisitModal.classList.add('active');
                    if (lenis) lenis.stop();
                    document.body.classList.add('no-scroll');
                }
            };

            const closeSiteVisitModal = () => {
                siteVisitModal.classList.remove('active');
                if (lenis && !document.body.classList.contains('menu-active')) {
                    lenis.start();
                }
                if (!document.body.classList.contains('no-scroll-permanent')) {
                    document.body.classList.remove('no-scroll');
                }
            };

            visitButtons.forEach(btn => btn.addEventListener('click', openSiteVisitModal));
            if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeSiteVisitModal);
            
            siteVisitModal.addEventListener('click', (e) => {
                if (e.target === siteVisitModal) closeSiteVisitModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && siteVisitModal.classList.contains('active')) closeSiteVisitModal();
            });
        }

        // --- LIGHTBOX LOGIC ---
        const lightbox = document.getElementById('gallery-lightbox');
        const viewAllBtn = document.getElementById('view-all-images-btn');
        const galleryItems = document.querySelectorAll('.hd-gallery-item img');

        if (lightbox) {
            const lbImg = document.getElementById('lb-img');
            const lbCurrent = document.getElementById('lb-current');
            const lbTotal = document.getElementById('lb-total');
            const lbPrev = document.getElementById('lb-prev');
            const lbNext = document.getElementById('lb-next');
            const lbThumbs = document.getElementById('lb-thumbs');
            const lbClose = lightbox.querySelector('.hd-lightbox-close');
            const lbSrcsDiv = document.getElementById('lb-srcs');
            
            let currentIndex = 0;
            let imageSources = [];

            if (lbSrcsDiv) {
                imageSources = Array.from(lbSrcsDiv.querySelectorAll('span')).map(s => s.innerText);
            }

            if (lbTotal) lbTotal.innerText = imageSources.length;

            const updateLightbox = (index) => {
                currentIndex = index;
                if (lbImg) {
                    // Start fade out/scale down (The "Blast" reset)
                    lbImg.style.opacity = '0';
                    lbImg.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        lbImg.src = imageSources[currentIndex];
                        lbImg.onload = () => {
                            lbImg.style.opacity = '1';
                            lbImg.style.transform = 'scale(1)';
                        };
                        if (lbImg.complete) {
                            lbImg.style.opacity = '1';
                            lbImg.style.transform = 'scale(1)';
                        }
                    }, 200);
                }
                if (lbCurrent) lbCurrent.innerText = currentIndex + 1;
                
                // Update active thumb
                if (lbThumbs) {
                    const thumbs = lbThumbs.querySelectorAll('img');
                    thumbs.forEach((t, i) => {
                        if (i === currentIndex) t.classList.add('active');
                        else t.classList.remove('active');
                    });
                }
            };

            const openLightbox = (index = 0) => {
                lightbox.classList.add('active');
                lightbox.setAttribute('aria-hidden', 'false');
                document.body.classList.add('no-scroll');
                if (lenis) lenis.stop();
                updateLightbox(index);
            };

            const closeLightbox = () => {
                lightbox.classList.remove('active');
                lightbox.setAttribute('aria-hidden', 'true');
                if (!document.body.classList.contains('menu-active')) {
                    document.body.classList.remove('no-scroll');
                }
                if (lenis) lenis.start();
            };

            if (viewAllBtn) {
                viewAllBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    openLightbox(0);
                });
            }

            galleryItems.forEach((img, idx) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', () => {
                    openLightbox(idx);
                });
            });

            if (lbPrev) {
                lbPrev.addEventListener('click', () => {
                    let nextIdx = currentIndex - 1;
                    if (nextIdx < 0) nextIdx = imageSources.length - 1;
                    updateLightbox(nextIdx);
                });
            }

            if (lbNext) {
                lbNext.addEventListener('click', () => {
                    let nextIdx = currentIndex + 1;
                    if (nextIdx >= imageSources.length) nextIdx = 0;
                    updateLightbox(nextIdx);
                });
            }

            if (lbClose) lbClose.addEventListener('click', closeLightbox);
            
            lightbox.addEventListener('click', (e) => {
                if (e.target.classList.contains('hd-lightbox-backdrop') || e.target === lightbox) {
                    closeLightbox();
                }
            });

            if (lbThumbs) {
                lbThumbs.querySelectorAll('img').forEach((thumb, idx) => {
                    thumb.addEventListener('click', () => updateLightbox(idx));
                });
            }

            document.addEventListener('keydown', (e) => {
                if (!lightbox.classList.contains('active')) return;
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
                if (e.key === 'ArrowRight' && lbNext) lbNext.click();
            });
        }
    }

    return null;
}
