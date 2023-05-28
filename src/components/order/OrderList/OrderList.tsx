import { useRecoilValue } from 'recoil';

import { orderListState } from '../../../store/order';
import OrderItem from '../OrderItem/OrderItem';
import * as S from './OrderList.styles';

const OrderList = () => {
  const orderList = useRecoilValue(orderListState);

  return (
    <S.OrderListContainer>
      {orderList.map((orderItem) => (
        <OrderItem key={orderItem.id} {...orderItem} />
      ))}
    </S.OrderListContainer>
  );
};

export default OrderList;
