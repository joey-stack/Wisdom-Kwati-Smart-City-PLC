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
                        Fintiri Extension Updates
                    </h1>
                    <p className="pd-hero-description reveal-on-scroll" style={{ color: "var(--text-secondary)", fontSize: "18px", maxWidth: "600px", margin: "0 auto 40px auto", lineHeight: "1.6" }}>
                        Future home of Fintiri Extension.
                    </p>
                    <a href="/fintiri-extension" className="btn-pill" style={{ marginTop: "10px", display: "inline-flex", background: "var(--accent-green)", color: "var(--text-primary)", border: "none" }}>
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
                    <p style={{ color: "var(--text-secondary)", maxWidth: "600px" }}>Explore the ongoing construction and architectural milestones at Fintiri Extension.</p>
                </div>
                <div className="gallery-grid reveal-on-scroll">
                    {/* Video Updates */}
                    <div className="gallery-item video-item skeleton">
                        <video autoPlay={true} src="https://drive.google.com/uc?export=download&id=1WkaEVNo0ii8zkmYXHDOd5MOFwDcz7VKi" poster="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam%26sz=w1200" className="-video" controls muted={true} loop={true} playsInline={true} preload="metadata"></video>
                    </div>
                    {/* Image Updates */}
                    <div className="gallery-item skeleton">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam%26sz=w1200" alt="Fintiri Extension Site Update" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="gallery-item skeleton">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://lh3.googleusercontent.com/u/0/d/1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN" alt="Fintiri Extension Site Update" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="gallery-item skeleton">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1LYF8aZZPnWhg3my_LJH_GOPzy4AEKppk%26sz=w1200" alt="Fintiri Extension Site Update" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="gallery-item skeleton">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1WyUxduCtGKp5W4B5xZ1liHas9U1oz-3r%26sz=w1200" alt="Fintiri Extension Site Update" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="gallery-item skeleton">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam%26sz=w1200" alt="Fintiri Extension Site Update" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="gallery-item skeleton">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://lh3.googleusercontent.com/u/0/d/1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN" alt="Fintiri Extension Site Update" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="gallery-item skeleton">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1LYF8aZZPnWhg3my_LJH_GOPzy4AEKppk%26sz=w1200" alt="Fintiri Extension Site Update" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="gallery-item skeleton">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1WyUxduCtGKp5W4B5xZ1liHas9U1oz-3r%26sz=w1200" alt="Fintiri Extension Site Update" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="gallery-item skeleton">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1UD9Y32e13MOoV8CRibkuC5bBgHbTzoam%26sz=w1200" alt="Fintiri Extension Site Update" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                    <div className="gallery-item skeleton">
                        <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://lh3.googleusercontent.com/u/0/d/1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN" alt="Fintiri Extension Site Update" loading="lazy" referrerPolicy="no-referrer" />
                    </div>
                </div>
            </div>
        </main>
    );
}