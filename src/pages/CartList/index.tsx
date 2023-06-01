import { Suspense } from 'react';

import PaymentArea from '@Components/PaymentArea';

import CartItemSkeleton from './CartItem/CartItemSkeleton';
import CartItems from './CartItems';
import CartListSubHeader from './CartListSubHeader';
import LoadingCartListSubHeader from './CartListSubHeader/LoadingCartListSubHeader';
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
                  <CartItemSkeleton key={index} />
                ))}
              </S.CartListLayout>
            }
          >
            <CartItems />
          </Suspense>
        </S.CartList>
        <PaymentArea />
      </S.ShoppingCartContentsLayout>
    </S.Container>
  );
}

export default CartList;
