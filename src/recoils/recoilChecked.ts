import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

import { LOCAL_STORAGE_KEY, RECOIL_KEY } from '@constants/index';

import type { CheckedStateType } from '../types';

export const CheckedState = atom<CheckedStateType>({
  key: RECOIL_KEY.CHECKED_STATE,
  default: {
    all: true,
  },
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.CHECKED_STATE)],
});

export const CheckedLength = selector({
  key: 'checkedLength',
  get: ({ get }) => {
    const checkedState = get(CheckedState);
    return Object.keys(checkedState).length - 1;
  },
});

export const useCheckedValue = () => useRecoilValue(CheckedState);

export const useSetCheckedState = () => useSetRecoilState(CheckedState);

export const useCheckedLength = () => useRecoilValue(CheckedLength);
