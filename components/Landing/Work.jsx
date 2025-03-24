import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import '/styles/landing.css';
import '/styles/landing_style.css';
import '/styles/landing-bck.css';
import '/styles/landing_style-bck.css';

const Work = () => {
  return (
    <div>
      {/* Font Awesome CDN for icons */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <div className="howitworks" id="HowItWorks">
        {/* Static background images */}
        <Image src="/images/elipse.svg" alt="" width={100} height={100} className="" />
        <Image src="/images/elipse.svg" alt="" width={100} height={100} className="" />
        <Image src="/images/elipse.svg" alt="" width={100} height={100} className="" />
        <Image src="/images/elipse.svg" alt="" width={100} height={100} className="" />
        <Image src="/images/elipse.svg" alt="" width={100} height={100} className="" />

        {/* Heading */}
        <div className="hiw-heading-text">
          How <span className="highlight">VideoCrafter<span style={{ fontSize: '16px' }}>.io</span></span>
          <span style={{ color: '#000000' }} className="workk"> Works:</span>
        </div>

        {/* Steps Container */}
        <div className="hiw-container">
          {/* Step 1 */}
          <div className="hiw-element">
            <div className="hiw-element-text-container">
              <div className="hiw-element-heading">1. Pick Video Dimensions:</div>
              <div className="hiw-element-text">
                <i className="fa-solid fa-check" style={{ marginRight: '10px' }}></i>
                Select the format that fits your platform:
              </div>
              <div className="dimensions-container">
                <div className="aspect-box">1:1</div>
                <div className="aspect-box">4:5</div>
                <div className="aspect-box">16:9</div>
                <div className="aspect-box tall">9:16</div>
              </div>
            </div>
            <div className="hiw-element-placeholder">
              <video
                src='videos/dummy.mp4'
                style={{ width: '100%' }}
                poster='images/poster.jpg'
                controls
              />
            </div>
            <div className="sep-border"></div>
          </div>

          {/* Step 2 */}
          <div className="hiw-element">
            <div className="hiw-element-text-container">
              <div className="hiw-element-heading">2. Add AI Voiceover:</div>
              <div className="hiw-element-text">
                <i className="fa-solid fa-check" style={{ marginRight: '10px' }}></i>
                Paste your API key and voice ID, and let AI create realistic, human-like voiceovers—no robotic tones here.
              </div>
            </div>
            <div className="hiw-element-placeholder">
              <video
                src='videos/dummy.mp4'
                style={{ width: '100%' }}
                poster='images/poster.jpg'
                controls
              />
            </div>
            <div className="sep-border"></div>
          </div>

          {/* Step 3 */}
          <div className="hiw-element">
            <div className="hiw-element-text-container">
              <div className="hiw-element-heading">3. Upload Your Script:</div>
              <div className="hiw-element-text">
                <i className="fa-solid fa-check" style={{ marginRight: '10px' }}></i>
                Simply upload your script, then highlight the words you want to pair with video clips.
              </div>
            </div>
            <div className="hiw-element-placeholder">
              <video
                src='videos/dummy.mp4'
                style={{ width: '100%' }}
                poster='images/poster.jpg'
                controls
              />
            </div>
            <div className="sep-border"></div>
          </div>

          {/* Step 4 */}
          <div className="hiw-element">
            <div className="hiw-element-text-container">
              <div className="hiw-element-heading">4. Build Your Asset Library:</div>
              <div className="hiw-element-text">
                <i className="fa-solid fa-check" style={{ marginRight: '10px' }}></i>
                Organize your clips into folders for easy reuse across multiple projects.
              </div>
            </div>
            <div className="hiw-element-placeholder">
              <video
                src='videos/dummy.mp4'
                style={{ width: '100%' }}
                poster='images/poster.jpg'
                controls
              />
            </div>
            <div className="sep-border"></div>
          </div>

          {/* Step 5 */}
          <div className="hiw-element">
            <div className="hiw-element-text-container">
              <div className="hiw-element-heading">5. Match Clips To Script:</div>
              <div className="hiw-element-text">
                <i className="fa-solid fa-check" style={{ marginRight: '10px' }}></i>
                Highlight text, select a clip, and let VideoCrafter handle cropping, syncing, and alignment.
              </div>
            </div>
            <div className="hiw-element-placeholder">
              <video
                src='videos/dummy.mp4'
                style={{ width: '100%' }}
                poster='images/poster.jpg'
                controls
              />
            </div>
            <div className="sep-border"></div>
          </div>

          {/* Step 6 */}
          <div className="hiw-element">
            <div className="hiw-element-text-container">
              <div className="hiw-element-heading">6. Add Background Music:</div>
              <div className="hiw-element-text">
                <i className="fa-solid fa-check" style={{ marginRight: '10px' }}></i>
                Upload your favorite MP3 tracks, set start/end points, and adjust volume for the perfect vibe.
              </div>
            </div>
            <div className="hiw-element-placeholder">
              <video
                src='videos/dummy.mp4'
                style={{ width: '100%' }}
                poster='images/poster.jpg'
                controls
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;