'use client';

import Link from 'next/link';
import '../../styles/faq.css';

export default function FAQPage() {
    return (
        <main className="faq-page">
            {/*  Hero Section  */}
            <section className="pj-hero-section">
                <div className="container container-1380" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "32px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                        FAQS
                        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                    </div>
                    <h1 className="pj-hero-title" style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "40px", fontStyle: "normal", fontWeight: "500", lineHeight: "44px", color: "var(--text-primary)", marginBottom: "64px" }}>
                        Everything you wanted to know — <br />
                        and exactly how we can help.
                    </h1>
                </div>
            </section>

            {/* FAQ Sections */}
            <section className="faq-main-section">
                <div className="faq-container">
                    
                    {/* Category 1: General Inquiries */}
                    <div className="faq-category-block reveal-on-scroll">
                        <div className="section-line"></div>
                        <div className="sidebar-layout">
                            <div className="category-label">
                                <div className="label-square"></div>
                                GENERAL
                            </div>
                            <div className="faq-list">
                                <FAQItem 
                                    question="What services does your real estate company offer?" 
                                    answer="We offer houses and land sales for residential and commercial purposes, and agent partnership opportunities."
                                />
                                <FAQItem 
                                    question="What sets your company apart from other real estate firms?" 
                                    answer="We stand out for our transparency, trusted processes, and commitment to client satisfaction. Our foundation in software engineering and infrastructure ensures we build functional ecosystems, not just houses."
                                />
                                <FAQItem 
                                    question="Where are your offices located?" 
                                    answer="Our offices are located in Abuja, Lagos, Yola, and Port Harcourt."
                                />
                                <FAQItem 
                                    question="What types of properties do you specialise in?" 
                                    answer="We specialise in houses and lands for residential and commercial use, ranging from smart flats to luxury villas."
                                />
                                <FAQItem 
                                    question="How can I get in touch with your company for more information?" 
                                    answer="You can contact us via our website, phone, email (hello@wisdomkwatismartcity.com), or our various social media platforms."
                                />
                                <FAQItem 
                                    question="What is your company’s approach to customer service?" 
                                    answer="We focus on transparency, professionalism, and ensuring a smooth, stress-free experience for all our clients."
                                />
                                <FAQItem 
                                    question="How can I stay updated on your company’s latest news and listings?" 
                                    answer="Follow us on our social media platforms or subscribe to our newsletter in the footer below for real-time updates."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category 2: Agent Partnership */}
                    <div className="faq-category-block reveal-on-scroll">
                        <div className="section-line"></div>
                        <div className="sidebar-layout">
                            <div className="category-label">
                                <div className="label-square"></div>
                                AGENTS
                            </div>
                            <div className="faq-list">
                                <FAQItem 
                                    question="How can I become an agent?" 
                                    answer={
                                        <>
                                            You can become an agent by signing up on our dedicated agent portal: <a href="https://wkscagents.com" target="_blank" rel="noopener noreferrer" className="faq-inline-link">wkscagents.com</a>
                                        </>
                                    }
                                />
                                <FAQItem 
                                    question="How can I learn more about your team of agents?" 
                                    answer="You can learn more or join the team by visiting wkscagents.com. Our agents are local experts trained to provide real guidance."
                                />
                                <FAQItem 
                                    question="What is expected of the agent throughout the purchase?" 
                                    answer="Agents are expected to guide clients, provide accurate information, ensure proper documentation, and facilitate a smooth transaction process from start to finish."
                                />
                                <FAQItem 
                                    question="What percentage of the sale price goes to the agent as commission?" 
                                    answer="Our agents earn a 10% commission on land sales and a 5% commission on house sales."
                                />
                                <FAQItem 
                                    question="Are agent commissions negotiable?" 
                                    answer="No, commissions are fixed at 10% for land and 5% for houses and are not negotiable."
                                />
                                <FAQItem 
                                    question="Who is responsible for paying the agent’s commission?" 
                                    answer="The company pays the agent’s commission directly after full payment has been received from the client."
                                />
                                <FAQItem 
                                    question="How is the commission affected if the property price changes during negotiations?" 
                                    answer="The commission is always calculated based on the final agreed sale price."
                                />
                                <FAQItem 
                                    question="When is the agent’s commission paid?" 
                                    answer="Commission is paid upon completion of full payment by the client and once the transaction is officially confirmed."
                                />
                                <FAQItem 
                                    question="What happens to the commission if the sale falls through?" 
                                    answer="No commission is paid if the sale is not successfully completed."
                                />
                                <FAQItem 
                                    question="Can I request a breakdown of the commission fees?" 
                                    answer="Yes, agents can request a detailed breakdown of their earned commissions at any time."
                                />
                                <FAQItem 
                                    question="What happens to my commission if my client requests a refund?" 
                                    answer="If a refund occurs, the commission previously paid may be reversed or adjusted accordingly against future earnings."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Category 3: Refund Policies */}
                    <div className="faq-category-block reveal-on-scroll">
                        <div className="section-line"></div>
                        <div className="sidebar-layout">
                            <div className="category-label">
                                <div className="label-square"></div>
                                REFUNDS
                            </div>
                            <div className="faq-list">
                                <FAQItem 
                                    question="What is the refund policy for deposits or down payments?" 
                                    answer="A 20% deduction applies for administrative charges. Refunds are processed 90 days after the receipt of a formal refund application."
                                />
                                <FAQItem 
                                    question="Under what circumstances am I eligible for a refund?" 
                                    answer="You are eligible for a refund whenever you are unwilling to proceed with the purchase after making a part or full payment."
                                />
                                <FAQItem 
                                    question="How do I request a refund?" 
                                    answer="Requests must be made by writing a letter addressed to the MD. The letter must be signed, have an ID card attached, and upon approval, you must return all documents previously issued to you."
                                />
                                <FAQItem 
                                    question="Are there any fees associated with processing a refund?" 
                                    answer="There are no additional 'fees', however, a 20% deduction is made from the total amount paid to cover administrative charges."
                                />
                                <FAQItem 
                                    question="How long does it take to receive a refund after approval?" 
                                    answer="It takes 90 days from the day the company receives the formal letter requesting the refund."
                                />
                                <FAQItem 
                                    question="Can I get a refund if I change my mind about a purchase?" 
                                    answer="Yes, you can request a refund if you change your mind, subject to the 20% administrative deduction."
                                />
                                <FAQItem 
                                    question="What happens if I believe my refund amount is incorrect?" 
                                    answer="You can reach out to us through our customer care line, social media handles, or by emailing hello@wisdomkwatismartcity.com."
                                />
                                <FAQItem 
                                    question="Is there a deadline for requesting a refund?" 
                                    answer="Yes, the deadline is before physical allocation has been given. Any request before physical allocation is subject to our terms and conditions."
                                />
                                <FAQItem 
                                    question="How will my refund be issued?" 
                                    answer="Refunds are issued via bank transfer to the account provided, which must match the name used for the initial purchase."
                                />
                                <FAQItem 
                                    question="Can I transfer a refund to a different property purchase?" 
                                    answer="Yes, you can transfer your funds to another property. Write a letter to the MD, return all original documents, and we will handle the process from there."
                                />
                                <FAQItem 
                                    question="What happens if the company backs out of a deal?" 
                                    answer="An alternative location of equal or close value will be offered. If the client declines the alternative, a full refund (100%) will be issued within 90 days."
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="faq-cta-section reveal-on-scroll">
                <div className="container container-1380">
                    <div className="faq-cta-card">
                        <h2>Still have questions?</h2>
                        <p>Our team is here to help you navigate your smart city journey.</p>
                        <div className="faq-cta-buttons">
                            <a href="/contact" className="btn-pill">
                                <span className="flip-text">
                                    <span>CONTACT US</span>
                                    <span aria-hidden="true">CONTACT US</span>
                                </span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </a>
                            <a href="mailto:hello@wisdomkwatismartcity.com" className="btn-pill">
                                <span className="flip-text">
                                    <span>EMAIL SUPPORT</span>
                                    <span aria-hidden="true">EMAIL SUPPORT</span>
                                </span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function FAQItem({ question, answer }) {
    return (
        <div className="faq-item">
            <button className="faq-trigger">
                <span className="faq-question">{question}</span>
                <span className="faq-plus-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </span>
            </button>
            <div className="faq-panel">
                <div className="faq-content">
                    {answer}
                </div>
            </div>
        </div>
    );
}
