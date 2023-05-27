interface generateFetchCartParams {
  resource: string;
  credential: string;
}

const generateFetchCart = ({ resource, credential }: generateFetchCartParams) => {
  return {
    GET: () => {
      return fetch(resource, {
        method: 'GET',
        headers: {
          Authorization: `Basic ${credential}`,
        },
      });
    },

    POST: (productId: number) => {
      return fetch(resource, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credential}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
        }),
      });
    },

    PATCH: (cartItemId: number, quantity: number) => {
      return fetch(`${resource}/${cartItemId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Basic ${credential}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity,
        }),
      });
    },

    DELETE: (cartItemId: number) => {
      return fetch(`${resource}/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Basic ${credential}`,
        },
      });
    },
  };
};

export default generateFetchCart;
