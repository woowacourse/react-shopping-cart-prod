import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckedCartListValue } from '../../../provider/CheckedListProvider';
import { useRecoilValue } from 'recoil';
import serverNameState from '../../../globalState/atoms/serverName';
import ServerUtil from '../../../utils/ServerUrl';
import type { Coupon } from '../../../types/product';
import { USER_AUTH_TOKEN } from '../../../constant';

const useOrderSheet = () => {
  const navigate = useNavigate();

  const { getCheckedItemList } = useCheckedCartListValue();
  const checkedCartList = getCheckedItemList();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const handleChangeCoupon = (coupon: Coupon | null) => {
    setSelectedCoupon(coupon);
  };

  const getProductAmount = () =>
    checkedCartList.reduce((totalAmount, cartItem) => {
      const amount = cartItem.product.price * cartItem.quantity;
      return totalAmount + amount;
    }, 0);

  const getDiscountAmount = () => {
    if (selectedCoupon === null) return 0;

    if (selectedCoupon.type === 'amount') {
      return selectedCoupon.amount;
    }

    if (selectedCoupon.type === 'percent') {
      return Math.floor((getProductAmount() / 100) * selectedCoupon.amount);
    }

    return 0;
  };

  // 기획상 하드코딩
  const getDeliveryFee = () => 3000;

  const getTotalOrderAmount = () => {
    return getProductAmount() + getDeliveryFee() - getDiscountAmount();
  };

  const handleOrder = async () => {
    const serverName = useRecoilValue(serverNameState);
    const OrdersUrl = ServerUtil.getOrdersUrl(serverName);

    const couponIds = selectedCoupon ? [selectedCoupon.id] : [];
    const orderBody = {
      cartItems: checkedCartList,
      couponIds: couponIds,
      deliveryFee: getDeliveryFee(),
    };

    const response = await fetch(OrdersUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_AUTH_TOKEN}`,
      },
      body: JSON.stringify(orderBody),
    });

    if (!response.ok) {
      throw new Error('주문 과정에서 에러가 발생했습니다.');
    }

    navigate('/order');
  };

  return {
    checkedCartList,
    handleChangeCoupon,
    getProductAmount,
    getDiscountAmount,
    getDeliveryFee,
    getTotalOrderAmount,
    handleOrder,
  };
};

export default useOrderSheet;
