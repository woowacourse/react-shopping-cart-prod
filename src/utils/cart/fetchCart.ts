import { fetchDelete, fetchGet, fetchPatch, fetchPost } from '@utils/fetchUtils';
import { ServerName, getCartPath } from '@constants/serverUrlConstants';
import { UserInformationType } from '@constants/userConstant';
import { CartItemType, ServerCartItemType } from '@type/cartType';
import { cartApiWrapper } from './cart';

interface AddItemToCartApiParams {
  productId: number;
  serverName: ServerName;
  userInfo: UserInformationType;
}

export const addItemToCartApi = async ({
  productId,
  serverName,
  userInfo,
}: AddItemToCartApiParams) => {
  const response = await fetchPost(
    getCartPath(serverName),
    {
      productId,
    },
    {
      email: userInfo.email,
      password: userInfo.password,
    }
  );

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

interface RemoveCartItemApiParams {
  cartId: number;
  serverName: ServerName;
  userInfo: UserInformationType;
}

export const removeCartItemApi = async ({
  cartId,
  serverName,
  userInfo,
}: RemoveCartItemApiParams) => {
  await fetchDelete(`${getCartPath(serverName)}/${cartId}`, {
    email: userInfo.email,
    password: userInfo.password,
  });
};

interface UpdateCartItemQuantityApiParams {
  cartId: number;
  serverName: ServerName;
  quantity: number;
  userInfo: UserInformationType;
}

export const updateCartItemQuantityApi = async ({
  cartId,
  serverName,
  quantity,
  userInfo,
}: UpdateCartItemQuantityApiParams) => {
  await fetchPatch(
    `${getCartPath(serverName)}/${cartId}`,
    { quantity },
    {
      email: userInfo.email,
      password: userInfo.password,
    }
  );
};

interface GetCartApiProps {
  serverName: ServerName;
  userInfo: UserInformationType;
}

export const getCartApi = async ({ serverName, userInfo }: GetCartApiProps) => {
  const serverCart = await fetchGet<ServerCartItemType[]>(getCartPath(serverName), {
    email: userInfo.email,
    password: userInfo.password,
  });
  const clientCart: CartItemType[] = cartApiWrapper(serverCart);

  return clientCart;
};
