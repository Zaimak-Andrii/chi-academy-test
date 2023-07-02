import { convertCarObject } from '@/helpers';
import { getCarsService } from '@/services/api';
import { ICar } from '@/types/ICar';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const fetchCarsThunk = createAsyncThunk<ICar[], undefined, { rejectValue: string }>(
  'cars/fetchCars',
  async (_, { getState, rejectWithValue }) => {
    try {
      const data = await getCarsService();
      const cars = data.map(car => convertCarObject(car));
      const persistedCars = (getState() as RootState).cars.persist.changedCars;

      const newCarsFromPersist = () =>
        persistedCars
          .filter(({ id, status }) => id > cars.length && status !== 'delete')
          .map(({ status: _, ...otherCarProprty }) => ({ ...otherCarProprty }));

      return cars.reduce<ICar[]>((acc, car) => {
        const findCar = persistedCars.find(({ id }) => id === car.id);

        if (findCar) {
          const { status, ...otherCarProperty } = findCar;

          if (status === 'update') {
            acc.push({ ...car, ...otherCarProperty });
          } else if (status === 'delete') {
            return acc;
          }
        } else {
          acc.push(car);
        }

        return acc;
      }, newCarsFromPersist());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
