'use client';

import Link from 'next/link';

export default function Page() {
    return (
        <main>
            
    

    <header className="hero">
        {/*  Background Grid Overlay  */}
        <div className="grid-overlay"></div>
        
        <div className="hero-container">
            <div className="hero-content">
                <h1 className="headline">DREAM LARGE. <br /> LIVE SMART.</h1>
            </div>

            <div className="hero-card glass-panel">
                <p className="subheadline">
                    We've built the infrastructure <br />other developers only promise.
                </p>
                
                <button className="cta-button">
                    <div className="flip-text">
                        <span>REQUEST A SITE VISIT</span>
                        <span aria-hidden="true">REQUEST A SITE VISIT</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
            </div>
        </div>
        
    </header>

    {/*  Who We Are Section  */}
    <section id="about" className="who-we-are">
        <div className="who-container">
            <div className="who-label">
                <div className="label-square"></div>
                WHO WE ARE
            </div>
            <div className="who-content">
                <h2 className="who-headline">
                    With a foundation in software engineering and infrastructure, we are building the functional ecosystem Africa deserves.
                </h2>
                <p className="who-text">
                    Founded in 2019, WKSC is more than a real estate developer. We are ecosystem builders on a mission to deliver 1 million smart homes by 2035. By integrating IoT-ready infrastructure, solar grids, and water treatment plants from the ground up, we ensure every community is ready for the future.
                </p>
                <a href="#about-full" className="btn-pill">
                    <div className="flip-text">
                        <span>LEARN MORE</span>
                        <span aria-hidden="true">LEARN MORE</span>
                    </div>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
            </div>
        </div>
    </section>


    {/*  Neighborhood Section  */}
    <section id="neighborhood" className="neighborhood-section">
        <div className="neighborhood-container">
            <div className="section-line"></div>
            
            <div className="neighborhood-header sidebar-layout">
                <div className="neighborhood-label">
                    <div className="label-square"></div>
                    NEIGHBORHOOD
                </div>
                <h2 className="neighborhood-headline">
                    Where you live matters — pick the perfect spot
                </h2>
            </div>

            <div className="neighborhood-grid">
                {/*  1. Mabushi District (Ellington Villa)  */}
                <a href="/mabushi-district" className="neighborhood-card">
                    <div className="neighborhood-image-wrapper">
                        <div className="neighborhood-image-inner">
                            <img src="/assets/ellington_villas_project_card.jpg" alt="Mabushi District" />
                        </div>
                    </div>
                    <div className="neighborhood-info">
                        <div className="neighborhood-details">
                            <h3 className="neighborhood-title">Ellington Villa</h3>
                            <p className="neighborhood-location">Mabushi, Abuja</p>
                        </div>
                        <div className="neighborhood-arrow">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                    </div>
                </a>

                {/*  2. Guzape II (Nimi Hills)  */}
                <a href="/guzape-estate" className="neighborhood-card">
                    <div className="neighborhood-image-wrapper">
                        <div className="neighborhood-image-inner">
                            <img src="/assets/nimi_hills_project_card.png" alt="Guzape II" />
                        </div>
                    </div>
                    <div className="neighborhood-info">
                        <div className="neighborhood-details">
                            <h3 className="neighborhood-title">Nimi Hills</h3>
                            <p className="neighborhood-location">Guzape II, Abuja</p>
                        </div>
                        <div className="neighborhood-arrow">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                    </div>
                </a>

                {/*  3. Apo Tafyi (Palm Haven)  */}
                <a href="/palm-haven" className="neighborhood-card">
                    <div className="neighborhood-image-wrapper">
                        <div className="neighborhood-image-inner">
                            <img src="/assets/palm_haven_project_card.jpg" alt="Apo Tafyi" />
                        </div>
                    </div>
                    <div className="neighborhood-info">
                        <div className="neighborhood-details">
                            <h3 className="neighborhood-title">Palm Haven</h3>
                            <p className="neighborhood-location">Apo Tafyi, Abuja</p>
                        </div>
                        <div className="neighborhood-arrow">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                    </div>
                </a>
            </div>

            <div className="neighborhood-footer">
                <a href="/projects" className="btn-pill btn-black">
                    <span className="flip-text">
                        <span className="original">VIEW ALL NEIGHBORHOODS</span>
                        <span className="remix">VIEW ALL NEIGHBORHOODS</span>
                    </span>
                    <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
            </div>
        </div>
    </section>

    <section id="house-portfolio" className="house-portfolio">
        <div className="portfolio-container-main">
            <div className="section-line"></div>
            
            <div className="portfolio-header sidebar-layout">
                <div className="portfolio-label">
                    <div className="label-square"></div>
                    RECENT LISTINGS
                </div>
                <h2 className="portfolio-headline">
                    Take a peek at hottest homes and discover what could be yours
                </h2>
            </div>

            <div className="portfolio-grid">

                {/*  1. The Royal Emerald — Sunshine, Katampe Extension  */}
                <a href="/royal-emerald" className="ht-card" data-name="The Royal Emerald" data-estate="Sunshine, Katampe Extension" data-type="5 Bedroom Luxury Villa" data-specs="5 Beds • 6 Baths • 8,200 SQ FT">
                    <div className="ht-card-image">
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" alt="The Royal Emerald" onError={(e) => { e.currentTarget.src = '/assets/services_project_image.png'; }} />
                    </div>
                    <div className="ht-card-info">
                        <div className="ht-card-left">
                            <h3 className="ht-card-name">The Royal Emerald</h3>
                            <p className="ht-card-location">Sunshine, Katampe Extension</p>
                        </div>
                        <div className="ht-card-right">
                            <p className="ht-card-type">5 Bedroom Luxury Villa</p>
                            <div className="ht-card-specs">
                                <span><i className="fa-solid fa-bed"></i> 5</span>
                                <span className="ht-dot"></span>
                                <span><i className="fa-solid fa-bath"></i> 6</span>
                                <span className="ht-dot"></span>
                                <span><i className="fa-solid fa-expand"></i> 8,200 SQ FT</span>
                            </div>
                        </div>
                    </div>
                </a>

                {/*  2. The Blue Sapphire — Whispering Pines, Karsana  */}
                <a href="/blue-sapphire" className="ht-card" data-name="The Blue Sapphire" data-estate="Whispering Pines, Karsana" data-type="4 Bedroom Terrace Smart Duplex" data-specs="4 Beds • 4.5 Baths • 3,200 SQ FT">
                    <div className="ht-card-image">
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" alt="The Blue Sapphire" onError={(e) => { e.currentTarget.src = '/assets/services_project_image.png'; }} />
                    </div>
                    <div className="ht-card-info">
                        <div className="ht-card-left">
                            <h3 className="ht-card-name">The Blue Sapphire</h3>
                            <p className="ht-card-location">Whispering Pines, Karsana</p>
                        </div>
                        <div className="ht-card-right">
                            <p className="ht-card-type">4 Bedroom Terrace Smart Duplex</p>
                            <div className="ht-card-specs">
                                <span><i className="fa-solid fa-bed"></i> 4</span>
                                <span className="ht-dot"></span>
                                <span><i className="fa-solid fa-bath"></i> 4.5</span>
                                <span className="ht-dot"></span>
                                <span><i className="fa-solid fa-expand"></i> 3,200 SQ FT</span>
                            </div>
                        </div>
                    </div>
                </a>

            </div>

            <div className="portfolio-footer">
                <a href="/house-types" className="btn-pill">
                    <div className="flip-text">
                        <span>VIEW PROPERTIES</span>
                        <span aria-hidden="true">VIEW PROPERTIES</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
            </div>
        </div>
    </section>

    {/*  Custom Card Cursor  */}
    <div id="card-cursor" className="card-cursor">
        <span>VIEW</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    {/*  Services Section  */}
    <section id="services" className="services-section">
        <div className="services-container">
            <div className="section-line"></div>
            
            <div className="services-header sidebar-layout">
                <div className="services-label">
                    <div className="label-square"></div>
                    SERVICES
                </div>
                <h2 className="services-headline">
                    Service, support, and strategy — made simple from start to finish.
                </h2>
            </div>

            <div className="services-grid-body">
                <div className="services-list-column">
                    <div className="services-cards-stack">
                        {/*  1. Consultation  */}
                        <div className="service-card">
                            <div className="service-card-header">
                                <div className="service-icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                </div>
                                <h3 className="service-card-title">Consultation</h3>
                            </div>
                            <div className="service-card-body">
                                <p className="service-card-description">We partner with you to transform raw ideas into definitive architectural strategies. Our expert advisors ensure every detail aligns with your lifestyle and future growth.</p>
                            </div>
                        </div>

                        {/*  2. Design & Automation  */}
                        <div className="service-card">
                            <div className="service-card-header">
                                <div className="service-icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>
                                </div>
                                <h3 className="service-card-title">Design & Automation</h3>
                            </div>
                            <div className="service-card-body">
                                <p className="service-card-description">Our design service creates smart, sustainable homes tailored to your needs. We anticipate the future, integrating modern lifestyle features with tomorrow's technology.</p>
                            </div>
                        </div>

                        {/*  3. Construction  */}
                        <div className="service-card">
                            <div className="service-card-header">
                                <div className="service-icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="10" width="20" height="12" rx="2"></rect><path d="M6 10V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"></path><path d="M12 10V2"></path></svg>
                                </div>
                                <h3 className="service-card-title">Construction</h3>
                            </div>
                            <div className="service-card-body">
                                <p className="service-card-description">Building excellence through surgical precision. We combine high-performance materials with master craftsmanship to deliver homes that stand for generations.</p>
                            </div>
                        </div>

                        {/*  4. Project Management  */}
                        <div className="service-card">
                            <div className="service-card-header">
                                <div className="service-icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>
                                </div>
                                <h3 className="service-card-title">Project Management</h3>
                            </div>
                            <div className="service-card-body">
                                <p className="service-card-description">Seamless delivery from vision to handover. We manage the complexities of construction, timelines, and logistics so you can focus on your future.</p>
                            </div>
                        </div>

                        {/*  5. Smart Investment  */}
                        <div className="service-card">
                            <div className="service-card-header">
                                <div className="service-icon">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                                </div>
                                <h3 className="service-card-title">Smart Investment</h3>
                            </div>
                            <div className="service-card-body">
                                <p className="service-card-description">Strategic real estate growth driven by data and architectural value. We identify high-potential opportunities that ensure your smart city investment appreciates.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="services-image-column">
                    <div className="services-image-wrapper">
                        <div className="services-image-inner">
                            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1_ytmM02VsSMbbvYBP3cw_R7SMhfaQKOB" alt="High-Fidelity Architectural Project" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/*  Uniqueness Section  */}
    <section id="uniqueness" className="uniqueness-section">
        <div className="uniqueness-container">
            <div className="section-line"></div>
            
            <div className="uniqueness-header sidebar-layout">
                <div className="uniqueness-label">
                    <div className="label-square"></div>
                    OUR UNIQUENESS
                </div>
                <h2 className="uniqueness-headline">
                    Why we're not just another agency — we're your real estate sidekick
                </h2>
            </div>

            <div className="uniqueness-grid">
                {/*  1. Verified Listings  */}
                <div className="uniqueness-card">
                    <div className="uniqueness-top">
                        <div className="uniqueness-pill">Verified listings you can trust</div>
                    </div>
                    <div className="uniqueness-list-container">
                        <ul className="uniqueness-list">
                            <li>Every property checked for accuracy</li>
                            <li>No fake or outdated information</li>
                            <li>Transparent details, zero surprises</li>
                        </ul>
                    </div>
                </div>

                {/*  2. Local Experts  */}
                <div className="uniqueness-card">
                    <div className="uniqueness-top">
                        <div className="uniqueness-pill">Local experts, real guidance</div>
                    </div>
                    <div className="uniqueness-list-container">
                        <ul className="uniqueness-list">
                            <li>Agents who know the neighborhoods</li>
                            <li>Tips on schools, commutes & lifestyle</li>
                            <li>Honest advice tailored to you</li>
                        </ul>
                    </div>
                </div>

                {/*  3. Stress-free  */}
                <div className="uniqueness-card">
                    <div className="uniqueness-top">
                        <div className="uniqueness-pill">Stress-free buying & selling</div>
                    </div>
                    <div className="uniqueness-list-container">
                        <ul className="uniqueness-list">
                            <li>We manage paperwork and negotiations</li>
                            <li>Simple, step-by-step support</li>
                            <li>Smooth process from start to finish</li>
                        </ul>
                    </div>
                </div>

                {/*  4. Fast Tours  */}
                <div className="uniqueness-card">
                    <div className="uniqueness-top">
                        <div className="uniqueness-pill">Fast tours & easy contact</div>
                    </div>
                    <div className="uniqueness-list-container">
                        <ul className="uniqueness-list">
                            <li>Schedule viewings in one click</li>
                            <li>Connect via phone, WhatsApp, or email</li>
                            <li>Quick response from our team</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/*  Reviews Section: Infinite Cinematic Carousel  */}
    <section id="reviews" className="reviews-section">
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

            <div className="carousel-wrapper">
                <div className="carousel-track">
                    {/*  Card 1: Image Variant (Chief Dr. Chidi Okafor)  */}
                    <div className="review-card image-card">
                        <img src="/assets/reviewer_abuja_chief.png" alt="Chief Dr. Chidi Okafor Review" />
                        <div className="card-overlay">
                            <blockquote className="card-quote">"Correcting a continent, one smart home at a time. WKSC is building the infrastructure we've always deserved."</blockquote>
                            <div className="reviewer-identity-container">
                                <div className="reviewer-meta-group">
                                    <span className="card-name">Chief Dr. Chidi Okafor</span>
                                    <span className="card-meta">HOME OWNER, ABUJA</span>
                                </div>
                                <div className="reviewer-avatar">
                                    <img src="/assets/reviewer_abuja_chief.png" alt="Chief Dr. Chidi Okafor" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Card 2: Text Variant (The Adewale Family)  */}
                    <div className="review-card text-card">
                        <blockquote className="card-quote-main">"I realized I didn't have to leave to arrive."</blockquote>
                        <p className="card-body">"I used to think my best future lay outside Nigeria, but working with WKSC changed that. Their smart ecosystem in Lagos Epe mirrors the quality I saw in the UK, but with the warmth of home."</p>
                        <div className="reviewer-identity-container">
                            <div className="reviewer-meta-group">
                                <span className="card-name">The Adewale Family</span>
                                <span className="card-meta">EPE SMART CITY, LAGOS</span>
                            </div>
                            <div className="reviewer-avatar">
                                <img src="/assets/reviewer_lagos_family.png" alt="The Adewale Family" />
                            </div>
                        </div>
                    </div>

                    {/*  Card 3: Image Variant (Engr. Tunde Olayinka)  */}
                    <div className="review-card image-card">
                        <img src="/assets/reviewer_ph_pro.png" alt="Engr. Tunde Olayinka Review" />
                        <div className="card-overlay">
                            <blockquote className="card-quote">"Finally, a smart ecosystem that actually works. The IoT integration in Port Harcourt is world-class."</blockquote>
                            <div className="reviewer-identity-container">
                                <div className="reviewer-meta-group">
                                    <span className="card-name">Engr. Tunde Olayinka</span>
                                    <span className="card-meta">PORT HARCOURT</span>
                                </div>
                                <div className="reviewer-avatar">
                                    <img src="/assets/reviewer_ph_pro.png" alt="Engr. Tunde Olayinka" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Card 4: Text Variant (Amina Bello)  */}
                    <div className="review-card text-card">
                        <blockquote className="card-quote-main">"Bringing the future of healthy living to Adamawa."</blockquote>
                        <p className="card-body">"I thought modern living would take decades to reach Yola, but WKSC delivered. From the solar grids to the water treatment plants, every detail ensures my family is safe and ready for the future."</p>
                        <div className="reviewer-identity-container">
                            <div className="reviewer-meta-group">
                                <span className="card-name">Amina Bello</span>
                                <span className="card-meta">HOME OWNER, YOLA</span>
                            </div>
                            <div className="reviewer-avatar">
                                <img src="/assets/reviewer_yola_amina.png" alt="Amina Bello" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    {/*  Process Section: Vertical Alternating Timeline  */}
    <section id="process" className="process-section">
        <div className="process-container">
            <div className="section-line"></div>
            
            <div className="process-header sidebar-layout">
                <div className="process-label">
                    <div className="label-square"></div>
                    PROCESS
                </div>
                <h2 className="process-headline">
                    Starting with browsing and <br />ending with your brand new home
                </h2>
            </div>

            <div className="timeline-container">
                {/*  Central Spine  */}
                <div className="timeline-spine">
                    <div className="timeline-fill"></div>
                </div>

                {/*  Step 1  */}
                <div className="process-item" data-step="1">
                    <div className="process-image-side">
                        <div className="process-image-wrapper">
                            <img src="/assets/process_1_final.png" alt="Search & Explore" />
                        </div>
                    </div>
                    <div className="process-marker-side">
                        <div className="process-marker">01</div>
                    </div>
                    <div className="process-content-side">
                        <div className="process-card">
                            <div className="card-step-niche">
                                <div className="joiner-step-top">
                                    <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                </div>
                                <div className="joiner-step-bottom">
                                    <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                </div>
                                <div className="card-step-badge">STEP 01</div>
                            </div>
                            <h3 className="process-card-title">Search & explore</h3>
                            <p className="process-card-description">Browse verified property listings by price, location, and lifestyle. Filter easily with smart tools and discover homes that fit your vibe. Start your journey from anywhere, right on your screen.</p>
                        </div>
                    </div>
                </div>

                {/*  Step 2  */}
                <div className="process-item reverse" data-step="2">
                    <div className="process-image-side">
                        <div className="process-image-wrapper">
                            <img src="/assets/process_2_highres.png" alt="Book a Tour" />
                        </div>
                    </div>
                    <div className="process-marker-side">
                        <div className="process-marker">02</div>
                    </div>
                    <div className="process-content-side">
                        <div className="process-card">
                            <div className="card-step-niche">
                                <div className="joiner-step-top">
                                    <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                </div>
                                <div className="joiner-step-bottom">
                                    <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                </div>
                                <div className="card-step-badge">STEP 02</div>
                            </div>
                            <h3 className="process-card-title">Book a tour</h3>
                            <p className="process-card-description">Pick your favorite properties and schedule tours online in seconds. Our team confirms quickly and arranges convenient times for you. See homes in person or through guided virtual tours.</p>
                        </div>
                    </div>
                </div>

                {/*  Step 3  */}
                <div className="process-item" data-step="3">
                    <div className="process-image-side">
                        <div className="process-image-wrapper">
                            <img src="/assets/process_3_new.png" alt="Make Your Move" />
                        </div>
                    </div>
                    <div className="process-marker-side">
                        <div className="process-marker">03</div>
                    </div>
                    <div className="process-content-side">
                        <div className="process-card">
                            <div className="card-step-niche">
                                <div className="joiner-step-top">
                                    <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                </div>
                                <div className="joiner-step-bottom">
                                    <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                </div>
                                <div className="card-step-badge">STEP 03</div>
                            </div>
                            <h3 className="process-card-title">Make your move</h3>
                            <p className="process-card-description">Get expert help with offers, negotiations, and all the paperwork. We guide you step by step, keeping everything clear and stress-free. From first offer to final signature, we're with you all the way.</p>
                        </div>
                    </div>
                </div>

                {/*  Step 4  */}
                <div className="process-item reverse" data-step="4">
                    <div className="process-image-side">
                        <div className="process-image-wrapper">
                            <img src="/assets/process_4_new.png" alt="Close & Celebrate" />
                        </div>
                    </div>
                    <div className="process-marker-side">
                        <div className="process-marker">04</div>
                    </div>
                    <div className="process-content-side">
                        <div className="process-card">
                            <div className="card-step-niche">
                                <div className="joiner-step-top">
                                    <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                </div>
                                <div className="joiner-step-bottom">
                                    <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                </div>
                                <div className="card-step-badge">STEP 04</div>
                            </div>
                            <h3 className="process-card-title">Close & celebrate</h3>
                            <p className="process-card-description">Sign the deal and receive your new keys with confidence. We'll ensure a smooth closing process without last-minute surprises. Enjoy the moment — your new home is officially yours!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    {/*  ========================================
         BLOG SECTION — STORIES & INSIGHTS
         ========================================  */}
    <section className="blog-section" id="blog">
        <div className="blog-container">
            <header className="blog-header sidebar-layout">
                <div className="blog-label">
                    <div className="label-square"></div>
                    BLOGS
                </div>
                <h2 className="blog-headline">News, stories, and inspiration for better living every day</h2>
            </header>

            <div className="blog-grid">
                {/*  Blog 1  */}
                <a href="#" className="blog-card">
                    <div className="blog-image-wrapper">
                        <img src="/assets/blog_homebuyer.png" alt="First-time homebuyer's guide" />
                    </div>
                    <div className="blog-card-content">
                        <div className="blog-card-meta">
                            <span>DEC 5, 2024</span>
                            <span className="separator">•</span>
                            <span>GUIDE</span>
                        </div>
                        <h3 className="blog-card-title">First-time homebuyer's guide — everything you need to know before...</h3>
                        <div className="blog-author">
                            <div className="author-avatar">
                                <img src="https://i.pravatar.cc/100?u=james" alt="James Miller" />
                            </div>
                            <span className="author-name">JAMES MILLER</span>
                        </div>
                    </div>
                </a>

                {/*  Blog 2  */}
                <a href="#" className="blog-card">
                    <div className="blog-image-wrapper">
                        <img src="/assets/blog_renting.png" alt="Renting guide" />
                    </div>
                    <div className="blog-card-content">
                        <div className="blog-card-meta">
                            <span>DEC 16, 2024</span>
                            <span className="separator">•</span>
                            <span>GUIDE</span>
                        </div>
                        <h3 className="blog-card-title">How to rent out your property safely and successfully — a complete owner's guide</h3>
                        <div className="blog-author">
                            <div className="author-avatar">
                                <img src="https://i.pravatar.cc/100?u=james" alt="James Miller" />
                            </div>
                            <span className="author-name">JAMES MILLER</span>
                        </div>
                    </div>
                </a>

                {/*  Blog 3  */}
                <a href="#" className="blog-card">
                    <div className="blog-image-wrapper">
                        <img src="/assets/blog_trends.png" alt="Real estate trends 2025" />
                    </div>
                    <div className="blog-card-content">
                        <div className="blog-card-meta">
                            <span>JUL 5, 2024</span>
                            <span className="separator">•</span>
                            <span>NEWS</span>
                        </div>
                        <h3 className="blog-card-title">Real estate trends 2025 — what's shaping the property market this year</h3>
                        <div className="blog-author">
                            <div className="author-avatar">
                                <img src="https://i.pravatar.cc/100?u=james" alt="James Miller" />
                            </div>
                            <span className="author-name">JAMES MILLER</span>
                        </div>
                    </div>
                </a>
            </div>

            <div className="blog-cta-container">
                <a href="#" className="blog-cta-btn">
                    <div className="flip-text">
                        <span>READ ALL BLOGS</span>
                        <span aria-hidden="true">READ ALL BLOGS</span>
                    </div>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
            </div>
        </div>
    </section>

    {/*  FAQ & Contact Section  */}
    <section id="faq" className="faq-section">
        <div className="faq-container">
            <div className="section-line"></div>
            
            <div className="faq-header sidebar-layout">
                <div className="faq-label">
                    <div className="label-square"></div>
                    FAQS
                </div>
                <h2 className="faq-headline">
                    Everything you wanted to know — and exactly how we can help.
                </h2>
            </div>

            <div className="faq-grid-body">
                {/*  Left Column: Contact Form  */}
                <div className="contact-column">
                    <div className="contact-card">
                        <h3 className="contact-title">We're just a form away—send us your question, and we'll be happy to help!</h3>
                        
                        <form action="mailto:info@wksc.com.ng" method="post" encType="text/plain" className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">NAME</label>
                                    <input type="text" id="name" name="name" placeholder="Jane Smith" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">PHONE</label>
                                    <input type="tel" id="phone" name="phone" placeholder="(123) 456-7890" />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="email">EMAIL</label>
                                <input type="email" id="email" name="email" placeholder="jane@framer.com" required />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="message">MESSAGE</label>
                                <textarea id="message" name="message" rows="5" placeholder="Write your message here" required></textarea>
                            </div>
                            
                            <button type="submit" className="form-submit-btn">
                                <div className="flip-text">
                                    <span>SEND MESSAGE</span>
                                    <span aria-hidden="true">SEND MESSAGE</span>
                                </div>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </form>
                    </div>
                </div>

                {/*  Right Column: Accordion  */}
                <div className="faq-column">
                    <div className="faq-accordion">
                        {/*  FAQ 1: Services  */}
                        <div className="faq-item">
                            <button className="faq-trigger">
                                <span className="faq-question">What services does your real estate company offer?</span>
                                <span className="faq-plus-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </span>
                            </button>
                            <div className="faq-panel">
                                <div className="faq-content">
                                    We offer houses and land sales for residential and commercial purposes, and agent partnership opportunities.
                                </div>
                            </div>
                        </div>

                        {/*  FAQ 2: Distinction  */}
                        <div className="faq-item">
                            <button className="faq-trigger">
                                <span className="faq-question">What sets your company apart from other real estate firms?</span>
                                <span className="faq-plus-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </span>
                            </button>
                            <div className="faq-panel">
                                <div className="faq-content">
                                    We stand out for our transparency, trusted processes, and commitment to client satisfaction. Our foundation in software engineering and infrastructure ensures we build functional ecosystems, not just houses.
                                </div>
                            </div>
                        </div>

                        {/*  FAQ 3: Locations  */}
                        <div className="faq-item">
                            <button className="faq-trigger">
                                <span className="faq-question">Where are your offices located?</span>
                                <span className="faq-plus-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </span>
                            </button>
                            <div className="faq-panel">
                                <div className="faq-content">
                                    Our offices are located in Abuja, Lagos, Yola, and Port Harcourt.
                                </div>
                            </div>
                        </div>

                        {/*  FAQ 4: Specialization  */}
                        <div className="faq-item">
                            <button className="faq-trigger">
                                <span className="faq-question">What types of properties do you specialise in?</span>
                                <span className="faq-plus-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </span>
                            </button>
                            <div className="faq-panel">
                                <div className="faq-content">
                                    We specialise in houses and lands for residential and commercial use, ranging from smart flats to luxury villas.
                                </div>
                            </div>
                        </div>

                        {/*  FAQ 5: Contact  */}
                        <div className="faq-item">
                            <button className="faq-trigger">
                                <span className="faq-question">How can I get in touch with your company for more information?</span>
                                <span className="faq-plus-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </span>
                            </button>
                            <div className="faq-panel">
                                <div className="faq-content">
                                    You can contact us via our website, phone, email (hello@wisdomkwatismartcity.com), or our various social media platforms.
                                </div>
                            </div>
                        </div>

                        {/*  FAQ 6: Approach  */}
                        <div className="faq-item">
                            <button className="faq-trigger">
                                <span className="faq-question">What is your company’s approach to customer service?</span>
                                <span className="faq-plus-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </span>
                            </button>
                            <div className="faq-panel">
                                <div className="faq-content">
                                    We focus on transparency, professionalism, and ensuring a smooth, stress-free experience for all our clients.
                                </div>
                            </div>
                        </div>

                        {/*  FAQ 7: Updates  */}
                        <div className="faq-item">
                            <button className="faq-trigger">
                                <span className="faq-question">How can I stay updated on your company’s latest news and listings?</span>
                                <span className="faq-plus-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </span>
                            </button>
                            <div className="faq-panel">
                                <div className="faq-content">
                                    Follow us on our social media platforms or subscribe to our newsletter in the footer below for real-time updates.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    {/*  ========================================
         PAGE FOOTER — BRAND AUTHORITY
         ========================================  */}
    

    

        </main>
    );
}
