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

const requestAddCartItems = (itemList) =>
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

const requestUpdateCartItem = (id, content) =>
  request(
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

const requestRemoveCartItem = (id) =>
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

const requestRemoveCartItemList = (idList) => {
  const requestBody = idList.map((id) => ({ id }));
  request(
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
  requestAddCartItems,
  requestUpdateCartItem,
  requestRemoveCartItem,
  requestRemoveCartItemList,
};
