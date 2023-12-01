  /* eslint-disable */
import { useSelector, useDispatch } from 'react-redux';
import {
  retrieveAllEmployees,
} from '../../../Services/HR-Services/employeeSlice';
import {
  calculateTaxAsync,
} from 'src/Services/AccountServices/financialSlice';

export const generateCSV = () => {
  const dispatch = useDispatch();

  //user details
  const { ownerEmail, role } = useSelector((state) => state.auth.user.data);

  // user role
  const userEmail = role === 'owner' || role === 'admin' ? ownerEmail : email;

  // Access Redux store to get the data from the employeeSlice
  const { employees, isLoading, isError, message } = useSelector((state) => state.employees);

  // Retrieve financial data from financialSlice
  const salaryData = useSelector((state) => state.financial);

  // Function to calculate financial data
  const calculateFinancialData = (employeeId, grossIncome, country, healthCare) => {
    dispatch(calculateTaxAsync({ employeeId, grossIncome, country, healthCare }));
  };

  // Fetch employees data if not available
  if (!employees || isLoading || isError) {
    // Dispatch an action to retrieve employee data
    dispatch(retrieveAllEmployees(userEmail));
    return ''; // Return an empty string for now; the CSV will be generated on the next render
  }

  // Hardcoded headers for the selected columns
  const headers = ['Name', 'Salary', 'Bank name', 'Bank code', 'Account Number'];

  // Create CSV data rows
  const csvRows = employees.map(({ id, grossIncome, country, healthCare, ...row }) => {
    // Calculate financial data if not available
    if (!salaryData || !salaryData.some(salary => salary.employeeId === id)) {
      calculateFinancialData(id, grossIncome, country, healthCare);
      return ''; // Return an empty string for now; the CSV will be generated on the next render
    }

    // Retrieve the calculated financial data
    const employeeSalary = salaryData.find(salary => salary.employeeId === id);

    // Use the found salary data or a default value
    const salaryValue = employeeSalary ? employeeSalary.amount.toFixed(2) : '';

    // Create CSV row
    const csvRow = headers.map(header => {
      if (header === 'Salary') {
        return salaryValue;
      } else if (header === 'Bank name') {
        return row['bankName']; // Adjust to your actual data structure
      } else if (header === 'Bank code') {
        return '-'; // You can adjust this based on your data structure or provide a default value
      }
      return row[header];
    });

    return csvRow.join(',');
  });

  // Combine header row and data rows
  const csvContent = headers.join(',') + '\n';
  const csv = csvContent + csvRows.join('\n');

  return csv;
};
