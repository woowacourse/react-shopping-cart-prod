import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  checkedCartProductState,
  targetCheckedSelector,
} from '../../states/checkedCartProducts';
import {
  addCartProductChecked,
  deleteCartProductChecked,
} from '../../states/checkedCartProducts/utils';
import { CartProduct } from '../../types/product';

export const useChecked = (cartProduct: CartProduct) => {
  const { id } = cartProduct;
  const targetChecked = useRecoilValue(targetCheckedSelector(id));
  const setChecked = useSetRecoilState(checkedCartProductState);

  const updateChecked = (isChecked: boolean) => {
    setChecked((prev) =>
      isChecked
        ? addCartProductChecked(prev, cartProduct)
        : deleteCartProductChecked(prev, id)
    );
  };

  const deleteChecked = () => {
    setChecked((prev) => deleteCartProductChecked(prev, id));
  };

  return { targetChecked, updateChecked, deleteChecked };
};
