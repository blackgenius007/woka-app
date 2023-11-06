import { Helmet } from 'react-helmet-async';

import { NewEmployeeView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function NewEmployeePage() {
  return (
    <>
      <Helmet>
        <title> New Employee Form | Workfily </title>
      </Helmet>

      <NewEmployeeView/>
    </>
  );
}









// import { Helmet } from 'react-helmet-async';
// import {EmployeeView } from 'src/sections/humanResource/view';

// // ----------------------------------------------------------------------

// export default function NewEmployeePage() {
//   return (
//     <>
//       <Helmet>
//         <title> New Employee | Workfily </title>
//       </Helmet>

//       <EmployeeView />
//     </>
//   );
// }
  