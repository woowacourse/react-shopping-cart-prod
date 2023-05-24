import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import cartProductApis from '../apis/cartProducts';
import {
  cartProductState,
  targetCartProductState,
} from '../states/cartProducts';
import { addTargetProduct } from '../states/cartProducts/util';
import type { Product } from '../types/product';
import { serverNameState } from '../states/serverName';

const useCartProducts = (product: Product) => {
  const [cartItemId, setCartItemId] = useState<number>();

  const { id } = product;
  const serverName = useRecoilValue(serverNameState);
  const setCartProducts = useSetRecoilState(cartProductState(serverName));
  const targetProduct = useRecoilValue(
    targetCartProductState({ serverName, productId: id, cartItemId })
  );

  const { postData } = cartProductApis(serverName, '/cart-items');

  const addProduct = async () => {
    try {
      const location = await postData(id);

      const cartItemId = Number(location?.split('/').pop());

      if (Number.isNaN(cartItemId)) {
        throw new Error('location fuck');
      }

      setCartItemId(cartItemId);
      setCartProducts((prev) => addTargetProduct(prev, cartItemId, product));
    } catch {
      // 에러 처리
    }
  };

  return { targetProduct, addProduct };
};

export default useCartProducts;
