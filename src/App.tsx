import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProductsListPage from './pages/ProductsListPage';
import CartProductsListPage from './pages/CartProductsListPage';
import NotFoundPage from './pages/NotFoundPage';
import Message from './components/Common/Message';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<Message type='loading' />}>
              <ProductsListPage />
            </Suspense>
          }
        />
        <Route path='/cart' element={<CartProductsListPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
