import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        Gerenciador De Desempenho <span>Distribuído</span>
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
