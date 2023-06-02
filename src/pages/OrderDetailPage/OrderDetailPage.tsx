import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import PageHeading from '../../components/common/PageHeading/PageHeading';
import OrderDetailList from '../../components/orderDetail/OrderDetailList/OrderDetailList';
import OrderDetailListFallback from '../../components/orderDetail/OrderDetailList/OrderDetailListFallback';
import OrderDetailPurchaseInformation from '../../components/orderDetail/OrderDetailPurchaseInformation/OrderDetailPurchaseInformation';
import { useScrollToTop } from '../../hooks/common/useScrollToTop';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  useScrollToTop();

  return (
    <>
      <PageHeading>주문 내역 상세</PageHeading>
      <Suspense fallback={<OrderDetailListFallback />}>
        <OrderDetailList orderId={Number(orderId)} />
        <OrderDetailPurchaseInformation orderId={Number(orderId)} />
      </Suspense>
    </>
  );
};

export default OrderDetailPage;
