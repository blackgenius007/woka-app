 /* eslint-disable */ 
import React from 'react';

const LandingPage = () => {
  return (
    <main style={{ fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana", fontSize: "16px" }}>
      {/* Header */}
      <header style={{ padding: "45px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "40px" }} className="container">
          <div className="logo">
            <a href="#">
              <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/logo.svg" alt="" style={{ height: "30px" }} />
            </a>
          </div>
          <nav style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} className="main-navgation">
  <div className="nav-links">
    <a href="#features" style={{ margin: '0 20px', color: '#35323e', textDecoration: 'none' }}>Features</a>
    <a href="#pricing" style={{ margin: '0 20px', color: '#35323e', textDecoration: 'none' }}>Pricing</a>
    <a href="#resources" style={{ margin: '0 20px', color: '#35323e', textDecoration: 'none' }}>Resources</a>
  </div>
  <div className="nav-buttons">
    <a href="#" className="log-in" style={{ color: '#35323e', margin: '0 20px', textDecoration: 'none' }}>Login</a>
    <a href="#" className="sign-up btn btn-sm" style={{ color: '#35323e', textDecoration: 'none' }}>Sign Up</a>
  </div>
</nav>

          <div className="burger-menu">
            <i className="fa-regular fa-bars icon"></i>
          </div>
        </div>
      </header>
      {/* Landing */}
      <section className="landing" style={{ display: "flex", alignItems: "center", padding: "40px 0", marginLeft: "11%", overflowX: "hidden" }}>
        <div className="landing-text" style={{ flex: 1, minWidth: "465px" }}>
          <h1 style={{ width: "100%", fontSize: "3.9em", lineHeight: "1.15" }}>More than just shorter links</h1>
          <p style={{ fontSize: "18px", maxWidth: "500px", margin: "0 0 29.41176px" }}>
            Build your brand’s recognition and get detailed insights on how your links are performing.
          </p>
          <a href="#url-shorten-form" className="btn btn-lg" style={{ display: "inline-block", color: "white", backgroundColor: "#2acfcf", textTransform: "capitalize", fontWeight: "700", border: "none", outline: "none", cursor: "pointer", borderRadius: "100px", transition: "0.3s", padding: "12px 36px" }}>Get Started</a>
        </div>
        <div className="landing-image" style={{ position: "relative", right: "-70px" }}>
          <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/illustration-working.svg" alt="Working Illustration" style={{ width: "100%" }} />
        </div>
      </section>
      {/* Features */}
      <section className="features" id="features" style={{ marginTop: "100px", backgroundColor: "#eff0f5" }}>
        <div className="container">
          {/* Short URL Feature */}
          <div className="url-shorten-feature" style={{ width: "100%", display: "flex", gap: "20px", flexWrap: "wrap", background: "#3b3054 url(../images/bg-shorten-desktop.svg) no-repeat right top", backgroundSize: "cover", padding: "45px", borderRadius: "6px", marginBottom: "20px", transform: "translateY(-50%)", transition: "gap 0.3s" }}>
            <div style={{ position: "relative", flex: "1" }}>
              <input type="text" className="url-input" placeholder="Shorten a link here..." autoComplete="off" style={{ width: "100%", fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana", fontSize: "18px", padding: "8px 20px", background: "white", border: "2px solid transparent", borderRadius: "6px", outline: "none", transition: "0.2s" }} />
              <span className="alert" style={{ position: "absolute", left: "0", top: "calc(100% + 4px)", fontStyle: "italic", fontSize: "16px", color: "#f46262", opacity: "0", transition: "0.2s opacity" }}></span>
            </div>
            <button type="submit" className="btn btn-lg btn-plus-icon" style={{ textAlign: "center", borderRadius: "inherit", whiteSpace: "nowrap", fontSize: "16px", cursor: "pointer" }}>Shorten It!</button>
          </div>
          <div className="url-shorten-results"></div>
        </div>
        {/* Advanced Features */}
        <div className="more-features" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px", padding: "80px 0 90px 0" }}>
          <div className="section-header" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "35px", color: "#35323e" }}>Advanced Statistics</h2>
            <p style={{ width: "50%", margin: "7px auto 0", fontSize: "16px" }}>
              Track how your links are performing across the web with our advanced statistics dashboard.
            </p>
          </div>
          <div className="more-features-content">
            <div className="feature" style={{ position: "relative", background: "white", borderRadius: "6px" }}>
              <div className="feature-illustration" style={{ position: "absolute", top: "-32.5px", left: "25px", display: "grid", placeItems: "center", width: "65px", height: "65px", background: "#3b3054", borderRadius: "50%" }}>
                <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-brand-recognition.svg" alt="Feature Illustration Icon" style={{ maxWidth: "50%" }} />
              </div>
              <div className="feature-details" style={{ padding: "0 25px 30px", marginTop: "60px" }}>
                <h3 style={{ fontSize: "20px" }}>Brand Recognition</h3>
                <p style={{ margin: "10px 0 29.41176px", fontSize: "14px" }}>
                  Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.
                </p>
              </div>
            </div>
            <div className="feature" style={{ position: "relative", background: "white", borderRadius: "6px" }}>
              <div className="feature-illustration" style={{ position: "absolute", top: "-32.5px", left: "25px", display: "grid", placeItems: "center", width: "65px", height: "65px", background: "#3b3054", borderRadius: "50%" }}>
                <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-detailed-records.svg" alt="Feature Illustration Icon" style={{ maxWidth: "50%" }} />
              </div>
              <div className="feature-details" style={{ padding: "0 25px 30px", marginTop: "60px" }}>
                <h3 style={{ fontSize: "20px" }}>Detailed Records</h3>
                <p style={{ margin: "10px 0 29.41176px", fontSize: "14px" }}>
                  Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.
                </p>
              </div>
            </div>
            <div className="feature" style={{ position: "relative", background: "white", borderRadius: "6px" }}>
              <div className="feature-illustration" style={{ position: "absolute", top: "-32.5px", left: "25px", display: "grid", placeItems: "center", width: "65px", height: "65px", background: "#3b3054", borderRadius: "50%" }}>
                <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-fully-customizable.svg" alt="Feature Illustration Icon" style={{ maxWidth: "50%" }} />
              </div>
              <div className="feature-details" style={{ padding: "0 25px 30px", marginTop: "60px" }}>
                <h3 style={{ fontSize: "20px" }}>Fully Customizable</h3>
                <p style={{ margin: "10px 0 29.41176px", fontSize: "14px" }}>
                  Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pricing */}
      <section className="pricing" id="pricing" style={{ padding: "50px 0", background: "#3b3054 url(../images/bg-boost-desktop.svg) no-repeat right", backgroundSize: "cover" }}>
        <div className="container" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <h2 style={{ color: "white", marginBottom: "20px" }}>Boost your links today</h2>
          <a href="#" className="btn btn-lg" style={{ display: "inline-block", color: "white", backgroundColor: "#2acfcf", textTransform: "capitalize", fontWeight: "700", border: "none", outline: "none", cursor: "pointer", borderRadius: "100px", transition: "0.3s", padding: "12px 36px" }}>Get Started</a>
        </div>
      </section>
      {/* Footer */}
      <footer style={{ background: "#232127", color: "white", padding: "60px 0" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "40px" }}>
          <div className="footer-logo" style={{ flex: "1", minWidth: "220px" }}>
            <a href="#">
              <img src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/logo-white.svg" alt="" style={{ height: "30px" }} />
            </a>
          </div>
          <div className="footer-links" style={{ flex: "1 1 220px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <div className="footer-link-group" style={{ flex: "1 1 220px", minWidth: "220px" }}>
              <h4 style={{ fontSize: "16px", marginBottom: "20px" }}>Features</h4>
              <a href="#" style={{ display: "block", color: "#9e9aa7", fontSize: "14px", marginBottom: "10px", textDecoration: "none" }}>Link Shortening</a>
              <a href="#" style={{ display: "block", color: "#9e9aa7", fontSize: "14px", marginBottom: "10px", textDecoration: "none" }}>Branded Links</a>
              <a href="#" style={{ display: "block", color: "#9e9aa7", fontSize: "14px", textDecoration: "none" }}>Analytics</a>
            </div>
            <div className="footer-link-group" style={{ flex: "1 1 220px", minWidth: "220px" }}>
              <h4 style={{ fontSize: "16px", marginBottom: "20px" }}>Resources</h4>
              <a href="#" style={{ display: "block", color: "#9e9aa7", fontSize: "14px", marginBottom: "10px", textDecoration: "none" }}>Blog</a>
              <a href="#" style={{ display: "block", color: "#9e9aa7", fontSize: "14px", marginBottom: "10px", textDecoration: "none" }}>Developers</a>
              <a href="#" style={{ display: "block", color: "#9e9aa7", fontSize: "14px", textDecoration: "none" }}>Support</a>
            </div>
            <div className="footer-link-group" style={{ flex: "1 1 220px", minWidth: "220px" }}>
              <h4 style={{ fontSize: "16px", marginBottom: "20px" }}>Company</h4>
              <a href="#" style={{ display: "block", color: "#9e9aa7", fontSize: "14px", marginBottom: "10px", textDecoration: "none" }}>About</a>
              <a href="#" style={{ display: "block", color: "#9e9aa7", fontSize: "14px", marginBottom: "10px", textDecoration: "none" }}>Our Team</a>
              <a href="#" style={{ display: "block", color: "#9e9aa7", fontSize: "14px", textDecoration: "none" }}>Careers</a>
              <a href="#" style={{ display: "block", color: "#9e9aa7", fontSize: "14px", textDecoration: "none" }}>Contact</a>
            </div>
          </div>
          </div>
          </footer>
    </main>
  );
};

export default LandingPage;