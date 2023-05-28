import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import PageHeading from '../../components/common/PageHeading/PageHeading';
import OrderDetail from '../../components/order/OrderDetailList/OrderDetailList';
import OrderDetailListFallback from '../../components/order/OrderDetailList/OrderDetailListFallback';

const OrderDetailPage = () => {
  const { orderId } = useParams();

  return (
    <>
      <PageHeading>주문 내역 상세</PageHeading>
      <Suspense fallback={<OrderDetailListFallback />}>
        <OrderDetail orderId={Number(orderId)} />
      </Suspense>
    </>
  );
};

export default OrderDetailPage;
