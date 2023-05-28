import { Suspense } from 'react';
import { CartItemList } from '@components/cart/CartItemList';
import { ExpectedPayment } from '@components/cart/ExpectedPayment';
import SkeletonCart from '@components/cart/SkeletonCartItemList/SkeletonCartItemList';
import * as S from './Cart.style';

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
