import React, { useState, useEffect } from 'react';
import Header from '../Home/Header';
import ProgressBar from '../Home/ProgressBar';

const LoadingAnimation = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Handle navigation to background-music page with reload
  useEffect(() => {
    if (percent === 100 && window.location.pathname !== '/background-music') {
      window.location.href = '/background-music';
    }
  }, [percent]);

  // Add this CSS in your stylesheet or within a style tag
  const styles = `
    .dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 2px;
      background: #000;
      border-radius: 50%;
      animation: dot-bounce 1.4s infinite ease-in-out both;
    }

    .dot:nth-child(1) { animation-delay: -0.32s; }
    .dot:nth-child(2) { animation-delay: -0.16s; }
    .dot:nth-child(3) { animation-delay: 0s; }

    @keyframes dot-bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `;

  return (
    <div>
      <style>{styles}</style>
      <Header />
      <ProgressBar />
      <div 
        className="container" 
        style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
      >
        <div 
          style={{
            display: 'flex',
            textAlign: 'center',
            width: '524px',
            height: '109px',
            background: 'white',
            border: '1px solid #0000004D',
            borderRadius: '8px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span 
            style={{
              fontFamily: 'Montserrat',
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: '29.26px',
              textAlign: 'center',
            }}
          >
            Loading<span className="dot"></span><span className="dot"></span><span className="dot"></span>
            <span style={{ paddingLeft: '10px' }} id="percent">{percent}%</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;