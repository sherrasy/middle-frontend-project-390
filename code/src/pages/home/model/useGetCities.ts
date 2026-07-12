import { useEffect, useState } from 'react';
import { getCities } from '../api/citiesApi';
import { TCity } from '@/shared/types/types';

export const useCities = () => {
  const [cities, setCities] = useState<TCity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCities()
      .then((data) => setCities(data))
      .catch(() => setIsLoading(false))
      .finally(() => setIsLoading(false));
  }, []);

  return { cities, isLoading };
};
