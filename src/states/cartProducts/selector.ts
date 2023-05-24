import { selectorFamily } from 'recoil';

import { findTargetProduct } from './util';
import { cartProductState } from './atom';
import { ServerKey } from '../../constants/server';

export const cartProductCountState = selectorFamily({
  key: 'cartProductCountState',
  get:
    (serverName: ServerKey) =>
    ({ get }) =>
      get(cartProductState(serverName)).length,
});

export const targetCartProductState = selectorFamily({
  key: 'targetCartProductState',
  get:
    ({
      serverName,
      productId,
      cartItemId,
    }: {
      serverName: ServerKey;
      productId: number;
      cartItemId?: number;
    }) =>
    ({ get }) =>
      findTargetProduct(
        get(cartProductState(serverName)),
        productId,
        cartItemId
      ),
});
