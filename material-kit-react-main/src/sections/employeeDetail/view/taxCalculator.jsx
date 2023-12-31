 /* eslint-disable */
import React, { useState,useEffect } from 'react'; 
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
 
} from '@mui/material';
import { fNumber } from 'src/utils/format-number';

const TaxCalculator = ({consolidatedSalary,cra,benefit,loan,basicSalary,chargeableIncome,employeeAccessData,pensionFund,grossIncome,healthCare}) => {
  const [consolidatedSalaryState, setConsolidatedSalary] = useState(0);
  const [annualTaxPayable, setAnnualTaxPayable] = useState(0);
  const [monthlyTaxPayable, setMonthlyTaxPayable] = useState(0);
  const [annualSalary, setAnnualSalary] = useState(0);
  const [pension, setPension] = useState(0);
  const [monthlySalary, setMonthlySalary] = useState(0);
console.log('taxaccess:',employeeAccessData)

 

  useEffect(() => {
     
    const chargeableIncome = grossIncome-pensionFund-healthCare-cra
    console.log(chargeableIncome)

    let taxPayable = 0;

    if (chargeableIncome < 300000) {
      taxPayable = 0.07 * chargeableIncome;
    } else if (chargeableIncome < 600000) {
      taxPayable = 0.07 * 300000 + 0.11 * (chargeableIncome - 300000);
    } else if (chargeableIncome < 1100000) {
      taxPayable = 0.07 * 300000 + 0.11 * 300000 + 0.15 * (chargeableIncome - 600000);
    } else if (chargeableIncome < 1600000) {
      taxPayable = 0.07 * 300000 + 0.11 * 300000 + 0.15 * 500000 + 0.19 * (chargeableIncome - 1100000);
    } else if (chargeableIncome < 3200000) {
      taxPayable = 0.07 * 300000 + 0.11 * 300000 + 0.15 * 500000 + 0.19 * 500000 + 0.21 * (chargeableIncome - 1600000);
    } else {
      taxPayable = 0.07 * 300000 + 0.11 * 300000 + 0.15 * 500000 + 0.19 * 500000 + 0.21 * 1600000 + 0.24 * (chargeableIncome - 3200000);
    }

    const calculatedAnnualTaxPayable = taxPayable;
    const calculatedMonthlyTaxPayable = calculatedAnnualTaxPayable / 12;
    const calculatedAnnualSalary = grossIncome - calculatedAnnualTaxPayable;
    const calculatedMonthlySalary = calculatedAnnualSalary / 12;

    // Update state with calculated values
    setConsolidatedSalary(consolidatedSalary);
    setAnnualTaxPayable(calculatedAnnualTaxPayable);
    setMonthlyTaxPayable(calculatedMonthlyTaxPayable);
    setAnnualSalary(calculatedAnnualSalary);
    setMonthlySalary(calculatedMonthlySalary);
    setPension();
  }, [consolidatedSalary, consolidatedSalaryState,cra]);


 
 

  const getTotalMonthlySalary = () => {
    let total = monthlySalary;
  
    // Subtract loan if it exists
    if (loan) {
      console.log("Original total:", total);
      console.log("Subtracting loan:", loan);
      total = Math.max(total - loan, 0); // Ensure total doesn't go negative
      console.log("Result after loan subtraction:", total);
    }
  
    // Add benefit if it exists
    if (benefit) {
      console.log("Adding benefit:", benefit);
      total += benefit;
      console.log("Result after adding benefit:", total);
    }
  
    console.log("Final total:", total);
  
    return total;
  };
  


  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <TableContainer>
            <Table sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Gross Income</TableCell>
                  <TableCell>{fNumber (grossIncome)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Taxable Income</TableCell>
                  <TableCell>{fNumber (grossIncome-pensionFund-healthCare-cra)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>CRA (Consolidated Relief Allowance)</TableCell>
                  <TableCell>{fNumber(cra)}</TableCell>
                </TableRow>                
                <TableRow>
                  <TableCell>Tax Payable per Annum</TableCell>
                  <TableCell>{fNumber(annualTaxPayable)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax Payable per Month</TableCell>
                  {/* <TableCell>{toMoney(monthlyTaxPayable)}</TableCell> */}
                  <TableCell>{fNumber(monthlyTaxPayable)}</TableCell>
                </TableRow>
                
                  <TableRow>
                  <TableCell>Annual Salary</TableCell>
                  <TableCell>{fNumber(annualSalary)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Monthly Salary</TableCell>
                  <TableCell>{fNumber(monthlySalary)}</TableCell>
                </TableRow>
                {/* Additional rows with zero check */}
              {loan !== 0 && (
                <TableRow>
                  <TableCell>Loan</TableCell>
                  <TableCell>{fNumber(loan)}</TableCell>
                </TableRow>
              )}

              {/* Check for zero before rendering Total Monthly Salary row */}
              {(benefit !== 0 || loan !== 0) && (
                <TableRow>
                  <TableCell>Total Monthly Salary</TableCell>
                  <TableCell>{fNumber(getTotalMonthlySalary())}</TableCell>
                </TableRow>
              )}
                
                <TableRow>
                    <TableCell>Pension</TableCell>
                    <TableCell>{fNumber(pensionFund/12)}</TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default TaxCalculator;
