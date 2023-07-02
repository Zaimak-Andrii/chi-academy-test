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

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type ICarForm = Omit<PartialBy<ICar, 'id'>, 'price'> & {
  price: number;
};

export interface IPersistedCars extends ICar {
  status: 'add' | 'delete' | 'update';
}
