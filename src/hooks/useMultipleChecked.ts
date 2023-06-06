import type { ChangeEventHandler } from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

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
import fetchApis from '../apis/fetchApis';
import { FETCH_URLS } from '../constants/urls';

const useMultipleChecked = () => {
  const serverName = useRecoilValue(serverNameState);
  const [checked, setChecked] = useRecoilState(checkedCartProductState);
  const resetChecked = useResetRecoilState(checkedCartProductState);
  const [cartProducts, setCartProducts] = useRecoilState(cartProductState);
  const setToastState = useSetRecoilState(toastState);

  const { deleteData } = fetchApis(serverName);

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

  const deleteCheckedProductState = () => {
    setCartProducts(prev =>
      prev.filter(cartProduct => !findTargetChecked(checked, cartProduct.id))
    );

    resetChecked();
  };

  const deleteCheckedProducts = () => {
    try {
      checked.forEach(async item => {
        await deleteData(`${FETCH_URLS.cartItems}/${item.id}`);
      });

      deleteCheckedProductState();
      setToastState(TOAST_STATE.successDeleteProduct);
    } catch {
      setToastState(TOAST_STATE.failedDeleteProduct);
    }
  };

  return {
    isAllChecked,
    isAllUnchecked,
    toggleAllProductChecked,
    deleteCheckedProductState,
    deleteCheckedProducts,
  };
};

export default useMultipleChecked;
