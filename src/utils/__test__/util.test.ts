import { CartStoreState } from 'types/index';
import { isProductInCart } from 'utils/validator';

describe('util 함수 테스트', () => {
  test('해당 상품이 장바구니에 있는지 여부를 올바르게 판단하여 반환할 수 있다.', () => {
    const cart: CartStoreState['cartItems'] = [
      {
        id: 1,
        product: {
          id: 1,
          name: '짱바구니',
          price: 2000,
          imageUrl:
            'https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_2928088%2F29280886621.20211018102157.jpg&type=sc960_832',
          description:
            '귀여운 짱구가 토끼 옷을 입고 당근을 안고 있는 인형입니다.',
        },
        quantity: 1,
      },
      {
        id: 2,
        product: {
          id: 2,
          name: '짱바구니',
          price: 2000,
          imageUrl:
            'https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_2928088%2F29280886621.20211018102157.jpg&type=sc960_832',
          description:
            '귀여운 짱구가 토끼 옷을 입고 당근을 안고 있는 인형입니다.',
        },
        quantity: 1,
      },
    ];

    const productId1 = 1;

    expect(isProductInCart(productId1, cart)).toBeTruthy();

    const productId2 = 9999;

    expect(isProductInCart(productId2, cart)).toBeFalsy();
  });
});
