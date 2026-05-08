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
                    ADAMAWA PROJECTS
                    <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                </div>
                <h1 className="pj-hero-title" style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "40px", fontStyle: "normal", fontWeight: "500", lineHeight: "44px", color: "var(--text-primary)", marginBottom: "64px" }}>
                    Northern innovation meets tradition<br />
                    in our smart Adamawa estates.
                </h1>
            </div>
        </section>
        

        {/*  Listings Grid  */}
        <section className="pj-grid-section">
            <div className="container container-1380">
                <div className="neighborhood-grid" id="project-grid">
                    
                    {/*  Card 13: Fintiri Extension  */}
                    <a href="/fintiri-extension" className="neighborhood-card reveal-on-scroll" 
                       data-state="adamawa" data-neighborhood="yola" data-estate="fintiri extension">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1QZOdlWzkHofdW-Gq3ANQo7qjnfhYtRvT" alt="Fintiri Extension, Yola" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Fintiri Extension</h3>
                                <p className="neighborhood-location">Yola, Adamawa</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>

                    {/*  Card 13b: Sunbrook Estate  */}
                    <a href="/sunbrook-estate" className="neighborhood-card reveal-on-scroll" 
                       data-state="adamawa" data-neighborhood="yola" data-estate="sunbrook estate">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1NrQeDHmLJe2GmoBAwiJCB5sBvn_LXDNM" alt="Sunbrook Estate, Yola" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Sunbrook Estate</h3>
                                <p className="neighborhood-location">Yola, Adamawa</p>
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
