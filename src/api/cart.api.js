import { API_ENDPOINT } from 'api/constants';
import customInstance from 'api/customInstance';

import { ALERT_MESSAGES } from 'constants/messages';

export const sendAddToCartRequest = async (productId, quantity) => {
  await customInstance.post(API_ENDPOINT.CARTS_PRODUCTS, {
    productId,
    quantity,
  });

  alert(ALERT_MESSAGES.PRODUCT_ADDED(quantity));
};

export const sendGetCartRequest = async () => {
  const response = await customInstance.get(API_ENDPOINT.CARTS);

  const cart = response.data;

  return { cart };
};

export const sendUpdateCartProductQuantityRequest = async (productId, quantity) => {
  const response = await customInstance.patch(API_ENDPOINT.CARTS_PRODUCTS, {
    productId,
    quantity,
  });

  const cart = response.data;

  return { cart };
};

export const sendDeleteCartProductRequest = async (productIdArray) => {
  await Promise.allSettled(productIdArray.map(sendCartProductDeleteRequest));

  const cart = await sendGetCartRequest();

  return cart;
};

const sendCartProductDeleteRequest = async (productId) => {
  return await customInstance.delete(`${API_ENDPOINT.CARTS_PRODUCTS}`, {
    params: {
      productId,
    },
  });
};
