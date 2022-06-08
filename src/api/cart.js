import { request } from 'lib/requestUtils';

const requestGetCartList = () =>
  request('/cart', {
    method: 'GET',
  });

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

const requestUpdateCartItem = (id, content) =>
  request(`/cart/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...content,
    }),
  });

const requestRemoveCartItem = (id) =>
  request(`/cart/${id}`, {
    method: 'DELETE',
  });

const requestRemoveCartItemList = (idList) =>
  request(`/cart/${idList.join(',')}`, {
    method: 'DELETE',
  });

export {
  requestGetCartList,
  requestAddCart,
  requestUpdateCartItem,
  requestRemoveCartItem,
  requestRemoveCartItemList,
};
