import { SearchFlightsParams } from '@/shared/api/flightsApi';
import { useGetFlights } from '../model/useGetFlights';
import { FlightResults } from './flightResults/list';
import { FlightSearchForm } from './flightSearchForm';

export const HomePage = () => {
  const { flights, isLoading, error, refetch } = useGetFlights();

  const handleSearch = (params: SearchFlightsParams) => {
    refetch({
      origin: params.origin,
      destination: params.destination,
      date: params.date,
      passengers: params.passengers,
    });
  };
  return (
    <>
      <FlightSearchForm onSubmit={handleSearch} />
      <FlightResults flights={flights} isLoading={isLoading} error={error} />
    </>
  );
};
