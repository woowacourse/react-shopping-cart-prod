import styled from 'styled-components';

import CartProductInfo from '../components/Cart/CartProductInfo';
import ExpectedPaymentBox from '../components/Cart/ExpectedPaymentBox';
import PageTitle from '../components/Common/PageTitle';

const CartPage = () => {
  return (
    <Main>
      <PageTitle>장바구니</PageTitle>
      <CartProductInfo />
      <ExpectedPaymentBoxWrapper>
        <ExpectedPaymentBox />
      </ExpectedPaymentBoxWrapper>
    </Main>
  );
};

const Main = styled.main`
  position: relative;

  max-width: 1300px;
  height: calc(100vh - 80px);
  margin: 0 auto;
  padding: 0 30px;
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

const ExpectedPaymentBoxWrapper = styled.section`
  margin: 0 0 60px 0;

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    position: sticky;
    top: 90px;
    margin: 210px 0 0 0;
  }
`;

export default CartPage;
