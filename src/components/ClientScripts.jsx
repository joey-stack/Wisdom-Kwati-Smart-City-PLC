'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientScripts() {
    const pathname = usePathname();

    useEffect(() => {
        // Poll until GSAP + Lenis are loaded from CDN, then init
        let attempts = 0;
        const maxAttempts = 100; // 10 seconds max
        const timer = setInterval(() => {
            attempts++;
            const gsapReady = typeof window.gsap !== 'undefined';
            const lenisReady = typeof window.Lenis !== 'undefined';
            if ((gsapReady && lenisReady) || attempts >= maxAttempts) {
                clearInterval(timer);
                initScripts();
            }
        }, 100);
        return () => clearInterval(timer);
    }, [pathname]);

    function initScripts() {
        if (typeof window === 'undefined') return;

        // Initialize Lenis
        let lenis;
        if (typeof window.Lenis !== 'undefined') {
            lenis = new window.Lenis({
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

            if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
                lenis.on('scroll', window.ScrollTrigger.update);
                window.gsap.ticker.add((time) => {
                    lenis.raf(time * 1000);
                });
                window.gsap.ticker.lagSmoothing(0);
            }
        }

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
                cursorX += (mouseX - cursorX) * 0.18;
                cursorY += (mouseY - cursorY) * 0.18;

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

        if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
            const gsap = window.gsap;
            const ScrollTrigger = window.ScrollTrigger;
            gsap.registerPlugin(ScrollTrigger);
            gsap.ticker.lagSmoothing(0);

            // Timeline Fill Animation
            if (document.querySelector('.timeline-fill') && document.querySelector('.timeline-container')) {
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

            // Hero Entrance Animations
            const heroSelectors = [
                { selector: '.about-page .hero-title', el: document.querySelector('.about-page .hero-title') },
                { selector: '.house-types-page .ht-headline', el: document.querySelector('.house-types-page .ht-headline') },
                { selector: '.contact-page .hero-title', el: document.querySelector('.contact-page .hero-title') },
                { selector: '.projects-page .pj-hero-title', el: document.querySelector('.projects-page .pj-hero-title') },
                { selector: '.hd-page .hd-hero-title', el: document.querySelector('.hd-page .hd-hero-title') },
                { selector: '.hero .headline', el: document.querySelector('.hero .headline') },
                { selector: '.hero .hero-card', el: document.querySelector('.hero .hero-card') }
            ];

            heroSelectors.forEach(({ el }) => {
                if (el) {
                    gsap.fromTo(el, 
                        { y: 20, opacity: 0, filter: 'blur(10px)', clipPath: 'inset(0% 0% 100% 0%)' },
                        { y: 0, opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.out', delay: 0.3 }
                    );
                }
            });

            // Multi-Page Reveal
            const gridSelectors = [
                '.action-grid', '.ht-grid', '.locations-grid', '.neighborhood-grid', 
                '.team-grid', '.career-grid', '.values-grid', '.recognition-list'
            ];

            gridSelectors.forEach(selector => {
                const grid = document.querySelector(selector);
                if (grid) {
                    const items = grid.querySelectorAll('.reveal-on-scroll');
                    if (items.length > 0) {
                        ScrollTrigger.batch(items, {
                            onEnter: batch => gsap.fromTo(batch, 
                                { y: 30, opacity: 0, filter: 'blur(12px)', clipPath: 'inset(0% 0% 100% 0%)' },
                                {
                                    y: 0, opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0%)',
                                    duration: 1.2, stagger: 0.1, ease: 'expo.out', overwrite: true, clearProps: "filter,clipPath"
                                }
                            ),
                            start: 'top 85%',
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
                        { y: 30, opacity: 0, filter: 'blur(12px)', clipPath: 'inset(0% 0% 100% 0%)' },
                        {
                            y: 0, opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0%)',
                            duration: 1.2, ease: 'expo.out',
                            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
                            clearProps: "filter,clipPath"
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
                        const endY = lastItem.offsetTop + lastIndicator.offsetTop + (lastIndicator.offsetHeight / 2);
                        const calculatedHeight = endY - startY;

                        historySpine.style.top = `${startY}px`;
                        historySpine.style.height = `${calculatedHeight}px`;
                    }
                };

                updateSpineHeight();
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
                    const card = item.querySelector('.history-card');
                    const itemTl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 95%', toggleActions: 'play none none none' } });

                    itemTl.from(indicator, { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(2)' });
                    ScrollTrigger.create({
                        trigger: indicator, start: "top 45%",
                        onEnter: () => indicator.classList.add('active'),
                        onLeaveBack: () => indicator.classList.remove('active'),
                    });
                    itemTl.from(card, { x: 15, opacity: 0, filter: 'blur(8px)', clipPath: 'inset(0% 100% 0% 0%)', duration: 1.4, ease: 'expo.out' }, "-=0.4");
                });
            }
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
