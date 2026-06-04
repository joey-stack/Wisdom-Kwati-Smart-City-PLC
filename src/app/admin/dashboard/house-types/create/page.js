'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminCreateHouseTypePage() {
  const router = useRouter();

  // Core properties
  const [slug, setSlug] = useState('');
  const [classType, setClassType] = useState('');
  const [tagline, setTagline] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [size, setSize] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [builtIn, setBuiltIn] = useState('');
  const [floors, setFloors] = useState('');
  const [parking, setParking] = useState('');
  const [propertyId, setPropertyId] = useState('');
  const [brochureUrl, setBrochureUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [advisorId, setAdvisorId] = useState('');
  const [advisorsList, setAdvisorsList] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  // Load advisors list on mount
  useEffect(() => {
    getDocs(collection(db, 'advisors')).then(snap => {
      setAdvisorsList(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }).catch(() => {});
  }, []);

  // 5 Bento gallery images (individual strings mapped to array)
  const [galleryImages, setGalleryImages] = useState({
    img1: '',
    img2: '',
    img3: '',
    img4: '',
    img5: ''
  });

  // Dynamic Specification tables
  const [interiorSpecs, setInteriorSpecs] = useState([]);
  const [exteriorSpecs, setExteriorSpecs] = useState([]);

  // Tmp row inputs
  const [interiorInput, setInteriorInput] = useState({ metric: '', details: '' });
  const [exteriorInput, setExteriorInput] = useState({ metric: '', details: '' });

  // Predefined Amenities Checklist
  const PREDEFINED_AMENITIES = [
    { id: 'smart-home', name: 'Smart Home Automation', iconClass: 'icon-smart' },
    { id: 'solar', name: 'Solar Power System', iconClass: 'icon-solar' },
    { id: 'security', name: '24/7 Security Patrol', iconClass: 'icon-security' },
    { id: 'pool', name: 'Private Swimming Pool', iconClass: 'icon-pool' },
    { id: 'fibre', name: 'Fibre Optic Internet', iconClass: 'icon-internet' },
    { id: 'drainage', name: 'Underground Drainage', iconClass: 'icon-drainage' },
    { id: 'ev-charging', name: 'Electric Vehicle Charging', iconClass: 'icon-ev' },
    { id: 'kitchen', name: 'Fully Fitted Kitchen', iconClass: 'icon-kitchen' },
    { id: 'gym', name: 'Private Gym & Fitness', iconClass: 'icon-gym' },
    { id: 'lake-view', name: 'Lake / Green View', iconClass: 'icon-lake' },
    { id: 'balcony', name: 'Balcony / Terrace', iconClass: 'icon-balcony' },
    { id: 'wine-cellar', name: 'Wine Cellar', iconClass: 'icon-wine' },
    { id: 'home-theater', name: 'Home Theater / Cinema', iconClass: 'icon-cinema' },
    { id: 'bbq', name: 'BBQ & Outdoor Kitchen', iconClass: 'icon-bbq' },
    { id: 'concierge', name: '24/7 Concierge Service', iconClass: 'icon-concierge' },
    { id: 'backup-power', name: 'Full Power Backup', iconClass: 'icon-power' }
  ];
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Gallery handler
  const handleGalleryChange = (e) => {
    const { name, value } = e.target;
    setGalleryImages(prev => ({ ...prev, [name]: value }));
  };

  // Interior Spec handler
  const addInterior = () => {
    if (!interiorInput.metric || !interiorInput.details) return;
    setInteriorSpecs(prev => [...prev, interiorInput]);
    setInteriorInput({ metric: '', details: '' });
  };
  const removeInterior = (idx) => {
    setInteriorSpecs(prev => prev.filter((_, i) => i !== idx));
  };

  // Exterior Spec handler
  const addExterior = () => {
    if (!exteriorInput.metric || !exteriorInput.details) return;
    setExteriorSpecs(prev => [...prev, exteriorInput]);
    setExteriorInput({ metric: '', details: '' });
  };
  const removeExterior = (idx) => {
    setExteriorSpecs(prev => prev.filter((_, i) => i !== idx));
  };

  // Amenities toggle
  const toggleAmenity = (amenity) => {
    const exists = selectedAmenities.find(a => a.name === amenity.name);
    if (exists) {
      setSelectedAmenities(prev => prev.filter(a => a.name !== amenity.name));
    } else {
      setSelectedAmenities(prev => [...prev, { name: amenity.name, iconClass: amenity.iconClass }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!slug || !classType) {
      setError('Please provide required parameters: Spec Slug and Class/Model Title.');
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
      const docRef = doc(db, 'houseTypes', cleanSlug);
      
      // Filter out empty strings from Bento images
      const imagesArray = [
        galleryImages.img1,
        galleryImages.img2,
        galleryImages.img3,
        galleryImages.img4,
        galleryImages.img5
      ].filter(url => url !== '');

      const houseTypePayload = {
        classType,
        tagline: tagline || '',
        price: price || '',
        description: description || '',
        beds: Number(beds) || 0,
        baths: Number(baths) || 0,
        size: size || '',
        lotSize: lotSize || '',
        builtIn: builtIn || '',
        floors: Number(floors) || 1,
        parking: parking || '',
        propertyId: propertyId || '',
        brochureUrl: brochureUrl || '',
        videoUrl: videoUrl || '',
        advisorId: advisorId || '',
        images: imagesArray,
        amenities: selectedAmenities,
        interiorSpecs,
        exteriorSpecs,
        sortOrder: sortOrder !== '' ? parseInt(sortOrder, 10) : 999,
        createdAt: new Date().toISOString()
      };

      await setDoc(docRef, houseTypePayload);
      router.push('/admin/dashboard/house-types');
    } catch (err) {
      console.error('Failed to create house spec:', err);
      setError('Failed to save spec details to database.');
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <div className="admin-title-group">
          <h1>Register Villa Specification</h1>
          <p>Configure model sizes, room layout indicators, dynamic amenities tags, and bento collections.</p>
        </div>
        <Link href="/admin/dashboard/house-types" className="admin-btn" style={{ textDecoration: 'none', width: 'auto', padding: '10px 20px' }}>
          ← Back to Specs
        </Link>
      </header>

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '12px 16px', borderRadius: '4px', marginBottom: '24px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Core parameters card */}
        <div className="admin-section-card" style={{ padding: '32px' }}>
          <h3 className="admin-section-title" style={{ marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
            1. Core House Specifications
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Spec Slug *
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. black-onyx"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
              <span style={{ fontSize: '10px', color: 'var(--admin-text-secondary)', marginTop: '4px', display: 'block' }}>
                Matches public router routes exact slug name (all lowercase, hyphens instead of spaces).
              </span>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Class / Model Title *
              </label>
              <input
                type="text"
                value={classType}
                onChange={(e) => setClassType(e.target.value)}
                placeholder="e.g. THE BLACK ONYX"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Hero Tagline
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. 5 Bedroom Fully Detached Smart Villa"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Price / Starting From
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. ₦350,000,000 or Contact for Price"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Property Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a compelling description of this property. This appears prominently on the public detail page..."
              rows={4}
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Bedrooms Count
              </label>
              <input
                type="number"
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                placeholder="e.g. 5"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Bathrooms Count
              </label>
              <input
                type="number"
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                placeholder="e.g. 6"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Floors Count
              </label>
              <input
                type="number"
                value={floors}
                onChange={(e) => setFloors(e.target.value)}
                placeholder="e.g. 3"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Parking Spaces
              </label>
              <input
                type="text"
                value={parking}
                onChange={(e) => setParking(e.target.value)}
                placeholder="e.g. 4 Cars"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Villa Size (Built area)
              </label>
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="e.g. 450 SQM"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Plot Lot Size (Total land)
              </label>
              <input
                type="text"
                value={lotSize}
                onChange={(e) => setLotSize(e.target.value)}
                placeholder="e.g. 600 SQM"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Property ID code
              </label>
              <input
                type="text"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                placeholder="e.g. WK-KTP-ONYX"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Digital Brochure URL
              </label>
              <input
                type="url"
                value={brochureUrl}
                onChange={(e) => setBrochureUrl(e.target.value)}
                placeholder="https://...pdf"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                360° Virtual Tour / Video URL
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://...youtube/matterport/vimeo embed URL"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
              <p style={{ fontSize: '11px', color: 'var(--admin-text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
                Paste a YouTube embed, Matterport, or Vimeo URL. Displays as an embedded 360° tour on the property page.
              </p>
            </div>
          </div>


          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Built In / Commissioned Year
            </label>
            <input
              type="text"
              value={builtIn}
              onChange={(e) => setBuiltIn(e.target.value)}
              placeholder="e.g. Q4 2026 / Completed"
              style={{ width: '100%', maxWidth: '300px', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <div className="form-group" style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Display Order / Priority (Sort Order)
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              placeholder="e.g. 1 (smaller numbers appear first)"
              style={{ width: '100%', maxWidth: '300px', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
            />
            <span style={{ fontSize: '10px', color: 'var(--admin-text-secondary)', marginTop: '4px', display: 'block' }}>
              Defines sorting priority in the public catalog list page. Lower values come first.
            </span>
          </div>
        </div>

        {/* Project Advisor Selector */}
        <div className="admin-section-card" style={{ padding: '32px' }}>
          <h3 className="admin-section-title" style={{ marginBottom: '8px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
            Project Advisor
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--admin-text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
            Link a registered advisor to this house type. Their photo, name, role, and contact details will appear in the sidebar on the property detail page.
          </p>
          <select
            value={advisorId}
            onChange={(e) => setAdvisorId(e.target.value)}
            style={{ width: '100%', maxWidth: '480px', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
          >
            <option value="">— No advisor assigned (shows company contact) —</option>
            {advisorsList.map(adv => (
              <option key={adv.id} value={adv.id}>
                {adv.name}{adv.role ? ` · ${adv.role}` : ''}
              </option>
            ))}
          </select>
          {advisorId && advisorsList.find(a => a.id === advisorId) && (() => {
            const adv = advisorsList.find(a => a.id === advisorId);
            return (
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: 'var(--admin-bg)', borderRadius: '4px', border: '1px solid var(--admin-border)' }}>
                <img
                  src={adv.image || 'https://placehold.co/48x48/111/fff?text=A'}
                  alt={adv.name}
                  style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0 }}
                  onError={e => { e.target.src = 'https://placehold.co/48x48/111/fff?text=A'; }}
                />
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--admin-text-primary)', margin: '0 0 2px' }}>{adv.name}</p>
                  <p style={{ fontSize: '11px', color: 'var(--admin-accent)', margin: 0 }}>{adv.role}</p>
                  {adv.phone && <p style={{ fontSize: '11px', color: 'var(--admin-text-secondary)', margin: '2px 0 0' }}>{adv.phone}</p>}
                </div>
              </div>
            );
          })()}
        </div>

        {/* 5 Bento Grid Images Pasteur */}
        <div className="admin-section-card" style={{ padding: '32px' }}>
          <h3 className="admin-section-title" style={{ marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
            2. Bento Photo Gallery Collection (Must provide up to 5 URLs)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['img1', 'img2', 'img3', 'img4', 'img5'].map((keyName, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--admin-text-secondary)' }}>
                  Bento Photo Layout Image {idx + 1} URL
                </span>
                <input
                  type="url"
                  name={keyName}
                  value={galleryImages[keyName]}
                  onChange={handleGalleryChange}
                  placeholder={`https://images.unsplash.com/... for spec image ${idx + 1}`}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic specification detail row builders */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* Interior Specs */}
          <div className="admin-section-card" style={{ padding: '24px' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>3. Interior Specification Tables</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {interiorSpecs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div>
                    <strong style={{ color: 'var(--admin-accent)' }}>{spec.metric}</strong>
                    <div style={{ color: 'var(--admin-text-secondary)', marginTop: '2px' }}>{spec.details}</div>
                  </div>
                  <button type="button" onClick={() => removeInterior(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px' }}>&times;</button>
                </div>
              ))}
            </div>

            {/* Row builder inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Interior Metric (e.g. Master Suite)"
                value={interiorInput.metric}
                onChange={(e) => setInteriorInput(prev => ({ ...prev, metric: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Description (e.g. Walk-in closet, smart mirrors)"
                value={interiorInput.details}
                onChange={(e) => setInteriorInput(prev => ({ ...prev, details: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
            </div>
            <button type="button" onClick={addInterior} className="admin-btn" style={{ width: '100%', fontSize: '11px', padding: '6px' }}>
              + Add Interior Row
            </button>
          </div>

          {/* Exterior Specs */}
          <div className="admin-section-card" style={{ padding: '24px' }}>
            <h3 className="admin-section-title" style={{ fontSize: '14px', marginBottom: '16px' }}>4. Exterior Specification Tables</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {exteriorSpecs.map((spec, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--admin-bg)', padding: '10px 14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '12px' }}>
                  <div>
                    <strong style={{ color: 'var(--admin-accent)' }}>{spec.metric}</strong>
                    <div style={{ color: 'var(--admin-text-secondary)', marginTop: '2px' }}>{spec.details}</div>
                  </div>
                  <button type="button" onClick={() => removeExterior(i)} style={{ border: 'none', background: 'transparent', color: '#EF4444', cursor: 'pointer', fontSize: '14px' }}>&times;</button>
                </div>
              ))}
            </div>

            {/* Row builder inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Exterior Metric (e.g. Cladding)"
                value={exteriorInput.metric}
                onChange={(e) => setExteriorInput(prev => ({ ...prev, metric: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Description (e.g. Premium brutalist exposed concrete)"
                value={exteriorInput.details}
                onChange={(e) => setExteriorInput(prev => ({ ...prev, details: e.target.value }))}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
              />
            </div>
            <button type="button" onClick={addExterior} className="admin-btn" style={{ width: '100%', fontSize: '11px', padding: '6px' }}>
              + Add Exterior Row
            </button>
          </div>

        </div>

        {/* Dynamic amenities selectors */}
        <div className="admin-section-card" style={{ padding: '32px' }}>
          <h3 className="admin-section-title" style={{ marginBottom: '20px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '12px' }}>
            5. Core Structural Amenities
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {PREDEFINED_AMENITIES.map((amenity) => {
              const isChecked = selectedAmenities.some(a => a.name === amenity.name);
              return (
                <label key={amenity.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', color: 'var(--admin-text-primary)', backgroundColor: isChecked ? 'rgba(30, 143, 196, 0.08)' : 'var(--admin-bg)', padding: '12px', borderRadius: '4px', border: '1px solid var(--admin-border)' }}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleAmenity(amenity)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span>{amenity.name}</span>
                </label>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="admin-btn active"
          disabled={submitting}
          style={{ width: '100%', padding: '16px', fontSize: '13px' }}
        >
          {submitting ? 'Creating Villa Spec Model...' : 'Publish Villa Specification'}
        </button>

      </form>
    </div>
  );
}
