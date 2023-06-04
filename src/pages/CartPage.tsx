import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';

import CartProductInfo from '../components/Cart/CartProductInfo';
import ExpectedPaymentBox from '../components/Cart/ExpectedPaymentBox';
import Message from '../components/Common/Message';
import ErrorMessage from '../components/Common/ErrorMessage';
import { serverNameState } from '../states/serverName';

const CartPage = () => {
  const serverName = useRecoilValue(serverNameState);

  return (
    <>
      <PageTitle>장바구니</PageTitle>
      <ErrorBoundary key={serverName} fallback={<ErrorMessage type='cart' />}>
        <Suspense fallback={<Message type='loading' />}>
          <CartWrapper>
            <CartListSection>
              <CartProductInfo />
            </CartListSection>
            <ExpectedPaymentBoxSection>
              <ExpectedPaymentBox />
            </ExpectedPaymentBoxSection>
          </CartWrapper>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

const PageTitle = styled.h2`
  height: 60px;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
`;

const CartWrapper = styled.div`
  height: calc(100% - 60px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    display: flex;
    justify-content: space-between;
    gap: 40px;
  }
`;

const CartListSection = styled.section`
  max-width: 780px;
  flex-grow: 1;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const ExpectedPaymentBoxSection = styled.section`
  margin: 0 0 60px;

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    position: sticky;
    top: 75px;
    margin: 0;
  }
`;

export default CartPage;
