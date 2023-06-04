import { selector, selectorFamily } from 'recoil';

import { checkedCartProductState } from './atom';
import { findTargetChecked, getCheckedPrice } from './utils';
import { cartProductCountState } from '../cartProducts';

export const targetCheckedState = selectorFamily({
  key: 'targetCheckedState',
  get:
    (id: number) =>
    ({ get }) =>
      findTargetChecked(get(checkedCartProductState), id),
});

export const checkedCartProductCountState = selector({
  key: 'checkedCartProductCountState',
  get: ({ get }) => get(checkedCartProductState).length,
});

export const checkedPriceState = selector({
  key: 'checkedPriceState',
  get: ({ get }) => getCheckedPrice(get(checkedCartProductState)),
});

export const checkedCartProductIdSelector = selector({
  key: 'checkedCartProductIdSelector',
  get: ({ get }) =>
    get(checkedCartProductState).map((cartProduct) => cartProduct.id),
});

export const allCheckedSelector = selector({
  key: 'allCheckedSelector',
  get: ({ get }) =>
    get(checkedCartProductCountState) > 0 &&
    get(checkedCartProductCountState) === get(cartProductCountState),
});

export const allUncheckedSelector = selector({
  key: 'allUncheckedSelector',
  get: ({ get }) => get(checkedCartProductCountState) === 0,
});
