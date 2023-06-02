import { styled } from 'styled-components';

import { useOrderList } from '@views/Payment/recoil/orderListState';
import { OrderItem } from '../Order';

function OrderList() {
  const orderList = useOrderList();

  return (
    <WrapperPage>
      {[...orderList].reverse().map((order) => (
        <OrderItem order={order} hasDetail />
      ))}
    </WrapperPage>
  );
}

export default OrderList;

const WrapperPage = styled.main`
  display: flex;
  flex-direction: column;
`;
