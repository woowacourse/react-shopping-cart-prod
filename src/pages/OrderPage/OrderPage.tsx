import { Suspense } from 'react';

import PageHeading from '../../components/common/PageHeading/PageHeading';
import OrderList from '../../components/order/OrderList/OrderList';
import OrderListFallback from '../../components/order/OrderList/OrderListFallback';

const OrderPage = () => {
  return (
    <>
      <PageHeading>주문 목록</PageHeading>
      <Suspense fallback={<OrderListFallback />}>
        <OrderList />
      </Suspense>
    </>
  );
};

export default OrderPage;
