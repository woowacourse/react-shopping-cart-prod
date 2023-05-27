import { renderHook, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { rest } from 'msw';
import {
  createCartItem,
  removeCartItem,
  updateCartItemQuantity,
} from '@views/CartItemList/utils/cart';
import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import { SERVER_NAME, getCartPath } from '@constants/urlConstants';
import { CartItemType } from '@type/ProductType';
import { server } from '../setupTests';

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

describe('useFetchCart 통신 테스트', () => {
  let serverData: CartItemType[] = [];

  beforeEach(() => {
    serverData = [];
    cartIdGenerator.initValue();

    server.use(
      rest.get(fetchUrl, (req, res, ctx) => {
        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.body('OK'),
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
    const { result } = renderHook(() => useFetchCart());

    const { addProductToCart } = result.current;

    const cartId = addProductToCart({ productId });

    expect(cartId).toBe(serverData[0].id);
  });

  test('장바구니 아이템 제거 통신 기능 올바르게 작동하는 지 확인 테스트', async () => {
    const { result } = renderHook(() => useFetchCart());
    const cartId = 1;

    serverData = [createCartItem({ cartId, product })];

    const { deleteCartItem } = result;

    deleteCartItem({ cartId });

    expect(serverData.length).toBe(0);
  });
  test('장바구니 아이템 수량 조절 통신 기능 올바르게 작동하는 지 확인 테스트', async () => {
    const { result } = renderHook(() => useFetchCart());
    const cartId = 1;

    serverData = [createCartItem({ cartId, product })];

    const { updateQuntityByCartItem } = result.current;

    updateCartItemQuantity({ cartId, quantity: 40 });

    expect(cart[0].quantity).toBe(40);
  });

  test('장바구니 아이템 수량 조절 통신 기능 올바르게 작동하는 지 확인 테스트', async () => {
    const { result } = renderHook(() => useFetchCart());

    serverData = [
      createCartItem({ cartId: 1, product }),
      createCartItem({ cartId: 2, product: product2 }),
      createCartItem({ cartId: 3, product: product3 }),
    ];

    const { getCartList } = result.current;

    const cart = getCartList();

    expect(cart).toEqual(serverData);
  });

  test('프론트엔드에서 의도한 장바구니 API 레이어가 올바르게 기능하는 지 테스트', async () => {
    const { result } = renderHook(() => useFetchCart());

    const { addProductToCart } = result.current;

    const product = PRODUCT_LIST.productList[0];

    addProductToCart({
      productId: product.id,
    });

    await waitFor(() => {
      const { data } = result.current;

      const keys = Object.keys(data ? data[0] : []);

      expect(keys).toEqual(['id', 'quantity', 'product', 'checked']);
    });

    await waitFor(() => {
      const { data } = result.current;

      const productKeys = Object.keys(data[0].product);

      expect(productKeys).toEqual(['id', 'name', 'price', 'imageUrl']);
    });
  });
});
