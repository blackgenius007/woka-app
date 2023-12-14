import { Helmet } from 'react-helmet-async';

import {PortalView } from 'src/sections/portalAccess/view';

// ----------------------------------------------------------------------

export default function PortalPage() {
  return (
    <>
      <Helmet>
        <title> Portal Access | Workfily </title>
      </Helmet>

      <PortalView/>
    </>
  );
}
 