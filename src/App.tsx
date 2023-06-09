import { RecoilRoot } from 'recoil';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import { Cart } from './pages/Cart';
import { OrderList } from './pages/OrderList';
import { OrderDetail } from './pages/OrderDetail';
import { Suspense } from 'react';
import { Layout } from './layout';
import { Loading } from './components/common/Loading';
import styled from 'styled-components';

const Style = {
  LoadingContainer: styled.div`
    width: 100vw;
    height: calc(100vh - 100px);

    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const LoadingPage = () => {
  return (
    <Layout>
      <Style.LoadingContainer>
        <Loading width={50} height={50} />
      </Style.LoadingContainer>
    </Layout>
  );
};

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/orderDetail" element={<OrderDetail />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  );
};
