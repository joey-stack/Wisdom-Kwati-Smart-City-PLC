'use client';
import React from 'react';
import Image from 'next/image';

export default function HeroVideo() {
    return (
        <div
            className="hero-video-wrapper"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}
        >
            {/* YouTube Embed configured for background loops */}
            <iframe
                src="https://www.youtube.com/embed/JYLmRiA-Wp4?autoplay=1&mute=1&loop=1&playlist=JYLmRiA-Wp4&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Wisdom Kwati Smart City Video Background"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100vw',
                    height: '56.25vw', /* 16:9 Aspect Ratio */
                    minHeight: '100vh',
                    minWidth: '177.77vh', /* 16:9 Aspect Ratio */
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* Fallback Poster Image */}
            <Image
                src="/images/hero-bg-new.jpg"
                alt="Wisdom Kwati Smart City"
                fill
                sizes="100vw"
                style={{ objectFit: 'cover', zIndex: 0 }}
                priority={true}
                quality={75}
            />

            {/* Interaction Shield */}
            <div
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent', zIndex: 2, pointerEvents: 'all' }}
            />
        </div>
    );
}
