import fetcher from 'apis';
import { CartProduct } from 'types/product';

const PATCH_URL = '/cart-items';

export const updateCartProductsQuantity = async (quantity: CartProduct['quantity'], cartProductId: number) => {
  await fetcher(`${PATCH_URL}/${cartProductId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic bob:486`,
    },
    body: JSON.stringify({ quantity }),
  });
};
