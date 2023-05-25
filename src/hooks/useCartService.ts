import { useRecoilCallback, useRecoilValue } from 'recoil';
import { cartState, serverOriginState } from '../recoil/atoms';
import { CART_BASE_URL } from '../constants';
import useToast from '../components/common/Toast/useToast';
import {
  addCartItem,
  fetchCartItems,
  removeCartItem,
  updateQuantity,
} from '../remotes/cart';
import type { CartItem, Product } from '../types/product';

const useCartService = () => {
  const cart = useRecoilValue(cartState);
  const serverOrigin = useRecoilValue(serverOriginState);
  const updateCart = useRecoilCallback(({ set }) => async () => {
    const newCart = await fetchCartItems(`${serverOrigin}${CART_BASE_URL}`);

    set(cartState, newCart);
  });
  const { showToast } = useToast();

  const addProductToCart = async (productId: Product['id']) => {
    try {
      await addCartItem(`${serverOrigin}${CART_BASE_URL}`, productId);
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
      await removeCartItem(`${serverOrigin}${CART_BASE_URL}/${targetId}`);
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
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    removeAllProductsFromCart,
  } as const;
};

export default useCartService;
