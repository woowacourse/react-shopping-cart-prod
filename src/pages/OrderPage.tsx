import OrderList from '../components/order/OrderList';
import { OrderListWrapper } from '../style/ContentLayout';

const OrderPage = () => {
  return (
    <OrderListWrapper>
      <OrderList />
    </OrderListWrapper>
  );
};

export default OrderPage;
