import { lazy, Suspense } from 'react';
import { styled } from 'styled-components';

import { Cart } from '../cart/Cart';
import { Layout } from '../common/Layout';
import SmallLoader from '../SmallLoader';

const OrderSummary = lazy(() => import('../order/OrderSummary'));

const ShoppingCart = () => {
  return (
    <Layout>
      <Style.ShoppingCartWrapper>
        <Style.PageTitle>장바구니</Style.PageTitle>
        <Style.Main>
          <Cart />
          <Suspense fallback={<SmallLoader />}>
            <OrderSummary />
          </Suspense>
        </Style.Main>
      </Style.ShoppingCartWrapper>
    </Layout>
  );
};

const Style = {
  ShoppingCartWrapper: styled.div`
    width: 100%;
    padding: 0 10%;

    margin-bottom: 140px;
  `,

  PageTitle: styled.div`
    width: 100%;
    text-align: center;

    margin-bottom: 30px;
    padding: 0 0 30px 0;

    font-size: 32px;
    font-weight: 700;

    border-bottom: 4px solid var(--grey-400);

    @media screen and (max-width: 500px) {
      font-size: 20px;
      padding: 16px 0;
    }
  `,

  Main: styled.div`
    display: flex;

    @media screen and (max-width: 1100px) {
      flex-direction: column;
      align-items: center;
    }

    @media screen and (min-width: 501px) {
      justify-content: space-between;
    }

    @media screen and (max-width: 500px) {
      font-size: 20px;

      margin-bottom: 80px;
    }
  `,
};

export default ShoppingCart;
