import { atom, selector } from 'recoil';
import { CartItem, OrderRequest } from '../types/types';
import { DELIVERY_FEE } from '../constants';

export const orderState = atom<CartItem[] | null>({
  key: 'orderState',
  default: null,
});

export const couponState = atom<{ id: number; discountPrice: number; couponName: string } | null>({
  key: 'couponState',
  default: null,
});

export const pointState = atom<string>({
  key: 'pointState',
  default: '',
});

export const orderRequestData = selector<OrderRequest>({
  key: 'orderRequestData',
  get: ({ get }) => {
    const orderList = get(orderState) as CartItem[];
    const coupon = get(couponState);
    const point = get(pointState);

    const orderItems = orderList.map((item) => ({
      cartItemId: item.id,
      productId: item.product.id,
      quantity: item.quantity,
    }));

    return {
      orderItems: orderItems,
      orderDiscounts: {
        couponIds: coupon ? [coupon.id] : [],
        point: Number(point),
      },
    } as OrderRequest;
  },
});

export const totalPaymentPriceSelector = selector({
  key: 'totalPaymentPriceSelector',
  get: ({ get }) => {
    const orderList = get(orderState);
    if (orderList) return orderList.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
    return 0;
  },
});

export const couponAppliedPriceSelector = selector({
  key: 'couponAppliedPriceSelector',
  get: ({ get }) => {
    const totalPrice = get(totalPaymentPriceSelector);
    const coupon = get(couponState);

    if (coupon) return totalPrice - coupon.discountPrice + DELIVERY_FEE;
    return totalPrice + DELIVERY_FEE;
  },
});
