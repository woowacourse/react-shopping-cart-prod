import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import {
  addItemToCart,
  createCartItem,
  removeCartItem,
  updateCartItemQuantity,
} from '@utils/cart/cart';
import { CartItemType } from '@type/ProductType';

const cartId = 1;
const product = MOCK_PRODUCT_LIST[0];

describe('장바구니 함수 테스트', () => {
  test('상품 정보를 장바구니 아이템 정보로 변환하는 함수가 올바르게 작동하는 지 테스트', () => {
    const result = createCartItem({ cartId, product });

    const cartItem: CartItemType = {
      id: cartId,
      quantity: 1,
      checked: true,
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
});
