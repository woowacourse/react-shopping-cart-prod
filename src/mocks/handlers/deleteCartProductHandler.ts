// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import CustomError from 'utils/CustomError';

const deleteCartProductHandler = rest.delete('/cart', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.id)) {
      throw new CustomError(1003, '유효하지 않은 토큰입니다.', 401);
    }

    const { productIds } = req.body;
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // [ERROR] 장바구니에 해당 상품이 존재하지 않을 경우
    productIds.forEach(productId => {
      if (!cart.some(product => product.productId === productId)) {
        throw new CustomError(4001, '해당 상품이 장바구니에 존재하지 않습니다.', 400);
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
