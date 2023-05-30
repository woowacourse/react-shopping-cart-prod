import type { ChangeEventHandler } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import cartProductApis from '../apis/cartProducts';
import { checkedCartProductState } from '../states/checkedCartProducts';
import { cartProductState } from '../states/cartProducts';
import {
  findTargetChecked,
  getIsAllChecked,
  getIsAllUnchecked,
} from '../states/checkedCartProducts/utils';
import { serverNameState } from '../states/serverName';
import { toastState } from '../states/toast/atom';

const useMultipleChecked = () => {
  const serverName = useRecoilValue(serverNameState);
  const [checked, setChecked] = useRecoilState(checkedCartProductState);
  const resetChecked = useResetRecoilState(checkedCartProductState);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductState);
  const setToastState = useSetRecoilState(toastState);

  const { deleteCartProduct } = cartProductApis(serverName);

  const isAllChecked = getIsAllChecked(cartProducts, checked);
  const isAllUnchecked = getIsAllUnchecked(checked);

  const toggleAllProductChecked: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { checked } = event.currentTarget;

    if (checked) {
      resetChecked();
      return;
    }

    setChecked([]);
  };

  const deleteCheckedProducts = () => {
    try {
      checked.forEach(async (item) => {
        await deleteCartProduct(item.id);
      });

      setCartProducts((prev) =>
        prev.filter(
          (cartProduct) => !findTargetChecked(checked, cartProduct.id)
        )
      );
      setChecked([]);
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

export default useMultipleChecked;
