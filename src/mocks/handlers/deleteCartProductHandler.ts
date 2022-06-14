// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import ErrorResponse from 'utils/ErrorResponse';
import { ERROR_MESSAGE_FROM_SERVER } from 'utils/constants';

const deleteCartProductHandler = rest.delete('/cart', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.sub)) {
      throw new ErrorResponse(1003, ERROR_MESSAGE_FROM_SERVER[1003], 401);
    }

    const { productIds } = req.body;
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // [ERROR] 장바구니에 해당 상품이 존재하지 않을 경우
    productIds.forEach(productId => {
      if (!cart.some(product => product.productId === productId)) {
        throw new ErrorResponse(4001, ERROR_MESSAGE_FROM_SERVER[4001], 400);
      }
    });

    // 카트에서 상품제거 성공
    productIds.forEach(id => {
      cart = cart.filter(product => product.productId !== id);
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    return res(ctx.status(204));
  } catch (error) {
    // 카트에서 상품제거 실패
    return res(
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export default deleteCartProductHandler;
