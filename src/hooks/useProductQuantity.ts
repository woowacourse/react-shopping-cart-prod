import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import { cartProductState } from '../states/cartProducts';
import {
  deleteTargetProduct,
  updateTargetQuantity,
} from '../states/cartProducts/util';
import { serverNameState } from '../states/serverName';

const useProductQuantity = (id: number, quantity: number) => {
  const serverName = useRecoilValue(serverNameState);
  const setCartProducts = useSetRecoilState(cartProductState(serverName));

  const { patchData, deleteData } = cartProductApis(serverName, '/cart-items');

  const deleteProduct = () => {
    try {
      deleteData(id);
      setCartProducts((prev) => deleteTargetProduct(prev, id));
    } catch (error) {
      // 에러처리
    }
  };

  const addCount = () => {
    try {
      const updatedQuantity = quantity + 1;

      patchData(id, updatedQuantity);
      setCartProducts((prev) =>
        updateTargetQuantity(prev, id, updatedQuantity)
      );
    } catch (error) {
      // 에러 처리
    }
  };

  const subtractCount = () => {
    try {
      const updatedQuantity = quantity - 1;

      if (updatedQuantity === 0) {
        deleteProduct();
        return;
      }

      patchData(id, updatedQuantity);
      setCartProducts((prev) =>
        updateTargetQuantity(prev, id, updatedQuantity)
      );
    } catch (error) {
      // 에러 처리
    }
  };

  return { deleteProduct, addCount, subtractCount };
};

export default useProductQuantity;
