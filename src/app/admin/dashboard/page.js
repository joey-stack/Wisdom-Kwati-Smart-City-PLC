'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
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
  const [allLeads, setAllLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chart interactivity states
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Query Firestore collections
        const leadsSnap = await getDocs(collection(db, 'leads'));
        const projectsSnap = await getDocs(collection(db, 'projects'));
        const houseTypesSnap = await getDocs(collection(db, 'houseTypes'));
        const advisorsSnap = await getDocs(collection(db, 'advisors'));

        const parsedLeads = leadsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAllLeads(parsedLeads);

        const pendingLeads = parsedLeads.filter(lead => lead.status === 'pending' || !lead.status).length;

        // Sort leads for the recent inquiries roster
        const recentList = [...parsedLeads]
          .sort((a, b) => {
            const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return timeB - timeA;
          })
          .slice(0, 5);

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
      <section className="admin-charts-grid">
        {/* Left Side: Monthly Trend Curve */}
        <div className="admin-section-card" style={{ position: 'relative', overflow: 'visible' }}>
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--admin-accent)' }}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                Customer Acquisition Trend
              </h3>
              <p className="chart-card-subtitle">Monthly booking inquiries volume curve</p>
            </div>
            {!hasRealTrendData && (
              <span className="admin-sidebar-tag" style={{ background: 'rgba(30, 143, 196, 0.08)', padding: '4px 10px', borderRadius: '4px', fontSize: '10px' }}>
                Simulated Display
              </span>
            )}
          </div>

          <div className="trend-chart-container">
            <svg viewBox="0 0 500 200" width="100%" height="200" style={{ overflow: 'visible' }}>
              {/* Gradients */}
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E8FC4" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="var(--admin-accent)" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1E8FC4" />
                  <stop offset="100%" stopColor="var(--admin-accent)" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line x1={xStart} y1={yStart} x2={xStart + chartWidth} y2={yStart} className="chart-axis-line" />
              <line x1={xStart} y1={yStart - chartHeight} x2={xStart + chartWidth} y2={yStart - chartHeight} className="chart-gridline" />
              <line x1={xStart} y1={yStart - chartHeight / 2} x2={xStart + chartWidth} y2={yStart - chartHeight / 2} className="chart-gridline" />

              {/* Y Axis Labels */}
              <text x={xStart - 12} y={yStart + 4} textAnchor="end" className="chart-axis-label">0</text>
              <text x={xStart - 12} y={yStart - chartHeight / 2 + 4} textAnchor="end" className="chart-axis-label">
                {Math.round(maxTrendAxis / 2)}
              </text>
              <text x={xStart - 12} y={yStart - chartHeight + 4} textAnchor="end" className="chart-axis-label">
                {maxTrendAxis}
              </text>

              {/* Area under the line */}
              <path d={areaPathD} fill="url(#areaGrad)" className="chart-area-path" />

              {/* Line graph */}
              <path d={linePathD} fill="none" stroke="url(#lineGrad)" className="chart-line-path" />

              {/* Interactive Point Nodes & Labels */}
              {trendPoints.map((pt, idx) => {
                const isHovered = hoveredPoint === idx;
                return (
                  <g key={idx}>
                    {/* Vertical marker line on hover */}
                    {isHovered && (
                      <line 
                        x1={pt.x} 
                        y1={yStart} 
                        x2={pt.x} 
                        y2={pt.y} 
                        stroke="rgba(30, 143, 196, 0.4)" 
                        strokeWidth="1.5" 
                        strokeDasharray="3,3" 
                      />
                    )}
                    
                    {/* Hover hotspot (transparent circle with large radius for easy touching) */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="16"
                      fill="transparent"
                      onMouseEnter={() => setHoveredPoint(idx)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      style={{ cursor: 'pointer' }}
                    />

                    {/* Visible point circle */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 6 : 4}
                      fill={isHovered ? 'var(--admin-accent)' : '#1E8FC4'}
                      stroke="#121215"
                      className="chart-interactive-point"
                      pointerEvents="none"
                    />

                    {/* Month Label */}
                    <text
                      x={pt.x}
                      y={yStart + 20}
                      textAnchor="middle"
                      className="chart-axis-label"
                      style={{ fontWeight: isHovered ? 700 : 500, fill: isHovered ? 'var(--admin-text-primary)' : 'var(--admin-text-secondary)' }}
                    >
                      {pt.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Float Tooltip overlay on hover */}
            {hoveredPoint !== null && (
              <div 
                className="chart-html-tooltip"
                style={{ 
                  left: `${(trendPoints[hoveredPoint].x / 500) * 100}%`, 
                  top: `${(trendPoints[hoveredPoint].y / 200) * 100 - 35}%`,
                  transform: 'translate(-50%, -100%)',
                  opacity: 1
                }}
              >
                <span className="chart-html-tooltip-date">
                  {trendData[hoveredPoint].label} {now.getFullYear()}
                </span>
                <span className="chart-html-tooltip-value">
                  {trendData[hoveredPoint].count} Booking Inquiries
                </span>
                {trendData[hoveredPoint].isSimulated && (
                  <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                    Simulated Value
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Conversion Donut Circle */}
        <div className="admin-section-card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-card-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--admin-success)' }}><circle cx="12" cy="12" r="10"></circle><path d="M12 2v10l4.5 4.5"></path></svg>
                Inquiry Segment Share
              </h3>
              <p className="chart-card-subtitle">Leads status division and follow-ups</p>
            </div>
          </div>

          <div className="donut-chart-container">
            <svg width="180" height="180" viewBox="0 0 120 120">
              {/* Glow filter */}
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Base dark track circle */}
              <circle
                cx="60"
                cy="60"
                r="45"
                fill="transparent"
                stroke="var(--admin-border)"
                strokeWidth="10"
              />

              {/* Circular Segments */}
              {(() => {
                let accumulatedPct = 0;
                return donutSegments.map((seg, idx) => {
                  const isHovered = hoveredSegment === idx;
                  const currentAccumulated = accumulatedPct;
                  accumulatedPct += seg.percentage;
                  
                  return (
                    <circle
                      key={idx}
                      cx="60"
                      cy="60"
                      r="45"
                      fill="transparent"
                      stroke={seg.color}
                      strokeWidth={isHovered ? 13 : 9}
                      strokeDasharray={`${(seg.percentage / 100) * 282.74} 282.74`}
                      strokeDashoffset={-((currentAccumulated / 100) * 282.74)}
                      transform="rotate(-90 60 60)"
                      className="donut-segment"
                      filter={isHovered ? 'url(#glow)' : ''}
                      onMouseEnter={() => setHoveredSegment(idx)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    />
                  );
                });
              })()}

              {/* Center Text displaying active hovered stats */}
              <g className="donut-center-group" transform="translate(60, 60)" textAnchor="middle">
                {hoveredSegment !== null ? (
                  <>
                    <text y="-8" className="donut-center-label">
                      {donutSegments[hoveredSegment].label}
                    </text>
                    <text y="14" className="donut-center-value" style={{ fill: donutSegments[hoveredSegment].color, fontSize: '24px' }}>
                      {donutSegments[hoveredSegment].percentage}%
                    </text>
                    <text y="28" style={{ fontSize: '9px', fill: 'var(--admin-text-secondary)' }}>
                      {donutSegments[hoveredSegment].count} inquiries
                    </text>
                  </>
                ) : (
                  <>
                    <text y="-6" className="donut-center-label">
                      Total
                    </text>
                    <text y="16" className="donut-center-value">
                      {totalLeads > 0 ? totalLeads : 20}
                    </text>
                    <text y="30" style={{ fontSize: '9px', fill: 'var(--admin-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Inquiries
                    </text>
                  </>
                )}
              </g>
            </svg>

            {/* Custom Interactive Legend Grid */}
            <div className="chart-legend-grid">
              {donutSegments.map((seg, idx) => (
                <div 
                  className="legend-item" 
                  key={idx}
                  onMouseEnter={() => setHoveredSegment(idx)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{ 
                    borderColor: hoveredSegment === idx ? 'var(--admin-border-focus)' : 'var(--admin-border)',
                    boxShadow: hoveredSegment === idx ? '0 0 10px rgba(30,143,196,0.1)' : 'none'
                  }}
                >
                  <div className="legend-color-dot" style={{ backgroundColor: seg.color }}></div>
                  <span className="legend-label">{seg.label}</span>
                  <span className="legend-value">{seg.count}</span>
                  <span className="legend-percentage">{seg.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
