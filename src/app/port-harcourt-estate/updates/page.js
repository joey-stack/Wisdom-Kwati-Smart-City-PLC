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
                Garden City Estate Updates
            </h1>
            <p className="pd-hero-description reveal-on-scroll" style={{ color: "var(--text-secondary)", fontSize: "18px", maxWidth: "600px", margin: "0 auto 40px auto", lineHeight: "1.6" }}>
                Future home of Garden City Estate.
            </p>
            <a href="/port-harcourt-estate" className="btn-pill" style={{ marginTop: "10px", display: "inline-flex", background: "var(--accent-green)", color: "var(--text-primary)", border: "none" }}>
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
        <div style={{ textAlign: "center", padding: "120px 20px", border: "1px dashed var(--border)", borderRadius: "12px", background: "rgba(0,0,0,0.02)", marginTop: "60px" }} className="reveal-on-scroll">
            <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "64px", height: "64px", borderRadius: "50%", background: "var(--accent-green)", color: "var(--text-primary)", marginBottom: "24px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "28px", fontWeight: "500", color: "var(--text-primary)", marginBottom: "16px" }}>Updates Coming Soon</h3>
            <p style={{ color: "var(--text-secondary)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.6" }}>Construction for Garden City Estate has not yet commenced. Check back later for high-fidelity photo and video updates from the site engineers.</p>
        </div>

    </main>

    

    
    
    


        </main>
    );
}
