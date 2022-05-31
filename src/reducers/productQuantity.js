import { createSlice } from '@reduxjs/toolkit';

const productQuantitySlice = createSlice({
  name: 'productQuantity',
  initialState: {
    isOpened: false,
  },
  reducers: {
    open(state) {
      state.isOpened = true;
    },
    close(state) {
      state.isOpened = false;
    },
  },
});

export const { open, close } = productQuantitySlice.actions;

export default productQuantitySlice.reducer;
