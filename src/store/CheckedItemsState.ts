import { atom } from 'recoil';

export const checkedItemsState = atom<number[]>({
  key: 'checkedItemsState',
  default: [],
});
