document.addEventListener('DOMContentLoaded', () => {
    // ========================
    // LENIS SMOOTH SCROLL SETUP
    // ========================
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

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    window.lenis = lenis;

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
            lenis.stop();
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', () => {
            body.classList.remove('menu-active');
            body.classList.remove('no-scroll');
            lenis.start();
        });
    }

    // Close menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-links > li > a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const parent = link.closest('.nav-item');
            if (parent && parent.querySelector('.mobile-accordion-content')) {
                e.preventDefault();
                parent.classList.toggle('expanded');
            } else {
                body.classList.remove('menu-active');
            }
        });
    });

    // Handle clicks on internal compact cards (closes menu)
    const compactCards = document.querySelectorAll('.mobile-compact-card');
    compactCards.forEach(card => {
        card.addEventListener('click', () => {
            body.classList.remove('menu-active');
        });
    });

    // Custom Card Cursor Tracking Logic
    const cardCursor = document.getElementById('card-cursor');

    if (cardCursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            // High-performance smooth tracking (lerp effect)
            cursorX += (mouseX - cursorX) * 0.12;
            cursorY += (mouseY - cursorY) * 0.12;

            cardCursor.style.left = `${cursorX}px`;
            cardCursor.style.top = `${cursorY}px`;

            requestAnimationFrame(animateCursor);
        };

        animateCursor();

        // Event delegation for card hovers (handles dynamically loaded Firestore cards)
        const cardSelector = '.property-card, .neighborhood-card, .blog-card, .ht-card, .wksc-ht-card, .wksc-proj-card';
        
        let activeTimeout = null;

        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest(cardSelector);
            const fromCard = e.relatedTarget ? e.relatedTarget.closest(cardSelector) : null;
            if (card && card !== fromCard) {
                if (activeTimeout) clearTimeout(activeTimeout);
                activeTimeout = setTimeout(() => {
                    cardCursor.classList.add('active');
                }, 50);
            }
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest(cardSelector);
            const relatedCard = e.relatedTarget ? e.relatedTarget.closest(cardSelector) : null;
            if (card && card !== relatedCard) {
                if (activeTimeout) clearTimeout(activeTimeout);
                cardCursor.classList.remove('active');
            }
        });
    }

    // ========================
    // GSAP PROCESS TIMELINE LOGIC
    // ========================
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        gsap.ticker.lagSmoothing(0); // Prevents "jumping" during heavy scroll or CPU tasks

        // Timeline Fill Animation
        gsap.to('.timeline-fill', {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.timeline-spine',
                start: 'top 50%',
                end: 'bottom 50%',
                scrub: true
            }
        });
    }

    // ========================
    // GSAP SEAMLESS REVIEWS MARQUEE
    // ========================
    if (typeof gsap !== 'undefined') {
        const track = document.querySelector('.carousel-track');

        if (track) {
            // 1. Initial Setup: Create clones for a seamless loop
            const setupMarquee = () => {
                const originalCards = Array.from(track.children);
                
                // Double the items to ensure enough content for the loop
                originalCards.forEach(card => {
                    const clone = card.cloneNode(true);
                    track.appendChild(clone);
                });

                // Calculate the distance to move (width of the original set plus one gap)
                // Use the total scrollWidth / 2 since we just doubled it
                const moveDistance = track.scrollWidth / 2;

                // 2. Continuous Linear Animation (Hardware Accelerated)
                const marquee = gsap.to(track, {
                    x: -moveDistance,
                    duration: 45, // Cinematic speed (Slower for premium feel)
                    ease: "none",
                    repeat: -1,
                    overwrite: "auto",
                    force3D: true // Ensure GPU acceleration
                });

                // 3. Interaction: Pause on Hover (Target wrapper for stability)
                const wrapper = document.querySelector('.carousel-wrapper');
                if (wrapper) {
                    wrapper.addEventListener('mouseenter', () => {
                        gsap.to(marquee, { timeScale: 0, duration: 0.6, ease: "power2.out" });
                    });

                    wrapper.addEventListener('mouseleave', () => {
                        gsap.to(marquee, { timeScale: 1, duration: 0.6, ease: "power2.out" });
                    });
                }

                // Handle Mega Menu State: Pause slider smoothly if menu is open to save GPU resources
                // Handle Mega Menu State: Pause slider smoothly + Global Scroll Lock
                const navItems = document.querySelectorAll('.nav-item.has-dropdown');
                const megaWrappers = document.querySelectorAll('.mega-menu-wrapper');
                
                const lockScroll = () => {
                    gsap.to(marquee, { timeScale: 0, duration: 0.4, ease: "power1.out" });
                    lenis.stop();
                    body.classList.add('no-scroll');
                };

                const unlockScroll = () => {
                    gsap.to(marquee, { timeScale: 1, duration: 0.4, ease: "power1.out" });
                    lenis.start();
                    body.classList.remove('no-scroll');
                };

                navItems.forEach(item => {
                    item.addEventListener('mouseenter', lockScroll);
                    item.addEventListener('mouseleave', unlockScroll);
                });

                megaWrappers.forEach(menu => {
                    menu.addEventListener('mouseenter', lockScroll);
                    menu.addEventListener('mouseleave', unlockScroll);
                });

                // Performance Tip: Update move distance on resize
                window.addEventListener('resize', () => {
                    marquee.kill();
                    gsap.set(track, { x: 0 }); // Reset position
                    // Refresh distance and restart
                    const newDistance = track.scrollWidth / 2;
                    gsap.to(track, {
                        x: -newDistance,
                        duration: 45,
                        ease: "none",
                        repeat: -1
                    });
                });
            };

            // Initialization: Use window.load to ensure all assets are measured correctly for the seamless loop
            if (document.readyState === 'complete') {
                setupMarquee();
            } else {
                window.addEventListener('load', setupMarquee);
            }
        }

        // --- FAQ Accordion Logic ---
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const trigger = item.querySelector('.faq-trigger');
            
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items (Exclusive behavior)
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle clicked item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
        // --- About Hero Entrance Animation ---
        const aboutHeroTitle = document.querySelector('.about-page .hero-title');
        if (aboutHeroTitle) {
            gsap.fromTo(aboutHeroTitle, 
                { y: 20, opacity: 0, filter: 'blur(10px)', clipPath: 'inset(0% 0% 100% 0%)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.8,
                    ease: 'expo.out',
                    delay: 0.3
                }
            );
        }

        // --- House Types Hero Entrance Animation ---
        const htHeroTitle = document.querySelector('.house-types-page .ht-headline');
        if (htHeroTitle) {
            gsap.fromTo(htHeroTitle, 
                { y: 20, opacity: 0, filter: 'blur(10px)', clipPath: 'inset(0% 0% 100% 0%)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.8,
                    ease: 'expo.out',
                    delay: 0.3
                }
            );
        }

        // --- Contact Hero Entrance Animation ---
        const contactHeroTitle = document.querySelector('.contact-page .hero-title');
        if (contactHeroTitle) {
            gsap.fromTo(contactHeroTitle, 
                { y: 20, opacity: 0, filter: 'blur(10px)', clipPath: 'inset(0% 0% 100% 0%)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.8,
                    ease: 'expo.out',
                    delay: 0.3
                }
            );
        }
        // --- Projects Hero Entrance Animation ---
        const projectsHeroTitle = document.querySelector('.projects-page .pj-hero-title');
        if (projectsHeroTitle) {
            gsap.fromTo(projectsHeroTitle, 
                { y: 20, opacity: 0, filter: 'blur(10px)', clipPath: 'inset(0% 0% 100% 0%)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.8,
                    ease: 'expo.out',
                    delay: 0.3
                }
            );
        }

        // --- House Detail Hero Entrance Animation ---
        const hdHeroTitle = document.querySelector('.hd-page .hd-hero-title');
        if (hdHeroTitle) {
            gsap.fromTo(hdHeroTitle, 
                { y: 20, opacity: 0, filter: 'blur(10px)', clipPath: 'inset(0% 0% 100% 0%)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 1.8,
                    ease: 'expo.out',
                    delay: 0.3
                }
            );
        }

        // --- Multi-Page Reveal On Scroll Logic (Universal & Optimized) ---
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

        // Handle standalone reveal elements
        const standaloneRevels = document.querySelectorAll('.reveal-on-scroll');
        standaloneRevels.forEach(el => {
            const isInsideGrid = gridSelectors.some(sel => el.closest(sel));
            if (!isInsideGrid) {
                gsap.fromTo(el, 
                    { y: 35, opacity: 0, autoAlpha: 0 },
                    {
                        y: 0, opacity: 1, autoAlpha: 1,
                        duration: 0.85, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 88%',
                            toggleActions: 'play none none none'
                        },
                        force3D: true
                    }
                );
            }
        });

        // --- Premium Stats: Flip Reveal + Count-up Animation ---
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            const inner = card.querySelector('.stat-reveal-inner');
            const counter = card.querySelector('.count-up');
            if (!inner || !counter) return;

            const target = parseInt(counter.getAttribute('data-target'));
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
            
            // 1. Vertical "Flip" Reveal
            tl.to(inner, {
                y: 0,
                duration: 1.2,
                ease: 'power4.out'
            });
            
            // 2. Numeric Count-up (Slightly overlapped for cinematic flow)
            tl.to(counter, {
                innerText: target,
                duration: 2.2,
                snap: { innerText: 1 },
                ease: 'power2.out',
                onUpdate: function() {
                    counter.innerHTML = Math.ceil(this.targets()[0].innerText);
                }
            }, "-=0.8");
        });

        // --- Our History: Dynamic Spine Precision Logic ---
        const historyTimeline = document.querySelector('.history-timeline');
        const historySpine = document.querySelector('.history-spine');
        const historySpineFill = document.querySelector('.history-spine-fill');
        const historyItems = document.querySelectorAll('.history-item');
        
        if (historyTimeline && historySpine && historySpineFill && historyItems.length > 0) {
            const updateSpineHeight = () => {
                const firstItem = historyItems[0];
                const lastItem = historyItems[historyItems.length - 1];
                const firstIndicator = firstItem.querySelector('.history-indicator');
                const lastIndicator = lastItem.querySelector('.history-indicator');
                
                if (firstIndicator && lastIndicator) {
                    // Calculate physical Y-offsets relative to the timeline container
                    // Start at the TOP border of the first indicator per user instruction
                    const startY = firstItem.offsetTop + firstIndicator.offsetTop; 
                    const endY = lastItem.offsetTop + lastIndicator.offsetTop + (lastIndicator.offsetHeight / 2); // Still end at center of last
                    const calculatedHeight = endY - startY;

                    // Apply layout
                    historySpine.style.top = `${startY}px`;
                    historySpine.style.height = `${calculatedHeight}px`;
                }
            };

            // Initialize Height Calculation
            updateSpineHeight();
            
            const historyResizeObserver = new ResizeObserver(() => {
                updateSpineHeight();
                ScrollTrigger.refresh();
            });
            if (historySpine.parentElement) {
                historyResizeObserver.observe(historySpine.parentElement);
            }
            
            window.addEventListener('load', () => {
                updateSpineHeight();
                ScrollTrigger.refresh();
            });
            window.addEventListener('resize', () => {
                updateSpineHeight();
                ScrollTrigger.refresh();
            });

            // Synchronized Timeline Fill Animation
            gsap.to(historySpineFill, {
                height: '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: historySpine,
                    start: 'top 50%', // Line starts exactly when first box top hits 50%
                    end: 'bottom 50%', // Line finishes at center of last box at 50%
                    scrub: true
                }
            });
        }

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

        // --- Our Differences: Staggered Entrance ---
        const diffList = document.querySelector('.differences-list');
        if (diffList) {
            gsap.from('.diff-list-item', {
                x: 15,
                opacity: 0,
                filter: 'blur(8px)',
                clipPath: 'inset(0% 100% 0% 0%)',
                duration: 1.4,
                stagger: 0.1,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: diffList,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        }

        const valuesGrid = document.querySelector('.values-grid');
        if (valuesGrid) {
            gsap.from('.value-item', {
                y: 20,
                opacity: 0,
                filter: 'blur(8px)',
                clipPath: 'inset(0% 0% 100% 0%)',
                duration: 1.4,
                stagger: 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: valuesGrid,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // --- Our Team: Staggered Card Reveal ---
        const teamGrid = document.querySelector('.team-grid');
        if (teamGrid) {
            gsap.from('.team-card', {
                y: 20,
                opacity: 0,
                filter: 'blur(10px)',
                clipPath: 'inset(0% 0% 100% 0%)',
                duration: 1.4,
                stagger: 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: teamGrid,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }
        // --- Careers: Staggered Card Reveal ---
        const careerGrid = document.querySelector('.career-grid');
        if (careerGrid) {
            gsap.from('.career-card', {
                y: 20,
                opacity: 0,
                filter: 'blur(10px)',
                clipPath: 'inset(0% 0% 100% 0%)',
                duration: 1.4,
                stagger: 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: careerGrid,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // --- Recognition: Staggered Row Reveal ---
        const recognitionList = document.querySelector('.recognition-list');
        if (recognitionList) {
            gsap.from('.recognition-item', {
                y: 20,
                opacity: 0,
                filter: 'blur(10px)',
                clipPath: 'inset(0% 0% 100% 0%)',
                duration: 1.4,
                stagger: 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: recognitionList,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }
        // ========================
        // HOMEPAGE PREMIUM REVEALS
        // ========================
        const homeHeroHeadline = document.querySelector('.hero .headline');
        const homeHeroCard = document.querySelector('.hero .hero-card');
        
        if (homeHeroHeadline) {
            gsap.fromTo(homeHeroHeadline, 
                { y: 20, opacity: 0, filter: 'blur(10px)', clipPath: 'inset(0% 0% 100% 0%)' },
                { y: 0, opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.out', delay: 0.3 }
            );
        }
        if (homeHeroCard) {
            gsap.fromTo(homeHeroCard, 
                { y: 20, opacity: 0, filter: 'blur(10px)', clipPath: 'inset(0% 0% 100% 0%)' },
                { y: 0, opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.out', delay: 0.5 }
            );
        }

        const whoContent = document.querySelector('.who-content');
        if (whoContent) {
            gsap.from(whoContent.children, {
                y: 20, opacity: 0, filter: 'blur(10px)', clipPath: 'inset(0% 0% 100% 0%)',
                duration: 1.4, stagger: 0.15, ease: 'expo.out',
                scrollTrigger: { trigger: whoContent, start: 'top 85%', toggleActions: 'play none none none' }
            });
        }

        const homepageGrids = [
            { container: '.neighborhood-grid', cards: '.neighborhood-card' },
            { container: '.portfolio-grid', cards: '.property-card' },
            { container: '.services-cards-stack', cards: '.service-card' },
            { container: '.uniqueness-grid', cards: '.uniqueness-card' },
            { container: '.blog-grid', cards: '.blog-card' }
        ];

        homepageGrids.forEach(grid => {
            const containerEl = document.querySelector(grid.container);
            if (containerEl) {
                gsap.from(grid.cards, {
                    y: 30,
                    opacity: 0,
                    filter: 'blur(12px)',
                    clipPath: 'inset(0% 0% 100% 0%)',
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'expo.out',
                    scrollTrigger: {
                        trigger: containerEl,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    immediateRender: false,
                    clearProps: "filter,clipPath"
                });
            }
        });

        const processItems = document.querySelectorAll('.process-item');
        processItems.forEach(item => {
            const card = item.querySelector('.process-card');
            const marker = item.querySelector('.process-marker');
            
            const tl = gsap.timeline({
                scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
            });

            if (marker) {
                tl.from(marker, { scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(2)' });
            }
            if (card) {
                tl.from(card, { y: 20, opacity: 0, filter: 'blur(10px)', clipPath: 'inset(0% 0% 100% 0%)', duration: 1.4, ease: 'expo.out' }, "-=0.4");
            }
        });
    }

    // ========================================
    // SITE VISIT & CONSULTATION MODAL LOGIC
    // ========================================
    const siteVisitModal = document.getElementById('siteVisitModal');
    
    const closeSiteVisitModal = () => {
        if (siteVisitModal) {
            siteVisitModal.classList.remove('active');
        }
        if (typeof lenis !== 'undefined' && !document.body.classList.contains('menu-active') && !document.getElementById('consultationModal')?.classList.contains('active')) {
            lenis.start();
        }
        if (!document.body.classList.contains('menu-active')) {
            document.body.classList.remove('no-scroll');
        }
    };

    if (siteVisitModal) {
        const modalCloseBtn = siteVisitModal.querySelector('.site-visit-modal-close');
        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeSiteVisitModal);
        }

        siteVisitModal.addEventListener('click', (e) => {
            if (e.target === siteVisitModal) {
                closeSiteVisitModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && siteVisitModal.classList.contains('active')) {
                closeSiteVisitModal();
            }
        });
    }

    // Delegated click listener for modals (handles both site visit and consultation)
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.nav-cta, .mobile-cta, .cta-button, .btn-pill, .action-link, .btn-book-consultation');
        if (!trigger) return;

        const text = trigger.textContent.toLowerCase();
        
        if (text.includes('request a site visit') || text.includes('site visit')) {
            if (siteVisitModal) {
                e.preventDefault();
                siteVisitModal.classList.add('active');
                if (typeof lenis !== 'undefined') lenis.stop();
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

});

