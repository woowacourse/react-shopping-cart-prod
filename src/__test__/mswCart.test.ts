import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import fetchCartItems from '@views/Cart/remote/fetchCartItem';
// import { server } from './setupTests';
import { rest } from 'msw';
import { BASE_URL, CART_PATH } from '@constants/urlConstants';
import { CartItemType } from 'types/ProductType';
import { createCartItem, removeCartItem, updateCartItemQuantity } from '@views/Cart/utils/cart';
import { server } from './setupTests';

const [product, product2, product3] = MOCK_PRODUCT_LIST;

const cartIdGenerator = {
  value: 0,
  initValue: () => {
    cartIdGenerator.value = 0;
  },
  increase: () => {
    cartIdGenerator.value += 1;
  },
};

const endpoint = `${BASE_URL}/${CART_PATH}`;

describe('MSW 통신 테스트', () => {
  let serverData: CartItemType[] = [];

  beforeEach(() => {
    serverData = [];
    cartIdGenerator.initValue();

    server.use(
      rest.get(endpoint, (req, res, ctx) => {
        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.body('OK'),
          ctx.json(serverData)
        );
      }),

      rest.post(endpoint, async (req, res, ctx) => {
        const { productId }: { productId: number } = await req.json();

        const product = MOCK_PRODUCT_LIST.find((productItem) => productItem.id === productId);

        if (!product) throw new Error('id에 맞는 product item을 찾을 수 없습니다.');

        cartIdGenerator.increase();
        const cartItem = createCartItem({ cartId: cartIdGenerator.value, product });

        serverData.push(cartItem);

        return res(ctx.status(201), ctx.set('Location', `/cart-items/${cartIdGenerator.value}`));
      }),

      rest.delete(`${endpoint}/:cartItemId`, (req, res, ctx) => {
        const { cartItemId } = req.params;

        serverData = removeCartItem({ cartId: Number(cartItemId.toString()), cart: serverData });

        return res(ctx.status(204));
      }),

      rest.patch(`${endpoint}/:cartItemId`, async (req, res, ctx) => {
        const { cartItemId } = req.params;
        const { quantity } = await req.json();

        serverData = updateCartItemQuantity({
          cartId: Number(cartItemId),
          cart: serverData,
          quantity,
        });

        return res(ctx.status(200), ctx.body('OK'));
      })
    );
  });

  test('장바구니 아이템 추가 통신 기능 올바르게 작동하는 지 확인 테스트 ', async () => {
    const response = await fetchCartItems.add(product.id);

    const cartId = response.headers.get('Location');

    const cart = await fetchCartItems.get();

    expect(cart[0]).toEqual(createCartItem({ cartId: Number(cartId), product }));
  });

  test('장바구니 아이템 제거 통신 기능 올바르게 작동하는 지 확인 테스트', async () => {
    const cartId = 1;

    serverData = [createCartItem({ cartId, product })];

    await fetchCartItems.delete(Number(cartId));

    const afterCart = await fetchCartItems.get();

    expect(afterCart.length).toBe(0);
  });
  test('장바구니 아이템 수량 조절 통신 기능 올바르게 작동하는 지 확인 테스트', async () => {
    const cartId = 1;

    serverData = [createCartItem({ cartId, product })];

    await fetchCartItems.update(cartId, 40);

    const cart = await fetchCartItems.get();

    expect(cart[0].quantity).toBe(40);
  });

  test('장바구니 아이템 수량 조절 통신 기능 올바르게 작동하는 지 확인 테스트', async () => {
    serverData = [
      createCartItem({ cartId: 1, product }),
      createCartItem({ cartId: 2, product: product2 }),
      createCartItem({ cartId: 3, product: product3 }),
    ];

    const cart = await fetchCartItems.get();

    expect(cart).toEqual(serverData);
  });
});
