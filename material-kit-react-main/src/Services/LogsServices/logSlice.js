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

// Retrieve total inventory count
export const logInventoryActivity = createAsyncThunk(
    
    'inventoryLog/logActivity',
    async ({  email, tagName }, thunkAPI) => {
      try {
        return await logService.logInventoryActivity(email, tagName);
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
        // Update the inventoryLog state with the payload received
        state.inventoryLog = action.payload;
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
