import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div id="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        <a href="#home" className="active">Home</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
    </>
  );
};

export default Navbar;
