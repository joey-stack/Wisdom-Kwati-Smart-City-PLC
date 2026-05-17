'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import '../../../styles/blog-single.css';
import '../../../styles/blogs.css';

const dummyBlogs = [
  {
    title: "First-time homebuyer's guide — everything you need to know before...",
    category: "GUIDE",
    date: "DEC 9, 2024",
    author: "JAMES MILLER",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200",
  },
  {
    title: "How to prepare your home before selling — simple steps that make a big impact",
    category: "GUIDE",
    date: "DEC 9, 2024",
    author: "JAMES MILLER",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200",
  },
  {
    title: "How to rent out your property safely and successfully — a complete owner's guide",
    category: "GUIDE",
    date: "DEC 10, 2024",
    author: "JAMES MILLER",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200",
  },
  {
    title: "The future of smart homes — what's trending in home tech for 2025",
    category: "NEWS",
    date: "DEC 11, 2024",
    author: "RYAN MILFORD",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200",
  },
  {
    title: "Real estate trends 2025 — what's shaping the property market this year",
    category: "NEWS",
    date: "JAN 3, 2025",
    author: "JAMES MILLER",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200",
  },
  {
    title: "How AI is changing the way homes are bought and sold",
    category: "NEWS",
    date: "DEC 5, 2024",
    author: "RYAN MILFORD",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200",
  },
  {
    title: "Rising property hotspots in 2025 — where smart buyers are heading next",
    category: "NEWS",
    date: "DEC 5, 2024",
    author: "RYAN MILFORD",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200",
  },
  {
    title: "Smart tips for real estate investing in 2025 — building wealth with confidence",
    category: "GUIDE",
    date: "DEC 5, 2024",
    author: "JAMES MILLER",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200",
  },
  {
    title: "7 simple upgrades that make your home feel luxurious",
    category: "LIFESTYLE",
    date: "FEB 5, 2025",
    author: "RYAN MILFORD",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1low4QaMMGv78ejUu8fu4jGET-05Ou612%26sz=w1200",
  },
  {
    title: "Clever ways to make small spaces feel brighter, airier, and bigger",
    category: "LIFESTYLE",
    date: "JAN 20, 2025",
    author: "JAMES MILLER",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1pZw-Bbw-n7F6cLhweMXVkXN8EDU0mlIT%26sz=w1200",
  },
  {
    title: "Weekend home refresh ideas that make your space feel brand new",
    category: "LIFESTYLE",
    date: "SEP 24, 2024",
    author: "JAMES MILLER",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1EM6PEbCKWutwdjTCdT-8wLCm3qtmkSJJ%26sz=w1200",
  },
  {
    title: "Transform your home for the new season — simple refresh ideas for every style",
    category: "LIFESTYLE",
    date: "DEC 5, 2024",
    author: "JAMES MILLER",
    image: "https://images.weserv.nl/?output=webp&q=80&url=https://drive.google.com/thumbnail?id=1VBqCbd9wcYZK-027SKQoy1-t1eofVjdL%26sz=w1200",
  }
];

const getSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

const getRichContent = (blog) => {
  const category = blog.category || 'GUIDE';
  
  // Custom contents for distinct blogs
  if (blog.title.includes("First-time homebuyer's guide")) {
    return {
      subtitle: "Navigating your path to ownership with confidence and ease.",
      readTime: "5 MIN READ",
      intro: "Buying your very first home is one of the most rewarding achievements of your life. Yet, navigating mortgages, interest rates, down payments, and negotiating details can feel like a secondary job. With structural planning and architectural clarity, you can confidently turn this complex puzzle into your ultimate success story.",
      quote: "A home is more than an investment of capital; it is the physical foundation for personal freedom and generational peace.",
      sections: [
        {
          title: "Assess Your True Financial Health First",
          content: "Before opening real estate listing portals, sit down with a solid spreadsheet. Real cost parameters go way beyond your monthly mortgage payment. Factoring in property insurance, estate taxes, monthly maintenance caps, and utility buffers is crucial for sustainable homeownership. Aim to keep housing expenses below 28% of your gross monthly income."
        },
        {
          title: "The Power of Pre-Approval",
          content: "Pre-qualification is a friendly estimate, but a pre-approval is a verified commitment from your lender. It gives you a rock-solid price ceiling and shows builders you have direct funding power, instantly giving you the leverage to close deals ahead of competitors in high-demand smart districts."
        }
      ],
      tip: "Never skip the structural inspection! A few hundred dollars up front guarantees you don't inherit hidden foundation, plumbing, or electrical issues that could cost thousands down the line."
    };
  }

  if (blog.title.includes("smart homes") || blog.title.includes("tech")) {
    return {
      subtitle: "The next generation of living is connected, autonomous, and energy-neutral.",
      readTime: "6 MIN READ",
      intro: "Step into any modern residence today, and you'll see smart light bulbs or voice assistants. But the future of smart homes isn't just about isolated voice triggers; it's about unified systems that automatically manage your lifestyle footprint. In 2025, homes are transitioning from simple connected structures into intelligent living sanctuaries.",
      quote: "Technology should never be a chore to manage. The best smart systems disappear into the background, responding seamlessly to your needs.",
      sections: [
        {
          title: "The Rise of Unified IoT Ecosystems",
          content: "Historically, smart home gadgets existed in closed vertical silos. Today, universal standards like Matter enable devices from different platforms to coordinate locally, allowing your HVAC, automated windows, solar battery cells, and circadian light arrays to work together in harmony without lag."
        },
        {
          title: "Energy-Neutral Autonomy",
          content: "Intelligent homes are taking direct control of energy usage. AI algorithms can predict local weather patterns, pre-cool rooms using solar surplus, and dynamically balance your load grid to run your smart appliances at peak efficiency, bringing bills to absolute zero."
        }
      ],
      tip: "When building a smart ecosystem, focus on local-first processing devices. It protects your personal data security and ensures your home automation works perfectly even if your internet goes offline."
    };
  }

  if (blog.category === "LIFESTYLE") {
    return {
      subtitle: "Elevating the daily experience through light, texture, and geometry.",
      readTime: "4 MIN READ",
      intro: "We spend a vast portion of our lives within our homes. Yet, we often tolerate cluttered layouts, dim lighting, and stagnant air flow. Transitioning your property from a place where you just sleep into a high-end personal sanctuary doesn't require complete structural demolition. It is about applying design principles that prioritize human well-being.",
      quote: "Design is not what it looks like or feels like. Design is how the space supports the daily ritual of human life.",
      sections: [
        {
          title: "Curate a Harmonious Natural Palette",
          content: "Colors have direct psychological impacts. By introducing soft organic earth tones, stone textures, warm wood grains, and low-gloss finishes, you instantly soothe the nervous system. Avoid harsh primary synthetics; embrace materials that age gracefully and develop natural character over time."
        },
        {
          title: "Command the Architecture of Light",
          content: "Proper lighting is the ultimate luxury. Maximize natural daylight entry by keeping window lines clear and choosing lightweight window treatments. For evening spaces, avoid direct overhead glare by layering warm accent lamps, hidden LED coves, and wall wash spotlights at eye level."
        }
      ],
      tip: "Declutter aggressively using the 'one-in, one-out' rule. Keep surfaces completely clear to establish a calm, spacious aesthetic that makes even compact layouts feel grand and premium."
    };
  }

  // General Fallback Content
  return {
    subtitle: `Crucial insights and professional strategy on ${blog.category.toLowerCase()} topics.`,
    readTime: "5 MIN READ",
    intro: `Welcome to our professional insights series. Today, we are exploring the critical elements of ${blog.title.toLowerCase()}. Understanding these fundamental design and economic patterns will help you make smarter real estate choices and enhance your lifestyle.`,
    quote: "True luxury lies in the details. When structure, material, and purpose align, the result is always spectacular.",
    sections: [
      {
        title: "Understanding the Core Principles",
        content: "Every successful property project relies on a balance between utility and aesthetic beauty. When planning upgrades or looking to buy, it's vital to research market trends, study spatial orientation, and select quality materials that stand the test of time, ensuring both beauty and long-term financial security."
      },
      {
        title: "Execution and Strategy",
        content: "Success is all about preparation. Assemble a trusted team of professionals, set clear budgets, and execute with precision. In doing so, you can avoid common spatial or financial pitfalls and deliver an outstanding, high-fidelity experience that raises the bar for smart living."
      }
    ],
    tip: "Always research regional infrastructure growth plans! Buying into neighborhoods with planned smart grids and transit lines guarantees maximum value appreciation over time."
  };
};

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const [hasVoted, setHasVoted] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Find current blog
  const currentBlog = dummyBlogs.find(b => getSlug(b.title) === slug) || dummyBlogs[0];
  const richContent = getRichContent(currentBlog);

  // Filter 4 related blogs
  const relatedBlogs = dummyBlogs
    .filter(b => getSlug(b.title) !== slug)
    .slice(0, 4);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <main className="blog-single-page">
      <div className="blog-single-container">
        
        {/* Back Link */}
        <Link href="/blogs" className="back-to-blogs-link" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          color: 'var(--text-secondary)',
          fontWeight: '600',
          fontSize: '14px',
          marginBottom: '32px',
          transition: 'color 0.3s ease'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(180deg)' }}><polyline points="9 18 15 12 9 6"></polyline></svg>
          BACK TO BLOGS & INSIGHTS
        </Link>

        {/* Blog Header */}
        <header className="blog-single-header">
          <div className="blog-single-label">
            <div className="label-square"></div>
            <span>{currentBlog.category}</span>
            <div className="label-square"></div>
          </div>
          <h1 className="blog-single-title">{currentBlog.title}</h1>
          
          <div className="blog-single-meta">
            <div className="blog-single-meta-item">
              <div className="blog-single-avatar">
                <img src={`https://ui-avatars.com/api/?name=${currentBlog.author.replace(' ', '+')}&background=random`} alt={currentBlog.author} />
              </div>
              <span className="blog-single-author-name">{currentBlog.author}</span>
            </div>
            <div className="blog-single-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span>{currentBlog.date}</span>
            </div>
            <div className="blog-single-meta-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span>{richContent.readTime}</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="blog-single-featured-image">
          <img src={currentBlog.image} alt={currentBlog.title} referrerPolicy="no-referrer" />
        </div>

        {/* Layout: Sidebar + Article Body */}
        <div className="blog-single-layout">
          
          {/* Sidebar */}
          <aside className="blog-single-sidebar">
            <div className="sidebar-widget">
              <h4 className="widget-title">Share Article</h4>
              <div className="share-links">
                <button className="share-btn" aria-label="Share on Twitter" onClick={() => alert('Link copied to clipboard!')}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
                <button className="share-btn" aria-label="Share on LinkedIn" onClick={() => alert('Link copied to clipboard!')}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </button>
                <button className="share-btn" aria-label="Share on Facebook" onClick={() => alert('Link copied to clipboard!')}>
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </button>
              </div>
            </div>

            <div className="sidebar-widget">
              <h4 className="widget-title">Insights Newsletter</h4>
              {subscribed ? (
                <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '14px', fontStyle: 'italic' }}>
                  ✓ Thank you! You're subscribed.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                  />
                  <button type="submit" className="newsletter-btn">SUBSCRIBE</button>
                </form>
              )}
            </div>
          </aside>

          {/* Main Article Body */}
          <article className="blog-single-body">
            <p>{richContent.intro}</p>
            
            {richContent.sections.map((section, idx) => (
              <React.Fragment key={idx}>
                <h2>{section.title}</h2>
                <p>{section.content}</p>
              </React.Fragment>
            ))}

            <blockquote>
              "{richContent.quote}"
            </blockquote>

            {/* Tip Highlight Box */}
            <div className="blog-single-tip-box">
              <div className="blog-single-tip-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                Expert Brand Tip
              </div>
              <p className="blog-single-tip-content">
                {richContent.tip}
              </p>
            </div>

            {/* Was this helpful Widget */}
            <div className="feedback-widget">
              <span className="feedback-question">Was this article helpful to you?</span>
              {hasVoted ? (
                <span className="feedback-thanks">✓ Thank you for your feedback!</span>
              ) : (
                <div className="feedback-actions">
                  <button className="feedback-btn" onClick={() => setHasVoted(true)}>YES</button>
                  <button className="feedback-btn" onClick={() => setHasVoted(true)}>NO</button>
                </div>
              )}
            </div>
          </article>
        </div>

        {/* Related Articles Section */}
        <section className="related-posts-section">
          <h3 className="related-title">More Related Stories</h3>
          <div className="blogs-grid">
            {relatedBlogs.map((blog, idx) => (
              <Link href={`/blogs/${getSlug(blog.title)}`} key={idx} className="blog-card">
                <div className="blog-card-image">
                  <img loading="lazy" src={blog.image} alt={blog.title} referrerPolicy="no-referrer" />
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-date">{blog.date}</span>
                    <span className="blog-dot">•</span>
                    <span className="blog-category">{blog.category}</span>
                  </div>
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <div className="blog-card-author">
                    <div className="blog-author-avatar">
                      <img src={`https://ui-avatars.com/api/?name=${blog.author.replace(' ', '+')}&background=random`} alt={blog.author} />
                    </div>
                    <span className="blog-author-name">{blog.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="blog-cta-container">
            <Link href="/blogs" className="blog-cta-btn">
              <div className="flip-text">
                <span data-hover="READ ALL BLOGS">READ ALL BLOGS</span>
              </div>
              <div className="arrow-circle">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
