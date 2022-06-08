import { API_ENDPOINT } from 'api/constants';
import customInstance from 'api/customInstance';

import { ALERT_MESSAGES } from 'constants/messages';

export const sendAddToCartRequest = async (productId, quantity) => {
  const response = await customInstance.post(API_ENDPOINT.SHOPPING_CART.PRODUCT, {
    productId,
    quantity,
  });

  alert(ALERT_MESSAGES.PRODUCT_ADDED(quantity));

  return { cart: response.data };
};

export const sendGetCartRequest = async () => {
  const response = await customInstance.get(API_ENDPOINT.SHOPPING_CART);

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
  const response = await productIdArray.reduce(sendCartProductDeleteRequest, null);

  return { cart: response.data };
};

const sendCartProductDeleteRequest = async (_, productId) => {
  const response = await customInstance.delete(API_ENDPOINT.SHOPPING_CART.PRODUCT, {
    params: {
      productId,
    },
  });

  return response;
};
