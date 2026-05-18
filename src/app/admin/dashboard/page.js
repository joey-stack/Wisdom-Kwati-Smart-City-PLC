'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    leadsCount: 0,
    pendingLeads: 0,
    projectsCount: 0,
    houseTypesCount: 0,
    advisorsCount: 0
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Query collections
        const leadsSnap = await getDocs(collection(db, 'leads'));
        const projectsSnap = await getDocs(collection(db, 'projects'));
        const houseTypesSnap = await getDocs(collection(db, 'houseTypes'));
        const advisorsSnap = await getDocs(collection(db, 'advisors'));

        const allLeads = leadsSnap.docs.map(doc => doc.data());
        const pendingLeads = allLeads.filter(lead => lead.status === 'pending' || !lead.status).length;

        // Fetch recent inquiries (ordered by createdAt)
        const recentQuery = query(
          collection(db, 'leads'),
          orderBy('createdAt', 'desc'),
          limit(5)
        );
        const recentSnap = await getDocs(recentQuery);
        const recentList = recentSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setStats({
          leadsCount: leadsSnap.size,
          pendingLeads: pendingLeads,
          projectsCount: projectsSnap.size,
          houseTypesCount: houseTypesSnap.size,
          advisorsCount: advisorsSnap.size
        });
        setRecentInquiries(recentList);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-skeleton-spinner"></div>
      </div>
    );
  }

  // Metric definitions for iteration
  const metrics = [
    {
      title: 'Total Inquiries',
      value: stats.leadsCount,
      trend: `${stats.pendingLeads} pending follow-up`,
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      link: '/admin/dashboard/inquiries'
    },
    {
      title: 'Active Estates',
      value: stats.projectsCount,
      trend: 'Registered Districts',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      link: '/admin/dashboard/projects'
    },
    {
      title: 'Villa Specs',
      value: stats.houseTypesCount,
      trend: 'Bento Spec Models',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      link: '/admin/dashboard/house-types'
    },
    {
      title: 'Project Advisors',
      value: stats.advisorsCount,
      trend: 'Assigned Specialists',
      icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
      link: '/admin/dashboard/advisors'
    }
  ];

  return (
    <div>
      {/* Viewport Header */}
      <header className="admin-header">
        <div className="admin-title-group">
          <h1>Overview Dashboard</h1>
          <p>Real-time analytics and content overview of Wisdom Kwati Smart City.</p>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="admin-metrics-grid">
        {metrics.map((m, idx) => (
          <Link href={m.link} key={idx} style={{ textDecoration: 'none' }}>
            <div className="admin-metric-card" style={{ cursor: 'pointer' }}>
              <div className="admin-metric-header">
                <span className="admin-metric-title">{m.title}</span>
                <span className="admin-metric-icon">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d={m.icon}></path>
                  </svg>
                </span>
              </div>
              <span className="admin-metric-value">{m.value}</span>
              <span className="admin-metric-trend">{m.trend}</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Core Split Panel */}
      <div className="admin-dashboard-split">
        {/* Left Side: Recent Inquiries Feed */}
        <div className="admin-section-card">
          <div className="admin-section-header">
            <h3 className="admin-section-title">Recent Customer Bookings</h3>
            <Link 
              href="/admin/dashboard/inquiries" 
              className="admin-sidebar-tag"
              style={{ fontSize: '11px', textDecoration: 'none' }}
            >
              View Inbox Portal →
            </Link>
          </div>

          <div className="admin-inquiry-list">
            <div className="admin-inquiry-row header">
              <span>Date</span>
              <span>Name</span>
              <span>Email</span>
              <span>District</span>
              <span>Status</span>
            </div>

            {recentInquiries.length === 0 ? (
              <div style={{ padding: '32px 16px', color: 'var(--admin-text-secondary)', textAlign: 'center', fontSize: '14px' }}>
                No site visit inquiries have been submitted yet.
              </div>
            ) : (
              recentInquiries.map((inquiry, idx) => {
                const dateStr = inquiry.createdAt 
                  ? new Date(inquiry.createdAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                  : 'N/A';
                return (
                  <div className="admin-inquiry-row" key={idx}>
                    <span className="admin-inquiry-date">{dateStr}</span>
                    <span style={{ fontWeight: 600 }}>{inquiry.name}</span>
                    <span style={{ color: 'var(--admin-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {inquiry.email}
                    </span>
                    <span style={{ color: 'var(--admin-accent)' }}>{inquiry.estate || 'General Inquiry'}</span>
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

        {/* Right Side: Quick CMS Operations */}
        <div className="admin-section-card">
          <div className="admin-section-header">
            <h3 className="admin-section-title">Quick Actions</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/admin/dashboard/projects" className="admin-btn" style={{ fontSize: '11px', textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}>
              Manage Projects & Estates
            </Link>
            <Link href="/admin/dashboard/house-types" className="admin-btn" style={{ fontSize: '11px', textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}>
              Manage House Specs
            </Link>
            <Link href="/admin/dashboard/advisors" className="admin-btn" style={{ fontSize: '11px', textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}>
              Manage Reusable Advisors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
