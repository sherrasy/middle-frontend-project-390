import { TBookingStatus } from '@/shared/types/booking.type';

export const statusConfig: Record<
  TBookingStatus,
  { text: string; bg: string; textColor: string }
> = {
  confirmed: {
    text: 'ПОДТВЕРЖДЕНА',
    bg: 'bg-green-500',
    textColor: 'text-white',
  },
  cancelled: {
    text: 'ОТМЕНЕНА',
    bg: 'bg-red-500',
    textColor: 'text-white',
  },
};
