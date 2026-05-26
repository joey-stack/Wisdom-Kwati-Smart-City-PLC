'use client';

export default function HeroVideo() {
    return (
        <div
            className="hero-video-wrapper"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}
        >
            <img
                src="https://images.weserv.nl/?url=drive.google.com/uc?id=1WkaEVNo0ii8zkmYXHDOd5MOFwDcz7VKi"
                alt="Wisdom Kwati Smart City"
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                fetchPriority="high"
            />
            {/* Interaction Shield */}
            <div
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent', zIndex: 1, pointerEvents: 'all' }}
            />
        </div>
    );
}
