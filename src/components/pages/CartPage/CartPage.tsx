import { Suspense, useEffect } from 'react';
import * as styled from './CartPage.styled';
import { ErrorBoundary } from 'react-error-boundary';

import { Cart } from './Cart/Cart';
import { OrderSummary } from '../../OrderSummary/OrderSummary';

import { OrderSummarySkeleton } from '@components/OrderSummary/OrderSummarySkeleton/OrderSummarySkeleton';
import { FallbackRender } from '@components/FallbackRender/FallbackRender';

import { useCartRepository } from '@recoils/cartAtoms';
import { useRecoilCallback } from 'recoil';
import { usablePointSelector } from '@recoils/usablePointAtoms';

export const CartPage = () => {
  const { fetchCartItems } = useCartRepository();
  const refreshUsablePoint = useRecoilCallback(({ refresh }) => () => {
    refresh(usablePointSelector);
  });

  useEffect(() => {
    fetchCartItems();
    refreshUsablePoint();
  }, [fetchCartItems, refreshUsablePoint]);

  return (
    <styled.Main>
      <Cart />
      <ErrorBoundary fallbackRender={FallbackRender}>
        <Suspense fallback={<OrderSummarySkeleton />}>
          <OrderSummary fetchCartItems={fetchCartItems} />
        </Suspense>
      </ErrorBoundary>
    </styled.Main>
  );
};
