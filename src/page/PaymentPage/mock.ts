// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import CustomError from 'utils/CustomError';

const getOrderHandler = rest.get('/orders/:id', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.id)) {
      throw new CustomError(1003, '유효하지 않은 토큰입니다.', 401);
    }

    const id = Number(req.params.id);

    // TODO : 나의 주문이 아닌 경우

    const orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

    // [ERROR] id에 맞는 주문이 없을 경우
    if (!orders.some(order => order.id === id)) {
      throw new CustomError(5001, '존재하지 않는 주문입니다.', 404);
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
