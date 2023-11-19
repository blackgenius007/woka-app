 /* eslint-disable */
import React from 'react';
import TaxCalculator from './taxCalculator';


const PaymentBreakdown = ({location,grossIncome,healthCare}) => {
   // Calculate basic salary (15% of gross income)
 const basicSalary = 0.15 * grossIncome;

console.log('payment=>',grossIncome,location)
console.log('healthCare=>', healthCare)
// const country = 'Nigeria';
// const grossIncome =1200000; // Example gross income provided by the user
const Benefits=0;
const Loan = 0


const getPensionFund = (grossIncome) => {
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
 

// const consolidatedSalary = getConsolidatedSalary(grossIncome,healthCare);
 
const cra =  200000+20/100*grossIncome;

// const chargeableIncome = (grossIncome,cra) => {
 
//  const taxable=grossIncome-pensionFund-healthCare-cra

//   return taxable;
// };

// Tax exemption values and tax bands specific to each country
let taxExemptItems = {};
let taxBands = [];

if (location === 'Nigeria') {
  taxExemptItems = {
    nationalHousingFund: 0,
    nationalHealthInsurance: 0,
    lifeAssurancePremium: 0,
    nationalPensionScheme: 0,
  };

  taxBands = [
    { threshold: 300000, rate: 0.07 },
    { threshold: 600000, rate: 0.11 },
    { threshold: 1100000, rate: 0.15 },
    { threshold: 1600000, rate: 0.19 },
    { threshold: 3200000, rate: 0.21 },
    { threshold: Infinity, rate: 0.24 },
  ];
} else if (location === 'Ghana') {
  taxExemptItems = {
    nationalHousingFund: 0, // Add Ghana-specific value if applicable
    nationalHealthInsurance: 0, // Add Ghana-specific value if applicable
    lifeAssurancePremium: 0, // Add Ghana-specific value if applicable
    nationalPensionScheme: 0, // Add Ghana-specific value if applicable
  };

  taxBands = [
    // Add tax bands specific to Ghana
  ];
} else {
  // Default tax exemption values and tax bands for other countries
  taxExemptItems = {
    nationalHousingFund: 0,
    nationalHealthInsurance: 0,
    lifeAssurancePremium: 0,
    nationalPensionScheme: 0,
  };

  taxBands = [
    // Default tax bands for other countries
  ];
}

const pensionFund  = getPensionFund(grossIncome)
 
console.log()

  return (
    <div>
      <TaxCalculator
        // consolidatedSalary={consolidatedSalary}
        cra={cra}
        taxBands={taxBands}
        taxExemptItems={taxExemptItems}
        benefit={Benefits}
        grossIncome={grossIncome}
        loan={Loan}
        pensionFund={pensionFund}
        basicSalary={basicSalary}
        healthCare={healthCare}
        
      />
    </div>
  );
};

export default PaymentBreakdown ;
 