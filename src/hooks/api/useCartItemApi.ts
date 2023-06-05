import { useRecoilValue } from 'recoil';
import type { CartProduct, Product } from '../../types/product';
import serverNameState from '../../globalState/atoms/serverName';
import ServerUtil from '../../utils/ServerUrl';
import { USER_AUTH_TOKEN } from '../../constant';
import { ServerName } from '../../types/server';

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

const useCartItemApi = () => {
  const serverName = useRecoilValue(serverNameState);
  const cartItemsUrl = ServerUtil.getCartItemsUrl(serverName);

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

    /*
      현재 API 명세: response에 location으로 cartItemId를 알려줌
      예정 API 명세: response에 body로 cartItemId를 알려줌
      현재 서버 설정으로 location에 접근이 불가한 상태라 임시로 다시 장바구니를 받아서 확인
      추후 서버 구현이 완료되면 예정 api 명세가 되므로 수정 예정
    */
    let cartItemId = null;
    let mayBeCartItemId;

    try {
      ({ cartItemId: mayBeCartItemId } = await response.json());
    } catch {
      mayBeCartItemId = null;
    }

    if (mayBeCartItemId !== null) {
      cartItemId = mayBeCartItemId;
    } else {
      cartItemId = await getCartItemId(serverName, product.id);
    }

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

  return {
    addCartItem,
    updateCartItemQuantity,
    deleteCartItem,
  } as const;
};
export default useCartItemApi;
