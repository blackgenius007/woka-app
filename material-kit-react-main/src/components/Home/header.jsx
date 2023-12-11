 // NavBar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: 'Our Services', link: '#service' },
    { text: 'Why Us', link: '#why-us' },
    { text: 'Testimony', link: '#testimony' },
    { text: 'FAQ', link: '#faq' },
  ];

  return (
    <>
      <AppBar position="fixed" style={{ backgroundColor: '#fff', color: '#000' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ display: { sm: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            <List>
              {menuItems.map((item, index) => (
                <ListItem key={index}>
                  <Button href={item.link} color="inherit">
                    {item.text}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <div style={{ flexGrow: 1 }}></div>
          <div className="button.btn-hero">
            <button className="btn-green btn-hero-prominent">
              <div className="btn">Register</div>
            </button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
