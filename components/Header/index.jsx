import Link from 'next/link';
import React from 'react'
const Index = () => {
  return (
    <>
      <header className="header">
        <div className="container">
          <Link href="/" className="logo" style={{ padding: '20px' }}>
            <img src="/images/logo-small.svg" alt="" />
          </Link>

          <Link href="/" className="logo-small">
            <img src="/images/logo.svg" alt="" />
          </Link>

          <div className="links">
            <div className="link">
              <a href="#">Home</a>
              <a href="#Portfolio">Portfolio</a>
              <a href="#HowItWorks">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="line"></div>

            <div className="buttons">
              <a href="/accounts/login">Login</a>
              <a href="#pricing" className="getStarted">Get started</a>
            </div>
          </div>

          <img
            src="/images/hamburger.svg"
            alt="menu"
            id="hamburger"
            className="hamburger"
          />

          <div
            className="topbar"
            id="topbar"
            style={{ background: 'white', height: 'fit-content' }}
          >
            <div
              className="hamburger-menu"
              style={{ background: 'white', height: 'fit-content' }}
            >
              <div className="topbar-grey"></div>
              <div className="links-topbar">
                <a href="#">Home</a>
                <a href="#Portfolio">Portfolio</a>
                <a href="#HowItWorks">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#contact">Contact</a>
                <hr className="separator" />
                <a href="/accounts/login">Login</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Index;
