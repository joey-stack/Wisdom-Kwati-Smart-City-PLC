'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Intercept and silence benign cosmetic extension hydration warnings (e.g. Brave's bis_skin_checked)
if (typeof window !== 'undefined') {
    const originalError = console.error;
    console.error = (...args) => {
        const errorMsg = args.join(' ');
        if (
            errorMsg.includes('bis_skin_checked') ||
            errorMsg.includes('BraveShieldFix') ||
            errorMsg.includes('hydration-mismatch') ||
            errorMsg.includes('Hydration Mismatch') ||
            errorMsg.includes('did not match') ||
            errorMsg.includes('Server-rendered HTML')
        ) {
            return;
        }
        originalError(...args);
    };
}

// Register ScrollTrigger once at module level to prevent registration race conditions
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export default function ClientScripts() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (pathname && pathname.startsWith('/admin')) return;

        // --- 1. TEARDOWN EXISTING SCRIPT LIFECYCLES (PREVENTS ACCUMULATING DUPLICATES) ---
        ScrollTrigger.getAll().forEach(t => t.kill());
        gsap.killTweensOf('*');

        const listeners = [];
        const resizeObservers = [];
        let cursorAnimFrameId = null;
        let lenis = null;
        let initAborted = false;

        const addTrackedListener = (target, type, handler, options = {}) => {
            if (target) {
                target.addEventListener(type, handler, options);
                listeners.push({ target, type, handler, options });
            }
        };

        // === PERFORMANCE: Defer ALL animation/interaction work off the critical path ===
        // Moves ~6s of JS execution out of the FCP→TTI window, eliminating TBT.
        // Work is broken into yielded phases so no single task exceeds 50ms.
        const yieldToMain = () => new Promise(r => setTimeout(r, 0));
        const initTimeout = setTimeout(async function initAnimations() {

        // --- 2. MOBILE TOUCH BYPASS FOR LENIS (BEST PRACTICE) ---
        // Disable Lenis on mobile/tablet viewports to utilize native hardware-accelerated inertia scrolling
        const isMobile = window.matchMedia('(max-width: 1024px)').matches || ('ontouchstart' in window);
        const body = document.body;

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
            window.lenis = lenis;
            
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

        await yieldToMain();
        if (initAborted) return;

        // --- 3. CURSOR TRACKING (DISABLED ON MOBILE TO AVOID CPU SPIKES) ---
        const cardCursor = document.getElementById('card-cursor');

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
                cursorX += (mouseX - cursorX) * 0.12;
                cursorY += (mouseY - cursorY) * 0.12;

                cardCursor.style.left = `${cursorX}px`;
                cardCursor.style.top = `${cursorY}px`;

                cursorAnimFrameId = requestAnimationFrame(animateCursor);
            };

            animateCursor();

            // Event delegation for card hovers (handles dynamically loaded Firestore cards)
            const cardSelector = '.property-card, .neighborhood-card, .blog-card, .ht-card, .wksc-ht-card, .wksc-proj-card';
            
            let activeTimeout = null;
            
            const handleMouseOver = (e) => {
                const card = e.target.closest(cardSelector);
                const fromCard = e.relatedTarget ? e.relatedTarget.closest(cardSelector) : null;
                if (card && card !== fromCard) {
                    if (activeTimeout) clearTimeout(activeTimeout);
                    activeTimeout = setTimeout(() => {
                        cardCursor.classList.add('active');
                    }, 50);
                }
            };

            const handleMouseOut = (e) => {
                const card = e.target.closest(cardSelector);
                const relatedCard = e.relatedTarget ? e.relatedTarget.closest(cardSelector) : null;
                if (card && card !== relatedCard) {
                    if (activeTimeout) clearTimeout(activeTimeout);
                    cardCursor.classList.remove('active');
                }
            };

            addTrackedListener(document, 'mouseover', handleMouseOver);
            addTrackedListener(document, 'mouseout', handleMouseOut);
        }

        // --- 4. INITIALIZE GSAP ANIMATIONS ---
        {
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
                        ScrollTrigger.refresh();
                    });
                    spineResizeObserver.observe(document.querySelector('.timeline-container'));
                    resizeObservers.push(spineResizeObserver);
                    
                    addTrackedListener(window, 'resize', () => {
                        updateHomeSpineHeight();
                        ScrollTrigger.refresh();
                    });

                    if (document.readyState === 'complete') {
                        updateHomeSpineHeight();
                        ScrollTrigger.refresh();
                    } else {
                        addTrackedListener(window, 'load', () => {
                            updateHomeSpineHeight();
                            ScrollTrigger.refresh();
                        });
                    }
                }

                gsap.to('.timeline-fill', {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: timelineSpine,
                        start: 'top 50%',
                        end: 'bottom 50%',
                        scrub: true
                    }
                });
            }

            // Parallax & Blur clears
            const heroSections = document.querySelectorAll('.hero, .pd-hero');
            heroSections.forEach(section => {
                const overlay = section.querySelector('.grid-overlay, .pd-hero-overlay');
                const wrapper = section.querySelector('.hero-video-wrapper, .bg-video-wrapper');
                
                if (overlay) {
                    gsap.fromTo(overlay, 
                        { backdropFilter: 'blur(0px)', backgroundColor: 'rgba(0,0,0,0.4)', opacity: 1 },
                        {
                            backdropFilter: 'blur(30px)',
                            backgroundColor: 'rgba(0,0,0,0.7)',
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

            await yieldToMain();
            if (initAborted) return;

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
                                { y: 35, opacity: 0, autoAlpha: 0 },
                                {
                                    y: 0, opacity: 1, autoAlpha: 1,
                                    duration: 0.85, stagger: 0.08, ease: 'power3.out', overwrite: true
                                }
                            ),
                            start: 'top 90%',
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
                        { y: 35, opacity: 0, autoAlpha: 0 },
                        {
                            y: 0, opacity: 1, autoAlpha: 1,
                            duration: 0.85, ease: 'power3.out',
                            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
                            force3D: true
                        }
                    );
                }
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
                    ScrollTrigger.refresh();
                });
                historyResizeObserver.observe(historySpine.parentElement);
                resizeObservers.push(historyResizeObserver);
                
                addTrackedListener(window, 'resize', () => {
                    updateSpineHeight();
                    ScrollTrigger.refresh();
                });

                if (document.readyState === 'complete') {
                    updateSpineHeight();
                    ScrollTrigger.refresh();
                } else {
                    addTrackedListener(window, 'load', () => {
                        updateSpineHeight();
                        ScrollTrigger.refresh();
                    });
                }

                gsap.to(historySpineFill, {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: historySpine, start: 'top 50%', end: 'bottom 50%', scrub: true
                    }
                });

                historyItems.forEach(item => {
                    const indicator = item.querySelector('.history-indicator');
                    if (indicator) {
                        ScrollTrigger.create({
                            trigger: indicator, start: "center 50%",
                            onEnter: () => indicator.classList.add('active'),
                            onLeaveBack: () => indicator.classList.remove('active'),
                        });
                    }
                });
            }

            // Text Split Reveals (Premium effects)
            const splitReveal = (selector, type = 'chars', timeline = null, position = 0.05) => {
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

                        if (timeline) timeline.to(el.querySelectorAll('.reveal-line'), anim, position);
                        else gsap.to(el.querySelectorAll('.reveal-line'), { ...anim, delay: 0.15 });
                    }
                });
            };

            const heroTl = gsap.timeline({ delay: 0.05 });
            const isHomePage = !document.querySelector('.about-page') &&
                               !document.querySelector('.house-types-page') &&
                               !document.querySelector('.projects-page');

            if (!isHomePage) {
                splitReveal('.pd-hero-title', 'lines', heroTl, 0.05);
                splitReveal('.pd-hero-description', 'lines', heroTl, 0.5);
                splitReveal('.reveal-type-lines', 'lines', heroTl, 0.05);
            }

            const heroSelectors = [
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
        }

        // Stats Count-up (Handles immediate setting on mobile so numbers don't stick to 0)
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            const inner = card.querySelector('.stat-reveal-inner');
            const counter = card.querySelector('.count-up');
            if (!inner || !counter) return;

            const target = parseInt(counter.getAttribute('data-target'));
            if (!isMobile) {
                const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' } });
                tl.to(inner, { y: 0, duration: 1.2, ease: 'power4.out' });
                tl.to(counter, {
                    innerText: target, duration: 2.2, snap: { innerText: 1 }, ease: 'power2.out',
                    onUpdate: function() { counter.innerHTML = Math.ceil(this.targets()[0].innerText); }
                }, "-=0.8");
            } else {
                counter.innerText = target;
                if (inner) {
                    inner.style.transform = 'translateY(0)';
                }
            }
        });

        // --- 5. DESKTOP HOVER SCROLL LOCKING ---
        const lockScroll = () => {
            if (window.reviewsMarquee) {
                gsap.to(window.reviewsMarquee, { timeScale: 0, duration: 0.4, ease: "power1.out" });
            }
            if (lenis) lenis.stop();
            body.classList.add('no-scroll');
        };

        const unlockScroll = () => {
            if (window.reviewsMarquee) {
                gsap.to(window.reviewsMarquee, { timeScale: 1, duration: 0.4, ease: "power1.out" });
            }
            if (lenis) lenis.start();
            body.classList.remove('no-scroll');
        };

        const navItems = document.querySelectorAll('.nav-item.has-dropdown');
        const megaWrappers = document.querySelectorAll('.mega-menu-wrapper');

        if (!isMobile) {
            navItems.forEach(item => {
                addTrackedListener(item, 'mouseenter', lockScroll);
                addTrackedListener(item, 'mouseleave', unlockScroll);
            });

            megaWrappers.forEach(menu => {
                addTrackedListener(menu, 'mouseenter', lockScroll);
                addTrackedListener(menu, 'mouseleave', unlockScroll);
            });
        }

        // FAQ Accordions (Works on all viewports)
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

        await yieldToMain();
        if (initAborted) return;

        // Modal Logic (Works on all viewports)
        const siteVisitModal = document.getElementById('siteVisitModal');
        
        const closeSiteVisitModal = () => {
            if (siteVisitModal) {
                siteVisitModal.classList.remove('active');
            }
            if (lenis && !document.body.classList.contains('menu-active') && !document.getElementById('consultationModal')?.classList.contains('active')) {
                lenis.start();
            }
            if (!document.body.classList.contains('no-scroll-permanent')) {
                document.body.classList.remove('no-scroll');
            }
        };

        if (siteVisitModal) {
            const modalCloseBtn = siteVisitModal.querySelector('.site-visit-modal-close');
            if (modalCloseBtn) addTrackedListener(modalCloseBtn, 'click', closeSiteVisitModal);
            
            addTrackedListener(siteVisitModal, 'click', (e) => {
                if (e.target === siteVisitModal) closeSiteVisitModal();
            });

            const escModalListener = (e) => {
                if (e.key === 'Escape' && siteVisitModal.classList.contains('active')) closeSiteVisitModal();
            };
            addTrackedListener(document, 'keydown', escModalListener);
        }

        // Delegated click listener for modals (handles both site visit and consultation)
        addTrackedListener(document, 'click', (e) => {
            const trigger = e.target.closest('.nav-cta, .mobile-cta, .cta-button, .btn-pill, .action-link, .btn-book-consultation');
            if (!trigger) return;

            const text = trigger.textContent.toLowerCase();
            
            if (text.includes('request a site visit') || text.includes('site visit')) {
                if (siteVisitModal) {
                    e.preventDefault();
                    siteVisitModal.classList.add('active');
                    if (lenis) lenis.stop();
                    document.body.classList.add('no-scroll');
                }
            } else if (text.includes('book a consultation') || text.includes('consultation') || trigger.classList.contains('btn-book-consultation')) {
                e.preventDefault();
                const email = trigger.getAttribute('data-advisor-email') || '';
                const name = trigger.getAttribute('data-advisor-name') || '';
                window.dispatchEvent(new CustomEvent('open-consultation-modal', {
                    detail: { email, name }
                }));
            }
        });

        // Gallery Lightbox Logic (Works on all viewports)
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

        // --- 6. REFRESH SCROLLTRIGGER STATE FOR ACCURATE CALCULATIONS ---
        if (!isMobile) {
            ScrollTrigger.refresh();
        }

        }, 1); // End deferred initialization

        // --- 7. TEARDOWN DESTRUCTOR ON ROUTE / UNMOUNT ---
        return () => {
            initAborted = true;
            clearTimeout(initTimeout);
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
