import {
  atom,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import type { CartItemType } from '../../../types/ProductType';

import { useCallback, useMemo } from 'react';

import serverUrlState from '@recoil/server/serverUrlState';

import generateFetchCart from '../remote/generateFetchCart';
import credentialState from '@recoil/server/credentialState';
import useFetchCart from '../hooks/useFetchCart';
import { CART_PATH } from '@constants/urlConstants';

export const cartQuery = selector({
  key: 'cartState/default',
  get: async ({ get }) => {
    const serverUrl = get(serverUrlState);
    const credential = get(credentialState);
    const fetchCart = generateFetchCart({ resource: `${serverUrl}/${CART_PATH}`, credential });

    const response = await fetchCart.GET();
    const cartProducts: CartItemType[] = await response.json();

    return cartProducts.map((cartProduct) => {
      cartProduct.checked = true;
      return cartProduct;
    });
  },
});

const cartState = atom<CartItemType[]>({
  key: 'cartState',
  default: cartQuery,
});

export default cartState;

export const useRefreshCart = () => useRecoilRefresher_UNSTABLE(cartState);

export const useCartItem = (productId: number) => {
  const [cart, setCart] = useRecoilState(cartState);
  const cartItem = cart.find((cartItem) => cartItem.product.id === productId);
  const fetchCart = useFetchCart();

  const quantity = cartItem?.quantity ?? 0;
  const cartItemId = cartItem?.id;

  const addCartItem = async (productId: number) => {
    await fetchCart.POST(productId);
    const response = await fetchCart.GET();
    const newCart: CartItemType[] = await response.json();
    const checkedCart = newCart.map((cartItem) => {
      cartItem.checked = true;
      return cartItem;
    });

    setCart(checkedCart);
  };

  const updateCartItemQuantity = (cartId: number, quantity: number) => {
    if (!cart.some((cartItem) => cartItem.id === cartId)) {
      console.error(
        '수량 변경하였지만 recoil에서 관리하는 cartState에서 cartItem의 id를 찾을 수 없습니다. '
      );

      return;
    }

    // DELETE
    if (quantity === 0) {
      setCart(cart.filter((cartItem) => cartItem.id !== cartId));
      fetchCart.DELETE(cartId);
      return;
    }

    // UPDATE(PATCH)
    setCart(
      cart.map((cartItem) => {
        if (cartItem.id === cartId) {
          return {
            ...cartItem,
            quantity,
          };
        }
        return cartItem;
      })
    );
    fetchCart.PATCH(cartId, quantity);
  };

  return {
    cartItemId,
    quantity,
    updateCartItemQuantity,
    addCartItem,
  };
};

export const useCheckedCartItem = () => {};

export const useResetCart = () => useResetRecoilState(cartState);

export const useCartReadOnly = () => useRecoilValue(cartState);

export const useCheckCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const fetchCart = useFetchCart();

  const toggleMap = useMemo<{ [id: number]: boolean }>(() => {
    return cart.reduce((acc, { product, checked }) => {
      const { id } = product;
      Object.assign(acc, { [id]: checked });
      return acc;
    }, {});
  }, [cart]);

  const isAllChecked = cart.every((cartItem) => cartItem.checked);

  const checkedCount = Object.values(toggleMap).reduce((acc, cur) => {
    if (cur) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const isCheckedById = useCallback((id: number) => toggleMap[id], [toggleMap]);

  const toggleAllCartItem = useCallback(() => {
    setCart((prevCart) => {
      return prevCart.map((item) => ({ ...item, checked: !isAllChecked }));
    });
  }, [isAllChecked, setCart]);

  const deleteCheckedItems = () => {
    setCart(cart.filter((item) => item.checked === false));

    cart
      .filter((item) => item.checked === true)
      .forEach((item) => {
        fetchCart.DELETE(item.id);
      });
  };

  return {
    isAllChecked,
    checkedCount,
    isCheckedById,
    toggleAllCartItem,
    deleteCheckedItems,
  };
};
