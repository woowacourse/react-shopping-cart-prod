import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  cartProductState,
  targetCartProductState,
} from '../states/cartProducts';
import { addTargetProduct } from '../states/cartProducts/util';
import type { Product } from '../types/product';
import { serverNameState } from '../states/serverName';
import { toastState } from '../states/toast/atom';
import { TOAST_STATE } from '../constants/toast';
import fetchApis from '../apis/fetchApis';

const useCartProducts = (product: Product) => {
  const [cartItemId, setCartItemId] = useState<number>();

  const { id } = product;
  const serverName = useRecoilValue(serverNameState);
  const setCartProducts = useSetRecoilState(cartProductState);
  const targetProduct = useRecoilValue(
    targetCartProductState({ productId: id, cartItemId })
  );
  const setToastState = useSetRecoilState(toastState);

  const { postData } = fetchApis(serverName);

  const addProduct = async () => {
    try {
      const location = await postData({ productId: id }, '/cart-items');

      const cartItemId = Number(location?.split('/').pop());

      if (Number.isNaN(cartItemId)) {
        throw new Error('장바구니에서 상품을 찾지 못했습니다.');
      }

      setCartItemId(cartItemId);
      setCartProducts(prev => addTargetProduct(prev, cartItemId, product));
      setToastState(TOAST_STATE.successAddProduct);
    } catch {
      setToastState(TOAST_STATE.failedAddProduct);
    }
  };

  return { targetProduct, addProduct };
};

export default useCartProducts;
