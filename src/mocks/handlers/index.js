import { rest } from 'msw';
import { API_URL } from 'api/constants';

import { getProducts, getImage } from './product.handler';
import {
  getShoppingCart,
  postShoppingCart,
  patchShoppingCart,
  deleteShoppingCart,
} from './cart.handler';

export default [
  rest.get(`${API_URL}products`, getProducts),
  rest.get(`${API_URL}static/images/:imageFileName`, getImage),
  rest.get(`${API_URL}shopping-cart`, getShoppingCart),
  rest.post(`${API_URL}shopping-cart`, postShoppingCart),
  rest.patch(`${API_URL}shopping-cart`, patchShoppingCart),
  rest.delete(`${API_URL}shopping-cart/:productId`, deleteShoppingCart),
];
