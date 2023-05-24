import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTE_PATH } from './constants';
import CartPage from './pages/CartPage';
import MainPage from './pages/MainPage';

const { MAIN_PAGE, CART_PAGE } = ROUTE_PATH;

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path={MAIN_PAGE} element={<MainPage />} />
        <Route path={CART_PAGE} element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
