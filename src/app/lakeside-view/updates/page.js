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
    <section className="pj-hero-section" style={{ paddingTop: "180px", paddingBottom: "60px", background: "var(--bg-main)" }}>
        <div className="container container-1380" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "32px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--accent-green)", flexShrink: "0" }}></div>
                PROGRESS GALLERY
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--accent-green)", flexShrink: "0" }}></div>
            </div>
            <h1 className="pj-hero-title reveal-on-scroll" style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "56px", fontStyle: "normal", fontWeight: "500", lineHeight: "1.1", color: "var(--text-primary)", marginBottom: "24px" }}>
                Lakeside View Updates
            </h1>
            <p className="pd-hero-description reveal-on-scroll" style={{ color: "var(--text-secondary)", fontSize: "18px", maxWidth: "600px", margin: "0 auto 40px auto", lineHeight: "1.6" }}>
                Future home of Lakeside View.
            </p>
            <a href="/lakeside-view" className="btn-pill" style={{ marginTop: "10px", display: "inline-flex", background: "var(--accent-green)", color: "var(--text-primary)", border: "none" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}><polyline points="15 18 9 12 15 6"></polyline></svg>
                <div className="flip-text">
                    <span>BACK TO PROJECT</span>
                    <span aria-hidden="true">BACK TO PROJECT</span>
                </div>
            </a>
        </div>
    </section>

    <main className="container-1380" style={{ padding: "60px 20px" }}>
        
        <div className="section-line"></div>
        <div className="gallery-grid">
            <div className="gallery-item skeleton reveal-on-scroll">
                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam" alt="Lakeside View Site Update 1" loading="lazy" />
                <div className="gallery-item-label">Lakeside View Update</div>
            </div>
            <div className="gallery-item skeleton reveal-on-scroll">
                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1B3cgNstWKQojqadbYfvYhldFT961GRPK" alt="Lakeside View Site Update 2" loading="lazy" />
                <div className="gallery-item-label">Lakeside View Update</div>
            </div>
            <div className="gallery-item skeleton reveal-on-scroll">
                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1LYF8aZZPnWhg3my_LJH_GOPzy4AEKppk" alt="Lakeside View Site Update 3" loading="lazy" />
                <div className="gallery-item-label">Lakeside View Update</div>
            </div>
            <div className="gallery-item skeleton reveal-on-scroll">
                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1WyUxduCtGKp5W4B5xZ1liHas9U1oz-3r" alt="Lakeside View Site Update 4" loading="lazy" />
                <div className="gallery-item-label">Lakeside View Update</div>
            </div>
            <div className="gallery-item skeleton reveal-on-scroll">
                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam" alt="Lakeside View Site Update 5" loading="lazy" />
                <div className="gallery-item-label">Lakeside View Update</div>
            </div>
            <div className="gallery-item skeleton reveal-on-scroll">
                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1B3cgNstWKQojqadbYfvYhldFT961GRPK" alt="Lakeside View Site Update 6" loading="lazy" />
                <div className="gallery-item-label">Lakeside View Update</div>
            </div>
            <div className="gallery-item skeleton reveal-on-scroll">
                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1LYF8aZZPnWhg3my_LJH_GOPzy4AEKppk" alt="Lakeside View Site Update 7" loading="lazy" />
                <div className="gallery-item-label">Lakeside View Update</div>
            </div>
            <div className="gallery-item skeleton reveal-on-scroll">
                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1WyUxduCtGKp5W4B5xZ1liHas9U1oz-3r" alt="Lakeside View Site Update 8" loading="lazy" />
                <div className="gallery-item-label">Lakeside View Update</div>
            </div>
            <div className="gallery-item skeleton reveal-on-scroll">
                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=drive.google.com/uc?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam" alt="Lakeside View Site Update 9" loading="lazy" />
                <div className="gallery-item-label">Lakeside View Update</div>
            </div>
        </div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "28px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "16px" }}>Updates Coming Soon</h3>
            <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.6" }}>Construction for Lakeside View has not yet commenced. Check back later for high-fidelity photo and video updates from the site engineers.</p>

    </main>

    

    
    
    


        </main>
    );
}
