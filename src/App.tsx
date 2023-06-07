import ResetStyle from './styles/ResetStyle.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';
import Header from './components/Header/Header.tsx';
import Layout from './components/@common/Layout/Layout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage/ListPage.tsx';
import { RecoilRoot } from 'recoil';
import CartPage from './pages/CartPage/CartPage.tsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import ToastProvider from './providers/toast/ToastProvider.tsx';
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage.tsx';
import OrderListPage from './pages/OrderListPage/OrderListPage.tsx';
import Modal from './components/@common/Modal/Modal.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import ROUTES from './constants/ROUTES.ts';

const App = () => {
  return (
    <RecoilRoot>
      <ResetStyle />
      <GlobalStyle />
      <ToastProvider>
        <BrowserRouter>
          <Header />
          <Layout>
            <Routes>
              <Route path={ROUTES.LIST} element={<ListPage />} />
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.CART} element={<CartPage />} />
              <Route path={ROUTES.ORDER} element={<OrderListPage />} />
              <Route path={`${ROUTES.ORDER}/:orderId`} element={<OrderDetailPage />} />
              <Route path={ROUTES.ERROR} element={<ErrorPage />} />
            </Routes>
          </Layout>
          <Modal />
        </BrowserRouter>
      </ToastProvider>
    </RecoilRoot>
  );
};

export default App;
