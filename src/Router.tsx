import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import { Content, Layout } from './components/common/Layout/Layout';
import AsyncBoundary from './components/AsyncBoundary/AsyncBoundary';
import { PAGE_ROUTES } from './constants/routes';
import CartPage from './pages/CartPage/CartPage';
import { PropsWithChildren, useEffect } from 'react';
import { cartState, endpointKeyState } from './atoms/cart';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { authFetchQuery, fetchQuery } from './apis/api';
import { ENDPOINT } from './constants/auth';
import { products } from './atoms/products';

const EndPointRefresher = ({ children }: PropsWithChildren) => {
  const endpointKey = useRecoilValue(endpointKeyState);
  const refreshCart = useRecoilRefresher_UNSTABLE(cartState);
  const refreshProducts = useRecoilRefresher_UNSTABLE(products);

  useEffect(() => {
    fetchQuery.updateDefaultConfig({ baseURL: ENDPOINT[endpointKey] });
    authFetchQuery.updateDefaultConfig({ baseURL: ENDPOINT[endpointKey] });
    refreshCart();
    refreshProducts();
  }, [endpointKey]);

  return <>{children}</>;
};

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AsyncBoundary page loadingFallback={<h1>Loading...</h1>}>
        <EndPointRefresher>
          <Layout>
            <Routes>
              <Route element={<Content />}>
                <Route index element={<ProductPage />} />
                <Route path={PAGE_ROUTES.CART} element={<CartPage />} />
              </Route>
            </Routes>
          </Layout>
        </EndPointRefresher>
      </AsyncBoundary>
    </BrowserRouter>
  );
};

export default Router;
