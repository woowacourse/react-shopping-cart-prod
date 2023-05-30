import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import { cartProductState } from '../states/cartProducts';
import {
  deleteTargetProduct,
  updateTargetQuantity,
} from '../states/cartProducts/util';
import { serverNameState } from '../states/serverName';
import { toastState } from '../states/toast/atom';

const useProductQuantity = (id: number, quantity: number) => {
  const serverName = useRecoilValue(serverNameState);
  const setCartProducts = useSetRecoilState(cartProductState);
  const setToastState = useSetRecoilState(toastState);

  const { patchCartProduct, deleteCartProduct } = cartProductApis(serverName);

  const deleteProduct = async () => {
    try {
      await deleteCartProduct(id);
      setCartProducts((prev) => deleteTargetProduct(prev, id));
      setToastState({
        message: '상품을 삭제했어요',
        variant: 'success',
        duration: 2000,
      });
    } catch (error) {
      setToastState({
        message: '상품 삭제를 실패했습니다',
        variant: 'error',
        duration: 2000,
      });
    }
  };

  const addCount = async () => {
    try {
      const updatedQuantity = quantity + 1;

      await patchCartProduct(id, updatedQuantity);
      setCartProducts((prev) =>
        updateTargetQuantity(prev, id, updatedQuantity)
      );
    } catch (error) {
      setToastState({
        message: '수량 변경을 실패했습니다',
        variant: 'error',
        duration: 2000,
      });
    }
  };

  const subtractCount = async () => {
    try {
      const updatedQuantity = quantity - 1;

      if (updatedQuantity === 0) {
        deleteProduct();
        return;
      }

      await patchCartProduct(id, updatedQuantity);
      setCartProducts((prev) =>
        updateTargetQuantity(prev, id, updatedQuantity)
      );
    } catch (error) {
      setToastState({
        message: '수량 변경을 실패했습니다',
        variant: 'error',
        duration: 2000,
      });
    }
  };

  return { deleteProduct, addCount, subtractCount };
};

export default useProductQuantity;
