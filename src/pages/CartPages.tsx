import { styled } from 'styled-components';
import { Suspense } from 'react';
import CheckedCartListProvider from '../provider/CheckedListProvider';
import CartContents from '../components/cart/CartContents/CartContents';
import LoadingSpinner from '../components/common/LoadingSpinner/LoadingSpinner';

const CartPage = () => {
  return (
    <Layout>
      <Title>장바구니</Title>
      <Suspense
        fallback={
          <Fallback>
            <LoadingSpinner color="#04c09e" />
          </Fallback>
        }
      >
        <CheckedCartListProvider>
          <CartContents />
        </CheckedCartListProvider>
      </Suspense>
    </Layout>
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

const Fallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 200px;
`;

export default CartPage;
