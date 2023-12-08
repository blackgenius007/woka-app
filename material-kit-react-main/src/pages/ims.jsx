import { Helmet } from 'react-helmet-async';

import {IMSView } from 'src/sections/IMS/view';

// ----------------------------------------------------------------------

export default function IMSPage() {
  return (
    <>
      <Helmet>
        <title> IMS | Workfily </title>
      </Helmet>

      <IMSView />
    </>
  );
}
 