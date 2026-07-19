import { fetchApi } from '@/shared/config/fetchApi';
import { TCity } from '@/shared/types/flight.type';

export const getCities = async (): Promise<TCity[]> => fetchApi('/api/cities');
