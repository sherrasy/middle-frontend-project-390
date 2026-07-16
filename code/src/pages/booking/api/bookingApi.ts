import { fetchApi } from '@/shared/config/fetchApi';
import { TBooking, TCreateBookingRequest } from '../model/types';

export const createBooking = (payload: TCreateBookingRequest) =>
  fetchApi<TBooking>('/api/bookings', {
    method: 'POST',
    body: payload,
  });
