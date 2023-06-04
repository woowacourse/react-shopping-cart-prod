import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  cartProductHandlerSelector,
  targetCartProductSelector,
} from '../../states/cartProducts';
import { toastState } from '../../states/toast';

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
      setToastState({
        message: '상품 추가를 성공했습니다.',
        variant: 'success',
        duration: 2000,
      });
    } catch {
      setToastState({
        message: '상품 추가를 실패했습니다.',
        variant: 'error',
        duration: 2000,
      });
    }
  };

  return { targetProduct, addProduct };
};
