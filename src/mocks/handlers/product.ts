import { rest } from 'msw';
import products from 'mocks/fixtures/products.json';
import store from 'utils/storage';
import { ServerOwner } from 'types/serverOwner';
import { SERVER_OWNER } from 'constants/storeKey';
import BASE_URL from 'constants/apiBaseURL';

const serverOwner = store.getStorage<ServerOwner>(SERVER_OWNER) ?? '다즐';
const BASE_URL_BY_OWNER = BASE_URL[serverOwner];

export const product = [
  rest.get(`${BASE_URL_BY_OWNER}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products));
  }),
];
