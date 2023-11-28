import { Helmet } from 'react-helmet-async';

import {SalaryCalculatorView } from 'src/sections/Accounts/views';

// ----------------------------------------------------------------------

export default function SalaryCalculatePage() {
  return (
    <>
      <Helmet>
        <title> Accounts | Workfily </title>
      </Helmet>

      <SalaryCalculatorView/>
    </>
  );
}
 