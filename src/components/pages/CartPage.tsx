import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';

import { useCartFetch } from '../../hooks/useCartFetch';
import { useAddOrderFetch } from '../../hooks/useOrderFetch';
import useCouponFetch from '../../hooks/useCouponFetch';
import { useCouponModal } from '../../hooks/useCouponModal';

import TotalPriceBox from '../box/TotalPriceBox/TotalPriceBox';
import { Text } from '../common/Text/Text';
import CartList from '../list/CartList/CartList';
import PageTemplate from '../templates/PageTemplate';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal';
import DeleteCartItemModal from '../Modal/ConfirmModal/DeleteCartItemModal';
import { checkCartListState, couponState } from '../../service/atom';
import Button from '../common/Button/Button';
import CouponModal from '../Modal/CouponModal/CouponModal';
import ApplyCouponModal from '../Modal/CouponModal/ApplyCouponModal';
import { PERCENTAGE } from '../../abstract/constants';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';

const CartPage = () => {
  const { cartData, isFetching } = useCartFetch();
  const { userCoupon, userCouponRefetch } = useCouponFetch();
  const { addOrderDataAPI } = useAddOrderFetch();
  const { openModal } = useCouponModal();
  const [checkCartList, setCheckCartList] = useRecoilState(checkCartListState);
  const [coupon, setCoupon] = useRecoilState(couponState);

  const orderCart = () => {
    addOrderDataAPI({ selectCartIds: checkCartList, couponId: coupon.id ? coupon.id : null });
    setCheckCartList([]);
    setCoupon({
      id: 0,
      name: '',
      discountType: PERCENTAGE,
      discountRate: 0.0,
      discountAmount: 0,
      minimumPrice: 0,
    });
    userCouponRefetch();
  };

  const calcTotalPrice = () => {
    return checkCartList.reduce((prev, curr) => {
      const cartItem = cartData && cartData.find((cart) => cart.id === curr);
      if (cartItem) {
        const { product, quantity } = cartItem;
        return prev + product.price * quantity;
      }
      return prev + 0;
    }, 0);
  };

  useEffect(() => {
    if (calcTotalPrice() === 0 || coupon.minimumPrice > calcTotalPrice())
      setCoupon({
        id: 0,
        name: '',
        discountType: PERCENTAGE,
        discountRate: 0.0,
        discountAmount: 0,
        minimumPrice: 0,
      });
  }, [calcTotalPrice()]);

  return (
    <PageTemplate
      title="장바구니 미션 - 장바구니페이지"
      description="우아한 테크코스 레벨 2 장바구니 미션의 장바구니페이지입니다."
    >
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <CartPageWrapper>
          <CartPageHead>
            <Text size="extraLarge" weight="bold">
              장바구니
            </Text>
          </CartPageHead>
          <CartPageContent>
            <CartListWrapper>
              <CartList />
            </CartListWrapper>
            <PriceWrapper>
              <Button
                primary
                size="small"
                text="쿠폰보기"
                onClick={() => {
                  openModal({});
                }}
              />
              <TotalPriceBox
                totalProductPrice={calcTotalPrice()}
                shippingFee={checkCartList.length > 0 ? 3000 : 0}
                isValid={checkCartList.length > 0}
                coupon={coupon.id ? coupon : undefined}
                onOrder={orderCart}
              />
            </PriceWrapper>
          </CartPageContent>
        </CartPageWrapper>
      )}
      <ConfirmModal>
        <DeleteCartItemModal />
      </ConfirmModal>
      <CouponModal>
        <ApplyCouponModal coupons={userCoupon} totalPrice={calcTotalPrice()} />
      </CouponModal>
    </PageTemplate>
  );
};

export default CartPage;

const CartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1140px;
  @media screen and (max-width: 1320px) {
    width: 940px;
  }

  @media screen and (max-width: 1000px) {
    width: 620px;
  }

  @media screen and (max-width: 660px) {
    width: 500px;
  }

  @media screen and (max-width: 510px) {
    width: 300px;
  }
`;

const CartListWrapper = styled.div`
  width: 740px;
  margin-top: -50px;
  @media screen and (max-width: 1320px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

const CartPageHead = styled.div`
  border-bottom: 4px solid #333;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const CartPageContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 50px;
  position: relative;
  @media screen and (max-width: 1320px) {
    flex-direction: column;
    width: 100%;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: sticky;
  top: 150px;
  margin-top: 30px;
  gap: 6px;
  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;
