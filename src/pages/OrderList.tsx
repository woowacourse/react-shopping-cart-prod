import { Layout } from '../layout';
import { OrderContent } from '../components/orderPage';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../components/error/Fallback';
import styled from 'styled-components';

export const OrderList = () => {
  return (
    <Layout>
      <Style.HeaderContainer>
        <Style.Header>주문 목록</Style.Header>
      </Style.HeaderContainer>
      <ErrorBoundary FallbackComponent={Fallback}>
        <OrderContent />
      </ErrorBoundary>
    </Layout>
  );
};

export const Style = {
  HeaderContainer: styled.div`
    width: 1320px;
    height: 69px;

    display: flex;
    justify-content: center;
    align-items: flex-start;

    border-bottom: 4px solid #333333;

    @media screen and (max-width: 480px) {
      width: 90vw;
      height: 50px;
    }
  `,
  Header: styled.h1`
    font-size: 32px;

    @media screen and (max-width: 480px) {
      font-size: 25px;
    }
  `,
};
