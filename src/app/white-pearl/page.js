'use client';

import Link from 'next/link';

export default function Page() {
    return (
        <main>
    
    {/*  Custom Card Cursor  */}
    <div id="card-cursor" className="card-cursor">
        <span>VIEW</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    {/*  Hero Section  */}
    <section className="hd-hero">

    {/*  Gallery Lightbox (Fullscreen)  */}
    <div id="gallery-lightbox" className="hd-lightbox" aria-hidden="true">
        <div className="hd-lightbox-backdrop"></div>

        {/*  Close  */}
        <button className="hd-lightbox-close" aria-label="Close gallery">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {/*  Counter  */}
        <div className="hd-lightbox-counter"><span id="lb-current">1</span> / <span id="lb-total">5</span></div>

        {/*  Caption  */}
        <div className="hd-lightbox-caption">
            <strong>The White Pearl</strong> &mdash; Life Camp
        </div>

        {/*  Main image  */}
        <div className="hd-lightbox-stage">
            <img loading="lazy" id="lb-img" src={null} alt="Gallery image" />
        </div>

        {/*  Navigation  */}
        <button className="hd-lightbox-nav hd-lightbox-prev" id="lb-prev" aria-label="Previous image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button className="hd-lightbox-nav hd-lightbox-next" id="lb-next" aria-label="Next image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

        {/*  Thumbnail strip  */}
        <div className="hd-lightbox-thumbs" id="lb-thumbs">
            <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1YpYFPwZQUCf0k9tWJp13Y1kYzKe7npmJ%26sz=w1200" alt="1" data-index="0" referrerPolicy="no-referrer" />
            <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200" alt="2" data-index="1" referrerPolicy="no-referrer" />
            <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200" alt="3" data-index="2" referrerPolicy="no-referrer" />
            <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200" alt="4" data-index="3" referrerPolicy="no-referrer" />
            <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200"  alt="5" data-index="4" referrerPolicy="no-referrer" />
        </div>

        {/*  Hidden full src list  */}
        <div id="lb-srcs" style={{ display: "none" }}>
            <span>https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1YpYFPwZQUCf0k9tWJp13Y1kYzKe7npmJ%26sz=w1200</span> <span>https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200</span> <span>https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200</span> <span>https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200</span> <span>https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200</span>
    </div>
    </div>
        <div className="hd-hero-image">
            <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1YpYFPwZQUCf0k9tWJp13Y1kYzKe7npmJ%26sz=w1200" alt="The White Pearl" referrerPolicy="no-referrer" />
        </div>
        <div className="hd-hero-overlay"></div>
        <div className="hd-hero-content reveal-on-scroll">
            <div className="hd-hero-location">
                <div className="hd-location-dot"></div>
                Life Camp, Abuja
                <div className="hd-location-dot"></div>
            </div>
            <h1 className="hd-hero-title">The White Pearl</h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "18px", letterSpacing: "0.05em", opacity: "0.9", marginTop: "-10px" }}>2 Bedroom Apartment</p>
        </div>
    </section>

    {/*  Specs Bar  */}
    <div className="hd-container reveal-on-scroll">
        <div className="hd-specs-bar-wrapper">
            <div className="hd-specs-bar">
                {/*  ROW 1  */}
                <div className="hd-spec-item">
                    <i className="fa-solid fa-tag hd-spec-icon"></i>
                    <span className="hd-spec-label">Type</span>
                    <span className="hd-spec-value">2BR Apartment</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-money-bill-wave hd-spec-icon"></i>
                    <span className="hd-spec-label">Price</span>
                    <span className="hd-spec-value">$4,200,000</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-bed hd-spec-icon"></i>
                    <span className="hd-spec-label">Beds</span>
                    <span className="hd-spec-value">2</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-bath hd-spec-icon"></i>
                    <span className="hd-spec-label">Baths</span>
                    <span className="hd-spec-value">2</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-maximize hd-spec-icon"></i>
                    <span className="hd-spec-label">Size</span>
                    <span className="hd-spec-value">1,600 sq ft</span>
                </div>

                {/*  ROW 2  */}
                <div className="hd-spec-item">
                    <i className="fa-solid fa-vector-square hd-spec-icon"></i>
                    <span className="hd-spec-label">Lot Size</span>
                    <span className="hd-spec-value">N/A</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-calendar-days hd-spec-icon"></i>
                    <span className="hd-spec-label">Built in</span>
                    <span className="hd-spec-value">2024</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-stairs hd-spec-icon"></i>
                    <span className="hd-spec-label">Floors</span>
                    <span className="hd-spec-value">Multi</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-car-side hd-spec-icon"></i>
                    <span className="hd-spec-label">Parking</span>
                    <span className="hd-spec-value">2</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-id-badge hd-spec-icon"></i>
                    <span className="hd-spec-label">Property ID</span>
                    <span className="hd-spec-value">WKSC-PE-002</span>
                </div>
            </div>

            {/*  Download Plan Button  */}
            <div className="hd-download-wrapper">
                <a href="#" className="hd-download-btn">
                    <div className="flip-text">
                        <span>DOWNLOAD BROCHURE</span>
                        <span aria-hidden="true">DOWNLOAD BROCHURE</span>
                    </div>
                    <i className="fa-solid fa-cloud-arrow-down"></i>
                </a>
            </div>
        </div>
    </div>

    {/*  Main Content  */}
    <main className="hd-container">
        <div className="hd-main-grid">
            
            {/*  Left Column  */}
            <div className="hd-left-col">
                
                {/*  Description  */}
                <section className="hd-description reveal-on-scroll">
                    <p className="hd-description-text">The White Pearl offers elegant and efficient apartment living. With its contemporary design and prime location in Life Camp, it's the perfect choice for modern urban dwellers.</p>
                </section>

                {/*  Featured Estate  */}
                <section className="hd-estate-section reveal-on-scroll">
                    <div className="hd-section-line"></div>
                    <div className="hd-section-header">
                        <div className="hd-section-label">
                            <div className="label-square"></div>
                            <span className="label-text">FEATURED ESTATE</span>
                        </div>
                        <h2 className="hd-section-headline">Available in these estates</h2>
                    </div>
                    <div className="hd-estate-grid">
                        <a href="/projects" className="hd-estate-tag">
                            <i className="fa-solid fa-location-dot"></i>
                            Life Camp Estate
                        </a>
                    </div>
                </section>

            </div>

            {/*  Right Column (Sidebar)  */}
            <aside className="hd-right-col">
                <div className="hd-sidebar">
                    
                    {/*  Contact Card  */}
                    <div className="hd-agent-card reveal-on-scroll">
                        {/*  Header  */}
                        <div className="hd-agent-header">
                            <span className="hd-agent-listed-by">CONTACT US</span>
                            <h4 className="hd-agent-name">Customer Experience Centre</h4>
                            <p className="hd-agent-subtext">Reach our team directly for inquiries, viewing bookings, and investment consultations.</p>
                        </div>

                        <hr className="hd-agent-divider" />

                        {/*  Email row  */}
                        <div className="hd-agent-contact-row">
                            <div className="hd-agent-contact-info">
                                <span className="hd-contact-label">Email</span>
                                <a href="mailto:hello@wisdomkwatismartcity.com" className="hd-contact-value">hello@wisdomkwatismartcity.com</a>
                            </div>
                            <div className="hd-agent-contact-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><polyline points="2,4 12,13 22,4"></polyline></svg>
                            </div>
                        </div>

                        <hr className="hd-agent-divider" />

                        {/*  Phone row  */}
                        <div className="hd-agent-contact-row">
                            <div className="hd-agent-contact-info">
                                <span className="hd-contact-label">Phone</span>
                                <a href="tel:+2348100015555" className="hd-contact-value">+234 810 001 5555</a>
                            </div>
                            <div className="hd-agent-contact-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.07 2.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path></svg>
                            </div>
                        </div>
                    </div>

                    {/*  Inquiry Form  */}
                    <div className="hd-inquiry-box reveal-on-scroll">
                        <h3>Inquire about this property</h3>
                        <p>Our dedicated advisors will contact you shortly to arrange a private viewing or site tour.</p>
                        
                        <form className="hd-inquiry-form">
                            <div className="hd-form-group">
                                <input type="text" placeholder="Full Name" required />
                            </div>
                            <div className="hd-form-group">
                                <input type="email" placeholder="Email Address" required />
                            </div>
                            <div className="hd-form-group">
                                <input type="tel" placeholder="Phone Number" required />
                            </div>
                            <div className="hd-form-group">
                                <textarea rows="4" placeholder="I'm interested in The White Pearl. Please provide more details."></textarea>
                            </div>
                            <button type="submit" className="hd-submit-btn">
                                <div className="flip-text">
                                    <span>SEND INQUIRY</span>
                                    <span aria-hidden="true">SEND INQUIRY</span>
                                </div>
                            </button>
                        </form>
                    </div>

                </div>
            </aside>

        </div>
    </main>

    {/*  Related Listings  */}
    <section className="hd-related-section reveal-on-scroll">
        <div className="hd-container">
            <div className="hd-section-line"></div>
            <div className="hd-section-header">
                <div className="hd-section-label">
                    <div className="label-square"></div>
                    <span className="label-text">RELATED PROPERTIES</span>
                </div>
                <h2 className="hd-section-headline">
                    If this one caught your eye,<br /> these might just seal the deal.
                </h2>
            </div>
            
            <div className="portfolio-grid" id="related-properties-grid">
                {/*  Related Listing 1: Royal Emerald  */}
                <a href="/royal-emerald" className="ht-card reveal-on-scroll"
                     data-name="the royal emerald"
                     data-estate="guzape ii"
                     data-neighborhood="guzape ii"
                     data-type="detached"
                     data-specs="5 bedroom fully detached duplex">
                    <div className="ht-card-image">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200" alt="The Royal Emerald" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200'; }} />
                    </div>
                    <div className="ht-card-info">
                        <div className="ht-card-left">
                            <h3 className="ht-card-name">The Royal Emerald</h3>
                            <p className="ht-card-location">Premium Class • 5BR Fully Detached</p>
                        </div>
                        <div className="ht-card-right">
                            <p className="ht-card-type">Emerald Class Villa</p>
                            <div className="ht-card-specs">
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 5</span>
                                <span className="ht-dot"></span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 6</span>
                                <span className="ht-dot"></span>
                                <span>8,200 SQ FT</span>
                            </div>
                        </div>
                    </div>
                </a>

                {/*  Related Listing 2: Blue Sapphire  */}
                <a href="/blue-sapphire" className="ht-card reveal-on-scroll"
                     data-name="the blue sapphire"
                     data-estate="katampe extension"
                     data-neighborhood="katampe extension"
                     data-type="detached"
                     data-specs="4 bedroom fully detached duplex">
                    <div className="ht-card-image">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200" alt="The Blue Sapphire" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200'; }} />
                    </div>
                    <div className="ht-card-info">
                        <div className="ht-card-left">
                            <h3 className="ht-card-name">The Blue Sapphire</h3>
                            <p className="ht-card-location">Smart Class • 4BR Fully Detached</p>
                        </div>
                        <div className="ht-card-right">
                            <p className="ht-card-type">Sapphire Class Villa</p>
                            <div className="ht-card-specs">
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 4</span>
                                <span className="ht-dot"></span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 5</span>
                                <span className="ht-dot"></span>
                                <span>5,500 SQ FT</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <div className="hd-related-footer" style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
                <a href="/projects" className="btn-pill" style={{ backgroundColor: "var(--accent-green)", border: "none", color: "#000", fontWeight: "600" }}>
                    <div className="flip-text">
                        <span>VIEW PROPERTIES</span>
                        <span aria-hidden="true">VIEW PROPERTIES</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px" }}><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
            </div>
        </div>
    </section>

        </main>
    );
}
