import Link from 'next/link';

export default function Page() {
    return (
        <main className="about-page">

        {/*  About Hero Section  */}
        <section className="about-hero">
            <div className="hero-bg-container">
                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL" alt="WKSC Team Photo" className="hero-bg-blur" />
                <div className="hero-gradient-blur"></div>
                <div className="hero-grid-overlay"></div>
            </div>
            
            <div className="hero-content">
                <h1 className="hero-title">
                    Nigeria has a 17-million-home deficit. 
                    We're not waiting for someone else to fix&nbsp;it.
                </h1>
            </div>
        </section>

        {/*  About Mission Section  */}
        <section className="about-mission">
            <div className="mission-container container-1380">
                <div className="mission-grid">
                    <div className="mission-left reveal-on-scroll">
                        <div className="mission-intro-wrapper">
                            <p className="mission-intro">
                                Since 2019, WKSC has built far beyond walls. We build smart city ecosystems across Nigeria, closing the 17-million-home deficit with 1 million homes by 2035.
                            </p>
                        </div>
                        
                        <div className="stats-subgrid">
                            <div className="stat-card">
                                <div className="stat-value">
                                    <div className="stat-reveal-wrapper">
                                        <div className="stat-reveal-inner">
                                            <span className="count-up" data-target="20">0</span> +
                                        </div>
                                    </div>
                                </div>
                                <p className="stat-label">Active estate locations across major cities.</p>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">
                                    <div className="stat-reveal-wrapper">
                                        <div className="stat-reveal-inner">
                                            <span className="count-up" data-target="1">0</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="stat-label">Million smart homes planned for Africans by the year 2035</p>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">
                                    <div className="stat-reveal-wrapper">
                                        <div className="stat-reveal-inner">
                                            <span className="count-up" data-target="6">0</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="stat-label">Projected jobs from our one million homes target by 2035</p>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">
                                    <div className="stat-reveal-wrapper">
                                        <div className="stat-reveal-inner">
                                            <span className="count-up" data-target="2019">0</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="stat-label">Founded and registered with Corporate Affairs Commission, 2019.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mission-right reveal-on-scroll">
                        <div className="mission-image-wrapper">
                            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1EphZaDQ0d9sHKHve7TNmmsr_pFGEjzne" alt="WKSC Mission" className="mission-image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*  Company Background Section  */}
        <section className="company-background">
            <div className="background-container container-1380">
                <div className="section-line"></div>
                <div className="background-header sidebar-layout reveal-on-scroll">
                    <div className="background-label">
                        <div className="label-square"></div>
                        <span className="label-text">COMPANY BACKGROUND</span>
                    </div>
                    <h2 className="background-headline">
                        A Pan-African smart city developer building technologically integrated communities across Nigeria today.
                    </h2>
                </div>

                <div className="background-grid">
                    <div className="background-image-side reveal-on-scroll">
                        <div className="background-image-wrapper">
                            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1O3Z8A1oKWR8Dhd6b-42nbpVkHv4Zpzm0" alt="WKSC Safety and Quality Standards" className="background-image" />
                        </div>
                    </div>
                    
                    <div className="background-content-side reveal-on-scroll">
                        <div className="quote-card">
                            <blockquote className="background-quote">
                                “We don’t just build homes. We build the smart infrastructure of energy, water, and security that every African deserves.”
                            </blockquote>
                            <div className="quote-author">
                                <div className="author-avatar">
                                    <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa" alt="Wisdom E. Kwati — Chairman & CEO" />
                                </div>
                                <div className="author-info">
                                    <div className="author-signature">Wisdom E. Kwati</div>
                                    <div className="author-title">CHAIRMAN / CEO, WKSC.</div>
                                </div>
                            </div>
                        </div>

                        <div className="background-text">
                            <p>Wisdom Kwati Smart City (WKSC) is a leading multi-billion Naira ecosystem builder and a subsidiary of the Wisdom Kwati Group. Since 2019, we have built a portfolio of twenty active estates across Nigeria and the world.</p>
                            <p>Every client receives personalized attention, verified property options, and honest advice from our dedicated agents. Whether you are searching for a dream home or investment, we guide you with clarity and trust through our smart city ecosystem in Abuja, Lagos, and Adamawa States.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* Our History Section */}
        <section id="our-history" className="our-history">
            <div className="history-container container-1380">
                <div className="section-line"></div>
                
                <div className="history-content-layout">
                    <div className="history-sidebar">
                        <div className="history-sidebar-inner reveal-on-scroll">
                            <div className="history-label">
                                <div className="label-square"></div>
                                <span className="label-text">OUR JOURNEY</span>
                            </div>
                            <h2 className="history-sticky-headline">Our journey through the years</h2>
                            <p className="history-subheadline">
                                From private group into Africa's leading smart city developer across Nigeria
                            </p>
                        </div>
                    </div>

                    {/*  Right Column: Scrolling Timeline Items  */}
                    <div className="history-timeline">
                        <div className="history-spine">
                            <div className="history-spine-fill"></div>
                        </div>

                        {/*  2019 Milestone  */}
                        <div className="history-item reveal-on-scroll">
                            <div className="history-indicator"></div>
                            <div className="history-marker-line"></div>
                            <div className="history-card">
                                <div className="history-card-niche">
                                    <div className="joiner-niche-top">
                                        <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                    </div>
                                    <div className="joiner-niche-bottom">
                                        <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                    </div>
                                    <div className="history-card-badge">2019</div>
                                </div>
                                <h3 className="history-card-title">Company founding</h3>
                                <p className="history-card-text">
                                    Wisdom E. Kwati officially registered Wisdom Kwati Group with the CAC of Nigeria. His vision was to bridge the housing deficit by building self-sustaining cities. Armed with a deep software engineering background, smart city journey begins.
                                </p>

                            </div>
                        </div>

                        {/*  2021 Milestone  */}
                        <div className="history-item reveal-on-scroll">
                            <div className="history-indicator"></div>
                            <div className="history-marker-line"></div>
                            <div className="history-card">
                                <div className="history-card-niche">
                                    <div className="joiner-niche-top">
                                        <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                    </div>
                                    <div className="joiner-niche-bottom">
                                        <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                    </div>
                                    <div className="history-card-badge">2021</div>
                                </div>
                                <h3 className="history-card-title">Major regional scaleup</h3>
                                <p className="history-card-text">
                                    By 2021, WKSC had expanded its land acquisition drive beyond Abuja. We began developing sustainable residential ecosystems in Adamawa State, Lagos, and Port Harcourt for all Nigerians
                                </p>
                            </div>
                        </div>

                        {/*  2022 Milestone  */}
                        <div className="history-item reveal-on-scroll">
                            <div className="history-indicator"></div>
                            <div className="history-marker-line"></div>
                            <div className="history-card">
                                <div className="history-card-niche">
                                    <div className="joiner-niche-top">
                                        <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                    </div>
                                    <div className="joiner-niche-bottom">
                                        <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                    </div>
                                    <div className="history-card-badge">2022</div>
                                </div>
                                <h3 className="history-card-title">Infrastructure leadership</h3>
                                <p className="history-card-text">
                                    We moved beyond simple home building. WKSC began owning and operating the entire smart city utility chain—providing independent power, water, and security..
                                </p>

                            </div>
                        </div>

                        {/*  2023 Milestone  */}
                        <div className="history-item reveal-on-scroll">
                            <div className="history-indicator"></div>
                            <div className="history-marker-line"></div>
                            <div className="history-card">
                                <div className="history-card-niche">
                                    <div className="joiner-niche-top">
                                        <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                    </div>
                                    <div className="joiner-niche-bottom">
                                        <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                    </div>
                                    <div className="history-card-badge">2023</div>
                                </div>
                                <h3 className="history-card-title">Global ecosystem hub</h3>
                                <p className="history-card-text">
                                    WKSC established Singapore as its global operational hub. This strategic move strengthens technology integration and streamlines supply chains for smart city projects across Africa..
                                </p>

                            </div>
                        </div>

                        {/*  2035 Milestone  */}
                        <div className="history-item reveal-on-scroll">
                            <div className="history-indicator"></div>
                            <div className="history-marker-line"></div>
                            <div className="history-card">
                                <div className="history-card-niche">
                                    <div className="joiner-niche-top">
                                        <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                    </div>
                                    <div className="joiner-niche-bottom">
                                        <svg viewBox="0 0 8 8"><path d="M8 0H3A5 5 0 0 1 8 5V0Z"></path></svg>
                                    </div>
                                    <div className="history-card-badge">2035</div>
                                </div>
                                <h3 className="history-card-title">The one million homes journey</h3>
                                <p className="history-card-text">
                                    WKSC remains grounded in its mission to build one million African homes by 2035. Every smart city project is more than a transaction; it is a step toward closing the 17-million-home deficit and creating six million jobs for the continent
                                </p>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>        </section>

        {/*  Our Differences Section  */}
        <section id="our-differences" className="our-differences">
            <div className="differences-container container-1380">
                <div className="section-line"></div>
                
                <div className="diff-main-wrapper">
                    {/*  First Div: Top Section (Horizontal Align)  */}
                    <div className="diff-top-row">
                        {/*  Left: Headline and Label  */}
                        <div className="diff-intro-col reveal-on-scroll">
                            <div className="differences-label">
                                <div className="label-square"></div>
                                <span className="label-text">OUR DIFFERENCES</span>
                            </div>
                            <h2 className="differences-headline">
                                We don't just build walls. We are a vision of what cities can become when intelligent infrastructure meets innovation.
                            </h2>
                        </div>

                        {/*  Right: Feature List  */}
                        <div className="diff-list-col reveal-on-scroll">
                            <div className="differences-list">
                                <div className="diff-list-item">
                                    <div className="diff-icon"><i className="fa-solid fa-user-tie"></i></div>
                                    <div className="diff-text">
                                        <h3>Professionalism</h3>
                                        <p>Expert investment advisory and customized financial planning.</p>
                                    </div>
                                </div>
                                <div className="diff-list-item">
                                    <div className="diff-icon"><i className="fa-solid fa-bullseye"></i></div>
                                    <div className="diff-text">
                                        <h3>Intentionality</h3>
                                        <p>Every layout includes water treatment and solar-powered lighting.</p>
                                    </div>
                                </div>
                                <div className="diff-list-item">
                                    <div className="diff-icon"><i className="fa-solid fa-microchip"></i></div>
                                    <div className="diff-text">
                                        <h3>Innovation</h3>
                                        <p>Smart security cameras and IoT integration for 24-hour monitoring.</p>
                                    </div>
                                </div>
                                <div className="diff-list-item">
                                    <div className="diff-icon"><i className="fa-solid fa-medal"></i></div>
                                    <div className="diff-text">
                                        <h3>Excellence</h3>
                                        <p>Delivering 20 active estate locations across Nigeria since 2019.</p>
                                    </div>
                                </div>
                                <div className="diff-list-item">
                                    <div className="diff-icon"><i className="fa-solid fa-shield-halved"></i></div>
                                    <div className="diff-text">
                                        <h3>Integrity</h3>
                                        <p>Radical transparency backed by uncompromising corporate governance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Second Div: Bottom Section (Vertical Stack)  */}
                    <div className="diff-bottom-row reveal-on-scroll">
                        <div className="differences-values-card">
                            <div className="values-grid">
                                <div className="value-item">
                                    <div className="value-icon"><i className="fa-solid fa-city"></i></div>
                                    <h3>Intelligent infrastructure, not just houses.</h3>
                                    <p>We own the ecosystem your home depends on. Every estate is equipped with central water treatment plants, solar street lighting, and tarred, formally named road networks.</p>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon"><i className="fa-solid fa-earth-africa"></i></div>
                                    <h3>A Pan-African mission with actual scale.</h3>
                                    <p>Registered on 1 April 2019, WKSC actively builds across Abuja, Port Harcourt, Lagos, and Yola, supported by our operational hubs in Singapore and the USA.</p>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon"><i className="fa-solid fa-house-circle-check"></i></div>
                                    <h3>Closing the 17-million-home deficit.</h3>
                                    <p>We are not waiting for someone else to fix Africa's housing crisis. Our massive transformative purpose is to deliver 1 million sustainable African homes by 2035.</p>
                                </div>
                                <div className="value-item">
                                    <div className="value-icon"><i className="fa-solid fa-chart-line"></i></div>
                                    <h3>Customized investment advisory.</h3>
                                    <p>Your land appreciates; your financial plan should keep pace. We develop tailored solutions spanning real estate investment, asset planning, and tax optimization.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*  Our Team Section  */}
        <section id="our-team" className="our-team">
            <div className="team-container container-1380">
                <div className="section-line"></div>
                
                <div className="team-header sidebar-layout reveal-on-scroll">
                    <div className="team-label">
                        <div className="label-square"></div>
                        <span className="label-text">OUR TEAM</span>
                    </div>
                    <h2 className="team-headline">Get to know the team that's as passionate about your project as you are.</h2>
                </div>                <div className="team-grid">
                    {/*  Wisdom E. Kwati (Chairman WKSC PLC)  */}
                    <div className="team-card">
                        <div className="team-image-wrapper">
                            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa" alt="Wisdom E. Kwati - Chairman WKSC PLC" className="team-image" />
                        </div>
                        <div className="team-details">
                            <h3 className="team-name">Wisdom E. Kwati</h3>
                            <span className="team-location">CHAIRMAN WKSC PLC</span>
                            
                            <div className="agent-contact-rows">
                                <div className="agent-contact-row">
                                    <i className="fa-solid fa-envelope"></i>
                                    <span>ceo@wksmartcity.com</span>
                                </div>
                                <div className="agent-contact-row">
                                    <i className="fa-solid fa-award"></i>
                                    <span>Most Respected CEO in Real Estate</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Y.G. Ballah (COO, CEO WKSC PLC)  */}
                    <div className="team-card">
                        <div className="team-image-wrapper">
                            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1cFMWWIyGiJ4lOW3XjoC2M9NQ3ZvRaw9u" alt="Y.G. Ballah - COO, CEO WKSC PLC" className="team-image" />
                        </div>
                        <div className="team-details">
                            <h3 className="team-name">Y.G. Ballah</h3>
                            <span className="team-location">COO, CEO WKSC PLC</span>
                            
                            <div className="agent-contact-rows">
                                <div className="agent-contact-row">
                                    <i className="fa-solid fa-anchor"></i>
                                    <span>Former AGM, Nigeria Ports Authority</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Zara Ruth Kwati (MD WKSC PLC)  */}
                    <div className="team-card">
                        <div className="team-image-wrapper">
                            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1t5F9gOS8mxk5mFyanBk00NVSiyqZrK7M" alt="Zara Ruth Kwati - MD WKSC PLC" className="team-image" />
                        </div>
                        <div className="team-details">
                            <h3 className="team-name">Zara Ruth Kwati</h3>
                            <span className="team-location">MD WKSC PLC</span>
                            
                            <div className="agent-contact-rows">
                                <div className="agent-contact-row">
                                    <i className="fa-solid fa-users-gear"></i>
                                    <span>Strategic Project Management</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Richard A. Igoche (MD WKSC Karshi)  */}
                    <div className="team-card">
                        <div className="team-image-wrapper">
                            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=19v15e89T7AL1DotSQ66-1z5UtfZgcmFz" alt="Richard A. Igoche - MD WKSC Karshi" className="team-image" />
                        </div>
                        <div className="team-details">
                            <h3 className="team-name">Richard A. Igoche</h3>
                            <span className="team-location">MD WKSC KARSHI</span>
                            
                            <div className="agent-contact-rows">
                                <div className="agent-contact-row">
                                    <i className="fa-solid fa-building-circle-check"></i>
                                    <span>Smart City Operations</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Bar. Samuel Adeolu (Legal Adviser, WKSC PLC)  */}
                    <div className="team-card">
                        <div className="team-image-wrapper">
                            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1is5fT1cRu4MenMbZAn34-V1FFsrTtOLz" alt="Bar. Samuel Adeolu - Legal Adviser, WKSC PLC" className="team-image" />
                        </div>
                        <div className="team-details">
                            <h3 className="team-name">Bar. Samuel Adeolu</h3>
                            <span className="team-location">LEGAL ADVISER, WKSC PLC</span>
                            
                            <div className="agent-contact-rows">
                                <div className="agent-contact-row">
                                    <i className="fa-solid fa-scale-balanced"></i>
                                    <span>Corporate Governance</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Mr Okpanachi Ogbelu (Accountant, WKSC PLC)  */}
                    <div className="team-card">
                        <div className="team-image-wrapper">
                            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1Apgzo8_xMD2ul-fccqJlO9EFkkzmGUhu" alt="Mr Okpanachi Ogbelu - Accountant, WKSC PLC" className="team-image" />
                        </div>
                        <div className="team-details">
                            <h3 className="team-name">Mr Okpanachi Ogbelu</h3>
                            <span className="team-location">ACCOUNTANT, WKSC PLC</span>
                            
                            <div className="agent-contact-rows">
                                <div className="agent-contact-row">
                                    <i className="fa-solid fa-file-invoice-dollar"></i>
                                    <span>Financial Auditing</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*  Miss Esther Izu (HR WKSC PLC)  */}
                    <div className="team-card">
                        <div className="team-image-wrapper">
                            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1s3a4yhpY4w9WjhsZD0r3Zs6Q2G0CzQeZ" alt="Miss Esther Izu - HR WKSC PLC" className="team-image" />
                        </div>
                        <div className="team-details">
                            <h3 className="team-name">Miss Esther Izu</h3>
                            <span className="team-location">HR WKSC PLC</span>
                            
                            <div className="agent-contact-rows">
                                <div className="agent-contact-row">
                                    <i className="fa-solid fa-user-group"></i>
                                    <span>Talent Management</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*  --- Careers Section ---  */}
        <section id="careers" className="career-section" style={{ background: "var(--bg-main)", paddingBottom: "140px" }}>
            <div className="container container-1380">
                <div className="section-line"></div>
                
                <div className="career-header sidebar-layout reveal-on-scroll">
                    <div className="career-label">
                        <div className="label-square"></div>
                        <span className="label-text">CAREER - OPEN POSITIONS</span>
                    </div>
                    <h2 className="career-headline">Join a company where ideas matter, growth is real, and Mondays actually feel good.</h2>
                </div>

                <div className="career-grid">
                    {/*  Marketing Coordinator  */}
                    <div className="career-card">
                        <h3 className="job-title">Marketing Coordinator</h3>
                        
                        <div className="job-info-list">
                            <div className="job-info-pill">
                                <i className="fa-solid fa-calendar-days"></i>
                                <span>JAN 7, 2026</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-clock"></i>
                                <span>FULL TIME</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-naira-sign"></i>
                                <span>₦1.2M - ₦1.8M / YEAR</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-location-dot"></i>
                                <span>ABUJA (HYBRID)</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-laptop-house"></i>
                                <span>HYBRID</span>
                            </div>
                        </div>

                        <a href="/careers" className="job-cta">
                            <div className="flip-text">
                                <span>VIEW JOB DETAILS</span>
                                <span aria-hidden="true">VIEW JOB DETAILS</span>
                            </div>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a>
                    </div>

                    {/*  Real Estate Agent  */}
                    <div className="career-card">
                        <h3 className="job-title">Real Estate Agent</h3>
                        
                        <div className="job-info-list">
                            <div className="job-info-pill">
                                <i className="fa-solid fa-calendar-days"></i>
                                <span>JAN 16, 2026</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-clock"></i>
                                <span>FULL TIME</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-percent"></i>
                                <span>COMMISSION-BASED</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-location-dot"></i>
                                <span>LAGOS, NIGERIA</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-building"></i>
                                <span>ON SITE</span>
                            </div>
                        </div>

                        <a href="/careers" className="job-cta">
                            <div className="flip-text">
                                <span>VIEW JOB DETAILS</span>
                                <span aria-hidden="true">VIEW JOB DETAILS</span>
                            </div>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a>
                    </div>

                    {/*  Property Manager  */}
                    <div className="career-card">
                        <h3 className="job-title">Property Manager</h3>
                        
                        <div className="job-info-list">
                            <div className="job-info-pill">
                                <i className="fa-solid fa-calendar-days"></i>
                                <span>JUN 8, 2026</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-clock"></i>
                                <span>FULL TIME</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-naira-sign"></i>
                                <span>₦2M - ₦3.5M / YEAR</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-location-dot"></i>
                                <span>PORT HARCOURT</span>
                            </div>
                            <div className="job-info-pill">
                                <i className="fa-solid fa-building"></i>
                                <span>ON SITE</span>
                            </div>
                        </div>

                        <a href="/careers" className="job-cta">
                            <div className="flip-text">
                                <span>VIEW JOB DETAILS</span>
                                <span aria-hidden="true">VIEW JOB DETAILS</span>
                            </div>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        {/*  About Recognition Section  */}
        <section className="recognition-section reveal-on-scroll">
            <div className="recognition-container container-1380">
                {/*  Header Div: Label + Headline  */}
                <div className="recognition-header sidebar-layout">
                    <div className="recognition-label">
                        <div className="label-square"></div>
                        RECOGNITION
                    </div>
                    
                    <h2 className="recognition-headline">
                        Here are the awards and <br />
                        accolades that make us proud.
                    </h2>
                </div>

                {/*  Awards List Div: Below Header (Full Width)  */}
                <div className="recognition-list">
                    {/*  Award 1  */}
                    <div className="recognition-item">
                        <div className="recognition-logo">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                        </div>
                        <div className="recognition-info">
                            <h3 className="recognition-title">Most Respected CEO in Real Estate — Real Estate Leadership & Excellence Awards</h3>
                            <p className="recognition-desc">Recognized for visionary leadership, transformative smart city initiatives, and excellence in large-scale ecosystem development across Nigeria.</p>
                        </div>
                        <div className="recognition-year">2024</div>
                    </div>

                    {/*  Award 2  */}
                    <div className="recognition-item">
                        <div className="recognition-logo">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
                        </div>
                        <div className="recognition-info">
                            <h3 className="recognition-title">Excellence in Smart City Infrastructure — Nigeria Property Merit Awards</h3>
                            <p className="recognition-desc">Awarded for the seamless integration of IoT, solar power, and advanced water treatment systems in modern residential communities.</p>
                        </div>
                        <div className="recognition-year">2023</div>
                    </div>

                    {/*  Award 3  */}
                    <div className="recognition-item">
                        <div className="recognition-logo">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
                        </div>
                        <div className="recognition-info">
                            <h3 className="recognition-title">Most Innovative Real Estate Brand — Africa Housing & Investment Summit</h3>
                            <p className="recognition-desc">Honored for pioneering a data-driven approach to real estate and setting new benchmarks for technical integrity in the private sector.</p>
                        </div>
                        <div className="recognition-year">2022</div>
                    </div>

                    {/*  Award 4  */}
                    <div className="recognition-item">
                        <div className="recognition-logo">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11.5 2 L2 6 L2 12 C2 16.14 5.02 20.38 11.5 22 C17.98 20.38 21 16.14 21 12 L21 6 L11.5 2 Z"></path><path d="M7 12 L10 15 L16 9"></path></svg>
                        </div>
                        <div className="recognition-info">
                            <h3 className="recognition-title">Customer Choice Award: Best Community Developer — National Real Estate Summit</h3>
                            <p className="recognition-desc">Voted by homeowners for transparency, rapid delivery, and outstanding after-sales support in the Abuja and Lagos regions.</p>
                        </div>
                        <div className="recognition-year">2022</div>
                    </div>
                </div>
            </div>
        </section>
        </main>
    );
}
