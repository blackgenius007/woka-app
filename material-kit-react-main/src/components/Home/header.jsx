/* eslint-disable */
import React from 'react';

const LandingPage = () => {
  return (
    <main
      style={{
        fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana",
        fontSize: '16px',
      }}
    >
      {/* Header */}
      <header style={{ padding: '45px 0' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '40px',
          }}
          className="container"
        >
          <div className="logo">
            <a href="#">
              <img
                src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/logo.svg"
                alt=""
                style={{ height: '30px' }}
              />
            </a>
          </div>
          <nav
            style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
            className="main-navgation"
          >
            <div className="nav-links">
              <a
                href="#features"
                style={{ margin: '0 20px', color: '#35323e', textDecoration: 'none' }}
              >
                Features
              </a>
              <a
                href="#pricing"
                style={{ margin: '0 20px', color: '#35323e', textDecoration: 'none' }}
              >
                Pricing
              </a>
              <a
                href="#resources"
                style={{ margin: '0 20px', color: '#35323e', textDecoration: 'none' }}
              >
                Resources
              </a>
            </div>
            <div className="nav-buttons">
              <a
                href="#"
                className="log-in"
                style={{ color: '#35323e', margin: '0 20px', textDecoration: 'none' }}
              >
                Login
              </a>
              <a
                href="#"
                className="sign-up btn btn-sm"
                style={{ color: '#35323e', textDecoration: 'none' }}
              >
                Sign Up
              </a>
            </div>
          </nav>

          <div className="burger-menu">
            <i className="fa-regular fa-bars icon"></i>
          </div>
        </div>
      </header>
    </main>
  );
};

export default LandingPage;
