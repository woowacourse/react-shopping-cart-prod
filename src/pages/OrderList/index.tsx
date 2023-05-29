import { Suspense } from 'react';

import PageTitle from '@Components/PageTitle';

import OrderItems from './OrderItems';
import OrderListLoading from './OrderListLoading';

function OrderList() {
  return (
    <>
      <PageTitle title="주문 목록" />
      <Suspense fallback={<OrderListLoading />}>
        <OrderItems />
      </Suspense>
    </>
  );
}

export default OrderList;
