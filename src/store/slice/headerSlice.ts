import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  isSignIn: boolean;
  isSignUp: boolean;
}

const initialState: IInitialState = {
  isSignIn: false,
  isSignUp: false,
};

const headerSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    setBtnSignIn(state, action: PayloadAction<boolean>) {
      state.isSignIn = action.payload;
    },
    setBtnSignUp(state, action: PayloadAction<boolean>) {
      state.isSignUp = action.payload;
    },
  },
});

export const { setBtnSignIn, setBtnSignUp } = headerSlice.actions;

export default headerSlice.reducer;
