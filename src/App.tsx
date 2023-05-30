import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PageLayout from './pages/PageLayout';
import ProductsListPage from './pages/ProductsListPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import OrderListPage from './pages/OrderListPage';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path='/' element={<ProductsListPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='orders' element={<OrderListPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
