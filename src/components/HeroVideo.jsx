'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
    const containerRef = useRef(null);

    useEffect(() => {
        let player = null;
        let timePollId = null;
        let scriptPollId = null;

        // Ensure script is added
        if (typeof window !== 'undefined' && !document.getElementById('youtube-iframe-api')) {
            const tag = document.createElement('script');
            tag.id = 'youtube-iframe-api';
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            if (firstScriptTag) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            } else {
                document.head.appendChild(tag);
            }
        }

        const initPlayer = () => {
            if (!containerRef.current || player) return;

            try {
                player = new window.YT.Player(containerRef.current, {
                    videoId: 'JYLmRiA-Wp4',
                    playerVars: {
                        autoplay: 1,
                        mute: 1,
                        controls: 0,
                        rel: 0,
                        showinfo: 0,
                        modestbranding: 1,
                        iv_load_policy: 3,
                        playsinline: 1,
                        disablekb: 1,
                        fs: 0,
                        autohide: 1,
                        wmode: 'opaque'
                    },
                    events: {
                        onReady: (event) => {
                            event.target.mute();
                            event.target.playVideo();

                            // Start time checker for seamless looping
                            timePollId = setInterval(() => {
                                if (event.target && typeof event.target.getCurrentTime === 'function') {
                                    const currentTime = event.target.getCurrentTime();
                                    const duration = event.target.getDuration();
                                    if (duration > 0 && currentTime >= duration - 0.5) {
                                        event.target.seekTo(0.1, true);
                                    }
                                }
                            }, 100);
                        },
                        onStateChange: (event) => {
                            if (event.data === window.YT.PlayerState.PLAYING) {
                                // Fade in the iframe once it actually starts playing
                                const iframe = event.target.getIframe();
                                if (iframe) {
                                    iframe.style.opacity = '1';
                                }
                            } else if (event.data === window.YT.PlayerState.ENDED) {
                                event.target.seekTo(0.1, true);
                                event.target.playVideo();
                            } else if (event.data === window.YT.PlayerState.PAUSED) {
                                event.target.playVideo();
                            }
                        }
                    }
                });
            } catch (err) {
                console.error("Error inside YT.Player instantiation:", err);
            }
        };

        // Poll until YT API is ready on window
        scriptPollId = setInterval(() => {
            if (window.YT && window.YT.Player) {
                clearInterval(scriptPollId);
                initPlayer();
            }
        }, 100);

        return () => {
            if (scriptPollId) clearInterval(scriptPollId);
            if (timePollId) clearInterval(timePollId);
            if (player && typeof player.destroy === 'function') {
                try {
                    player.destroy();
                } catch (e) {
                    console.error("Error destroying YouTube player:", e);
                }
            }
        };
    }, []);

    return (
        <div
            className="hero-video-wrapper"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}
        >
            {/* The YouTube iframe will replace this div */}
            <div
                ref={containerRef}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100vw',
                    height: '56.25vw', /* 16:9 Aspect Ratio */
                    minHeight: '100vh',
                    minWidth: '177.77vh', /* 16:9 Aspect Ratio */
                    transform: 'translate(-50%, -50%) scale(1.3)', /* Zoomed to hide controls and channel header */
                    pointerEvents: 'none',
                    zIndex: 1,
                    opacity: 0, // Starts hidden, faded in via direct DOM manipulation once playing
                    transition: 'opacity 0.8s ease-in-out'
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
