import { Suspense } from 'react';
import CartItemList from '@views/CartItemList/components/CartItemList/CartItemList';
import SkeletonCart from '@views/CartItemList/components/SkeletonCartItemList/SkeletonCartItemList';
import { ExpectedPayment } from '@views/Payment/components/ExpectedPayment';
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
