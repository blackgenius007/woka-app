/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import financialService from './financialServices';

// Define initial state for financial data
const initialState = {
  consolidatedSalary: 0,
  annualTaxPayable: 0,
  monthlyTaxPayable: 0,
  annualSalary: 0,
  monthlySalary: 0,
  totalMonthlySalary: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',

  // ... other financial data
};

// Helper functions for calculations
// ... (getConsolidatedSalary and calculateCRA functions)
const getConsolidatedSalary = (income, country) => {
  let basicSalaryPercentage = 0;
  let housingAllowancePercentage = 0;
  let transportAllowancePercentage = 0;

  // Modify the percentages based on the country
  if (country === 'Nigeria') {
    basicSalaryPercentage = 0.4;
    housingAllowancePercentage = 0.3;
    transportAllowancePercentage = 0.2;
  } else if (country === 'Ghana') {
    basicSalaryPercentage = 0.6;
    housingAllowancePercentage = 0.15;
    transportAllowancePercentage = 0.25;
  } else {
    // Set default percentages for other countries
    basicSalaryPercentage = 0.5;
    housingAllowancePercentage = 0.2;
    transportAllowancePercentage = 0.1;
  }

  const basicSalary = income * basicSalaryPercentage;
  const housingAllowance = income * housingAllowancePercentage;
  const transportAllowance = income * transportAllowancePercentage;
  const consolidatedSalary = basicSalary + housingAllowance + transportAllowance;

  return consolidatedSalary;
};

const calculateCRA = (grossIncome) => {
  console.log('Calculate CRA =>', grossIncome);
  const cra = 200000 + (20 / 100) * grossIncome;
  return cra;
};

const getPensionFund = (grossIncome) => {
  console.log('Calculate pension =>', grossIncome);
  const basicSalaryPercentage = 0.15;
  const transportAllowancePercentage = 0.075;
  const housingAllowancePercentage = 0.075;

  const basicSalary = grossIncome * basicSalaryPercentage;
  const transportAllowance = grossIncome * transportAllowancePercentage;
  const housingAllowance = grossIncome * housingAllowancePercentage;

  const sumOfValues = basicSalary + transportAllowance + housingAllowance;
  const pension = (sumOfValues * 8) / 100;

  return pension;
};

// Helper function to calculate tax payable
const calculateTaxPayable = (grossIncome, taxBands, pensionFund, cra, healthCare, country) => {
  if (country === 'Nigeria') {
    const chargeableIncome = grossIncome - pensionFund - healthCare - cra;

    let taxPayable = 0;

    if (chargeableIncome < 300000) {
      taxPayable = 0.07 * chargeableIncome;
    } else if (chargeableIncome < 600000) {
      taxPayable = 0.07 * 300000 + 0.11 * (chargeableIncome - 300000);
    } else if (chargeableIncome < 1100000) {
      taxPayable = 0.07 * 300000 + 0.11 * 300000 + 0.15 * (chargeableIncome - 600000);
    } else if (chargeableIncome < 1600000) {
      taxPayable =
        0.07 * 300000 + 0.11 * 300000 + 0.15 * 500000 + 0.19 * (chargeableIncome - 1100000);
    } else if (chargeableIncome < 3200000) {
      taxPayable =
        0.07 * 300000 +
        0.11 * 300000 +
        0.15 * 500000 +
        0.19 * 500000 +
        0.21 * (chargeableIncome - 1600000);
    } else {
      taxPayable =
        0.07 * 300000 +
        0.11 * 300000 +
        0.15 * 500000 +
        0.19 * 500000 +
        0.21 * 1600000 +
        0.24 * (chargeableIncome - 3200000);
    }

    return taxPayable;
  } else if (country === 'Ghana') {
  }
};

// Create asynchronous action for calculating tax
export const calculateTaxAsync = createAsyncThunk(
  'financial/calculateTax',
  async ({ employeeId, grossIncome, country, healthCare }, thunkAPI) => {
    console.log('from calculator:', employeeId, grossIncome, country, healthCare);
    const consolidatedSalary = getConsolidatedSalary(grossIncome, country);
    const cra = calculateCRA(grossIncome);
    const pensionFund = getPensionFund(grossIncome);

    let taxBands = [];
    if (country === 'Nigeria') {
      taxBands = [
        { threshold: 300000, rate: 0.07 },
        { threshold: 600000, rate: 0.11 },
        { threshold: 1100000, rate: 0.15 },
        { threshold: 1600000, rate: 0.19 },
        { threshold: 3200000, rate: 0.21 },
        { threshold: Infinity, rate: 0.24 },
      ];
    } else if (country === 'Ghana') {
      // Add tax bands specific to Ghana
      taxBands = [
        // ... Ghana-specific tax bands
      ];
    } else {
      // Default tax bands for other countries
      taxBands = [
        // ... Default tax bands for other countries
      ];
    }

    const taxPayable = calculateTaxPayable(
      grossIncome,
      taxBands,
      pensionFund,
      cra,
      healthCare,
      country
    );

    const annualTaxPayable = taxPayable;
    const monthlyTaxPayable = annualTaxPayable / 12;
    const annualSalary = grossIncome - annualTaxPayable;
    const monthlySalary = annualSalary / 12;
    const pension = pensionFund / 12;
    console.log(
      'financial result from slice:',
      annualTaxPayable,
      monthlyTaxPayable,
      annualSalary,
      monthlySalary,
      pension
    );
    const calculatedValues = {
      consolidatedSalary,
      annualTaxPayable,
      monthlyTaxPayable,
      annualSalary,
      monthlySalary,
      cra,
      pension,
      // ... other calculated values
    };

    return calculatedValues;
  }
);

export const addAllowance = createAsyncThunk(
  'financial/addAllowance ',
  async ({ id, value }, thunkAPI) => {
    try {
      const response = await financialService.addAllowance(id, value);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addIOU = createAsyncThunk('financial/addIOU ', async ({ id, value }, thunkAPI) => {
  try {
    const response = await financialService.addIOU(id, value);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const allowanceReset = createAsyncThunk(
  'financial/allowanceReset',
  async ({ email, overtime }, thunkAPI) => {
    try {
      const response = await financialService.allowanceReset(email, overtime);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addOvertime = createAsyncThunk(
  'financial/addOvertime',
  async ({ id, value }, thunkAPI) => {
    try {
      const response = await financialService.addOvertime(id, value);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const overtimeReset = createAsyncThunk(
  'financial/overtimeReset',
  async ({ email, overtime }, thunkAPI) => {
    try {
      const response = await financialService.overtimeReset(email, overtime);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addLoan = createAsyncThunk('financial/addLoan ', async ({ loanDetail }, thunkAPI) => {
  console.log('added loan:', loanDetail);
  try {
    const response = await financialService.addLoan(loanDetail);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateLoan = createAsyncThunk(
  'financial/updateLoan ',
  async ({ loanDetail }, thunkAPI) => {
    console.log('update loan:', loanDetail);
    try {
      const response = await financialService.updateLoan(loanDetail);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loanPayOff = createAsyncThunk(
  'financial/loanPayOff ',
  async ({ today, id }, thunkAPI) => {
    console.log('update loan:', today);
    try {
      const response = await financialService.loanPayOff(today, id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Create a financial slice using createSlice
const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    // Define other reducers if needed
  },
  extraReducers: (builder) => {
    builder
    .addCase(calculateTaxAsync.fulfilled, (state, action) => {
      // Update or add financial data for a specific employee
      const { employeeId } = action.meta.arg;
      return {
        ...state,
        [employeeId]: {
          ...state[employeeId],
          ...action.payload,
        },
      };
    })
      // .addCase(calculateTaxAsync.fulfilled, (state, action) => {
      //   // Update or add financial data for a specific employee
      //   const { employeeId } = action.meta.arg;
      //   return {
      //     ...state,
      //     [employeeId]: action.payload,
      //   };
      // })
      .addCase(calculateTaxAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(allowanceReset.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allowanceReset.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // You can update any relevant state here if needed
      })
      .addCase(allowanceReset.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addOvertime.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset isSuccess when starting a new operation
        state.isError = false; // Reset isError when starting a new operation
        state.message = ''; // Reset message when starting a new operation
      })
      .addCase(addOvertime.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Overtime added successfully'; // Set a success message
      })
      .addCase(addOvertime.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Set the error message from the action payload
      })
      .addCase(addAllowance.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset isSuccess when starting a new operation
        state.isError = false; // Reset isError when starting a new operation
        state.message = ''; // Reset message when starting a new operation
      })
      .addCase(addAllowance.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Allowance added successfully'; // Set a success message
      })
      .addCase(addAllowance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Set the error message from the action payload
      })
      .addCase(addIOU.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset isSuccess when starting a new operation
        state.isError = false; // Reset isError when starting a new operation
        state.message = ''; // Reset message when starting a new operation
      })
      .addCase(addIOU.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Allowance added successfully'; // Set a success message
      })
      .addCase(addIOU.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Set the error message from the action payload
      });
  },
});

// Export actions and reducer
export default financialSlice.reducer;

 