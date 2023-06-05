import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProductsListPage from './pages/ProductsListPage';
import CartItemsListPage from './pages/CartItemsListPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './Layout';
import OrderProductsListPage from './pages/OrderProductsListPage';
import OrderProductDetailPage from './pages/OrderProductDetailPage';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Suspense>
        <Layout>
          <Routes>
            <Route
              path='/'
              element={
                <Suspense>
                  <ProductsListPage />
                </Suspense>
              }
            />
            <Route path='/cart' element={<CartItemsListPage />} />
            <Route path='/order' element={<OrderProductsListPage />} />
            <Route
              path='/order/:orderId'
              element={<OrderProductDetailPage />}
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
