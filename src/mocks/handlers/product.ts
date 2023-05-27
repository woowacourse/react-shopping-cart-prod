import { rest } from 'msw';

import { API_ENDPOINT, HTTP_STATUS_CODE } from '../../constants/api';
import productListData from '../../data/mockData.json';

const productHandlers = [
  rest.get(API_ENDPOINT.PRODUCTS, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(HTTP_STATUS_CODE.OK), ctx.json(productListData));
  }),
];

export { productHandlers };
