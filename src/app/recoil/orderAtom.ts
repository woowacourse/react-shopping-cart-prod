import { atom, selector, selectorFamily } from "recoil";
import { CartItem, Coupon, NewOrder, Point } from "../../types/types";
import { checkedCartSelector, totalPriceSelector } from "./cartAtoms";
import { modalRepository } from "./modalAtoms";

export const deliveryFeeState = atom({
  key: "deliveryFeeState",
  default: 3000,
});

export const couponState = atom<Coupon[]>({
  key: "couponState",
  default: [],
});

export const pointState = atom<Point>({
  key: "pointState",
  default: {
    pointHistories: [],
    totalPoint: 0,
  },
});

export const selectedCouponState = atom<Coupon[]>({
  key: "selectedCouponState",
  default: [],
});

export const selectedCouponIdSelector = selector<number[]>({
  key: "selectedCouponIdSelector",
  get: ({ get }) => {
    const selectedCoupons = get(selectedCouponState);
    return selectedCoupons.map((coupon) => coupon.id);
  },
});

export const discountPriceByCouponSelector = selector<number>({
  key: "discountPriceByCouponSelector",
  get: ({ get }) => {
    const totalPrice = get(totalPriceSelector);
    const selectedCoupons = get(selectedCouponState);
    const discount =
      selectedCoupons.length > 0
        ? (totalPrice * selectedCoupons[0]?.discountPercent) / 100 +
          selectedCoupons[0]?.discountAmount
        : 0;
    return discount;
  },
});

export const isCouponSelectedSelector = selectorFamily<boolean, number>({
  key: "selectedCouponSelectedSelector",
  get:
    (couponId: number) =>
    ({ get }) => {
      const selectedCouponIds = get(selectedCouponIdSelector);

      return selectedCouponIds.includes(couponId);
    },
});

export const selectedPointState = atom({
  key: "selectedPointState",
  default: 0,
});

export const expectedOrderPriceState = atom({
  key: "expectedOrderPriceState",
  default: 0,
});

export const orderRepository = selector({
  key: "orderRepository",
  get: ({ getCallback }) => {
    const loadCoupons = getCallback(({ set }) => async () => {
      const response = await fetch("/coupons"); // 인증 추가와 함께 api.ts로 이전 예정
      const data = await response.json();

      set(couponState, data);
    });

    const loadPoint = getCallback(({ set }) => async () => {
      const response = await fetch("/point"); // 인증 추가와 함께 api.ts로 이전 예정
      const data = await response.json();

      set(pointState, data);
    });

    const commitPurchaseItems = getCallback(({ snapshot }) => async () => {
      const checkedCartList = await snapshot.getPromise(checkedCartSelector);
      const selectedPoint = await snapshot.getPromise(selectedPointState);
      const selectedCouponIds = await snapshot.getPromise(
        selectedCouponIdSelector
      );
      const { closeModal } = await snapshot.getPromise(modalRepository);

      const newOrder: NewOrder = {
        orderItems: checkedCartList.map((item) => {
          return {
            cartItemId: item.id,
            productId: item.product.id,
            quantity: item.quantity,
          };
        }),
        orderDiscounts: {
          couponIds: selectedCouponIds,
          point: selectedPoint,
        },
      };

      alert(JSON.stringify(newOrder));
      alert("결제가 완료됐습니다.");
      closeModal();
    });

    const updateSelectedCoupon = getCallback(
      ({ set, snapshot }) =>
        async (coupon: Coupon) => {
          const selectedCoupons = await snapshot.getPromise(
            selectedCouponState
          );
          const newSelectedCoupons =
            selectedCoupons[0]?.id === coupon.id ? [] : [coupon];

          set(selectedCouponState, newSelectedCoupons);
        }
    );

    const updateExpectedOrderPrice = getCallback(
      ({ set, snapshot }) =>
        async () => {
          const totalPrice = await snapshot.getPromise(totalPriceSelector);
          const checkedCartList = await snapshot.getPromise(
            checkedCartSelector
          );
          const selectedCouponIds = await snapshot.getPromise(
            selectedCouponIdSelector
          );
          const discountByCoupon = await snapshot.getPromise(
            discountPriceByCouponSelector
          );
          const selectedPoint = await snapshot.getPromise(selectedPointState);

          const expectedOrderPrice =
            totalPrice - discountByCoupon - selectedPoint;

          const query = {
            cartItems: checkedCartList.map((cart) => {
              return {
                cartItemId: cart.id,
                productId: cart.product.id,
                quantity: cart.quantity,
              };
            }),
            couponIds: [selectedCouponIds[0]],
            usePoint: selectedPoint,
          };
          set(expectedOrderPriceState, expectedOrderPrice);
        }
    );

    return {
      loadCoupons,
      loadPoint,
      commitPurchaseItems,
      updateSelectedCoupon,
      updateExpectedOrderPrice,
    };
  },
});
