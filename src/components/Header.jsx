'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    
    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <>
                {/*  Navigation  */}
    <nav className="navbar">
        <div className="nav-container">
            <a href="/" className="logo" aria-label="Wisdom Kwati Smart City Home">
                <svg width="280" height="60" viewBox="0 0 550 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/*  Mountain/Icon  */}
                    <path d="M40 90L90 40L140 90H40Z" fill="#1E8FC4"/>
                    <path d="M70 90L120 40L170 90H70Z" fill="#4BB7EB" fillOpacity="0.8"/>
                    <path d="M100 90L150 40L200 90H100Z" fill="#0F4B94"/>
                    <rect x="30" y="100" width="180" height="6" rx="3" fill="#BBE339"/>
                    
                    {/*  Text  */}
                    <text x="220" y="60" fontFamily="Outfit, sans-serif" fontWeight="700" fontSize="34" fill="#1A1A1A">Wisdom Kwati</text>
                    <text x="220" y="95" fontFamily="Outfit, sans-serif" fontWeight="600" fontSize="30" fill="#1A1A1A">Smart City PLC</text>
                </svg>
            </a>
            
            <ul className="nav-links">
                <li><a href="/about"><div className="flip-text"><span>About</span><span aria-hidden="true">About</span></div></a></li>
                <li className="nav-item has-dropdown">
                    <a href="/projects" className="projects-trigger">
                        <div className="flip-text">
                            <span>Projects</span>
                            <span aria-hidden="true">Projects</span>
                        </div>
                        <svg className="dropdown-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </a>
                </li>

                <li className="nav-item has-dropdown">
                    <a href="/house-types" className="house-trigger">
                        <div className="flip-text">
                            <span>House Types</span>
                            <span aria-hidden="true">House Types</span>
                        </div>
                        <svg className="dropdown-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </a>
                </li>
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
            <button className="menu-toggle" aria-label="Toggle Menu">
                <span className="hamburger-line line-1"></span>
                <span className="hamburger-line line-2"></span>
            </button>
        </div>

        {/*  Mega Menu System: Positional Stability Integration  */}
        
        {/*  House Types: Cinematic Card Layout  */}
        <div className="mega-menu-wrapper house-types-menu">
            <div className="mega-menu">
                <div className="mega-menu-grid-4">
                    <a href="/emerald-villa" className="mega-menu-card">
                        <div className="mega-menu-card-inner">
                            <div className="card-content">
                                <h3>The Emerald 2.0</h3>
                                <p>Zenith of smart luxury. 7-bed villas with world-class automation.</p>
                                <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                            </div>
                        </div>
                    </a>
                    <a href="/sapphire-terrace" className="mega-menu-card">
                        <div className="mega-menu-card-inner">
                            <div className="card-content">
                                <h3>The Sapphire</h3>
                                <p>Urban style redefined. 4-bed terrace duplexes for modern city life.</p>
                                <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                            </div>
                        </div>
                    </a>
                    <a href="/diamond-duplex" className="mega-menu-card">
                        <div className="mega-menu-card-inner">
                            <div className="card-content">
                                <h3>The Diamond</h3>
                                <p>Balanced family living. 4-bed smart duplexes with automated features.</p>
                                <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                            </div>
                        </div>
                    </a>
                    <a href="/topaz-semi" className="mega-menu-card">
                        <div className="mega-menu-card-inner">
                            <div className="card-content">
                                <h3>The Topaz</h3>
                                <p>Shared elegance. 4-bed semi-detached duplexes blending community & luxury.</p>
                                <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                            </div>
                        </div>
                    </a>
                    <a href="/onyx-flats" className="mega-menu-card">
                        <div className="mega-menu-card-inner">
                            <div className="card-content">
                                <h3>The Onyx</h3>
                                <p>Modern comfort. 2-bed flats ideal for young professionals.</p>
                                <span className="card-link">View Details <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
                            </div>
                        </div>
                    </a>
                    <div className="mega-menu-card">
                        <div className="mega-menu-card-inner" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div className="card-content" style={{ padding: '0', gap: '8px' }}>
                                <h3 style={{ fontSize: '20px', marginBottom: '4px' }}>The Complete Portfolio</h3>
                                <p style={{ maxWidth: '100%', fontSize: '13px', lineHeight: '1.5', color: 'rgba(255,248,237,0.6)', marginBottom: '4px' }}>From smart flats for urban professionals to sprawling seven-bedroom luxury villas, every WKSC property runs on our proprietary infrastructure ecosystem.</p>
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
    <div className="mobile-menu-overlay">
        <button className="menu-close" aria-label="Close Menu">&times;</button>
        <div className="mobile-menu-content">
            <ul className="mobile-nav-links">
                <li><a href="/about">About</a></li>
                <li className="mobile-nav-item">
                    <a href="/projects">
                        Projects
                        <svg className="dropdown-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </a>
                    <div className="mobile-accordion-content">
                        <a href="/projects-abuja" className="mobile-compact-card">
                            <div className="compact-info">
                                <h4>Abuja Central</h4>
                                <p>Flagship smart districts</p>
                            </div>
                        </a>
                        <a href="/projects-lagos" className="mobile-compact-card">
                            <div className="compact-info">
                                <h4>Lagos Urban</h4>
                                <p>Emerging communities</p>
                            </div>
                        </a>
                        <a href="/projects-ph" className="mobile-compact-card">
                            <div className="compact-info">
                                <h4>Port Harcourt</h4>
                                <p>Coastal developments</p>
                            </div>
                        </a>
                        <a href="/projects-yola" className="mobile-compact-card">
                            <div className="compact-info">
                                <h4>Yola Heritage</h4>
                                <p>Northern expansion</p>
                            </div>
                        </a>
                        <a href="/projects-kaduna" className="mobile-compact-card">
                            <div className="compact-info">
                                <h4>Kaduna Smart District</h4>
                                <p>Strategic Northern hub</p>
                            </div>
                        </a>
                    </div>
                </li>

                <li className="mobile-nav-item">
                    <a href="/house-types">
                        House Types
                        <svg className="dropdown-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </a>
                    <div className="mobile-accordion-content">
                        <a href="/emerald-villa" className="mobile-compact-card">
                            <div className="compact-info">
                                <h4>The Emerald 2.0</h4>
                                <p>Zenith of luxury</p>
                            </div>
                        </a>
                        <a href="/sapphire-terrace" className="mobile-compact-card">
                            <div className="compact-info">
                                <h4>The Sapphire</h4>
                                <p>Urban style redefined</p>
                            </div>
                        </a>
                        <a href="/diamond-duplex" className="mobile-compact-card">
                            <div className="compact-info">
                                <h4>The Diamond</h4>
                                <p>Balanced family living</p>
                            </div>
                        </a>
                        <a href="/topaz-semi" className="mobile-compact-card">
                            <div className="compact-info">
                                <h4>The Topaz</h4>
                                <p>Shared elegance</p>
                            </div>
                        </a>
                        <a href="/onyx-flats" className="mobile-compact-card">
                            <div className="compact-info">
                                <h4>The Onyx</h4>
                                <p>Modern comfort</p>
                            </div>
                        </a>
                    </div>
                </li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            <button className="mobile-cta">
                <div className="flip-text">
                    <span>REQUEST A SITE VISIT</span>
                    <span aria-hidden="true">REQUEST A SITE VISIT</span>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        </div>
    </div>

        </>
    );
}
