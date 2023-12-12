 /* eslint-disable */
import React from 'react';
import Hidden from '@mui/material/Hidden';
import Hero from './hero';  // Import your Hero component
import Features from './feature';
import Pricing from './Pricing';
import Footer from './Footer/footer';
import Header from './header';

function Home() {
  return (
    <div>
      <Header />
      {/* Display Hero component only on screens larger than or equal to 'sm' (600px) */}
      <Hidden smDown>
        <Hero />
      </Hidden>
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}

export default Home;
