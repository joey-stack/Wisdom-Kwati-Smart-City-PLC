'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch((err) => {
                console.log('Video autoplay failed or was prevented:', err);
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
                muted
                loop
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    zIndex: 1 
                }}
            >
                <source 
                    src="https://drive.google.com/uc?export=view&id=1RInQBUS0NH37uiFF-cOvtKfGKioKS-fz&confirm=t" 
                    type="video/mp4" 
                />
            </video>

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
