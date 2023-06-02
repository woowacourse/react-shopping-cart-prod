import styled from 'styled-components';
import { Layout } from '../layout';
import { CartContent } from '../components/cartPage';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../components/error/Fallback';
import { ErrorMessage } from '../constants/errorMessage';

export const Cart = () => {
  return (
    <Layout>
      <Style.Header>
        <Style.HeaderTitle>장바구니</Style.HeaderTitle>
      </Style.Header>

      <ErrorBoundary FallbackComponent={Fallback}>
        <CartContent />
      </ErrorBoundary>
    </Layout>
  );
};

const Style = {
  Header: styled.div`
    width: 1320px;
    height: 67px;

    display: flex;
    justify-content: center;

    border-bottom: 4px solid #333333;
    margin-bottom: 34px;

    @media screen and (max-width: 480px) {
      display: none;
    }
  `,
  HeaderTitle: styled.h1`
    padding: 0;
    margin: 0;

    font-size: 32px;

    @media screen and (max-width: 480px) {
      font-size: 25px;
    }
  `,
  Content: styled.div`
    width: 1320px;
    height: max-content;

    display: flex;
    gap: 104px;

    @media screen and (max-width: 480px) {
      width: 100vw;
    }
  `,
  EmptyCartContainer: styled.div`
    width: 1320px;
    min-height: 50vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 15px;

    font-size: 30px;

    @media screen and (max-width: 480px) {
      width: 90vw;

      font-size: 20px;
    }
  `,
  EmptyCartImage: styled.img`
    width: 200px;
    height: 200px;

    @media screen and (max-width: 480px) {
      width: 60vw;
      height: 60vw;
    }
  `,
};
