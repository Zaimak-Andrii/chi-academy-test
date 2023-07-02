import { RequestStatus } from '@/constants';
import type { ICar, IPersistedCars } from '@/types/cars.types';

interface IInitialState {
  list: ICar[];
  persist: {
    lastCarId: number;
    changedCars: IPersistedCars[];
  };
  status: RequestStatus;
  error: string | null;
}

export const carsInitialState: IInitialState = {
  list: [],
  persist: {
    lastCarId: 0,
    changedCars: [],
  },
  status: 'idle',
  error: null,
};
