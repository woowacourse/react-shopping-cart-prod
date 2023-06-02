import { useRecoilValue, useSetRecoilState } from 'recoil';

import { cartProductState } from '../states/cartProducts';
import {
  deleteTargetProduct,
  updateTargetQuantity,
} from '../states/cartProducts/util';
import { serverNameState } from '../states/serverName';
import { toastState } from '../states/toast/atom';
import { TOAST_STATE } from '../constants/toast';
import fetchApis from '../apis/fetchApis';
import { FETCH_URLS } from '../constants/urls';

const useProductQuantity = (id: number, quantity: number) => {
  const serverName = useRecoilValue(serverNameState);
  const setCartProducts = useSetRecoilState(cartProductState);
  const setToastState = useSetRecoilState(toastState);

  const { patchData, deleteData } = fetchApis(serverName);

  const deleteProduct = async () => {
    try {
      await deleteData(`${FETCH_URLS.cartItems}/${id}`);
      setCartProducts(prev => deleteTargetProduct(prev, id));
      setToastState(TOAST_STATE.successDeleteProduct);
    } catch (error) {
      setToastState(TOAST_STATE.failedDeleteProduct);
    }
  };

  const addCount = async () => {
    try {
      const updatedQuantity = quantity + 1;

      await patchData(
        { quantity: updatedQuantity },
        `${FETCH_URLS.cartItems}/${id}`
      );
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

      await patchData(
        { quantity: updatedQuantity },
        `${FETCH_URLS.cartItems}/${id}`
      );
      setCartProducts(prev => updateTargetQuantity(prev, id, updatedQuantity));
    } catch (error) {
      setToastState(TOAST_STATE.failedUpdateQuantity);
    }
  };

  return { deleteProduct, addCount, subtractCount };
};

export default useProductQuantity;
