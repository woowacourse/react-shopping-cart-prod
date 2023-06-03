import {
  getAvailableCouponsByTotalPrice,
  getDiscountPrice,
  getDiscountedTotalPrice,
} from '@utils/coupon/coupon';
import { CouponType } from '@type/couponType';

const coupons: CouponType[] = [
  {
    id: 1,
    name: '생일 쿠폰',
    type: 'percent',
    value: 10,
    minimumPrice: 0,
  },
  {
    id: 2,
    name: '40000원 이상 3000원 할인 쿠폰',
    type: 'price',
    value: 3000,
    minimumPrice: 40000,
  },
  {
    id: 3,
    name: '배달비 할인 쿠폰',
    type: 'delivery',
    value: 3000,
    minimumPrice: 0,
  },
];

describe('쿠폰에 관련된 함수가 올바르게 작동해야 한다.', () => {
  test('현재 선택된 상품들의 총 가격을 넣었을 때 사용할 수 있는 쿠폰 배열을 반환한다.', () => {
    const totalItemsPrice = 20000;

    const result = getAvailableCouponsByTotalPrice({ coupons, totalItemsPrice });

    const expectedResult = [
      {
        id: 1,
        name: '생일 쿠폰',
        type: 'percent',
        value: 10,
        minimumPrice: 0,
      },
      {
        id: 3,
        name: '배달비 할인 쿠폰',
        type: 'delivery',
        value: 3000,
        minimumPrice: 0,
      },
    ];

    expect(result).toEqual(expectedResult);
  });

  test('주문 가격이 0원일 때 사용할 수 있는 쿠폰 배열을 빈 배열로 반환한다.', () => {
    const totalItemsPrice = 0;

    const result = getAvailableCouponsByTotalPrice({ coupons, totalItemsPrice });

    expect(result).toEqual([]);
  });

  test('정적 할인 쿠폰을 사용했을 때 할인이 적용된 총 주문 금액을 반환한다.', () => {
    const totalItemsPrice = 40000;
    const deliveryFee = 3000;

    const priceCoupon: CouponType = {
      id: 2,
      name: '40000원 이상 3000원 할인 쿠폰',
      type: 'price',
      value: 3000,
      minimumPrice: 40000,
    };

    const result = getDiscountedTotalPrice({ totalItemsPrice, deliveryFee, coupon: priceCoupon });

    expect(result).toBe(40000);
  });

  test('퍼센트 할인 쿠폰을 사용했을 때 할인이 적용된 총 주문 금액을 반환한다.', () => {
    const totalItemsPrice = 40000;
    const deliveryFee = 3000;

    const percentCoupon: CouponType = {
      id: 1,
      name: '생일 쿠폰',
      type: 'percent',
      value: 10,
      minimumPrice: 0,
    };

    const result = getDiscountedTotalPrice({ totalItemsPrice, deliveryFee, coupon: percentCoupon });

    expect(result).toBe(39000);
  });

  test('배달비 할인 쿠폰을 사용했을 때 할인이 적용된 총 주문 금액을 반환한다.', () => {
    const totalItemsPrice = 40000;
    const deliveryFee = 3000;

    const deliveryCoupon: CouponType = {
      id: 3,
      name: '배달비 할인 쿠폰',
      type: 'delivery',
      value: 3000,
      minimumPrice: 0,
    };

    const result = getDiscountedTotalPrice({
      totalItemsPrice,
      deliveryFee,
      coupon: deliveryCoupon,
    });

    expect(result).toBe(40000);
  });

  test('사용 조건이 없는 정적 할인 쿠폰을 사용했을 때 총 상품 가격이 해당 쿠폰보다 적을 경우 0원을 반환한다.', () => {
    const totalItemsPrice = 200000;
    const deliveryFee = 3000;

    const priceCoupon: CouponType = {
      id: 2,
      name: '40000원 이상 3000원 할인 쿠폰',
      type: 'price',
      value: 3000,
      minimumPrice: 40000,
    };

    const result = getDiscountedTotalPrice({ totalItemsPrice, deliveryFee, coupon: priceCoupon });

    expect(result).toBe(200000);
  });

  test('총 상품 가격이 0원일 때 쿠폰을 사용한다면 에러를 반환한다.', () => {
    const totalItemsPrice = 0;
    const deliveryFee = 0;

    const deliveryCoupon: CouponType = {
      id: 3,
      name: '배달비 할인 쿠폰',
      type: 'delivery',
      value: 3000,
      minimumPrice: 0,
    };

    const result = () =>
      getDiscountedTotalPrice({ totalItemsPrice, deliveryFee, coupon: deliveryCoupon });

    expect(result).toThrow();
  });

  test('총 상품 가격이 0원일 때 쿠폰을 사용한다면 에러를 반환한다.', () => {
    const totalItemsPrice = 0;
    const deliveryFee = 0;

    const deliveryCoupon: CouponType = {
      id: 3,
      name: '배달비 할인 쿠폰',
      type: 'delivery',
      value: 3000,
      minimumPrice: 0,
    };

    const result = () =>
      getDiscountedTotalPrice({ totalItemsPrice, deliveryFee, coupon: deliveryCoupon });

    expect(result).toThrow();
  });

  test('정적 할인 쿠폰을 사용할 때 할인 금액을 반환한다.', () => {
    const totalItemsPrice = 40000;

    const priceCoupon: CouponType = {
      id: 2,
      name: '40000원 이상 3000원 할인 쿠폰',
      type: 'price',
      value: 3000,
      minimumPrice: 40000,
    };
    const result = getDiscountPrice({ totalItemsPrice, coupon: priceCoupon });

    expect(result).toBe(3000);
  });
  test('퍼센트 할인 쿠폰을 사용할 때 할인 금액을 반환한다.', () => {
    const totalItemsPrice = 40000;

    const percentCoupon: CouponType = {
      id: 1,
      name: '생일 쿠폰',
      type: 'percent',
      value: 10,
      minimumPrice: 0,
    };

    const result = getDiscountPrice({ totalItemsPrice, coupon: percentCoupon });

    expect(result).toBe(4000);
  });

  test('배달비 할인 쿠폰을 사용할 때 할인 금액을 반환한다.', () => {
    const totalItemsPrice = 40000;

    const deliveryCoupon: CouponType = {
      id: 3,
      name: '배달비 할인 쿠폰',
      type: 'delivery',
      value: 3000,
      minimumPrice: 0,
    };

    const result = getDiscountPrice({ totalItemsPrice, coupon: deliveryCoupon });

    expect(result).toBe(3000);
  });

  test('쿠폰을 사용할 때 총 가격이 쿠폰 사용 조건 금액보다 낮다면 0을 반환한다.', () => {
    const totalItemsPrice = 40000;

    const deliveryCoupon: CouponType = {
      id: 3,
      name: '배달비 할인 쿠폰',
      type: 'delivery',
      value: 3000,
      minimumPrice: 50000,
    };

    const result = getDiscountPrice({ totalItemsPrice, coupon: deliveryCoupon });

    expect(result).toBe(0);
  });

  test('쿠폰을 사용할 때 총 가격이 쿠폰 사용 조건 금액보다 낮다면 0을 반환한다.', () => {
    const totalItemsPrice = 40000;

    const deliveryCoupon: CouponType = {
      id: 3,
      name: '배달비 할인 쿠폰',
      type: 'delivery',
      value: 3000,
      minimumPrice: 50000,
    };

    const result = getDiscountPrice({ totalItemsPrice, coupon: deliveryCoupon });

    expect(result).toBe(0);
  });
  test('쿠폰을 사용할 때 쿠폰 사용 조건이 제한없더라도 총 가격이 0이라면  0을 반환한다.', () => {
    const totalItemsPrice = 0;

    const deliveryCoupon: CouponType = {
      id: 3,
      name: '배달비 할인 쿠폰',
      type: 'delivery',
      value: 4000,
      minimumPrice: 0,
    };

    const result = getDiscountPrice({ totalItemsPrice, coupon: deliveryCoupon });

    expect(result).toBe(0);
  });
});
