import { RecoilRoot } from 'recoil';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import { Cart } from './pages/Cart';
import { Order } from './pages/Order';
import { OrderDetail } from './pages/OrderDetail';
import { Suspense } from 'react';
import { Layout } from './layout';
import { Loading } from './components/common/Loading';

const LoadingPage = () => {
  return (
    <Layout>
      <Loading width={50} height={50} />
    </Layout>
  );
};

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingPage />}>
                <Main />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<LoadingPage />}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="/order"
            element={
              <Suspense fallback={<LoadingPage />}>
                <Order />
              </Suspense>
            }
          />
          <Route
            path="/orderDetail"
            element={
              <Suspense fallback={<LoadingPage />}>
                <OrderDetail />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};
