 /* eslint-disable */ 
import React from 'react';
import HeroSection from './heroSection';
import Navbar from "./";
import HeroBanner from "./HeroBanner";
import Features  from "./features";
import Services from "./Services";
import Pricing from "./Pricing";
import Footer from "./footer";
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









 