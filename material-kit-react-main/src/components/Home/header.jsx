 /* eslint-disable */ 
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Menu as MenuIcon, Dashboard, Equalizer, Cloud, Store } from '@mui/icons-material';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer} edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Your App Name
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {[
            { text: 'Dashboard', icon: <Dashboard /> },
            { text: 'Analytics', icon: <Equalizer /> },
            { text: 'Cloud', icon: <Cloud /> },
            { text: 'Store', icon: <Store /> },
          ].map((item, index) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
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
