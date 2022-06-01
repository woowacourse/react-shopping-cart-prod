import { rest } from 'msw';
import { API_URL } from 'api/constants';

import { getProducts, getImage } from './product.handler';
import {
  getShoppingCart,
  postShoppingCart,
  patchShoppingCart,
  deleteShoppingCart,
} from './cart.handler';
import {
  checkUniqueEmail,
  postUser,
  login,
  handleUserGetRequest,
  handlePasswordCheck,
  handleUserDataUpdate,
} from './user.handler';

export default [
  rest.get(`${API_URL}products`, getProducts),
  rest.get(`${API_URL}static/images/:imageFileName`, getImage),
  rest.get(`${API_URL}shopping-cart`, getShoppingCart),
  rest.post(`${API_URL}shopping-cart`, postShoppingCart),
  rest.patch(`${API_URL}shopping-cart`, patchShoppingCart),
  rest.delete(`${API_URL}shopping-cart/:productId`, deleteShoppingCart),
  rest.get(`${API_URL}api/members`, checkUniqueEmail),
  rest.post(`${API_URL}api/members`, postUser),
  rest.post(`${API_URL}api/login`, login),
  rest.get(`${API_URL}api/members/auth/me`, handleUserGetRequest),
  rest.post(`${API_URL}api/members/auth/password-check`, handlePasswordCheck),
  rest.patch(`${API_URL}api/members/auth/me`, handleUserDataUpdate),
  rest.patch(`${API_URL}api/members/auth/password`, handleUserDataUpdate),
];
