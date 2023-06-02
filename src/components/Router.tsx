import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Header from './common/header/Header';
<<<<<<< HEAD
import EventPage from './pages/EventPage';
import OrderDetailPage from './pages/Order/OrderDetailPage';
import OrderPage from './pages/Order/OrderPage';
=======
>>>>>>> upstream/hafnium1923

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
<<<<<<< HEAD
        <Route path="/event" element={<EventPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailPage />} />
=======
>>>>>>> upstream/hafnium1923
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
