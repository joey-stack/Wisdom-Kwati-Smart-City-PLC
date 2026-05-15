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
    <section className="pd-hero">
        <div className="pd-hero-image">
            <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=11vBQAjvTsw6D_nR3Llikz7MLeCMUWJ34%26sz=w1200" alt="Epe Smart City" referrerPolicy="no-referrer" />
        </div>
        <div className="pd-hero-overlay"></div>
        <div className="pd-hero-content reveal-on-scroll">
            <h1 className="pd-hero-title">Epe Smart City</h1>
            <p className="pd-hero-description">A future-forward residential hub in the new Lagos corridor, designed for sustainable living and rapid capital appreciation.</p>
            <a href="/epe-smart-city/updates" className="btn-pill" style={{ marginTop: "30px", display: "inline-flex", background: "var(--accent-green)", color: "var(--text-primary)", border: "none" }}>
                <div className="flip-text">
                    <span>VIEW SITE UPDATES</span>
                    <span aria-hidden="true">VIEW SITE UPDATES</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px" }}><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
        </div>
    </section>

    <div className="container-1380">
        <div className="pd-main-layout">
            
            {/*  Left Column  */}
            <div className="pd-left-col">
                
                {/*  Description  */}
                <section className="pd-section reveal-on-scroll">
                    <p style={{ fontSize: "20px", lineHeight: "1.6", color: "var(--text-primary)", marginBottom: "40px" }}>
                        Epe Smart City is the heartbeat of the 'New Lagos'. Positioned strategically within the fastest-growing investment corridor in Nigeria, this project offers investors and families a chance to secure land in a master-planned ecosystem featuring sustainable power, high-speed connectivity, and world-class security.
                    </p>
                    
                    <div className="pd-section-title">District Highlights</div>
                    <ul className="pd-highlights">
                        
            <li>Eco-integrated solar power & central utilities</li>
            <li>Proximity to the proposed Lekki International Airport</li>
            <li>Advanced storm drainage & road engineering</li>
            <li>24/7 Gated security & CCTV monitoring</li>
            <li>Master-planned commercial and residential zones</li>
        
                    </ul>
                </section>

                {/*  Estate Vibe  */}
                <section className="pd-section reveal-on-scroll">
                    <div className="pd-section-title">Real Estate Vibe</div>
                    <div className="pd-table-container">
                        <table className="pd-table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Specifications & Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                
            <tr><td className="pd-label-cell">Primary Title</td><td>Governor's Consent / C of O</td></tr>
            <tr><td className="pd-label-cell">Security Level</td><td>Secured Gated Community</td></tr>
            <tr><td className="pd-label-cell">Infrastructure</td><td>Sustainable Eco-Smart Grid</td></tr>
            <tr><td className="pd-label-cell">Atmosphere</td><td>Modern / Emerging / High-Growth</td></tr>
        
                            </tbody>
                        </table>
                    </div>
                </section>

                {/*  Nearby Facilities  */}
                <section className="pd-section reveal-on-scroll">
                    <div className="pd-section-title">Nearby Facilities</div>
                    <div className="pd-table-container">
                        <table className="pd-table">
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Establishment</th>
                                    <th>Travel Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                
            <tr><td className="pd-label-cell">Health</td><td>Epe General Hospital</td><td>10 mins</td></tr>
            <tr><td className="pd-label-cell">Shopping</td><td>Alaro City Mall (Proposed)</td><td>15 mins</td></tr>
            <tr><td className="pd-label-cell">Aviation</td><td>Lekki Int'l Airport (Proposed)</td><td>20 mins</td></tr>
            <tr><td className="pd-label-cell">Education</td><td>Pan-Atlantic University</td><td>25 mins</td></tr>
        
                            </tbody>
                        </table>
                    </div>
                </section>

                {/*  Market Snapshot  */}
                <section className="pd-section reveal-on-scroll">
                    <div className="pd-section-title">Market Snapshot</div>
                    <div className="pd-table-container">
                        <table className="pd-table">
                            <thead>
                                <tr>
                                    <th>Plot Category</th>
                                    <th>Price Range</th>
                                    <th>Investment Outlook</th>
                                </tr>
                            </thead>
                            <tbody>
                                
            <tr><td className="pd-label-cell">Standard Plots</td><td>₦15M – ₦35M</td><td>Rapid Capital Growth</td></tr>
            <tr><td className="pd-label-cell">Corner Plots</td><td>₦40M – ₦65M</td><td>Premium Asset Value</td></tr>
            <tr><td className="pd-label-cell">Estate Lots (Bulk)</td><td>₦100M – ₦250M+</td><td>Developer Portfolios</td></tr>
        
                            </tbody>
                        </table>
                    </div>
                </section>

                {/*  Plot Sizes  */}
                <section className="pd-section reveal-on-scroll">
                    <div className="pd-section-title">Available Plot Sizes</div>
                    <div className="pd-table-container">
                        <table className="pd-table">
                            <thead>
                                <tr>
                                    <th>Plot Type</th>
                                    <th>Dimensions</th>
                                    <th>Area</th>
                                    <th>Availability</th>
                                </tr>
                            </thead>
                            <tbody>
                                
            <tr><td className="pd-label-cell">Residential Plot</td><td>15m × 30m</td><td>450 sqm</td><td>Available</td></tr>
            <tr><td className="pd-label-cell">Executive Plot</td><td>18m × 36m</td><td>648 sqm</td><td>Available</td></tr>
            <tr><td className="pd-label-cell">Commercial Lot</td><td>30m × 60m</td><td>1,800 sqm</td><td>Limited</td></tr>
        
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>

            {/*  Right Column (Sidebar)  */}
            <aside className="pd-sidebar">
                <div className="pd-sidebar-header reveal-on-scroll">
                    <div className="pd-sidebar-label">
                        OTHER NEIGHBORHOODS
                    </div>
                    <h2 className="pd-sidebar-headline">Each area has its own charm — let’s help you find your match.</h2>
                </div>

                <div className="pd-compact-list reveal-on-scroll">
                    
                    <a href="/katampe-extension" className="pd-compact-item">
                        <div className="pd-compact-flipper">
                            <div className="pd-compact-front">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200" alt="Sunset Haven" className="pd-compact-thumb"  referrerPolicy="no-referrer"/>
                                <div className="pd-compact-info">
                                    <h4>Sunset Haven</h4>
                                    <p>Katampe Ext.</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200" alt="Sunset Haven" className="pd-compact-thumb"  referrerPolicy="no-referrer"/>
                                <div className="pd-compact-info">
                                    <h4>Sunset Haven</h4>
                                    <p>Katampe Ext.</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="/karsana-district" className="pd-compact-item">
                        <div className="pd-compact-flipper">
                            <div className="pd-compact-front">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200" alt="Whispering Pines" className="pd-compact-thumb"  referrerPolicy="no-referrer"/>
                                <div className="pd-compact-info">
                                    <h4>Whispering Pines</h4>
                                    <p>Karsana</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200" alt="Whispering Pines" className="pd-compact-thumb"  referrerPolicy="no-referrer"/>
                                <div className="pd-compact-info">
                                    <h4>Whispering Pines</h4>
                                    <p>Karsana</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="/mabushi-district" className="pd-compact-item">
                        <div className="pd-compact-flipper">
                            <div className="pd-compact-front">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200" alt="Ellington Villa" className="pd-compact-thumb"  referrerPolicy="no-referrer"/>
                                <div className="pd-compact-info">
                                    <h4>Ellington Villa</h4>
                                    <p>Mabushi</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200" alt="Ellington Villa" className="pd-compact-thumb"  referrerPolicy="no-referrer"/>
                                <div className="pd-compact-info">
                                    <h4>Ellington Villa</h4>
                                    <p>Mabushi</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="/guzape-estate" className="pd-compact-item">
                        <div className="pd-compact-flipper">
                            <div className="pd-compact-front">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200" alt="Nimi Hills" className="pd-compact-thumb"  referrerPolicy="no-referrer"/>
                                <div className="pd-compact-info">
                                    <h4>Nimi Hills</h4>
                                    <p>Guzape</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200" alt="Nimi Hills" className="pd-compact-thumb"  referrerPolicy="no-referrer"/>
                                <div className="pd-compact-info">
                                    <h4>Nimi Hills</h4>
                                    <p>Guzape</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                
                <div className="pd-sidebar-card reveal-on-scroll" style={{ marginTop: "40px", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "4px", padding: "24px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-green)", display: "block", marginBottom: "16px" }}>Project Advisor</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200" alt="Ahmed Bello" style={{ width: "56px", height: "56px", borderRadius: "4px", objectFit: "cover", flexShrink: "0" }} referrerPolicy="no-referrer" />
                        <div>
                            <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>Ahmed Bello</h3>
                            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "0" }}>Lagos Region Specialist</p>
                        </div>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>&ldquo;Epe is the smartest land investment in Lagos right now. Secure your future in the next major urban hub.&rdquo;</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                        <a href="tel:+2348100015555" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}><i className="fa-solid fa-phone" style={{ width: "14px", color: "var(--accent-green)" }}></i> +234 810 001 5555</a>
                        <a href="mailto:a.bello@wisdomkwatismartcity.com" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}><i className="fa-solid fa-envelope" style={{ width: "14px", color: "var(--accent-green)" }}></i> a.bello@wisdomkwatismartcity.com</a>
                    </div>
                    <a href="/contact" className="btn-pill" style={{ width: "100%", justifyContent: "center", background: "var(--text-primary)", color: "#fff", border: "none" }}>
                        <div className="flip-text">
                            <span>BOOK A CONSULTATION</span>
                            <span aria-hidden="true">BOOK A CONSULTATION</span>
                        </div>
                    </a>
                </div>
            </aside>

        </div>
    </div>

    {/*  House Types Section  */}
    <section className="pd-properties-section" style={{ background: "var(--bg-main)" }}>
        <div className="portfolio-container-main" style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 40px" }}>
            <div className="section-line"></div>
            
            <div className="portfolio-header sidebar-layout" style={{ marginTop: "60px" }}>
                <div className="portfolio-label" style={{ fontFamily: "var(--font-main)", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "12px", alignSelf: "flex-start", marginTop: "10px" }}>
                    <div className="label-square" style={{ width: "8px", height: "8px", background: "currentColor" }}></div>
                    HOUSE TYPES
                </div>
                <h2 className="portfolio-headline" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "42px", fontWeight: "400", lineHeight: "1.1", letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "0", maxWidth: "600px" }}>
                    House types in Epe Smart City
                </h2>
            </div>

            <div className="portfolio-grid" style={{ marginTop: "60px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "40px" }}>
                <a href="/blue-sapphire" className="ht-card reveal-on-scroll">
                    <div className="ht-card-image">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200" alt="The Sapphire" referrerPolicy="no-referrer" />
                    </div>
                    <div className="ht-card-info">
                        <div className="ht-card-left">
                            <h3 className="ht-card-name">The Sapphire</h3>
                            <p className="ht-card-location">Premium Class • 4BR Smart Villa</p>
                        </div>
                        <div className="ht-card-right">
                            <p className="ht-card-type">Sapphire Class Villa</p>
                            <div className="ht-card-specs">
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 4</span>
                                <span className="ht-dot"></span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 4.5</span>
                                <span className="ht-dot"></span>
                                <span>3,200 SQ FT</span>
                            </div>
                        </div>
                    </div>
                </a>
                <a href="/imperial-emerald" className="ht-card reveal-on-scroll">
                    <div className="ht-card-image">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200" alt="The Emerald" referrerPolicy="no-referrer" />
                    </div>
                    <div className="ht-card-info">
                        <div className="ht-card-left">
                            <h3 className="ht-card-name">The Emerald</h3>
                            <p className="ht-card-location">Luxury Class • 5BR Smart Duplex</p>
                        </div>
                        <div className="ht-card-right">
                            <p className="ht-card-type">Emerald Class Villa</p>
                            <div className="ht-card-specs">
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 5</span>
                                <span className="ht-dot"></span>
                                <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 6</span>
                                <span className="ht-dot"></span>
                                <span>4,800 SQ FT</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>

            <div className="portfolio-footer" style={{ display: "flex", justifyContent: "center", marginTop: "80px", paddingBottom: "80px" }}>
                <a href="/house-types" className="btn-pill" style={{ backgroundColor: "var(--accent-green)", border: "none", color: "#000", fontWeight: "600", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                    <div className="flip-text">
                        <span>VIEW ALL PROPERTIES</span>
                        <span aria-hidden="true">VIEW ALL PROPERTIES</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </a>
            </div>
        </div>
    </section>

    

    
    

        </main>
    );
}
