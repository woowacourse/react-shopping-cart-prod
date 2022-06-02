import { rest } from 'msw';
import { API_URL } from 'api/constants';

import { handleGetProductsRequest, handleGetImageRequest } from './product.handler';
import {
  handleGetShoppingCartRequest,
  handlePostShoppingCartRequest,
  handlePatchShoppingCartRequest,
  handleDeleteShoppingCartRequest,
} from './cart.handler';
import {
  handleCheckUniqueEmailRequest,
  handlePostUserRequest,
  handleLoginRequest,
  handleUserGetRequest,
  handlePasswordCheckRequest,
  handleUserDataUpdateRequest,
  handleUserDeleteRequest,
} from './user.handler';

export default [
  rest.get(`${API_URL}products`, handleGetProductsRequest),
  rest.get(`${API_URL}static/images/:imageFileName`, handleGetImageRequest),
  rest.get(`${API_URL}shopping-cart`, handleGetShoppingCartRequest),
  rest.post(`${API_URL}shopping-cart`, handlePostShoppingCartRequest),
  rest.patch(`${API_URL}shopping-cart`, handlePatchShoppingCartRequest),
  rest.delete(`${API_URL}shopping-cart/:productId`, handleDeleteShoppingCartRequest),
  rest.get(`${API_URL}api/members`, handleCheckUniqueEmailRequest),
  rest.post(`${API_URL}api/members`, handlePostUserRequest),
  rest.post(`${API_URL}api/login`, handleLoginRequest),
  rest.get(`${API_URL}api/members/auth/me`, handleUserGetRequest),
  rest.post(`${API_URL}api/members/auth/password-check`, handlePasswordCheckRequest),
  rest.patch(`${API_URL}api/members/auth/me`, handleUserDataUpdateRequest),
  rest.patch(`${API_URL}api/members/auth/password`, handleUserDataUpdateRequest),
  rest.delete(`${API_URL}api/members/auth/me`, handleUserDeleteRequest),
];
