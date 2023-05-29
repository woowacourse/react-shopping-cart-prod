import { Suspense } from 'react';

import PageTitle from '@Components/PageTitle';

import OrderItems from './OrderItems';

function OrderList() {
  return (
    <>
      <PageTitle title="주문 목록" />
      <Suspense fallback={<div>로딩중..</div>}>
        <OrderItems />
      </Suspense>
    </>
  );
}

export default OrderList;
