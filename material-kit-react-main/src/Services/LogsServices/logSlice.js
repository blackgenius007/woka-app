/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import logService from './logServices';

const initialState = {
  inventoryLog: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const logInventoryActivity = createAsyncThunk(
  'inventory/logActivity',
  async ({ email, tagName }, thunkAPI) => {
    console.log('Log Inventory Activity:', email, tagName);
    try {
      // Log the activity using your inventoryService or any other appropriate service
      const result = await logService.logInventoryActivity(email, tagName);

      // Log the result for debugging (you can remove this in production)
      console.log('Log Inventory Activity Result:', result);

      // Return the result if needed
      return result;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logSlice = createSlice({
  name: 'inventoryLog',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInventoryActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logInventoryActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Handle fulfillment if needed
        console.log('Log Inventory Activity Fulfilled:', action.payload);
      })
      .addCase(logInventoryActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.error('Log Inventory Activity Rejected:', action.payload);
      });
  },
});

export const { reset } = logSlice.actions;
export default logSlice.reducer;
