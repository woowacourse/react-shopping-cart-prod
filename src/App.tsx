import { Suspense, useEffect } from 'react';
import { Await, BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';

import { Layout } from '@components/common/Layout/Layout';
import { Home } from '@components/pages/Home/Home';
import { CartPage } from '@components/pages/CartPage/CartPage';
import { OrdersPage } from '@components/pages/OrdersPage/OrdersPage';
import { OrderDetailPage } from '@components/pages/OrderDetailPage/OrderDetailPage';

import { useSetCartState } from './recoils/recoilCart';
import { useApiBaseUrlValue } from '@recoils/recoilApiBaseUrl';

import { useQuery } from './hooks/useQuery';

import { FETCH_URL, PATH } from '@constants/index';

import type { CartItem } from './types';
import { Spinner } from '@components/common/Spinner/Spinner';

export const App = () => {
  const baseUrl = useApiBaseUrlValue();
  const { data: cart } = useQuery<CartItem[]>(baseUrl + FETCH_URL.CART_ITEMS, {
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
                <Suspense fallback={<Spinner />}>
                  <OrdersPage />
                </Suspense>
              </Layout>
            )}
          />
          <Route
            path={`${PATH.ORDERS}/:id`}
            Component={() => (
              <Layout pageTitle="주문 내역 상세">
                <Suspense fallback={<Spinner />}>
                  <OrderDetailPage />
                </Suspense>
              </Layout>
            )}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
