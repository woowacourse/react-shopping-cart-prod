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

const requestAddCart = ({ id, image, name, price, quantity, isChecked }) =>
  request(
    '/auth/customer/cartItems',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product: id,
        image,
        name,
        price,
        quantity,
        isChecked,
      }),
    },
    {
      isAccessTokenUsed: true,
    },
  );

const requestUpdateCartItem = async (id, content) => {
  const response = await request(
    `/auth/customer/cartItems/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...content,
      }),
    },
    {
      isAccessTokenUsed: true,
    },
  );

  return response;
};

const requestRemoveCartItem = async (id) => {
  const response = await request(
    `/auth/customer/cartItems/${id}`,
    {
      method: 'DELETE',
    },
    {
      isAccessTokenUsed: true,
    },
  );

  return response;
};

const requestRemoveCartItemList = async (idList) => {
  const response = await request(
    `/auth/customer/cartItems/${idList.join(',')}`,
    {
      method: 'DELETE',
    },
    {
      isAccessTokenUsed: true,
    },
  );

  return response;
};

export {
  requestGetCartList,
  requestAddCart,
  requestUpdateCartItem,
  requestRemoveCartItem,
  requestRemoveCartItemList,
};
