import * as styled from './CartPage.styled';

import { Cart } from './Cart/Cart';
import { OrderSummary } from '../../OrderSummary/OrderSummary';

export const CartPage = () => {
  return (
    <styled.Main>
      <Cart />
      <OrderSummary />
    </styled.Main>
  );
};
