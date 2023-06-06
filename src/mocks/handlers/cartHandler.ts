import { rest, RestRequest } from 'msw';
import { products } from '../../data/mockData';
import { Cart } from '../../types/response';
import { END_POINTS } from '../../constants/endPoints';

interface PatchRequest extends RestRequest {
  quantity: number;
}

export const cartHandler = [
  rest.get(END_POINTS.CART_ITEMS, async (_req, res, ctx) => {
    try {
      const data = JSON.parse(localStorage.getItem('cart-items') || '[]');

      return res(ctx.json(data));
    } catch (error) {
      return res(ctx.status(500), ctx.json({ error: 'An error occurred' }));
    }
  }),
  rest.get(`${END_POINTS.CART_ITEMS}/:id`, async (req, res, ctx) => {
    try {
      const { id } = req.params;
      const carts = JSON.parse(localStorage.getItem('cart-items') || '[]');
      const product = Object.assign(
        carts.find((cart: Cart) => cart.id === Number(id))
      );

      return res(ctx.json(product));
    } catch (error) {
      return res(ctx.status(500), ctx.json({ error: 'An error occurred' }));
    }
  }),
  rest.post<{ id: number }>(END_POINTS.CART_ITEMS, async (req, res, ctx) => {
    const { id } = req.body;
    const data = JSON.parse(localStorage.getItem('cart-items') || '[]');
    const product = products.find((product) => product.id === Number(id));

    if (product) {
      const newProduct = [...data, { id: Number(id), quantity: 1, product }];
      localStorage.setItem('cart-items', JSON.stringify(newProduct));
      return res(ctx.status(200), ctx.json({}));
    }
    return res(ctx.status(404), ctx.json({ error: 'Item not found' }));
  }),
  rest.patch<PatchRequest, { id: string }>(
    `${END_POINTS.CART_ITEMS}/:id`,
    async (req, res, ctx) => {
      const { id } = req.params;
      const { quantity } = req.body;
      const data = JSON.parse(localStorage.getItem('cart-items') || '[]');
      const filteredData = data.filter((item: Cart) => item.id !== Number(id));
      const product = products.find((product) => product.id === Number(id));

      if (product) {
        const newProduct = [
          ...filteredData,
          { id: Number(id), quantity: quantity + 1, product },
        ];
        localStorage.setItem('cart-items', JSON.stringify(newProduct));
        return res(ctx.status(200), ctx.json({}));
      }
      return res(ctx.status(404), ctx.json({ error: 'Item not found' }));
    }
  ),
  rest.delete(`${END_POINTS.CART_ITEMS}/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const data = JSON.parse(localStorage.getItem('cart-items') || '[]');

    const itemIndex = data.findIndex((item: Cart) => item.id === Number(id));
    if (itemIndex === -1) {
      return res(ctx.status(404), ctx.json({ error: 'Item not found' }));
    }

    const filteredData = data.filter((item: Cart) => item.id !== Number(id));
    const newData = [...filteredData];

    localStorage.setItem('cart-items', JSON.stringify(newData));

    return res(ctx.status(200), ctx.json({}));
  }),
];
