import { useRecoilState, useRecoilValue } from 'recoil';
import cartState from '../globalState/atoms/cartState';
import type { Product } from '../types/product';
import serverNameState from '../globalState/atoms/serverName';
import ServerUtil from '../utils/ServerUrl';
import { USER_AUTH_TOKEN } from '../constant';

const useCartService = () => {
  const [cartList, setCartList] = useRecoilState(cartState);

  const serverName = useRecoilValue(serverNameState);
  const cartItemsUrl = ServerUtil.getCartItemsUrl(serverName);

  const fetchCartItem = async () => {
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

    fetchCartItem();
  };

  const updateCartItemQuantity =
    (cartId: string) => async (quantity: number) => {
      const response = await fetch(`${cartItemsUrl}/${cartId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${USER_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ quantity: quantity }),
      });

      if (!response.ok) {
        throw new Error(
          '장바구니를 업데이트하는 과정에서 문제가 발생했습니다.',
        );
      }

      setCartList((prevCart) => {
        return prevCart.map((cartItem) => {
          if (cartItem.id !== cartId) return cartItem;

          return {
            ...cartItem,
            quantity,
          };
        });
      });
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

    setCartList((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== cartId),
    );
  };

  const getCartId = (productId: number) => {
    return cartList.filter((cartItem) => cartItem.product.id === productId)[0]
      ?.id;
  };

  return {
    cartList,
    addCartItem,
    updateCartItemQuantity,
    deleteCartItem,
    getCartId,
  } as const;
};
export default useCartService;
