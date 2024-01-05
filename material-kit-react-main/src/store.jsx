 /* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Services/AuthServices/authSlice';
import employeeReducer from './Services/HR-Services/employeeSlice';
import financialReducer from './Services/AccountServices/financialSlice';
import inventoryReducer from './Services/ProcureServices/inventorySlice';
import inventoryLogReducer from './Services/LogsServices/logSlice';
 
export const store = configureStore({
    reducer: {
    auth: authReducer,
    employees:employeeReducer,
    financial: financialReducer,
    inventory: inventoryReducer,
    inventoryLog: inventoryLogReducer
   
  },
});

