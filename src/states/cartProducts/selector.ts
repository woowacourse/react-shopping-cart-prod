import { selectorFamily } from 'recoil';

import { findTargetProduct } from './util';
import { cartProductState } from './atom';
import { ServerKey } from '../../constants/server';

export const cartProductCountState = selectorFamily({
  key: 'cartProductCountState',
  get:
    (name: ServerKey) =>
    ({ get }) =>
      get(cartProductState(name)).length,
});

export const targetCartProductState = selectorFamily({
  key: 'targetCartProductState',
  get:
    ({ name, id }: { name: ServerKey; id: number }) =>
    ({ get }) =>
      findTargetProduct(get(cartProductState(name)), id),
});
