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
              <Route path='/' element={<ListPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/order' element={<OrderListPage />} />
              <Route path='/order/:orderId' element={<OrderDetailPage />} />
              <Route path='/error' element={<ErrorPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ToastProvider>
    </RecoilRoot>
  );
};

export default App;
