import Link from 'next/link';

export default function Page() {
    return (
        <div className="pd-page">
            
    

    {/*  Custom Card Cursor  */}
    <div id="card-cursor" className="card-cursor">
        <span>VIEW</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    {/*  Hero Section  */}
    <section className="pd-hero">
        <div className="pd-hero-image">
            <img src="https://images.weserv.nl/?url=https://drive.google.com/uc?id=1U5Q-8bVvFGhPl8TJXrMk-s1EhexRPW7c" alt="PH Rumu-olumeni" />
        </div>
        <div className="pd-hero-overlay"></div>
        <div className="pd-hero-content reveal-on-scroll">
            <h1 className="pd-hero-title">PH Rumu-olumeni</h1>
            <p className="pd-hero-description">An emerging smart residential enclave designed for coastal resilience and premium waterfront living.</p>
            <a href="/port-harcourt-estate/updates" className="btn-pill" style={{ marginTop: "30px", display: "inline-flex", background: "var(--accent-green)", color: "var(--text-primary)", border: "none" }}>
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
                        PH Rumu-olumeni is an expansion of our smart city vision into the vibrant heart of Port Harcourt's coastal areas. Engineered with advanced drainage systems, resilient utility grids, and unparalleled security, it offers investors a unique opportunity to own prime real estate in one of Nigeria's most resource-rich regions.
                    </p>
                    
                    <div className="pd-section-title">District Highlights</div>
                    <ul className="pd-highlights">
                        
            <li>Advanced coastal drainage & flood control</li>
            <li>Paved inner roads with smart LED lighting</li>
            <li>24/7 Security patrols & rapid response</li>
            <li>High-speed fiber-optic connectivity</li>
            <li>Exclusive community waterfront zones</li>
        
                    </ul>
                </section>

                {/*  Estate Vibe  */}
                <section className="pd-section reveal-on-scroll">
                    <div className="pd-section-title">Real Estate Vibe</div>
                    <div className="pd-table-container">
                        <table className="pd-table"><thead><tr><th>Category</th><th>Specifications & Details</th></tr></thead><tbody><tr><td className="pd-label-cell">Primary Title</td><td>Certificate of Occupancy (C of O)</td></tr><tr><td className="pd-label-cell">Security Level</td><td>High-fidelity Perimeter Monitoring</td></tr><tr><td className="pd-label-cell">Infrastructure</td><td>Modern Utilities / Coastal Grid</td></tr><tr><td className="pd-label-cell">Atmosphere</td><td>Coastal / Sophisticated / Secure</td></tr></tbody></table>
                    </div>
                </section>

                {/*  Nearby Facilities  */}
                <section className="pd-section reveal-on-scroll">
                    <div className="pd-section-title">Nearby Facilities</div>
                    <div className="pd-table-container">
                        <table className="pd-table"><thead><tr><th>Category</th><th>Establishment</th><th>Travel Time</th></tr></thead><tbody><tr><td className="pd-label-cell">Health</td><td>Ignatius Ajuru Clinic</td><td>10 mins</td></tr><tr><td className="pd-label-cell">Shopping</td><td>Port Harcourt Mall</td><td>25 mins</td></tr><tr><td className="pd-label-cell">Aviation</td><td>PH International Airport</td><td>40 mins</td></tr><tr><td className="pd-label-cell">Education</td><td>Ignatius Ajuru University</td><td>5 mins</td></tr></tbody></table>
                    </div>
                </section>

                {/*  Market Snapshot  */}
                <section className="pd-section reveal-on-scroll">
                    <div className="pd-section-title">Market Snapshot</div>
                    <div className="pd-table-container">
                        <table className="pd-table"><thead><tr><th>Plot Category</th><th>Price Range</th><th>Investment Outlook</th></tr></thead><tbody><tr><td className="pd-label-cell">Standard Plots</td><td>₦15M – ₦35M</td><td>Strong Asset Appreciation</td></tr><tr><td className="pd-label-cell">Corner Plots</td><td>₦40M – ₦70M</td><td>Premium Asset Value</td></tr><tr><td className="pd-label-cell">Estate Lots (Bulk)</td><td>₦120M – ₦250M+</td><td>Developer Grade Investments</td></tr></tbody></table>
                    </div>
                </section>

                {/*  Plot Sizes  */}
                <section className="pd-section reveal-on-scroll">
                    <div className="pd-section-title">Available Plot Sizes</div>
                    <div className="pd-table-container">
                        <table className="pd-table"><thead><tr><th>Plot Type</th><th>Dimensions</th><th>Area</th><th>Availability</th></tr></thead><tbody><tr><td className="pd-label-cell">Starter Plot</td><td>15m × 30m</td><td>450 sqm</td><td>Available</td></tr><tr><td className="pd-label-cell">Standard Plot</td><td>18m × 36m</td><td>648 sqm</td><td>Available</td></tr><tr><td className="pd-label-cell">Executive Plot</td><td>20m × 40m</td><td>800 sqm</td><td>Limited</td></tr></tbody></table>
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
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam" alt="Sunset Haven" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Sunset Haven</h4>
                                    <p>Katampe Extension</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam" alt="Sunset Haven" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Sunset Haven</h4>
                                    <p>Katampe Extension</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="/karsana-district" className="pd-compact-item">
                        <div className="pd-compact-flipper">
                            <div className="pd-compact-front">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1B3cgNstWKQojqadbYfvYhldFT961GRPK" alt="Whispering Pines" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Whispering Pines</h4>
                                    <p>Karsana District</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1B3cgNstWKQojqadbYfvYhldFT961GRPK" alt="Whispering Pines" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Whispering Pines</h4>
                                    <p>Karsana District</p>
                                </div>
                            </div>
                        </div>
                    </a>


                    <a href="/guzape-estate" className="pd-compact-item">
                        <div className="pd-compact-flipper">
                            <div className="pd-compact-front">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1LYF8aZZPnWhg3my_LJH_GOPzy4AEKppk" alt="Guzape II Estate" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Guzape II Estate</h4>
                                    <p>Guzape II</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1LYF8aZZPnWhg3my_LJH_GOPzy4AEKppk" alt="Guzape II Estate" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Guzape II Estate</h4>
                                    <p>Guzape II</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                
                <div className="pd-sidebar-card reveal-on-scroll" style={{ marginTop: "40px", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: "4px", padding: "24px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-green)", display: "block", marginBottom: "16px" }}>Project Advisor</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa" alt="Samuel Kwati" style={{ width: "56px", height: "56px", borderRadius: "4px", objectFit: "cover", flexShrink: "0" }} />
                        <div>
                            <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>Fatima Usman</h3>
                            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "0" }}>PH Region Specialist</p>
                        </div>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>&ldquo;Rumu-olumeni is prime territory for coastal smart living. Invest in Port Harcourt's next big residential hub.&rdquo;</p>
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
                    House types in PH Rumu-olumeni
                </h2>
                <div className="portfolio-grid" style={{ marginTop: "60px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "40px" }}>
                <a href="/blue-sapphire" className="ht-card reveal-on-scroll">
                    <div className="ht-card-image">
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" alt="The Sapphire" />
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
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT" alt="The Emerald" />
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

    

    
    

        </div>
    );
}
