"use client"
import React, { useState, useRef } from 'react';
import '/styles/video-js.css';
import '/styles/landing.css';
import '/styles/landing_style.css';
import '/styles/landing-bck.css';
import '/styles/landing_style-bck.css';
import '/styles/videos.css';

const VideoSlider = () => {
  // State for each slider's current index
  const [tiktokIndex, setTiktokIndex] = useState(0);
  const [facebookIndex, setFacebookIndex] = useState(0);
  const [youtubeIndex, setYoutubeIndex] = useState(0);

  // Refs for swipe handling
  const tiktokRef = useRef(null);
  const facebookRef = useRef(null);
  const youtubeRef = useRef(null);

  // Video data
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

  // Navigation handlers
  const handleNext = (setIndex, maxLength) => {
    setIndex((prev) => (prev + 1) % maxLength);
  };

  const handlePrev = (setIndex, maxLength) => {
    setIndex((prev) => (prev - 1 + maxLength) % maxLength);
  };

  // Swipe handlers
  const handleSwipe = (e, setIndex, maxLength, ref) => {
    const startX = e.type === 'touchstart' ? e.touches[0].clientX : null;
    let moveX = null;

    const onMove = (moveEvent) => {
      if (moveEvent.touches) {
        moveX = moveEvent.touches[0].clientX;
      }
    };

    const onEnd = () => {
      if (startX && moveX) {
        const distance = startX - moveX;
        const threshold = 50;
        if (distance > threshold) {
          handleNext(setIndex, maxLength); // Swipe left
        } else if (distance < -threshold) {
          handlePrev(setIndex, maxLength); // Swipe right
        }
      }
      ref.current.removeEventListener('touchmove', onMove);
      ref.current.removeEventListener('touchend', onEnd);
    };

    if (e.type === 'touchstart') {
      ref.current.addEventListener('touchmove', onMove);
      ref.current.addEventListener('touchend', onEnd);
    }
  };

  return (
    <div className="video-slider">
      {/* Header */}
      <div className="portfolio-header">
        <h2>
          See What <br />
          <span className="highlight">VideoCrafter.io</span> Has Done
        </h2>
      </div>

      {/* Desktop Grid Layout */}
      <div className="video-grid">
        {/* TikTok Videos */}
        <h3 className="grid-title">TikTok Ad Examples</h3>
        <div className="grid-container">
          {videoData.tiktok.map((video, idx) => (
            <div className="grid-video" key={idx}>
              <video
                src={video.src}
                style={{ width: '100%' }}
                poster={video.poster}
                controls
                muted
                playsInline
              />
            </div>
          ))}
        </div>

        {/* Facebook Videos */}
        <h3 className="grid-title">Facebook/Instagram Ad Examples</h3>
        <div className="grid-container">
          {videoData.facebook.map((video, idx) => (
            <div className="grid-video" key={idx}>
              <video
                src={video.src}
                style={{ width: '100%' }}
                poster={video.poster}
                controls
                muted
                playsInline
              />
            </div>
          ))}
        </div>

        {/* YouTube Videos */}
        <h3 className="grid-title">YouTube Ad Examples</h3>
        <div className="grid-container">
          {videoData.youtube.map((video, idx) => (
            <div className="grid-video" key={idx}>
              <video
                src={video.src}
                style={{ width: '100%' }}
                poster={video.poster}
                controls
                muted
                playsInline
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Sliders */}
      {/* TikTok Slider */}
      <div className="mobile-slider tiktok">
        <h3 className="slider-title">TikTok Ad Examples</h3>
        <div
          className="slider-wrapper"
          ref={tiktokRef}
          onTouchStart={(e) => handleSwipe(e, setTiktokIndex, videoData.tiktok.length, tiktokRef)}
        >
          <button
            className="slider-btn prev"
            onClick={() => handlePrev(setTiktokIndex, videoData.tiktok.length)}
          >
            &lt;
          </button>
          <div className="slider-videos" style={{ transform: `translateX(-${tiktokIndex * 100}%)` }}>
            {videoData.tiktok.map((video, idx) => (
              <div className="slider-video" key={idx}>
                <video
                  src={video.src}
                  style={{ width: '100%' }}
                  poster={video.poster}
                  controls
                  muted
                  playsInline
                />
              </div>
            ))}
          </div>
          <button
            className="slider-btn next"
            onClick={() => handleNext(setTiktokIndex, videoData.tiktok.length)}
          >
            &gt;
          </button>
        </div>
        <div className="slider-dots">
          {videoData.tiktok.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${tiktokIndex === idx ? 'active' : ''}`}
              onClick={() => setTiktokIndex(idx)}
            />
          ))}
        </div>
      </div>

      {/* Facebook Slider */}
      <div className="mobile-slider facebook">
        <h3 className="slider-title">Facebook/Instagram Ad Examples</h3>
        <div
          className="slider-wrapper"
          ref={facebookRef}
          onTouchStart={(e) => handleSwipe(e, setFacebookIndex, videoData.facebook.length, facebookRef)}
        >
          <button
            className="slider-btn prev"
            onClick={() => handlePrev(setFacebookIndex, videoData.facebook.length)}
          >
            &lt;
          </button>
          <div className="slider-videos" style={{ transform: `translateX(-${facebookIndex * 100}%)` }}>
            {videoData.facebook.map((video, idx) => (
              <div className="slider-video" key={idx}>
                <video
                  src={video.src}
                  style={{ width: '100%' }}
                  poster={video.poster}
                  controls
                  muted
                  playsInline
                />
              </div>
            ))}
          </div>
          <button
            className="slider-btn next"
            onClick={() => handleNext(setFacebookIndex, videoData.facebook.length)}
          >
            &gt;
          </button>
        </div>
        <div className="slider-dots">
          {videoData.facebook.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${facebookIndex === idx ? 'active' : ''}`}
              onClick={() => setFacebookIndex(idx)}
            />
          ))}
        </div>
      </div>

      {/* YouTube Slider */}
      <div className="mobile-slider youtube">
        <h3 className="slider-title">YouTube Ad Examples</h3>
        <div
          className="slider-wrapper"
          ref={youtubeRef}
          onTouchStart={(e) => handleSwipe(e, setYoutubeIndex, videoData.youtube.length, youtubeRef)}
        >
          <button
            className="slider-btn prev"
            onClick={() => handlePrev(setYoutubeIndex, videoData.youtube.length)}
          >
            &lt;
          </button>
          <div className="slider-videos" style={{ transform: `translateX(-${youtubeIndex * 100}%)` }}>
            {videoData.youtube.map((video, idx) => (
              <div className="slider-video" key={idx}>
                <video
                  src={video.src}
                  style={{ width: '100%' }}
                  poster={video.poster}
                  controls
                  muted
                  playsInline
                />
              </div>
            ))}
          </div>
          <button
            className="slider-btn next"
            onClick={() => handleNext(setYoutubeIndex, videoData.youtube.length)}
          >
            &gt;
          </button>
        </div>
        <div className="slider-dots">
          {videoData.youtube.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${youtubeIndex === idx ? 'active' : ''}`}
              onClick={() => setYoutubeIndex(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;