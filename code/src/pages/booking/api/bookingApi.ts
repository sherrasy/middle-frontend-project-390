import { fetchApi } from '@/shared/config/fetchApi';
import { TBooking, TCreateBookingRequest } from '@/shared/types/booking.type';

export const createBooking = (payload: TCreateBookingRequest) =>
  fetchApi<TBooking>('/api/bookings', {
    method: 'POST',
    body: payload,
  });
