import { RecoilRoot } from 'recoil';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import { Cart } from './pages/Cart';
import { Order } from './pages/Order';
export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};
