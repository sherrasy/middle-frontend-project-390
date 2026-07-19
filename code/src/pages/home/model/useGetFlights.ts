import {
  searchFlights,
  type SearchFlightsParams,
} from '@/shared/api/flightsApi';
import { getTodayDate } from '@/shared/lib/formatDate';
import type { TFlight } from '@/shared/types/flight.type';
import { useEffect, useState } from 'react';

interface UseFlightsResult {
  flights: TFlight[];
  isLoading: boolean;
  error: string | null;
  refetch: (params: SearchFlightsParams) => void;
}

const DEFAULT_SEARCH: SearchFlightsParams = {
  origin: 'MOW',
  destination: 'LED',
  date: getTodayDate(),
  passengers: 1,
};

export const useGetFlights = (
  initialParams: SearchFlightsParams = DEFAULT_SEARCH,
): UseFlightsResult => {
  const [flights, setFlights] = useState<TFlight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async (params: SearchFlightsParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchFlights(params);
      setFlights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch(initialParams);
  }, []);

  return { flights, isLoading, error, refetch };
};
