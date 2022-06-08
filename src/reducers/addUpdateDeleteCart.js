import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as API from 'service';

export const addCart = createAsyncThunk(
  'cudCart/add',
  async (productId, { rejectWithValue }) => {
    try {
      await API.addCart(productId);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const modifyCartQuantity = createAsyncThunk(
  'cudCart/addMore',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      await API.modifyCartQuantity(productId, quantity);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const downCart = createAsyncThunk(
  'cudCart/downCart',
  async ({ productId }, { rejectWithValue }) => {
    try {
      await API.downCart(productId);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const deleteCart = createAsyncThunk(
  'cudCart/delete',
  async (productId, { rejectWithValue }) => {
    try {
      await API.deleteCart(productId);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export const deleteCarts = createAsyncThunk(
  'cudCart/deletes',
  async (productIds, { rejectWithValue }) => {
    try {
      await API.deleteCarts(productIds);
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const pending = (state) => {
  state.loading = true;
};
const fulfilled = (state) => {
  state.loading = false;
  state.error = false;
};
const rejected = (state) => {
  state.loading = false;
  state.error = true;
};

const cudCartSlice = createSlice({
  name: 'cudCart',
  initialState: {
    loading: true,
    error: false,
  },
  extraReducers: {
    [addCart.pending]: pending,

    [addCart.fulfilled]: fulfilled,

    [addCart.rejected]: rejected,

    [modifyCartQuantity.pending]: pending,

    [modifyCartQuantity.fulfilled]: fulfilled,

    [modifyCartQuantity.rejected]: rejected,

    [deleteCart.pending]: pending,

    [deleteCart.fulfilled]: fulfilled,

    [deleteCart.rejected]: rejected,

    [deleteCarts.pending]: pending,

    [deleteCarts.fulfilled]: fulfilled,

    [deleteCarts.rejected]: rejected,
  },
});

export default cudCartSlice.reducer;
