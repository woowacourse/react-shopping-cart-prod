import { Suspense } from 'react';

import CartAmount from './CartAmount';
import { SkeletonCartItem } from './CartItem';
import CartItems from './CartItems';
import CartListController from './CartListController';
import LoadingCartListController from './CartListController/LoadingCartListController';
import PaymentAmount from './PaymentAmount';
import SkeletonPaymentAmount from './PaymentAmount/SkeletonPaymentAmount';
import * as S from './style';

function CartList() {
  return (
    <S.Container>
      <S.Title>장바구니</S.Title>
      <S.ShoppingCartSubHeader>
        <Suspense fallback={<CartAmount isLoading />}>
          <CartAmount />
        </Suspense>
        <Suspense fallback={<LoadingCartListController />}>
          <CartListController />
        </Suspense>
      </S.ShoppingCartSubHeader>
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
