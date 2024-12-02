import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import HomeBox from './HomeBox';
import useMetrics from './useMetrics'; // Importe o hook

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const metrics = useMetrics('http://localhost:3000/metrics/metrics', 10000); // Atualiza a cada 10 segundos

  if (!metrics) return <div>Loading...</div>; // Mostra um loader enquanto as métricas estão sendo carregadas

  const data = metrics.items; // Supondo que o endpoint retorna um array `items`

  // Filtra os dados com base na pesquisa e nos filtros
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
          <HomeBox key={index} item={item} /> // Renderiza um componente HomeBox para cada item filtrado
        ))}
      </div>
    </section>
  );
};

export default Home;
