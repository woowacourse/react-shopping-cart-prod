import { selector } from 'recoil';

import cartItemsState from '@Atoms/cartItemsState';

import { DELIVERY_FEE } from '@Constants/index';

const orderAmountState = selector({
  key: 'orderAmountState',

  get: ({ get }) => {
    const cartItems = get(cartItemsState);

    if (!cartItems) return { orderAmount: '0', deliveryFee: '0', totalOrderPrice: '0' };

    const allPrice = cartItems.reduce((acc, cur) => {
      if (!cur.isSelected) return acc;
      return acc + cur.quantity * cur.product.price;
    }, 0);

    const orderAmount = `${allPrice.toLocaleString()} 원`;
    const deliveryFee = !allPrice ? `0 원` : `${DELIVERY_FEE.toLocaleString()} 원`;
    const totalOrderPrice = `${(allPrice + (!allPrice ? 0 : DELIVERY_FEE)).toLocaleString()} 원`;

    return { orderAmount, deliveryFee, totalOrderPrice };
  },
});

export default orderAmountState;
