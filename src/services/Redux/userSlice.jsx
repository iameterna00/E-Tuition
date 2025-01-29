import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { webApi } from '../../api';

// Async thunk to fetch user details
export const fetchUser = createAsyncThunk('user/fetchUser', async (uid) => {
  const response = await axios.get(`${webApi}/api/user/${uid}`);
  return response.data.data; // Access user data
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log("Fetched user:", action.payload);  // Log user data
        state.loading = false;
        state.user = action.payload;
      })
      
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.user;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
