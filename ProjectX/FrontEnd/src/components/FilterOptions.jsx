import React from 'react';
import '../assets/filteroptions.css';

const FilterOptions = ({ onFilterChange, availableFilters }) => {
  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    onFilterChange(prevFilters =>
      checked
        ? [...prevFilters, value]
        : prevFilters.filter(filter => filter !== value)
    );
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
          <label key={state.value}>
            <input 
              type="checkbox" 
              value={state.value} 
              onChange={handleFilterChange}
            />
            {state.label}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>IPs Monitorados</h4>
        {availableFilters.map(ip => (
          <label key={ip}>
            <input
              type="checkbox"
              value={ip}
              onChange={handleFilterChange}
            />
                        <span className="ip">{ip}</span>  {/* Added class "ip" */}

            {ip}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterOptions;