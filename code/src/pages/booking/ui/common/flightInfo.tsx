import { TEST_IDS } from '@/shared/constants/testids';
import { UNITS } from '@/shared/constants/consts';
import { TFlight } from '@/shared/types/types';
import { formatDateTime } from '@/shared/lib/formatDate';

interface FlightInfoProps {
  flight: TFlight | null;
}

export const FlightInfo = ({ flight }: FlightInfoProps) => {
  if (!flight) return null;

  const {
    airline,
    flightNumber,
    origin,
    destination,
    departureAt,
    arrivalAt,
    price,
  } = flight;

  return (
    <div
      data-testid={TEST_IDS.booking.flight}
      className='mb-6 p-4 border border-gray-200 rounded-xl bg-white space-y-1'
    >
      <p className='text-lg font-semibold text-gray-900'>
        {airline.name} · {flightNumber}
      </p>
      <p className='text-gray-700'>
        {origin.name} ({origin.code}) → {destination.name} ({destination.code})
      </p>
      <p className='text-gray-600 text-sm'>
        {formatDateTime(departureAt)} — {formatDateTime(arrivalAt)} ·{' '}
        {price.amount.toLocaleString('ru-RU')} {UNITS.currency}
      </p>
    </div>
  );
};
