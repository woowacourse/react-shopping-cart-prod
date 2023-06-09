import { atom, selector } from "recoil";

export const pointUsageState = atom({
  key: 'pointUsageState',
  default: {
    checkedBy: 'none',
    appliedPoint: 0,
  },
});

export const totalAppliedPointSelector = selector({
  key: 'totalAppliedPointSelector',
  get: ({ get }) => {
    const { checkedBy, appliedPoint } = get(pointUsageState);
    return checkedBy ? appliedPoint : 0;
  },
});