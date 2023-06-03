import { Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ORDER_PATH } from '@router/router';
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
import { cartItemSelectedById } from '@utils/cart/cart';
import { getAvailableCouponsByTotalPrice, getDiscountPrice } from '@utils/coupon/coupon';
import { getCoupon } from '@utils/coupon/fetchCoupon';
import { submitOrderApi } from '@utils/order/fetchOrder';
import { CouponType } from '@type/couponType';
import * as S from './Cart.style';

const DELIVERY_FEE = 3000;

function Cart() {
  const navigate = useNavigate();
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

  const availableCoupon = getAvailableCouponsByTotalPrice({
    coupons,
    totalItemsPrice: totalCartPrice,
  });

  const discountPrice = selectedCoupon
    ? getDiscountPrice({
        coupon: selectedCoupon,
        totalItemsPrice: totalCartPrice,
      })
    : 0;

  const onOrderClick = async () => {
    const selectedCartId = cartItemSelectedById(cart);
    await submitOrderApi({ cartItemIds: selectedCartId, serverName, couponId: selectedCoupon?.id });
    navigate(ORDER_PATH.COMPLETE);
  };

  useEffect(() => {
    const fetchCoupon = async () => {
      const coupons = await getCoupon(serverName);

      setCoupons(coupons);
    };

    fetchCoupon();
  }, [serverName]);

  useEffect(() => {
    if (discountPrice === 0) {
      setSelectedCoupon(null);
    }
  }, [discountPrice]);

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
                  availableCouponLength={availableCoupon.length}
                />
              </S.CartCouponSelectWrapper>
              <ExpectedPayment
                totalItemsPrice={totalCartPrice}
                deliveryFee={totalCartPrice ? DELIVERY_FEE : 0}
                discountPrice={discountPrice}
                onOrderClick={onOrderClick}
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
            coupons={availableCoupon}
          />
        </Modal>
      )}
    </Layout>
  );
}

export default Cart;
