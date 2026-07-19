import { fetchApi } from '@/shared/config/fetchApi';
import { TBooking } from '@/shared/types/booking.type';

export const getBookingByCode = (code: string, lastName: string) =>
  fetchApi<TBooking>(
    `/api/bookings/${encodeURIComponent(code)}?lastName=${encodeURIComponent(lastName)}`,
  );

export const cancelBooking = (code: string, lastName: string) =>
  fetchApi<TBooking>(
    `/api/bookings/${encodeURIComponent(code)}?lastName=${encodeURIComponent(lastName)}`,
    {
      method: 'DELETE',
    },
  );