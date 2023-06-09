import { useParams } from 'react-router-dom';
import OrderList from '../components/OrderList';
import OrderPrice from '../components/OrderPrice';
import AwaitRecoilState from '../components/utils/AwaitRecoilState';
import { orderDetailState } from '../recoil/atoms/orderState';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  return (
    <>
      <AwaitRecoilState state={orderDetailState(orderId)}>
        {(orderDetail) => <OrderList orderList={orderDetail} />}
      </AwaitRecoilState>
      <OrderPrice />
    </>
  );
};

export default OrderDetailPage;
