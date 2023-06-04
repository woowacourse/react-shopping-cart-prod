import { Suspense } from 'react';
import SkeletonCart from '@components/cart/SkeletonCartItemList';
import Layout from '@components/layout/Layout';
import OrderHeader from '@components/orders/OrderHeader';
import OrderItemList from '@components/orders/OrderItemList';

function Orders() {
  return (
    <Layout>
      <OrderHeader text="주문 목록" />
      <Suspense fallback={<SkeletonCart />}>
        <OrderItemList />
      </Suspense>
    </Layout>
  );
}

export default Orders;
