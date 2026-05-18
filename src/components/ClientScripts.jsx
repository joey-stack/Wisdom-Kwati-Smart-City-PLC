'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function ClientScripts() {
    const pathname = usePathname();

    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (pathname && pathname.startsWith('/admin')) return;

        // --- 1. TEARDOWN EXISTING SCRIPT LIFECYCLES (PREVENTS ACCUMULATING DUPLICATES) ---
        ScrollTrigger.getAll().forEach(t => t.kill());
        gsap.killTweensOf('*');

        const listeners = [];
        const resizeObservers = [];
        let cursorAnimFrameId = null;

        const addTrackedListener = (target, type, handler, options = {}) => {
            if (target) {
                target.addEventListener(type, handler, options);
                listeners.push({ target, type, handler, options });
            }
        };

        // --- 2. MOBILE TOUCH BEYPASS FOR LENIS (BEST PRACTICE) ---
        // Disable Lenis on mobile/tablet viewports to utilize native hardware-accelerated inertia scrolling
        const isMobile = window.matchMedia('(max-width: 1024px)').matches || ('ontouchstart' in window);
        let lenis = null;

        if (!isMobile) {
            lenis = new Lenis({
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
            
            const tickerCallback = (time) => {
                lenis.raf(time * 1000);
            };
            gsap.ticker.add(tickerCallback);
            gsap.ticker.lagSmoothing(0);
            
            listeners.push({ 
                type: 'gsapTicker',
                handler: tickerCallback 
            });
        } else {
            gsap.ticker.lagSmoothing(0);
        }

        // --- 3. RESPONSIVE MOBILE NAVIGATION TOGGLE (CLICK + TOUCHSTART) ---
        const menuToggle = document.querySelector('.menu-toggle');
        const menuClose = document.querySelector('.menu-close');
        const mobileMenu = document.querySelector('.mobile-menu-overlay');
        const body = document.body;

        const handleMenuOpen = (e) => {
            e.preventDefault();
            e.stopPropagation();
            body.classList.add('menu-active');
            body.classList.add('no-scroll');
            if (lenis) lenis.stop();
        };

        const handleMenuClose = (e) => {
            e.preventDefault();
            e.stopPropagation();
            body.classList.remove('menu-active');
            body.classList.remove('no-scroll');
            if (lenis) lenis.start();
        };

        if (menuToggle && mobileMenu) {
            addTrackedListener(menuToggle, 'click', handleMenuOpen);
            addTrackedListener(menuToggle, 'touchstart', handleMenuOpen, { passive: false });
        }

        if (menuClose) {
            addTrackedListener(menuClose, 'click', handleMenuClose);
            addTrackedListener(menuClose, 'touchstart', handleMenuClose, { passive: false });
        }

        // Close menu when clicking standard links
        const mobileLinks = document.querySelectorAll('.mobile-nav-links > li > a');
        const handleMobileLinkClick = (e) => {
            const link = e.currentTarget;
            const parent = link.closest('.mobile-nav-item');
            if (!parent) {
                body.classList.remove('menu-active');
                body.classList.remove('no-scroll');
                if (lenis) lenis.start();
            }
        };

        mobileLinks.forEach(link => {
            addTrackedListener(link, 'click', handleMobileLinkClick);
            addTrackedListener(link, 'touchstart', handleMobileLinkClick, { passive: true });
        });

        // --- 4. MOBILE ACCORDION TRIGGER FOR PROJECTS & HOUSE TYPES (HIGH FIDELITY UX) ---
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        mobileNavItems.forEach(item => {
            const triggerLink = item.querySelector('a');
            
            const handleAccordionToggle = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isExpanded = item.classList.contains('expanded');
                
                // Accordion behavior: close other sections
                mobileNavItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('expanded');
                    }
                });
                
                if (isExpanded) {
                    item.classList.remove('expanded');
                } else {
                    item.classList.add('expanded');
                }
            };

            if (triggerLink) {
                addTrackedListener(triggerLink, 'click', handleAccordionToggle);
                addTrackedListener(triggerLink, 'touchstart', handleAccordionToggle, { passive: false });
            }
        });

        const compactCards = document.querySelectorAll('.mobile-compact-card');
        const handleCompactCardClick = () => {
            body.classList.remove('menu-active');
            body.classList.remove('no-scroll');
            if (lenis) lenis.start();
        };

        compactCards.forEach(card => {
            addTrackedListener(card, 'click', handleCompactCardClick);
            addTrackedListener(card, 'touchstart', handleCompactCardClick, { passive: true });
        });

        // --- 5. CURSOR TRACKING (DISABLED ON MOBILE TO AVOID CPU SPIKES) ---
        const cardCursor = document.getElementById('card-cursor');
        const hoverableCards = document.querySelectorAll('.property-card, .neighborhood-card, .blog-card, .ht-card');

        if (cardCursor && !isMobile) {
            let mouseX = 0;
            let mouseY = 0;
            let cursorX = 0;
            let cursorY = 0;

            const onMouseMove = (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            };
            addTrackedListener(document, 'mousemove', onMouseMove);

            const animateCursor = () => {
                cursorX += (mouseX - cursorX) * 0.22;
                cursorY += (mouseY - cursorY) * 0.22;

                cardCursor.style.left = `${cursorX}px`;
                cardCursor.style.top = `${cursorY}px`;

                cursorAnimFrameId = requestAnimationFrame(animateCursor);
            };

            animateCursor();

            hoverableCards.forEach(card => {
                addTrackedListener(card, 'mouseenter', () => {
                    cardCursor.classList.add('active');
                });
                addTrackedListener(card, 'mouseleave', () => {
                    cardCursor.classList.remove('active');
                });
            });
        }

        // --- 6. INITIALIZE GSAP ANIMATION MODULES ---
        gsap.registerPlugin(ScrollTrigger);

        // Timeline Spine Fill Animation
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
                        const startY = firstItem.offsetTop + firstMarker.offsetTop;
                        const endY = lastItem.offsetTop + lastMarker.offsetTop;
                        const calculatedHeight = endY - startY;

                        timelineSpine.style.top = `${startY}px`;
                        timelineSpine.style.height = `${calculatedHeight}px`;
                    }
                };
                
                updateHomeSpineHeight();
                
                const spineResizeObserver = new ResizeObserver(() => {
                    updateHomeSpineHeight();
                });
                spineResizeObserver.observe(document.querySelector('.timeline-container'));
                resizeObservers.push(spineResizeObserver);
                
                addTrackedListener(window, 'resize', updateHomeSpineHeight);
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

        // Seamless Reviews Marquee
        const track = document.querySelector('.carousel-track');
        if (track) {
            const setupMarquee = () => {
                const originalCards = Array.from(track.children);
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
                    addTrackedListener(wrapper, 'mouseenter', () => {
                        gsap.to(marquee, { timeScale: 0, duration: 0.6, ease: "power2.out" });
                    });
                    addTrackedListener(wrapper, 'mouseleave', () => {
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
                    addTrackedListener(item, 'mouseenter', lockScroll);
                    addTrackedListener(item, 'mouseleave', unlockScroll);
                });

                megaWrappers.forEach(menu => {
                    addTrackedListener(menu, 'mouseenter', lockScroll);
                    addTrackedListener(menu, 'mouseleave', unlockScroll);
                });

                const handleMarqueeResize = () => {
                    marquee.kill();
                    gsap.set(track, { x: 0 });
                    const newDistance = track.scrollWidth / 2;
                    gsap.to(track, {
                        x: -newDistance,
                        duration: 45,
                        ease: "none",
                        repeat: -1
                    });
                };
                addTrackedListener(window, 'resize', handleMarqueeResize);
            };
            setupMarquee();
        }

        // FAQ Accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const trigger = item.querySelector('.faq-trigger');
            if (!trigger) return;
            addTrackedListener(trigger, 'click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });

        // --- 7. PREMIUM TEXT REVEAL SCENARIO ---
        const splitReveal = (selector, type = 'chars', timeline = null) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                if (el.hasAttribute('data-split-reveal')) return;
                el.setAttribute('data-split-reveal', 'true');

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

        const heroTl = gsap.timeline({ delay: 0.05 });
        splitReveal('.hero .headline, .pd-hero-title', 'lines', heroTl);
        splitReveal('.hero .subheadline, .pd-hero-description', 'lines', heroTl);
        splitReveal('.reveal-type-lines', 'lines', heroTl);

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
                    0.2
                );
            }
        });

        // Parallax & Blur clears
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

        // Architectural Staggered Reveal
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

        // Stats Count-up
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
                    const endY = lastItem.offsetTop + lastIndicator.offsetTop;
                    const calculatedHeight = endY - startY;

                    historySpine.style.top = `${startY}px`;
                    historySpine.style.height = `${calculatedHeight}px`;
                }
            };

            updateSpineHeight();
            
            const historyResizeObserver = new ResizeObserver(() => {
                updateSpineHeight();
            });
            historyResizeObserver.observe(historySpine.parentElement);
            resizeObservers.push(historyResizeObserver);
            
            addTrackedListener(window, 'resize', updateSpineHeight);

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

            visitButtons.forEach(btn => addTrackedListener(btn, 'click', openSiteVisitModal));
            if (modalCloseBtn) addTrackedListener(modalCloseBtn, 'click', closeSiteVisitModal);
            
            addTrackedListener(siteVisitModal, 'click', (e) => {
                if (e.target === siteVisitModal) closeSiteVisitModal();
            });

            const escModalListener = (e) => {
                if (e.key === 'Escape' && siteVisitModal.classList.contains('active')) closeSiteVisitModal();
            };
            addTrackedListener(document, 'keydown', escModalListener);
        }

        // Gallery Lightbox Logic
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
                addTrackedListener(viewAllBtn, 'click', (e) => {
                    e.preventDefault();
                    openLightbox(0);
                });
            }

            galleryItems.forEach((img, idx) => {
                img.style.cursor = 'pointer';
                addTrackedListener(img, 'click', () => {
                    openLightbox(idx);
                });
            });

            if (lbPrev) {
                addTrackedListener(lbPrev, 'click', () => {
                    let nextIdx = currentIndex - 1;
                    if (nextIdx < 0) nextIdx = imageSources.length - 1;
                    updateLightbox(nextIdx);
                });
            }

            if (lbNext) {
                addTrackedListener(lbNext, 'click', () => {
                    let nextIdx = currentIndex + 1;
                    if (nextIdx >= imageSources.length) nextIdx = 0;
                    updateLightbox(nextIdx);
                });
            }

            if (lbClose) addTrackedListener(lbClose, 'click', closeLightbox);
            
            addTrackedListener(lightbox, 'click', (e) => {
                if (e.target.classList.contains('hd-lightbox-backdrop') || e.target === lightbox) {
                    closeLightbox();
                }
            });

            if (lbThumbs) {
                lbThumbs.querySelectorAll('img').forEach((thumb, idx) => {
                    addTrackedListener(thumb, 'click', () => updateLightbox(idx));
                });
            }

            const keydownLightbox = (e) => {
                if (!lightbox.classList.contains('active')) return;
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
                if (e.key === 'ArrowRight' && lbNext) lbNext.click();
            };
            addTrackedListener(document, 'keydown', keydownLightbox);
        }

        // --- 8. REFRESH SCROLLTRIGGER STATE FOR ACCURATE CALCULATIONS ---
        ScrollTrigger.refresh();

        // --- 9. RIGOROUS COMPREHENSIVE TEARDOWN DESTRUCTOR ON ROUTE / UNMOUNT ---
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            
            if (lenis) {
                lenis.destroy();
            }

            listeners.forEach(({ target, type, handler, options }) => {
                if (type === 'gsapTicker') {
                    gsap.ticker.remove(handler);
                } else if (target) {
                    target.removeEventListener(type, handler, options);
                }
            });

            resizeObservers.forEach(obs => obs.disconnect());

            if (cursorAnimFrameId) {
                cancelAnimationFrame(cursorAnimFrameId);
            }
        };
    }, [pathname]);

    return null;
}
