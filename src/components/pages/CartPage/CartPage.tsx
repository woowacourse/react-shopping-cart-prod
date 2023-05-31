import * as styled from './CartPage.styled';

import { OrderSummary } from '../../OrderSummary/OrderSummary';
import { Cart } from './Cart/Cart';

export const CartPage = () => {
  return (
    <styled.Main>
      <Cart />
      <OrderSummary />
    </styled.Main>
  );
};
