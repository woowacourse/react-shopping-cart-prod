import { useRecoilValue } from 'recoil';
import OrderDetail from './OrderDetail';
import orderDetailState from '../../../globalState/atoms/orderDetail';

const OrderDetailLoader = () => {
  const orderDetail = useRecoilValue(orderDetailState);

  return (
    <OrderDetail
      actualPrice={orderDetail.actualPrice}
      cartItems={orderDetail.cartItems}
      deliveryFee={orderDetail.deliveryFee}
      id={orderDetail.id}
      originalPrice={orderDetail.originalPrice}
      showPayments
    />
  );
};

export default OrderDetailLoader;
