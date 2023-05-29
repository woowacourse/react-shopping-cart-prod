import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '@Components/PageTitle';

import OrderItems from './OrderItems';
import OrderListLoading from './OrderListLoading';

function OrderList() {
  const { orderId } = useParams() as { orderId?: number };

  const pageTitle = orderId ? '주문 내역 상세' : '주문 목록';

  return (
    <>
      <PageTitle title={pageTitle} />
      <Suspense fallback={<OrderListLoading />}>
        <OrderItems />
      </Suspense>
    </>
  );
}

export default OrderList;
