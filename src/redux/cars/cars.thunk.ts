import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCarsService } from '@/services/api';
import { RootState } from '../store';
import { applyPersistedData, convertCarObject } from '@/helpers';
import type { ICar } from '@/types/cars.types';

export const fetchCarsThunk = createAsyncThunk<ICar[], undefined, { rejectValue: string }>(
  'cars/fetchCars',
  async (_, { getState, rejectWithValue }) => {
    try {
      const data = await getCarsService();
      const cars = data.map(car => convertCarObject(car));
      const persistedCars = (getState() as RootState).cars.persist.changedCars;

      return applyPersistedData(cars, persistedCars);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
