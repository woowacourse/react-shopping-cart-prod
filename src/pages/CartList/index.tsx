import { Suspense } from 'react';

import SkeletonCartItem from './CartItem/SkeletonCartItem';
import CartItems from './CartItems';
import CartListSubHeader from './CartListSubHeader';
import LoadingCartListSubHeader from './CartListSubHeader/LoadingCartListSubHeader';
import PaymentAmount from './PaymentAmount';
import SkeletonPaymentAmount from './PaymentAmount/SkeletonPaymentAmount';
import * as S from './style';

function CartList() {
  return (
    <S.Container>
      <Suspense fallback={<LoadingCartListSubHeader />}>
        <CartListSubHeader />
      </Suspense>
      <S.ShoppingCartContentsLayout>
        <S.CartList>
          <Suspense
            fallback={
              <S.CartListLayout>
                {Array.from({ length: 3 }, (_, index) => (
                  <SkeletonCartItem key={index} />
                ))}
              </S.CartListLayout>
            }
          >
            <CartItems />
          </Suspense>
        </S.CartList>
        <S.PaymentLayout>
          <Suspense fallback={<SkeletonPaymentAmount />}>
            <PaymentAmount />
          </Suspense>
        </S.PaymentLayout>
      </S.ShoppingCartContentsLayout>
    </S.Container>
  );
}

export default CartList;
