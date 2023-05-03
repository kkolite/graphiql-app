import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './slice/headerSlice';
import queryReducer from './slice/querySlice';

export const store = configureStore({
  reducer: {
    headers: headerReducer,
    query: queryReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
