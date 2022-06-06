import { CartStoreState } from 'types/index';
import { getProductStockInCart } from 'utils/validator';

describe('util 함수 테스트', () => {
  test('해당 상품이 장바구니에 몇 개 있는지를 올바르게 반환할 수 있다.', () => {
    const cart: CartStoreState['cart'] = [
      {
        id: 1,
        stock: 2,
        checked: true,
      },
      {
        id: 2,
        stock: 1,
        checked: false,
      },
    ];
    const productId1 = 1;

    expect(getProductStockInCart(productId1, cart)).toEqual(2);

    const productId2 = 9999;

    expect(getProductStockInCart(productId2, cart)).toEqual(1);
  });
});
