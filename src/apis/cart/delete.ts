import fetcher from 'apis';

const DELETE_URL = '/cart-items';

export const removeCartProduct = async (cartProductId: number) => {
  await fetcher(`${DELETE_URL}/${cartProductId}`, {
    method: 'DELETE',

    headers: {
      Authorization: `Basic bob:486`,
    },
  });
};
