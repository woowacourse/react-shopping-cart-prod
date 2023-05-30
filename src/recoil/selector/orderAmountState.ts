import { selector } from 'recoil';

import convertLocalPrice from '@Utils/convertLocalPrice';

import cartItemsState from '@Atoms/cartItemsState';

import { DELIVERY_FEE } from '@Constants/index';

const orderAmountState = selector({
  key: 'orderAmountState',

  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    if (!cartItems) return { orderAmount: '0', deliveryFee: '0', totalOrderPrice: '0', discountAmount: null };

    const allPrice = cartItems.reduce((acc, cur) => {
      if (!cur.isSelected) return acc;
      return acc + cur.quantity * cur.product.price;
    }, 0);

    const isDiscounted = allPrice >= 100000;

    const orderAmount = convertLocalPrice(allPrice);
    const discountAmount = () => {
      if (allPrice >= 500000) return Math.floor((allPrice * 5) / 100);
      if (allPrice >= 300000) return Math.floor((allPrice * 3) / 100);
      if (allPrice >= 100000) return Math.floor((allPrice * 1) / 100);

      return 0;
    };

    const deliveryFee = !allPrice ? `0 원` : convertLocalPrice(DELIVERY_FEE);
    const totalOrderPrice = isDiscounted
      ? convertLocalPrice(allPrice - discountAmount() + DELIVERY_FEE)
      : convertLocalPrice(allPrice + (!allPrice ? 0 : DELIVERY_FEE));

    return {
      orderAmount,
      deliveryFee,
      totalOrderPrice,
      discountAmount: isDiscounted ? `- ${convertLocalPrice(discountAmount())}` : `0 원`,
    };
  },
});

export default orderAmountState;
