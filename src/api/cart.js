import { request } from 'lib/requestUtils';

const requestGetCartList = () =>
  request(
    '/auth/customer/cartItems',
    {
      method: 'GET',
    },
    {
      isAccessTokenUsed: true,
    },
  );

const requestAddCart = (itemList = []) =>
  request(
    '/auth/customer/cartItems',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemList),
    },
    {
      isAccessTokenUsed: true,
    },
  );

const requestUpdateCartItem = async (id, content) => {
  const response = await request(
    '/auth/customer/cartItems',
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        ...content,
      }),
    },
    {
      isAccessTokenUsed: true,
    },
  );

  return response;
};

const requestRemoveCartItem = async (id) =>
  request(
    '/auth/customer/cartItems',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          id,
        },
      ]),
    },
    {
      isAccessTokenUsed: true,
    },
  );

const requestRemoveCartItemList = async (idList) => {
  // API 스펙 변경 협의 필요.
  const requestBody = idList.map((id) => ({ id }));

  return request(
    '/auth/customer/cartItems',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    },
    {
      isAccessTokenUsed: true,
    },
  );
};

export {
  requestGetCartList,
  requestAddCart,
  requestUpdateCartItem,
  requestRemoveCartItem,
  requestRemoveCartItemList,
};
