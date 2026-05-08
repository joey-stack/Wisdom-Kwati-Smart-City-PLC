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
            <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL" alt="Gousa Idu District" />
        </div>
        <div className="pd-hero-overlay"></div>
        <div className="pd-hero-content reveal-on-scroll">
            <h1 className="pd-hero-title">Gousa Idu District</h1>
            <p className="pd-hero-description">An emerging smart industrial and residential hub, strategically positioned near the Abuja rail corridor for maximum accessibility.</p>
            <a href="/gousa-idu-district/updates" className="btn-pill" style={{ marginTop: "30px", display: "inline-flex", background: "var(--accent-green)", color: "var(--text-primary)", border: "none" }}>
                <div className="flip-text">
                    <span>VIEW SITE UPDATES</span>
                    <span aria-hidden="true">VIEW SITE UPDATES</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "8px" }}><polyline points="9 18 15 12 9 6"></polyline></svg>
            </a>
        </div>
    </section>

    <main className="container-1380">
        <div className="pd-main-layout">
            
            {/*  Left Column  */}
            <div className="pd-left-col">
                
                {/*  Description  */}
                <section className="pd-section reveal-on-scroll">
                    <p style={{ fontSize: "20px", lineHeight: "1.6", color: "var(--text-primary)", marginBottom: "40px" }}>
                        Gousa Idu is the strategic engine room of the new Abuja. Designed to support both modern industrial logistics and secure residential living, this district is the future of urban functional living, offering direct access to the rail system and major transportation arterials.
                    </p>
                    
                    <div className="pd-section-title">District Highlights</div>
                    <ul className="pd-highlights">
                        
            <li>Direct proximity to the Abuja Metro Rail corridor</li>
            <li>Industrial-grade power & smart street systems</li>
            <li>Paved internal roads with dedicated service lanes</li>
            <li>24/7 Gated security & perimeter patrols</li>
            <li>Centralized water and waste management</li>
        
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
                                
            <tr><td className="pd-label-cell">Primary Title</td><td>Right of Occupancy (R of O)</td></tr>
            <tr><td className="pd-label-cell">Security Level</td><td>High / Gated & Monitored</td></tr>
            <tr><td className="pd-label-cell">Infrastructure</td><td>Functional / Industrial Smart Grid</td></tr>
            <tr><td className="pd-label-cell">Atmosphere</td><td>Developing / Strategic / Modern</td></tr>
        
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
                                
            <tr><td className="pd-label-cell">Health</td><td>Idu Medical Clinic</td><td>5 mins</td></tr>
            <tr><td className="pd-label-cell">Shopping</td><td>Idu Industrial Market</td><td>10 mins</td></tr>
            <tr><td className="pd-label-cell">Aviation</td><td>Airport</td><td>20 mins</td></tr>
            <tr><td className="pd-label-cell">Education</td><td>Turkish International School</td><td>15 mins</td></tr>
        
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
                                
            <tr><td className="pd-label-cell">Standard Plots</td><td>₦10M – ₦25M</td><td>Rapid Capital Growth</td></tr>
            <tr><td className="pd-label-cell">Corner Plots</td><td>₦30M – ₦50M</td><td>Prime Strategic Value</td></tr>
            <tr><td className="pd-label-cell">Estate Lots (Bulk)</td><td>₦100M – ₦200M+</td><td>Developer Portfolio Grade</td></tr>
        
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
                                
            <tr><td className="pd-label-cell">Starter Plot</td><td>12m × 25m</td><td>300 sqm</td><td>Available</td></tr>
            <tr><td className="pd-label-cell">Standard Plot</td><td>15m × 30m</td><td>450 sqm</td><td>Available</td></tr>
            <tr><td className="pd-label-cell">Industrial Lot</td><td>30m × 60m</td><td>1,800 sqm</td><td>Limited</td></tr>
        
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
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" alt="Sunset Haven" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Sunset Haven</h4>
                                    <p>Katampe Ext.</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" alt="Sunset Haven" className="pd-compact-thumb" />
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
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" alt="Whispering Pines" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Whispering Pines</h4>
                                    <p>Karsana</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" alt="Whispering Pines" className="pd-compact-thumb" />
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
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU" alt="Ellington Villa" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Ellington Villa</h4>
                                    <p>Mabushi</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU" alt="Ellington Villa" className="pd-compact-thumb" />
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
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP" alt="Nimi Hills" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Nimi Hills</h4>
                                    <p>Guzape</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP" alt="Nimi Hills" className="pd-compact-thumb" />
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
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa" alt="Fatima Usman" style={{ width: "56px", height: "56px", borderRadius: "4px", objectFit: "cover", flexShrink: "0" }} />
                        <div>
                            <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>Fatima Usman</h3>
                            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "0" }}>Idu Region Specialist</p>
                        </div>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>&ldquo;Connectivity is the new currency. Gousa Idu places you at the center of Abuja's rail and industrial hub.&rdquo;</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                        <a href="tel:+2348100025555" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}><i className="fa-solid fa-phone" style={{ width: "14px", color: "var(--accent-green)" }}></i> +234 810 002 5555</a>
                        <a href="mailto:f.usman@wisdomkwatismartcity.com" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}><i className="fa-solid fa-envelope" style={{ width: "14px", color: "var(--accent-green)" }}></i> f.usman@wisdomkwatismartcity.com</a>
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
    </main>

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
                    House types in Gousa Idu District
                </h2>
            </div>

            <div className="portfolio-grid" style={{ marginTop: "60px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "40px" }}>
                
            <a href="/imperial-emerald" className="property-card" style={{ display: "flex", flexDirection: "column", gap: "20px", textDecoration: "none", cursor: "pointer" }}>
                <div className="property-image">
                    <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612" alt="House Type" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "start", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "22px", fontWeight: "400", lineHeight: "1.2", color: "var(--text-primary)", margin: "0" }}>The Sapphire</h3>
                        <p style={{ fontFamily: "var(--font-main)", fontSize: "13px", fontWeight: "500", color: "var(--text-secondary)", margin: "0" }}>Premium Smart Villa</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right", gap: "8px" }}>
                        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "15px", fontWeight: "400", lineHeight: "1.3", color: "var(--text-primary)", margin: "0" }}>For Sale</p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", fontFamily: "var(--font-main)", fontSize: "12px", fontWeight: "500", color: "var(--text-secondary)", flexWrap: "wrap" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 4</span>
                            <span style={{ width: "3px", height: "3px", background: "currentColor", borderRadius: "50%", opacity: "0.4", flex: "none", display: "inline-block" }}></span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 4.5</span>
                            <span style={{ width: "3px", height: "3px", background: "currentColor", borderRadius: "50%", opacity: "0.4", flex: "none", display: "inline-block" }}></span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M8 3v5H3"></path><path d="M16 3v5h5"></path><path d="M8 21v-5H3"></path><path d="M16 21v-5h5"></path></svg> 3,200 SQ FT</span>
                        </div>
                    </div>
                </div>
            </a>
            
            <a href="/house-types" className="property-card" style={{ display: "flex", flexDirection: "column", gap: "20px", textDecoration: "none", cursor: "pointer" }}>
                <div className="property-image">
                    <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL" alt="House Type" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "start", gap: "16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "22px", fontWeight: "400", lineHeight: "1.2", color: "var(--text-primary)", margin: "0" }}>The Emerald</h3>
                        <p style={{ fontFamily: "var(--font-main)", fontSize: "13px", fontWeight: "500", color: "var(--text-secondary)", margin: "0" }}>Luxury Smart Duplex</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right", gap: "8px" }}>
                        <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: "15px", fontWeight: "400", lineHeight: "1.3", color: "var(--text-primary)", margin: "0" }}>For Sale</p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", fontFamily: "var(--font-main)", fontSize: "12px", fontWeight: "500", color: "var(--text-secondary)", flexWrap: "wrap" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 5</span>
                            <span style={{ width: "3px", height: "3px", background: "currentColor", borderRadius: "50%", opacity: "0.4", flex: "none", display: "inline-block" }}></span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 6</span>
                            <span style={{ width: "3px", height: "3px", background: "currentColor", borderRadius: "50%", opacity: "0.4", flex: "none", display: "inline-block" }}></span>
                            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M8 3v5H3"></path><path d="M16 3v5h5"></path><path d="M8 21v-5H3"></path><path d="M16 21v-5h5"></path></svg> 4,800 SQ FT</span>
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
