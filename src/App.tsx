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
import routes from './constants/routes.ts';

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
              <Route path={routes.list} element={<ListPage />} />
              <Route path={routes.login} element={<LoginPage />} />
              <Route path={routes.cart} element={<CartPage />} />
              <Route path={routes.order} element={<OrderListPage />} />
              <Route path={`${routes.order}/:orderId`} element={<OrderDetailPage />} />
              <Route path={routes.error} element={<ErrorPage />} />
            </Routes>
          </Layout>
          <Modal />
        </BrowserRouter>
      </ToastProvider>
    </RecoilRoot>
  );
};

export default App;
