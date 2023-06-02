import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import styled from 'styled-components';
import PageTitle from '../components/Common/PageTitle';
import Message from '../components/Common/Message';
import CartProductInfo from '../components/Cart/CartProductInfo';
import ExpectedPaymentBox from '../components/Cart/ExpectedPaymentBox';

import { serverNameState } from '../states/serverName';

const CartPage = () => {
  const serverName = useRecoilValue(serverNameState);

  return (
    <ErrorBoundary key={serverName} fallback={<Message type="error" />}>
      <Suspense fallback={<Message type="loading" />}>
        <Main>
          <PageTitle>장바구니</PageTitle>
          <CartPageFlexBox>
            <CartProductInfo />
            <ExpectedPaymentBox />
          </CartPageFlexBox>
        </Main>
      </Suspense>
    </ErrorBoundary>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: calc(100vh - 80px);
  padding: 30px 120px;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    padding: 30px;
  }
`;

const CartPageFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  width: 100%;
  margin: 40px 0;

  @media (max-width: ${({ theme }) => theme.breakPoints.large}) {
    flex-direction: column;
    gap: 0;
  }
`;

export default CartPage;
