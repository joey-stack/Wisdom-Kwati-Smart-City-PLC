import Link from 'next/link';

export default function Page() {
    return (
        <main>
            
    

    {/*  Custom Card Cursor  */}
    <div id="card-cursor" className="card-cursor">
        <span>VIEW</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    <main className="pj-main-content" style={{ background: "var(--bg-main)", paddingTop: "140px", paddingBottom: "120px" }}>
        {/*  Hero Section  */}
        <section className="pj-hero-section">
            <div className="container container-1380" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "32px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                    PROJECTS
                    <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
                </div>
                <h1 className="pj-hero-title" style={{ fontFamily: "'Inter Display', 'Inter Display Placeholder', sans-serif", fontSize: "40px", fontStyle: "normal", fontWeight: "500", lineHeight: "44px", color: "var(--text-primary)", marginBottom: "64px" }}>
                    20 estates across four Nigerian cities,<br />
                    engineered for smart, secure living.
                </h1>
            </div>
        </section>
        
        {/*  Filter Bar  */}
        <section className="pj-filter-section" style={{ marginBottom: "60px" }}>
            <div className="container container-1380">
                <div className="ht-filter-bar reveal-on-scroll">
                    {/*  Dropdown: State  */}
                    <div className="ht-filter-item">
                        <label><i className="fa-solid fa-map" style={{ fontSize: "10px" }}></i> STATE</label>
                        <div className="ht-select-wrapper">
                            <select id="filter-state">
                                <option value="">All States</option>
                                <option value="abuja">Abuja (FCT)</option>
                                <option value="lagos">Lagos</option>
                                <option value="adamawa">Adamawa</option>
                                <option value="rivers">Rivers</option>
                            </select>
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>

                    {/*  Dropdown: Neighborhood  */}
                    <div className="ht-filter-item">
                        <label><i className="fa-solid fa-location-dot" style={{ fontSize: "10px" }}></i> NEIGHBORHOOD</label>
                        <div className="ht-select-wrapper">
                            <select id="filter-neighborhood">
                                <option value="">All Neighborhoods</option>
                                <option value="katampe extension">Katampe Extension</option>
                                <option value="karsana">Karsana</option>
                                <option value="guzape ii">Guzape II</option>
                                <option value="mabushi">Mabushi</option>
                                <option value="maitama ii">Maitama II</option>
                                <option value="gousa idu district">Gousa Idu District</option>
                                <option value="life camp">Life Camp</option>
                                <option value="epe">Epe</option>
                                <option value="fintiri extension">Fintiri Extension</option>
                                <option value="sunbrook estate">Sunbrook Estate</option>
                                <option value="port harcourt">Port Harcourt</option>
                            </select>
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>

                    {/*  Dropdown: Estate Name  */}
                    <div className="ht-filter-item">
                        <label><i className="fa-solid fa-building" style={{ fontSize: "10px" }}></i> ESTATE NAME</label>
                        <div className="ht-select-wrapper">
                            <select id="filter-estate">
<option value="">All Estates</option>
                                <option value="beverly hills">Beverly Hills</option>
                                <option value="ellington villa">Ellington Villa</option>
                                <option value="kwati city">Kwati City</option>
                                <option value="lakeside view">Lakeside View</option>
                                <option value="murg city">Murg City</option>
                                <option value="murg city exclusive">Murg City Exclusive</option>
                                <option value="nimi hills">Nimi Hills</option>
                                <option value="palm haven">Palm Haven</option>
                                <option value="royal city">Royal City</option>
                                <option value="sunset haven">Sunset Haven</option>
                                <option value="usulo city">Usulo City</option>
                                <option value="whispering pines">Whispering Pines</option>
                                <option value="wisdom kwati smart city">Wisdom Kwati Smart City</option>
                                <option value="the hof community">The HOF Community</option>
                                <option value="lagos ekpe">Lagos Ekpe</option>
                                <option value="fintiri extension">Fintiri Extension</option>
                                <option value="sunbrook estate">Sunbrook Estate</option>
                                <option value="garden eden estate">Garden Eden Estate</option>
                                <option value="ph rumu-olumeni">PH Rumu-olumeni</option>
                            </select>
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                    </div>

                    {/*  Search  */}
                    <div className="ht-filter-item">
                        <label><i className="fa-solid fa-magnifying-glass" style={{ fontSize: "10px" }}></i> SEARCH</label>
                        <div className="ht-select-wrapper ht-search-wrapper">
                            <input type="text" id="filter-search" placeholder="Search projects..." />
                        </div>
                    </div>

                    {/*  Reset  */}
                    <div className="ht-filter-action">
                        <button className="ht-filter-reset-btn" id="filter-reset">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> RESET
                        </button>
                    </div>
                </div>

                {/*  No results message  */}
                <p id="pj-no-results" style={{ display: "none", textAlign: "center", padding: "60px 0", fontFamily: "var(--font-main)", fontSize: "15px", color: "var(--text-secondary)" }}>
                    No projects match your filters. Try adjusting your search.
                </p>
            </div>
        </section>

        {/*  Listings Grid  */}
        <section className="pj-grid-section">
            <div className="container container-1380">
                <div className="neighborhood-grid" id="project-grid">
                    <a href="/mabushi-district" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="mabushi" data-estate="ellington villa">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200" alt="Ellington Villa, Mabushi" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Ellington Villa</h3>
                                <p className="neighborhood-location">Mabushi, Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    <a href="/guzape-estate" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="guzape" data-estate="nimi hills">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP%26sz=w1200" alt="Nimi Hills, Guzape" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Nimi Hills</h3>
                                <p className="neighborhood-location">Guzape, Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    <a href="/palm-haven" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="apo tafyi" data-estate="palm haven">
                         <div className="neighborhood-image-wrapper">
                             <div className="neighborhood-image-inner">
                                 <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1eMbw99C0kjQqbNZoyN4rieCduY_uNnuZ%26sz=w1200" alt="Palm Haven, Apo Tafyi" referrerPolicy="no-referrer" />
                             </div>
                         </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Palm Haven</h3>
                                <p className="neighborhood-location">Apo Tafyi, Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    <a href="/maitama-district" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="maitama ii" data-estate="kwati city">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1y65H-RgWhwbiZ0ZlJKay6Qj4bYtHZL6D%26sz=w1200" alt="Kwati City, Maitama II" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Kwati City</h3>
                                <p className="neighborhood-location">Maitama II, Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    <a href="/royal-city" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="kuje" data-estate="royal city">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200" alt="Royal City, Kuje" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Royal City</h3>
                                <p className="neighborhood-location">Kuje, Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>

                    <a href="/beverly-hills" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="kuje" data-estate="beverly hills">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1SMA1L09Z3xg6nV7hIpSs8BAOM70IHb8s%26sz=w1200" alt="Beverly Hills, Kuje" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Beverly Hills</h3>
                                <p className="neighborhood-location">Kuje, Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    <a href="/lakeside-view" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="kuje" data-estate="lakeside view">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200" alt="Lakeside View, Kuje" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Lakeside View</h3>
                                <p className="neighborhood-location">Kuje, Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    
                    <a href="/karsana-district" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="karsana" data-estate="whispering pines">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://lh3.googleusercontent.com/u/0/d/1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN" alt="Whispering Pines, Karsana" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Whispering Pines</h3>
                                <p className="neighborhood-location">Karsana, Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    <a href="/wisdom-kwati-smart-city" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="karshi" data-estate="wisdom kwati smart city">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1s5vsiqmbnMMTONiebu1vG2r_Yvcfd6KL%26sz=w1200" alt="Wisdom Kwati Smart City, Karshi" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Wisdom Kwati Smart City</h3>
                                <p className="neighborhood-location">Karshi, Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    {/*  Card 16: The HOF Community  */}
                    <a href="/hof-community" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="life camp" data-estate="the hof community">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1K9BgIgXG_xT9slAfRl32icd95C1bmoOz%26sz=w1200" alt="The HOF Community, Life Camp" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">The HOF Community</h3>
                                <p className="neighborhood-location">Life Camp, Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    {/*  Card 13: Fintiri Extension  */}
                    <a href="/fintiri-extension" className="neighborhood-card reveal-on-scroll" 
                       data-state="adamawa" data-neighborhood="yola" data-estate="fintiri extension">
                         <div className="neighborhood-image-wrapper">
                             <div className="neighborhood-image-inner">
                                 <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1KGLdqvAPmRLFCi_vYeKe8nJ0yms7idqb%26sz=w1200" alt="Fintiri Extension, Yola" referrerPolicy="no-referrer" />
                             </div>
                         </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Fintiri Extension</h3>
                                <p className="neighborhood-location">Yola, Adamawa</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    <a href="/katampe-extension" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="katampe ext." data-estate="murg city">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1hxVqzWX7fTw6I2a2KMNgz53N9JAmgzO4%26sz=w1200" alt="Murg City, Katampe Ext." referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Murg City</h3>
                                <p className="neighborhood-location">Katampe Ext., Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    <a href="/katampe-extension" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="katampe ext." data-estate="murg city exclusive">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1SgY9v0_USlmGyfIO1J9bE8TA4fbwYETM%26sz=w1200" alt="Murg City Exclusive" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Murg City Exclusive</h3>
                                <p className="neighborhood-location">Katampe Ext., Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    
                    <a href="/katampe-extension" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="katampe ext." data-estate="sunset haven">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1dP8dOZmR2Fg7mUkXUDiByr06e64h50Lh%26sz=w1200" referrerPolicy="no-referrer" alt="Sunset Haven, Katampe Ext." />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Sunset Haven</h3>
                                <p className="neighborhood-location">Katampe Ext., Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    <a href="/usulo-city" className="neighborhood-card reveal-on-scroll" 
                       data-state="abuja" data-neighborhood="kuje" data-estate="usulo city">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1W78PkCZEKS_smIJHqajeKCdtYev7yGpZ%26sz=w1200" alt="Usulo City, Kuje" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Usulo City</h3>
                                <p className="neighborhood-location">Kuje, Abuja</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>

                    <a href="/epe-smart-city" className="neighborhood-card reveal-on-scroll" 
                       data-state="lagos" data-neighborhood="epe" data-estate="lagos ekpe">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=11vBQAjvTsw6D_nR3Llikz7MLeCMUWJ34%26sz=w1200" alt="Lagos Ekpe, Epe" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Lagos Ekpe</h3>
                                <p className="neighborhood-location">Epe, Lagos</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>


                    {/*  Card 13b: Sunbrook Estate  */}
                    <a href="/sunbrook-estate" className="neighborhood-card reveal-on-scroll" 
                       data-state="adamawa" data-neighborhood="yola" data-estate="sunbrook estate">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1U1e8GB0DuhRemMH1LBYizaFHB9Gx-uLb%26sz=w1200" alt="Sunbrook Estate, Yola" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Sunbrook Estate</h3>
                                <p className="neighborhood-location">Yola, Adamawa</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    <a href="/port-harcourt-estate" className="neighborhood-card reveal-on-scroll" 
                       data-state="rivers" data-neighborhood="port harcourt" data-estate="garden eden estate">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1UlrWanL0sHutgi7BJQqadeXWXY9G3jLm%26sz=w1200" alt="Garden Eden Estate, Port Harcourt" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">Garden Eden Estate</h3>
                                <p className="neighborhood-location">Port Harcourt, Rivers</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    {/*  Card 15: PH Rumu-olumeni  */}
                    <a href="/ph-rumu-olumeni" className="neighborhood-card reveal-on-scroll"
                       data-state="rivers" data-neighborhood="port harcourt" data-estate="ph rumu-olumeni">
                        <div className="neighborhood-image-wrapper">
                            <div className="neighborhood-image-inner">
                                <img loading="lazy" src="https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1U5Q-8bVvFGhPl8TJXrMk-s1EhexRPW7c%26sz=w1200" alt="PH Rumu-olumeni, Port Harcourt" referrerPolicy="no-referrer" />
                            </div>
                        </div>
                        <div className="neighborhood-info">
                            <div className="neighborhood-details">
                                <h3 className="neighborhood-title">PH Rumu-olumeni</h3>
                                <p className="neighborhood-location">Port Harcourt, Rivers</p>
                            </div>
                            <div className="neighborhood-arrow">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                        </div>
                    </a>
                    
                </div>
            </div>
        </section>
    </main>

    

    

    

        </main>
    );
}
