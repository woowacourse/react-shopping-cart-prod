// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import CustomError from 'utils/CustomError';

const getCartHandler = rest.get('/cart', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.id)) {
      throw new CustomError(1003, '유효하지 않은 토큰입니다.', 401);
    }

    // 전체카트조회 성공
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    return res(ctx.status(200), ctx.json(cart));
  } catch (error) {
    // 전체카트조회 실패
    return res(
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

const postOrderHandler = rest.post('/orders', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.id)) {
      throw new CustomError(1003, '유효하지 않은 토큰입니다.', 401);
    }

    const { productIds } = req.body;

    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // [ERROR] 장바구니에 해당 상품이 존재하지 않을 경우
    productIds.forEach(productId => {
      if (!cart.some(product => product.productId === productId)) {
        throw new CustomError(4001, '해당 상품이 장바구니에 존재하지 않습니다.', 400);
      }
    });

    // 주문 성공
    const productsInOrder = [];

    productIds.forEach(id => {
      const targetProductIndex = cart.findIndex(product => product.productId === id);

      productsInOrder.push(cart[targetProductIndex]);
      cart.splice(targetProductIndex, 1);
    });

    const orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
    const order = {
      id: orders.length + 1,
      orderDetails: productsInOrder,
      totalPrice: productsInOrder.reduce((acc, cur) => acc + cur.quantity * cur.price, 0),
      orderDate: new Date(),
    };

    orders.push(order);

    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('cart', JSON.stringify(cart));
    return res(ctx.status(201), ctx.set('Location', `/orders/${orders.length}`), ctx.json(order));
  } catch (error) {
    // 주문 실패
    return res(
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export { getCartHandler, postOrderHandler };
