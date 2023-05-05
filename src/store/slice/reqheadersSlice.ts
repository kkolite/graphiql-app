import { createSlice } from '@reduxjs/toolkit';
import { reqHeaders, IRequestHeaders } from '../../data/variable';

interface IRHItems {
  itemsVal: IRequestHeaders[];
}

const initialState: IRHItems = {
  itemsVal: reqHeaders,
};

const reqHeadersSlice = createSlice({
  name: 'reqHeaders',
  initialState,
  reducers: {
    setreqHeaders(state, action) {
      state.itemsVal = action.payload;
    },
  },
});

export default reqHeadersSlice.reducer;
export const { setreqHeaders } = reqHeadersSlice.actions;
