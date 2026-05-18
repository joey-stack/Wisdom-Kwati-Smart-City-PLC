'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'contacted' | 'archived'
  const [loading, setLoading] = useState(true);

  // Real-time listener for leads collection
  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInquiries(leadsList);
      
      // Auto-select the first lead if none is selected
      if (leadsList.length > 0 && !selectedInquiry) {
        setSelectedInquiry(leadsList[0]);
      } else if (selectedInquiry) {
        // Keep the selected inquiry updated in real-time
        const updated = leadsList.find(lead => lead.id === selectedInquiry.id);
        if (updated) setSelectedInquiry(updated);
      }
      setLoading(false);
    }, (err) => {
      console.error('Error fetching leads:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedInquiry]);

  const updateStatus = async (inquiryId, newStatus) => {
    try {
      const docRef = doc(db, 'leads', inquiryId);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      console.error('Failed to update lead status:', err);
    }
  };

  const filteredInquiries = inquiries.filter(lead => {
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
          <h1>Customer Inquiries Inbox</h1>
          <p>Review booking requests for site visits, estate interests, and general queries.</p>
        </div>
      </header>

      {/* Filter Ribbon */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'contacted', 'archived'].map((f) => {
          const count = inquiries.filter(lead => f === 'all' || (lead.status || 'pending') === f).length;
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
            <div className="admin-inquiry-row header" style={{ gridTemplateColumns: '1.2fr 1.2fr 1fr 0.8fr' }}>
              <span>Date</span>
              <span>Sender</span>
              <span>Estate Interest</span>
              <span>Status</span>
            </div>

            {filteredInquiries.length === 0 ? (
              <div style={{ padding: '48px 16px', color: 'var(--admin-text-secondary)', textAlign: 'center', fontSize: '14px' }}>
                No inquiries match the selected filter criteria.
              </div>
            ) : (
              filteredInquiries.map((inquiry, idx) => {
                const dateStr = inquiry.createdAt
                  ? new Date(inquiry.createdAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                  : 'N/A';
                const isSelected = selectedInquiry && selectedInquiry.id === inquiry.id;

                return (
                  <div 
                    key={idx}
                    className={`admin-inquiry-row`} 
                    style={{ 
                      gridTemplateColumns: '1.2fr 1.2fr 1fr 0.8fr',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? 'rgba(30, 143, 196, 0.08)' : 'transparent',
                      borderLeft: isSelected ? '3px solid var(--admin-border-focus)' : 'none',
                      paddingLeft: isSelected ? '13px' : '16px'
                    }}
                    onClick={() => setSelectedInquiry(inquiry)}
                  >
                    <span className="admin-inquiry-date">{dateStr}</span>
                    <span style={{ fontWeight: 600 }}>{inquiry.name}</span>
                    <span style={{ color: 'var(--admin-accent)' }}>{inquiry.estate || 'General'}</span>
                    <span>
                      <span className={`admin-inquiry-status ${inquiry.status || 'pending'}`}>
                        {inquiry.status || 'pending'}
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
          {selectedInquiry ? (
            <div className="inquiry-details-card">
              <div className="inquiry-details-header">
                <span className={`admin-inquiry-status ${selectedInquiry.status || 'pending'}`} style={{ marginBottom: '8px' }}>
                  {selectedInquiry.status || 'pending'}
                </span>
                <h3 className="inquiry-details-title">{selectedInquiry.name}</h3>
                <span className="inquiry-details-meta">
                  Submitted: {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString('en-NG') : 'N/A'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Email Address</div>
                  <a href={`mailto:${selectedInquiry.email}`} className="inquiry-detail-value" style={{ color: 'var(--admin-border-focus)', textDecoration: 'underline' }}>
                    {selectedInquiry.email}
                  </a>
                </div>

                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Phone Number</div>
                  <a href={`tel:${selectedInquiry.phone}`} className="inquiry-detail-value" style={{ color: 'var(--admin-border-focus)', textDecoration: 'underline' }}>
                    {selectedInquiry.phone}
                  </a>
                </div>

                <div className="inquiry-detail-field">
                  <div className="inquiry-detail-label">Estates / District Interest</div>
                  <div className="inquiry-detail-value" style={{ fontWeight: 600, color: 'var(--admin-accent)' }}>
                    {selectedInquiry.estate || 'General Site Visit / Inquiry'}
                  </div>
                </div>

                {selectedInquiry.preferredDate && (
                  <div className="inquiry-detail-field">
                    <div className="inquiry-detail-label">Preferred Booking Date</div>
                    <div className="inquiry-detail-value">
                      {new Date(selectedInquiry.preferredDate).toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                )}

                {selectedInquiry.message && (
                  <div className="inquiry-detail-field">
                    <div className="inquiry-detail-label">Client Notes & Message</div>
                    <div className="inquiry-detail-value" style={{ backgroundColor: 'var(--admin-bg)', padding: '14px', borderRadius: '4px', border: '1px solid var(--admin-border)', fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                      {selectedInquiry.message}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons to trigger status update transitions */}
              <div className="inquiry-action-row">
                {(selectedInquiry.status || 'pending') !== 'contacted' && (
                  <button 
                    onClick={() => updateStatus(selectedInquiry.id, 'contacted')}
                    className="inquiry-btn-action contact"
                  >
                    Mark as Contacted
                  </button>
                )}
                
                {(selectedInquiry.status || 'pending') !== 'archived' && (
                  <button 
                    onClick={() => updateStatus(selectedInquiry.id, 'archived')}
                    className="inquiry-btn-action archive"
                  >
                    Archive Inquiry
                  </button>
                )}

                {(selectedInquiry.status === 'contacted' || selectedInquiry.status === 'archived') && (
                  <button 
                    onClick={() => updateStatus(selectedInquiry.id, 'pending')}
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
              Select an inquiry to view full client submission details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
