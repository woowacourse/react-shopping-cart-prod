import ResetStyle from './styles/ResetStyle.tsx';
import GlobalStyle from './styles/GlobalStyle.tsx';
import Header from './components/Header/Header.tsx';
import Layout from './components/@common/Layout/Layout.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import ToastProvider from './providers/toast/ToastProvider.tsx';
import Modal from './components/@common/Modal/Modal.tsx';
import ROUTES from './constants/ROUTES.ts';
import { ListPage, CartPage, ErrorPage, OrderDetailPage, OrderListPage, LoginPage, NotFoundPage } from './pages';

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
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Layout>
          <Modal />
        </BrowserRouter>
      </ToastProvider>
    </RecoilRoot>
  );
};

export default App;
