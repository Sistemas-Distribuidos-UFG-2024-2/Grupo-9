import React from 'react';
import '../assets/filteroptions.css';

const FilterOptions = ({ onFilterChange, availableFilters }) => {
  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    onFilterChange(prevFilters => {
      if (checked) {
        return [...prevFilters, value];
      } else {
        return prevFilters.filter(filter => filter !== value);
      }
    });
  };

  const getStateColorClass = (state) => {
    switch (state) {
      case '#Normal': return 'green';
      case '#Alerta': return 'yellow';
      case '#Crítico': return 'red';
      default: return '';
    }
  };

  const states = [
    { value: '#Normal', label: 'Normal' },
    { value: '#Alerta', label: 'Alerta' },
    { value: '#Crítico', label: 'Crítico' }
  ];

  return (
    <div className="filter-options">
      <div className="filter-section">
        <h4>Estados</h4>
        {states.map(state => (
          <label key={state.value} className="filter-label">
            <input 
              type="checkbox" 
              value={state.value}
              onChange={handleFilterChange}
            />
            <span className={`state-label ${getStateColorClass(state.value)}`}>
              {state.label}
            </span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>IPs Monitorados</h4>
        {availableFilters.map(ip => (
          <label key={ip} className="filter-label">
            <input
              type="checkbox"
              value={ip}
              onChange={handleFilterChange}
            />
            <span className="ip">{ip}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterOptions;