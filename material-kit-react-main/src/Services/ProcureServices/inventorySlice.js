/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import inventoryService from './inventoryService';

const initialState = {
  inventory: [],
  totalInventory: 0,
  oneInventory: null,
  totalCost: 0,
  stockBalance: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getAllInventory = createAsyncThunk('inventory/getAllInventory', async () => {
  try {
    return await inventoryService.getAllInventory();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getTotalInventory = createAsyncThunk('inventory/getTotalInventory', async () => {
  try {
    return await inventoryService.getTotalInventory();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getOneInventory = createAsyncThunk('inventory/getOneInventory', async (itemId) => {
  try {
    return await inventoryService.getOneInventory(itemId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateInventory = createAsyncThunk('inventory/updateInventory', async (item) => {
  try {
    return await inventoryService.updateInventory(item);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteInventory = createAsyncThunk('inventory/deleteInventory', async (itemId) => {
  try {
    return await inventoryService.deleteInventory(itemId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getTotalCost = createAsyncThunk('inventory/getTotalCost', async () => {
  try {
    return await inventoryService.getTotalCost();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const outGoingStock = createAsyncThunk('inventory/outGoingStock', async (quantity) => {
  try {
    return await inventoryService.outGoingStock(quantity);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const incomingStock = createAsyncThunk('inventory/incomingStock', async (quantity) => {
  try {
    return await inventoryService.incomingStock(quantity);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getStockBalance = createAsyncThunk('inventory/getStockBalance', async () => {
  try {
    return await inventoryService.getStockBalance();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const quantityPerItem = createAsyncThunk('inventory/quantityPerItem', async (itemId) => {
  try {
    return await inventoryService.quantityPerItem(itemId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const connectItem = createAsyncThunk('inventory/connectItem', async (itemId) => {
  try {
    return await inventoryService.connectItem(itemId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const inventorySlice = createSlice({
  name: 'inventory',
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
      .addCase(getAllInventory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.inventory = action.payload;
      })
      .addCase(getAllInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // ... other cases
      .addCase(connectItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(connectItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update state with the result of connectItem
        state.connectedItem = action.payload;
      })
      .addCase(connectItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = inventorySlice.actions;
export default inventorySlice.reducer;
