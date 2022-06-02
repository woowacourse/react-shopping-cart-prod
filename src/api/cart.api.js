import { ALERT_MESSAGES } from 'constants/messages';
import { API_ENDPOINT } from 'api/constants';
import apiInstance from 'api/customInstance';

export const sendAddToCartRequest = async (productId, quantity) => {
  const response = await apiInstance.post(API_ENDPOINT.SHOPPING_CART, {
    productId,
    quantity,
  });

  const cart = response.data;

  alert(ALERT_MESSAGES.PRODUCT_ADDED(quantity));

  return { cart };
};

export const sendGetCartRequest = async () => {
  const response = await apiInstance.get(API_ENDPOINT.SHOPPING_CART);

  const cart = response.data;

  return { cart };
};

export const sendUpdateCartProductQuantityRequest = async (productId, quantity) => {
  const response = await apiInstance.patch(API_ENDPOINT.SHOPPING_CART, {
    productId,
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
  res = await apiInstance.delete(`${API_ENDPOINT.SHOPPING_CART}/${productId}`);

  return res;
};
