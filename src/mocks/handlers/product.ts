import { rest } from 'msw';
import products from 'mocks/fixtures/products.json';
import store from 'utils/storage';
import { ServerOwner } from 'types/serverOwner';
import { SERVER_OWNER } from 'constants/storeKey';
import BASE_URL from 'constants/apiBaseURL';

const serverOwner = store.getStorage<ServerOwner>(SERVER_OWNER) ?? '헙크';
const BASE_URL_BY_OWNER = BASE_URL[serverOwner];
const URL = '/products';

export const product = [
  rest.get(`${BASE_URL_BY_OWNER}${URL}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),
];
