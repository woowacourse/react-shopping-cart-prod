import { productAxios } from 'configs/api';
import db from 'db.json';
import { rest } from 'msw';

import PATH from 'constants/path';

const { baseURL } = productAxios.defaults;

const productsHandlers = [
  rest.get(`${baseURL}${PATH.REQUEST_PRODUCT}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db.products));
  }),

  rest.get(`${baseURL}${PATH.REQUEST_PRODUCT}/:id`, (req, res, ctx) => {
    const product = db.products.find(
      (productInfo) => productInfo.id === Number(req.params.id)
    );

    return res(ctx.status(200), ctx.json(product));
  }),
];

export default productsHandlers;
