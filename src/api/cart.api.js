import { API_ENDPOINT } from 'api/constants';
import customInstance from 'api/customInstance';

import { ALERT_MESSAGES } from 'constants/messages';

export const sendAddToCartRequest = async (productId, quantity) => {
  await customInstance.post(API_ENDPOINT.SHOPPING_CART.PRODUCT, {
    productId,
    quantity,
  });

  alert(ALERT_MESSAGES.PRODUCT_ADDED(quantity));
};

export const sendGetCartRequest = async () => {
  const response = await customInstance.get(API_ENDPOINT.SHOPPING_CART.BASE);

  return { cart: response.data };
};

export const sendUpdateCartProductQuantityRequest = async (productId, quantity) => {
  const response = await customInstance.patch(API_ENDPOINT.SHOPPING_CART.PRODUCT, {
    productId,
    quantity,
  });

  return { cart: response.data };
};

export const sendDeleteCartProductRequest = async (productIdArray) => {
  await Promise.all(productIdArray.map(deletingRequestMapper));

  const cart = await sendGetCartRequest();

  return cart;
};

const deletingRequestMapper = (productId) => {
  return customInstance.delete(API_ENDPOINT.SHOPPING_CART.PRODUCT, {
    params: {
      productId,
    },
  });
};
