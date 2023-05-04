import { createSlice } from '@reduxjs/toolkit';

interface IPostState {
  endpoint: string;
}

const initialState: IPostState = {
  endpoint: 'https://rickandmortyapi.com/graphql',
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
