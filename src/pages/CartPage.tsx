import styled from 'styled-components';

import CartProductInfo from '../components/Cart/CartProductInfo';
import ExpectedPaymentBox from '../components/Cart/ExpectedPaymentBox';
import PageTitle from '../components/Common/PageTitle';

const CartPage = () => {
  return (
    <Main>
      <PageTitle>장바구니</PageTitle>
      <CartPageFlexBox>
        <CartProductInfo />
        <ExpectedPaymentBox />
      </CartPageFlexBox>
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 0 60px;

  @media (max-width: ${({ theme }) => theme.breakPoints.medium}) {
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
