import { PageTitle } from '../../styled/PageTitle';
import { OrderBox } from '../../OrderBox/OrderBox';

import * as styled from './OrdersPage.styled';

export const OrdersPage = () => {
  return (
    <>
      <PageTitle>주문 목록</PageTitle>
      <styled.OrdersList>
        <OrderBox />
        <OrderBox />
      </styled.OrdersList>
    </>
  );
};
