/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Avatar, Button, Box } from '@mui/material';
import Payroll from './payroll';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import { retrieveEmployeeById } from 'src/Services/HR-Services/employeeSlice';
import { calculateTaxAsync } from 'src/Services/AccountServices/financialSlice';


 

export default function PaymentDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [openPayment, setOpenPayment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = moment().format('YYYY-MM-DD');
        const response = await dispatch(retrieveEmployeeById(id));
        const employee = response.payload; // Access the employee details from the response payload
  
        setEmployeeData(employee);
  
        console.log(employee);
  
        // Check if required data is available before dispatching the action
        if (employee?.designation?.grossIncome && employee?.designation?.country && employee?.healthCare) {
          dispatch(
            calculateTaxAsync({
              employeeId: id,
              grossIncome: employee.designation.grossIncome,
              country: employee.designation.country,
              healthCare: employee.healthCare,
              // Add other properties as needed
            })
          );
        }
      } catch (err) {
        console.log('An error occurred!', err);
      }
    };
  
    fetchData();
  }, [dispatch, id]);

  if (!employeeData || !employeeData.employee) {
    // If employeeData or employeeData.employee is not yet available, show a loading message or handle the case appropriately
    return <div>Loading...</div>;
  }

  const {
    // ... (other employee properties)
  } = employeeData.employee;

  // Assuming financialData is stored in the Redux state
  const financialData = useSelector((state) => state.financial);

  const employeeFinancialData = financialData[id] || {};
  return (
    <div>
      {/* ... (other components) */}

      {/* Display financial data if available */}
      {employeeFinancialData && (
        <tr>
          <td>{fNumber(employeeFinancialData.consolidatedSalary)}</td>
          <td>{fNumber(employeeFinancialData.annualTaxPayable)}</td>
          <td>{fNumber(employeeFinancialData.monthlyTaxPayable)}</td>
          <td>{fNumber(employeeFinancialData.annualSalary)}</td>
          <td>{fNumber(employeeFinancialData.monthlySalary)}</td>
          <td>{fNumber(employeeFinancialData.cra)}</td>
          <td>{fNumber(employeeFinancialData.pension)}</td>
          {/* Add other cells for the financial data you want to display */}
        </tr>
      )}

      {/* ... (rest of the component) */}
    </div>
  );
}
