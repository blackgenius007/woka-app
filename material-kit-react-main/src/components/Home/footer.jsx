/* eslint-disable */
import React from 'react';

function Footer() {
  return (
    <main
      style={{
        fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana",
        fontSize: '16px',
      }}
    >
      <footer style={{ background: '#232127', color: 'white', padding: '60px 0' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '40px',
          }}
        >
          <div className="footer-logo" style={{ flex: '1', minWidth: '220px' }}>
            <a href="#">
              <img
                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/logo-white.svg"
                alt=""
                style={{ height: '30px' }}
              />
            </a>
          </div>
          <div
            className="footer-links"
            style={{ flex: '1 1 220px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}
          >
            <div className="footer-link-group" style={{ flex: '1 1 220px', minWidth: '220px' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '20px' }}>Features</h4>
              <a
                href="#"
                style={{
                  display: 'block',
                  color: '#9e9aa7',
                  fontSize: '14px',
                  marginBottom: '10px',
                  textDecoration: 'none',
                }}
              >
                Link Shortening
              </a>
              <a
                href="#"
                style={{
                  display: 'block',
                  color: '#9e9aa7',
                  fontSize: '14px',
                  marginBottom: '10px',
                  textDecoration: 'none',
                }}
              >
                Branded Links
              </a>
              <a
                href="#"
                style={{
                  display: 'block',
                  color: '#9e9aa7',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                Analytics
              </a>
            </div>
            <div className="footer-link-group" style={{ flex: '1 1 220px', minWidth: '220px' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '20px' }}>Resources</h4>
              <a
                href="#"
                style={{
                  display: 'block',
                  color: '#9e9aa7',
                  fontSize: '14px',
                  marginBottom: '10px',
                  textDecoration: 'none',
                }}
              >
                Blog
              </a>
              <a
                href="#"
                style={{
                  display: 'block',
                  color: '#9e9aa7',
                  fontSize: '14px',
                  marginBottom: '10px',
                  textDecoration: 'none',
                }}
              >
                Developers
              </a>
              <a
                href="#"
                style={{
                  display: 'block',
                  color: '#9e9aa7',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                Support
              </a>
            </div>
            <div className="footer-link-group" style={{ flex: '1 1 220px', minWidth: '220px' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '20px' }}>Company</h4>
              <a
                href="#"
                style={{
                  display: 'block',
                  color: '#9e9aa7',
                  fontSize: '14px',
                  marginBottom: '10px',
                  textDecoration: 'none',
                }}
              >
                About
              </a>
              <a
                href="#"
                style={{
                  display: 'block',
                  color: '#9e9aa7',
                  fontSize: '14px',
                  marginBottom: '10px',
                  textDecoration: 'none',
                }}
              >
                Our Team
              </a>
              <a
                href="#"
                style={{
                  display: 'block',
                  color: '#9e9aa7',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                Careers
              </a>
              <a
                href="#"
                style={{
                  display: 'block',
                  color: '#9e9aa7',
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Footer;
