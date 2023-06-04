import { useEffect } from 'react';
import GlobalStyle from './GlobalStyle';

import { useCartRepository } from '@recoils/cartAtoms';
import { Router } from './router';

export const App = () => {
  const { fetchCart } = useCartRepository();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};
