import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from '@components/common/Layout/Layout';
import { Spinner } from '@components/common/Spinner/Spinner';
import { CartPage } from '@components/pages/CartPage/CartPage';
import { Home } from '@components/pages/Home/Home';
import { OrderDetailPage } from '@components/pages/OrderDetailPage/OrderDetailPage';
import { OrdersPage } from '@components/pages/OrdersPage/OrdersPage';

import { PATH } from './constants';

export const Router = () => {
  return (
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
            <Layout pageTitleValue="장바구니">
              <Suspense fallback={<Spinner size="lg" />}>
                <CartPage />
              </Suspense>
            </Layout>
          )}
        />
        <Route
          path={PATH.ORDERS}
          Component={() => (
            <Layout pageTitleValue="주문 목록">
              <Suspense fallback={<Spinner size="lg" />}>
                <OrdersPage />
              </Suspense>
            </Layout>
          )}
        />
        <Route
          path={`${PATH.ORDERS}/:id`}
          Component={() => (
            <Layout pageTitleValue="주문 내역 상세">
              <Suspense fallback={<Spinner size="lg" />}>
                <OrderDetailPage />
              </Suspense>
            </Layout>
          )}
        />
        <Route
          path={'/:notExist'}
          Component={() => (
            <Layout>
              <div>존재하지 않는 페이지 입니다</div>
            </Layout>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};
