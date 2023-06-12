import { rest } from 'msw';
import store from 'utils/storage';
import point from 'mocks/fixtures/point.json';
import { SERVER_OWNER } from 'constants/storeKey';
import type { ServerOwner } from 'types/serverOwner';
import BASE_URL from 'constants/apiBaseURL';
import getBasicKey from 'utils/getBasicKey';
import { USER_1 } from 'constants/basicKey';
import { ErrorResponse } from 'apis';

const serverOwner = store.getStorage<ServerOwner>(SERVER_OWNER) ?? '헙크';
const BASE_URL_BY_OWNER = BASE_URL[serverOwner];
const URL = '/members';

const authorizationError: ErrorResponse = {
  message: '인증 실패',
};

export const members = [
  rest.get(`${BASE_URL_BY_OWNER}${URL}/point`, (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (authorization !== `Basic ${getBasicKey(USER_1.id, USER_1.password)}`) {
      return res(ctx.status(401), ctx.json(authorizationError));
    }

    return res(ctx.status(200), ctx.json(point));
  }),
];
