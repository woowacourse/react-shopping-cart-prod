import { selector, selectorFamily } from 'recoil';

import { findTargetProduct } from './util';
import { cartProductState } from './atom';

export const cartProductCountState = selector({
  key: 'cartProductCountState',
  get: ({ get }) => get(cartProductState).length,
});

export const targetCartProductState = selectorFamily({
  key: 'targetCartProductState',
  get:
    ({ productId, cartItemId }: { productId: number; cartItemId?: number }) =>
    ({ get }) =>
      findTargetProduct(get(cartProductState), productId, cartItemId),
});
