import { Suspense } from 'react';
import { styled } from 'styled-components';
import Header from '../components/common/Header/Header';
import CartList from '../components/cart/CartList/CartList';
import PaymentAmount from '../components/cart/PaymentAmount/PaymentAmount';
import CheckedCartListProvider from '../provider/CheckedListProvider';
import LoadingSpinner from '../components/common/LoadingSpinner/LoadingSpinner';

const CartPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <Title>장바구니</Title>
        <Suspense fallback={<LoadingView />}>
          <CheckedCartListProvider>
            <Contents>
              <CartList />
              <PaymentAmount />
            </Contents>
          </CheckedCartListProvider>
        </Suspense>
      </Layout>
    </>
  );
};

const LoadingView = () => {
  return (
    <LoadingViewWrapper>
      <LoadingSpinner color="#06c09e" />
    </LoadingViewWrapper>
  );
};

const Layout = styled.main`
  width: 1320px;

  margin: 0 auto;
  padding: 80px 0;

  @media screen and (max-width: 1320px) {
    width: 90%;
  }
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 32px;

  padding: 30px 0;
  border-bottom: 4px solid #333333;

  text-align: center;
`;

const Contents = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 34px;

  @media screen and (max-width: 1320px) {
    flex-direction: column;
    justify-content: baseline;
    gap: 100px;
  }
`;

const LoadingViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 200px;
`;

export default CartPage;
