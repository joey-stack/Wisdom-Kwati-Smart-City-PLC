'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState(null); // 'projects', 'house-types', or null
    
    // Auto-close menu when path changes
    useEffect(() => {
        setIsMenuOpen(false);
        setActiveAccordion(null);
    }, [pathname]);

    // Handle body scroll locking and Lenis integration
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('menu-active');
            document.body.classList.add('no-scroll');
            if (window.lenis) {
                window.lenis.stop();
            }
        } else {
            document.body.classList.remove('menu-active');
            document.body.classList.remove('no-scroll');
            if (window.lenis) {
                window.lenis.start();
            }
        }
        return () => {
            document.body.classList.remove('menu-active');
            document.body.classList.remove('no-scroll');
            if (window.lenis) {
                window.lenis.start();
            }
        };
    }, [isMenuOpen]);

    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <>
            {/*  Navigation  */}
            <nav className="navbar">
                <div className="nav-container">
                    <a href="/" className="logo" aria-label="Wisdom Kwati Smart City Home">
                        <img 
                            src="https://images.weserv.nl/?url=https%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Dview%26id%3D1cbeI43eSomsIyWb9SI50mmm6L49OAF-g" 
                            alt="Wisdom Kwati Smart City Logo"
                        />
                    </a>
                    
                    <ul className="nav-links">
                        <li><a href="/about"><div className="flip-text"><span>About</span><span aria-hidden="true">About</span></div></a></li>
                        <li className="nav-item has-dropdown">
                            <a href="/projects" className="projects-trigger" aria-haspopup="true" aria-expanded="false">
                                <div className="flip-text">
                                    <span>Projects</span>
                                    <span aria-hidden="true">Projects</span>
                                </div>
                                <svg className="dropdown-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </a>
                        </li>

                        <li className="nav-item has-dropdown">
                            <a href="/house-types" className="house-trigger" aria-haspopup="true" aria-expanded="false">
                                <div className="flip-text">
                                    <span>House Types</span>
                                    <span aria-hidden="true">House Types</span>
                                </div>
                                <svg className="dropdown-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </a>
                        </li>
                        <li><a href="/careers"><div className="flip-text"><span>Careers</span><span aria-hidden="true">Careers</span></div></a></li>
                        <li><a href="/contact"><div className="flip-text"><span>Contact</span><span aria-hidden="true">Contact</span></div></a></li>
                    </ul>

                    <button className="nav-cta">
                        <div className="flip-text">
                            <span>REQUEST A SITE VISIT</span>
                            <span aria-hidden="true">REQUEST A SITE VISIT</span>
                        </div>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>

                    {/*  Mobile Menu Toggle  */}
                    <button 
                        className="menu-toggle" 
                        aria-label="Toggle Menu" 
                        aria-expanded={isMenuOpen}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                    >
                        <span className="hamburger-line line-1"></span>
                        <span className="hamburger-line line-2"></span>
                    </button>
                </div>

                {/*  Mega Menu System: Positional Stability Integration  */}
                
                {/*  House Types: Cinematic Card Layout  */}
                <div className="mega-menu-wrapper house-types-menu">
                    <div className="mega-menu">
                        <div className="mega-menu-grid-4">
                            <a href="/house-types/white-pearl" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>The White Pearl</h3>
                                        <p>Sophisticated 2-bedroom apartment offering clean, luxury modern living in highly secure smart communities.</p>
                                        <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            <a href="/house-types/blue-sapphire" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>The Blue Sapphire</h3>
                                        <p>Spacious 4-bedroom detached duplex designed for modern family living in secure estates.</p>
                                        <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            <a href="/house-types/imperial-emerald" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>The Imperial Emerald</h3>
                                        <p>Ultra-luxury 7-bedroom smart villa with panoramic views and bespoke premium amenities.</p>
                                        <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            <a href="/house-types/jade-terrace" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>The Jade Terrace</h3>
                                        <p>Premium 4-bedroom terrace residence arranged over three distinct floors with dedicated study and service quarters.</p>
                                        <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            <a href="/house-types/royal-emerald" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>The Royal Emerald</h3>
                                        <p>Exquisite 5-bedroom premium villa combining grand architectural design and smart grid tech.</p>
                                        <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            <a href="/house-types/silver-pearl" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>The Silver Pearl</h3>
                                        <p>Stunning 3-bedroom luxury apartment featuring state-of-the-art layout and community parks.</p>
                                        <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            <a href="/house-types/star-sapphire" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>The Star Sapphire</h3>
                                        <p>Executive 4-bedroom smart penthouse engineered for high-privacy, automated living.</p>
                                        <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            <div className="mega-menu-card">
                                <div className="mega-menu-card-inner" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div className="card-content" style={{ padding: '0', gap: '8px' }}>
                                        <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>The Complete Portfolio</h3>
                                        <p style={{ maxWidth: '100%', fontSize: '13px', lineHeight: '1.5', color: 'rgba(255,248,237,0.6)', marginBottom: '4px' }}>From smart bungalows and apartments to sprawling seven-bedroom luxury villas, every WKSC property runs on our smart infrastructure ecosystem.</p>
                                        <a href="/house-types" className="btn-pill" style={{ alignSelf: 'flex-start', transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                                            <div className="flip-text">
                                                <span>VIEW ALL TYPES</span>
                                                <span aria-hidden="true">VIEW ALL TYPES</span>
                                            </div>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects: High-Density Portfolio Directory */}
                <div className="mega-menu-wrapper projects-menu">
                    <div className="mega-menu">
                        <div className="mega-menu-grid-5">
                            <a href="/projects-abuja" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>Abuja Central</h3>
                                        <p>Flagship smart districts in Guzape II, Maitama II, and the eco-focused Whispering Pines.</p>
                                        <span className="card-link">View Projects <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            <a href="/projects-lagos" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>Lagos Urban</h3>
                                        <p>Emerging smart communities and strategic commercial land holdings in the heart of Epe.</p>
                                        <span className="card-link">View Projects <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            <a href="/projects-ph" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>Port Harcourt</h3>
                                        <p>Strategic coastal developments in Garden City Estate and Rumu-olumeni designed for the future.</p>
                                        <span className="card-link">View Projects <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            <a href="/projects-yola" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>Yola Heritage</h3>
                                        <p>Northern expansion bringing smart living to Adamawa meets traditional innovation.</p>
                                        <span className="card-link">View Projects <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            <a href="/projects-kaduna" className="mega-menu-card">
                                <div className="mega-menu-card-inner">
                                    <div className="card-content">
                                        <h3>Kaduna Smart District</h3>
                                        <p>Strategic Northern hub developments combining high-density residency and commercial integration.</p>
                                        <span className="card-link">View Projects <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                                    </div>
                                </div>
                            </a>
                            {/*  6. Complete Projects Directory  */}
                            <div className="mega-menu-card">
                                <div className="mega-menu-card-inner" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div className="card-content" style={{ padding: '0', gap: '8px' }}>
                                        <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>All Developments</h3>
                                        <p style={{ maxWidth: '100%', fontSize: '13px', lineHeight: '1.5', color: 'rgba(255,248,237,0.6)', marginBottom: '4px' }}>From Northern hubs to coastal expansion, explore our entire 20-estate portfolio across Nigeria and beyond.</p>
                                        <a href="/projects" className="btn-pill" style={{ alignSelf: 'flex-start', transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                                            <div className="flip-text">
                                                <span>VIEW ALL PROJECTS</span>
                                                <span aria-hidden="true">VIEW ALL PROJECTS</span>
                                            </div>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMenuOpen ? 'menu-active' : ''}`} role="dialog" aria-label="Mobile navigation menu">
                {/* Header Row */}
                <div className="mobile-menu-header" style={{ justifyContent: 'flex-end' }}>
                    <button 
                        className="mobile-menu-close-btn"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Close
                    </button>
                </div>

                {/* Main Links (Typography-focused vertical stack) */}
                <div className="mobile-menu-body">
                    <ul className="mobile-nav-links">
                        <li><a href="/" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                        <li><a href="/about" onClick={() => setIsMenuOpen(false)}>About</a></li>
                        <li><a href="/projects" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
                        <li><a href="/house-types" onClick={() => setIsMenuOpen(false)}>House Types</a></li>
                        <li><a href="/careers" onClick={() => setIsMenuOpen(false)}>Careers</a></li>
                        <li><a href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
                    </ul>
                </div>

                {/* Footer Section */}
                <div className="mobile-menu-footer">
                    <div className="footer-top-row">
                        <div className="footer-col-left">
                            <span className="footer-label">Socials</span>
                            <a href="#" className="footer-value">@wksc_plc</a>
                            <span className="footer-value-secondary">Abuja / Lagos / Yola</span>
                        </div>
                        <div className="footer-col-right">
                            <span className="footer-label">Get in Touch</span>
                            <a href="mailto:info@wisdomkwati.com" className="footer-value">info@wisdomkwati.com</a>
                            <a href="tel:+2349087654321" className="footer-value-secondary">+234 908 765 4321</a>
                        </div>
                    </div>
                    <div className="footer-divider-line"></div>
                    <div className="footer-bottom-row">
                        <span className="footer-bottom-left">Wisdom Kwati</span>
                        <span className="footer-bottom-right">Smart City PLC</span>
                    </div>
                </div>
            </div>
        </>
    );
}
