import { useRecoilValue } from 'recoil';

import { orderListState } from '../../../store/order';
import { OrderedItem } from '../OrderedItem/OrderedItem';
import * as S from './OrderedItemList.styles';

export const OrderedItemList = () => {
  const orderList = useRecoilValue(orderListState);

  return (
    <S.OrderListContainer>
      {orderList.map((orderItem) => (
        <S.OrderedItemWrapper key={orderItem.id}>
          <OrderedItem {...orderItem} />
        </S.OrderedItemWrapper>
      ))}
    </S.OrderListContainer>
  );
};
