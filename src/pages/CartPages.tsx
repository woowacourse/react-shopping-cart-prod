import { Suspense } from 'react';
import { styled } from 'styled-components';
import Header from '../components/common/Header/Header';
import CartList from '../components/cart/CartList/CartList';
import PaymentAmount from '../components/cart/PaymentAmount/PaymentAmount';
import CheckedCartListProvider from '../provider/CheckedListProvider';
import EmptyCartSuspense from '../components/cart/EmptyCartSuspense/EmptyCartSuspense';
import LoadingView from '../components/common/LoadingView/LoadingView';

const CartPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <Title>장바구니</Title>
        <Suspense fallback={<LoadingView />}>
          <CheckedCartListProvider>
            <EmptyCartSuspense>
              <Contents>
                <CartList />
                <PaymentAmount />
              </Contents>
            </EmptyCartSuspense>
          </CheckedCartListProvider>
        </Suspense>
      </Layout>
    </>
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

export default CartPage;
