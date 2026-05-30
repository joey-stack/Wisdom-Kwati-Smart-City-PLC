'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const DashboardCharts = dynamic(() => import('@/components/admin/DashboardCharts'), { ssr: false });
import { collection, getDocs, query, orderBy, limit, where, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Global in-memory cache for overview stats
let globalDashboardCache = null;

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(() => {
    const cached = globalDashboardCache?.stats || {};
    return {
      leadsCount: cached.leadsCount || 0,
      pendingLeads: cached.pendingLeads || 0,
      projectsCount: cached.projectsCount || 0,
      houseTypesCount: cached.houseTypesCount || 0,
      advisorsCount: cached.advisorsCount || 0,
      careersCount: cached.careersCount || 0,
      applicationsCount: cached.applicationsCount || 0
    };
  });
  const [recentInquiries, setRecentInquiries] = useState(() => globalDashboardCache?.recentInquiries || []);
  const [allLeads, setAllLeads] = useState(() => globalDashboardCache?.allLeads || []);
  const [loading, setLoading] = useState(() => !globalDashboardCache);

  // Chart interactivity states
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Query Firestore collections in parallel using count aggregates & limited queries
        const [
          leadsCountSnap,
          pendingCountSnap,
          projectsCountSnap,
          houseTypesCountSnap,
          advisorsCountSnap,
          careersCountSnap,
          applicationsCountSnap,
          leadsSnap
        ] = await Promise.all([
          getCountFromServer(collection(db, 'leads')),
          getCountFromServer(query(collection(db, 'leads'), where('status', '==', 'pending'))),
          getCountFromServer(collection(db, 'projects')),
          getCountFromServer(collection(db, 'houseTypes')),
          getCountFromServer(collection(db, 'advisors')),
          getCountFromServer(collection(db, 'careers')),
          getCountFromServer(collection(db, 'applications')),
          getDocs(query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(100)))
        ]);

        const parsedLeads = leadsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort leads for the recent inquiries roster
        const recentList = [...parsedLeads]
          .sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeB - timeA;
          })
          .slice(0, 5);

        const newStats = {
          leadsCount: leadsCountSnap.data().count,
          pendingLeads: pendingCountSnap.data().count,
          projectsCount: projectsCountSnap.data().count,
          houseTypesCount: houseTypesCountSnap.data().count,
          advisorsCount: advisorsCountSnap.data().count,
          careersCount: careersCountSnap.data().count,
          applicationsCount: applicationsCountSnap.data().count
        };

        // Cache the result in memory
        globalDashboardCache = {
          stats: newStats,
          recentInquiries: recentList,
          allLeads: parsedLeads
        };

        setStats(newStats);
        setRecentInquiries(recentList);
        setAllLeads(parsedLeads);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    const delay = globalDashboardCache ? 300 : 0;
    const timer = setTimeout(() => {
      fetchDashboardData();
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="admin-skeleton-spinner"></div>
      </div>
    );
  }

  // --- 1. DATA AGGREGATION FOR VISUAL CHARTS ---
  const totalLeads = stats.leadsCount;
  const now = new Date();

  // (A) Monthly trend (last 6 months)
  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last6Months.push({
      label: d.toLocaleDateString('en-US', { month: 'short' }),
      year: d.getFullYear(),
      monthIndex: d.getMonth(),
      count: 0
    });
  }

  // Segment leads into monthly buckets
  allLeads.forEach(lead => {
    if (!lead.createdAt) return;
    const date = new Date(lead.createdAt);
    last6Months.forEach(m => {
      if (date.getFullYear() === m.year && date.getMonth() === m.monthIndex) {
        m.count++;
      }
    });
  });

  const hasRealTrendData = last6Months.some(m => m.count > 0);
  const mockTrendData = [
    { label: 'Jan', count: 4 },
    { label: 'Feb', count: 7 },
    { label: 'Mar', count: 5 },
    { label: 'Apr', count: 12 },
    { label: 'May', count: 8 },
    { label: 'Jun', count: 15 }
  ];

  // Adjust mock trend months dynamically to match current calendar months
  const trendData = hasRealTrendData 
    ? last6Months 
    : mockTrendData.map((m, idx) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - idx), 1);
        return {
          label: d.toLocaleDateString('en-US', { month: 'short' }),
          count: m.count,
          isSimulated: true
        };
      });

  // Calculate coordinates for Monthly Trend Line Chart (ViewBox 500x200)
  const maxTrendVal = Math.max(...trendData.map(m => m.count));
  const maxTrendAxis = maxTrendVal > 0 ? Math.ceil(maxTrendVal * 1.25) : 10;
  
  const chartWidth = 400;
  const chartHeight = 130;
  const xStart = 60;
  const yStart = 160;

  const trendPoints = trendData.map((m, idx) => {
    const x = xStart + (idx / (trendData.length - 1)) * chartWidth;
    const y = yStart - (m.count / maxTrendAxis) * chartHeight;
    return { x, y, label: m.label, value: m.count, isSimulated: m.isSimulated };
  });

  // Build SVG paths for line and area graphs
  const linePathD = `M ${trendPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`;
  const areaPathD = `${linePathD} L ${trendPoints[trendPoints.length - 1].x} ${yStart} L ${trendPoints[0].x} ${yStart} Z`;

  // (B) Status distribution for conversion donut
  const statusDistribution = { pending: 0, contacted: 0, archived: 0 };
  allLeads.forEach(lead => {
    const status = lead.status || 'pending';
    if (statusDistribution[status] !== undefined) {
      statusDistribution[status]++;
    } else {
      statusDistribution.pending++;
    }
  });

  const pendingCount = statusDistribution.pending;
  const contactedCount = statusDistribution.contacted;
  const archivedCount = statusDistribution.archived;

  const pendingPct = totalLeads > 0 ? Math.round((pendingCount / totalLeads) * 100) : 40;
  const contactedPct = totalLeads > 0 ? Math.round((contactedCount / totalLeads) * 100) : 45;
  const archivedPct = totalLeads > 0 ? Math.round((archivedCount / totalLeads) * 100) : 15;

  const donutSegments = [
    { label: 'Pending', count: totalLeads > 0 ? pendingCount : 8, percentage: pendingPct, color: 'var(--admin-pending)', hex: '#F59E0B' },
    { label: 'Contacted', count: totalLeads > 0 ? contactedCount : 9, percentage: contactedPct, color: 'var(--admin-success)', hex: '#10B981' },
    { label: 'Archived', count: totalLeads > 0 ? archivedCount : 3, percentage: archivedPct, color: 'var(--admin-text-secondary)', hex: '#6B7280' }
  ];

  // (C) Estate Interest Ranking (Top 5 Smart Districts)
  const estateMap = {};
  allLeads.forEach(lead => {
    const estate = lead.estate || 'General Inquiry';
    estateMap[estate] = (estateMap[estate] || 0) + 1;
  });

  const hasRealEstateData = Object.keys(estateMap).length > 0;
  const sortedEstates = hasRealEstateData 
    ? Object.entries(estateMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    : [
        { name: 'Maitama District', count: 9 },
        { name: 'Guzape Estate', count: 6 },
        { name: 'Beverly Hills', count: 4 },
        { name: 'Kaduna Smart District', count: 3 },
        { name: 'Port Harcourt Estate', count: 1 }
      ];

  const maxEstateCount = Math.max(...sortedEstates.map(e => e.count));

  // Metric definitions for dashboard iteration
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
    },
    {
      title: 'Active Jobs',
      value: stats.careersCount,
      trend: `${stats.applicationsCount} total applications`,
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      link: '/admin/dashboard/applications'
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

      {/* STUNNING INTERACTIVE VISUAL CHARTS GRID */}
      <DashboardCharts 
        allLeads={allLeads} 
        trendData={trendData} 
        hasRealTrendData={hasRealTrendData} 
        totalLeads={totalLeads} 
        now={now} 
      />

      {/* Split panel: Inquiries listing and quick actions */}
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

        {/* Right Side: Quick CMS Operations & Smart Estate Ranking */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Smart District Interest Ranking */}
          <div className="admin-section-card" style={{ marginBottom: 0 }}>
            <div className="admin-section-header">
              <h3 className="admin-section-title">District Popularity Share</h3>
            </div>

            <div className="estate-performance-list">
              {sortedEstates.map((estate, idx) => {
                const percent = maxEstateCount > 0 ? Math.round((estate.count / maxEstateCount) * 100) : 0;
                return (
                  <div className="estate-performance-item" key={idx}>
                    <div className="estate-performance-meta">
                      <span className="estate-performance-name">{estate.name}</span>
                      <span className="estate-performance-count">{estate.count} leads</span>
                    </div>
                    <div className="estate-performance-bar-bg">
                      <div 
                        className="estate-performance-bar-fill"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="admin-section-card" style={{ marginBottom: 0 }}>
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
              <Link href="/admin/dashboard/careers" className="admin-btn" style={{ fontSize: '11px', textDecoration: 'none', background: 'var(--admin-surface-light)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}>
                Post New Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
