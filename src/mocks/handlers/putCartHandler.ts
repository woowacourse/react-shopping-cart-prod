// @ts-nocheck
import { rest } from 'msw';
import { users } from 'mocks';
import CustomError from 'utils/CustomError';
import { dummyProductList } from 'dummy_data';
import { ERROR_MESSAGE_FROM_SERVER } from 'utils/constants';

const putCartHandler = rest.put('/cart/products/:id', (req, res, ctx) => {
  try {
    const { authorization } = req.headers.headers;

    const token = authorization.replace('Bearer ', '');
    const accessToken = JSON.parse(!!token && !token.includes('undefined') ? token : null);

    // [ERROR] 유효한 토큰이 아닌 경우
    if (!accessToken || !users.some(user => user.id === accessToken.id)) {
      throw new CustomError(1003, ERROR_MESSAGE_FROM_SERVER[1003], 401);
    }

    const id = Number(req.params.id);
    const { quantity } = req.body;

    const foundProduct = dummyProductList.find(product => product.id === id);

    // [ERROR] 상품 목록에 해당 id의 상품이 존재하지 않을 경우
    if (!foundProduct) {
      throw new CustomError(3001, ERROR_MESSAGE_FROM_SERVER[3001], 400);
    }

    // [ERROR] 수량이 양수가 아닌 경우
    if (quantity < 0) {
      throw new CustomError(4101, ERROR_MESSAGE_FROM_SERVER[4101], 400);
    }

    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    const foundProductInCart = cart.find(product => product.productId === id);

    if (foundProductInCart) {
      foundProductInCart.quantity = quantity;

      // 카트에 있는 상품수정 완료
      localStorage.setItem('cart', JSON.stringify(cart));
      return res(
        ctx.status(200),
        ctx.json({
          productId: id,
          image: foundProduct.image,
          name: foundProduct.name,
          price: foundProduct.price,
          quantity,
        }),
      );
    } else {
      cart.push({
        productId: id,
        image: foundProduct.image,
        name: foundProduct.name,
        price: foundProduct.price,
        quantity,
      });

      // 카트에 상품추가 성공
      localStorage.setItem('cart', JSON.stringify(cart));
      return res(
        ctx.status(201),
        ctx.json({
          productId: id,
          image: foundProduct.image,
          name: foundProduct.name,
          price: foundProduct.price,
          quantity,
        }),
      );
    }
  } catch (error) {
    // 카트에 있는 상품수정 실패 | 카트에 상품추가 실패
    return res(
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export default putCartHandler;
