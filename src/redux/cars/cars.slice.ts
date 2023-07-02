import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type { RequestStatus } from '@/constants';
import { ICar } from '@/types/ICar';
import { fetchCarsThunk } from './cars.thunk';

type ChangedCarsType = ICar & { status: 'add' | 'delete' | 'update' };

interface IInitialState {
  list: ICar[];
  persist: {
    lastCarId: number;
    changedCars: ChangedCarsType[];
  };
  status: RequestStatus;
  error: string | null;
}

const initialState: IInitialState = {
  list: [],
  persist: {
    lastCarId: 0,
    changedCars: [],
  },
  status: 'idle',
  error: null,
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<Omit<ICar, 'id'>>) => {
      state.persist.lastCarId += 1;
      const newCar = { id: state.persist.lastCarId, ...action.payload };
      state.list.unshift(newCar);
      // add new car to persist array
      state.persist.changedCars.push({ status: 'add', ...newCar });
    },
    deleteCar: (state, action: PayloadAction<number>) => {
      // remove car from array
      const [car] = state.list.splice(
        state.list.findIndex(({ id }) => id === action.payload),
        1
      );
      // add removed car to persist array
      if (car) {
        const persistedCarIndex = state.persist.changedCars.findIndex(
          ({ id }) => id === action.payload
        );

        if (persistedCarIndex >= 0) {
          state.persist.changedCars[persistedCarIndex] = {
            ...state.persist.changedCars[persistedCarIndex],
            status: 'delete',
          };
        } else {
          state.persist.changedCars.push({
            status: 'delete',
            ...car,
          });
        }
      }
    },
    updateCar: (state, action: PayloadAction<ICar>) => {
      const carIndex = state.list.findIndex(({ id }) => id === action.payload.id);
      if (carIndex >= 0) {
        state.list.splice(carIndex, 1, action.payload);
      }
      // add removed car to persist array
      if (carIndex >= 0) {
        const persistedCarIndex = state.persist.changedCars.findIndex(
          ({ id }) => id === action.payload.id
        );

        if (persistedCarIndex >= 0) {
          state.persist.changedCars[persistedCarIndex] = {
            ...action.payload,
            status: 'update',
          };
        } else {
          state.persist.changedCars.push({
            status: 'update',
            ...action.payload,
          });
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCarsThunk.pending, state => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchCarsThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.list = payload;
        if (payload.length > state.persist.lastCarId) {
          state.persist.lastCarId = payload.length;
        }
      })
      .addCase(fetchCarsThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload ?? 'Unknown error.';
      });
  },
});

export const { addCar, deleteCar, updateCar } = carsSlice.actions;

const persistConfig = {
  key: 'cars/persist',
  storage,
  whitelist: ['persist'],
};
export const carsReducer = carsSlice.reducer;
export const persistedCars = persistReducer(persistConfig, carsReducer);
