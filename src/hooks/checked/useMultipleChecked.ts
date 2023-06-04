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
      setToastState({
        message: '선택한 상품을 장바구니에서 삭제했습니다',
        variant: 'success',
        duration: 2000,
      });
    } catch {
      setToastState({
        message: '상품 삭제를 실패했습니다',
        variant: 'error',
        duration: 2000,
      });
    }
  };

  return {
    isAllChecked,
    isAllUnchecked,
    toggleAllProductChecked,
    deleteCheckedProducts,
  };
};
