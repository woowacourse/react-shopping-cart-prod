import { useRecoilCallback, useRecoilValue } from 'recoil';
import { cartState } from '../recoil/atoms/cart';
import { CART_BASE_URL } from '../constants/api';
import useToast from '../components/common/Toast/useToast';
import {
  addCartItem,
  fetchCartItems,
  removeCartItem,
  updateQuantity,
} from '../remotes/cart';
import { userState } from '../recoil/atoms/auth';
import { serverOriginState } from '../recoil/atoms/common';
import { getBase64 } from '../constants/auth';
import type { Product } from '../types/product';
import type { CartItem } from '../types/cart';

const useCart = () => {
  const cart = useRecoilValue(cartState);
  const serverOrigin = useRecoilValue(serverOriginState);
  const user = useRecoilValue(userState);
  const { showToast } = useToast();

  const updateCart = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        const newUser = await snapshot.getPromise(userState);
        const newCart = await fetchCartItems(
          `${serverOrigin}${CART_BASE_URL}`,
          getBase64(newUser),
        );

        set(cartState, newCart);
      },
    [serverOrigin, user],
  );

  const addProductToCart = async (productId: Product['id']) => {
    try {
      await addCartItem(
        `${serverOrigin}${CART_BASE_URL}`,
        productId,
        getBase64(user),
      );
    } catch (e) {
      if (e instanceof Error) {
        showToast('error', e.message);
        return;
      }
    }

    showToast('success', '장바구니에 추가되었습니다.');
    updateCart();
  };

  const updateProductQuantity = async (
    targetId: CartItem['id'],
    quantity: CartItem['quantity'],
  ) => {
    try {
      await updateQuantity(
        `${serverOrigin}${CART_BASE_URL}/${targetId}`,
        quantity,
        getBase64(user),
      );
    } catch (e) {
      if (e instanceof Error) {
        showToast('error', e.message);
        return;
      }
    }

    updateCart();
  };

  const removeProductFromCart = async (targetId: CartItem['id']) => {
    try {
      await removeCartItem(
        `${serverOrigin}${CART_BASE_URL}/${targetId}`,
        getBase64(user),
      );
    } catch (e) {
      if (e instanceof Error) {
        showToast('error', e.message);
        return;
      }
    }

    updateCart();
  };

  const removeAllProductsFromCart = (targetIds: Array<CartItem['id']>) => {
    targetIds.forEach((id) => removeProductFromCart(id));
  };

  return {
    cart,
    updateCart,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    removeAllProductsFromCart,
  } as const;
};

export default useCart;
