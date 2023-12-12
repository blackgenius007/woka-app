/* eslint-disable */
import React from 'react';

const LandingPage = () => {
  return (
    <main
      style={{
        fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana",
        fontSize: '16px',
        backgroundColor: 'white', // Add this line to set a white background
      }}
    >
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
          <div className=" .logo">
            <a href="#">
              <img
                src="https://res.cloudinary.com/youseful-apps/image/upload/v1702375182/workfily_yql2vp.png"
                alt=""
                style={{ height: '80px' }}
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
                href="/login"
                className="log-in"
                onClick={() => navigate('/login')}
                style={{ color: '#35323e', margin: '0 20px', textDecoration: 'none' }}
              >
                Login
              </a>
              <a
  href="#"
  className="sign-up btn btn-sm"
  style={{
    color: '#35323e',
    textDecoration: 'none',
    display: 'inline-block',
    backgroundColor: 'lightgray', // Add a background color for visibility
    padding: '8px 16px', // Add padding for better appearance
    borderRadius: '4px', // Optional: Add border-radius for rounded corners
  }}
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
