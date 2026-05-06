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
            <img src="/assets/neighborhood_katampe_1776023833571.png" alt="Kaduna Smart District" />
        </div>
        <div className="pd-hero-overlay"></div>
        <div className="pd-hero-content reveal-on-scroll">
            <h1 className="pd-hero-title">Kaduna Smart District</h1>
            <p className="pd-hero-description">A pioneering smart district in Kaduna, blending modern technology with rich cultural heritage.</p>
        </div>
    </section>

    <main className="container-1380">
        <div className="pd-main-layout">
            
            {/*  Left Column  */}
            <div className="pd-left-col">
                
                {/*  Description  */}
                <section className="pd-section reveal-on-scroll">
                    <p style={{ fontSize: "20px", lineHeight: "1.6", color: "var(--text-primary)", marginBottom: "40px" }}>
                        Kaduna Smart District is a visionary project designed to bring the future of living to Northern Nigeria. This master-planned enclave features resilient smart infrastructure, top-tier security systems, and high-fidelity residential zones built for modern professionals and their families.
                    </p>
                    
                    <div className="pd-section-title">District Highlights</div>
                    <ul className="pd-highlights">
                        
            <li>Integrated smart utility grid (24/7 Power)</li>
            <li>Gated community with biometric access</li>
            <li>Dedicated fiber-optic internet</li>
            <li>Centralized eco-waste management</li>
            <li>Parks and recreational facilities</li>
        
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
                                
            <tr><td className="pd-label-cell">Primary Title</td><td>Certificate of Occupancy (C of O)</td></tr>
            <tr><td className="pd-label-cell">Security Level</td><td>High / Gated & Monitored</td></tr>
            <tr><td className="pd-label-cell">Infrastructure</td><td>Modern Smart Grid Utility</td></tr>
            <tr><td className="pd-label-cell">Atmosphere</td><td>Cultural / Emerging / Secure</td></tr>
        
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
                                
            <tr><td className="pd-label-cell">Health</td><td>St. Gerard's Hospital</td><td>15 mins</td></tr>
            <tr><td className="pd-label-cell">Shopping</td><td>Galaxy Mall</td><td>20 mins</td></tr>
            <tr><td className="pd-label-cell">Aviation</td><td>Kaduna Airport</td><td>30 mins</td></tr>
            <tr><td className="pd-label-cell">Education</td><td>Kaduna International School</td><td>15 mins</td></tr>
        
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
                                
            <tr><td className="pd-label-cell">Standard Plots</td><td>₦8M – ₦15M</td><td>High Appreciation Potential</td></tr>
            <tr><td className="pd-label-cell">Corner Plots</td><td>₦20M – ₦30M</td><td>Prime Residential Value</td></tr>
            <tr><td className="pd-label-cell">Estate Lots (Bulk)</td><td>₦60M – ₦120M+</td><td>Developer Portfolio Assets</td></tr>
        
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
                                
            <tr><td className="pd-label-cell">Starter Plot</td><td>15m × 30m</td><td>450 sqm</td><td>Available</td></tr>
            <tr><td className="pd-label-cell">Executive Plot</td><td>20m × 40m</td><td>800 sqm</td><td>Available</td></tr>
            <tr><td className="pd-label-cell">Grand Lot</td><td>30m × 60m</td><td>1,800 sqm</td><td>Limited</td></tr>
        
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
                                    <p>Katampe Extension</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="/assets/neighborhood_katampe_1776023833571.png" alt="Sunset Haven" className="pd-compact-thumb" />
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
                                <img src="/assets/whispering_pine_card_text.jpg" alt="Whispering Pines" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Whispering Pines</h4>
                                    <p>Karsana District</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="/assets/whispering_pine_card_text.jpg" alt="Whispering Pines" className="pd-compact-thumb" />
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
                                <img src="/assets/nimi_hills_project_card.png" alt="Guzape II Estate" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Guzape II Estate</h4>
                                    <p>Guzape II</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img src="/assets/nimi_hills_project_card.png" alt="Guzape II Estate" className="pd-compact-thumb" />
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
                        <img src="/assets/about_company_bg.png" alt="Fatima Usman" style={{ width: "56px", height: "56px", borderRadius: "4px", objectFit: "cover", flexShrink: "0" }} />
                        <div>
                            <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>Fatima Usman</h3>
                            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "0" }}>Northern Region Specialist</p>
                        </div>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>&ldquo;Kaduna is opening its doors to the future of smart living. Secure your spot in this transformative project today.&rdquo;</p>
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
                    House types in Kaduna Smart District
                </h2>
            </div>

            <div className="portfolio-grid" style={{ marginTop: "60px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "40px" }}>
                
                <a href="/blue-sapphire" className="property-card" style={{ display: "flex", flexDirection: "column", gap: "20px", textDecoration: "none", cursor: "pointer" }}>
                    <div className="property-image">
                        <img src="/assets/detached_5bed.png" alt="House Type" />
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
                
                <a href="/imperial-emerald" className="property-card" style={{ display: "flex", flexDirection: "column", gap: "20px", textDecoration: "none", cursor: "pointer" }}>
                    <div className="property-image">
                        <img src="/assets/mansion_7bed.png" alt="House Type" />
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
