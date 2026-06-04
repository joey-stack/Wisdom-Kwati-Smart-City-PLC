'use client';

export default function HeroVideo() {
    const videoId = "1TZNzlSSVzt6Dg4NN2SIsXzbxOd_sQG5glQWs1Z1pUGY";
    const googleDriveVideoSrc = `https://drive.google.com/uc?export=download&id=${videoId}`;

    return (
        <div
            className="hero-video-wrapper"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0 }}
        >
            <video
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                aria-hidden="true"
                poster="/images/hero-bg-new.jpg"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0
                }}
            >
                <source src={googleDriveVideoSrc} type="video/mp4" />
                <source src="/vision-video.mp4" type="video/mp4" />
            </video>

            {/* Subtle overlay gradient to maintain text readability */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.6) 100%)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            />

            {/* Interaction Shield */}
            <div
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent', zIndex: 2, pointerEvents: 'all' }}
            />
        </div>
    );
}
