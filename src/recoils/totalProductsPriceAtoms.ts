import { selector, useRecoilValue } from 'recoil';
import { checkedCartItemsSelector } from './cartAtoms';

import { RECOIL_KEY } from '@constants/index';

const totalProductsPriceSelector = selector({
  key: RECOIL_KEY.TOTAL_PRODUCT_PRICE_VALUE,
  get: ({ get }) => {
    const checkedCartItems = get(checkedCartItemsSelector);

    const totalProductsPrice = checkedCartItems.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.product.price;
    }, 0);

    return totalProductsPrice;
  },
});

export const useTotalProductsPrice = () => useRecoilValue(totalProductsPriceSelector);
