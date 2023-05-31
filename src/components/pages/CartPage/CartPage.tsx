import * as styled from './CartPage.styled';

import { Cart } from './Cart/Cart';
import { OrderSummary } from '../../OrderSummary/OrderSummary';
import { PageTitle } from '../../styled/PageTitle';

export const CartPage = () => {
  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <styled.Content>
        <Cart />
        <OrderSummary />
      </styled.Content>
    </>
  );
};
