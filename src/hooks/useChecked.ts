import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  checkedCartProductState,
  targetCheckedState,
} from '../states/checkedCartProducts';
import {
  addCartProductChecked,
  deleteCartProductChecked,
} from '../states/checkedCartProducts/utils';
import { CartProduct } from '../types/product';

const useChecked = (cartProduct: CartProduct) => {
  const { id } = cartProduct;
  const targetChecked = useRecoilValue(targetCheckedState(id));
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

export default useChecked;
