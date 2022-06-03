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
  rest.get(`${API_URL}${API_ENDPOINT.SHOPPING_CART}`, handleGetShoppingCartRequest),
  rest.post(`${API_URL}${API_ENDPOINT.SHOPPING_CART}`, handlePostShoppingCartRequest),
  rest.patch(`${API_URL}${API_ENDPOINT.SHOPPING_CART}`, handlePatchShoppingCartRequest),
  rest.delete(
    `${API_URL}${API_ENDPOINT.SHOPPING_CART}/:productId`,
    handleDeleteShoppingCartRequest,
  ),
  rest.get(`${API_URL}${API_ENDPOINT.USER}`, handleCheckUniqueEmailRequest),
  rest.post(`${API_URL}${API_ENDPOINT.USER}`, handlePostUserRequest),
  rest.post(`${API_URL}${API_ENDPOINT.LOGIN}`, handleLoginRequest),
  rest.get(`${API_URL}${API_ENDPOINT.AUTH.ME}`, handleUserGetRequest),
  rest.post(`${API_URL}${API_ENDPOINT.AUTH.PASSWORD_CHECK}`, handlePasswordCheckRequest),
  rest.patch(`${API_URL}${API_ENDPOINT.AUTH.ME}`, handleUserDataUpdateRequest),
  rest.patch(`${API_URL}${API_ENDPOINT.AUTH.PASSWORD}`, handleUserDataUpdateRequest),
  rest.delete(`${API_URL}${API_ENDPOINT.AUTH.ME}`, handleUserDeleteRequest),
];
