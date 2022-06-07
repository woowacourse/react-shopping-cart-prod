import { API_ENDPOINT } from 'api/constants';
import customInstance from 'api/customInstance';

import { ALERT_MESSAGES } from 'constants/messages';

export const sendAddToCartRequest = async (productId, quantity) => {
  await customInstance.post(API_ENDPOINT.CARTS_PRODUCTS, {
    id: productId,
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
    id: productId,
    quantity,
  });

  const cart = response.data;

  return { cart };
};

export const sendDeleteCartProductRequest = async (productIdArray) => {
  const response = await productIdArray.reduce(sendCartProductDeleteRequest, null);
  const cart = response.data;

  return { cart };
};

const sendCartProductDeleteRequest = async (res, productId) => {
  res = await customInstance.delete(`${API_ENDPOINT.CARTS_PRODUCTS}`, {
    params: {
      id: productId,
    },
  });

  return res;
};
