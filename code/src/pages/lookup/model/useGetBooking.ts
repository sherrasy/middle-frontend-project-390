import { useState } from 'react';
import { getBookingByCode } from '../api/bookingLookupApi';
import { TBooking } from '@/shared/types/booking.type';

export const useGetBooking = () => {
  const [booking, setBooking] = useState<TBooking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (code: string, lastName: string) => {
    setIsLoading(true);
    setError(null);
    setBooking(null);
    try {
      const data = await getBookingByCode(code, lastName);
      setBooking(data);
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
      setBooking(null);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { booking, isLoading, error, search, setBooking };
};
