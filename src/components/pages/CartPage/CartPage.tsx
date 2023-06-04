import * as styled from './CartPage.styled';

import { Cart } from './Cart/Cart';
import { OrderSummary } from '../../OrderSummary/OrderSummary';

import { useCartRepository } from '@recoils/cartAtoms';
import { Suspense, useEffect } from 'react';
import { Spinner } from '@components/common/Spinner/Spinner';

export const CartPage = () => {
  const { fetchCartItems } = useCartRepository();

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <styled.Main>
      <Cart />
      <Suspense fallback={<Spinner size="lg" />}>
        <OrderSummary fetchCartItems={fetchCartItems} />
      </Suspense>
    </styled.Main>
  );
};
