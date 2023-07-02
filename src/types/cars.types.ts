export interface ICarApi {
  id: number;
  car: string;
  car_model: string;
  car_color: string;
  car_model_year: number;
  car_vin: string;
  price: string;
  availability: boolean;
}

export interface ICar {
  id: number;
  company: string;
  model: string;
  vin: string;
  color: string;
  year: number;
  price: string;
  availability: boolean;
}

export type ICarForm = Omit<ICar, 'id'>;

export interface IPersistedCars extends ICar {
  status: 'add' | 'delete' | 'update';
}
