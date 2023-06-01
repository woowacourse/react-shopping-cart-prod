import Layout from '@components/layout/Layout';
import OrderHeader from '@components/orders/OrderHeader';
import OrderItemList from '@components/orders/OrderItemList';
import { MOCK_ORDER_LIST } from '@mocks/handlers';

function Orders() {
  const orders = MOCK_ORDER_LIST;
  return (
    <Layout>
      <div>
        <OrderHeader text="주문 목록" />
        <OrderItemList orders={orders} />
      </div>
    </Layout>
  );
}

export default Orders;
