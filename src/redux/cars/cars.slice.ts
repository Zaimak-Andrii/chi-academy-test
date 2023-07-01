import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import type { RequestStatus } from '@/constants';
import { ICar } from '@/types/ICar';
import { fetchCarsThunk } from './cars.thunk';

interface IInitialState {
  list: ICar[];
  persist: {
    lastCarId: number;
    changedCars: ICar[];
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
      state.list.unshift({ id: state.persist.lastCarId, ...action.payload });
    },
    deleteCar: (state, action: PayloadAction<number>) => {
      state.list.splice(
        state.list.findIndex(car => car.id === action.payload),
        1
      );
    },
    // changeTweetFilter: (state, { payload }: { payload: FilterStatus }) => {
    //   state.filter = payload;
    //   state.pagination.page = 1;
    // },
    // addToFollowed: (state, { payload }: { payload: string }) => {
    //   state.followed.push(payload);
    // },
    // removeFromFollowed: (state, { payload }: { payload: string }) => {
    //   state.followed = state.followed.filter(id => id !== payload);
    // },
    // nextPage: state => {
    //   state.pagination.page += 1;
    // },
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

export const { addCar, deleteCar } = carsSlice.actions;

const persistConfig = {
  key: 'cars/persist',
  storage,
  whitelist: ['persist'],
};
export const carsReducer = carsSlice.reducer;
export const persistedCars = persistReducer(persistConfig, carsReducer);
