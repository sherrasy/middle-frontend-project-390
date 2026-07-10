import React from 'react';
import { TEST_IDS } from '@/shared/constants/testids';

export interface FlightResultItemProps {
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency?: string;
}

export const FlightResultItem: React.FC<FlightResultItemProps> = ({
  flightNumber,
  airline,
  origin,
  destination,
  departureTime,
  arrivalTime,
  duration,
  price,
  currency = '₽',
}) => {
  return (
    <div
      data-testid={TEST_IDS.flights.item}
      className='bg-white border border-gray-200 rounded-xl p-5'
    >
      <div className='flex items-center justify-between gap-6'>
        <div className='flex-1'>
          <div className='flex items-center gap-2 mb-1'>
            <span className='text-base font-bold text-gray-900'>{airline}</span>
            <span className='text-base text-gray-900'>· {flightNumber}</span>
          </div>

          <div className='text-base text-gray-900 mb-1'>
            {origin} → {destination}
          </div>

          <div className='text-sm text-gray-400'>
            {departureTime} — {arrivalTime} · {duration}
          </div>
        </div>

        <div className='flex items-center gap-4 shrink-0'>
          <div className='text-2xl font-bold text-gray-900'>
            {price.toLocaleString('ru-RU')} {currency}
          </div>
          <button
            data-testid={TEST_IDS.flights.book}
            className='bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2.5 px-6 rounded-lg transition-colors'
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
};
