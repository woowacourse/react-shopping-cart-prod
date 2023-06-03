import { MOCK_COUPON_LIST } from '@mocks/handlers';
import { createOrderRequestBody } from '@utils/order/order';

describe('주문에 이용하는 함수가 올바르게 작동하는 지 확인한다.', () => {
  test('장바구니 아이템과 쿠폰 아이디를 입력받아 통신에 필요한 객체로 반환한다.', () => {
    const cartItemIds = [1, 2];

    const selectedCoupon = MOCK_COUPON_LIST[0];

    const result = createOrderRequestBody({ cartItemIds, couponId: selectedCoupon.id });

    expect(result).toEqual({
      orderItemIds: [1, 2],
      couponId: selectedCoupon.id,
    });
  });

  test('장바구니 아이템과 쿠폰을 선택하지 않았을 때 통신에 필요한 객체로 반환한다.', () => {
    const cartItemIds = [1, 2];

    const result = createOrderRequestBody({ cartItemIds });

    expect(result).toEqual({
      orderItemIds: [1, 2],
    });
  });
});
