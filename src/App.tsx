import { useEffect } from 'react';
import GlobalStyle from './GlobalStyle';

import { useCartRepository } from '@recoils/cartAtoms';
import { Router } from './router';

export const App = () => {
  const { fetchCartItems } = useCartRepository();

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
};
