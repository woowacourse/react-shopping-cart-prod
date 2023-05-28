import { rest } from 'msw';

import { API_ENDPOINT, HTTP_STATUS_CODE } from '../../constants/api';
import { getMemberData } from '../../domain/member';
import { getOrderListData } from '../../domain/order';

const memberHandlers = [
  rest.get(`${API_ENDPOINT.MEMBER}`, async (req, res, ctx) => {
    const authToken = req.headers.get('Authorization');

    if (!authToken) return res(ctx.status(HTTP_STATUS_CODE.UNAUTHORIZED));

    const memberInformation = getMemberData();

    return res(ctx.delay(500), ctx.status(HTTP_STATUS_CODE.OK), ctx.json(memberInformation));
  }),

  rest.get(`${API_ENDPOINT.MEMBERS}/:memberId/orders`, async (req, res, ctx) => {
    const authToken = req.headers.get('Authorization');

    if (!authToken) return res(ctx.status(HTTP_STATUS_CODE.UNAUTHORIZED));

    const memberOrderList = getOrderListData();

    return res(ctx.delay(500), ctx.status(HTTP_STATUS_CODE.OK), ctx.json(memberOrderList));
  }),
];

export { memberHandlers };
