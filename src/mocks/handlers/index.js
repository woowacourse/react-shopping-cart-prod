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

const MOCK_SERVER_URL = API_URL[4];

export default [
  rest.get(`${MOCK_SERVER_URL}${API_ENDPOINT.PRODUCTS}`, handleGetProductsRequest),
  rest.get(`${MOCK_SERVER_URL}/static/images/:imageFileName`, handleGetImageRequest),
  rest.get(`${MOCK_SERVER_URL}${API_ENDPOINT.CARTS}`, handleGetShoppingCartRequest),
  rest.post(
    `${MOCK_SERVER_URL}${API_ENDPOINT.CARTS_PRODUCTS}`,
    handlePostShoppingCartRequest,
  ),
  rest.patch(
    `${MOCK_SERVER_URL}${API_ENDPOINT.CARTS_PRODUCTS}`,
    handlePatchShoppingCartRequest,
  ),
  rest.delete(
    `${MOCK_SERVER_URL}${API_ENDPOINT.CARTS_PRODUCTS}`,
    handleDeleteShoppingCartRequest,
  ),
  rest.get(
    `${MOCK_SERVER_URL}${API_ENDPOINT.EMAIL_CHECK}`,
    handleCheckUniqueEmailRequest,
  ),
  rest.post(`${MOCK_SERVER_URL}${API_ENDPOINT.MEMBERS}`, handlePostUserRequest),
  rest.post(`${MOCK_SERVER_URL}${API_ENDPOINT.LOGIN}`, handleLoginRequest),
  rest.get(`${MOCK_SERVER_URL}${API_ENDPOINT.AUTH.ME}`, handleUserGetRequest),
  rest.post(
    `${MOCK_SERVER_URL}${API_ENDPOINT.AUTH.PASSWORD_CHECK}`,
    handlePasswordCheckRequest,
  ),
  rest.patch(`${MOCK_SERVER_URL}${API_ENDPOINT.AUTH.ME}`, handleUserDataUpdateRequest),
  rest.patch(
    `${MOCK_SERVER_URL}${API_ENDPOINT.AUTH.PASSWORD}`,
    handleUserDataUpdateRequest,
  ),
  rest.delete(`${MOCK_SERVER_URL}${API_ENDPOINT.AUTH.ME}`, handleUserDeleteRequest),
];
