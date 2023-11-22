import { Helmet } from 'react-helmet-async';

import {DepartmentView } from 'src/sections/Departments/view';

// ----------------------------------------------------------------------

export default function DepartmentPage() {
  return (
    <>
      <Helmet>
        <title> Department | Workfily </title>  
      </Helmet>

      <DepartmentView />
    </>
  );
}
 