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
  position: relative;

  max-width: 1300px;
  height: calc(100vh - 80px);
  margin: 0 auto;
  padding: 0 30px;
`;

const CartPageFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin: 40px 0;

  @media (max-width: ${({ theme }) => theme.breakPoints.medium}) {
    flex-direction: column;
  }
`;

export default CartPage;
