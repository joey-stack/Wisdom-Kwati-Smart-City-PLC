import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Wisdom Kwati Smart City PLC. Visit our offices in Abuja, Lagos, Yola, and Port Harcourt, or reach us via phone and email.',
  alternates: { canonical: '/contact' },
};

export default function Page() {
    return (
        <main className="contact-page">
            <div className="contact-main-content">
                {/*  Hero Section  */}
                <section className="pj-hero-section">
                    <div className="container container-1380" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                        <div className="reveal-on-scroll" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "32px" }}>
                            <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                            CONTACTS
                            <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                        </div>
                        <h1 className="pj-hero-title reveal-on-scroll" style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "clamp(22px, 6vw, 46px)", fontStyle: "normal", fontWeight: "500", lineHeight: "1.2", color: "var(--text-primary)", marginBottom: "clamp(32px, 8vw, 64px)" }}>
                            We'd love to hear from you<br />
                            (seriously, we actually reply)
                        </h1>
                    </div>
                </section>



        {/*  Form Section  */}
        <section className="contact-form-section reveal-on-scroll">
            <div className="container container-1380">
                <div className="form-map-grid">
                    <div className="form-column">
                        <div className="form-card">
                            <h3 className="form-title">We're just a form away—send us your question, and we'll be happy to help!</h3>
                            
                            <ContactForm buttonClassName="submit-btn" defaultPhonePlaceholder="0706 661 8999" />
                        </div>
                    </div>
                    <div className="map-column">
                        <div className="map-wrapper">
                            <iframe src="https://maps.google.com/maps?q=2141%20Katampe%20Rd,%20Kado,%20Abuja%20900108,%20Federal%20Capital%20Territory&t=&z=15&ie=UTF8&iwloc=&output=embed" title="Google Maps showing Wisdom Kwati Smart City Abuja office location" width="100%" height="100%" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/*  Locations Section  */}
        <section className="contact-locations-section reveal-on-scroll">
            <div className="container container-1380">
                <div className="locations-grid">
                    {/*  Abuja  */}
                    <div className="location-item">
                        <div className="location-header">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            ABUJA OFFICE HEADQUARTERS
                        </div>
                        <p className="location-address">2141 Katampe Rd, Kado,<br />Abuja 900108, Federal Capital Territory, Nigeria.</p>
                        <p className="location-contact" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <span>0706 661 8999</span>
                            <span>0816 833 3302</span>
                        </p>
                        <p className="location-contact">hello@wisdomkwatismartcity.com</p>
                        <p className="location-hours">Monday—Friday: 9:00 AM—5:00 PM<br />Saturday: 10:00 AM—3:00 PM | Sunday: Closed</p>
                    </div>

                    {/*  Yola  */}
                    <div className="location-item">
                        <div className="location-header">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            YOLA OFFICE
                        </div>
                        <p className="location-address">Adamawa Homes and Savings Ltd, Opposite Nurses House, Jimeta-Yola, Adamawa State.</p>
                        <p className="location-contact">+234 810 831 4326</p>
                        <p className="location-contact">hello@wisdomkwatismartcity.com</p>
                        <p className="location-hours">Monday—Friday: 9:00 AM—5:00 PM<br />Saturday: 10:00 AM—2:00 PM | Sunday: Closed</p>
                    </div>

                    {/*  Port Harcourt  */}
                    <div className="location-item">
                        <div className="location-header">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            PORT HARCOURT OFFICE
                        </div>
                        <p className="location-address">No. 1 Emeyal Street, Phase 1,<br />New GRA, Port Harcourt, Rivers State.</p>
                        <p className="location-contact" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                            <span>0706 661 8999</span>
                            <span>0816 833 3302</span>
                        </p>
                        <p className="location-contact">hello@wisdomkwatismartcity.com</p>
                        <p className="location-hours">Monday—Friday: 9:00 AM—5:00 PM<br />Saturday: 10:00 AM—3:00 PM | Sunday: Closed</p>
                    </div>
                </div>
            </div>
        </section>

        {/*  Social Bar  */}
        <section className="contact-social-section reveal-on-scroll">
            <div className="container container-1380">
                <div className="social-container">
                    <span className="social-label">Social Media:</span>
                    <div className="social-strip">
                        <a href="#" className="social-link" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                        <a href="#" className="social-link" aria-label="X (Twitter)"><i className="fa-brands fa-x-twitter"></i></a>
                        <a href="#" className="social-link" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="social-link" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
                        <a href="#" className="social-link" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" className="social-link" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>
            </div>
        </section>
            </div>
        </main>
    );
}
