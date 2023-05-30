import { fetchDelete, fetchPatch, fetchPost } from '@utils/fetchUtils';
import { ServerName, getCartPath } from '@constants/serverUrlConstants';

interface AddItemToCartApiParams {
  productId: number;
  serverName: ServerName;
}

interface RemoveCartItemApiParams {
  cartId: number;
  serverName: ServerName;
}

interface UpdateCartItemQuantityApiParams {
  cartId: number;
  serverName: ServerName;
  quantity: number;
}

export const addItemToCartApi = async ({ productId, serverName }: AddItemToCartApiParams) => {
  const response = await fetchPost(getCartPath(serverName), {
    productId,
  });

  if (!response) {
    throw new Error('장바구니에 아이템을 추가하지 못했습니다.');
  }

  const location = response.headers.get('Location');
  const cartId = location?.split('/').pop();

  if (!cartId) {
    throw new Error('장바구니 아이템 생성에 실패했습니다.');
  }

  return cartId;
};

export const removeCartItemApi = async ({ cartId, serverName }: RemoveCartItemApiParams) => {
  await fetchDelete(`${getCartPath(serverName)}/${cartId}`);
};

export const updateCartItemQuantityApi = async ({
  cartId,
  serverName,
  quantity,
}: UpdateCartItemQuantityApiParams) => {
  await fetchPatch(`${getCartPath(serverName)}/${cartId}`, { quantity });
};
