import {
  handleGetShoppingCartRequest,
  handlePostShoppingCartRequest,
  handlePatchShoppingCartRequest,
  handleDeleteShoppingCartRequest,
} from 'mocks/handlers/cart.handler';
import {
  handleGetProductsRequest,
  handleGetImageRequest,
} from 'mocks/handlers/product.handler';
import {
  handleCheckUniqueEmailRequest,
  handlePostUserRequest,
  handleLoginRequest,
  handleUserGetRequest,
  handlePasswordCheckRequest,
  handleUserDataUpdateRequest,
  handleUserDeleteRequest,
} from 'mocks/handlers/user.handler';
import { rest } from 'msw';

import { API_ENDPOINT } from 'api/constants';
import { BASE_URL } from 'api/customInstance';

export default [
  rest.get(`${BASE_URL}${API_ENDPOINT.PRODUCTS}`, handleGetProductsRequest),
  rest.get(`${BASE_URL}/static/images/:imageFileName`, handleGetImageRequest),
  rest.get(`${BASE_URL}${API_ENDPOINT.SHOPPING_CART.BASE}`, handleGetShoppingCartRequest),
  rest.post(
    `${BASE_URL}${API_ENDPOINT.SHOPPING_CART.PRODUCT}`,
    handlePostShoppingCartRequest,
  ),
  rest.patch(
    `${BASE_URL}${API_ENDPOINT.SHOPPING_CART.PRODUCT}`,
    handlePatchShoppingCartRequest,
  ),
  rest.delete(
    `${BASE_URL}${API_ENDPOINT.SHOPPING_CART.PRODUCT}`,
    handleDeleteShoppingCartRequest,
  ),
  rest.get(`${BASE_URL}${API_ENDPOINT.USER.EMAIL_CHECK}`, handleCheckUniqueEmailRequest),
  rest.post(`${BASE_URL}${API_ENDPOINT.USER.BASE}`, handlePostUserRequest),
  rest.post(`${BASE_URL}${API_ENDPOINT.LOGIN}`, handleLoginRequest),
  rest.get(`${BASE_URL}${API_ENDPOINT.USER.ME}`, handleUserGetRequest),
  rest.post(`${BASE_URL}${API_ENDPOINT.USER.PASSWORD_CHECK}`, handlePasswordCheckRequest),
  rest.patch(`${BASE_URL}${API_ENDPOINT.USER.ME}`, handleUserDataUpdateRequest),
  rest.patch(`${BASE_URL}${API_ENDPOINT.USER.PASSWORD}`, handleUserDataUpdateRequest),
  rest.delete(`${BASE_URL}${API_ENDPOINT.USER.ME}`, handleUserDeleteRequest),
];
