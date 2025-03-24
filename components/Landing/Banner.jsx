import React from 'react';
import Link from 'next/link'; // Import Link for client-side navigation
import '/styles/landing.css'
import '/styles/landing_style.css'
import '/styles/landing-bck.css'
import '/styles/landing_style-bck.css'
const Banner = () => {
  return (
    <div>
      <div className="top"> 
        <div className="typography">
          <h1 className="h1hero">
            Create <span className="highlight"> High-Converting Video Ads </span>Within An Hour – No
            Video Editor Required
          </h1>

          <p className="phero">
            Why leave your ad performance in someone else’s hands when you can do it yourself?<br />
            Introducing VideoCrafter.io – the fastest, easiest way to create scroll-stopping video ads <br />
            for Facebook, Instagram, YouTube, and TikTok – without needing a video editor.
          </p>
        </div>

        <div className="heroButton">
          <img
            src="images/arrow.svg"
            alt="arrow"
            className="arrow"
          />
          <Link href="#pricing" passHref>
            <div className="getStarted" id="heroButton">
              Get Started
              <img
                src="images/arrow.svg"
                alt="arrow-right"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
