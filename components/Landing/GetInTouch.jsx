import React from 'react'

const GetInTouch = () => {
  return (
    <div>
      <div className="contact-section-wrapper" id="contact">
        <div className="contact-section">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you. Please fill out this form.</p>
          <form className="contact-form" id="contactForm" autoComplete="on">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first-name">First name</label>
                <input
                  type="text"
                  id="first-name"
                  name="first_name"
                  placeholder="First name"
                  autoComplete="given-name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last name</label>
                <input
                  type="text"
                  id="last-name"
                  name="last_name"
                  placeholder="Last name"
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="" required></textarea>
            </div>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GetInTouch
