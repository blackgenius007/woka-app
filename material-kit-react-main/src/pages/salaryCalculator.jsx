import { Helmet } from 'react-helmet-async';

import {SalaryCalaulatorView } from 'src/sections/Accounts/views';

// ----------------------------------------------------------------------

export default function SalaryCalculatePage() {
  return (
    <>
      <Helmet>
        <title> Accounts | Workfily </title>
      </Helmet>

      <SalaryCalaulatorView/>
    </>
  );
}
 