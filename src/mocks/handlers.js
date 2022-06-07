import { rest } from 'msw';
import { productList } from 'assets/mock';

let cartStorage = [];

export const handlers = [
  rest.get('/api/products/:id', (req, res, ctx) => {
    const id = +req.params.id;

    const product = productList.find(({ id: productId }) => productId === +id);
    if (!product) return res(ctx.status(400));
    return res(ctx.json(product));
  }),

  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productList));
  }),

  // 카트 아이템 삭제
  rest.delete('/api/members/me/carts/:id', (req, res, ctx) => {
    console.log('응답', req);
    const id = +req.params.id;
    cartStorage = cartStorage.filter((item) => item.id !== id);
    return res(ctx.status(200));
  }),

  // 카트 추가
  rest.post('/api/members/me/carts', (req, res, ctx) => {
    console.log('응답>>>', req);
    const product_id = +req.body.product_id;

    const index = cartStorage.findIndex(({ id }) => id === product_id);
    const product = productList.find(({ id }) => id === product_id);

    if (index === -1) {
      cartStorage.push({ ...product, quantity: 1 });
    } else {
      const newCartStorage = cartStorage.map((item, itemIndex) => {
        if (index === itemIndex)
          return { ...item, quantity: item.quantity + 1 };
        return item;
      });
      cartStorage = newCartStorage;
    }

    return res(ctx.status(200));
  }),

  // 카트 목록 가져오기

  rest.get('/api/members/me/carts', (req, res, ctx) => {
    console.log('응답', req);
    return res(ctx.status(200), ctx.json(cartStorage));
  }),

  // 카트 수량 변경
  rest.put('/api/members/me/carts/:id', (req, res, ctx) => {
    console.log('응답', req);
    const id = +req.params.id;
    const quantity = +req.body.quantity;

    const newCartStorage = cartStorage.map((item) => {
      if (item.id === id) return { ...item, quantity };
      return item;
    });
    cartStorage = newCartStorage;
    return res(ctx.status(200), ctx.json(cartStorage));
  }),
];
