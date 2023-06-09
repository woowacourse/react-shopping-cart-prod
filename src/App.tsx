import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProductsListPage from './pages/ProductsListPage';
import CartItemListPage from './pages/CartItemListPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './Layout';
import OrderItemListPage from './pages/OrderItemListPage';
import OrderItemDetailPage from './pages/OrderItemDetailPage';

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
            <Route path='/cart' element={<CartItemListPage />} />
            <Route path='/order' element={<OrderItemListPage />} />
            <Route path='/order/:orderId' element={<OrderItemDetailPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
