








import { Helmet } from 'react-helmet-async';

import {AccountsView } from 'src/sections/accounts/view';

// ----------------------------------------------------------------------

export default function EmployeePage() {
  return (
    <>
      <Helmet>
        <title> Work Force | Workfily </title>
      </Helmet>

      <AccountsView />
    </>
  );
}
// import React from 'react';

// const Welcome = () => {
//     return (
//       <div>
//       Accounts
//       </div>
//     );
//   }
  
//   export default Welcome;
  