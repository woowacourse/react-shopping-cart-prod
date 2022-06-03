import { createSlice } from '@reduxjs/toolkit';

const productQuantitySlice = createSlice({
  name: 'productQuantity',
  initialState: {
    openCount: 0,
  },
  reducers: {
    open(state) {
      state.openCount += true;
    },
    close(state) {
      state.openCount += false;
    },
  },
});

export const { open, close } = productQuantitySlice.actions;

export default productQuantitySlice.reducer;
