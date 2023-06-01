import { rest } from 'msw';

import { API_ENDPOINT } from '../../constants/api';
import { getMember } from '../../domain/member';

export const memberHandlers = [
  rest.get(API_ENDPOINT.MEMBER, (req, res, ctx) => {
    const member = getMember();

    return res(ctx.status(200), ctx.json(member));
  }),
];
