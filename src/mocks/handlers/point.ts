import { rest } from 'msw';
import {
  ORDERS_BASE_URL,
  POINT_BASE_URL,
  POINT_LOCAL_STORAGE_KEY,
} from '../../constants/api';
import { fetchOrder } from '../../remotes/order';
import { getBase64 } from '../../constants/auth';
import { getLocalStorage } from '../../utils/localStorage';

const localStoragePoint = getLocalStorage(POINT_LOCAL_STORAGE_KEY);
// eslint-disable-next-line prefer-const
export const POINT = localStoragePoint ?? {
  points: 20_000,
};

export const pointHandlers = [
  // 보유 포인트 조회
  rest.get(POINT_BASE_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(POINT));
  }),

  // 특정 주문으로 적립된 포인트 조회
  rest.get(`${ORDERS_BASE_URL}/:id${POINT_BASE_URL}`, async (req, res, ctx) => {
    const orderId = Number(req.params.id);
    const order = await fetchOrder(
      `${ORDERS_BASE_URL}/${orderId}`,
      getBase64('유스'),
    );
    const { price } = order;

    if (order === undefined) {
      return res(ctx.status(404));
    }

    const savedPoint = {
      points_saved: Math.floor(price * 0.025),
    };

    return res(ctx.status(200), ctx.json(savedPoint));
  }),
];
