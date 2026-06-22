// Server Component — no 'use client' needed.
// Only the dynamic client islands import Firebase:
//   HeroVideo, NeighborhoodSection, RecentListingsSection, RecentBlogsSection
import Link from 'next/link';
import Image from 'next/image';
import '../styles/blogs.css';
import HeroVideo from '../components/HeroVideo';
import NeighborhoodSection from '../components/NeighborhoodSection';
import RecentListingsSection from '../components/RecentListingsSection';
import RecentBlogsSection from '../components/RecentBlogsSection';
import ContactForm from '../components/ContactForm';
import ReviewsSection from '../components/ReviewsSection';


export default function Page() {

    return (
        <main>
            
    

    <div className="hero" role="banner">
        {/* Background Video – client island (needs useRef + play()) */}
        <HeroVideo />
        
        <div className="hero-container">
            <div className="hero-content">
                <h1 className="sr-only">Wisdom Kwati Smart City - Ultra-Modern Smart Cities & Real Estate in Nigeria</h1>
                <p className="headline reveal-type-lines" aria-hidden="true" role="heading" aria-level="2">Dream Large. <br /> Live Smart.</p>
            </div>

            <div className="hero-card glass-panel bloom-element delay-1">
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
        
    </div>

    {/*  Who We Are Section  */}
    <section id="about" className="who-we-are">
        <div className="who-container">
            <div className="who-label">
                <div className="label-square"></div>
                WHO WE ARE
            </div>
            <div className="who-content">
                <h2 className="who-headline reveal-on-scroll">
                    With a foundation in software engineering and infrastructure, we are building the functional ecosystem Africa deserves.
                </h2>
                <p className="who-text reveal-on-scroll">
                    Founded in 2019, WKSC is more than a real estate developer. We are ecosystem builders on a mission to deliver 1 million smart homes by 2035. By integrating IoT-ready infrastructure, solar grids, and water treatment plants from the ground up, we ensure every community is ready for the future.
                </p>
                <Link href="/about" className="btn-pill reveal-on-scroll">
                    <div className="flip-text">
                        <span>LEARN MORE</span>
                        <span aria-hidden="true">LEARN MORE</span>
                    </div>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
            </div>
        </div>
    </section>


    {/*  Neighborhood Section  */}
    <section id="neighborhood" className="neighborhood-section">
        <div className="neighborhood-container">
            <div className="section-line"></div>
            
            <div className="neighborhood-header sidebar-layout">
                <div className="neighborhood-label reveal-on-scroll">
                    <div className="label-square"></div>
                    NEIGHBORHOOD
                </div>
                <h2 className="neighborhood-headline reveal-on-scroll">
                    Where you live matters — pick the perfect spot
                </h2>
            </div>

            {/* Neighbourhood cards – client island (Firestore data) */}
            <NeighborhoodSection />

            <div className="neighborhood-footer">
                <Link href="/projects" className="btn-pill btn-black reveal-on-scroll">
                    <span className="flip-text">
                        <span className="original">VIEW ALL NEIGHBORHOODS</span>
                        <span className="remix">VIEW ALL NEIGHBORHOODS</span>
                    </span>
                    <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
            </div>
        </div>
    </section>

    <section id="house-portfolio" className="house-portfolio">
        <div className="portfolio-container-main">
            <div className="section-line"></div>
            
            <div className="portfolio-header sidebar-layout">
                <div className="portfolio-label reveal-on-scroll">
                    <div className="label-square"></div>
                    RECENT LISTINGS
                </div>
                <h2 className="portfolio-headline reveal-on-scroll">
                    Take a peek at hottest homes and discover what could be yours
                </h2>
            </div>

            {/* Recent listings cards – client island (Firestore data) */}
            <RecentListingsSection />

            <div className="portfolio-footer">
                <Link href="/house-types" className="btn-pill reveal-on-scroll">
                    <div className="flip-text">
                        <span>VIEW PROPERTIES</span>
                        <span aria-hidden="true">VIEW PROPERTIES</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
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
                <div className="services-label reveal-on-scroll">
                    <div className="label-square"></div>
                    SERVICES
                </div>
                <h2 className="services-headline reveal-on-scroll">
                    Service, support, and strategy — made simple from start to finish.
                </h2>
            </div>

            <div className="services-grid-body">
                <div className="services-list-column">
                    <div className="services-cards-stack">
                        {/*  1. Consultation  */}
                        <div className="service-card reveal-on-scroll">
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
                        <div className="service-card reveal-on-scroll">
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
                        <div className="service-card reveal-on-scroll">
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
                        <div className="service-card reveal-on-scroll">
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
                        <div className="service-card reveal-on-scroll">
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
                    <div className="services-image-wrapper reveal-on-scroll">
                        <div className="services-image-inner">
                            <Image width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://drive.google.com/thumbnail?id=1ikiZhEycVPG3CB1_OCXuCcmwXwbqF-kA&sz=w1200" alt="High-Fidelity Architectural Project" referrerPolicy="no-referrer" />
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
                <div className="uniqueness-label reveal-on-scroll">
                    <div className="label-square"></div>
                    OUR UNIQUENESS
                </div>
                <h2 className="uniqueness-headline reveal-on-scroll">
                    Why we're not just another agency — we're your real estate sidekick
                </h2>
            </div>

            <div className="uniqueness-grid">
                {/*  1. Verified Listings  */}
                <div className="uniqueness-card reveal-on-scroll">
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
                <div className="uniqueness-card reveal-on-scroll">
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
                <div className="uniqueness-card reveal-on-scroll">
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
                <div className="uniqueness-card reveal-on-scroll">
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
    <ReviewsSection />

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
                            <Image width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://drive.google.com/thumbnail?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam&sz=w1200" alt="Search & Explore" referrerPolicy="no-referrer" />
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
                            <Image width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://drive.google.com/thumbnail?id=1B3cgNstWKQojqadbYfvYhldFT961GRPK&sz=w1200" alt="Book a Tour" referrerPolicy="no-referrer" />
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
                            <Image width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://drive.google.com/thumbnail?id=1LYF8aZZPnWhg3my_LJH_GOPzy4AEKppk&sz=w1200" alt="Make Your Move" referrerPolicy="no-referrer" />
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
                            <Image width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://drive.google.com/thumbnail?id=1WyUxduCtGKp5W4B5xZ1liHas9U1oz-3r&sz=w1200" alt="Close & Celebrate" referrerPolicy="no-referrer" />
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
            <div className="blog-header sidebar-layout">
                <div className="blog-label">
                    <div className="label-square"></div>
                    BLOGS
                </div>
                <h2 className="blog-headline">News, stories, and inspiration for better living every day</h2>
            </div>

            <RecentBlogsSection />

            <div className="blog-cta-container">
                <Link href="/blogs" className="blog-cta-btn">
                    <div className="flip-text">
                        <span>READ ALL BLOGS</span>
                        <span aria-hidden="true">READ ALL BLOGS</span>
                    </div>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </Link>
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
                        
                        <ContactForm buttonClassName="form-submit-btn" defaultPhonePlaceholder="(123) 456-7890" />
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
