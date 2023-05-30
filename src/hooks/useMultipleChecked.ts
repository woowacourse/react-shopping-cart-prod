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
import { TOAST_STATE } from '../constants/toast';

const useMultipleChecked = () => {
  const serverName = useRecoilValue(serverNameState);
  const [checked, setChecked] = useRecoilState(checkedCartProductState);
  const resetChecked = useResetRecoilState(checkedCartProductState);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductState);
  const setToastState = useSetRecoilState(toastState);

  const { deleteData } = cartProductApis(serverName, '/cart-items');

  const isAllChecked = getIsAllChecked(cartProducts, checked);
  const isAllUnchecked = getIsAllUnchecked(checked);

  const toggleAllProductChecked: ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const { checked } = event.currentTarget;

    if (checked) {
      resetChecked();
      return;
    }

    setChecked([]);
  };

  const deleteCheckedProducts = () => {
    try {
      checked.forEach(async item => {
        await deleteData(item.id);
      });

      setCartProducts(prev =>
        prev.filter(cartProduct => !findTargetChecked(checked, cartProduct.id))
      );
      setChecked([]);
      setToastState(TOAST_STATE.successDeleteProduct);
    } catch {
      setToastState(TOAST_STATE.failedDeleteProduct);
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
