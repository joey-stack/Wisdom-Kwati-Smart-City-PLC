'use client';

import Link from 'next/link';

export default function Page() {
    return (
        <main>
            {/* Custom Card Cursor */}
            <div id="card-cursor" className="card-cursor">
                <span>VIEW</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>

            <div className="ht-main-content" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
                {/* Hero Section */}
                <section className="ht-hero-section">
                    <div className="container container-1380" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                        <div className="ht-hero-label" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "32px" }}>
                            <div className="label-square" style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                            HOUSE TYPES
                            <div className="label-square" style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                        </div>
                        <h1 className="ht-headline" style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "40px", fontStyle: "normal", fontWeight: "500", lineHeight: "44px", color: "var(--text-primary)", marginBottom: "48px" }}>
                            Smart homes across 20 estates in Abuja,<br />
                            Port Harcourt, Lagos, and beyond.
                        </h1>
                    </div>
                </section>

                {/* Filter Bar */}
                <section className="ht-filter-section">
                    <div className="container container-1380">
                        <div className="ht-filter-bar reveal-on-scroll">
                            <div className="ht-filter-item">
                                <label><i className="fa-solid fa-cube" style={{ fontSize: "10px" }}></i> PROPERTY TYPE</label>
                                <div className="ht-select-wrapper">
                                    <select id="filter-type">
                                        <option value="">All Property Types</option>
                                        <option value="bungalow">Bungalow</option>
                                        <option value="detached">Detached</option>
                                        <option value="duplex">Duplex</option>
                                        <option value="flat">Flat</option>
                                        <option value="villa">Villa</option>
                                    </select>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                            <div className="ht-filter-item">
                                <label><i className="fa-solid fa-building" style={{ fontSize: "10px" }}></i> ESTATE NAME</label>
                                <div className="ht-select-wrapper">
                                    <select id="filter-estate">
                                        <option value="">All Estates</option>
                                        <option value="ellington villa 1">Ellington Villa 1</option>
                                        <option value="ellington villa 2">Ellington Villa 2</option>
                                        <option value="epitome valley">Epitome Valley</option>
                                        <option value="gousa idu estate">Gousa Idu Estate</option>
                                        <option value="guzape ii estate">Guzape II Estate</option>
                                        <option value="maitama ii estate">Maitama II Estate</option>
                                        <option value="sangere numa">Sangere Numa</option>
                                        <option value="sunset haven">Sunset Haven</option>
                                        <option value="sunshine">Sunshine</option>
                                        <option value="whispering pines">Whispering Pines</option>
                                    </select>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                            <div className="ht-filter-item">
                                <label><i className="fa-solid fa-location-dot" style={{ fontSize: "10px" }}></i> NEIGHBORHOOD</label>
                                <div className="ht-select-wrapper">
                                    <select id="filter-neighborhood">
                                        <option value="">All Neighborhoods</option>
                                        <option value="gousa idu district">Gousa Idu District</option>
                                        <option value="guzape ii">Guzape II</option>
                                        <option value="karsana">Karsana</option>
                                        <option value="katampe extension">Katampe Extension</option>
                                        <option value="mabushi phase 1">Mabushi Phase 1</option>
                                        <option value="mabushi phase 2">Mabushi Phase 2</option>
                                        <option value="maitama ii">Maitama II</option>
                                        <option value="sangere numa, adamawa">Sangere Numa, Adamawa</option>
                                    </select>
                                    <i className="fa-solid fa-chevron-down"></i>
                                </div>
                            </div>
                            <div className="ht-filter-item">
                                <label><i className="fa-solid fa-magnifying-glass" style={{ fontSize: "10px" }}></i> SEARCH</label>
                                <div className="ht-select-wrapper ht-search-wrapper">
                                    <input type="text" id="filter-search" placeholder="Search house types..." />
                                </div>
                            </div>
                            <div className="ht-filter-action">
                                <button className="ht-filter-reset-btn" id="filter-reset">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> RESET
                                </button>
                            </div>
                        </div>
                        <p id="ht-no-results" style={{ display: "none", textAlign: "center", padding: "60px 0", fontFamily: "var(--font-main)", fontSize: "15px", color: "var(--text-secondary)" }}>
                            No properties match your filters. Try adjusting your search.
                        </p>
                    </div>
                </section>

                {/* Listings Grid */}
                <section className="ht-grid-section">
                    <div className="container container-1380">
                        <div className="ht-grid" id="ht-grid">
                            {/* Class: THE EMERALD */}
                            <a href="/imperial-emerald" className="ht-card reveal-on-scroll"
                                 data-name="the imperial emerald"
                                 data-estate="maitama ii"
                                 data-neighborhood="maitama ii"
                                 data-type="detached"
                                 data-specs="7 bedroom fully detached duplex">
                                <div className="ht-card-image">
                                    <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200" alt="The Imperial Emerald" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200'; }} />
                                </div>
                                <div className="ht-card-info">
                                    <div className="ht-card-left">
                                        <h3 className="ht-card-name">The Imperial Emerald</h3>
                                        <p className="ht-card-location">Premium Class • 7BR Fully Detached</p>
                                    </div>
                                    <div className="ht-card-right">
                                        <p className="ht-card-type">Emerald Class Villa</p>
                                        <div className="ht-card-specs">
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 7</span>
                                            <span className="ht-dot"></span>
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 8</span>
                                            <span className="ht-dot"></span>
                                            <span>12,500 SQ FT</span>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="/royal-emerald" className="ht-card reveal-on-scroll"
                                 data-name="the royal emerald"
                                 data-estate="guzape ii"
                                 data-neighborhood="guzape ii"
                                 data-type="detached"
                                 data-specs="5 bedroom fully detached duplex">
                                <div className="ht-card-image">
                                    <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200" alt="The Royal Emerald" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200'; }} />
                                </div>
                                <div className="ht-card-info">
                                    <div className="ht-card-left">
                                        <h3 className="ht-card-name">The Royal Emerald</h3>
                                        <p className="ht-card-location">Premium Class • 5BR Fully Detached</p>
                                    </div>
                                    <div className="ht-card-right">
                                        <p className="ht-card-type">Emerald Class Villa</p>
                                        <div className="ht-card-specs">
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 5</span>
                                            <span className="ht-dot"></span>
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 6</span>
                                            <span className="ht-dot"></span>
                                            <span>8,200 SQ FT</span>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            {/* Class: THE SAPPHIRE */}
                            <a href="/star-sapphire" className="ht-card reveal-on-scroll"
                                 data-name="the star sapphire"
                                 data-estate="katampe extension"
                                 data-neighborhood="katampe extension"
                                 data-type="duplex"
                                 data-specs="4 bedroom fully detached pent-house">
                                <div className="ht-card-image">
                                    <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200" alt="The Star Sapphire" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200'; }} />
                                </div>
                                <div className="ht-card-info">
                                    <div className="ht-card-left">
                                        <h3 className="ht-card-name">The Star Sapphire</h3>
                                        <p className="ht-card-location">Smart Class • 4BR Pent-House</p>
                                    </div>
                                    <div className="ht-card-right">
                                        <p className="ht-card-type">Sapphire Class Penthouse</p>
                                        <div className="ht-card-specs">
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 4</span>
                                            <span className="ht-dot"></span>
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 5</span>
                                            <span className="ht-dot"></span>
                                            <span>5,500 SQ FT</span>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="/blue-sapphire" className="ht-card reveal-on-scroll"
                                 data-name="the blue sapphire"
                                 data-estate="karsana"
                                 data-neighborhood="karsana"
                                 data-type="duplex"
                                 data-specs="4 bedroom fully detached duplex">
                                <div className="ht-card-image">
                                    <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200" alt="The Blue Sapphire" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200'; }} />
                                </div>
                                <div className="ht-card-info">
                                    <div className="ht-card-left">
                                        <h3 className="ht-card-name">The Blue Sapphire</h3>
                                        <p className="ht-card-location">Smart Class • 4BR Fully Detached</p>
                                    </div>
                                    <div className="ht-card-right">
                                        <p className="ht-card-type">Sapphire Class Duplex</p>
                                        <div className="ht-card-specs">
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 4</span>
                                            <span className="ht-dot"></span>
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 4</span>
                                            <span className="ht-dot"></span>
                                            <span>4,200 SQ FT</span>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="/white-sapphire" className="ht-card reveal-on-scroll"
                                 data-name="the white sapphire"
                                 data-estate="mabushi"
                                 data-neighborhood="mabushi"
                                 data-type="duplex"
                                 data-specs="4 bedroom semi detached duplex">
                                <div className="ht-card-image">
                                    <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200" alt="The White Sapphire" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200'; }} />
                                </div>
                                <div className="ht-card-info">
                                    <div className="ht-card-left">
                                        <h3 className="ht-card-name">The White Sapphire</h3>
                                        <p className="ht-card-location">Smart Class • 4BR Semi-Detached</p>
                                    </div>
                                    <div className="ht-card-right">
                                        <p className="ht-card-type">Sapphire Class Duplex</p>
                                        <div className="ht-card-specs">
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 4</span>
                                            <span className="ht-dot"></span>
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 4</span>
                                            <span className="ht-dot"></span>
                                            <span>3,800 SQ FT</span>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            {/* Class: THE ONYX */}
                            <a href="/black-onyx" className="ht-card reveal-on-scroll"
                                 data-name="the black onyx"
                                 data-estate="sangere numa"
                                 data-neighborhood="adamawa"
                                 data-type="bungalow"
                                 data-specs="3 bedroom bungalow">
                                <div className="ht-card-image">
                                    <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1xDix9g0as7V5dV9U_uggWnkr_kdl5SpX%26sz=w1200" alt="The Black Onyx" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200'; }} />
                                </div>
                                <div className="ht-card-info">
                                    <div className="ht-card-left">
                                        <h3 className="ht-card-name">The Black Onyx</h3>
                                        <p className="ht-card-location">Smart Class • 3BR Bungalow</p>
                                    </div>
                                    <div className="ht-card-right">
                                        <p className="ht-card-type">Onyx Class Bungalow</p>
                                        <div className="ht-card-specs">
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 3</span>
                                            <span className="ht-dot"></span>
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 3</span>
                                            <span className="ht-dot"></span>
                                            <span>2,400 SQ FT</span>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="/red-onyx" className="ht-card reveal-on-scroll"
                                 data-name="the red onyx"
                                 data-estate="sangere numa"
                                 data-neighborhood="adamawa"
                                 data-type="bungalow"
                                 data-specs="2 bedroom bungalow">
                                <div className="ht-card-image">
                                    <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EvTJIVwYq5NcbH33A3opCXBuNFyWNS92%26sz=w1200" alt="The Red Onyx" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200'; }} />
                                </div>
                                <div className="ht-card-info">
                                    <div className="ht-card-left">
                                        <h3 className="ht-card-name">The Red Onyx</h3>
                                        <p className="ht-card-location">Smart Class • 2BR Bungalow</p>
                                    </div>
                                    <div className="ht-card-right">
                                        <p className="ht-card-type">Onyx Class Bungalow</p>
                                        <div className="ht-card-specs">
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 2</span>
                                            <span className="ht-dot"></span>
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 2</span>
                                            <span className="ht-dot"></span>
                                            <span>1,800 SQ FT</span>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            {/* Class: THE PEARL */}
                            <a href="/silver-pearl" className="ht-card reveal-on-scroll"
                                 data-name="the silver pearl"
                                 data-estate="life camp"
                                 data-neighborhood="life camp"
                                 data-type="flat"
                                 data-specs="3 bedroom apartment">
                                <div className="ht-card-image">
                                    <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1cBO3as-XL4ecKLz_xur4TxlVn1eqbi4D%26sz=w1200" alt="The Silver Pearl" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200'; }} />
                                </div>
                                <div className="ht-card-info">
                                    <div className="ht-card-left">
                                        <h3 className="ht-card-name">The Silver Pearl</h3>
                                        <p className="ht-card-location">Luxury Class • 3BR Apartment</p>
                                    </div>
                                    <div className="ht-card-right">
                                        <p className="ht-card-type">Pearl Class Apartment</p>
                                        <div className="ht-card-specs">
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 3</span>
                                            <span className="ht-dot"></span>
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 3</span>
                                            <span className="ht-dot"></span>
                                            <span>2,200 SQ FT</span>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="/white-pearl" className="ht-card reveal-on-scroll"
                                 data-name="the white pearl"
                                 data-estate="life camp"
                                 data-neighborhood="life camp"
                                 data-type="flat"
                                 data-specs="2 bedroom apartment">
                                <div className="ht-card-image">
                                    <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1YpYFPwZQUCf0k9tWJp13Y1kYzKe7npmJ%26sz=w1200" alt="The White Pearl" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.src = 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200'; }} />
                                </div>
                                <div className="ht-card-info">
                                    <div className="ht-card-left">
                                        <h3 className="ht-card-name">The White Pearl</h3>
                                        <p className="ht-card-location">Luxury Class • 2BR Apartment</p>
                                    </div>
                                    <div className="ht-card-right">
                                        <p className="ht-card-type">Pearl Class Apartment</p>
                                        <div className="ht-card-specs">
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path></svg> 2</span>
                                            <span className="ht-dot"></span>
                                            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path><path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path></svg> 2</span>
                                            <span className="ht-dot"></span>
                                            <span>1,600 SQ FT</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
