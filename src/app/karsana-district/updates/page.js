import Link from 'next/link';

export default function Page() {
    return (
        <main>
            {/* Custom Card Cursor */}
            <div id="card-cursor" className="card-cursor">
                <span>VIEW</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>

            {/* Hero Section */}
            <section className="pj-hero-section" style={{ paddingTop: "180px", paddingBottom: "60px", background: "var(--bg-main)" }}>
                <div className="container container-1380" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "32px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--accent-green)", flexShrink: "0" }}></div>
                        PROGRESS GALLERY
                        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--accent-green)", flexShrink: "0" }}></div>
                    </div>
                    <h1 className="pj-hero-title reveal-on-scroll" style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "56px", fontStyle: "normal", fontWeight: "500", lineHeight: "1.1", color: "var(--text-primary)", marginBottom: "24px" }}>
                        Whispering Pines Updates
                    </h1>
                    <p className="pd-hero-description reveal-on-scroll" style={{ color: "var(--text-secondary)", fontSize: "18px", maxWidth: "600px", margin: "0 auto 40px auto", lineHeight: "1.6" }}>
                        Latest photos and videos from the construction site.
                    </p>
                    <a href="/karsana-district" className="btn-pill" style={{ marginTop: "10px", display: "inline-flex", background: "var(--accent-green)", color: "var(--text-primary)", border: "none" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}><polyline points="15 18 9 12 15 6"></polyline></svg>
                        <div className="flip-text">
                            <span>BACK TO PROJECT</span>
                            <span aria-hidden="true">BACK TO PROJECT</span>
                        </div>
                    </a>
                </div>
            </section>

            <div className="container-1380" style={{ padding: "60px 20px" }}>
                <div className="section-line"></div>
                <div style={{ marginTop: "40px" }} className="reveal-on-scroll">
                    <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "32px", fontWeight: "400", color: "var(--text-primary)", marginBottom: "16px" }}>Recent Site Activity</h2>
                    <p style={{ color: "var(--text-secondary)", maxWidth: "600px" }}>Explore the ongoing infrastructural developments and architectural milestones at Whispering Pines.</p>
                </div>
                <div className="gallery-grid reveal-on-scroll">
                    <div className="gallery-item" style={{ aspectRatio: "3/4" }}>
                        <video poster="https://images.weserv.nl/?url=drive.google.com/uc?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam" controls>
                            <source src="https://drive.google.com/uc?export=download&id=1WkaEVNo0ii8zkmYXHDOd5MOFwDcz7VKi" type="video/mp4" />
                        </video>
                        <div className="gallery-item-label">Foundation Pouring - Video</div>
                    </div>
                    <div className="gallery-item" style={{ aspectRatio: "16/9" }}>
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1B3cgNstWKQojqadbYfvYhldFT961GRPK" alt="Site Update" />
                        <div className="gallery-item-label">Access Road Clearing</div>
                    </div>
                    <div className="gallery-item" style={{ aspectRatio: "1/1" }}>
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1LYF8aZZPnWhg3my_LJH_GOPzy4AEKppk" alt="Site Update" />
                        <div className="gallery-item-label">Drainage Installation</div>
                    </div>
                    <div className="gallery-item" style={{ aspectRatio: "9/16" }}>
                        <video poster="https://images.weserv.nl/?url=drive.google.com/uc?id=1WyUxduCtGKp5W4B5xZ1liHas9U1oz-3r" controls>
                            <source src="https://drive.google.com/uc?export=download&id=1WkaEVNo0ii8zkmYXHDOd5MOFwDcz7VKi" type="video/mp4" />
                        </video>
                        <div className="gallery-item-label">Aerial Drone View - Video</div>
                    </div>
                    <div className="gallery-item" style={{ aspectRatio: "4/3" }}>
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam" alt="Site Update" />
                        <div className="gallery-item-label">Perimeter Fencing</div>
                    </div>
                    <div className="gallery-item" style={{ aspectRatio: "3/2" }}>
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1B3cgNstWKQojqadbYfvYhldFT961GRPK" alt="Site Update" />
                        <div className="gallery-item-label">Site Surveying</div>
                    </div>
                    <div className="gallery-item" style={{ aspectRatio: "1/1.5" }}>
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1LYF8aZZPnWhg3my_LJH_GOPzy4AEKppk" alt="Site Update" />
                        <div className="gallery-item-label">Concrete Pouring</div>
                    </div>
                    <div className="gallery-item" style={{ aspectRatio: "2/1" }}>
                        <img src="https://images.weserv.nl/?url=drive.google.com/uc?id=1WyUxduCtGKp5W4B5xZ1liHas9U1oz-3r" alt="Site Update" />
                        <div className="gallery-item-label">Landscaping Begins</div>
                    </div>
                </div>
            </div>
        </main>
    );
}