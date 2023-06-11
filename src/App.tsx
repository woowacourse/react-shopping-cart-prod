import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { ROUTE_PATH } from './constants';
import CartPage from './pages/CartPage';
import GotLostPage from './pages/GotLostPage';
import MainPage from './pages/MainPage';
import OrderDetailPage from './pages/OrderDetailPage';
import OrderPage from './pages/OrderPage';

const { MAIN_PAGE, CART_PAGE, ERROR_PAGE, ORDER_LIST_PAGE } = ROUTE_PATH;

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={MAIN_PAGE} element={<MainPage />} />
          <Route path={CART_PAGE} element={<CartPage />} />
          <Route path={ORDER_LIST_PAGE} element={<OrderPage />} />
          <Route path={`${ORDER_LIST_PAGE}/:id`} element={<OrderDetailPage />} />
          <Route path={ERROR_PAGE} element={<GotLostPage />} />
          <Route path='*' element={<Navigate replace to={ERROR_PAGE} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
