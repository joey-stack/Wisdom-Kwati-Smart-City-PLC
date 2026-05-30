'use client';

import React, { useState } from 'react';

export default function DashboardCharts({ allLeads, trendData, hasRealTrendData, totalLeads, now }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);

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

  // Status distribution for conversion donut
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

  return (
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
            <line x1={xStart} y1={yStart} x2={xStart + chartWidth} y2={yStart} className="chart-axis-line" />
            <line x1={xStart} y1={yStart - chartHeight} x2={xStart + chartWidth} y2={yStart - chartHeight} className="chart-gridline" />
            <line x1={xStart} y1={yStart - chartHeight / 2} x2={xStart + chartWidth} y2={yStart - chartHeight / 2} className="chart-gridline" />
            <text x={xStart - 12} y={yStart + 4} textAnchor="end" className="chart-axis-label">0</text>
            <text x={xStart - 12} y={yStart - chartHeight / 2 + 4} textAnchor="end" className="chart-axis-label">{Math.round(maxTrendAxis / 2)}</text>
            <text x={xStart - 12} y={yStart - chartHeight + 4} textAnchor="end" className="chart-axis-label">{maxTrendAxis}</text>
            <path d={areaPathD} fill="url(#areaGrad)" className="chart-area-path" />
            <path d={linePathD} fill="none" stroke="url(#lineGrad)" className="chart-line-path" />
            {trendPoints.map((pt, idx) => {
              const isHovered = hoveredPoint === idx;
              return (
                <g key={idx}>
                  {isHovered && (
                    <line x1={pt.x} y1={yStart} x2={pt.x} y2={pt.y} stroke="rgba(30, 143, 196, 0.4)" strokeWidth="1.5" strokeDasharray="3,3" />
                  )}
                  <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" onMouseEnter={() => setHoveredPoint(idx)} onMouseLeave={() => setHoveredPoint(null)} style={{ cursor: 'pointer' }} />
                  <circle cx={pt.x} cy={pt.y} r={isHovered ? 6 : 4} fill={isHovered ? 'var(--admin-accent)' : '#1E8FC4'} stroke="#121215" className="chart-interactive-point" pointerEvents="none" />
                  <text x={pt.x} y={yStart + 20} textAnchor="middle" className="chart-axis-label" style={{ fontWeight: isHovered ? 700 : 500, fill: isHovered ? 'var(--admin-text-primary)' : 'var(--admin-text-secondary)' }}>
                    {pt.label}
                  </text>
                </g>
              );
            })}
          </svg>
          {hoveredPoint !== null && (
            <div className="chart-html-tooltip" style={{ left: `${(trendPoints[hoveredPoint].x / 500) * 100}%`, top: `${(trendPoints[hoveredPoint].y / 200) * 100 - 35}%`, transform: 'translate(-50%, -100%)', opacity: 1 }}>
              <span className="chart-html-tooltip-date">{trendData[hoveredPoint].label} {now.getFullYear()}</span>
              <span className="chart-html-tooltip-value">{trendData[hoveredPoint].count} Booking Inquiries</span>
              {trendData[hoveredPoint].isSimulated && <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Simulated Value</span>}
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
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <circle cx="60" cy="60" r="45" fill="transparent" stroke="var(--admin-border)" strokeWidth="10" />
            {(() => {
              let accumulatedPct = 0;
              return donutSegments.map((seg, idx) => {
                const isHovered = hoveredSegment === idx;
                const currentAccumulated = accumulatedPct;
                accumulatedPct += seg.percentage;
                return (
                  <circle key={idx} cx="60" cy="60" r="45" fill="transparent" stroke={seg.color} strokeWidth={isHovered ? 13 : 9} strokeDasharray={`${(seg.percentage / 100) * 282.74} 282.74`} strokeDashoffset={-((currentAccumulated / 100) * 282.74)} transform="rotate(-90 60 60)" className="donut-segment" filter={isHovered ? 'url(#glow)' : ''} onMouseEnter={() => setHoveredSegment(idx)} onMouseLeave={() => setHoveredSegment(null)} />
                );
              });
            })()}
            <g className="donut-center-group" transform="translate(60, 60)" textAnchor="middle">
              {hoveredSegment !== null ? (
                <>
                  <text y="-20" className="donut-center-label">{donutSegments[hoveredSegment].label}</text>
                  <text y="8" className="donut-center-value" style={{ fill: donutSegments[hoveredSegment].color, fontSize: '24px' }}>{donutSegments[hoveredSegment].percentage}%</text>
                  <text y="22" style={{ fontSize: '9px', fill: 'var(--admin-text-secondary)' }}>{donutSegments[hoveredSegment].count} inquiries</text>
                </>
              ) : (
                <>
                  <text y="-24" className="donut-center-label">Total</text>
                  <text y="10" className="donut-center-value">{totalLeads > 0 ? totalLeads : 20}</text>
                  <text y="24" style={{ fontSize: '9px', fill: 'var(--admin-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Inquiries</text>
                </>
              )}
            </g>
          </svg>
          <div className="chart-legend-grid">
            {donutSegments.map((seg, idx) => (
              <div className="legend-item" key={idx} onMouseEnter={() => setHoveredSegment(idx)} onMouseLeave={() => setHoveredSegment(null)} style={{ borderColor: hoveredSegment === idx ? 'var(--admin-border-focus)' : 'var(--admin-border)', boxShadow: hoveredSegment === idx ? '0 0 10px rgba(30,143,196,0.1)' : 'none' }}>
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
  );
}
