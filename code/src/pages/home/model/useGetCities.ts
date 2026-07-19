import { useEffect, useState } from 'react';
import { getCities } from '../api/citiesApi';
import { TCity } from '@/shared/types/flight.type';

interface UseCitiesResult {
  cities: TCity[];
  isLoading: boolean;
  error: string | null;
}

export const useCities = (): UseCitiesResult => {
  const [cities, setCities] = useState<TCity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getCities()
      .then((data) => {
        if (!cancelled) setCities(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load cities',
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { cities, isLoading, error };
};
