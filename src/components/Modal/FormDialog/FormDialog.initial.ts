import type { ICarForm } from '@/types/cars.types';

export const initialValues: ICarForm = {
  company: '',
  model: '',
  vin: '',
  color: '',
  price: 0,
  year: new Date().getFullYear(),
  availability: true,
};
