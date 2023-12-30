/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import inventoryService from './inventoryServices';

const initialState = {
  inventory: [],
  totalInventory: 0,
  oneInventory: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  totalCost: 0,
  stockBalance: 0,
};

// Add the new action creator
export const createInventory = createAsyncThunk('inventory/create', async (formData, thunkAPI) => {
  try {
    return await inventoryService.createInventory(formData);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Retrieve all inventory

export const getAllInventory = createAsyncThunk('inventory/getAll', async (userEmail, thunkAPI) => {
  console.log('slice-of-inventory', userEmail);
  try {
    return await inventoryService.getAllInventory(userEmail);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getAllInventoryEachPoint = createAsyncThunk(
  'inventory/getAllEp',
  async ({ email, tagName }, thunkAPI) => {
    console.log('slice-of-inventory', email, tagName);
    try {
      return await inventoryService.getAllInventoryEachPoint(email, tagName);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Retrieve total inventory count
export const getTotalInventory = createAsyncThunk(
  'inventory/getTotal',
  async ({ email, projectname }, thunkAPI) => {
    try {
      return await inventoryService.getTotalInventory(email, projectname);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Retrieve one inventory item
export const getOneInventory = createAsyncThunk('inventory/getOne', async (id, thunkAPI) => {
  try {
    return await inventoryService.getOneInventory(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update an inventory item
export const updateInventory = createAsyncThunk(
  'inventory/update',
  async ({ id, newData }, thunkAPI) => {
    try {
      return await inventoryService.updateInventory(id, newData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete an inventory item
export const deleteInventory = createAsyncThunk('inventory/delete', async (id, thunkAPI) => {
  try {
    await inventoryService.deleteInventory(id);
    return id;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Retrieve total cost of inventory
export const getTotalCost = createAsyncThunk(
  'inventory/getTotalCost',
  async ({ email, projectname }, thunkAPI) => {
    try {
      return await inventoryService.getTotalCost(email, projectname);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Outgoing stock
export const outGoingStock = createAsyncThunk(
  'inventory/outGoingStock',
  async ({ email, id, nums, quantity, order }, thunkAPI) => {
    console.log(email, id, nums, quantity, order);
    try {
      return await inventoryService.outGoingStock(email, id, nums, quantity, order);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Incoming stock
export const incomingStock = createAsyncThunk(
  'inventory/incomingStock',
  async ({ email, id, nums, quantity }, thunkAPI) => {
    try {
      return await inventoryService.incomingStock(email, id, nums, quantity);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Retrieve stock balance
export const getStockBalance = createAsyncThunk(
  'inventory/getStockBalance',
  async ({ email, projectname }, thunkAPI) => {
    console.log(email, id, nums, quantity);
    try {
      return await inventoryService.getStockBalance(email, projectname);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Quantity per item
export const quantityPerItem = createAsyncThunk(
  'inventory/quantityPerItem',
  async ({ email, projectname }, thunkAPI) => {
    try {
      return await inventoryService.quantityPerItem(email, projectname);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Connect item
export const connectItem = createAsyncThunk('inventory/connectItem', async (data, thunkAPI) => {
  try {
    return await inventoryService.connectItem(data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
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
      .addCase(createInventory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const newInventory = action.payload;
        state.inventory.push(newInventory); // Assuming your inventory is an array
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getAllInventory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employees = action.payload;
      })
      .addCase(getAllInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllInventoryEachPoint.fulfilled, (state, action) => {
        state.inventory = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(getAllInventoryEachPoint.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllInventoryEachPoint.rejected, (state, action) => {
        state.inventory = [];
        state.isLoading = false;
        state.isError = action.error.message;
      })
      .addCase(getTotalInventory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalInventory = action.payload;
      })
      .addCase(getTotalInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOneInventory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.oneInventory = action.payload;
      })
      .addCase(getOneInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateInventory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedInventory = action.payload;
        const inventoryIndex = state.inventory.findIndex((item) => item.id === updatedInventory.id);
        if (inventoryIndex !== -1) {
          // Update the inventory item details
          state.inventory[inventoryIndex] = updatedInventory;
        }
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteInventory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const deletedInventoryId = action.payload;
        state.inventory = state.inventory.filter((item) => item.id !== deletedInventoryId);
      })
      .addCase(deleteInventory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTotalCost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalCost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalCost = action.payload;
      })
      .addCase(getTotalCost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(outGoingStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(outGoingStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Handle fulfillment if needed
      })
      .addCase(outGoingStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(incomingStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(incomingStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Handle fulfillment if needed
      })
      .addCase(incomingStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStockBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStockBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stockBalance = action.payload;
      })
      .addCase(getStockBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(quantityPerItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(quantityPerItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Handle fulfillment if needed
      })
      .addCase(quantityPerItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(connectItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(connectItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Handle fulfillment if needed
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
