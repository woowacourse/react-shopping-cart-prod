import styled from 'styled-components';
import { Layout } from '../layout';
import { PageTitle } from '../layout/pageTitle/PageTitle';
import { OrderItemSection } from '../components/orderPage/OrderItemSection';
import { Suspense } from 'react';

export const Order = () => {
  return (
    <Layout>
      <PageTitle>주문 목록</PageTitle>
      <Style.Content>
        <Suspense fallback={<div>Loading...</div>}>
          <OrderItemSection />
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
    justify-content: center;
    gap: 70px;

    margin: 0 auto;
  `,
};
