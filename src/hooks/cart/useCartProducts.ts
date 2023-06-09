import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  cartProductHandlerSelector,
  targetCartProductSelector,
} from '../../states/cartProducts';
import { toastState } from '../../states/toast';
import { ADD_MESSAGE } from '../../constants/toast';

export const useCartProducts = (productId: number) => {
  const [cartItemId, setCartItemId] = useState<number>();

  const targetProduct = useRecoilValue(
    targetCartProductSelector({ productId, cartItemId })
  );
  const { addCart } = useRecoilValue(cartProductHandlerSelector);
  const setToastState = useSetRecoilState(toastState);

  const addProduct = async () => {
    try {
      const cartItemId = await addCart(productId);

      if (Number.isNaN(cartItemId)) {
        throw new Error('장바구니에서 상품을 찾지 못했습니다.');
      }

      setCartItemId(cartItemId);
      setToastState(ADD_MESSAGE.success);
    } catch {
      setToastState(ADD_MESSAGE.error);
    }
  };

  return { targetProduct, addProduct };
};
