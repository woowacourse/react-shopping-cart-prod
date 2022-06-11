// @ts-nocheck
import { rest } from 'msw';
import { dummyProductList } from 'dummy_data';
import CustomError from 'utils/CustomError';
import { ERROR_MESSAGE_FROM_SERVER } from 'utils/constants';

const getProductHandler = rest.get('/products/:id', (req, res, ctx) => {
  try {
    const { id } = req.params;

    const foundProduct = dummyProductList.find(product => product.id === Number(id));

    // [ERROR] 상품 목록에 해당 id의 상품이 존재하지 않을 경우
    if (!foundProduct) {
      throw new CustomError(3001, ERROR_MESSAGE_FROM_SERVER[3001], 400);
    }

    // 단건상품조회 성공
    return res(ctx.status(200), ctx.json(foundProduct));
  } catch (error) {
    // 단건상품조회 실패
    return res(
      ctx.status(error.statusCode),
      ctx.json({
        code: error.code,
        message: error.message,
      }),
    );
  }
});

export default getProductHandler;
