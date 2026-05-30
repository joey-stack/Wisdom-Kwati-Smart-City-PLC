'use client';

import { useState, useEffect } from 'react';
import { collection, doc, updateDoc, query, orderBy, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Global in-memory cache for applications list
let globalApplicationsCache = null;

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState(() => globalApplicationsCache || []);
  const [selectedAppId, setSelectedAppId] = useState(() => globalApplicationsCache?.[0]?.id || null);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'reviewing' | 'contacted' | 'rejected' | 'hired'
  const [loading, setLoading] = useState(() => !globalApplicationsCache);

  const selectedApp = applications.find(app => app.id === selectedAppId) || applications[0] || null;

  // Real-time listener for applications collection
  useEffect(() => {
    const q = query(collection(db, 'applications'), orderBy('appliedAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      globalApplicationsCache = appList;
      setApplications(appList);
      
      // Auto-select first ID if none is set
      setSelectedAppId(prevId => {
        if (!prevId && appList.length > 0) return appList[0].id;
        if (appList.length > 0 && !appList.some(app => app.id === prevId)) return appList[0].id;
        return prevId;
      });
      setLoading(false);
    }, (err) => {
      console.error('Error fetching applications:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (appId, newStatus) => {
    try {
      const docRef = doc(db, 'applications', appId);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      console.error('Failed to update application status:', err);
    }
  };

  const deleteApplication = async (appId) => {
    if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      return;
    }
    try {
      const docRef = doc(db, 'applications', appId);
      await deleteDoc(docRef);
      if (selectedAppId === appId) {
        setSelectedAppId(null);
      }
    } catch (err) {
      console.error('Failed to delete application:', err);
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return (app.status || 'pending') === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-skeleton-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <header className="admin-header">
        <div className="admin-title-group">
          <h1>Job Applications</h1>
          <p>Review candidate profiles, resumes, and manage hiring pipeline stages.</p>
        </div>
      </header>

      {/* Filter Ribbon */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'reviewing', 'contacted', 'hired', 'rejected'].map((f) => {
          const count = applications.filter(app => f === 'all' || (app.status || 'pending') === f).length;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="admin-btn"
              style={{
                width: 'auto',
                fontSize: '11px',
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: filter === f ? 'var(--admin-accent)' : 'var(--admin-surface-light)',
                color: filter === f ? '#0A0A0C' : 'var(--admin-text-secondary)',
                border: filter === f ? 'none' : '1px solid var(--admin-border)',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}
            >
              {f} ({count})
            </button>
          );
        })}
      </div>

      {/* High-density inbox split panel layout */}
      <div className="inquiries-panel-layout">
        {/* Left Side: Roster Listing */}
        <div className="admin-section-card" style={{ padding: '20px' }}>
          <div className="admin-inquiry-list">
            <div className="admin-inquiry-row header" style={{ gridTemplateColumns: '1.2fr 1.3fr 1.3fr 0.8fr' }}>
              <span>Date</span>
              <span>Candidate</span>
              <span>Applied For</span>
              <span>Status</span>
            </div>

            {filteredApplications.length === 0 ? (
              <div style={{ padding: '48px 16px', color: 'var(--admin-text-secondary)', textAlign: 'center', fontSize: '14px' }}>
                No applications match the selected pipeline stage.
              </div>
            ) : (
              filteredApplications.map((app, idx) => {
                const dateStr = app.appliedAt
                  ? new Date(app.appliedAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                  : 'N/A';
                const isSelected = selectedApp && selectedApp.id === app.id;

                return (
                  <div 
                    key={idx}
                    className="admin-inquiry-row" 
                    style={{ 
                      gridTemplateColumns: '1.2fr 1.3fr 1.3fr 0.8fr',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? 'rgba(30, 143, 196, 0.08)' : 'transparent',
                      borderLeft: isSelected ? '3px solid var(--admin-border-focus)' : 'none',
                      paddingLeft: isSelected ? '13px' : '16px'
                    }}
                    onClick={() => setSelectedAppId(app.id)}
                  >
                    <span className="admin-inquiry-date">{dateStr}</span>
                    <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{app.candidateName}</span>
                    <span style={{ color: 'var(--admin-accent)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {app.jobTitle}
                    </span>
                    <span>
                      <span className={`admin-inquiry-status ${app.status || 'pending'}`}>
                        {app.status || 'pending'}
                      </span>
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Active detail inspector */}
        <div>
          {selectedApp ? (
            <div className="inquiry-details-card">
              <div className="inquiry-details-header" style={{ position: 'relative' }}>
                <span className={`admin-inquiry-status ${selectedApp.status || 'pending'}`} style={{ marginBottom: '8px' }}>
                  {selectedApp.status || 'pending'}
                </span>
                <h3 className="inquiry-details-title">{selectedApp.candidateName}</h3>
                <span className="inquiry-details-meta">
                  Applied: {selectedApp.appliedAt ? new Date(selectedApp.appliedAt).toLocaleString('en-NG') : 'N/A'}
                </span>
                
                <button
                  onClick={() => deleteApplication(selectedApp.id)}
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--admin-danger)',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  title="Delete Application"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Position Applied For</div>
                  <div className="inquiry-detail-value" style={{ fontWeight: 600, color: 'var(--admin-accent)' }}>
                    {selectedApp.jobTitle}
                  </div>
                </div>

                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Email Address</div>
                  <a href={`mailto:${selectedApp.candidateEmail}`} className="inquiry-detail-value" style={{ color: 'var(--admin-border-focus)', textDecoration: 'underline' }}>
                    {selectedApp.candidateEmail}
                  </a>
                </div>

                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Phone Number</div>
                  <a href={`tel:${selectedApp.candidatePhone}`} className="inquiry-detail-value" style={{ color: 'var(--admin-border-focus)', textDecoration: 'underline' }}>
                    {selectedApp.candidatePhone}
                  </a>
                </div>

                {selectedApp.linkedinUrl && (
                  <div className="inquiry-detail-field">
                    <div className="inquiry-detail-label">LinkedIn Profile</div>
                    <a href={selectedApp.linkedinUrl} target="_blank" rel="noopener noreferrer" className="inquiry-detail-value" style={{ color: 'var(--admin-border-focus)', textDecoration: 'underline' }}>
                      {selectedApp.linkedinUrl}
                    </a>
                  </div>
                )}

                {selectedApp.portfolioUrl && (
                  <div className="inquiry-detail-field">
                    <div className="inquiry-detail-label">Portfolio / Website</div>
                    <a href={selectedApp.portfolioUrl} target="_blank" rel="noopener noreferrer" className="inquiry-detail-value" style={{ color: 'var(--admin-border-focus)', textDecoration: 'underline' }}>
                      {selectedApp.portfolioUrl}
                    </a>
                  </div>
                )}

                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Resume / CV Document</div>
                  <div style={{ marginTop: '6px' }}>
                    <a 
                      href={selectedApp.resumeBase64} 
                      download={selectedApp.resumeName || 'resume.pdf'}
                      className="admin-btn"
                      style={{
                        width: 'auto',
                        display: 'inline-flex',
                        padding: '10px 20px',
                        fontSize: '12px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        color: '#0A0A0C'
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      View / Download Resume (${selectedApp.resumeName || 'resume.pdf'})
                    </a>
                  </div>
                </div>

                {selectedApp.coverLetter && (
                  <div className="inquiry-detail-field">
                    <div className="inquiry-detail-label">Cover Letter / Message</div>
                    <div className="inquiry-detail-value" style={{ backgroundColor: 'var(--admin-bg)', padding: '14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {selectedApp.coverLetter}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons to trigger status update transitions */}
              <div style={{ marginTop: '32px', borderTop: '1px solid var(--admin-border)', paddingTop: '20px' }}>
                <div className="inquiry-detail-label" style={{ marginBottom: '12px' }}>Update Pipeline Status</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {selectedApp.status !== 'reviewing' && (
                    <button 
                      onClick={() => updateStatus(selectedApp.id, 'reviewing')}
                      className="inquiry-btn-action archive"
                      style={{ borderStyle: 'solid', borderColor: 'var(--admin-border-focus)', color: 'var(--admin-border-focus)' }}
                    >
                      Set Reviewing
                    </button>
                  )}
                  {selectedApp.status !== 'contacted' && (
                    <button 
                      onClick={() => updateStatus(selectedApp.id, 'contacted')}
                      className="inquiry-btn-action archive"
                      style={{ borderStyle: 'solid', borderColor: 'var(--admin-success)', color: 'var(--admin-success)' }}
                    >
                      Set Contacted
                    </button>
                  )}
                  {selectedApp.status !== 'hired' && (
                    <button 
                      onClick={() => updateStatus(selectedApp.id, 'hired')}
                      className="inquiry-btn-action contact"
                    >
                      Mark as Hired
                    </button>
                  )}
                  {selectedApp.status !== 'rejected' && (
                    <button 
                      onClick={() => updateStatus(selectedApp.id, 'rejected')}
                      className="inquiry-btn-action archive"
                      style={{ borderColor: 'var(--admin-danger)', color: 'var(--admin-danger)' }}
                    >
                      Mark Rejected
                    </button>
                  )}
                  {(selectedApp.status === 'reviewing' || selectedApp.status === 'contacted' || selectedApp.status === 'hired' || selectedApp.status === 'rejected') && (
                    <button 
                      onClick={() => updateStatus(selectedApp.id, 'pending')}
                      className="inquiry-btn-action archive"
                      style={{ gridColumn: 'span 2', borderStyle: 'dashed' }}
                    >
                      Reset to Pending
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="inquiry-details-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', color: 'var(--admin-text-secondary)', fontSize: '14px' }}>
              Select a job application to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
