import { fetchApi } from '../config/fetchApi';
import { TFlight } from '../types/types';

export interface SearchFlightsParams {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
}

export const searchFlights = (params: SearchFlightsParams) => {
  const query = new URLSearchParams({
    origin: params.origin,
    destination: params.destination,
    date: params.date,
    passengers: params.passengers.toString(),
  });

  return fetchApi<TFlight[]>(`/api/flights?${query}`);
};
