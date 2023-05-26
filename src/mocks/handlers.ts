import { rest } from 'msw';
import { CartItemFromRemote, CartItemType, ProductItemType } from 'types/ProductType';

export const MOCK_PRODUCT_LIST: ProductItemType[] = [
  {
    id: 1,
    name: '1) PET보틀-정사각(420ml) 정말 길고 긴 제목',
    price: 43400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 2,
    name: '2) PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 3,
    name: '3) PET보틀-정사각(370ml)',
    price: 41000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 4,
    name: '4) PET보틀-납작(450ml)',
    price: 10000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 5,
    name: '5) PET보틀-단지(480ml)',
    price: 41000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 6,
    name: '6) PET보틀-납작(260ml)',
    price: 61800,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 7,
    name: '7) PET보틀-원형(500ml)',
    price: 42200,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 8,
    name: '8) PET보틀-원형(600ml)',
    price: 44500,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 9,
    name: '9) PET보틀-정사각(420ml)',
    price: 43400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 10,
    name: '10) PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 11,
    name: '11) PET보틀-정사각(370ml)',
    price: 41000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 12,
    name: '12) PET보틀-납작(450ml)',
    price: 39900,
    imageUrl: 'http://placekitten.com/200/200',
  },
];

let cartList: CartItemFromRemote[] = [
  {
    id: 3,
    quantity: 5,

    product: {
      id: 3,
      name: 'PET보틀-정사각(370ml)',
      price: 41000,
      imageUrl: 'http://placekitten.com/200/200',
    },
  },
  {
    id: 1,
    quantity: 10,

    product: {
      id: 1,
      name: 'PET보틀-정사각(420ml)',
      price: 43400,
      imageUrl: 'http://placekitten.com/200/200',
    },
  },
  {
    id: 10,
    quantity: 3,

    product: {
      id: 10,
      name: 'PET보틀-밀크티(370ml)',
      price: 73400,
      imageUrl: 'http://placekitten.com/200/200',
    },
  },
];

export const handlers = [
  rest.get('https://m4co.shop/products', (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.delay(500),
      ctx.status(200),
      ctx.json(MOCK_PRODUCT_LIST)
    );
  }),

  rest.get('https://m4co.shop/cart-items', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(cartList));
  }),

  rest.post('https://m4co.shop/cart-items', async (req, res, ctx) => {
    const { productId: data } = await req.json();
    const productId = Number(data);

    const product = MOCK_PRODUCT_LIST.find((productItem) => productItem.id === productId);

    if (cartList.some(({ product }) => product.id === productId)) return;

    const nextId = cartList.reduce((max, cartItem) => Math.max(max, cartItem.id), 0);

    if (product) {
      cartList.push({
        id: nextId,
        quantity: 1,
        product: product,
      });
    }

    return res(ctx.delay(500), ctx.status(201), ctx.set('Location', `/cart-items/${nextId}`));
  }),

  rest.delete('https://m4co.shop/cart-items/:cartId', async (req, res, ctx) => {
    const { cartId: idData } = req.params;
    const cartId = Number(idData);

    cartList = cartList.filter((cartItem) => cartItem.product.id !== cartId);

    return res(ctx.delay(500), ctx.status(204));
  }),

  rest.patch('https://m4co.shop/cart-items/:cartId', async (req, res, ctx) => {
    const { cartId: idData } = req.params;
    const cartId = Number(idData);

    const { quantity: quantityData } = await req.json();
    const quantity: number = quantityData;

    cartList = cartList.map((cartItem) => {
      if (cartItem.id === cartId) {
        return {
          ...cartItem,
          quantity,
        };
      } else {
        return cartItem;
      }
    });

    return res(ctx.delay(500), ctx.status(200), ctx.body('OK'));
  }),
];
