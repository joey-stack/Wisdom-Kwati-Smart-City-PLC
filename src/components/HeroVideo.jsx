'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function HeroVideo() {
    const playerRef = useRef(null);
    const containerRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);

    useEffect(() => {
        let player = null;
        let intervalId = null;

        // Function to initialize the YT player
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
                            setVideoReady(true);

                            // Start interval to check video time and loop seamlessly
                            intervalId = setInterval(() => {
                                if (event.target && typeof event.target.getCurrentTime === 'function') {
                                    const currentTime = event.target.getCurrentTime();
                                    const duration = event.target.getDuration();
                                    
                                    // Seek back to 0.1s when we are 0.5s away from the end
                                    // This prevents the YouTube player from entering the buffering / ended state
                                    if (duration > 0 && currentTime >= duration - 0.5) {
                                        event.target.seekTo(0.1, true);
                                    }
                                }
                            }, 100);
                        },
                        onStateChange: (event) => {
                            // Safe fallback: if video ended or paused, resume and seek
                            if (event.data === window.YT.PlayerState.ENDED) {
                                event.target.seekTo(0.1, true);
                                event.target.playVideo();
                            } else if (event.data === window.YT.PlayerState.PAUSED) {
                                event.target.playVideo();
                            }
                        }
                    }
                });
            } catch (err) {
                console.error("Error initializing YouTube Player:", err);
            }
        };

        // Load YouTube API if not already loaded
        if (!window.YT) {
            // Check if the script is already added to avoid duplicate scripts
            if (!document.getElementById('youtube-iframe-api')) {
                const tag = document.createElement('script');
                tag.id = 'youtube-iframe-api';
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }

            // Bind global callback
            const prevCallback = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => {
                if (prevCallback) prevCallback();
                initPlayer();
            };
        } else {
            // If API already exists, check if YT.Player is loaded, otherwise wait or run
            if (window.YT && window.YT.Player) {
                initPlayer();
            } else {
                const prevCallback = window.onYouTubeIframeAPIReady;
                window.onYouTubeIframeAPIReady = () => {
                    if (prevCallback) prevCallback();
                    initPlayer();
                };
            }
        }

        // Cleanup on unmount
        return () => {
            if (intervalId) clearInterval(intervalId);
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
                    opacity: videoReady ? 1 : 0,
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
