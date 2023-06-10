import { USER_AUTH_TOKEN } from '../constant';
import type { CartProduct, Product } from '../types/product';
import type { ServerName } from '../types/server';
import ServerUtil from '../utils/ServerUrl';

const getAllList = async (serverName: ServerName): Promise<CartProduct[]> => {
  const url = ServerUtil.getCartItemsUrl(serverName);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${USER_AUTH_TOKEN}`,
    },
  });

  if (response.status !== 200) throw new Error('장바구니 불러오기를 실패했어요.');

  const data: CartProduct[] = await response.json();

  return data;
};

const findCartItemId = async (serverName: ServerName, productId: number) => {
  const cart = await getAllList(serverName);
  const product = cart.find(({ product: { id } }) => id === productId);

  return product ? product.id : null;
};

const addNewItem = async (serverName: ServerName, product: Product): Promise<string> => {
  const url = ServerUtil.getCartItemsUrl(serverName);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${USER_AUTH_TOKEN}`,
    },
    body: JSON.stringify({ productId: product.id }),
  });

  if (response.status !== 201) {
    throw new Error('장바구니 상품 담기를 실패했어요.');
  }

  /*
  -장바구니 처음 상품 등록 시-
  현재 API 명세: response에 location으로 cartItemId를 알려줌
  예정 API 명세: response에 body로 cartItemId를 알려줌
  현재 서버 설정으로 location에 접근이 불가한 상태라 임시로 다시 장바구니를 받아서 확인
  추후 서버 구현이 완료되면 예정 api 명세가 되므로 수정 예정
  */
  let cartItemId: string | null;

  try {
    ({ cartItemId } = await response.json());
  } catch {
    cartItemId = await findCartItemId(serverName, product.id);
  }

  if (!cartItemId) {
    throw new Error('장바구니 상품 담기를 실패했어요.');
  }

  return cartItemId;
};

const changeQuantity = async (serverName: ServerName, cartItemId: string, quantity: number) => {
  const url = ServerUtil.getCartItemsUrl(serverName);

  const response = await fetch(`${url}/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${USER_AUTH_TOKEN}`,
    },
    body: JSON.stringify({ quantity }),
  });

  if (response.status !== 200) {
    throw new Error('장바구니 상품 개수 변경에 실패했어요.');
  }

  return response.ok;
};

const deleteItem = async (serverName: ServerName, cartItemId: string) => {
  const url = ServerUtil.getCartItemsUrl(serverName);

  const response = await fetch(`${url}/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${USER_AUTH_TOKEN}`,
    },
  });

  if (response.status !== 204) {
    throw new Error('장바구니 상품 삭제를 실패했어요.');
  }

  return response.ok;
};

const CartApi = { getAllList, addNewItem, changeQuantity, deleteItem };

export default CartApi;
