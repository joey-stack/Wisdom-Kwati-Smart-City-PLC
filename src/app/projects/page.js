'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const STATIC_PROJECTS = [
  {
    id: "mabushi-district",
    name: "Ellington Villa",
    location: "Mabushi, Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1rqJ7nHkX-nN-BaI5oXkt55-l6BcvG-qU%26sz=w1200",
    state: "abuja",
    neighborhood: "mabushi",
    estate: "ellington villa",
    isStatic: true
  },
  {
    id: "guzape-estate",
    name: "Nimi Hills",
    location: "Guzape, Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1AfA4qAiAd3NQPFRkujrl_Or6dAgG-QqP%26sz=w1200",
    state: "abuja",
    neighborhood: "guzape",
    estate: "nimi hills",
    isStatic: true
  },
  {
    id: "palm-haven",
    name: "Palm Haven",
    location: "Apo Tafyi, Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1eMbw99C0kjQqbNZoyN4rieCduY_uNnuZ%26sz=w1200",
    state: "abuja",
    neighborhood: "apo tafyi",
    estate: "palm haven",
    isStatic: true
  },
  {
    id: "maitama-district",
    name: "Kwati City",
    location: "Maitama II, Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1y65H-RgWhwbiZ0ZlJKay6Qj4bYtHZL6D%26sz=w1200",
    state: "abuja",
    neighborhood: "maitama ii",
    estate: "kwati city",
    isStatic: true
  },
  {
    id: "royal-city",
    name: "Royal City",
    location: "Kuje, Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200",
    state: "abuja",
    neighborhood: "kuje",
    estate: "royal city",
    isStatic: true
  },
  {
    id: "beverly-hills",
    name: "Beverly Hills",
    location: "Kuje, Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1SMA1L09Z3xg6nV7hIpSs8BAOM70IHb8s%26sz=w1200",
    state: "abuja",
    neighborhood: "kuje",
    estate: "beverly hills",
    isStatic: true
  },
  {
    id: "lakeside-view",
    name: "Lakeside View",
    location: "Kuje, Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200",
    state: "abuja",
    neighborhood: "kuje",
    estate: "lakeside view",
    isStatic: true
  },
  {
    id: "karsana-district",
    name: "Whispering Pines",
    location: "Karsana, Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://lh3.googleusercontent.com/u/0/d/1FKHV1OKlto7dJFQqUk-xjlu4-M7w4vFN",
    state: "abuja",
    neighborhood: "karsana",
    estate: "whispering pines",
    isStatic: true
  },
  {
    id: "wisdom-kwati-smart-city",
    name: "Wisdom Kwati Smart City",
    location: "Karshi, Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1s5vsiqmbnMMTONiebu1vG2r_Yvcfd6KL%26sz=w1200",
    state: "abuja",
    neighborhood: "karshi",
    estate: "wisdom kwati smart city",
    isStatic: true
  },
  {
    id: "hof-community",
    name: "The HOF Community",
    location: "Life Camp, Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1K9BgIgXG_xT9slAfRl32icd95C1bmoOz%26sz=w1200",
    state: "abuja",
    neighborhood: "life camp",
    estate: "the hof community",
    isStatic: true
  },
  {
    id: "fintiri-extension",
    name: "Fintiri Extension",
    location: "Yola, Adamawa",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1KGLdqvAPmRLFCi_vYeKe8nJ0yms7idqb%26sz=w1200",
    state: "adamawa",
    neighborhood: "yola",
    estate: "fintiri extension",
    isStatic: true
  },
  {
    id: "katampe-extension",
    name: "Murg City",
    location: "Katampe Ext., Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1hxVqzWX7fTw6I2a2KMNgz53N9JAmgzO4%26sz=w1200",
    state: "abuja",
    neighborhood: "katampe ext.",
    estate: "murg city",
    isStatic: true
  },
  {
    id: "katampe-extension",
    name: "Murg City Exclusive",
    location: "Katampe Ext., Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1SgY9v0_USlmGyfIO1J9bE8TA4fbwYETM%26sz=w1200",
    state: "abuja",
    neighborhood: "katampe ext.",
    estate: "murg city exclusive",
    isStatic: true
  },
  {
    id: "katampe-extension",
    name: "Sunset Haven",
    location: "Katampe Ext., Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1dP8dOZmR2Fg7mUkXUDiByr06e64h50Lh%26sz=w1200",
    state: "abuja",
    neighborhood: "katampe ext.",
    estate: "sunset haven",
    isStatic: true
  },
  {
    id: "usulo-city",
    name: "Usulo City",
    location: "Kuje, Abuja",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1W78PkCZEKS_smIJHqajeKCdtYev7yGpZ%26sz=w1200",
    state: "abuja",
    neighborhood: "kuje",
    estate: "usulo city",
    isStatic: true
  },
  {
    id: "epe-smart-city",
    name: "Lagos Ekpe",
    location: "Epe, Lagos",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=11vBQAjvTsw6D_nR3Llikz7MLeCMUWJ34%26sz=w1200",
    state: "lagos",
    neighborhood: "epe",
    estate: "lagos ekpe",
    isStatic: true
  },
  {
    id: "sunbrook-estate",
    name: "Sunbrook Estate",
    location: "Yola, Adamawa",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1U1e8GB0DuhRemMH1LBYizaFHB9Gx-uLb%26sz=w1200",
    state: "adamawa",
    neighborhood: "yola",
    estate: "sunbrook estate",
    isStatic: true
  },
  {
    id: "port-harcourt-estate",
    name: "Garden Eden Estate",
    location: "Port Harcourt, Rivers",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1UlrWanL0sHutgi7BJQqadeXWXY9G3jLm%26sz=w1200",
    state: "rivers",
    neighborhood: "port harcourt",
    estate: "garden eden estate",
    isStatic: true
  },
  {
    id: "ph-rumu-olumeni",
    name: "PH Rumu-olumeni",
    location: "Port Harcourt, Rivers",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1U5Q-8bVvFGhPl8TJXrMk-s1EhexRPW7c%26sz=w1200",
    state: "rivers",
    neighborhood: "port harcourt",
    estate: "ph rumu-olumeni",
    isStatic: true
  }
];

export default function Page() {
  const [projects, setProjects] = useState(STATIC_PROJECTS);
  const [filterState, setFilterState] = useState('');
  const [filterNeighborhood, setFilterNeighborhood] = useState('');
  const [filterEstate, setFilterEstate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadCmsProjects() {
      try {
        const colRef = collection(db, 'projects');
        const snap = await getDocs(colRef);
        const dynamicList = [];
        snap.forEach((doc) => {
          const data = doc.data();
          dynamicList.push({
            id: doc.id,
            name: data.name || 'Dynamic Smart Estate',
            location: data.tagline || 'Abuja, Nigeria',
            image: data.detailsImage || data.heroImage || 'https://placehold.co/1200x800/111/fff?text=Smart+Estate',
            state: data.state || 'abuja',
            neighborhood: data.neighborhood || 'guzape ii',
            estate: data.name ? data.name.toLowerCase() : '',
            isStatic: false
          });
        });
        
        if (dynamicList.length > 0) {
          // Prepend dynamic CMS projects to standard static items
          setProjects([...dynamicList, ...STATIC_PROJECTS]);
        }
      } catch (err) {
        console.error('Error fetching CMS projects:', err);
      }
    }
    loadCmsProjects();
  }, []);

  const handleReset = () => {
    setFilterState('');
    setFilterNeighborhood('');
    setFilterEstate('');
    setSearchQuery('');
  };

  const filteredProjects = projects.filter((proj) => {
    if (filterState && proj.state !== filterState) return false;
    if (filterNeighborhood && proj.neighborhood !== filterNeighborhood) return false;
    if (filterEstate && proj.estate !== filterEstate) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = proj.name.toLowerCase().includes(q);
      const locMatch = proj.location.toLowerCase().includes(q);
      return nameMatch || locMatch;
    }
    return true;
  });

  return (
    <main>
      {/* Custom Card Cursor */}
      <div id="card-cursor" className="card-cursor">
        <span>VIEW</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>

      <main className="pj-main-content" style={{ background: "var(--bg-main)", paddingTop: "140px", paddingBottom: "120px" }}>
        {/* Hero Section */}
        <section className="pj-hero-section">
          <div className="container container-1380" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "32px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
              PROJECTS
              <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
            </div>
            <h1 className="pj-hero-title" style={{ fontFamily: "'Inter Display', sans-serif", fontSize: "40px", fontWeight: "500", lineHeight: "44px", color: "var(--text-primary)", marginBottom: "64px" }}>
              Estates engineered for smart, secure living.
            </h1>
          </div>
        </section>
        
        {/* Filter Bar */}
        <section className="pj-filter-section" style={{ marginBottom: "60px" }}>
          <div className="container container-1380">
            <div className="ht-filter-bar reveal-on-scroll">
              {/* Dropdown: State */}
              <div className="ht-filter-item">
                <label><i className="fa-solid fa-map" style={{ fontSize: "10px" }}></i> STATE</label>
                <div className="ht-select-wrapper">
                  <select id="filter-state" value={filterState} onChange={(e) => setFilterState(e.target.value)}>
                    <option value="">All States</option>
                    <option value="abuja">Abuja (FCT)</option>
                    <option value="lagos">Lagos</option>
                    <option value="adamawa">Adamawa</option>
                    <option value="rivers">Rivers</option>
                  </select>
                  <i className="fa-solid fa-chevron-down"></i>
                </div>
              </div>

              {/* Dropdown: Neighborhood */}
              <div className="ht-filter-item">
                <label><i className="fa-solid fa-location-dot" style={{ fontSize: "10px" }}></i> NEIGHBORHOOD</label>
                <div className="ht-select-wrapper">
                  <select id="filter-neighborhood" value={filterNeighborhood} onChange={(e) => setFilterNeighborhood(e.target.value)}>
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

              {/* Dropdown: Estate Name */}
              <div className="ht-filter-item">
                <label><i className="fa-solid fa-building" style={{ fontSize: "10px" }}></i> ESTATE NAME</label>
                <div className="ht-select-wrapper">
                  <select id="filter-estate" value={filterEstate} onChange={(e) => setFilterEstate(e.target.value)}>
                    <option value="">All Estates</option>
                    <option value="beverly hills">Beverly Hills</option>
                    <option value="ellington villa">Ellington Villa</option>
                    <option value="kwati city">Kwati City</option>
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

              {/* Search */}
              <div className="ht-filter-item">
                <label><i className="fa-solid fa-magnifying-glass" style={{ fontSize: "10px" }}></i> SEARCH</label>
                <div className="ht-select-wrapper ht-search-wrapper">
                  <input 
                    type="text" 
                    id="filter-search" 
                    placeholder="Search projects..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Reset */}
              <div className="ht-filter-action">
                <button className="ht-filter-reset-btn" id="filter-reset" onClick={handleReset}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> RESET
                </button>
              </div>
            </div>

            {/* No results message */}
            {filteredProjects.length === 0 && (
              <p id="pj-no-results" style={{ textAlign: "center", padding: "60px 0", fontFamily: "var(--font-main)", fontSize: "15px", color: "var(--text-secondary)" }}>
                No projects match your filters. Try adjusting your search.
              </p>
            )}
          </div>
        </section>

        {/* Listings Grid */}
        <section className="pj-grid-section">
          <div className="container container-1380">
            <div className="neighborhood-grid" id="project-grid">
              {filteredProjects.map((row, idx) => (
                <Link 
                  key={idx}
                  href={row.isStatic ? `/${row.id}` : `/projects/${row.id}`} 
                  className="neighborhood-card reveal-on-scroll" 
                >
                  <div className="neighborhood-image-wrapper">
                    <div className="neighborhood-image-inner">
                      <img loading="lazy" src={row.image} alt={row.name} referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div className="neighborhood-info">
                    <div className="neighborhood-details">
                      <h3 className="neighborhood-title" style={{ textTransform: 'capitalize' }}>{row.name}</h3>
                      <p className="neighborhood-location" style={{ textTransform: 'capitalize' }}>{row.location}</p>
                    </div>
                    <div className="neighborhood-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </main>
  );
}
