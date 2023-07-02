import type { ICarForm } from '@/types/cars.types';

export const initialValues: ICarForm = {
  company: '',
  model: '',
  vin: '',
  color: '',
  price: '',
  year: new Date().getFullYear(),
  availability: true,
};
