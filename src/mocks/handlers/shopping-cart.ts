import { BASE_URL } from 'apis';
import type { PathParams } from 'msw';
import { rest } from 'msw';
import { CartItemResponse, Item } from 'types/domain';

export const cartHandler = [
  rest.get<null, null, Item[]>(`${BASE_URL}/products`, (req, res, ctx) => {
    const page = req.url.searchParams.get('_page');
    const limit = req.url.searchParams.get('_limit');

    if (page && limit) {
      return res(ctx.status(200), ctx.json(itemList.slice(0, 12)));
    }

    return res(ctx.status(200), ctx.json(itemList));
  }),

  rest.get<null, PathParams, Item>(`${BASE_URL}/products/:id`, (req, res, ctx) => {
    const { id } = req.params;

    return res(ctx.status(200), ctx.json(itemList[Number(id) - 1]));
  }),

  rest.get<null, null, CartItemResponse[]>(`${BASE_URL}/customers/carts`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post<{ productId: number }, null, CartItemResponse>(
    `${BASE_URL}/customers/carts`,
    (req, res, ctx) => {
      const { productId } = req.body;
      const item = itemList.find(item => item.id === productId);
      const cart = { ...item, productId, quantity: 1, id: cartList.length + 1 };

      cartList = [...cartList, cart];

      return res(ctx.status(200), ctx.json(cart));
    }
  ),

  rest.put<{ quantity: number }, PathParams, null>(
    `${BASE_URL}/customers/carts/:id`,
    (req, res, ctx) => {
      const { id } = req.params;
      const { quantity } = req.body;

      const savedCartList = [...cartList];
      const savedCartItem = savedCartList.find(cart => cart.id === Number(id));

      savedCartItem.quantity = quantity;

      return res(ctx.status(200), ctx.json(savedCartItem));
    }
  ),

  rest.delete<null, PathParams, null>(`${BASE_URL}/customers/carts/:id`, (req, res, ctx) => {
    const { id } = req.params;

    cartList = cartList.filter(cart => cart.id !== Number(id));

    return res(ctx.status(204));
  }),

  rest.delete<null, PathParams, null>(`${BASE_URL}/customers/carts`, (req, res, ctx) => {
    cartList = [];

    return res(ctx.status(204));
  }),
];

// mock data
export const itemList = [
  {
    id: 1,
    imageUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 2,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 3,
    imageUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 4,
    imageUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 5,
    imageUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 6,
    imageUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 7,
    imageUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 8,
    imageUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 9,
    imageUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 10,
    imageUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 11,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 12,
    imageUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 13,
    imageUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 14,
    imageUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 15,
    imageUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 16,
    imageUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 17,
    imageUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 18,
    imageUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 19,
    imageUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 20,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 21,
    imageUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 22,
    imageUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 23,
    imageUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 24,
    imageUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 25,
    imageUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 26,
    imageUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 27,
    imageUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 28,
    imageUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 29,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 30,
    imageUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 31,
    imageUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 32,
    imageUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 33,
    imageUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 34,
    imageUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 35,
    imageUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 36,
    imageUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 37,
    imageUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 38,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 39,
    imageUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 40,
    imageUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 41,
    imageUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 42,
    imageUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 43,
    imageUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 44,
    imageUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 45,
    imageUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 46,
    imageUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 47,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 48,
    imageUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 49,
    imageUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 50,
    imageUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 51,
    imageUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 52,
    imageUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 53,
    imageUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 54,
    imageUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 55,
    imageUrl: 'https://www.withbuyer.com/news/photo/202103/21124_11952_428.jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 56,
    imageUrl:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?cs=srgb&dl=pexels-ella-olsson-1640777.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 57,
    imageUrl:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?cs=srgb&dl=pexels-lisa-fotios-1279330.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 58,
    imageUrl:
      'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?cs=srgb&dl=pexels-pixabay-357573.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 59,
    imageUrl:
      'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?cs=srgb&dl=pexels-elle-hughes-1660030.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 60,
    imageUrl:
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg?cs=srgb&dl=pexels-dapurmelodi-1109197.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 61,
    imageUrl:
      'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?cs=srgb&dl=pexels-brigitte-tohm-239581.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 62,
    imageUrl:
      'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?cs=srgb&dl=pexels-dzenina-lukac-1583884.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 63,
    imageUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 64,
    imageUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 65,
    imageUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
  {
    id: 66,
    imageUrl:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?cs=srgb&dl=pexels-mariana-kurnyk-1775043.jpg&fm=jpg',
    name: 'mocking',
    price: 43000,
  },
];

// eslint-disable-next-line prefer-const
export let cartList = [];
