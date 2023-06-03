import * as styled from './CartPage.styled';

import { Cart } from './Cart/Cart';
import { OrderSummary } from '../../OrderSummary/OrderSummary';

import { useCartRepository } from '@recoils/cartAtoms';
import { useEffect } from 'react';

export const CartPage = () => {
  const { fetchCart } = useCartRepository();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <styled.Main>
      <Cart />
      <OrderSummary />
    </styled.Main>
  );
};
