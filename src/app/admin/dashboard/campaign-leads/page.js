'use client';

import { useState, useEffect } from 'react';
import { collection, doc, updateDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Global in-memory cache for campaign leads list
let globalLeadsCache = null;

export default function AdminCampaignLeadsPage() {
  const [leads, setLeads] = useState(() => globalLeadsCache || []);
  const [selectedLeadId, setSelectedLeadId] = useState(() => globalLeadsCache?.[0]?.id || null);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'contacted' | 'archived'
  const [loading, setLoading] = useState(() => !globalLeadsCache);

  const selectedLead = leads.find(lead => lead.id === selectedLeadId) || leads[0] || null;

  // Real-time listener for leads collection where type is 'campaign-lead'
  useEffect(() => {
    const q = query(
      collection(db, 'leads'),
      where('type', '==', 'campaign-lead'),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      globalLeadsCache = leadsList;
      setLeads(leadsList);
      
      // Auto-select first ID if none is set
      setSelectedLeadId(prevId => {
        if (!prevId && leadsList.length > 0) return leadsList[0].id;
        return prevId;
      });
      setLoading(false);
    }, (err) => {
      console.error('Error fetching campaign leads:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (leadId, newStatus) => {
    try {
      const docRef = doc(db, 'leads', leadId);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true;
    return (lead.status || 'pending') === filter;
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
          <h1>Campaign Leads Inbox</h1>
          <p>Review leads captured directly from promotional landing pages.</p>
        </div>
      </header>

      {/* Filter Ribbon */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'contacted', 'archived'].map((f) => {
          const count = leads.filter(lead => f === 'all' || (lead.status || 'pending') === f).length;
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
                fontWeight: 600
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
            <div className="admin-inquiry-row header" style={{ gridTemplateColumns: '1.2fr 1.2fr 1.5fr 0.8fr' }}>
              <span>Date</span>
              <span>Name</span>
              <span>Campaign / Source</span>
              <span>Status</span>
            </div>

            {filteredLeads.length === 0 ? (
              <div style={{ padding: '48px 16px', color: 'var(--admin-text-secondary)', textAlign: 'center', fontSize: '14px' }}>
                No campaign leads match the selected filter criteria.
              </div>
            ) : (
              filteredLeads.map((lead, idx) => {
                const dateStr = lead.createdAt
                  ? new Date(lead.createdAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                  : 'N/A';
                const isSelected = selectedLead && selectedLead.id === lead.id;

                return (
                  <div 
                    key={idx}
                    className={`admin-inquiry-row`} 
                    style={{ 
                      gridTemplateColumns: '1.2fr 1.2fr 1.5fr 0.8fr',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? 'rgba(30, 143, 196, 0.08)' : 'transparent',
                      borderLeft: isSelected ? '3px solid var(--admin-border-focus)' : 'none',
                      paddingLeft: isSelected ? '13px' : '16px'
                    }}
                    onClick={() => setSelectedLeadId(lead.id)}
                  >
                    <span className="admin-inquiry-date">{dateStr}</span>
                    <span style={{ fontWeight: 600 }}>{lead.name}</span>
                    <span style={{ color: 'var(--admin-accent)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.estate || lead.source || 'Landing Page'}
                    </span>
                    <span>
                      <span className={`admin-inquiry-status ${lead.status || 'pending'}`}>
                        {lead.status || 'pending'}
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
          {selectedLead ? (
            <div className="inquiry-details-card">
              <div className="inquiry-details-header">
                <span className={`admin-inquiry-status ${selectedLead.status || 'pending'}`} style={{ marginBottom: '8px' }}>
                  {selectedLead.status || 'pending'}
                </span>
                <h3 className="inquiry-details-title">{selectedLead.name}</h3>
                <span className="inquiry-details-meta">
                  Captured: {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleString('en-NG') : 'N/A'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Email Address</div>
                  <a href={`mailto:${selectedLead.email}`} className="inquiry-detail-value" style={{ color: 'var(--admin-border-focus)', textDecoration: 'underline' }}>
                    {selectedLead.email}
                  </a>
                </div>

                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Phone Number</div>
                  {selectedLead.phone ? (
                    <a href={`tel:${selectedLead.phone}`} className="inquiry-detail-value" style={{ color: 'var(--admin-border-focus)', textDecoration: 'underline' }}>
                      {selectedLead.phone}
                    </a>
                  ) : (
                    <div className="inquiry-detail-value" style={{ color: 'var(--admin-text-secondary)' }}>Not provided</div>
                  )}
                </div>

                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Campaign / Estate</div>
                  <div className="inquiry-detail-value" style={{ fontWeight: 600, color: 'var(--admin-accent)' }}>
                    {selectedLead.estate || 'Wisdom Kwati Smart City'}
                  </div>
                </div>
                
                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Lead Source</div>
                  <div className="inquiry-detail-value" style={{ fontWeight: 600 }}>
                    {selectedLead.source || 'Landing Page'}
                  </div>
                </div>

                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Desired Plot Size</div>
                  <div className="inquiry-detail-value" style={{ fontWeight: 600 }}>
                    {selectedLead.plotSize || 'Not specified'}
                  </div>
                </div>
                
                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Investment Purpose</div>
                  <div className="inquiry-detail-value" style={{ fontWeight: 600 }}>
                    {selectedLead.purpose || 'Not specified'}
                  </div>
                </div>
              </div>

              {/* Action Buttons to trigger status update transitions */}
              <div className="inquiry-action-row" style={{ marginTop: '30px' }}>
                {(selectedLead.status || 'pending') !== 'contacted' && (
                  <button 
                    onClick={() => updateStatus(selectedLead.id, 'contacted')}
                    className="inquiry-btn-action contact"
                  >
                    Mark as Contacted
                  </button>
                )}
                
                {(selectedLead.status || 'pending') !== 'archived' && (
                  <button 
                    onClick={() => updateStatus(selectedLead.id, 'archived')}
                    className="inquiry-btn-action archive"
                  >
                    Archive Lead
                  </button>
                )}

                {(selectedLead.status === 'contacted' || selectedLead.status === 'archived') && (
                  <button 
                    onClick={() => updateStatus(selectedLead.id, 'pending')}
                    className="inquiry-btn-action archive"
                    style={{ borderStyle: 'dashed' }}
                  >
                    Restore to Pending
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="inquiry-details-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px', color: 'var(--admin-text-secondary)', fontSize: '14px' }}>
              Select a campaign lead to view full details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
