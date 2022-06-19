// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import ErrorResponse from 'utils/ErrorResponse';
import { ERROR_MESSAGE_FROM_SERVER } from 'utils/constants';

const getOrderHandler = rest.get('/orders/:id', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.sub)) {
      throw new ErrorResponse(1003, ERROR_MESSAGE_FROM_SERVER[1003], 401);
    }

    const id = Number(req.params.id);

    // TODO : 나의 주문이 아닌 경우

    const orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

    // [ERROR] id에 맞는 주문이 없을 경우
    if (!orders.some(order => order.id === id)) {
      throw new ErrorResponse(5001, ERROR_MESSAGE_FROM_SERVER[5001], 404);
    }

    // 단건주문조회 성공
    return res(ctx.status(200), ctx.json(orders.find(order => order.id === id)));
  } catch (error) {
    // 단건주문조회 실패
    return res(
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export default getOrderHandler;
