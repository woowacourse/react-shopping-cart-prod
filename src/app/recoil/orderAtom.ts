import { atom, selector, selectorFamily } from "recoil";
import { Coupon, NewOrder, Point } from "../../types/types";
import { checkedCartSelector } from "./cartAtoms";
import { modalRepository } from "./modalAtoms";

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

export const selectedCouponIdsState = atom<number[]>({
  key: "selectedCouponIdsState",
  default: [],
});

export const isCouponSelectedSelector = selectorFamily<boolean, number>({
  key: "selectedCouponSelectedSelector",
  get:
    (couponId: number) =>
    ({ get }) => {
      const selectedCouponIds = get(selectedCouponIdsState);

      return selectedCouponIds.includes(couponId);
    },
});

export const selectedPointState = atom({
  key: "selectedPointState",
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
        selectedCouponIdsState
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

    const updateSelectedCouponId = getCallback(
      ({ set, snapshot }) =>
        async (couponId: number) => {
          const selectedCoupons = await snapshot.getPromise(
            selectedCouponIdsState
          );

          set(
            selectedCouponIdsState,
            selectedCoupons[0] === couponId ? [] : [couponId]
          );
        }
    );

    return {
      loadCoupons,
      loadPoint,
      commitPurchaseItems,
      updateSelectedCouponId,
    };
  },
});
