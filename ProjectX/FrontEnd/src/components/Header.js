import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        My<span>App</span>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
