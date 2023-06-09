import { useRecoilValue, useSetRecoilState } from 'recoil';

import { cartProductHandlerSelector } from '../../states/cartProducts';
import { toastState } from '../../states/toast';
import { DELETE_MESSAGE, QUANTITY_MESSAGE } from '../../constants/toast';

export const useCartProductUpdate = (
  id: number | undefined,
  quantity: number | undefined
) => {
  const { updateTargetQuantity, deleteTargetCartProduct } = useRecoilValue(
    cartProductHandlerSelector
  );
  const setToastState = useSetRecoilState(toastState);

  const deleteProduct = async () => {
    try {
      if (!id) {
        throw new Error('장바구니에 해당 상품이 없습니다.');
      }

      await deleteTargetCartProduct(id);
      setToastState(DELETE_MESSAGE.success);
    } catch (error) {
      setToastState(DELETE_MESSAGE.error);
    }
  };

  const addCount = async () => {
    try {
      if (!quantity || !id) {
        throw new Error('장바구니에 해당 상품이 없습니다.');
      }

      const updatedQuantity = quantity + 1;

      await updateTargetQuantity(id, updatedQuantity);
    } catch (error) {
      setToastState(QUANTITY_MESSAGE.error);
    }
  };

  const subtractCount = async () => {
    try {
      if (!quantity || !id) {
        throw new Error('장바구니에 해당 상품이 없습니다.');
      }

      const updatedQuantity = quantity - 1;

      if (updatedQuantity === 0) {
        deleteProduct();
        return;
      }

      await updateTargetQuantity(id, updatedQuantity);
    } catch (error) {
      setToastState(QUANTITY_MESSAGE.error);
    }
  };

  return { deleteProduct, addCount, subtractCount };
};
