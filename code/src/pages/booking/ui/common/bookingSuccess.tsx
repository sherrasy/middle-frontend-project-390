import { UNITS } from '@/shared/constants/consts';
import { UI_MESSAGES } from '@/shared/constants/messages';
import { TEST_IDS } from '@/shared/constants/testids';

interface BookingSuccessProps {
  code: string;
  origin: string;
  destination: string;
  flightNumber: string;
  passengersCount: number;
  totalPrice: number;
}

export const BookingSuccess = ({
  code,
  origin,
  destination,
  flightNumber,
  passengersCount,
  totalPrice,
}: BookingSuccessProps) => {
  return (
    <div
      data-testid={TEST_IDS.booking.success}
      className='space-y-4 p-6 border border-green-200 rounded-xl bg-green-50 w-full'
    >
      <h2 className='text-2xl font-bold text-gray-900'>
        {UI_MESSAGES.booking.success.title}
      </h2>
      <p className='text-gray-700'>
        {UI_MESSAGES.booking.success.description}{' '}
        <span
          data-testid={TEST_IDS.booking.code}
          className='font-mono font-bold text-gray-900 text-lg'
        >
          {code}
        </span>
      </p>
      <p className='text-gray-700'>
        {origin} → {destination}, {flightNumber}
      </p>
      <p className='text-gray-700'>Пассажиров: {passengersCount}</p>
      <p className='text-gray-700'>
        Итого: {totalPrice.toLocaleString('ru-RU')} {UNITS.currency}
      </p>
    </div>
  );
};
