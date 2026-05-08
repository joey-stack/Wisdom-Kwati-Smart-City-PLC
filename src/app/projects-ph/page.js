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
                    RIVERS STATE PROJECTS
                    <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                </div>
                <h1 className="pj-hero-title" style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "40px", fontStyle: "normal", fontWeight: "500", lineHeight: "44px", color: "var(--text-primary)", marginBottom: "64px" }}>
                    Future-ready smart cities and strategic<br />
                    land holdings in Port Harcourt.
                </h1>
            </div>
        </section>
        

        {/*  Listings Grid  */}
        <section className="pj-grid-section">
            <div className="container container-1380">
                <div className="neighborhood-grid" id="project-grid">
                    
                    {/*  Card 14: Garden City Estate  */}
                    <a href="/port-harcourt-estate" className="neighborhood-card reveal-on-scroll"
                       data-state="rivers" data-neighborhood="port harcourt" data-estate="garden city estate">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ" alt="Garden City Estate, Port Harcourt" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Garden City Estate</h3>
                                <p className="neighborhood-location">Port Harcourt, Rivers</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>

                    {/*  Card 15: PH Rumu-olumeni  */}
                    <a href="/ph-rumu-olumeni" className="neighborhood-card reveal-on-scroll"
                       data-state="rivers" data-neighborhood="port harcourt" data-estate="rumu-olumeni">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1U5Q-8bVvFGhPl8TJXrMk-s1EhexRPW7c" alt="PH Rumu-olumeni, Port Harcourt" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">PH Rumu-olumeni</h3>
                                <p className="neighborhood-location">Port Harcourt, Rivers</p>
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
