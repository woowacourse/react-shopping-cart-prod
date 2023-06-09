import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import { Content, Layout } from './components/common/Layout/Layout';
import AsyncBoundary from './components/AsyncBoundary/AsyncBoundary';
import { PAGE_ROUTES } from './constants/routes';
import CartPage from './pages/CartPage/CartPage';
import EndpointRefresher from './components/EndpointRefresher/EndpointRefresher';
import Loading from './components/common/Loading/Loading';
import OrderPage from './pages/OrderPage/OrderPage';
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AsyncBoundary page loadingFallback={<Loading />}>
        <EndpointRefresher>
          <Layout>
            <Routes>
              <Route element={<Content />}>
                <Route index element={<ProductPage />} />
                <Route path={PAGE_ROUTES.CART} element={<CartPage />} />
                <Route path={PAGE_ROUTES.ORDER} element={<OrderPage />} />
                <Route
                  path={PAGE_ROUTES.ORDER_DETAIL}
                  element={<OrderDetailPage />}
                />
              </Route>
            </Routes>
          </Layout>
        </EndpointRefresher>
      </AsyncBoundary>
    </BrowserRouter>
  );
};

export default Router;
