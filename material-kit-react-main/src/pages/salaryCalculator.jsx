import { Helmet } from 'react-helmet-async';

import {SalaryCalculatorView } from 'src/sections/Accounts/views';

// ----------------------------------------------------------------------

export default function SalaryCalculatorPage() {
  return (
    <>
      <Helmet>
        <title> Account  | Workfily </title>
      </Helmet>

      <SalaryCalculatorView/>
    </>
  );
}
 