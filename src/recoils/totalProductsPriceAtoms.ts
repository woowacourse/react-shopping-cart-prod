import { selector, useRecoilValue } from 'recoil';
import { checkedCartItemsSelector } from './cartAtoms';

import { RECOIL_KEY } from '@constants/index';

const totalProductsPriceSelector = selector({
  key: RECOIL_KEY.TOTAL_PRODUCT_PRICE_VALUE,
  get: ({ get }) => {
    const checkedCartItems = get(checkedCartItemsSelector);

    return checkedCartItems.reduce((totalPrice, { quantity, product }) => totalPrice + quantity * product.price, 0);
  },
});

export const useTotalProductsPrice = () => useRecoilValue(totalProductsPriceSelector);
