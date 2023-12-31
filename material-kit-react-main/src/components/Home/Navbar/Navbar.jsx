 /* eslint-disable */
import React, { useState } from "react";
import { useScrollYPosition } from "react-use-scroll-position";
import "./Navbar.css";



function Navbar({ links }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useScrollYPosition();

  const stickeyTrigger = window.innerHeight / 2.75;

  const  MenuOpen =()=>{
    setMenuOpen(!menuOpen)
  }

  return (
    <div className={`nav${scrollY > stickeyTrigger ? " nav-sticky" : ""}${
        menuOpen ? " nav-open" : ""
      }`}
    >
      <div className="nav-content">
        <div className="nav-logo"> </div>
  
        <nav className="nav-links__container">
          {links &&
            links.map((link, i) => (
              <a className="nav-link" href={link.href} key={i}>
                <div className="nav-link__text">{link.title}</div>
                <div className="nav-link__background" />
              </a>
            ))}
        </nav>
  
        <div className="nav-menu__icon" onClick={menuOpen}>
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}

Navbar.defaultProps = {
  links: [
    { title: "Home", href: "#home" },
    { title: "Features", href: "#features" },
    { title: "Services", href: "#services" },
    { title: "Pricing", href: "#pricing" },
    { title: "Contact", href: "#contact" }
  ]
};

export default Navbar;
