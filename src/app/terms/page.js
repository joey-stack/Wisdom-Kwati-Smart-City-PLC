'use client';

import Link from 'next/link';

export default function TermsPage() {
    return (
        <main className="terms-page" style={{ backgroundColor: "var(--bg-main)", color: "var(--text-primary)", minHeight: "100vh" }}>
            {/* Hero Section */}
            <section className="pj-hero-section" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
                <div className="container container-1380" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "32px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                        LEGAL
                        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                    </div>
                    <h1 style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "48px", fontWeight: "600", lineHeight: "1.1", marginBottom: "24px" }}>
                        Terms & Conditions
                    </h1>
                    <p style={{ fontSize: "18px", lineHeight: "1.6", color: "var(--text-secondary)", maxWidth: "600px" }}>
                        Effective Date: July 2026. These Terms & Conditions govern your use of our website and services at Wisdom Kwati Smart City.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section style={{ padding: "80px 24px" }}>
                <div className="container container-1380" style={{ maxWidth: "900px", margin: "0 auto" }}>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "40px", fontSize: "16px", lineHeight: "1.8", color: "var(--text-secondary)" }}>
                        
                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>1. Agreement to Terms</h2>
                            <p>
                                By accessing our website, you agree to be bound by these Terms and Conditions and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
                            </p>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>2. Real Estate Purchases & Refunds</h2>
                            <p>
                                All real estate transactions initiated through our platform are subject to our formal review process. Note that:
                            </p>
                            <ul style={{ marginTop: "16px", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                <li>Property availability and pricing are subject to change without prior notice until an agreement is formally signed.</li>
                                <li>Refund requests must be formally submitted in writing. Upon approval, a 20% administrative deduction applies, and funds will be returned within 90 days.</li>
                                <li>No refunds are issued after physical allocation of the property has been completed.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>3. Agent Partnerships</h2>
                            <p>
                                Independent agents partnering with Wisdom Kwati Smart City are entitled to a fixed 10% commission on land sales and a 5% commission on house sales. Commissions are non-negotiable and are only disbursed after full payment is received from the client.
                            </p>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>4. Intellectual Property Rights</h2>
                            <p>
                                Other than the content you own, under these Terms, Wisdom Kwati Smart City and/or its licensors own all the intellectual property rights and materials contained in this website. You are granted limited license only for purposes of viewing the material contained on this website.
                            </p>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>5. Limitation of Liability</h2>
                            <p>
                                In no event shall Wisdom Kwati Smart City, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website whether such liability is under contract. Wisdom Kwati Smart City shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
                            </p>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>6. Governing Law & Jurisdiction</h2>
                            <p>
                                These Terms will be governed by and interpreted in accordance with the laws of the Federal Republic of Nigeria, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Nigeria for the resolution of any disputes.
                            </p>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>7. Contact Us</h2>
                            <p>
                                If you have questions or comments about these terms, please email us at <a href="mailto:hello@wisdomkwatismartcity.com" style={{ color: "var(--accent-green)", textDecoration: "none", fontWeight: "500" }}>hello@wisdomkwatismartcity.com</a>.
                            </p>
                        </div>

                    </div>

                </div>
            </section>
        </main>
    );
}
