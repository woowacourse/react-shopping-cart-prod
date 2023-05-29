import fetchMock from 'jest-fetch-mock';
import { rest } from 'msw';
import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import { createCartItem, removeCartItem, updateCartItemQuantity } from '@utils/cart/cart';
import {
  addItemToCartApi,
  removeCartItemApi,
  updateCartItemQuantityApi,
} from '@utils/cart/fetchCart';
import { fetchGet } from '@utils/fetchUtils';
import { SERVER_NAME, getCartPath } from '@constants/serverUrlConstants';
import { CartItemType } from '@type/cartType';
import { server } from './setupTests';

fetchMock.enableMocks();

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

const fetchUrl = getCartPath(SERVER_NAME[0]);

describe('서버와 장바구니에 대한 통신 테스트', () => {
  let serverData: CartItemType[] = [];

  beforeEach(() => {
    serverData = [];
    cartIdGenerator.initValue();

    server.use(
      rest.get(fetchUrl, (req, res, ctx) => {
        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.json(serverData)
        );
      }),

      rest.post(fetchUrl, async (req, res, ctx) => {
        const { productId }: { productId: number } = await req.json();

        const product = MOCK_PRODUCT_LIST.find((productItem) => productItem.id === productId);

        if (!product) throw new Error('id에 맞는 product item을 찾을 수 없습니다.');

        cartIdGenerator.increase();
        const cartItem = createCartItem({
          cartId: cartIdGenerator.value,
          product,
        });

        serverData.push(cartItem);

        return res(ctx.status(201), ctx.set('Location', `/cart-items/${cartIdGenerator.value}`));
      }),

      rest.delete(`${fetchUrl}/:cartItemId`, (req, res, ctx) => {
        const { cartItemId } = req.params;

        serverData = removeCartItem({
          cartId: Number(cartItemId.toString()),
          cart: serverData,
        });

        return res(ctx.status(204));
      }),

      rest.patch(`${fetchUrl}/:cartItemId`, async (req, res, ctx) => {
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
    const cartId = await addItemToCartApi({ productId: product.id, serverName: SERVER_NAME[0] });

    const cart = await fetchGet<CartItemType[]>(fetchUrl);

    if (cart === null) {
      throw new Error('장바구니 아이템을 불러올 수 없습니다');
    }

    expect(cart[0]).toEqual(createCartItem({ cartId: Number(cartId), product }));
  });

  test('장바구니 아이템 제거 통신 기능 올바르게 작동하는 지 확인 테스트', async () => {
    const cartId = 1;

    serverData = [createCartItem({ cartId, product })];

    await removeCartItemApi({ cartId, serverName: SERVER_NAME[0] });

    const cart = await fetchGet<CartItemType[]>(fetchUrl);

    expect(cart.length).toBe(0);
  });
  test('장바구니 아이템 수량 조절 통신 기능 올바르게 작동하는 지 확인 테스트', async () => {
    const cartId = 1;

    serverData = [createCartItem({ cartId, product })];

    await updateCartItemQuantityApi({ cartId, serverName: SERVER_NAME[0], quantity: 40 });

    const cart = await fetchGet<CartItemType[]>(fetchUrl);

    expect(cart[0].quantity).toBe(40);
  });

  test('서버에 있는 장바구니 아이템을 가져오는 통신 기능 올바르게 작동하는 지 확인 테스트', async () => {
    serverData = [
      createCartItem({ cartId: 1, product }),
      createCartItem({ cartId: 2, product: product2 }),
      createCartItem({ cartId: 3, product: product3 }),
    ];

    const cart = await fetchGet<CartItemType[]>(fetchUrl);

    expect(cart).toEqual(serverData);
  });
});
