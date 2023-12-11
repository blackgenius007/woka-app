/* eslint-disable */
import React from 'react';
import HeroSection from './heroSection';
import Navbar from './header';
import HeroBanner from './HeroBanner';
import Features from './feature';
import Hero from './hero';
import Pricing from './Pricing';
import Footer from './Footer/footer';
import Header from './header';
// import Download from "./components/Download";

function home() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}

export default home;
