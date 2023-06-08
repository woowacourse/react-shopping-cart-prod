import { Suspense } from 'react';

import SkeletonCartItem from './CartItem/SkeletonCartItem';
import CartItems from './CartItems';
import CartListSubHeader from './CartListSubHeader';
import LoadingCartListSubHeader from './CartListSubHeader/LoadingCartListSubHeader';
import CouponApplyButton from './CouponApplyButton';
import CouponBanner from './CouponBanner';
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
      <Suspense fallback={<LoadingCartListSubHeader />}>
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
              <CouponBanner />
            </Suspense>
          </S.CartListLayout>
        </S.CartList>
        <Suspense fallback={<SkeletonPaymentAmount />}>
          <div>
            <CouponApplyButton />
            <PaymentAmount />
          </div>
        </Suspense>
      </S.ShoppingCartContentsLayout>
    </S.Container>
  );
}

export default CartList;
