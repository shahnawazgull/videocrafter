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

  return (
    <div>
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
