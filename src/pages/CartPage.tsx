import { styled } from 'styled-components';
import ContentLayout from 'components/@common/ContentLayout';
import PaymentDetail from 'components/Cart/PaymentDetail';
import CartItemList from 'components/Cart/CartItemList';
import { Suspense } from 'react';
import CouponSection from 'components/Cart/CouponSection';

const CartPage = () => {
  return (
    <ContentLayout title="🛒 장바구니 🛒">
      <Suspense fallback={<div>loading...</div>}>
        <CartItemList />
      </Suspense>
      <Wrapper>
        <Suspense fallback={<div>loading...</div>}>
          <PaymentDetail />
          <CouponSection />
        </Suspense>
      </Wrapper>
    </ContentLayout>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 60px;

  @media (min-width: 320px) and (max-width: 1100px) {
    position: unset;
    display: flex;
    justify-content: center;
  }
`;

export default CartPage;
