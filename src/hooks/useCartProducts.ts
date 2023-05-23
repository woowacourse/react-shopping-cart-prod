import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import {
  cartProductState,
  targetCartProductState,
} from '../states/cartProducts';
import {
  addTargetProduct,
  deleteTargetProduct,
} from '../states/cartProducts/util';
import type { Product } from '../types/product';
import { serverNameState } from '../states/serverName';

const useCartProducts = (product: Product) => {
  const { id } = product;
  const serverName = useRecoilValue(serverNameState);
  const setCartProducts = useSetRecoilState(cartProductState(serverName));
  const targetProduct = useRecoilValue(
    targetCartProductState({ name: serverName, id })
  );

  const { postData, deleteData } = cartProductApis(serverName, '/cart-items');

  const addProduct = async () => {
    const location = await postData(id);
    console.log(location);
    setCartProducts((prev) => addTargetProduct(prev, product));
  };

  const deleteProduct = useCallback(() => {
    setCartProducts((prev) => deleteTargetProduct(prev, id));
    deleteData(id);
  }, [deleteData, id, setCartProducts]);

  useEffect(() => {
    if (!targetProduct) return;

    if (targetProduct.quantity === 0) {
      deleteProduct();
    }
  }, [deleteProduct, targetProduct]);

  return { targetProduct, addProduct, deleteProduct };
};

export default useCartProducts;
