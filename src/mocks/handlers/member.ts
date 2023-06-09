import { rest } from 'msw';

import { API_ENDPOINT, HTTP_STATUS_CODE } from '../../constants/api';
import { getMemberData } from '../../domain/member';

const memberHandlers = [
  rest.get(`${API_ENDPOINT.MEMBER}`, (req, res, ctx) => {
    const authToken = req.headers.get('Authorization');

    if (authToken === null) return res(ctx.status(HTTP_STATUS_CODE.UNAUTHORIZED));

    const memberInformation = getMemberData();

    return res(ctx.delay(400), ctx.status(HTTP_STATUS_CODE.OK), ctx.json(memberInformation));
  }),
];

export { memberHandlers };
