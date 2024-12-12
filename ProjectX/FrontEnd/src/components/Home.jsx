import React, { useState } from 'react';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import HomeBox from './HomeBox';
import useMetrics from './useMetrics';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
 
  const metricsData = useMetrics('http://localhost:3000/metrics/grpc/metrics', 10000);

  if (!metricsData) return <div>Loading...</div>;

  // Filtrar endereços IP baseado na pesquisa
  const filteredIPs = Object.entries(metricsData)
    .filter(([ip]) => {
      // Ignora entradas vazias ou inválidas
      if (!ip || ip === "") return false;
     
      const matchesQuery = ip.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(ip);
      return matchesQuery && matchesFilter;
    })
    // Remove entradas que não têm métricas
    .filter(([_, metrics]) => metrics && metrics.length > 0);

  return (
    <section id="home" className="home">
      <SearchBar onSearch={setSearchQuery} />
      <FilterOptions
        onFilterChange={setSelectedFilters}
        availableFilters={Object.keys(metricsData).filter(ip => ip && ip !== "")}
      />
      <div className="home-container">
        {filteredIPs.map(([ip, metrics]) => (
          <HomeBox
            key={ip}
            ip={ip}
            metrics={metrics}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;