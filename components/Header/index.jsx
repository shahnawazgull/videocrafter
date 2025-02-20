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
              <Link href="/#">Home</Link>
              <Link href="/#Portfolio">Portfolio</Link>
              <Link href="/#HowItWorks">Features</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/#contact">Contact</Link>
            </div>

            <div className="line"></div>

            <div className="buttons">
              <Link href="/accounts/login">Login</Link>
              <Link href="#pricing" className="getStarted">Get started</Link>
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
                <Link href="#">Home</Link>
                <Link href="#Portfolio">Portfolio</Link>
                <Link href="#HowItWorks">Features</Link>
                <Link href="#pricing">Pricing</Link>
                <Link href="#contact">Contact</Link>
                <hr className="separator" />
                <Link href="/accounts/login">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Index;
