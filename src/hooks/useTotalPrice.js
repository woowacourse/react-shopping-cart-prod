import { useEffect, useState } from 'react';

export const useTotalPrice = (cartList, checkBoxItems) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let computePrice = 0;
    if (cartList.length) {
      const checkItemList = cartList.filter((item) => checkBoxItems.includes(Number(item.id)));
      computePrice = checkItemList.reduce((prev, cur) => {
        return prev + cur.price * cur.quantity;
      }, 0);
    }
    setTotalPrice(computePrice);
  }, [cartList, checkBoxItems]);

  return { totalPrice };
};
