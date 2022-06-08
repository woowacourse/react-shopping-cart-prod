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

import { API_ENDPOINT, API_URL } from 'api/constants';

export default [
  rest.get(`${API_URL}${API_ENDPOINT.PRODUCTS}`, handleGetProductsRequest),
  rest.get(`${API_URL}/static/images/:imageFileName`, handleGetImageRequest),
  rest.get(`${API_URL}${API_ENDPOINT.SHOPPING_CART.BASE}`, handleGetShoppingCartRequest),
  rest.post(
    `${API_URL}${API_ENDPOINT.SHOPPING_CART.PRODUCT}`,
    handlePostShoppingCartRequest,
  ),
  rest.patch(
    `${API_URL}${API_ENDPOINT.SHOPPING_CART.PRODUCT}`,
    handlePatchShoppingCartRequest,
  ),
  rest.delete(
    `${API_URL}${API_ENDPOINT.SHOPPING_CART.PRODUCT}`,
    handleDeleteShoppingCartRequest,
  ),
  rest.get(`${API_URL}${API_ENDPOINT.USER.EMAIL_CHECK}`, handleCheckUniqueEmailRequest),
  rest.post(`${API_URL}${API_ENDPOINT.USER.BASE}`, handlePostUserRequest),
  rest.post(`${API_URL}${API_ENDPOINT.LOGIN}`, handleLoginRequest),
  rest.get(`${API_URL}${API_ENDPOINT.USER.ME}`, handleUserGetRequest),
  rest.post(`${API_URL}${API_ENDPOINT.USER.PASSWORD_CHECK}`, handlePasswordCheckRequest),
  rest.patch(`${API_URL}${API_ENDPOINT.USER.ME}`, handleUserDataUpdateRequest),
  rest.patch(`${API_URL}${API_ENDPOINT.USER.PASSWORD}`, handleUserDataUpdateRequest),
  rest.delete(`${API_URL}${API_ENDPOINT.USER.ME}`, handleUserDeleteRequest),
];
