import { useEffect, useState } from 'react';
import type { TFlight } from '@/shared/types/flight.type';
import { getFlight } from '@/shared/api/flightsApi';

export const useGetFlight = (id: string) => {
  const [flight, setFlight] = useState<TFlight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    getFlight(id)
      .then((data) => {
        if (!cancelled) setFlight(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setFlight(null);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { flight, isLoading, error };
};
