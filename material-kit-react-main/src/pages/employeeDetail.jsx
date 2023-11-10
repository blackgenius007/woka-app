import { Helmet } from 'react-helmet-async';

import {EmployeeDetailView } from 'src/sections/employeeDetail/view';

// ----------------------------------------------------------------------

export default function EmployeeDetailPage() {
  return (
    <>
      <Helmet>
        <title> Employee Details | Workfily </title>
      </Helmet>

      <EmployeeDetailView />
    </>
  );
}
 