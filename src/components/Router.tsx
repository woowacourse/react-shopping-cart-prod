import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Header from './common/header/Header';
import EventPage from './pages/EventPage';
import OrderPage from './pages/OrderPage';
import OrderDetailPage from './pages/OrderDetailPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order/:orderId" element={<OrderDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
