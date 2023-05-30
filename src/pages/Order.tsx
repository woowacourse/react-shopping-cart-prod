import styled from 'styled-components';
import { Layout } from '../layout';
import { PageTitle } from '../layout/pageTitle/PageTitle';
import { CartItemsSection } from '../components/cartPage/cartItemsSection/CartItemsSection';
import { useRecoilValue } from 'recoil';
import { orderListSelector } from '../recoil/selectors/orderSelector';
import { OrderList } from '../components/orderPage/OrderList';
import { Suspense } from 'react';

export const Order = () => {
  return (
    <Layout>
      <PageTitle>주문 목록</PageTitle>
      <Style.Content>
        <Suspense fallback={<div>Loading...</div>}>
          <OrderList />
        </Suspense>
      </Style.Content>
    </Layout>
  );
};

const Style = {
  Content: styled.div`
    max-width: 1080px;
    height: max-content;

    display: flex;
    gap: 70px;

    margin: 0 auto;

    @media (max-width: 1080px) {
      flex-direction: column;
      align-items: center;
      gap: 0;
    }
  `,
};
