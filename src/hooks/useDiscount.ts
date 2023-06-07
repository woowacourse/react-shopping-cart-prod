import { useState } from 'react';

import { INITIAL_DELIVERY_PRICE, INITIAL_DISCOUNT_PRICE } from '../constants';
import useCartList from './useCartList';

const useDiscount = () => {
  const { getCartItemSum } = useCartList();
  const [mainPrice, setMainPrice] = useState(getCartItemSum());
  const [deliveryPrice, setDeliveryPrice] = useState(INITIAL_DELIVERY_PRICE);
  const [discountPrice, setDiscountPrice] = useState(INITIAL_DISCOUNT_PRICE);
  const [resultPrice, setResultPrice] = useState(mainPrice + deliveryPrice - discountPrice);

  return {
    mainPrice,
    deliveryPrice,
    discountPrice,
    resultPrice,
    setMainPrice,
    setDeliveryPrice,
    setDiscountPrice,
    setResultPrice,
  };
};

export default useDiscount;
