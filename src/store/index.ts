import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './slice/headerSlice';
import queryReducer from './slice/querySlice';
import endpointReducer from './slice/endpointSlice';

export const store = configureStore({
  reducer: {
    headers: headerReducer,
    query: queryReducer,
    endpoint: endpointReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
