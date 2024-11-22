import React from 'react';

const FilterOptions = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    onFilterChange(prevFilters =>
      checked
        ? [...prevFilters, value]
        : prevFilters.filter(filter => filter !== value)
    );
  };

  return (
    <div className="filter-options">
      <label>
        <input type="checkbox" value="#Normal" onChange={handleFilterChange} /> Normal
      </label>
      <label>
        <input type="checkbox" value="#Alerta" onChange={handleFilterChange} /> Alerta
      </label>
      <label>
        <input type="checkbox" value="#Crítico" onChange={handleFilterChange} /> Crítico
      </label>
      <label>
        <input type="checkbox" value="#Offline" onChange={handleFilterChange} /> Offline
      </label>
    </div>
  );
};

export default FilterOptions;
