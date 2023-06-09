import { useRecoilValue } from 'recoil';
import { ordersSelector } from '../../atoms/orders';
import * as S from './OrderList.styles';
import Order from './Order';

const OrderList = () => {
  const { orders } = useRecoilValue(ordersSelector);

  return (
    <S.List>
      {orders.map((order) => (
        <Order orderId={order.orderId} orderItems={order.orderItems} />
      ))}
    </S.List>
  );
};

export default OrderList;
