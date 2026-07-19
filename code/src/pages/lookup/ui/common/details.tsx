import { TEST_IDS } from '@/shared/constants/testids';
import { UNITS } from '@/shared/constants/consts';
import { TBooking } from '@/shared/types/booking.type';
import { statusConfig } from '../../lib/status.config';

interface BookingDetailsProps {
  booking: TBooking;
  onCancel: () => void;
  isCancelling: boolean;
}

export const BookingDetails = ({
  booking,
  onCancel,
  isCancelling,
}: BookingDetailsProps) => {
  const { code, status, flight, passengers, totalPrice } = booking;
  const isActive = status === 'confirmed';
  const statusStyle = statusConfig[status];

  return (
    <div
      data-testid={TEST_IDS.bookingLookup.details}
      className='p-5 border border-gray-200 rounded-xl bg-white space-y-4 w-full t'
    >
      <div className='flex items-center gap-3'>
        <span
          data-testid={TEST_IDS.bookingLookup.code}
          className='font-mono font-bold text-lg '
        >
          {code}
        </span>
        <span
          data-testid={TEST_IDS.bookingLookup.status}
          data-status={status}
          className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.textColor}`}
        >
          {statusStyle.text}
        </span>
      </div>

      <p>
        {flight.airline.name} · {flight.flightNumber}: {flight.origin.name} →{' '}
        {'    '} {flight.destination.name}
      </p>

      <p>
        Пассажиры:{' '}
        {passengers.map((p) => `${p.firstName} ${p.lastName}`).join(', ')}
      </p>

      <p>
        Итого: {totalPrice.amount.toLocaleString('ru-RU')} {UNITS.currency}
      </p>

      {isActive && (
        <button
          type='button'
          data-testid={TEST_IDS.bookingLookup.cancel}
          onClick={onCancel}
          disabled={isCancelling}
          className='w-full px-6 py-2.5 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 hover:cursor-pointer transition-colors disabled:opacity-50'
        >
          {isCancelling ? 'Отмена…' : 'Отменить бронь'}
        </button>
      )}
    </div>
  );
};
