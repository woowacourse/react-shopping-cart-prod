import { LOCAL_BASE_URL } from 'apis';
import { rest } from 'msw';
import { mockItemList } from '../mockDB';

export const itemListHandler = [
  rest.get(`${LOCAL_BASE_URL}/itemList`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockItemList));
  }),

  rest.get(`${LOCAL_BASE_URL}/itemList/:id`, (req, res, ctx) => {
    const itemId = Number(req.params.id);
    const targetItem = mockItemList.filter(item => item.id === itemId)[0];

    return res(ctx.status(200), ctx.json(targetItem));
  }),
];
