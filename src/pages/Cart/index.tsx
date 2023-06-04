import { Suspense, useState } from 'react';
import CartListArea from '@components/cart/CartListArea';
import CouponList from '@components/cart/CouponList';
import SkeletonCart from '@components/cart/SkeletonCartItemList';
import Modal from '@components/common/Modal';
import Layout from '@components/layout/Layout';
import { CouponType } from '@type/couponType';
import * as S from './Cart.style';

function Cart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);

  const onModalOpen = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onSelectCoupon = (coupon: CouponType) => {
    setSelectedCoupon(coupon);
  };

  const resetSelectedCoupon = () => {
    setSelectedCoupon(null);
  };

  return (
    <Layout>
      <S.CartPageContainer>
        <Suspense fallback={<SkeletonCart />}>
          <CartListArea
            onModalOpen={onModalOpen}
            selectedCoupon={selectedCoupon}
            resetSelectedCoupon={resetSelectedCoupon}
          />
        </Suspense>
      </S.CartPageContainer>
      {isModalOpen && (
        <Modal onModalClose={onModalClose} title="쿠폰함">
          <Suspense fallback={<SkeletonCart />}>
            <CouponList selectedCoupon={selectedCoupon} onCouponSelect={onSelectCoupon} />
          </Suspense>
        </Modal>
      )}
    </Layout>
  );
}

export default Cart;
