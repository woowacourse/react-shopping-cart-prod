import { Suspense } from 'react';

import SkeletonCartItem from './CartItem/SkeletonCartItem';
import CartItems from './CartItems';
import CartListSubHeader from './CartListSubHeader';
import EmptyCart from './EmptyCart';
import PaymentAmount from './PaymentAmount';
import SkeletonPaymentAmount from './PaymentAmount/SkeletonPaymentAmount';
import * as S from './style';

function CartList() {
  return (
    <S.Container>
      <Suspense fallback={<></>}>
        <EmptyCart />
      </Suspense>
      <Suspense fallback={<></>}>
        <CartListSubHeader />
      </Suspense>
      <S.ShoppingCartContentsLayout>
        <S.CartList>
          <S.CartListLayout>
            <Suspense
              fallback={Array.from({ length: 3 }, (_, index) => (
                <SkeletonCartItem key={index} />
              ))}
            >
              <CartItems />
            </Suspense>
          </S.CartListLayout>
        </S.CartList>
        <Suspense fallback={<SkeletonPaymentAmount />}>
          <PaymentAmount />
        </Suspense>
      </S.ShoppingCartContentsLayout>
    </S.Container>
  );
}

export default CartList;
