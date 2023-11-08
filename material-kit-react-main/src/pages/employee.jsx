import { Helmet } from 'react-helmet-async';

import {EmployeeView } from 'src/sections/humanResource/view';

// ----------------------------------------------------------------------

export default function EmployeePage() {
  return (
    <>
      <Helmet>
        <title> Work Force | Workfily </title>
      </Helmet>

      <EmployeeView />
    </>
  );
}
 