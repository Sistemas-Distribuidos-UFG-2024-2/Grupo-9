import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import HomeBox from './HomeBox';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Mock Data
  const data = [
    { name: 'Item #Normal', state: '#Normal' },
    { name: 'Item #Alerta', state: '#Alerta' },
    { name: 'Item #Crítico', state: '#Crítico' },
    { name: 'Item #Offline', state: '#Offline' },
  ];

  // Filtra os dados com base na consulta de pesquisa e nos filtros selecionados
  const filteredData = data.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedFilters.length === 0 || selectedFilters.includes(item.state);
    return matchesQuery && matchesState;
  });

  return (
    <section id="home" className="home">
      <SearchBar onSearch={setSearchQuery} />
      <FilterOptions onFilterChange={setSelectedFilters} />
      <div className="home-container">
        {filteredData.map((item, index) => (
          <HomeBox key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Home;
