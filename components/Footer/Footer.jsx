import React from 'react'

const footer = () => {
  return (
    <div>
      <div className="footer-wrapper" style={{height:'auto'}}>
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <a href="/"className="logo" id="footer-logo">
            <img src="/images/footer-logo.svg" alt="" />
          </a>

          <p className="tagline">
            Revolutionary software that lets you create professional-grade Videos in just minutes, with no video editing skills required.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h3>COMPANY</h3>
            <ul>
              <li>
                <a href="#HowItWorks">Features</a>
              </li>
              <li>
                <a href="#Portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>HELP</h3>
            <ul>
              <li>
                <a href="/terms-and-conditions/">Terms & Conditions</a>
              </li>
              <li>
                <a href="/privacy-policy/">Privacy Policy</a>
              </li>
              <li>
                <a href="/refund-policy/">Refund Policy</a>
              </li>
              <li>
                <a href="/affiliate-terms/">Affiliate Program Terms</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="copyright">
        © Copyright 2025, All Rights Reserved by VideoCrafter.io
      </div>
    </footer>
  </div>
    </div>
  )
}

export default footer
