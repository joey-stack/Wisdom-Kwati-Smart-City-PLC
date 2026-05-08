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
            <strong>The Quartz</strong> &mdash; Gousa Idu Estate, Gousa Idu District
        </div>

        {/*  Main image  */}
        <div className="hd-lightbox-stage">
            <img id="lb-img" src={null} alt="Gallery image" />
        </div>

        {/*  Navigation  */}
        <button className="hd-lightbox-nav hd-lightbox-prev" id="lb-prev" aria-label="Previous image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button className="hd-lightbox-nav hd-lightbox-next" id="lb-next" aria-label="Next image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

        {/*  Thumbnail strip  */}
            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" alt="1" data-index="0" />
            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT" alt="2" data-index="1" />
            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" alt="3" data-index="2" />
            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" alt="4" data-index="3" />
            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612"  alt="5" data-index="4" />

        {/*  Hidden full src list  */}
        <div id="lb-srcs" style={{ display: "none" }}>
            <span>https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612</span>
            <span>https://images.weserv.nl/?url=drive.google.com/uc?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT</span>
            <span>https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ</span>
            <span>https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612</span>
            <span>https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612</span>
        </div>
    </div>
        <div className="hd-hero-image">
            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" alt="The Quartz" />
        </div>
        <div className="hd-hero-overlay"></div>
        <div className="hd-hero-content reveal-on-scroll">
            <div className="hd-hero-location">
                <div className="hd-location-dot"></div>
                Gousa Idu Estate, Gousa Idu District
                <div className="hd-location-dot"></div>
            </div>
            <h1 className="hd-hero-title">The Quartz</h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "18px", letterSpacing: "0.05em", opacity: "0.9", marginTop: "-10px" }}>For Sale</p>
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
                    <span className="hd-spec-value">For Sale</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-money-bill-wave hd-spec-icon"></i>
                    <span className="hd-spec-label">Price</span>
                    <span className="hd-spec-value">$8,100,000</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-bed hd-spec-icon"></i>
                    <span className="hd-spec-label">Beds</span>
                    <span className="hd-spec-value">4</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-bath hd-spec-icon"></i>
                    <span className="hd-spec-label">Baths</span>
                    <span className="hd-spec-value">4.5</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-maximize hd-spec-icon"></i>
                    <span className="hd-spec-label">Size</span>
                    <span className="hd-spec-value">3,000 sq ft</span>
                </div>

                {/*  ROW 2  */}
                <div className="hd-spec-item">
                    <i className="fa-solid fa-vector-square hd-spec-icon"></i>
                    <span className="hd-spec-label">Lot Size</span>
                    <span className="hd-spec-value">200 SQM</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-calendar-days hd-spec-icon"></i>
                    <span className="hd-spec-label">Built in</span>
                    <span className="hd-spec-value">2024</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-stairs hd-spec-icon"></i>
                    <span className="hd-spec-label">Floors</span>
                    <span className="hd-spec-value">2 stories</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-car-side hd-spec-icon"></i>
                    <span className="hd-spec-label">Parking</span>
                    <span className="hd-spec-value">2</span>
                </div>
                <div className="hd-spec-item">
                    <i className="fa-solid fa-id-badge hd-spec-icon"></i>
                    <span className="hd-spec-label">Property ID</span>
                    <span className="hd-spec-value">WKSC-QZ-011</span>
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
                    <p className="hd-description-text">Modern, sharp, and brilliantly designed. The Quartz is a 4-bedroom terrace duplex that prioritizes natural light and shared family spaces. Located in the rapidly developing Idu District, its a perfect home for a growing family seeking value and quality.</p>
                </section>

                {/*  Bento Gallery  */}
                <section className="hd-gallery reveal-on-scroll">
                    <div className="hd-gallery-item hd-gal-1">
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" alt="Property View 1" />
                    </div>
                    <div className="hd-gallery-item hd-gal-2">
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT" alt="Property View 2" />
                    </div>
                    <div className="hd-gallery-item hd-gal-3">
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" alt="Property View 3" />
                    </div>
                    <div className="hd-gallery-item hd-gal-4">
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" alt="Property View 4" />
                    </div>
                    <div className="hd-gallery-item hd-gal-5">
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" alt="Property View 5" />
                    </div>
                    
                    <a href="#" className="hd-view-all-btn" id="view-all-images-btn">
                        <div className="flip-text">
                            <span>VIEW ALL IMAGES</span>
                            <span aria-hidden="true">VIEW ALL IMAGES</span>
                        </div>
                    </a>
                </section>

                {/*  Amenities Section  */}
                <section className="hd-amenities-section reveal-on-scroll">
                    <div className="hd-section-line"></div>
                    <div className="hd-section-header">
                        <div className="hd-section-label">
                            <div className="label-square"></div>
                            <span className="label-text">AMENITIES</span>
                        </div>
                        <h2 className="hd-section-headline">Property Amenities</h2>
                    </div>
                    <div className="hd-amenities-grid">
                        <div className="hd-amenity-tag"><i className="fa-solid fa-water"></i> Lake View</div>
                        <div className="hd-amenity-tag"><i className="fa-solid fa-basket-shopping"></i> In-House Grocery Store</div>
                        <div className="hd-amenity-tag"><i className="fa-solid fa-solar-panel"></i> Solar Panels & Green Energy</div>
                        <div className="hd-amenity-tag"><i className="fa-solid fa-briefcase"></i> Co-Working Spaces</div>
                        <div className="hd-amenity-tag"><i className="fa-solid fa-utensils"></i> Fine Dining & Cafés</div>
                        <div className="hd-amenity-tag"><i className="fa-solid fa-fire-burner"></i> BBQ & Picnic Areas</div>
                        <div className="hd-amenity-tag"><i className="fa-solid fa-child"></i> Kids' Play Area</div>
                        <div className="hd-amenity-tag"><i className="fa-solid fa-bus"></i> Near bus stop</div>
                        <div className="hd-amenity-tag"><i className="fa-solid fa-subway"></i> Near subway</div>
                        <div className="hd-amenity-tag"><i className="fa-solid fa-door-open"></i> Balcony</div>
                    </div>
                    
                    <div className="hd-amenities-description">
                        <p>This residence redefines <strong>modern elegance and exclusivity</strong>. Featuring expansive interiors, outdoor entertainment areas, and breathtaking views, it is "crafted for those who seek the ultimate luxury lifestyle."</p>
                    </div>
                </section>

                {/*  Interior Features Section  */}
                <section className="hd-interior-section reveal-on-scroll">
                    <div className="hd-section-line"></div>
                    <div className="hd-section-header">
                        <div className="hd-section-label">
                            <div className="label-square"></div>
                            <span className="label-text">INTERIOR</span>
                        </div>
                        <h2 className="hd-section-headline">Interior Features</h2>
                    </div>
                    <p className="hd-section-subtitle">Below are the key interior specifications:</p>
                    
                    <div className="hd-interior-table">
                        <div className="hd-int-table-header">
                            <span>Feature</span>
                            <span>Details</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Bedrooms</span>
                            <span className="hd-int-value">5 (all ensuite)</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Bathrooms</span>
                            <span className="hd-int-value">6 full + 2 half</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Living room</span>
                            <span className="hd-int-value">Grand double-height ceiling — "floor-to-ceiling glass walls open to panoramic skyline"</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Kitchen</span>
                            <span className="hd-int-value">Gourmet Italian kitchen — "custom cabinetry, marble island, and premium appliances"</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Flooring</span>
                            <span className="hd-int-value">Imported white marble & hardwood</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Master suite</span>
                            <span className="hd-int-value">Private terrace + spa bathroom — "deep soaking tub with cinematic views"</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Home theater</span>
                            <span className="hd-int-value">Soundproof cinema room</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Wine cellar</span>
                            <span className="hd-int-value">Temperature-controlled</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Smart home</span>
                            <span className="hd-int-value">Fully automated lighting, sound & security</span>
                        </div>
                    </div>
                    
                    <div className="hd-interior-description">
                        <p>The villa interiors combine <strong>sleek design with timeless luxury</strong>. Expansive glass doors create seamless indoor-outdoor living, while every room showcases premium finishes and designer touches.</p>
                    </div>
                </section>

                {/*  Exterior & Building Features Section  */}
                <section className="hd-interior-section reveal-on-scroll">
                    <div className="hd-section-line"></div>
                    <div className="hd-section-header">
                        <div className="hd-section-label">
                            <div className="label-square"></div>
                            <span className="label-text">EXTERIOR</span>
                        </div>
                        <h2 className="hd-section-headline">Exterior & Building Features</h2>
                    </div>
                    <p className="hd-section-subtitle">Key details of the property exterior:</p>
                    
                    <div className="hd-interior-table">
                        <div className="hd-int-table-header">
                            <span>Feature</span>
                            <span>Details</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Architecture</span>
                            <span className="hd-int-value">Contemporary Mediterranean fusion</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Pool</span>
                            <span className="hd-int-value">Infinity-edge swimming pool — "overlooking the entire city"</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Outdoor kitchen</span>
                            <span className="hd-int-value">Fully equipped BBQ & bar lounge</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Patio</span>
                            <span className="hd-int-value">Covered dining terrace</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Rooftop</span>
                            <span className="hd-int-value">Lounge with fire pit — "360-degree panoramic sunset views"</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Landscaping</span>
                            <span className="hd-int-value">Lush private gardens & water features</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Garage</span>
                            <span className="hd-int-value">4-car with EV charging station</span>
                        </div>
                        <div className="hd-int-table-row">
                            <span className="hd-int-label">Security</span>
                            <span className="hd-int-value">Gated entry + 24/7 surveillance</span>
                        </div>
                    </div>
                </section>

                {/*  360 Video placeholder  */}
                <section className="hd-video-section reveal-on-scroll">
                    <div className="hd-video-placeholder">
                        <div className="hd-video-play">
                            <i className="fa-solid fa-play" style={{ fontSize: "24px", marginLeft: "5px" }}></i>
                        </div>
                        <h3>360° Virtual Tour</h3>
                        <p style={{ opacity: "0.7", maxWidth: "300px", fontSize: "14px" }}>Cinematic high-fidelity walkthrough coming soon. Experience the future of living.</p>
                    </div>
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
                        <a href="/karsana-district" className="hd-estate-tag">
                            <i className="fa-solid fa-location-dot"></i>
                            Whispering Pines
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
                                <textarea rows="4" placeholder="I'm interested in The Quartz. Please provide more details."></textarea>
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
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" alt="The Royal Emerald" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612'; }} />
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
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" alt="The Blue Sapphire" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ'; }} />
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
