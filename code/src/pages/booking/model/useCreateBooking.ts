import { useState } from 'react';
import { createBooking } from '../api/bookingApi';
import { TBooking, TCreateBookingRequest } from '@/shared/types/booking.type';

export const useCreateBooking = () => {
  const [booking, setBooking] = useState<TBooking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (payload: TCreateBookingRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await createBooking(payload);
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

  return { booking, isLoading, error, mutate };
};
