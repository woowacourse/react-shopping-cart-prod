import type { ChangeEventHandler } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import { checkedState } from '../states/checkedCartProducts';
import { cartProductState } from '../states/cartProducts';
import {
  filterCartProductChecked,
  findTargetChecked,
  getIsAllChecked,
  getIsAllUnchecked,
  updateCartProductChecked,
} from '../states/checkedCartProducts/utils';
import { serverNameState } from '../states/serverName';

const useMultipleChecked = () => {
  const serverName = useRecoilValue(serverNameState);
  const [checked, setChecked] = useRecoilState(checkedState(serverName));
  const setCartProducts = useSetRecoilState(cartProductState(serverName));

  const { deleteData } = cartProductApis(serverName, '/cart-items');

  const isAllChecked = getIsAllChecked(checked);
  const isAllUnchecked = getIsAllUnchecked(checked);

  const toggleAllProductChecked: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setChecked((prev) =>
      prev.map((item) =>
        updateCartProductChecked(item, event.currentTarget.checked)
      )
    );
  };

  const deleteCheckedProducts = () => {
    setCartProducts((prev) =>
      prev.filter(
        (cartProduct) => !findTargetChecked(checked, cartProduct.id)?.isChecked
      )
    );
    setChecked((prev) => filterCartProductChecked(prev, false));

    checked.forEach((item) => {
      if (item.isChecked) deleteData(item.id);
    });
  };

  return {
    isAllChecked,
    isAllUnchecked,
    toggleAllProductChecked,
    deleteCheckedProducts,
  };
};

export default useMultipleChecked;
