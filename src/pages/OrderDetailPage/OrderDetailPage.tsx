import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

import PageHeading from '../../components/common/PageHeading/PageHeading';
import OrderDetailList from '../../components/order/OrderDetailList/OrderDetailList';
import OrderDetailListFallback from '../../components/order/OrderDetailList/OrderDetailListFallback';
import OrderDetailPurchaseInformation from '../../components/order/OrderDetailPurchaseInformation/OrderDetailPurchaseInformation';

const OrderDetailPage = () => {
  const { orderId } = useParams();

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
