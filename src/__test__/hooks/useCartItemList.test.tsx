import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import { rest } from 'msw';
import { BASE_URL, CART_PATH } from '@constants/urlConstants';
import { CartItemType } from 'types/ProductType';
import { createCartItem } from '@views/Cart/utils/cart';
import { server } from '../setupTests';
import { useCartItemList } from '@views/Cart/hooks/useCartItemList';
import { Suspense } from 'react';

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

describe('useCartItemList 훅 테스트', () => {
  let serverData: CartItemType[] = [];

  beforeEach(() => {
    serverData = [createCartItem({ cartId: cartIdGenerator.value, product })];
    cartIdGenerator.initValue();

    server.use(
      rest.get(endpoint, (req, res, ctx) => {
        return res(
          ctx.set('Content-Type', 'application/json'),
          ctx.status(200),
          ctx.body('OK'),
          ctx.json(serverData)
        );
      })
    );
  });
  test.only('장바구니 리스트가 외부로부터 제대로 받아졌는 지 확인하는 테스트', async () => {
    const { result } = renderHook(() => useCartItemList(), {
      wrapper: ({ children }) => (
        <RecoilRoot>
          <Suspense fallback="">{children}</Suspense>
        </RecoilRoot>
      ),
    });

    await waitFor(
      () => {
        expect(result.current.cart).toEqual([]);
      },
      { timeout: 2000 }
    );
  });

  test('장바구니 아이템 수량 변경하는 경우 전역 장바구니 리스트 상태에 반영되는 지 테스트', async () => {
    const { result } = renderHook(() => useCartItemList(), {
      wrapper: RecoilRoot,
    });

    await waitFor(
      () => {
        const { cart, updateCartListItemQuantity } = result.current;
        updateCartListItemQuantity({ cartId: cartIdGenerator.value, quantity: 50 });

        expect(cart[0].quantity).toBe(50);
      },
      { timeout: 1000 }
    );
  });

  test('장바구니 아이템 제거하는 경우 전역 장바구니 리스트 상태에 반영되는 지 테스트', async () => {
    const { result } = renderHook(() => useCartItemList(), {
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
    const { result } = renderHook(() => useCartItemList(), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      const { cart, addCartItem } = result.current;
      addCartItem({ cartId: cartIdGenerator.value, product });

      expect(cart).toEqual(serverData);
    });
  });
});
