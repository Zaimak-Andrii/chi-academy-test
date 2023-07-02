import { ICarApi } from '@/types/cars.types';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://myfakeapi.com/api/',
});

export const getCarsService = async (): Promise<ICarApi[]> => {
  const result = await api.get('cars');

  return result.data?.cars;
};
