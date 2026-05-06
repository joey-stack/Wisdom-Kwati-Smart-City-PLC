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
            <img src="https://images.weserv.nl/?url=https://drive.google.com/uc?id=1hxVqzWX7fTw6I2a2KMNgz53N9JAmgzO4" alt="" referrerPolicy="no-referrer" />
        </div>
        <div className="pd-hero-overlay"></div>
        <div className="pd-hero-content reveal-on-scroll">
            <h1 className="pd-hero-title">Murg City</h1>
            <p className="pd-hero-description">A modern smart community nested in Katampe Ext.</p>
            <a href="/murg-city/updates" className="btn-pill" style={{ marginTop: "30px", display: "inline-flex", background: "var(--accent-green)", color: "var(--text-primary)", border: "none" }}>
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
                        Murg City is a modern smart community designed to deliver affordable luxury and sustainable living in Katampe Extension, seamlessly blending into the natural topography.
                    </p>
                    
                    <div className="pd-section-title">District Highlights</div>
                    <ul className="pd-highlights">
                        
            <li>Eco-friendly smart homes</li>
            <li>Advanced security and surveillance</li>
            <li>Community parks and recreation</li>
            <li>High-speed fiber connectivity</li>
            <li>Energy-efficient architecture</li>
        
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
            <tr><td className="pd-label-cell">Security Level</td><td>High / Gated Community</td></tr>
            <tr><td className="pd-label-cell">Infrastructure</td><td>Modern Smart Grid</td></tr>
            <tr><td className="pd-label-cell">Atmosphere</td><td>Modern / Peaceful / Community</td></tr>
        
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
                                
            <tr><td className="pd-label-cell">Health</td><td>Katampe General Hospital</td><td>10 mins</td></tr>
            <tr><td className="pd-label-cell">Shopping</td><td>Maitama Mega Mall</td><td>15 mins</td></tr>
            <tr><td className="pd-label-cell">Aviation</td><td>Nnamdi Azikiwe Int. Airport</td><td>35 mins</td></tr>
            <tr><td className="pd-label-cell">Education</td><td>Premium International Schools</td><td>10 mins</td></tr>
        
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
                                
            <tr><td className="pd-label-cell">Standard Plots</td><td>₦40M – ₦80M</td><td>High Capital Appreciation</td></tr>
            <tr><td className="pd-label-cell">Premium Plots</td><td>₦90M – ₦150M</td><td>Exclusive Views</td></tr>
            <tr><td className="pd-label-cell">Estate Lots (Bulk)</td><td>₦200M+</td><td>Developer Grade Investment</td></tr>
        
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
            <tr><td className="pd-label-cell">Executive Plot</td><td>18m × 36m</td><td>648 sqm</td><td>Limited</td></tr>
        
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
                                <img src="/assets/neighborhood_katampe_1776023833571.png" alt="Sunset Haven" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Sunset Haven</h4>
                                    <p>Katampe Ext.</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="/assets/neighborhood_katampe_1776023833571.png" alt="Sunset Haven" className="pd-compact-thumb" />
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
                                <img src="/assets/whispering_pine_card_text.jpg" alt="Whispering Pines" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Whispering Pines</h4>
                                    <p>Karsana</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="/assets/whispering_pine_card_text.jpg" alt="Whispering Pines" className="pd-compact-thumb" />
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
                                <img src="/assets/ellington_villas_project_card.jpg" alt="Ellington Villa" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Ellington Villa</h4>
                                    <p>Mabushi</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="/assets/ellington_villas_project_card.jpg" alt="Ellington Villa" className="pd-compact-thumb" />
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
                                <img src="/assets/nimi_hills_project_card.png" alt="Nimi Hills" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Nimi Hills</h4>
                                    <p>Guzape</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="/assets/nimi_hills_project_card.png" alt="Nimi Hills" className="pd-compact-thumb" />
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
                        <img src="/assets/about_company_bg.png" alt="Samuel Kwati" style={{ width: "56px", height: "56px", borderRadius: "4px", objectFit: "cover", flexShrink: "0" }} />
                        <div>
                            <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>Samuel Kwati</h3>
                            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "0" }}>Project Advisor</p>
                        </div>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>&ldquo;Murg City offers incredible value and a high standard of living in one of Abuja's fastest-growing premium districts.&rdquo;</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                        <a href="tel:+2348100018888" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}><i className="fa-solid fa-phone" style={{ width: "14px", color: "var(--accent-green)" }}></i> +234 810 001 8888</a>
                        <a href="mailto:samuel.k@wisdomkwati.com" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "var(--text-primary)", textDecoration: "none" }}><i className="fa-solid fa-envelope" style={{ width: "14px", color: "var(--accent-green)" }}></i> samuel.k@wisdomkwati.com</a>
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
                    House types in Murg City
                </h2>
            </div>

            <div className="portfolio-grid" style={{ marginTop: "60px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "40px" }}>
                
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
