import { RecoilRoot } from 'recoil';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import { Cart } from './pages/Cart';
import { Order } from './pages/Order';
import { OrderDetail } from './pages/OrderDetail';
import { OrderSuccess } from './pages/OrderSuccess';
export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/orders-success" element={<OrderSuccess />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};
