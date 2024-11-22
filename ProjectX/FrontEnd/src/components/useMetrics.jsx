import { useEffect, useState } from 'react';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const useMetrics = (url, refreshInterval) => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const subscription = interval(refreshInterval)
      .pipe(
        switchMap(() => fetch(url).then(response => response.json()))  // Usando fetch para pegar os dados
      )
      .subscribe(data => setMetrics(data));

    return () => subscription.unsubscribe();  // Limpeza ao desmontar
  }, [url, refreshInterval]);

  return metrics;
};

export default useMetrics;
