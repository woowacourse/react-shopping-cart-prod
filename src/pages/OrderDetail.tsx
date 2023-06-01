import styled from 'styled-components';
import { Layout } from '../layout';
import { PageTitle } from '../layout/pageTitle/PageTitle';
import { OrderDetailItemSection } from '../components/orderDetailPage/OrderDetailItemSection';
import { OrderDetailSummarySection } from '../components/orderPage/OrderDetailSummarySection';
import { Suspense } from 'react';
import Loading from '../components/common/Loading';

export const OrderDetail = () => {
  return (
    <Layout>
      <PageTitle>주문 내역 상세</PageTitle>
      <Style.Content>
        <Suspense fallback={<Loading />}>
          <OrderDetailItemSection />
          <OrderDetailSummarySection />
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
