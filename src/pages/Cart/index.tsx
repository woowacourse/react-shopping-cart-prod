import { Suspense } from 'react';
import CartItemList from '@components/cart/CartItemList';
import ExpectedPayment from '@components/cart/ExpectedPayment';
import SkeletonCart from '@components/cart/SkeletonCartItemList';
import Layout from '@components/layout/Layout';
import * as S from './Cart.style';

function Cart() {
  return (
    <Layout>
      <S.CartPageContainer>
        <Suspense fallback={<SkeletonCart />}>
          <CartItemList />
          <ExpectedPayment />
        </Suspense>
      </S.CartPageContainer>
    </Layout>
  );
}

export default Cart;
