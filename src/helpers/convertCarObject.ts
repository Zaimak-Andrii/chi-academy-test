import { ICar, ICarApi } from '@/types/ICar';

export const convertCarObject = ({ car, car_color, car_model, car_model_year, car_vin, ...other }: ICarApi): ICar => ({
  company: car,
  color: car_color,
  model: car_model,
  vin: car_vin,
  year: car_model_year,
  ...other,
});
