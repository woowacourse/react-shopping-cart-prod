import { selector, useRecoilValue } from 'recoil';

import { CartState } from './recoilCart';
import { CheckedState } from './recoilChecked';

import { RECOIL_KEY } from '@constants/index';

const TotalProductsPrice = selector({
  key: RECOIL_KEY.TOTAL_PRODUCT_PRICE_VALUE,
  get: ({ get }) => {
    const cart = get(CartState);
    const checkedItems = get(CheckedState);

    const totalProductsPrice = cart.reduce((totalPrice, item) => {
      if (checkedItems[item.id]) {
        return totalPrice + item.quantity * item.product.price;
      }

      return totalPrice;
    }, 0);

    return totalProductsPrice;
  },
});

export const useTotalProductsPrice = () => useRecoilValue(TotalProductsPrice);
