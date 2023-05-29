import {
  atom,
  selector,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import type { CartItemType } from '../../../types/ProductType';

import serverUrlState from '@recoil/server/serverUrlState';

import generateFetchCart from '../remote/generateFetchCart';
import credentialState from '@recoil/server/credentialState';
import useFetchCart from '../hooks/useFetchCart';
import { CART_PATH } from '@constants/urlConstants';

export const cartRefresher = atom({
  key: 'cartRefresher',
  default: 0,
});

const cartQuery = selector({
  key: 'cartState/default',
  get: async ({ get }) => {
    get(cartRefresher);
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

  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

const cartState = atom<CartItemType[]>({
  key: 'cartState',
  default: cartQuery,
});

export default cartState;

export const useResetCart = () => useResetRecoilState(cartState);

export const useRefreshCart = () => {
  const resetCart = useResetRecoilState(cartState);
  const [refreshCount, setRefresher] = useRecoilState(cartRefresher);

  return () => {
    resetCart();
    setRefresher(refreshCount + 1);
  };
};

export const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const fetchCart = useFetchCart();

  const getCartItemQuantity = (productId: number) => {
    const cartItem = cart.find((cartItem) => cartItem.product.id === productId);
    return cartItem?.quantity ?? 0;
  };

  const getCartItemId = (productId: number): number | undefined => {
    const cartItem = cart.find((cartItem) => cartItem.product.id === productId);
    return cartItem?.id;
  };

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

  const isAllChecked = cart.every((cartItem) => cartItem.checked);

  const getCartItemIsChecked = (cartId: number) => {
    const cartItem = cart.find((cartItem) => cartItem.id === cartId);
    return cartItem?.checked ?? false;
  };

  const setCartItemIsChecked = (cartId: number) => {
    setCart(
      cart.map((cartItem) => {
        if (cartItem.id === cartId) {
          return {
            ...cartItem,
            checked: !cartItem.checked,
          };
        }
        return cartItem;
      })
    );
  };

  const checkedCartCount = cart.reduce(
    (totalCount, cartItem) => (cartItem.checked ? totalCount + 1 : totalCount),
    0
  );

  const toggleAllCartItem = () => {
    setCart((prevCart) => {
      return prevCart.map((item) => ({ ...item, checked: !isAllChecked }));
    });
  };

  const deleteCheckedItems = () => {
    setCart(cart.filter((cartItem) => cartItem.checked === false));

    cart
      .filter((cartItem) => cartItem.checked === true)
      .forEach((cartItem) => {
        fetchCart.DELETE(cartItem.id);
      });
  };

  const totalPrice = cart.reduce((totalPrice, cartItem) => {
    return cartItem.checked ? totalPrice + cartItem.product.price * cartItem.quantity : totalPrice;
  }, 0);

  return {
    cart,
    setCart,

    getCartItemQuantity,
    getCartItemId,
    updateCartItemQuantity,
    addCartItem,

    isAllChecked,
    checkedCartCount,
    getCartItemIsChecked,
    setCartItemIsChecked,
    toggleAllCartItem,
    deleteCheckedItems,

    totalPrice,
  };
};
