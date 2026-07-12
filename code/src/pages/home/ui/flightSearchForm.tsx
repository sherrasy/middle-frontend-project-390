import { SearchFlightsParams } from '@/shared/api/flightsApi';
import { TEST_IDS } from '@/shared/constants/testids';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useCities } from '../model/useGetCities';
import { getTodayDate } from '@/shared/lib/formatDate';

const DEFAULT_STYLES = {
  inputClass:
    'w-full h-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none',
  labelClass: 'text-sm font-bold text-gray-700',
};

interface FlightSearchForm {
  onSubmit: (params: SearchFlightsParams) => void;
}

export const FlightSearchForm = ({ onSubmit }: FlightSearchForm) => {
  const { cities, isLoading } = useCities();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(getTodayDate());
  const [passengers, setPassengers] = useState(1);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit({ origin, destination, date, passengers });
  };

  useEffect(() => {
    if (cities.length && !isLoading) {
      setOrigin(cities[0].code);
      setDestination(cities[1].code);
    }
  }, [cities, isLoading]);

  return (
    <form
      data-testid={TEST_IDS.search.form}
      className='bg-white rounded-xl shadow-md p-6 w-6xl'
      onSubmit={handleSubmit}
    >
      <div className='flex items-end justify-center gap-4'>
        <div className='flex flex-col gap-1 w-48'>
          <label
            htmlFor={TEST_IDS.search.origin}
            className={DEFAULT_STYLES.labelClass}
          >
            Откуда
          </label>
          <select
            id={TEST_IDS.search.origin}
            data-testid={TEST_IDS.search.origin}
            className={DEFAULT_STYLES.inputClass}
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          >
            <option value=''>Выберите город</option>
            {cities.map((city) => (
              <option key={`origin-${city.code}`} value={city.code}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col gap-1 w-48'>
          <label
            htmlFor={TEST_IDS.search.destination}
            className={DEFAULT_STYLES.labelClass}
          >
            Куда
          </label>
          <select
            id={TEST_IDS.search.destination}
            data-testid={TEST_IDS.search.destination}
            className={DEFAULT_STYLES.inputClass}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value=''>Выберите город</option>
            {cities.map((city) => (
              <option key={`departure-${city.code}`} value={city.code}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col gap-1 w-48'>
          <label
            htmlFor={TEST_IDS.search.date}
            className={DEFAULT_STYLES.labelClass}
          >
            Дата вылета
          </label>
          <input
            id={TEST_IDS.search.date}
            type='date'
            data-testid={TEST_IDS.search.date}
            className={DEFAULT_STYLES.inputClass}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-1 w-48'>
          <label
            htmlFor={TEST_IDS.search.passengers}
            className={DEFAULT_STYLES.labelClass}
          >
            Пассажиры
          </label>
          <input
            id={TEST_IDS.search.passengers}
            type='number'
            min={1}
            data-testid={TEST_IDS.search.passengers}
            className={DEFAULT_STYLES.inputClass}
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
          />
        </div>

        <button
          type='submit'
          data-testid={TEST_IDS.search.submit}
          className='w-48 h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg'
        >
          Найти
        </button>
      </div>
    </form>
  );
};
