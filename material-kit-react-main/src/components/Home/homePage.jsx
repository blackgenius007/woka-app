 /* eslint-disable */ 
import React from 'react';
import HeroSection from './heroSection';
import Navbar from "./Navbar/Navbar";
import HeroBanner from "./HeroBanner";
import Features  from "./features";
import Services from "./Services";
import Pricing from "./Pricing";
import Footer from "./Footer/footer";
// import Download from "./components/Download";
 

function home() {
  return (
    <div>
      {/* <HeroSection /> */}
      <Navbar />
      <HeroBanner />
        <Features />
        <Services />
        <Screenshots />
        <Pricing />
        {/* <Download /> */}
        <Footer />
    </div>
  );
}

export default home;









 