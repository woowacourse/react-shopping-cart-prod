import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import SkeletonCart from '@components/cart/SkeletonCartItemList';
import Layout from '@components/layout/Layout';
import OrderDetailArea from '@components/orders/OrderDetailArea';
import OrderHeader from '@components/orders/OrderHeader';

function OrderDetail() {
  const { orderId } = useParams();

  return (
    <Layout>
      <OrderHeader text="주문 내역 상세" />
      <Suspense fallback={<SkeletonCart />}>
        <OrderDetailArea orderId={Number(orderId)} />
      </Suspense>
    </Layout>
  );
}

export default OrderDetail;
