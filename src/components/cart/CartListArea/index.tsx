import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ORDER_PATH } from '@router/router';
import withCartTotalPrice from '@recoil/cart/selector/withCartTotalPrice';
import withAvailableCoupon from '@recoil/coupon/selector/withAvailableCoupon';
import serverState from '@recoil/server/serverState';
import userState from '@recoil/user/userState';
import { useCheckCart } from '@hooks/recoil/cart/useCheckCart';
import { useRecoilCart } from '@hooks/useRecoilCart';
import { cartItemSelectedById } from '@utils/cart/cart';
import { getDiscountPrice } from '@utils/coupon/coupon';
import { submitOrderApi } from '@utils/order/fetchOrder';
import { CouponType } from '@type/couponType';
import CartCouponSelect from '../CartCouponSelect';
import CartItemList from '../CartItemList';
import ExpectedPayment from '../ExpectedPayment';
import * as S from './CartListArea.style';

interface CartListAreaProps {
  onModalOpen: () => void;
  selectedCoupon: CouponType | null;
  resetSelectedCoupon: () => void;
}

const DELIVERY_FEE = 3000;

function CartListArea({ onModalOpen, selectedCoupon, resetSelectedCoupon }: CartListAreaProps) {
  const userInfo = useRecoilValue(userState);
  const serverName = useRecoilValue(serverState);
  const navigate = useNavigate();

  const { cart, cartFetchData } = useRecoilCart();
  const totalItemsPrice = useRecoilValue(withCartTotalPrice);
  const availableCoupon = useRecoilValue(withAvailableCoupon);

  const { checkedCount } = useCheckCart();

  const onOrderClick = async () => {
    const selectedCartIds = cartItemSelectedById(cart);

    const orderId = await submitOrderApi({
      cartItemIds: selectedCartIds,
      serverName,
      couponId: selectedCoupon?.id,
      userInfo,
    });

    cartFetchData();

    navigate(ORDER_PATH.COMPLETE, {
      state: {
        deliveryFee: DELIVERY_FEE,
        discountPrice,
        totalItemsPrice,
        orderItemsCount: checkedCount,
        orderId,
      },
    });
  };

  const discountPrice = selectedCoupon
    ? getDiscountPrice({
        coupon: selectedCoupon,
        totalItemsPrice,
      })
    : 0;

  useEffect(() => {
    if (discountPrice === 0) {
      resetSelectedCoupon();
    }
  }, [discountPrice, resetSelectedCoupon]);

  return (
    <div>
      <S.Title>든든배송 상품 ({cart.length}개)</S.Title>
      <S.Main>
        <CartItemList cart={cart} />
        <S.SelectAndPaymentWrapper>
          <S.CartCouponSelectWrapper>
            <CartCouponSelect
              selectedCoupon={selectedCoupon}
              onCouponModalOpen={onModalOpen}
              availableCouponLength={availableCoupon.length ?? 0}
            />
          </S.CartCouponSelectWrapper>
          <ExpectedPayment
            totalItemsPrice={totalItemsPrice}
            deliveryFee={totalItemsPrice ? DELIVERY_FEE : 0}
            discountPrice={discountPrice}
            onOrderClick={onOrderClick}
          />
        </S.SelectAndPaymentWrapper>
      </S.Main>
    </div>
  );
}

export default CartListArea;
