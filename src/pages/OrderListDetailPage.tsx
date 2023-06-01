import OrderDetailList from '../components/orderDetail/OrderDetailList';
import PaymentsInfo from '../components/orderDetail/PaymentsInfo';
import { orderDetails } from '../data/mockData';
import { OrderListDetailWrapper } from '../style/ContentLayout';

const OrderListDetailPage = () => {
  return (
    <OrderListDetailWrapper>
      <OrderDetailList />
      {orderDetails.map((items) => (
        <PaymentsInfo key={items.orderId} orderTotalPrice={items.orderTotalPrice} />
      ))}
    </OrderListDetailWrapper>
  );
};

export default OrderListDetailPage;
