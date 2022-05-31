import { createSlice } from '@reduxjs/toolkit';

const productQuantitySlice = createSlice({
  name: 'productQuantity',
  initialState: {
    isOpened: 0,
  },
  reducers: {
    open(state) {
      state.isOpened += true;
    },
    close(state) {
      state.isOpened += false;
    },
  },
});

export const { open, close } = productQuantitySlice.actions;

export default productQuantitySlice.reducer;
