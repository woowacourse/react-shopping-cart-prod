import { rest } from 'msw';
import store from 'utils/storage';
import orderList from 'mocks/fixtures/orderList.json';
import { SERVER_OWNER } from 'constants/storeKey';
import type { ServerOwner } from 'types/serverOwner';
import BASE_URL from 'constants/apiBaseURL';

const serverOwner = store.getStorage<ServerOwner>(SERVER_OWNER) ?? '헙크';
const BASE_URL_BY_OWNER = BASE_URL[serverOwner];

export const orders = [
  rest.get(`${BASE_URL_BY_OWNER}/orders`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orderList));
  }),
];
