'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import 'video.js/dist/video-js.css';
import '/styles/landing.css';
import '/styles/landing_style.css';
import '/styles/landing-bck.css';
import '/styles/landing_style-bck.css';

// Load Video.js dynamically
const VideoPlayer = dynamic(() => import('video.js').then((videojs) => {
  const VideoComponent = ({ className, src, poster, isActive, onUserInteraction }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [isUserActive, setIsUserActive] = useState(false);

    useEffect(() => {
      if (!videoRef.current) return;

      const initializePlayer = () => {
        if (!playerRef.current) {
          playerRef.current = videojs.default(videoRef.current, {
            fluid: true,
            controls: true,
            preload: 'auto',
            playsInline: true,
          });

          const handleFirstPlay = () => {
            setIsUserActive(true);
            onUserInteraction();
            videoRef.current.removeEventListener('play', handleFirstPlay);
          };
          videoRef.current.addEventListener('play', handleFirstPlay);
        }
      };

      if (isActive) {
        initializePlayer();
        if (isUserActive) {
          videoRef.current.play().catch(err => console.log('Autoplay prevented:', err));
        }
      } else if (playerRef.current) {
        videoRef.current.pause();
      }

      return () => {
        if (playerRef.current && !isActive) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }, [isActive, src, isUserActive, onUserInteraction]);

    return (
      <div style={{ width: '100%', maxWidth: '500px', minHeight: '200px' }}>
        <video
          ref={videoRef}
          className={`video-js vjs-default-skin vjs-big-play-centered ${className}-video`}
          controls
          preload="auto"
          style={{ width: '100%' }}
          poster={poster}
          playsInline
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    );
  };
  return VideoComponent;
}), {
  ssr: false,
  loading: () => <div>Loading video...</div>,
});

const Slider = React.memo(({ title, videos, currentIndex, setIndex, className }) => {
  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % videos.length);
  }, [setIndex, videos.length]);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [setIndex, videos.length]);

  const [hasInteracted, setHasInteracted] = useState(false);

  const handleUserInteraction = useCallback(() => {
    setHasInteracted(true);
  }, []);

  return (
    <div className={`mobi-slider ${className}`}>
      <h2 className="subtitle mobile-sub-head">{title}</h2>
      <div className="slider">
        <button className="prev" onClick={handlePrev}>&lt;</button>
        <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {videos.map((video, idx) => (
            <div className="slide" key={idx}>
              <div className="Placeholder-mob">
                <VideoPlayer
                  className={className}
                  src={video.src}
                  poster={video.poster}
                  isActive={currentIndex === idx}
                  onUserInteraction={handleUserInteraction}
                />
              </div>
            </div>
          ))}
        </div>
        <button className="next" onClick={handleNext}>&gt;</button>
        <div className="slider-dots">
          {videos.map((_, idx) => (
            <span key={idx} className={`dot ${currentIndex === idx ? 'active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
});

const Story = () => {
  const [tiktokIndex, setTiktokIndex] = useState(0);
  const [facebookIndex, setFacebookIndex] = useState(0);
  const [youtubeIndex, setYoutubeIndex] = useState(0);

  const videoData = {
    tiktok: [
      { src: 'videos/tiktok/tiktok1.mp4', poster: 'images/tiktok-poster.png' },
      { src: 'videos/tiktok/tiktok1.mp4', poster: 'images/tiktok-poster.png' },
      { src: 'videos/tiktok/tiktok1.mp4', poster: 'images/tiktok-poster.png' },
    ],
    facebook: [
      { src: 'videos/facebook/facebook1.mp4', poster: 'images/facebook-poster.png' },
      { src: 'videos/facebook/facebook1.mp4', poster: 'images/facebook-poster.png' },
      { src: 'videos/facebook/facebook1.mp4', poster: 'images/facebook-poster.png' },
    ],
    youtube: [
      { src: 'videos/youtube/youtube1.mp4', poster: 'images/youtube-poster.png' },
      { src: 'videos/youtube/youtube1.mp4', poster: 'images/youtube-poster.png' },
      { src: 'videos/youtube/youtube1.mp4', poster: 'images/youtube-poster.png' },
    ],
  };

  return (
    <div>
      <div className="portfolio" id="Portfolio">
        <div className="portfoliotext">
          <h2>
            See What <br />
            <span className="highlight">VideoCrafter.io</span> Has Done
          </h2>
        </div>

        {/* Desktop Grid Layout */}
        <div className="grid">
          <h2 className="subtitle">TikTok Ad Examples</h2>
          <div className="grid-container">
            {videoData.tiktok.map((video, idx) => (
              <div className="grid-item" key={idx}>
                <video
                  src={video.src}
                  style={{ width: '100%' }}
                  poster={video.poster}
                  controls
                  className="tiktok-video"
                />
              </div>
            ))}
          </div>

          <h2 className="subtitle">Facebook/Instagram Ad Examples</h2>
          <div className="grid-container">
            {videoData.facebook.map((video, idx) => (
              <div className="grid-item" key={idx}>
                <video
                  src={video.src}
                  style={{ width: '100%' }}
                  poster={video.poster}
                  controls
                  className="facebook-video"
                />
              </div>
            ))}
          </div>

          <h2 className="subtitle">YouTube Ad Examples</h2>
          <div className="grid-container">
            {videoData.youtube.map((video, idx) => (
              <div className="grid-item" key={idx}>
                <video
                  src={video.src}
                  style={{ width: '100%' }}
                  poster={video.poster}
                  controls
                  className="youtube-video"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Sliders */}
        <Slider title="TikTok Ad Examples" videos={videoData.tiktok} currentIndex={tiktokIndex} setIndex={setTiktokIndex} className="tiktok" />
        <Slider title="Facebook Ad Examples" videos={videoData.facebook} currentIndex={facebookIndex} setIndex={setFacebookIndex} className="facebook" />
        <Slider title="YouTube Ad Examples" videos={videoData.youtube} currentIndex={youtubeIndex} setIndex={setYoutubeIndex} className="youtube" />
      </div>
    </div>
  );
};

export default Story;