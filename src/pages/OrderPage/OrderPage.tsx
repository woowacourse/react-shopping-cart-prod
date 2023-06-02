import { Suspense } from 'react';

import PageHeading from '../../components/common/PageHeading/PageHeading';
import OrderList from '../../components/order/OrderList/OrderList';
import OrderListFallback from '../../components/order/OrderList/OrderListFallback';
import { useScrollToTop } from '../../hooks/common/useScrollToTop';

const OrderPage = () => {
  useScrollToTop();

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
