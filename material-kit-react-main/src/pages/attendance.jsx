import { Helmet } from 'react-helmet-async';

import {AttendanceView } from 'src/sections/Attendance/view';

// ----------------------------------------------------------------------

export default function DepartmentPage() {
  return (
    <>
      <Helmet>
        <title> Attendance| Workfily </title>  
      </Helmet>

      <AttendanceView  />
    </>
  );
}
 