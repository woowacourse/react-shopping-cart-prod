import { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';

import { Layout } from '@components/common/Layout/Layout';
import { Home } from '@components/pages/Home/Home';
import { CartPage } from '@components/pages/CartPage/CartPage';
import { OrdersPage } from '@components/pages/OrdersPage/OrdersPage';
import { OrderDetailPage } from '@components/pages/OrderDetailPage/OrderDetailPage';

import { PATH } from '@constants/index';

import { Spinner } from '@components/common/Spinner/Spinner';

import { useCartRepository } from '@recoils/cartAtoms';

export const App = () => {
  const { fetchCart } = useCartRepository();

  useEffect(() => {
    fetchCart();
  }, []);

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
                <Suspense fallback={<Spinner size="lg" />}>
                  <OrdersPage />
                </Suspense>
              </Layout>
            )}
          />
          <Route
            path={`${PATH.ORDERS}/:id`}
            Component={() => (
              <Layout pageTitle="주문 내역 상세">
                <Suspense fallback={<Spinner size="lg" />}>
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
