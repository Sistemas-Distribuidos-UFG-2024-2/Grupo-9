import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleScroll = () => {
    const homeSection = document.getElementById('home');
    const contactSection = document.getElementById('contact');

    // Verificar a posição de rolagem para mudar o estado da aba ativa
    if (window.scrollY >= contactSection.offsetTop - 50) {
      setActiveTab('contact');
    } else if (window.scrollY < homeSection.offsetTop - 50) {
      setActiveTab('home');
    } else {
      // Garantir que a aba ativa seja Home ou Contact com base na rolagem
      if (window.scrollY < contactSection.offsetTop - 50) {
        setActiveTab('home');
      } else {
        setActiveTab('contact');
      }
    }
  };

  useEffect(() => {
    // Adicionar o event listener no scroll
    window.addEventListener('scroll', handleScroll);

    // Remover o event listener ao desmontar o componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div id="menu-icon" onClick={() => handleTabClick('menu')}>
        ☰
      </div>
      <nav className="navbar">
        <a
          href="#home"
          className={activeTab === 'home' ? 'active' : ''}
          onClick={() => handleTabClick('home')}
        >
          Home
        </a>
        <a
          href="#contact"
          className={activeTab === 'contact' ? 'active' : ''}
          onClick={() => handleTabClick('contact')}
        >
          Contact
        </a>
      </nav>
    </>
  );
};

export default Navbar;
