import { Suspense } from 'react';
import { useCheckCart } from '@hooks/recoil/cart/useCheckCart';
import CartItemList from '@components/cart/CartItemList';
import ExpectedPayment from '@components/cart/ExpectedPayment';
import SkeletonCart from '@components/cart/SkeletonCartItemList';
import Layout from '@components/layout/Layout';
import * as S from './Cart.style';

function Cart() {
  const { totalCartPrice } = useCheckCart();

  return (
    <Layout>
      <S.CartPageContainer>
        <Suspense fallback={<SkeletonCart />}>
          <CartItemList />
          <ExpectedPayment totalPrice={totalCartPrice} deliveryFee={3000} />
        </Suspense>
      </S.CartPageContainer>
    </Layout>
  );
}

export default Cart;
