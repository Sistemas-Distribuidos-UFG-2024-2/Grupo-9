import React from 'react';

const HomeBox = ({ item }) => {
  // Função para determinar a classe de cor baseado no estado
  const getStateColorClass = (state) => {
    switch (state) {
      case '#Normal':
        return 'green';  // Verde para Normal
      case '#Alerta':
        return 'yellow'; // Amarelo para Alerta
      case '#Crítico':
        return 'red';    // Vermelho para Crítico
      default:
        return '';       // Caso não tenha cor específica
    }
  };

  return (
    <div className="home-box">
      <div className="home-info">
        <h4>{item.name}</h4>
        <h3 className={getStateColorClass(item.state)}>{item.state}</h3> {/* Aplica a classe diretamente no h3 */}
      </div>
    </div>
  );
};

export default HomeBox;
