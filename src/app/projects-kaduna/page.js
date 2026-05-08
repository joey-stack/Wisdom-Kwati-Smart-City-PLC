import Link from 'next/link';

export default function Page() {
    return (
        <main>
            
    

    {/*  Custom Card Cursor  */}
    <div id="card-cursor" className="card-cursor">
        <span>VIEW</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    <main className="pj-main-content" style={{ background: "var(--bg-main)", paddingTop: "140px", paddingBottom: "120px" }}>
        {/*  Hero Section  */}
        <section className="pj-hero-section">
            <div className="container container-1380" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "32px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                    KADUNA PROJECTS
                    <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                </div>
                <h1 className="pj-hero-title" style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "40px", fontStyle: "normal", fontWeight: "500", lineHeight: "44px", color: "var(--text-primary)", marginBottom: "64px" }}>
                    High-density smart residency and commercial<br />
                    integration in the heart of Kaduna hub.
                </h1>
            </div>
        </section>
        

        {/*  Listings Grid  */}
        <section className="pj-grid-section">
            <div className="container container-1380">
                <div className="neighborhood-grid" id="project-grid">
                    
                    {/*  Card: Kaduna Smart District (Coming Soon/Placeholder)  */}
                    <a href="/kaduna-smart-district" className="neighborhood-card reveal-on-scroll"
                       data-state="kaduna" data-neighborhood="kaduna central" data-estate="kaduna smart district">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1hxVqzWX7fTw6I2a2KMNgz53N9JAmgzO4" alt="Kaduna Smart District, Kaduna" />
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL" alt="Kaduna Smart District" style={{ opacity: "0.3" }} />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Kaduna Smart District</h3>
                                <p className="neighborhood-location">Kaduna Central, Kaduna</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>

                </div>
            </div>
        </section>
    </main>

    

    


        </main>
    );
}
