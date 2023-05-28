import * as S from './Cart.style';
import { CartItemList } from '@components/cart/CartItemList';
import { Suspense } from 'react';
import SkeletonCart from '@components/cart/SkeletonCartItemList/SkeletonCartItemList';
import { ExpectedPayment } from '@components/cart/ExpectedPayment';

function Cart() {
  return (
    <S.CartPageContainer>
      <Suspense fallback={<SkeletonCart />}>
        <CartItemList />
        <ExpectedPayment />
      </Suspense>
    </S.CartPageContainer>
  );
}

export default Cart;
