import { selector, selectorFamily } from 'recoil';

import { checkedCartProductState } from './atom';
import { findTargetChecked, getCheckedPrice } from './utils';
import { cartProductCountSelector } from '../cartProducts';

export const targetCheckedSelector = selectorFamily({
  key: 'targetCheckedSelector',
  get:
    (id: number) =>
    ({ get }) =>
      findTargetChecked(get(checkedCartProductState), id),
});

export const checkedCartProductCountSelector = selector({
  key: 'checkedCartProductCountSelector',
  get: ({ get }) => get(checkedCartProductState).length,
});

export const checkedPriceSelector = selector({
  key: 'checkedPriceSelector',
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
    get(checkedCartProductCountSelector) > 0 &&
    get(checkedCartProductCountSelector) === get(cartProductCountSelector),
});

export const allUncheckedSelector = selector({
  key: 'allUncheckedSelector',
  get: ({ get }) => get(checkedCartProductCountSelector) === 0,
});
