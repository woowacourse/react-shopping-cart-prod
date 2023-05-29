import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import {
  addItemToCart,
  cartApiWrapper,
  createCartItem,
  removeCartItem,
  updateCartItemQuantity,
} from '@utils/cart/cart';
import { CartItemType, ServerCartItemType } from '@type/cartType';

const cartId = 1;
const product = MOCK_PRODUCT_LIST[0];

describe('장바구니 함수 테스트', () => {
  test('상품 정보를 장바구니 아이템 정보로 변환하는 함수가 올바르게 작동하는 지 테스트', () => {
    const result = createCartItem({ cartId, product });

    const cartItem: CartItemType = {
      id: cartId,
      quantity: 1,
      isSelect: true,
      product,
    };

    expect(result).toEqual(cartItem);
  });

  test('선택한 장바구니 아이템의 수량 변경하는 함수가 올바르게 작동하는 지 테스트', () => {
    const cart = [createCartItem({ cartId, product })];

    const result = updateCartItemQuantity({ cartId, quantity: 50, cart });

    expect(result[0].quantity).toBe(50);
  });
  test('장바구니에 상품을 추가하는 함수가 올바르게 작동하는 지 테스트', () => {
    const cart: CartItemType[] = [];

    const result = addItemToCart({ cart, product, cartId });

    const updatedCart = [createCartItem({ cartId, product })];

    expect(result).toEqual(updatedCart);
  });

  test('장바구니 품목 삭제 함수가 올바르게 작동하는 지 테스트', () => {
    const cart = [createCartItem({ cartId, product })];

    const result = removeCartItem({ cart, cartId });

    expect(result.length).toBe(0);
  });

  test('서버에서 받아온 장바구니를 클라이언트에서 사용하는 장바구니로 변경하는 기능이 올바르게 작동하는 지 테스트', () => {
    const cart: ServerCartItemType[] = [
      {
        id: 1,
        product,
        quantity: 1,
      },
    ];

    const result = cartApiWrapper(cart);

    expect(result).toEqual([createCartItem({ cartId: 1, product })]);
  });
});
