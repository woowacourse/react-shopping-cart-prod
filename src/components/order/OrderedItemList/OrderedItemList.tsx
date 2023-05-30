import { useRecoilValue } from 'recoil';

import { orderListState } from '../../../store/order';
import { OrderedItem } from '../OrderedItem/OrderedItem';
import * as S from './OrderedItemList.styles';

type Props = {};

export const OrderedItemList = ({}: Props) => {
  const orderList = useRecoilValue(orderListState);

  return (
    <S.OrderListContainer>
      {orderList.map((orderItem) => (
        <S.OrderedItemWrapper>
          <OrderedItem key={orderItem.id} {...orderItem} />
        </S.OrderedItemWrapper>
      ))}
    </S.OrderListContainer>
  );
};
