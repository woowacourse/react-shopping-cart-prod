import { Suspense } from 'react';

import OrderItems from './OrderItems';
import OrderListLoading from './OrderListLoading';

function OrderList() {
  return (
    <>
      <Suspense fallback={<OrderListLoading />}>
        <OrderItems />
      </Suspense>
    </>
  );
}

export default OrderList;
