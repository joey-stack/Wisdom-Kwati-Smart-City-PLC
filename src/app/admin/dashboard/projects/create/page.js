'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const DEFAULT_ADVISORS = {
  'samuel-kwati': {
    name: 'Samuel Kwati',
    role: 'Lead Property Specialist',
    email: 's.kwati@wisdomkwatismartcity.com',
    phone: '+234 810 002 5555',
    image: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa%26sz=w1200',
    quote: 'The HOF Community offers an exceptional balance of luxury and community living in one of Abuja\'s most desirable districts.',
    whatsapp: 'https://wa.me/2348100025555',
    bio: 'Lead property advisor specializing in smart architectural designs and luxury perimeter investments throughout Abuja and Port Harcourt.',
    createdAt: new Date().toISOString()
  },
  'fatima-usman': {
    name: 'Fatima Usman',
    role: 'Yola Region Specialist',
    email: 'f.usman@wisdomkwatismartcity.com',
    phone: '+234 810 002 5555',
    image: 'https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1goE51ZAEevUwmkKAEARqbVFdtDyFCvLa%26sz=w1200',
    quote: 'Experience the security and luxury of a smart city right here in Yola. Join our growing community at Sunbrook Estate.',
    whatsapp: 'https://wa.me/2348100025555',
    bio: 'Experienced real estate specialist focused on premium residential smart developments across the Yola region.',
    createdAt: new Date().toISOString()
  }
};

const DEFAULT_HOUSE_TYPES_BY_PROJECT = {
  'wisdom-kwati-smart-city': ['blue-sapphire', 'imperial-emerald'],
  'katampe-extension': ['star-sapphire', 'blue-sapphire', 'imperial-emerald'],
  'karsana-district': ['blue-sapphire', 'imperial-emerald'],
  'mabushi-district': ['white-sapphire', 'imperial-emerald'],
  'guzape-estate': ['royal-emerald', 'blue-sapphire', 'imperial-emerald'],
  'palm-haven': ['silver-pearl', 'white-pearl'],
  'maitama-district': ['imperial-emerald'],
  'royal-city': ['blue-sapphire', 'white-sapphire'],
  'beverly-hills': ['blue-sapphire', 'white-sapphire'],
  'lakeside-view': ['blue-sapphire', 'white-sapphire'],
  'sunbrook-estate': ['black-onyx', 'red-onyx'],
  'fintiri-extension': ['black-onyx', 'red-onyx'],
  'hof-community': ['silver-pearl', 'white-pearl']
};

export default function AdminCreateProjectPage() {
  const router = useRouter();

  // Standard inputs
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [state, setState] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [mapEmbedUrl, setMapEmbedUrl] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [heroVideo, setHeroVideo] = useState('');
  const [detailsImage, setDetailsImage] = useState('');
  const [updatesLink, setUpdatesLink] = useState('');
  const [advisorId, setAdvisorId] = useState('');
  const [selectedHouseTypeIds, setSelectedHouseTypeIds] = useState([]);

  // Auto-detect State and Neighborhood on location change
  useEffect(() => {
    if (!location) return;
    
    // Resolve State
    let resolvedState = ''; 
    const locLower = location.toLowerCase();

    if (
      locLower.includes('abuja') ||
      locLower.includes('fct')
    ) {
      resolvedState = 'Abuja';
    } else if (locLower.includes('lagos')) {
      resolvedState = 'Lagos';
    } else if (locLower.includes('kaduna')) {
      resolvedState = 'Kaduna';
    } else if (
      locLower.includes('rivers') ||
      locLower.includes('ph') ||
      locLower.includes('port')
    ) {
      resolvedState = 'Rivers';
    } else if (
      locLower.includes('yola') ||
      locLower.includes('adamawa')
    ) {
      resolvedState = 'Adamawa';
    }
    
    if (resolvedState) {
      setState(resolvedState);
    }

    // Resolve Neighborhood
    const parts = location.split(',');
    if (parts.length > 0) {
      const first = parts[0].trim();
      if (
        first.toLowerCase() !== 'abuja' &&
        first.toLowerCase() !== 'lagos' &&
        first.toLowerCase() !== 'nigeria' &&
        first.toLowerCase() !== 'multiple states'
      ) {
        setNeighborhood(first);
      }
    }
  }, [location]);

  // Multi-array specs (Dynamic Row Builders)
  const [realEstateVibe, setRealEstateVibe] = useState([
    { category: 'Primary Title', details: '' },
    { category: 'Security Level', details: '' },
    { category: 'Payment Plan', details: '' }
  ]);
  const [highlights, setHighlights] = useState([]);
  const [nearbyFacilities, setNearbyFacilities] = useState([]);
  const [plotSizes, setPlotSizes] = useState([]);
  const [marketSnapshot, setMarketSnapshot] = useState([]);

  // Tmp row inputs
  const [highlightInput, setHighlightInput] = useState('');
  const [vibeInput, setVibeInput] = useState({ category: '', details: '' });
  const [facilityInput, setFacilityInput] = useState({ category: '', establishment: '', travelTime: '' });
  const [plotInput, setPlotInput] = useState({ plotType: '', dimensions: '', area: '', availability: '' });
  const [snapshotInput, setSnapshotInput] = useState({ plotCategory: '', priceRange: '', outlook: '' });

  // Database listings
  const [advisors, setAdvisors] = useState([]);
  const [houseTypes, setHouseTypes] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadFormDependencies() {
      try {
        const advisorsSnap = await getDocs(collection(db, 'advisors'));
        const houseTypesSnap = await getDocs(collection(db, 'houseTypes'));
        
        let loadedAdvisors = advisorsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        let updatedAdvisors = [...loadedAdvisors];
        let didCreate = false;

        for (const [key, defAdv] of Object.entries(DEFAULT_ADVISORS)) {
          const exists = loadedAdvisors.some(a => a.name.toLowerCase() === defAdv.name.toLowerCase() || a.id === key);
          if (!exists) {
            try {
              await setDoc(doc(db, 'advisors', key), defAdv);
              updatedAdvisors.push({ id: key, ...defAdv });
              didCreate = true;
            } catch (err) {
              console.error(`Failed to auto-create advisor ${key}:`, err);
            }
          }
        }

        setAdvisors(updatedAdvisors);
        setHouseTypes(houseTypesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Failed to load credentials:', err);
      }
    }
    loadFormDependencies();
  }, []);

  // Automatic advisor and house types mapping selection based on the current Routing Slug
  useEffect(() => {
    if (!slug) return;
    const cleanSlug = slug.toLowerCase().trim();
    
    // Auto-prefill advisorId
    const yolaRegionSlugs = ['sunbrook-estate', 'fintiri-extension', 'karsana-district', 'kaduna-smart-district', 'gousa-idu-district', 'ph-rumu-olumeni'];
    const defaultId = yolaRegionSlugs.includes(cleanSlug) ? 'fatima-usman' : 'samuel-kwati';
    if (!advisorId || advisorId === 'samuel-kwati' || advisorId === 'fatima-usman') {
      setAdvisorId(defaultId);
    }

    // Auto-prefill selectedHouseTypeIds
    const defaultHouseTypeIds = DEFAULT_HOUSE_TYPES_BY_PROJECT[cleanSlug] || [];
    if (selectedHouseTypeIds.length === 0) {
      setSelectedHouseTypeIds(defaultHouseTypeIds);
    }
  }, [slug]);
  // Highlights handlers
  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights(prev => [...prev, highlightInput.trim()]);
    setHighlightInput('');
  };
  const removeHighlight = (idx) => {
    setHighlights(prev => prev.filter((_, i) => i !== idx));
  };

  // Vibe handlers
  const addVibe = () => {
    if (!vibeInput.category || !vibeInput.details) return;
    setRealEstateVibe(prev => [...prev, vibeInput]);
    setVibeInput({ category: '', details: '' });
  };
  const removeVibe = (idx) => {
    setRealEstateVibe(prev => prev.filter((_, i) => i !== idx));
  };

  // Facility handlers
  const addFacility = () => {
    if (!facilityInput.category || !facilityInput.establishment || !facilityInput.travelTime) return;
    setNearbyFacilities(prev => [...prev, facilityInput]);
    setFacilityInput({ category: '', establishment: '', travelTime: '' });
  };
  const removeFacility = (idx) => {
    setNearbyFacilities(prev => prev.filter((_, i) => i !== idx));
  };

  // Plot size handlers
  const addPlot = () => {
    if (!plotInput.plotType || !plotInput.dimensions || !plotInput.area || !plotInput.availability) return;
    setPlotSizes(prev => [...prev, plotInput]);
    setPlotInput({ plotType: '', dimensions: '', area: '', availability: '' });
  };
  const removePlot = (idx) => {
    setPlotSizes(prev => prev.filter((_, i) => i !== idx));
  };

  // Snapshot handlers
  const addSnapshot = () => {
    if (!snapshotInput.plotCategory || !snapshotInput.priceRange || !snapshotInput.outlook) return;
    setMarketSnapshot(prev => [...prev, snapshotInput]);
    setSnapshotInput({ plotCategory: '', priceRange: '', outlook: '' });
  };
  const removeSnapshot = (idx) => {
    setMarketSnapshot(prev => prev.filter((_, i) => i !== idx));
  };

  // House Specifications selector toggle
  const toggleHouseType = (htId) => {
    setSelectedHouseTypeIds(prev => 
      prev.includes(htId) ? prev.filter(id => id !== htId) : [...prev, htId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!slug || !name || !location || !state || !neighborhood) {
      setError('Please fill in required fields: Routing Slug, Name, District Location, State, and Neighborhood.');
      return;
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, '');
    if (!cleanSlug) {
      setError('Invalid slug layout.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const docRef = doc(db, 'projects', cleanSlug);
      const projectPayload = {
        name,
        tagline: tagline || '',
        description: description || '',
        location,
        state,
        neighborhood,
        mapEmbedUrl: mapEmbedUrl || '',
        heroImage: heroImage || '',
        heroVideo: heroVideo || '',
        detailsImage: detailsImage || '',
        updatesLink: updatesLink || '',
        advisorId: advisorId || '',
        houseTypeIds: selectedHouseTypeIds,
        highlights,
        realEstateVibe,
        nearbyFacilities,
        plotSizes,
        marketSnapshot,
        createdAt: new Date().toISOString()
      };

      await setDoc(docRef, projectPayload);
      router.push('/admin/dashboard/projects');
    } catch (err) {
      console.error('Error publishing project:', err);
      setError('Failed to save project document to database.');
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <div className="admin-title-group">
          <h1>Add New Estate Listing</h1>
          <p>Deploy a new smart city district with locations, amenities, and Linked House types.</p>
        </div>
        <Link href="/admin/dashboard/projects" className="admin-btn" style={{ textDecoration: 'none', width: 'auto', padding: '10px 20px' }}>
          ← Back to Estates
        </Link>
      </header>

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '12px 16px', borderRadius: '4px', marginBottom: '24px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Core details card */}
        <div className="admin-section-card" style={{ padding: '32px' }}>
          <h3 className="admin-section-title" style={{ marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
            1. Core Estate Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Routing Slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. katampe-extension"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
              <span style={{ fontSize: '10px', color: 'var(--admin-text-secondary)', marginTop: '4px', display: 'block' }}>
                Matches the folder/page path exact name (all lowercase, hyphens instead of spaces).
              </span>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Estate Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  const newName = e.target.value;
                  setName(newName);
                  // Automatically generate the routing slug
                  setSlug(newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                }}
                placeholder="e.g. Murg City Estate"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                <span>Tagline / Sub-headline</span>
                <span style={{ color: tagline.length > 60 ? '#EF4444' : 'inherit' }}>{tagline.length}/60</span>
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                maxLength={60}
                placeholder="e.g. Architectural masterpiece nestled in premium high hills"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: tagline.length >= 60 ? '1px solid #EF4444' : '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                District Location Name *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Katampe Ext., Abuja"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                State *
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              >
                <option value="">Select State</option>
                <option value="Abuja">Abuja</option>
                <option value="Lagos">Lagos</option>
                <option value="Kaduna">Kaduna</option>
                <option value="Rivers">Rivers</option>
                <option value="Adamawa">Adamawa</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Neighborhood *
              </label>
              <input
                type="text"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="e.g. Kuje, Asokoro, Katampe"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
              <span>Estate Overview / Description</span>
              <span style={{ color: description.length > 200 ? '#EF4444' : 'inherit' }}>{description.length}/200</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
              placeholder="e.g. Ellington Villa is the ultimate urban connector. Located at the heart of Abuja's inner ring road system..."
              rows={4}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: description.length >= 200 ? '1px solid #EF4444' : '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Hero Cover Image URL
              </label>
              <input
                type="url"
                value={heroImage}
                onChange={(e) => setHeroImage(e.target.value)}
                placeholder="https://... (Leave blank if using video)"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Hero Cover Video URL
              </label>
              <input
                type="url"
                value={heroVideo}
                onChange={(e) => setHeroVideo(e.target.value)}
                placeholder="https://... (Direct MP4 or GDrive link)"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Archive Card Thumbnail
              </label>
              <input
                type="url"
                value={detailsImage}
                onChange={(e) => setDetailsImage(e.target.value)}
                placeholder="Image for the project cards..."
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Site Updates Link
              </label>
              <input
                type="url"
                value={updatesLink}
                onChange={(e) => setUpdatesLink(e.target.value)}
                placeholder="https://... (URL to site updates or gallery)"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Google Maps iframe Src URL
              </label>
              <input
                type="url"
                value={mapEmbedUrl}
                onChange={(e) => setMapEmbedUrl(e.target.value)}
                placeholder="e.g. https://www.google.com/maps/embed?pb=..."
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic table row configurators */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          
          {/* Highlights */}
          <div className="admin-section-card" style={{ padding: '24px', gridColumn: '1 / -1' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>District Highlights</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div style={{ color: 'var(--admin-text-primary)' }}>{h}</div>
                  <button type="button" onClick={() => removeHighlight(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px' }}>&times;</button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="e.g. 24/7 Smart Surveillance"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addHighlight();
                  }
                }}
                style={{ flex: 1, padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <button 
                type="button" 
                onClick={addHighlight}
                style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: 'var(--admin-accent)', color: '#fff', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ADD
              </button>
            </div>
          </div>

          {/* Real estate vibes */}
          <div className="admin-section-card" style={{ padding: '24px' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>2. Real Estate Vibes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {realEstateVibe.map((v, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: 'var(--admin-accent)' }}>{v.category}</strong>
                      <div style={{ color: 'var(--admin-text-secondary)', marginTop: '2px' }}>{v.details || <em style={{ color: '#888' }}>Not specified</em>}</div>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeVibe(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px' }}>&times;</button>
                </div>
              ))}
            </div>

            {/* Row builder inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Category (e.g. Title Document)"
                value={vibeInput.category}
                onChange={(e) => setVibeInput(prev => ({ ...prev, category: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Details (e.g. C of O)"
                value={vibeInput.details}
                onChange={(e) => setVibeInput(prev => ({ ...prev, details: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
            </div>
            <button type="button" onClick={addVibe} className="admin-btn" style={{ width: '100%', fontSize: '11px', padding: '6px' }}>
              + Add Vibe Row
            </button>
          </div>

          {/* Nearby Facilities */}
          <div className="admin-section-card" style={{ padding: '24px' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>3. Nearby Facilities</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {nearbyFacilities.map((f, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', flex: 1 }}>
                    <div><strong>Category:</strong> {f.category}</div>
                    <div><strong>Place:</strong> {f.establishment}</div>
                    <div><strong>Time:</strong> <span style={{ color: 'var(--admin-accent)' }}>{f.travelTime}</span></div>
                  </div>
                  <button type="button" onClick={() => removeFacility(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px', marginLeft: '10px' }}>&times;</button>
                </div>
              ))}
            </div>

            {/* Row builder inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Category (e.g. Education)"
                value={facilityInput.category}
                onChange={(e) => setFacilityInput(prev => ({ ...prev, category: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Establishment (e.g. Shoprite)"
                value={facilityInput.establishment}
                onChange={(e) => setFacilityInput(prev => ({ ...prev, establishment: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Travel Time (e.g. 10 Mins)"
                value={facilityInput.travelTime}
                onChange={(e) => setFacilityInput(prev => ({ ...prev, travelTime: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
            </div>
            <button type="button" onClick={addFacility} className="admin-btn" style={{ width: '100%', fontSize: '11px', padding: '6px' }}>
              + Add Facility Row
            </button>
          </div>

        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          
          {/* Plot Sizes */}
          <div className="admin-section-card" style={{ padding: '24px' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>4. Plot Sizes & Layouts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {plotSizes.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', flex: 1 }}>
                    <div><strong>Type:</strong> {p.plotType}</div>
                    <div><strong>Dimensions:</strong> {p.dimensions}</div>
                    <div><strong>Area:</strong> <span style={{ color: 'var(--admin-accent)' }}>{p.area}</span></div>
                    <div><strong>Status:</strong> {p.availability}</div>
                  </div>
                  <button type="button" onClick={() => removePlot(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px', marginLeft: '10px' }}>&times;</button>
                </div>
              ))}
            </div>

            {/* Row builder inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Plot Type (e.g. Residential)"
                value={plotInput.plotType}
                onChange={(e) => setPlotInput(prev => ({ ...prev, plotType: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Dimensions (e.g. 15m x 30m)"
                value={plotInput.dimensions}
                onChange={(e) => setPlotInput(prev => ({ ...prev, dimensions: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Area (e.g. 450 sqm)"
                value={plotInput.area}
                onChange={(e) => setPlotInput(prev => ({ ...prev, area: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Availability (e.g. Available)"
                value={plotInput.availability}
                onChange={(e) => setPlotInput(prev => ({ ...prev, availability: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
            </div>
            <button type="button" onClick={addPlot} className="admin-btn" style={{ width: '100%', fontSize: '11px', padding: '6px' }}>
              + Add Plot Size
            </button>
          </div>

          {/* Market Snapshot */}
          <div className="admin-section-card" style={{ padding: '24px' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>5. Market Snapshots</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {marketSnapshot.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', flex: 1 }}>
                    <div><strong>Plot:</strong> {s.plotCategory}</div>
                    <div><strong>Price:</strong> <span style={{ color: 'var(--admin-accent)' }}>{s.priceRange}</span></div>
                    <div><strong>Outlook:</strong> {s.outlook}</div>
                  </div>
                  <button type="button" onClick={() => removeSnapshot(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px', marginLeft: '10px' }}>&times;</button>
                </div>
              ))}
            </div>

            {/* Row builder inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Plot Cat (e.g. 500 SQM)"
                value={snapshotInput.plotCategory}
                onChange={(e) => setSnapshotInput(prev => ({ ...prev, plotCategory: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Price Range (e.g. ₦50M - ₦60M)"
                value={snapshotInput.priceRange}
                onChange={(e) => setSnapshotInput(prev => ({ ...prev, priceRange: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Outlook (e.g. Stable)"
                value={snapshotInput.outlook}
                onChange={(e) => setSnapshotInput(prev => ({ ...prev, outlook: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
            </div>
            <button type="button" onClick={addSnapshot} className="admin-btn" style={{ width: '100%', fontSize: '11px', padding: '6px' }}>
              + Add Snapshot Row
            </button>
          </div>

        </div>

        {/* Relational parameters panel (Advisor dropdown & House types checklists) */}
        <div className="admin-section-card" style={{ padding: '32px' }}>
          <h3 className="admin-section-title" style={{ marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
            6. Sales Specialist & Relational Linking
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            
            {/* Advisor picker */}
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Primary Assigned Advisor
              </label>
              <select
                value={advisorId}
                onChange={(e) => setAdvisorId(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
              >
                <option value="">Unassigned / General Customer Support</option>
                {advisors.map(adv => (
                  <option key={adv.id} value={adv.id}>
                    {adv.name} ({adv.role})
                  </option>
                ))}
              </select>
            </div>

            {/* House Types selector */}
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Select Featured House Types
              </label>
              
              {houseTypes.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', fontStyle: 'italic', padding: '8px 0' }}>
                  No house types registered yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '160px', overflowY: 'auto', padding: '8px', border: '1px solid var(--admin-border)', borderRadius: '4px', backgroundColor: 'var(--admin-bg)' }}>
                  {houseTypes.map(ht => (
                    <label key={ht.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', color: 'var(--admin-text-primary)' }}>
                      <input
                        type="checkbox"
                        checked={selectedHouseTypeIds.includes(ht.id)}
                        onChange={() => toggleHouseType(ht.id)}
                        style={{ width: '15px', height: '15px', cursor: 'pointer' }}
                      />
                      <span>{ht.classType || ht.id} ({ht.beds || 0} Beds)</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        <button
          type="submit"
          className="admin-btn active"
          disabled={submitting}
          style={{ width: '100%', padding: '16px', fontSize: '13px' }}
        >
          {submitting ? 'Publishing Smart City Location...' : 'Publish Estate District'}
        </button>

      </form>
    </div>
  );
}
