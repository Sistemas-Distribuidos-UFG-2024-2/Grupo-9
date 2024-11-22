import React from 'react';
import './assets/styles.css';
import Header from './components/Header';
import Home from './components/Home';  // Já inclui o componente Home

function App() {
  return (
    <div>
      <Header />
      <Home /> {/* Exibe o componente Home, que usa o hook useMetrics */}
    </div>
  );
}

export default App;
