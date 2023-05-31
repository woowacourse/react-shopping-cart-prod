import { useRecoilCallback } from 'recoil';

import { cartIdListState } from '../store/cart';
import {
  checkedCartIdListState,
  checkedCartItemState,
  isCartAllCheckedState,
} from '../store/cartCheckbox';

const useCartCheckbox = () => {
  const toggleAllCheckbox = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const cartIdList = await snapshot.getPromise(cartIdListState);
        const isAllChecked = await snapshot.getPromise(isCartAllCheckedState);

        set(checkedCartIdListState, () => {
          return isAllChecked ? new Set([]) : new Set([...cartIdList]);
        });
      },
    []
  );

  const toggleItemCheckbox = useRecoilCallback(
    ({ snapshot, set }) =>
      async (cartItemId: number) => {
        const isChecked = await snapshot.getPromise(checkedCartItemState(cartItemId));

        set(checkedCartIdListState, (prevCheckedCartIdList) => {
          const newCheckedIdList = new Set([...prevCheckedCartIdList]);

          isChecked ? newCheckedIdList.delete(cartItemId) : newCheckedIdList.add(cartItemId);

          return newCheckedIdList;
        });
      },
    []
  );

  return {
    toggleAllCheckbox,
    toggleItemCheckbox,
  };
};

export { useCartCheckbox };
