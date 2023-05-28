import { Suspense } from 'react';
import * as S from './Cart.style';
import SkeletonCart from '@views/CartItemList/components/SkeletonCartItemList/SkeletonCartItemList';
import CartItemList from '@views/CartItemList/components/CartItemList/CartItemList';
import { ExpectedPayment } from '@views/Payment/components/ExpectedPayment';

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
