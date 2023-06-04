import type { ChangeEventHandler } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  allCheckedSelector,
  allUncheckedSelector,
  checkedCartProductIdSelector,
  checkedCartProductState,
} from '../../states/checkedCartProducts';
import { cartProductHandlerSelector } from '../../states/cartProducts';

import { toastState } from '../../states/toast';
import { DELETE_MESSAGE } from '../../constants/toast';

export const useMultipleChecked = () => {
  const checkedCartProductIds = useRecoilValue(checkedCartProductIdSelector);
  const setCheckedCartProducts = useSetRecoilState(checkedCartProductState);
  const setToastState = useSetRecoilState(toastState);
  const resetChecked = useResetRecoilState(checkedCartProductState);

  const { deleteMultipleCartProducts } = useRecoilValue(
    cartProductHandlerSelector
  );

  const isAllChecked = useRecoilValue(allCheckedSelector);
  const isAllUnchecked = useRecoilValue(allUncheckedSelector);

  const toggleAllProductChecked: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { checked } = event.currentTarget;

    if (checked) {
      resetChecked();
      return;
    }

    setCheckedCartProducts([]);
  };

  const deleteCheckedProducts = async () => {
    try {
      await deleteMultipleCartProducts(checkedCartProductIds);
      setCheckedCartProducts([]);
      setToastState(DELETE_MESSAGE.success);
    } catch {
      setToastState(DELETE_MESSAGE.error);
    }
  };

  return {
    isAllChecked,
    isAllUnchecked,
    toggleAllProductChecked,
    deleteCheckedProducts,
  };
};
