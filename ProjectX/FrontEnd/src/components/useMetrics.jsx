import { useEffect, useState } from 'react';
import { interval, from } from 'rxjs';
import { switchMap, startWith, catchError } from 'rxjs/operators';

const useMetrics = (url, refreshInterval) => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    // Função para fazer a requisição
    const fetchMetrics = () => 
      from(
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
      );

    // Configura o observable
    const subscription = interval(refreshInterval)
      .pipe(
        startWith(0), // Começa imediatamente sem esperar o primeiro intervalo
        switchMap(() => fetchMetrics()),
        catchError(error => {
          console.error('Error fetching metrics:', error);
          return []; // Retorna array vazio em caso de erro
        })
      )
      .subscribe({
        next: data => {
          console.log('Metrics updated:', data);
          setMetrics(data);
        },
        error: error => {
          console.error('Subscription error:', error);
          setMetrics(null);
        }
      });

    // Cleanup na desmontagem
    return () => {
      console.log('Cleaning up metrics subscription');
      subscription.unsubscribe();
    };
  }, [url, refreshInterval]);

  return metrics;
};

export default useMetrics;