import { MOCK_PRODUCT_LIST } from '@mocks/handlers';
import {
  addItemToCart,
  allSelectCartItem,
  calculateSelectCartTotalPrice,
  cartApiWrapper,
  cartItemSelectedById,
  createCartItem,
  removeCartItem,
  removeSelectedCartItem,
  toggleSelectCartItem,
  updateCartItemQuantity,
} from '@utils/cart/cart';
import { CartItemType, ServerCartItemType } from '@type/cartType';

const cartId = 1;
const [product, product2, product3, product4] = MOCK_PRODUCT_LIST;

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

  test('장바구니에 담긴 상품을 체크 박스를 눌렀을 때 선택되었던 상태가 반대로 변경되는 지 테스트', () => {
    const cartItem = createCartItem({ cartId: 1, product });
    const cart: CartItemType[] = [{ ...cartItem, isSelect: true }];
    const updatedCart = toggleSelectCartItem({ cart, cartId: cartItem.id });

    expect(updatedCart).toEqual([{ ...cartItem, isSelect: false }]);
  });

  test('장바구니에 담긴 선택된 상품의 총 가격이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createCartItem({ cartId: 1, product });
    const cartItem2 = createCartItem({ cartId: 2, product: product2 });
    const cartItem3 = createCartItem({ cartId: 3, product: product3 });

    const cart: CartItemType[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
    ];

    const totalCartPrice = calculateSelectCartTotalPrice(cart);

    expect(totalCartPrice).toEqual(
      cartItem1.quantity * cartItem1.product.price + cartItem3.quantity * cartItem3.product.price
    );
  });

  test('장바구니에서 선택한 아이템을 삭제하는 기능이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createCartItem({ cartId: 1, product });
    const cartItem2 = createCartItem({ cartId: 2, product: product2 });
    const cartItem3 = createCartItem({ cartId: 3, product: product3 });

    const cart: CartItemType[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
    ];

    const updatedCart = removeSelectedCartItem(cart);

    expect(updatedCart).toEqual([{ ...cartItem2, isSelect: false }]);
  });

  test('장바구니 페이지에서 전체 선택을 눌렀을 때 모든 장바구니 아이템이 선택되는 기능이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createCartItem({ cartId: 1, product });
    const cartItem2 = createCartItem({ cartId: 2, product: product2 });
    const cartItem3 = createCartItem({ cartId: 3, product: product3 });

    const cart: CartItemType[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
    ];

    const updatedCart = allSelectCartItem({ cart, isCheck: true });

    expect(updatedCart).toEqual([
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: true },
      { ...cartItem3, isSelect: true },
    ]);
  });
  test('장바구니 페이지에서 전체 선택이 되어있는 상태에서 전체 선택 버튼을 눌렀을 때 모두 선택이 풀리는 기능이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createCartItem({ cartId: 1, product });
    const cartItem2 = createCartItem({ cartId: 2, product: product2 });
    const cartItem3 = createCartItem({ cartId: 3, product: product3 });

    const cart: CartItemType[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
    ];

    const updatedCart = allSelectCartItem({ cart, isCheck: false });

    expect(updatedCart).toEqual([
      { ...cartItem1, isSelect: false },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: false },
    ]);
  });

  test('장바구니 아이템 중 선택된 아이템들의 아이디 배열을 반환하는 기능이 올바르게 작동하는 지 테스트', () => {
    const cartItem1 = createCartItem({ cartId: 1, product });
    const cartItem2 = createCartItem({ cartId: 2, product: product2 });
    const cartItem3 = createCartItem({ cartId: 3, product: product3 });
    const cartItem4 = createCartItem({ cartId: 4, product: product4 });

    const cart: CartItemType[] = [
      { ...cartItem1, isSelect: true },
      { ...cartItem2, isSelect: false },
      { ...cartItem3, isSelect: true },
      { ...cartItem4, isSelect: true },
    ];

    const updatedCart = cartItemSelectedById(cart);

    expect(updatedCart).toEqual([product.id, product3.id, product4.id]);
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
