import React from 'react';
import '../styles/PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className='policy-background'>
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy for East Coast Dragons LLC</h1>
      <p className="privacy-date"><strong>Effective Date:</strong> June 1, 2026</p>
      <p className="privacy-intro">
       East Coast Dragons LLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our player registration and payment services.
      </p>
      <p className="privacy-intro">
        Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or submit any information.
      </p>

      <hr className="privacy-divider" />

      <section className="privacy-section">
        <h2>1. Information We Collect</h2>
        <p>We collect information about you in a variety of ways when you use our website, primarily to facilitate player registration and manage team operations.</p>
        
        {/* Bulleted List */}
        <ul className="privacy-list">
          <li>
            <strong>Personal Registration Data:</strong> When you register a player, we collect personally identifiable information that you voluntarily give to us. This may include:
            <div className='privacy-sublist'>
                <li>
                    Player’s full name, date of birth, and gender.
                </li>
                <li>
                    Parent or guardian’s full name (if applicable).
                </li>
                <li>
                    Contact information (email address, phone number, and physical mailing address).
                </li>
                <li>
                    Emergency contact names and phone numbers.
                </li>
                <li>
                    Jersey sizes, skill levels, or team preferences.
                </li>
            </div>
          </li>
          <li>
            <strong>Payment and Financial Data:</strong> We collect data necessary to process your payments for registrations, fees, or merchandise. This may include credit card numbers, security codes, and billing addresses.
            <div className='privacy-sublist'>
                <li>
                    <strong> Note: </strong> All payment data is securely processed and handled directly by our third-party payment processors (e.g., Stripe, PayPal). We do not store raw credit card numbers on our servers or in our local spreadsheets.
                </li>
            </div>
          </li>
          <li>
            <strong>Automatically Collected Data:</strong> Our website hosting platform or analytics tools may automatically collect information when you visit, such as your IP address, browser type, operating system, and access times.
          </li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>2. How We Use Your Information</h2>
        We use the information we collect to provide a smooth, efficient, and secure experience. Specifically, we use your data to:
        <ul className="privacy-list">
          <li>To process player registrations and manage team rosters.</li>
          <li>To securely process payments, entry fees, or merchandise orders.</li>
          <li>Send you administrative information, such as schedule changes, tournament details, and updates regarding East Coast Dragons LLC.</li>
          <li>
            Respond to your customer service requests, inquiries, or support needs.
          </li>
          <li>
            Ensure compliance with league regulations, safety policies, and insurance requirements.
          </li>
        </ul>
      </section>

      <section className='privacy-section'>
        <h2>3. How Your Data is Shared and Stored</h2>
        We do not sell, rent, or trade your personal information to third parties for marketing or any other commercial purposes. We only share or store your data with trusted service providers necessary to operate our website and services:
        <ul className='privacy-list'>
            <li>
                <strong>Google Workspace (Google Sheets): </strong>GYour player registration details are collected via our website forms and securely transferred to and stored within Google Sheets. Access to this document is strictly restricted to authorized administrators, coaches, and staff of East Coast Dragons LLC who require the information for team management.
            </li>
            <li>
                <strong>Third-Party Payment Processors: </strong>TYour financial data is shared directly with our payment gateway provider to execute transactions. These processors adhere to the strict security standards set by PCI-DSS (Payment Card Industry Data Security Standard).
            </li>
            <li>
                <strong>Legal Obligations: </strong>We may disclose your information if required to do so by law, court order, or in response to a valid legal request from law enforcement.
            </li>
        </ul>
      </section>

      <section className='privacy-section'>
        <h2>4. Data Security</h2>
        We use administrative, technical, and physical security measures to help protect your personal information.
        <ul className='privacy-list'>
            <li>
                <strong>Website Security: </strong>Our website utilizes HTTPS/SSL encryption to secure the transmission of your data from your browser to our forms.
            </li>
            <li>
                <strong>Storage Security: </strong>The Google Sheets housing player data are protected under Google’s industry-standard cloud security infrastructure. Access requires multi-factor authenticated Google accounts managed exclusively by East Coast Dragons LLC leadership.
            </li>
            <li>
                However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
            </li>
        </ul>
      </section>

      <section className='privacy-section'>
        <h2>5. Data Retention</h2>
        We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy, including fulfilling seasonal team requirements, managing historical alumni records, or complying with any legal, accounting, or insurance obligations.
      </section>

      <section className='privacy-section'>
        <h2>6. Your Rights and Choices</h2>
        Depending on your location, you may have certain rights regarding your personal data, including:
        <ul className='privacy-list'>
            <li>
                <strong>Access and Correction: </strong>The right to request a copy of the registration information we hold about you or ask us to correct inaccuracies.
            </li>
            <li>
                <strong>Deletion: </strong>The right to request that we delete your personal information from our active Google Sheets and databases, subject to certain exceptions (such as active participation in the current season or pending financial balances).
            </li>
            <li>
                <strong>Opt-Out: </strong>The right to opt out of non-essential communications (e.g., newsletters).
            </li>
        </ul>
        To exercise any of these rights, please contact us using the information provided below.
      </section>

      <section className='privacy-section'>
        <h2>7. Changes to This Privacy Policy</h2>
        We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by updating the "Effective Date" at the top of this page. You are encouraged to review this Privacy Policy periodically to stay informed of updates.
      </section>

      <section className='privacy-section'>
        <h2>8. Contact Us</h2>
        If you have questions, comments, or requests regarding this Privacy Policy or how your player registration data is handled, please contact us at:
        <ul className='privacy-list'>
            <li>
                <strong>East Coast Dragons LLC: </strong> eastcoastdragons1@gmail.com
            </li>
        </ul>
      </section>

    </div>
    </div>
  );
};

export default PrivacyPolicy;