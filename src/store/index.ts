import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './slice/headerSlice';

export const store = configureStore({
  reducer: {
    headers: headerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
