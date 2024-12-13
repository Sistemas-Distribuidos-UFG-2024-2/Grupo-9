import React from 'react';
import './assets/styles.css';
import Header from './components/Header';
import Home from './components/Home';
import Contact from './components/Contact'; // Importando o componente Contact

function App() {
  return (
    <div>
      <Header />
      <Home />
      <Contact /> {/* Adicionando o componente Contact */}
    </div>
  );
}

export default App;
