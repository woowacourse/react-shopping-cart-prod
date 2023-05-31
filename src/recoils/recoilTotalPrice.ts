import { selector, useRecoilValue } from 'recoil';

import { CartState } from './recoilCart';
import { CheckedState } from './recoilChecked';

import { RECOIL_KEY } from '@constants/index';

const TotalProductPrice = selector({
  key: RECOIL_KEY.TOTAL_PRODUCT_PRICE_VALUE,
  get: ({ get }) => {
    const cart = get(CartState);
    const checkedItems = get(CheckedState);

    const totalProductPrice = cart.reduce((totalPrice, item) => {
      if (checkedItems[item.id]) {
        return totalPrice + item.quantity * item.product.price;
      }

      return totalPrice;
    }, 0);

    return totalProductPrice;
  },
});

export const useTotalProductPrice = () => useRecoilValue(TotalProductPrice);
