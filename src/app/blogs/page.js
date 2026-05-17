'use client';
import Link from 'next/link';
import '../../styles/blogs.css';

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

export default function BlogsPage() {
  return (
    <main className="blogs-page">
      {/* Custom Card Cursor */}
      <div id="card-cursor" className="card-cursor">
          <span>READ</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </div>

      <div className="container-1380">
        <header className="blogs-header reveal-on-scroll">
          <div className="blogs-label">
            <div className="label-square"></div>
            <span>BLOGS & INSIGHTS</span>
            <div className="label-square"></div>
          </div>
          <h1 className="blogs-headline">
            Everything you ever wanted to know about buying, selling, and living better
          </h1>
          
          <div className="blogs-filters">
            <button className="filter-pill active">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
              ALL
            </button>
            <button className="filter-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              FEATURED
            </button>
            <button className="filter-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              GUIDE
            </button>
            <button className="filter-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
              LIFESTYLE
            </button>
            <button className="filter-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
              NEWS
            </button>
          </div>
        </header>

        <div className="blogs-grid">
          {dummyBlogs.map((blog, idx) => (
            <Link href={`/blogs/${getSlug(blog.title)}`} key={idx} className="blog-card reveal-on-scroll">
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
      </div>
    </main>
  );
}
