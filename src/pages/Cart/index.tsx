import { Suspense, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import cartState from '@recoil/cart/cartState';
import serverState from '@recoil/server/serverState';
import { useCheckCart } from '@hooks/recoil/cart/useCheckCart';
import CartCouponSelect from '@components/cart/CartCouponSelect';
import CartItemList from '@components/cart/CartItemList';
import ExpectedPayment from '@components/cart/ExpectedPayment';
import SkeletonCart from '@components/cart/SkeletonCartItemList';
import Layout from '@components/layout/Layout';
import { getAvailableCouponsByTotalPrice } from '@utils/coupon/coupon';
import { getCoupon } from '@utils/coupon/fetchCoupon';
import { CouponType } from '@type/couponType';
import * as S from './Cart.style';

const DELIVERY_FEE = 3000;

function Cart() {
  const serverName = useRecoilValue(serverState);
  const cart = useRecoilValue(cartState);
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const { totalCartPrice } = useCheckCart();

  useEffect(() => {
    const fetchCoupon = async () => {
      const coupons = await getCoupon(serverName);

      setCoupons(coupons);
    };

    fetchCoupon();
  }, [serverName]);

  const availableCouponLength = getAvailableCouponsByTotalPrice({
    coupons,
    totalItemsPrice: totalCartPrice,
  }).length;

  return (
    <Layout>
      <S.CartPageContainer>
        <Suspense fallback={<SkeletonCart />}>
          <S.Title>든든배송 상품 ({cart.length}개)</S.Title>
          <S.Main>
            <CartItemList cart={cart} />
            <S.SelectAndPaymentWrapper>
              <S.CartCouponSelectWrapper>
                <CartCouponSelect availableCouponLength={availableCouponLength} />
              </S.CartCouponSelectWrapper>
              <ExpectedPayment
                totalItemsPrice={totalCartPrice}
                deliveryFee={DELIVERY_FEE}
                discountPrice={0}
              />
            </S.SelectAndPaymentWrapper>
          </S.Main>
        </Suspense>
      </S.CartPageContainer>
    </Layout>
  );
}

export default Cart;
