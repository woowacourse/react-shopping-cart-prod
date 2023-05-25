import { selector, selectorFamily } from 'recoil';

import { checkedCartProductState } from './atom';
import { findTargetChecked, getCheckedPrice } from './utils';

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
