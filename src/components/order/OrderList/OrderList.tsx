import { useRecoilValue } from 'recoil';

import { orderListState } from '../../../store/order';
import OrderItem from '../OrderItem/OrderItem';
import * as S from './OrderList.styles';

const OrderList = () => {
  const orderList = useRecoilValue(orderListState);

  return (
    <S.OrderListContainer>
      {orderList.map((order) => (
        <OrderItem key={order.id} {...order} />
      ))}
    </S.OrderListContainer>
  );
};

export default OrderList;
