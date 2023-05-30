import { styled } from 'styled-components';
import ContentLayout from 'components/@common/ContentLayout';
import PaymentDetail from 'components/Cart/PaymentDetail';
import CartItemList from 'components/Cart/CartItemList';
import { Suspense } from 'react';
import CouponSection from 'components/Cart/CouponSection';

const CartList = () => {
  return (
    <ContentLayout>
      <Title>🛒 장바구니 🛒</Title>
      <Container>
        <Suspense fallback={<div>loading...</div>}>
          <CartItemList />
        </Suspense>
        <Wrapper>
          <PaymentDetail />
          <CouponSection />
        </Wrapper>
      </Container>
    </ContentLayout>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 60px;

  @media (min-width: 320px) and (max-width: 1100px) {
    flex-direction: column;
    margin: 0 20px;
  }
`;

const Title = styled.h1`
  height: 60px;
  margin-bottom: 32px;
  text-align: center;
  font: ${(props) => props.theme.font.large};
  border-bottom: 4px solid ${(props) => props.theme.color.primary};
`;

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  right: 60px;
  @media (min-width: 320px) and (max-width: 1100px) {
    position: unset;
    display: flex;
    justify-content: center;
  }
`;

export default CartList;
