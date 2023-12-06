import { Helmet } from 'react-helmet-async';

import {EmployeeUpdateView } from 'src/sections/employeeUpdate/view';

// ----------------------------------------------------------------------

export default function EmployeeUpdate() {
  return (
    <>
      <Helmet>
        <title> EmployeeUpdate | Workfily </title>
      </Helmet>

      <EmployeeUpdateView />
    </>
  );
}
 