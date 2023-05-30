import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import { cartProductState } from '../states/cartProducts';
import {
  deleteTargetProduct,
  updateTargetQuantity,
} from '../states/cartProducts/util';
import { serverNameState } from '../states/serverName';
import { toastState } from '../states/toast/atom';
import { TOAST_STATE } from '../constants/toast';

const useProductQuantity = (id: number, quantity: number) => {
  const serverName = useRecoilValue(serverNameState);
  const setCartProducts = useSetRecoilState(cartProductState);
  const setToastState = useSetRecoilState(toastState);

  const { patchData, deleteData } = cartProductApis(serverName, '/cart-items');

  const deleteProduct = async () => {
    try {
      await deleteData(id);
      setCartProducts(prev => deleteTargetProduct(prev, id));
      setToastState(TOAST_STATE.successDeleteProduct);
    } catch (error) {
      setToastState(TOAST_STATE.failedDeleteProduct);
    }
  };

  const addCount = async () => {
    try {
      const updatedQuantity = quantity + 1;

      await patchData(id, updatedQuantity);
      setCartProducts(prev => updateTargetQuantity(prev, id, updatedQuantity));
    } catch (error) {
      setToastState(TOAST_STATE.failedUpdateQuantity);
    }
  };

  const subtractCount = async () => {
    try {
      const updatedQuantity = quantity - 1;

      if (updatedQuantity === 0) {
        deleteProduct();
        return;
      }

      await patchData(id, updatedQuantity);
      setCartProducts(prev => updateTargetQuantity(prev, id, updatedQuantity));
    } catch (error) {
      setToastState(TOAST_STATE.failedUpdateQuantity);
    }
  };

  return { deleteProduct, addCount, subtractCount };
};

export default useProductQuantity;
