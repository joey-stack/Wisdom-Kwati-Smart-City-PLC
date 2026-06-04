'use client';
import Image from 'next/image';

export default function HeroVideo() {
    return (
        <div
            className="hero-video-wrapper"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}
        >
            <Image
                src="/images/hero-bg-new.jpg"
                alt="Wisdom Kwati Smart City"
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                priority={true}
                quality={75}
            />
            {/* Interaction Shield */}
            <div
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent', zIndex: 1, pointerEvents: 'all' }}
            />
        </div>
    );
}
