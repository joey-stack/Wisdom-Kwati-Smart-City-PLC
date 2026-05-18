'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const STATIC_HOUSE_TYPES = [
  {
    id: "imperial-emerald",
    name: "The Imperial Emerald",
    location: "Premium Class • 7BR Fully Detached",
    type: "Emerald Class Villa",
    estate: "maitama ii",
    neighborhood: "maitama ii",
    propType: "detached",
    beds: 7,
    baths: 8,
    size: "12,500 SQ FT",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200",
    isStatic: true
  },
  {
    id: "royal-emerald",
    name: "The Royal Emerald",
    location: "Premium Class • 5BR Fully Detached",
    type: "Emerald Class Villa",
    estate: "guzape ii",
    neighborhood: "guzape ii",
    propType: "detached",
    beds: 5,
    baths: 6,
    size: "8,200 SQ FT",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200",
    isStatic: true
  },
  {
    id: "star-sapphire",
    name: "The Star Sapphire",
    location: "Smart Class • 4BR Pent-House",
    type: "Sapphire Class Penthouse",
    estate: "katampe extension",
    neighborhood: "katampe extension",
    propType: "duplex",
    beds: 4,
    baths: 5,
    size: "5,500 SQ FT",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=19sBRWuZx6VQ-enPz4-9UlWgyfrGLKVX-%26sz=w1200",
    isStatic: true
  },
  {
    id: "blue-sapphire",
    name: "The Blue Sapphire",
    location: "Smart Class • 4BR Fully Detached",
    type: "Sapphire Class Duplex",
    estate: "karsana",
    neighborhood: "karsana",
    propType: "duplex",
    beds: 4,
    baths: 4,
    size: "4,200 SQ FT",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200",
    isStatic: true
  },
  {
    id: "white-sapphire",
    name: "The White Sapphire",
    location: "Smart Class • 4BR Semi-Detached",
    type: "Sapphire Class Duplex",
    estate: "mabushi",
    neighborhood: "mabushi",
    propType: "duplex",
    beds: 4,
    baths: 4,
    size: "3,800 SQ FT",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1A7k_VT1u7aBo45A3bDqgo86Cgl7xRRow%26sz=w1200",
    isStatic: true
  },
  {
    id: "black-onyx",
    name: "The Black Onyx",
    location: "Smart Class • 3BR Bungalow",
    type: "Onyx Class Bungalow",
    estate: "sangere numa",
    neighborhood: "adamawa",
    propType: "bungalow",
    beds: 3,
    baths: 3,
    size: "2,400 SQ FT",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1xDix9g0as7V5dV9U_uggWnkr_kdl5SpX%26sz=w1200",
    isStatic: true
  },
  {
    id: "red-onyx",
    name: "The Red Onyx",
    location: "Smart Class • 2BR Bungalow",
    type: "Onyx Class Bungalow",
    estate: "sangere numa",
    neighborhood: "adamawa",
    propType: "bungalow",
    beds: 2,
    baths: 2,
    size: "1,800 SQ FT",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EvTJIVwYq5NcbH33A3opCXBuNFyWNS92%26sz=w1200",
    isStatic: true
  },
  {
    id: "silver-pearl",
    name: "The Silver Pearl",
    location: "Luxury Class • 3BR Apartment",
    type: "Pearl Class Apartment",
    estate: "life camp",
    neighborhood: "life camp",
    propType: "flat",
    beds: 3,
    baths: 3,
    size: "2,200 SQ FT",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1cBO3as-XL4ecKLz_xur4TxlVn1eqbi4D%26sz=w1200",
    isStatic: true
  },
  {
    id: "white-pearl",
    name: "The White Pearl",
    location: "Luxury Class • 2BR Apartment",
    type: "Pearl Class Apartment",
    estate: "life camp",
    neighborhood: "life camp",
    propType: "flat",
    beds: 2,
    baths: 2,
    size: "1,600 SQ FT",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1YpYFPwZQUCf0k9tWJp13Y1kYzKe7npmJ%26sz=w1200",
    isStatic: true
  }
];

export default function Page() {
  const [houseTypes, setHouseTypes] = useState(STATIC_HOUSE_TYPES);
  const [filterType, setFilterType] = useState('');
  const [filterEstate, setFilterEstate] = useState('');
  const [filterNeighborhood, setFilterNeighborhood] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadCmsHouseTypes() {
      try {
        const colRef = collection(db, 'houseTypes');
        const snap = await getDocs(colRef);
        const dynamicList = [];
        
        snap.forEach((doc) => {
          const data = doc.data();
          dynamicList.push({
            id: doc.id,
            name: data.classType || 'Dynamic Spec',
            location: data.tagline || `${data.beds || 0}BR Smart Villa`,
            type: data.classType || 'Villa specification',
            estate: 'maitama ii', // default estate mappings
            neighborhood: 'maitama ii',
            propType: data.classType ? data.classType.toLowerCase() : 'villa',
            beds: data.beds || 0,
            baths: data.baths || 0,
            size: data.size || 'N/A',
            image: data.images && data.images.length > 0 ? data.images[0] : 'https://placehold.co/1200x800/111/fff?text=Smart+Villa',
            isStatic: false
          });
        });

        if (dynamicList.length > 0) {
          setHouseTypes([...dynamicList, ...STATIC_HOUSE_TYPES]);
        }
      } catch (err) {
        console.error('Error fetching CMS house types:', err);
      }
    }
    loadCmsHouseTypes();
  }, []);

  const handleReset = () => {
    setFilterType('');
    setFilterEstate('');
    setFilterNeighborhood('');
    setSearchQuery('');
  };

  const filteredHouseTypes = houseTypes.filter((ht) => {
    if (filterType && !ht.propType.includes(filterType)) return false;
    if (filterEstate && ht.estate !== filterEstate) return false;
    if (filterNeighborhood && ht.neighborhood !== filterNeighborhood) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = ht.name.toLowerCase().includes(q);
      const locMatch = ht.location.toLowerCase().includes(q);
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

      <div className="ht-main-content" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
        {/* Hero Section */}
        <section className="ht-hero-section">
          <div className="container container-1380" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <div className="ht-hero-label" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.07)", borderRadius: "100px", padding: "10px 20px", fontFamily: "var(--font-main)", fontWeight: "700", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-primary)", marginBottom: "32px" }}>
              <div className="label-square" style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
              HOUSE TYPES
              <div className="label-square" style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--text-primary)", flexShrink: "0" }}></div>
            </div>
            <h1 className="ht-headline" style={{ fontFamily: "'Inter Display', sans-serif", fontSize: "40px", fontWeight: "500", lineHeight: "44px", color: "var(--text-primary)", marginBottom: "48px" }}>
              Smart homes across our premium estates.
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
                  <select id="filter-type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
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
                  <select id="filter-estate" value={filterEstate} onChange={(e) => setFilterEstate(e.target.value)}>
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
                  <select id="filter-neighborhood" value={filterNeighborhood} onChange={(e) => setFilterNeighborhood(e.target.value)}>
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
                  <input 
                    type="text" 
                    id="filter-search" 
                    placeholder="Search house types..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="ht-filter-action">
                <button className="ht-filter-reset-btn" id="filter-reset" onClick={handleReset}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> RESET
                </button>
              </div>
            </div>
            
            {filteredHouseTypes.length === 0 && (
              <p id="ht-no-results" style={{ textAlign: "center", padding: "60px 0", fontFamily: "var(--font-main)", fontSize: "15px", color: "var(--text-secondary)" }}>
                No properties match your filters. Try adjusting your search.
              </p>
            )}
          </div>
        </section>

        {/* Listings Grid */}
        <section className="ht-grid-section">
          <div className="container container-1380">
            <div className="ht-grid" id="ht-grid">
              {filteredHouseTypes.map((row, idx) => (
                <Link 
                  key={idx}
                  href={row.isStatic ? `/${row.id}` : `/house-types/${row.id}`} 
                  className="ht-card reveal-on-scroll"
                >
                  <div className="ht-card-image">
                    <img loading="lazy" src={row.image} alt={row.name} referrerPolicy="no-referrer" />
                  </div>
                  <div className="ht-card-info">
                    <div className="ht-card-left">
                      <h3 className="ht-card-name">{row.name}</h3>
                      <p className="ht-card-location">{row.location}</p>
                    </div>
                    <div className="ht-card-right">
                      <p className="ht-card-type">{row.type}</p>
                      <div className="ht-card-specs">
                        <span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 7v10M21 7v10M3 14h18M5 14v-2.5a2.5 2.5 0 012.5-2.5h9A2.5 2.5 0 0119 11.5V14"></path>
                          </svg> {row.beds}
                        </span>
                        <span className="ht-dot"></span>
                        <span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M6 14v2a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                            <path d="M4 14h16M8 8V5a1 1 0 011-1h2"></path>
                          </svg> {row.baths}
                        </span>
                        <span className="ht-dot"></span>
                        <span>{row.size}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
