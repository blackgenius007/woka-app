 /* eslint-disable */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Services/AuthServices/authSlice';
import employeeReducer from './Services/HR-Services/employeeSlice';
import financialReducer from './Services/AccountServices/financialSlice';
// import dialogReducer from './components/Dialog/dialogSlice';
export const store = configureStore({
    reducer: {
    auth: authReducer,
    employees:employeeReducer,
    financial: financialReducer,
    // dialog: dialogReducer,
  },
});

