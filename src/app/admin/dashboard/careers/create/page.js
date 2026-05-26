'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminCreateCareerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    intro: '',
    role: '',
    location: '',
    employmentType: 'Full Time',
    experienceLevel: '',
    salaryRange: '',
    workingHours: 'Standard business hours',
    reportsTo: '',
    howToApply: 'careers@wisdomkwati.com'
  });

  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [perksText, setPerksText] = useState('');

  // Dynamic state for requirements (What we're looking for)
  const [requirements, setRequirements] = useState([
    { skill: '', description: '' }
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Requirements Dynamic Rows Handlers
  const handleRequirementChange = (index, field, value) => {
    const updated = [...requirements];
    updated[index][field] = value;
    setRequirements(updated);
  };

  const addRequirementRow = () => {
    setRequirements(prev => [...prev, { skill: '', description: '' }]);
  };

  const removeRequirementRow = (index) => {
    if (requirements.length === 1) return;
    setRequirements(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      setError('Please provide at least a Job Title and Slug.');
      return;
    }

    setSubmitting(true);
    setError('');

    // Parse list textareas
    const responsibilities = responsibilitiesText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const perks = perksText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Clean up requirements array
    const cleanedRequirements = requirements.filter(
      r => r.skill.trim() !== '' && r.description.trim() !== ''
    );

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = new Date().toLocaleDateString('en-US', dateOptions);

    try {
      const docPayload = {
        ...formData,
        responsibilities,
        perks,
        requirements: cleanedRequirements,
        date: formattedDate,
        createdAt: new Date().toISOString()
      };

      // Use slug as document ID in Firestore for clean url referencing
      await setDoc(doc(db, 'careers', formData.slug), docPayload);
      router.push('/admin/dashboard/careers');
    } catch (err) {
      console.error('Failed to create career post:', err);
      setError('Error saving job opening to database.');
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <header className="admin-header" style={{ marginBottom: '32px' }}>
        <div className="admin-title-group">
          <h1>Launch Job Opening</h1>
          <p>Create and publish a new career opportunity on the WKSC platform.</p>
        </div>
        <Link href="/admin/dashboard/careers" className="admin-btn" style={{ textDecoration: 'none', width: 'auto', padding: '10px 20px' }}>
          ← Back to Careers
        </Link>
      </header>

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#EF4444', padding: '12px 16px', borderRadius: '4px', marginBottom: '24px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <div className="admin-section-card" style={{ padding: '32px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Job Title & Slug */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Marketing Coordinator"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                URL Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. marketing-coordinator"
                required
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Intro Paragraph */}
          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Intro Paragraph
            </label>
            <textarea
              name="intro"
              value={formData.intro}
              onChange={handleChange}
              rows="3"
              placeholder="e.g. We are looking for a Marketing Coordinator to help manage and grow the WKSC brand. This role focuses on coordinating campaigns..."
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          {/* Position Details Roster */}
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px', color: 'var(--admin-text-primary)', margin: '12px 0 0 0' }}>
            Position Details
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Role Descriptor
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g. Marketing Coordinator"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Abuja (Hybrid) or Lagos (On Site)"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Employment Type
              </label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Commission-Based">Commission-Based</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Experience Level
              </label>
              <input
                type="text"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                placeholder="e.g. 2+ years of experience in real estate marketing"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Salary / Compensation Range
              </label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleChange}
                placeholder="e.g. ₦1.2M - ₦1.8M / year or $45,000 – $60,000 / year"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Working Hours
              </label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                placeholder="e.g. Standard business hours (flexibility requested)"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Reports To
              </label>
              <input
                type="text"
                name="reportsTo"
                value={formData.reportsTo}
                onChange={handleChange}
                placeholder="e.g. Marketing Director"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                How to Apply Contact Email
              </label>
              <input
                type="email"
                name="howToApply"
                value={formData.howToApply}
                onChange={handleChange}
                placeholder="careers@wisdomkwati.com"
                style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Lists Segment */}
          <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px', color: 'var(--admin-text-primary)', margin: '12px 0 0 0' }}>
            Responsibilities & Perks
          </h2>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Responsibilities (One item per line)
            </label>
            <textarea
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              rows="6"
              placeholder="e.g.&#10;Coordinate and execute marketing campaigns&#10;Collaborate with agency partners&#10;Maintain company website and portals"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Specific Perks & Benefits (One item per line)
            </label>
            <textarea
              value={perksText}
              onChange={(e) => setPerksText(e.target.value)}
              rows="5"
              placeholder="e.g.&#10;Competitive salary with performance bonuses&#10;Health insurance coverage&#10;Flexible working hours"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          {/* Dynamic Requirements Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--admin-border)', paddingBottom: '8px', margin: '12px 0 0 0' }}>
            <h2 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--admin-text-primary)', margin: 0 }}>
              What We're Looking For (Skills/Traits)
            </h2>
            <button
              type="button"
              onClick={addRequirementRow}
              style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-surface-light)', color: 'var(--admin-text-primary)', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
            >
              + Add Skill
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {requirements.map((req, index) => (
              <div key={index} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '220px' }}>
                  <input
                    type="text"
                    value={req.skill}
                    onChange={(e) => handleRequirementChange(index, 'skill', e.target.value)}
                    placeholder="Skill/Trait (e.g. Team player)"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={req.description}
                    onChange={(e) => handleRequirementChange(index, 'description', e.target.value)}
                    placeholder="Description (e.g. Collaborative mindset to coordinate with agents)"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid var(--admin-border)', backgroundColor: 'var(--admin-bg)', color: 'var(--admin-text-primary)', fontSize: '12px', outline: 'none' }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeRequirementRow(index)}
                  disabled={requirements.length === 1}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '4px',
                    border: '1px solid transparent',
                    backgroundColor: requirements.length === 1 ? 'transparent' : 'rgba(239, 68, 68, 0.1)',
                    color: '#EF4444',
                    fontSize: '12px',
                    cursor: requirements.length === 1 ? 'not-allowed' : 'pointer',
                    opacity: requirements.length === 1 ? 0.3 : 1
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="admin-btn active"
            disabled={submitting}
            style={{ width: '100%', marginTop: '24px' }}
          >
            {submitting ? 'Creating Position...' : 'Publish Job Opening'}
          </button>
        </form>
      </div>
    </div>
  );
}
