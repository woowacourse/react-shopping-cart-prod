import { useState } from 'react';
import { useCheckedCartListValue } from '../../../provider/CheckedListProvider';
import type { Coupon } from '../../../types/product';

const useOrderSheet = () => {
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

  return {
    checkedCartList,
    handleChangeCoupon,
    getProductAmount,
    getDiscountAmount,
    getDeliveryFee,
    getTotalOrderAmount,
  };
};

export default useOrderSheet;
