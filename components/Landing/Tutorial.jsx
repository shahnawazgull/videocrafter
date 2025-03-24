import React from 'react';
import Head from 'next/head';
import '/styles/landing.css'
import '/styles/landing_style.css'
import '/styles/landing-bck.css'
import '/styles/landing_style-bck.css'
const Tutorial = () => {
  return (
    <div>
      <div className="tutorial-container" style={{ height: 'auto' }}>
        <h1 className="tutorial-title">
          <span className="title-bold">VideoCrafter</span>
          <span className="title-highlight">Tutorial</span>
        </h1>
        <p className="tutorial-description">
          In This Tutorial, We'll Walk You Through How To Use VideoCrafter.Io To Create
          High-Converting Video Sales Letters With Ease.
        </p>
        <div className='placeholder'>
          <video
            src='videos/dummy.mp4'
            style={{ width: '100%' }}
            poster='images/poster.jpg'
            controls
          />
        </div>
      </div>
    </div>
  );
};

export default Tutorial;