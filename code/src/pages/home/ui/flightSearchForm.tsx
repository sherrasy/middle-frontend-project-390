import { TEST_IDS } from '@/shared/constants/testids';
import React from 'react';

const DEFAULT_STYLES = {
  inputClass:
    'w-full h-10 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none',
  labelClass: 'text-sm font-bold text-gray-700',
};

export const FlightSearchForm: React.FC = () => {
  return (
    <form
      data-testid={TEST_IDS.search.form}
      className='bg-white rounded-xl shadow-md p-6 w-6xl'
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
          >
            <option value=''>Выберите город</option>
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
          >
            <option value=''>Выберите город</option>
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
