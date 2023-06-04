import OrderDetailList from '../components/orderDetail/OrderDetailList';
import PaymentsInfo from '../components/orderDetail/PaymentsInfo';
import { Wrapper } from '../style/ContentLayout';

const OrderListDetailPage = () => {
  return (
    <Wrapper>
      <OrderDetailList />
      <PaymentsInfo />
    </Wrapper>
  );
};

export default OrderListDetailPage;
