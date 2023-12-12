/* eslint-disable */
import React from 'react';

function Hero() {
  return (
    <main
      style={{
        fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana",
        fontSize: '16px',
        backgroundColor: 'white', // Add this line to set a white background
      }}
    >
      <section
        className="landing"
        style={{
          display: 'flex',
          flexDirection: 'column', // Updated to column for better mobile layout
          alignItems: 'center',
          padding: '40px 20px', // Adjusted padding for smaller screens
          overflowX: 'hidden',
        }}
      >
        <div className="landing-text" style={{ minWidth: '100%', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3em', lineHeight: '1.15' }}>
            Seamless efficiency, all-in-one solution.
          </h1>
          <p style={{ fontSize: '18px', maxWidth: '100%', margin: '20px 0' }}>
            Streamline employee management, innovate inventory, breeze through procurement. Elevate
            your operations effortlessly.
          </p>
          <a
            href="#url-shorten-form"
            className="btn btn-lg"
            style={{
              display: 'inline-block',
              color: 'white',
              backgroundColor: '#2acfcf',
              textTransform: 'capitalize',
              fontWeight: '700',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              borderRadius: '100px',
              transition: '0.3s',
              padding: '12px 36px',
            }}
          >
            Get Started
          </a>
        </div>
        <div className="landing-image" style={{ margin: '20px 0', textAlign: 'center' }}>
          <img
            src="https://res.cloudinary.com/youseful-apps/image/upload/v1702332939/front_unv6ak.png"
            alt="Working Illustration"
            style={{ width: '100%', maxWidth: '300px' }} // Adjusted image width for smaller screens
          />
        </div>
      </section>
    </main>
  );
}

export default Hero;