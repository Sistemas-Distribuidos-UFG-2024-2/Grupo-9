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

  // Função para determinar o estado baseado nas métricas
  const determineState = (metric) => {
    const cpuUsage = Math.max(metric.uso_de_cpu_porcentagem_core0, metric.uso_de_cpu_porcentagem_core1);
    const memoryUsage = metric.uso_de_memoria_porcentagem_total;
    const storageUsage = metric.uso_de_armazenamento_porcentagem_discoC;
    
    if (cpuUsage > 90 || memoryUsage > 90 || storageUsage > 90) return '#Crítico';
    if (cpuUsage > 70 || memoryUsage > 70 || storageUsage > 70) return '#Alerta';
    return '#Normal';
  };

  // Filtragem única combinando busca por IP e estado
  const filteredData = Object.entries(metricsData)
    .filter(([ip, metrics]) => {
      if (!ip || ip === "" || !metrics || metrics.length === 0) return false;

      const state = determineState(metrics[metrics.length - 1]);
      const searchLower = searchQuery.toLowerCase();

      // Busca por IP ou estado
      const matchesIP = ip.toLowerCase().includes(searchLower);
      const matchesState = searchLower 
        ? state.toLowerCase().includes(searchLower) || 
          state.toLowerCase().replace('#', '').includes(searchLower)
        : true;

      // Verificação dos filtros selecionados
      const matchesFilters = selectedFilters.length === 0 || 
                           selectedFilters.includes(ip) || 
                           selectedFilters.includes(state);

      return (matchesIP || matchesState) && matchesFilters;
    });
 
  return (
    <section id="home" className="home">
      <SearchBar onSearch={setSearchQuery} />
      <FilterOptions
        onFilterChange={setSelectedFilters}
        availableFilters={Object.keys(metricsData).filter(ip => ip && ip !== "")}
      />
      <div className="home-container">
      {filteredData.map(([ip, metrics]) => (
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