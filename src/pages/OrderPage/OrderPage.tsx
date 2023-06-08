import { Suspense } from 'react';
import OrderList from '../../components/OrderPage/OrderList';

const OrderPage = () => {
  return (
    <main>
      <Suspense>
        <OrderList />
      </Suspense>
    </main>
  );
};

export default OrderPage;
