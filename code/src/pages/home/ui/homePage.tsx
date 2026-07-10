import { FlightResults } from './flightResults/list';
import { FlightSearchForm } from './flightSearchForm';

export const HomePage = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='max-w-6xl mx-auto px-4 py-4'>
          <h1 className='text-2xl font-bold text-gray-900'>
            Бронирование авиабилетов
          </h1>
        </div>
      </header>

      <main className='px-4 py-8 flex flex-col items-center'>
        <FlightSearchForm />
        <FlightResults flights={[]} isLoading={false} isError={false} />
      </main>
    </div>
  );
};
