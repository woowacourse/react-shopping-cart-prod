import { styled } from 'styled-components';

import { useOrderList } from '@views/Payment/recoil/orderListState';
import { OrderItem } from '../Order';
import * as S from './OrderList.style'

function OrderList() {
  const orderList = useOrderList();

  // TODO: key
  return (
    <S.WrapperPage>
      {[...orderList].reverse().map((order) => (
        <OrderItem order={order} hasDetail />
      ))}
    </S.WrapperPage>
  );
}

export default OrderList;

