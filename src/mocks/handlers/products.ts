import products from '../fixtures/products';
import rest from '../rest';

export const handlers = [
  rest.get('/products', (req, res) => {
    return res(res.response(200, products));
  }),

  rest.get('/products/:productId', (req, res) => {
    const { productId } = req.params;

    const product = products.find((it) => String(it.id) === productId) ?? null;
    if (product === null) {
      return res(
        res.response(404, {
          message: `${productId}에 해당하는 제품은 존재하지 않습니다.`,
        }),
      );
    }

    return res(res.response(200, product));
  }),
];
