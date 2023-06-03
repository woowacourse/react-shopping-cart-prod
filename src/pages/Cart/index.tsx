import { Suspense, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import cartState from '@recoil/cart/cartState';
import serverState from '@recoil/server/serverState';
import { useCheckCart } from '@hooks/recoil/cart/useCheckCart';
import CartCouponSelect from '@components/cart/CartCouponSelect';
import CartItemList from '@components/cart/CartItemList';
import CouponList from '@components/cart/CouponList';
import ExpectedPayment from '@components/cart/ExpectedPayment';
import SkeletonCart from '@components/cart/SkeletonCartItemList';
import Modal from '@components/common/Modal';
import Layout from '@components/layout/Layout';
import { getAvailableCouponsByTotalPrice, getDiscountPrice } from '@utils/coupon/coupon';
import { getCoupon } from '@utils/coupon/fetchCoupon';
import { CouponType } from '@type/couponType';
import * as S from './Cart.style';

const DELIVERY_FEE = 3000;

function Cart() {
  const serverName = useRecoilValue(serverState);
  const cart = useRecoilValue(cartState);
  const { totalCartPrice } = useCheckCart();

  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onSelectCoupon = (coupon: CouponType) => {
    setSelectedCoupon(coupon);
  };

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

  const discountPrice = getDiscountPrice({
    coupon: selectedCoupon,
    deliveryFee: DELIVERY_FEE,
    totalItemsPrice: totalCartPrice,
  });

  return (
    <Layout>
      <S.CartPageContainer>
        <Suspense fallback={<SkeletonCart />}>
          <S.Title>든든배송 상품 ({cart.length}개)</S.Title>
          <S.Main>
            <CartItemList cart={cart} />
            <S.SelectAndPaymentWrapper>
              <S.CartCouponSelectWrapper>
                <CartCouponSelect
                  selectedCoupon={selectedCoupon}
                  onCouponModalOpen={onModalOpen}
                  availableCouponLength={availableCouponLength}
                />
              </S.CartCouponSelectWrapper>
              <ExpectedPayment
                totalItemsPrice={totalCartPrice}
                deliveryFee={DELIVERY_FEE}
                discountPrice={discountPrice}
              />
            </S.SelectAndPaymentWrapper>
          </S.Main>
        </Suspense>
      </S.CartPageContainer>
      {isModalOpen && (
        <Modal onModalClose={onModalClose} title="쿠폰함">
          <CouponList
            selectedCoupon={selectedCoupon}
            onCouponSelect={onSelectCoupon}
            coupons={coupons}
          />
        </Modal>
      )}
    </Layout>
  );
}

export default Cart;
