import { useState } from 'react';
import { cancelBooking } from '../api/bookingLookupApi';
import { TBooking } from '@/shared/types/booking.type';

export const useCancelBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (code: string, lastName: string): Promise<TBooking> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await cancelBooking(code, lastName);
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, mutate };
};
