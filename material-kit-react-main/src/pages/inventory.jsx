import { Helmet } from 'react-helmet-async';

import {InventoryView } from 'src/sections/Inventory/view';

// ----------------------------------------------------------------------

export default function InventoryPage() {
  return (
    <>
      <Helmet>
        <title> Inventory | Workfily </title>
      </Helmet>

      <InventoryView />
    </>
  );
}
 