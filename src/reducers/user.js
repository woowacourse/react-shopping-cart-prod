import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as API from 'service';

export const login = createAsyncThunk(
  'user/login',
  async (user, { rejectWithValue }) => {
    try {
      const data = await API.login(user);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    accessToken: localStorage.getItem('accessToken') || '',
  },
  reducers: {
    withdraw(state) {
      state.accessToken = '';
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { withdraw } = userSlice.actions;

export default userSlice.reducer;
