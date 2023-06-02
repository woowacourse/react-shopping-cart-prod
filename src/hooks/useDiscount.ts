import { useState } from 'react';

import useCartList from './useCartList';

const useDiscount = () => {
  const { getCartItemSum } = useCartList();
  const [mainPrice, setMainPrice] = useState(getCartItemSum());
  const [deliveryPrice, setDeliveryPrice] = useState(3000);
  const [discountPrice, setDiscountPrice] = useState(0);
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
