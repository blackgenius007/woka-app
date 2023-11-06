import { Helmet } from 'react-helmet-async';

import { NewEmployeeFormView} from 'src/sections/newEmployee/view';

// ----------------------------------------------------------------------

export default function NewEmployeePage() {
  return (
    <>
      <Helmet>
        <title> New Employee Form | Workfily </title>
      </Helmet>

      < NewEmployeeFormView/>
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
  