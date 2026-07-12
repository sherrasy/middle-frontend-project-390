import { TEST_IDS } from '@/shared/constants/testids';
import { TFlight } from '@/shared/types/types';
import { formatDateTime } from '@/shared/lib/formatDate';
import { UNITS } from '@/shared/constants/consts';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

interface FlightResultItemProps {
  flight: TFlight;
}

export const FlightResultItem = ({ flight }: FlightResultItemProps) => {
  const {
    airline,
    flightNumber,
    origin,
    destination,
    departureAt,
    arrivalAt,
    durationMinutes,
    price,
  } = flight;

  const navigate = useNavigate();

  return (
    <div
      data-testid={TEST_IDS.flights.item}
      className='bg-white border border-gray-200 rounded-xl p-5'
    >
      <div className='flex items-center justify-between gap-6'>
        <div className='flex-1'>
          <div className='flex items-center gap-2 mb-1'>
            <span className='text-base font-bold text-gray-900'>
              {airline.name}
            </span>
            <span className='text-base text-gray-900'>· {flightNumber}</span>
          </div>

          <div className='text-base text-gray-900 mb-1'>
            {origin.name} → {destination.name}
          </div>

          <div className='text-sm text-gray-400'>
            {formatDateTime(departureAt)} — {formatDateTime(arrivalAt)} ·{' '}
            {durationMinutes} {UNITS.minute}
          </div>
        </div>

        <div className='flex items-center gap-4 shrink-0'>
          <div className='text-2xl font-bold text-gray-900'>
            {price.amount} {UNITS.currency}
          </div>
          <button
            data-testid={TEST_IDS.flights.book}
            onClick={() => navigate(`/${ROUTES.BOOKING}/${flight.id}`)}
            className='bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2.5 px-6 rounded-lg transition-colors hover:cursor-pointer'
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
};
