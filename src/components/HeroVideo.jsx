'use client';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
    const videoRef = useRef(null);

    useEffect(() => {
        // Safe fallback in case autoplay gets blocked or paused by browser policies
        if (videoRef.current) {
            videoRef.current.play().catch(err => {
                console.log("Autoplay was prevented, retrying on interaction...", err);
            });
        }
    }, []);

    return (
        <div
            className="hero-video-wrapper"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}
        >
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/assets/images/hero-bg-new.jpg"

                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100vw',
                    height: '56.25vw', /* 16:9 Aspect Ratio */
                    minHeight: '100vh',
                    minWidth: '177.77vh', /* 16:9 Aspect Ratio */
                    transform: 'translate(-50%, -50%)',
                    objectFit: 'cover',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            >
                <source src="/assets/videos/hero.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Fallback Poster Image */}
            <Image
                src="/assets/images/hero-bg-new.jpg"
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
