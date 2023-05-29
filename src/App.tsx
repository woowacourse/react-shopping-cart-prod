import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { ROUTE_PATH } from './constants';
import CartPage from './pages/CartPage';
import GotLost from './pages/GotLost';
import MainPage from './pages/MainPage';

const { MAIN_PAGE, CART_PAGE, ERROR_PAGE } = ROUTE_PATH;

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={MAIN_PAGE} element={<MainPage />} />
          <Route path={CART_PAGE} element={<CartPage />} />
          <Route path={ERROR_PAGE} element={<GotLost />} />
          <Route path='*' element={ERROR_PAGE} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
