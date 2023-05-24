import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProductsListPage from './pages/ProductsListPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import Toast from './components/Common/Toast';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path='/' element={<ProductsListPage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
