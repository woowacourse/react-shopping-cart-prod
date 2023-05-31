import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import cartState from '../globalState/atoms/cartState';
import type { CartProduct, Product } from '../types/product';
import serverNameState from '../globalState/atoms/serverName';
import ServerUtil from '../utils/ServerUrl';
import { USER_AUTH_TOKEN } from '../constant';
import cartLoadingState from '../globalState/atoms/cartLoadingState';
import { ServerName } from '../types/server';

const getCartItemId = async (serverName: ServerName, productId: number) => {
  const cartItemsUrl = ServerUtil.getCartItemsUrl(serverName);
  const response = await fetch(cartItemsUrl, {
    headers: {
      Authorization: `Basic ${USER_AUTH_TOKEN}`,
    },
  });

  if (!response.ok) throw new Error('장바구니 목록을 불러오는 과정에서 문제가 발생했습니다.');

  const cart: CartProduct[] = await response.json();
  const product = cart.find(({ product: { id } }) => id === productId);

  return product ? product.id : null;
};

const useCartService = () => {
  const [cartList, setCartList] = useRecoilState(cartState);
  const setCartLoading = useSetRecoilState(cartLoadingState);

  const serverName = useRecoilValue(serverNameState);
  const cartItemsUrl = ServerUtil.getCartItemsUrl(serverName);

  const fetchCartItem = async () => {
    setCartLoading(true);

    const response = await fetch(cartItemsUrl, {
      headers: {
        Authorization: `Basic ${USER_AUTH_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('장바구니 목록을 불러오는 과정에서 문제가 발생했습니다.');
    }

    const fetchedCartList = await response.json();
    setCartList(fetchedCartList);

    setCartLoading(false);
  };

  const addCartItem = async (product: Product) => {
    const response = await fetch(cartItemsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ productId: product.id }),
    });

    if (!response.ok) {
      throw new Error('장바구니를 추가하는 과정에서 문제가 발생했습니다.');
    }

    const cartItemId = await getCartItemId(serverName, product.id);

    if (cartItemId === null) {
      throw new Error('장바구니를 추가하는 과정에서 문제가 발생했습니다.');
    }

    return cartItemId;
  };

  const updateCartItemQuantity = (cartId: string) => async (quantity: number) => {
    if (!cartId) return;

    const response = await fetch(`${cartItemsUrl}/${cartId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${USER_AUTH_TOKEN}`,
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      throw new Error('장바구니를 업데이트하는 과정에서 문제가 발생했습니다.');
    }
  };

  const deleteCartItem = async (cartId: string) => {
    const response = await fetch(`${cartItemsUrl}/${cartId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${USER_AUTH_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('장바구니를 삭제하는 과정에서 문제가 발생했습니다.');
    }
  };

  const getCartId = (productId: number) => {
    return cartList.filter((cartItem) => cartItem.product.id === productId)[0]?.id;
  };

  return {
    fetchCartItem,
    addCartItem,
    updateCartItemQuantity,
    deleteCartItem,
    getCartId,
  } as const;
};
export default useCartService;
