import { convertCarObject } from '@/helpers';
import { getCarsService } from '@/services/api';
import { ICar } from '@/types/ICar';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCarsThunk = createAsyncThunk<ICar[], undefined, { rejectValue: string }>(
  'cars/fetchCars',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCarsService();

      return data.map(car => convertCarObject(car));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
