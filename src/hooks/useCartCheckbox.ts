import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import { cartIdListState } from '../store/cart';
import {
  checkedCartIdListState,
  checkedCartItemState,
  isCartAllCheckedState,
} from '../store/cartCheckbox';

const useCartCheckbox = () => {
  const cartIdList = useRecoilValueLoadable(cartIdListState);
  const setCheckedCartItems = useSetRecoilState(checkedCartIdListState);

  useEffect(() => {
    if (cartIdList.state === 'hasValue') {
      setCheckedCartItems(new Set(cartIdList.contents));
    }
  }, [cartIdList, setCheckedCartItems]);

  const toggleAllCheckbox = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const isAllChecked = await snapshot.getPromise(isCartAllCheckedState);

        set(checkedCartIdListState, () => {
          return isAllChecked ? new Set([]) : new Set([...cartIdList.contents]);
        });
      },
    [cartIdList]
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
