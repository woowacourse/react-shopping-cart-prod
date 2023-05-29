import { renderHook, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { rest } from 'msw';
import { RecoilRoot } from 'recoil';
import { useRecoilCart } from '@hooks/useRecoilCart';
import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import { createCartItem } from '@utils/cart/cart';
import { SERVER_NAME, getCartPath } from '@constants/urlConstants';
import { CartItemType } from '@type/ProductType';
import { server } from '../setupTests';

fetchMock.enableMocks();

const [product] = MOCK_PRODUCT_LIST;

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

describe('useRecoilCart 훅 테스트', () => {
  let serverData: CartItemType[] = [];
  beforeEach(() => {
    cartIdGenerator.initValue();
    serverData = [createCartItem({ cartId: cartIdGenerator.value, product })];

    server.use(
      rest.get(fetchUrl, (req, res, ctx) => {
        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.json(serverData)
        );
      })
    );
  });
  test('장바구니 리스트가 외부로부터 제대로 받아졌는 지 확인하는 테스트', async () => {
    const { result } = renderHook(() => useRecoilCart(), {
      wrapper: RecoilRoot,
    });

    await waitFor(async () => {
      expect(result.current.cart).toEqual(serverData);
    });
  });

  test('장바구니 아이템 수량 변경하는 경우 전역 장바구니 리스트 상태에 반영되는 지 테스트', async () => {
    const { result } = renderHook(() => useRecoilCart(), {
      wrapper: RecoilRoot,
    });

    await waitFor(
      () => {
        const { cart, updateCartListItemQuantity } = result.current;
        updateCartListItemQuantity({
          cartId: cartIdGenerator.value,
          quantity: 50,
        });

        expect(cart[0].quantity).toBe(50);
      },
      { timeout: 1000 }
    );
  });

  test('장바구니 아이템 제거하는 경우 전역 장바구니 리스트 상태에 반영되는 지 테스트', async () => {
    const { result } = renderHook(() => useRecoilCart(), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      const { cart, deleteCartItem } = result.current;
      deleteCartItem(cartIdGenerator.value);

      expect(cart.length).toBe(0);
    });
  });

  test('장바구니 아이템 추가하는 경우 전역 장바구니 리스트 상태에 반영되는 지 테스트', async () => {
    serverData = [];
    const { result } = renderHook(() => useRecoilCart(), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      const { cart, addCartItem } = result.current;
      addCartItem({ cartId: cartIdGenerator.value, product });

      expect(cart).toEqual(serverData);
    });
  });

  test('프론트엔드에서 의도한 장바구니 API 레이어가 올바르게 기능하는 지 테스트', async () => {
    const { result } = renderHook(() => useRecoilCart(), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      const { cart } = result.current;
      const keys = Object.keys(cart[0]);

      expect(keys).toEqual(['id', 'quantity', 'product', 'checked']);
    });

    await waitFor(() => {
      const { cart } = result.current;
      const productKeys = Object.keys(cart[0].product);

      expect(productKeys).toEqual(['id', 'name', 'price', 'imageUrl']);
    });
  });
});
