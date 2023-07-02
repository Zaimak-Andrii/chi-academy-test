import { RootState } from '../store';

export const selectCars = (state: RootState) => state.cars.list;
