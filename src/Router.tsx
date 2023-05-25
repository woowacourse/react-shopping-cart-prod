import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import { Content, Layout } from './components/common/Layout/Layout';
import AsyncBoundary from './components/AsyncBoundary/AsyncBoundary';
import { PAGE_ROUTES } from './constants/routes';
import CartPage from './pages/CartPage/CartPage';
import EndpointRefresher from './components/EndpointRefresher/EndpointRefresher';

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AsyncBoundary page loadingFallback={<h1>Loading...</h1>}>
        <EndpointRefresher>
          <Layout>
            <Routes>
              <Route element={<Content />}>
                <Route index element={<ProductPage />} />
                <Route path={PAGE_ROUTES.CART} element={<CartPage />} />
              </Route>
            </Routes>
          </Layout>
        </EndpointRefresher>
      </AsyncBoundary>
    </BrowserRouter>
  );
};

export default Router;
