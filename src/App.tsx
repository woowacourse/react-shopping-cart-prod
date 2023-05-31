import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useSetCartState } from './recoils/recoilCart';
import { useQuery } from './hooks/useQuery';

import GlobalStyle from './GlobalStyle';

import { useApiBaseUrlValue } from './recoils/recoilApiBaseUrl';

import { Layout } from './components/common/Layout/Layout';
import { Home } from './components/pages/Home/Home';
import { CartPage } from './components/pages/CartPage/CartPage';
import { OrdersPage } from './components/pages/OrdersPage/OrdersPage';
import { OrderDetailPage } from './components/pages/OrderDetailPage/OrderDetailPage';

import { FETCH_URL, PATH } from './constants';

import { type CartItemType } from './types';

export const App = () => {
  const baseUrl = useApiBaseUrlValue();
  const { data: cart } = useQuery<CartItemType[]>(baseUrl + FETCH_URL.CART_ITEMS, {
    Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
  });

  const setCartState = useSetCartState();

  useEffect(() => {
    if (!cart) return;

    setCartState(cart);
  }, [cart, setCartState]);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path={PATH.HOME}
            Component={() => (
              <Layout>
                <Home />
              </Layout>
            )}
          />
          <Route
            path={PATH.CART}
            Component={() => (
              <Layout pageTitle="장바구니">
                <CartPage />
              </Layout>
            )}
          />
          <Route
            path={PATH.ORDERS}
            Component={() => (
              <Layout pageTitle="주문 목록">
                <OrdersPage />
              </Layout>
            )}
          />
          <Route
            path={`${PATH.ORDERS}/:id`}
            Component={() => (
              <Layout pageTitle="주문 내역 상세">
                <OrderDetailPage />
              </Layout>
            )}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
