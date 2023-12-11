 /* eslint-disable */ 
import React, { useState } from 'react';
import styled from 'styled-components';

// Define your styled components
const Container = styled.div`

:root {
    
    /* COLORS */

    /* primary */
    --darkblue05: #091B6F;
    --darkblue04: #0D28A6;
    --darkblue03: #5E70C4;
    --darkblue02: #AEB7E1;
    --darkblue01: #CFD4ED;
    --limegreen05: #3D7B3F;
    --limegreen04: #5CB85F;
    --limegreen03: #92D094;
    --limegreen02: #C9E7CA;
    --limegreen01: #DEF1DF;
    --default: #F1F3FF;


    /* alert */
    --alert-red: #FA2C5A;
    --alert-yellow: #F9CC00;
    --alert-green: #73CA5C;

    /* neutral */
    --neutral05: #151515;
    --neutral04: #3C3C3C;
    --neutral03: #8A8A8A;
    --neutral02: #D0D0D0;
    --neutral01: #FFFFFF;
    --black: #0000;


    /* TYPOGRAHPY */

    /* font family */
    --font-helvetica: "Helvetica";

    /* font size */
    --fs-large: 36px;
    --fs-heading-large: 24px;
    --fs-heading-medium: 20px;
    --fs-title-large: 18px;
    --fs-title-medium: 16px;
    --fs-body-large: 14px;
    --fs-body-medium: 12px;
    --fs-body-small: 10px;


    /* Transition */
    --transition-1: 0.15s ease-in-out;
    --transition-2: 0.15s ease-in;
    --transition-3: 0.25s ease-out;

}

 
html {
    scroll-behavior: smooth;
}

a { text-decoration: none; }

li { list-style: none; }
 
}

 



/* HEADER */
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--default);
    z-index: 4;
    padding-block: 24px;
}

.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-actions { display:none; }

.nav-open-btn {
    padding: 5px;
}

.nav-open-btn ion-icon { --ionicon-stroke-width: 40px; }

.navigasi {
    position: fixed;
    top: 0;
    right: -300px;
    width: 100%;
    max-width: 280px;
    
    height: 100%;
    box-shadow: 0 2px 8px hsla(0, 0%, 0%, 0.5);
    visibility: hidden;
    z-index: 2;
    transition: var(--transition-2);
}

.navigasi.active {
    right: 0;
    background: var(--neutral01);
    visibility: visible;
    transition: var(--transition-3);
}

.navigasi-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
}

.nav-close-btn {
    font-size: 25px;
    padding: 10px;
    transform: translateX(15px);
}

.navigasi-list {
    margin-bottom: 30px;
}

.navigasi-list li a {
    text-decoration: none !important;
    font-size: var(--fs-body-large);
    font-weight: var(--fw-400);
    line-height: 20px;
}

.navigasi-link {
    font-size: 15px;
    padding: 10px 25px;
    font-weight: var(--fw-500);
    transition: 0.15s ease-in-out;
}

.navigasi-register {
    display: flex;
    justify-content: left;
    align-items: left;
    gap: 15px;
    margin-left: 25px;
}
.overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    transition: var(--transition-2);
}

.overlay.active {
    background: hsla(0, 0%, 0%, 0.7);
    pointer-events: all;
    transition: var(--transition-3);
}
.hero {
    background: var(--default)
}
button {
    border: none;
    cursor: pointer;
}

body { overflow-x: hidden; }

body.active { overflow-y: hidden; }
/* HERO */

.hero {
    background: var(--default)
}

.hero-section {
    margin-top: 70px;
    padding-top: 20px;
}

h1.heading-hero {
    min-width: 250px;
    font-weight: 700;
    font-size: var(--fs-large);
    line-height: 54px;
}

p.detail-heading {
    margin-top: 20px;
    font-weight: 300;
    font-size: var(--fs-body-large);
    line-height: 20px;
    width: 280px;
    margin-bottom: 20px;
}

button.btn-hero {
    width: 155px;
    font-size: 14px;
    margin-bottom: 30px;
}

.imagehero-section {
    display: flex;
    justify-content: right;
    text-align: right;
    align-items: right;
}

.imagehero-section img {
    width: 280px;
    right: 0;
}
 

 
 
`;
 
const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <header className="header" style={{backgroundColor: '#fff'}} >
        {/* overlay */}
        <div className="overlay" data-overlay></div>
        <div className="container">
          <a href="#" className="logo">
            <img src="https://i.ibb.co/MkygZR1/bcr-logo.png" alt="bcr-logo" border="0" />
          </a>
          <a className="nav-open-btn" data-nav-open-btn>
            <img
              src="https://i.ibb.co/0VBC9mX/fi-menu.png"
              alt="fi-menu"
              border="0"
              width="24"
              height="24"
            />
          </a>
          <nav className="navigasi" data-nav>
            <div className="navigasi-top">
              <h4 className="text-logo">BCR</h4>
              <a className="nav-close-btn" data-nav-close-btn>
                <img
                  src="https://i.ibb.co/Wk7Vbhb/fi-x.png"
                  alt="fi-x"
                  border="0"
                  width="24"
                  height="24"
                />
              </a>
            </div>
            <ul className="navigasi-list">
              <li>
                <a href="#service" className="navigasi-link text-dark">
                  Our Services
                </a>
              </li>
              <li>
                <a   className="navigasi-link text-dark">
                  Why Us
                </a>
              </li>
              <li>
                <a href="#testimoni" className="navigasi-link text-dark">
                  Testimony
                </a>
              </li>
              <li>
                <a href="#faq" className="navigasi-link text-dark">
                  FAQ
                </a>
              </li>
            </ul>
 
          </nav>
          <div className="button.btn-hero ">
          <button className="btn-green btn-hero-prominent">
  <div className="btn">Register</div>
</button>

          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;






//  /* eslint-disable */ 
// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';

// const Header = () => {
 
//   return (
//     <header className="header" style={{backgroundColor:'#fff'}} >
//     {/* overlay */}
//     <div className="overlay" data-overlay></div>
//     <div className="container">
//       <a href="#" className="logo">
//         <img src="https://i.ibb.co/MkygZR1/bcr-logo.png" alt="bcr-logo" border="0" />
//       </a>
//       <a className="nav-open-btn" data-nav-open-btn>
//         <img
//           src="https://i.ibb.co/0VBC9mX/fi-menu.png"
//           alt="fi-menu"
//           border="0"
//           width="24"
//           height="24"
//         />
//       </a>
//       <nav className="navigasi" data-nav>
//         <div className="navigasi-top">
//           <h4 className="text-logo">BCR</h4>
//           <a className="nav-close-btn" data-nav-close-btn>
//             <img
//               src="https://i.ibb.co/Wk7Vbhb/fi-x.png"
//               alt="fi-x"
//               border="0"
//               width="24"
//               height="24"
//             />
//           </a>
//         </div>
//         <ul className="navigasi-list">
//           <li>
//             <a href="#service" className="navigasi-link text-dark">
//               Our Services
//             </a>
//           </li>
//           <li>
//             <a   className="navigasi-link text-dark">
//               Why Us
//             </a>
//           </li>
//           <li>
//             <a href="#testimoni" className="navigasi-link text-dark">
//               Testimony
//             </a>
//           </li>
//           <li>
//             <a href="#faq" className="navigasi-link text-dark">
//               FAQ
//             </a>
//           </li>
//         </ul>
//         <ul className="navigasi-register">
//           <li>
//           <Button  >
// <div className="btn">Register</div>
// </Button>
//           </li>
//         </ul>
//       </nav>
//       <div className="header-actions">
//         <button className="btn-green">
//           <div className="btn">Register</div>
//         </button>
//       </div>
//     </div>
//   </header>

//   );
// };

// export default Header;
