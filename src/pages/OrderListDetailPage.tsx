import OrderDetailList from '../components/orderDetail/OrderDetailList';
import PaymentsInfo from '../components/orderDetail/PaymentsInfo';
import { OrderListDetailWrapper } from '../style/ContentLayout';

const OrderListDetailPage = () => {
  return (
    <OrderListDetailWrapper>
      <OrderDetailList />
      <PaymentsInfo />
    </OrderListDetailWrapper>
  );
};

export default OrderListDetailPage;
