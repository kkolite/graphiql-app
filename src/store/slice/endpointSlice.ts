import { createSlice } from '@reduxjs/toolkit';

import { ENDPOINT } from '../../data/variable';

interface IPostState {
  endpoint: string;
}

const initialState: IPostState = {
  endpoint: ENDPOINT,
};

const endpointSlice = createSlice({
  name: 'endpoint',
  initialState,
  reducers: {
    setEndpoint(state, action) {
      state.endpoint = action.payload;
    },
  },
});

export default endpointSlice.reducer;
export const { setEndpoint } = endpointSlice.actions;
