'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <>
                <footer className="footer-section" role="contentinfo" aria-label="Site footer">
        <div className="footer-container">
            {/*  Top Grid: Interactive Links  */}
            <div className="footer-top-grid">
                <div className="footer-column">
                    <div className="column-label">
                        <span className="label-box"></span>
                        PAGES
                    </div>
                    <ul className="footer-nav-list">
                        <li><a href="/">
                            <div className="flip-text">
                                <span>Home</span>
                                <span aria-hidden="true">Home</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="/about">
                            <div className="flip-text">
                                <span>About us</span>
                                <span aria-hidden="true">About us</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="/#services">
                            <div className="flip-text">
                                <span>Services</span>
                                <span aria-hidden="true">Services</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="/blogs">
                            <div className="flip-text">
                                <span>Blogs</span>
                                <span aria-hidden="true">Blogs</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="/#reviews">
                            <div className="flip-text">
                                <span>Reviews</span>
                                <span aria-hidden="true">Reviews</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="/contact">
                            <div className="flip-text">
                                <span>Contact us</span>
                                <span aria-hidden="true">Contact us</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="/faqs">
                            <div className="flip-text">
                                <span>FAQs</span>
                                <span aria-hidden="true">FAQs</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <div className="column-label">
                        <span className="label-box"></span>
                        EXPLORE PROPERTIES
                    </div>
                    <ul className="footer-nav-list">
                        <li><a href="/#house-types">
                            <div className="flip-text">
                                <span>House Types</span>
                                <span aria-hidden="true">House Types</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="#">
                            <div className="flip-text">
                                <span>Agents</span>
                                <span aria-hidden="true">Agents</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="/#neighborhoods">
                            <div className="flip-text">
                                <span>Neighborhoods</span>
                                <span aria-hidden="true">Neighborhoods</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <div className="column-label">
                        <span className="label-box"></span>
                        CATEGORIES
                    </div>
                    <ul className="footer-nav-list">
                        <li><a href="#">
                            <div className="flip-text">
                                <span>Villa</span>
                                <span aria-hidden="true">Villa</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="#">
                            <div className="flip-text">
                                <span>Single Family Home</span>
                                <span aria-hidden="true">Single Family Home</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="#">
                            <div className="flip-text">
                                <span>Luxury Homes</span>
                                <span aria-hidden="true">Luxury Homes</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="#">
                            <div className="flip-text">
                                <span>Apartment</span>
                                <span aria-hidden="true">Apartment</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="#">
                            <div className="flip-text">
                                <span>Commercial</span>
                                <span aria-hidden="true">Commercial</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                        <li><a href="#">
                            <div className="flip-text">
                                <span>Land</span>
                                <span aria-hidden="true">Land</span>
                            </div>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </a></li>
                    </ul>
                </div>
            </div>

            {/*  Brand Center: Massive Display  */}
            <div className="footer-brand-display">
                <div className="brand-text-container">
                    <h2 className="brand-massive-text">WKSC PLC</h2>
                </div>
                
                <div className="social-grid">
                    <a href="#" className="social-item" aria-label="Follow us on LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
                    <a href="#" className="social-item" aria-label="Follow us on Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="social-item" aria-label="Follow us on TikTok"><i className="fa-brands fa-tiktok"></i></a>
                    <a href="#" className="social-item" aria-label="Follow us on Instagram"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#" className="social-item" aria-label="Subscribe on YouTube"><i className="fa-brands fa-youtube"></i></a>
                    <a href="#" className="social-item" aria-label="Follow us on X"><i className="fa-brands fa-x-twitter"></i></a>
                </div>
            </div>

            {/*  Newsletter Row  */}
            <div className="footer-newsletter-row">
                <div className="newsletter-label">
                    <span className="indicator-dot"></span>
                    GET FRESH UPDATES
                </div>
                <div className="newsletter-group">
                    <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
                    <input type="email" id="newsletter-email" placeholder="jane@framer.com" className="newsletter-input" required />
                    <button type="submit" className="newsletter-submit-btn">
                        <div className="flip-text">
                            <span>SUBSCRIBE</span>
                            <span aria-hidden="true">SUBSCRIBE</span>
                        </div>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </div>

            {/*  Bottom Bar  */}
            <div className="footer-bottom-bar">
                <div className="bottom-left">
                    <a href="#">PRIVACY POLICY</a>
                    <a href="#">TERMS</a>
                </div>
                <div className="bottom-center">
                    <span className="copyright">©2026 WISDOM KWATI SMART CITY PLC. REG RC 1573033.</span>
                    <span style={{ fontSize: '10px', opacity: 0.5, marginLeft: '10px' }}>LAST UPDATED: MAY 2026</span>
                </div>
                <div className="bottom-right">
                    <span className="signature">BUILT BY CODESIGHT</span>
                </div>
            </div>
        </div>
    </footer>

        </>
    );
}
