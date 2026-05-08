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
            <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/uc?id=1K9BgIgXG_xT9slAfRl32icd95C1bmoOz" alt="The HOF Community" />
        </div>
        <div className="pd-hero-overlay"></div>
        <div className="pd-hero-content reveal-on-scroll">
            <h1 className="pd-hero-title">The HOF Community</h1>
            <p className="pd-hero-description">Sophisticated urban living in the heart of Life Camp, Abuja.</p>
            <a href="/hof-community/updates" className="btn-pill" style={{ marginTop: "30px", display: "inline-flex", background: "var(--accent-green)", color: "var(--text-primary)", border: "none" }}>
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
                        The HOF Community is a premium residential development located in the sought-after Life Camp district. It redefines contemporary living with its blend of modern architecture, secure environments, and strategic accessibility to Abuja's central hubs.
                    </p>
                    
                    <div className="pd-section-title">Community Highlights</div>
                    <ul className="pd-highlights">
                        <li>Prime Life Camp location with excellent road networks</li>
                        <li>24/7 high-level security and surveillance</li>
                        <li>Modern architectural design and premium finishes</li>
                        <li>Consistent power supply and treated water systems</li>
                        <li>Proximity to shopping malls, schools, and hospitals</li>
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
                                <tr><td className="pd-label-cell">Security Level</td><td>Premium Gated / 24hr Patrol</td></tr>
                                <tr><td className="pd-label-cell">Infrastructure</td><td>Modern Underground Drainage & Paved Roads</td></tr>
                                <tr><td className="pd-label-cell">Atmosphere</td><td>Serene / Upscale / Community-Focused</td></tr>
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
                                <tr><td className="pd-label-cell">Shopping</td><td>Jabi Lake Mall</td><td>10 mins</td></tr>
                                <tr><td className="pd-label-cell">Health</td><td>Turkish Hospital</td><td>12 mins</td></tr>
                                <tr><td className="pd-label-cell">Leisure</td><td>Idu Golf Course</td><td>15 mins</td></tr>
                                <tr><td className="pd-label-cell">Aviation</td><td>Nnamdi Azikiwe Int. Airport</td><td>30 mins</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/*  Right Column (Sidebar)  */}
            <aside className="pd-sidebar">
                <div className="pd-sidebar-header reveal-on-scroll">
                    <div className="pd-sidebar-label">OTHER NEIGHBORHOODS</div>
                    <h2 className="pd-sidebar-headline">Explore our other premier Abuja developments.</h2>
                </div>

                <div className="pd-compact-list reveal-on-scroll">
                    <a href="/katampe-extension" className="pd-compact-item">
                        <div className="pd-compact-flipper">
                            <div className="pd-compact-front">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/uc?id=1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN" alt="Whispering Pines" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Whispering Pines</h4>
                                    <p>Katampe Ext.</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/uc?id=1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN" alt="Whispering Pines" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Whispering Pines</h4>
                                    <p>Katampe Ext.</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="/mabushi-district" className="pd-compact-item">
                        <div className="pd-compact-flipper">
                            <div className="pd-compact-front">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU" alt="Ellington Villa" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Ellington Villa</h4>
                                    <p>Mabushi</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU" alt="Ellington Villa" className="pd-compact-thumb" />
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
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP" alt="Nimi Hills" className="pd-compact-thumb" />
                                <div className="pd-compact-info">
                                    <h4>Nimi Hills</h4>
                                    <p>Guzape</p>
                                </div>
                            </div>
                            <div className="pd-compact-back">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP" alt="Nimi Hills" className="pd-compact-thumb" />
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
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa" alt="Samuel Kwati" style={{ width: "56px", height: "56px", borderRadius: "4px", objectFit: "cover", flexShrink: "0" }} />
                        <div>
                            <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px" }}>Samuel Kwati</h3>
                            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "0" }}>Residential Specialist</p>
                        </div>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "20px" }}>&ldquo;The HOF Community offers an exceptional balance of luxury and community living in one of Abuja's most desirable districts.&rdquo;</p>
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

    

    
    

        </main>
    );
}
