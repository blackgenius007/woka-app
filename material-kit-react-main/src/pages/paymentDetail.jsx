import { Helmet } from 'react-helmet-async';

import {PaymentDetailView } from 'src/sections/paymentDetail/view';

// ----------------------------------------------------------------------

export default function PaymentDetailPage() {
  return (
    <>
      <Helmet>
        <title> PaymentDetail | Workfily </title>
      </Helmet>

      <PaymentDetailView />
    </>
  );
}
 