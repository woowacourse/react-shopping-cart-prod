import { Suspense } from 'react';
import * as S from './CartPage.style';

import CartItemList from '@views/Cart/components/CartItemList/CartItemList';
import { ExpectedPayment } from '@views/Payment/components/ExpectedPayment';
import SkeletonCart from '@views/Cart/components/SkeletonCartItemList/SkeletonCartItemList';

function CartPage() {
  return (
    <S.CartPageContainer>
      <Suspense fallback={<SkeletonCart />}>
        <CartItemList />
        <ExpectedPayment />
      </Suspense>
    </S.CartPageContainer>
  );
}

export default CartPage;
