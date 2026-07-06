'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <main className="privacy-page" style={{ backgroundColor: "var(--bg-main)", color: "var(--text-primary)", minHeight: "100vh" }}>
            {/* Hero Section */}
            <section className="pj-hero-section" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
                <div className="container container-1380" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "32px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                        LEGAL
                        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                    </div>
                    <h1 style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "48px", fontWeight: "600", lineHeight: "1.1", marginBottom: "24px" }}>
                        Privacy Policy
                    </h1>
                    <p style={{ fontSize: "18px", lineHeight: "1.6", color: "var(--text-secondary)", maxWidth: "600px" }}>
                        Effective Date: July 2026. This Privacy Policy describes how Wisdom Kwati Smart City collects, uses, and protects your information.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section style={{ padding: "80px 24px" }}>
                <div className="container container-1380" style={{ maxWidth: "900px", margin: "0 auto" }}>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "40px", fontSize: "16px", lineHeight: "1.8", color: "var(--text-secondary)" }}>
                        
                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>1. Introduction</h2>
                            <p>
                                Welcome to Wisdom Kwati Smart City ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at <a href="mailto:hello@wisdomkwatismartcity.com" style={{ color: "var(--accent-green)", textDecoration: "none", fontWeight: "500" }}>hello@wisdomkwatismartcity.com</a>.
                            </p>
                            <p style={{ marginTop: "16px" }}>
                                When you visit our website, and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy notice, we describe our privacy policy.
                            </p>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>2. Information We Collect</h2>
                            <p>
                                We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services, when participating in activities on the website, or otherwise contacting us.
                            </p>
                            <ul style={{ marginTop: "16px", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                <li><strong>Personal Details:</strong> Name, phone numbers, email addresses, and location data.</li>
                                <li><strong>Financial Data:</strong> Information relating to transactions and property purchases (processed securely).</li>
                                <li><strong>Automatically Collected Data:</strong> IP address, browser type, device characteristics, and operating system when you visit our website.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>3. How We Use Your Information</h2>
                            <p>
                                We use personal information collected via our website for a variety of business purposes described below:
                            </p>
                            <ul style={{ marginTop: "16px", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                <li>To facilitate property purchases, document processing, and physical allocations.</li>
                                <li>To send you administrative information, such as updates to our terms, conditions, and policies.</li>
                                <li>To fulfill and manage your orders, payments, and refund requests.</li>
                                <li>To send you marketing and promotional communications regarding new real estate projects and investment packs.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>4. Sharing Your Information</h2>
                            <p>
                                We only share and disclose your information with the following third parties under strict confidentiality agreements:
                            </p>
                            <ul style={{ marginTop: "16px", paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                                <li>Government regulatory bodies for property registration and land titling.</li>
                                <li>Trusted third-party service providers acting on our behalf (e.g., payment processors).</li>
                                <li>Legal authorities when required by law to comply with legal processes or to protect our rights and the safety of our users.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>5. Data Security</h2>
                            <p>
                                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our website is at your own risk.
                            </p>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>6. Your Privacy Rights</h2>
                            <p>
                                You have the right to request access to the personal data we hold about you, request corrections to any inaccurate data, or request the deletion of your data, subject to certain legal exceptions (e.g., records required for property ownership).
                            </p>
                        </div>

                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>7. Contact Us</h2>
                            <p>
                                If you have questions or comments about this policy, you may email us at <a href="mailto:hello@wisdomkwatismartcity.com" style={{ color: "var(--accent-green)", textDecoration: "none", fontWeight: "500" }}>hello@wisdomkwatismartcity.com</a>.
                            </p>
                        </div>

                    </div>

                </div>
            </section>
        </main>
    );
}
