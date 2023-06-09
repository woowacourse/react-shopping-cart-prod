import { styled } from 'styled-components';
import ContentLayout from 'components/@common/ContentLayout';
import PaymentDetail from 'components/Cart/PaymentDetail';
import CartItemList from 'components/Cart/CartItemList';
import { Suspense } from 'react';
import CouponSection from 'components/Cart/CouponSection';
import Spinner from 'components/@common/Spinner';
import ErrorBoundary from 'components/@common/ErrorBoundary';

const CartPage = () => {
  return (
    <ContentLayout title="🛒 장바구니 🛒">
      <ErrorBoundary fallback={<div>에러가 발생했습니다.</div>}>
        <Suspense fallback={<Spinner />}>
          <CartItemList />
        </Suspense>
      </ErrorBoundary>
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
