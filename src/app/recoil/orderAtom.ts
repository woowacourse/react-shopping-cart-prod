import { atom, selector, selectorFamily } from "recoil";
import { Coupon, NewOrder, Point } from "../../types/types";
import {
  cartRepository,
  checkedCartSelector,
  totalPriceSelector,
} from "./cartAtoms";
import { modalRepository } from "./modalAtoms";
import { url } from "../api/url.ts";
import { serverState } from "./serverAtom.ts";
import { getSessionStorage } from "../utils/storage.ts";
import { SESSION_STORAGE_KEY_BASE64 } from "../keys.ts";

const base64 = getSessionStorage(SESSION_STORAGE_KEY_BASE64, "");

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
    const loadCoupons = getCallback(({ set, snapshot }) => async () => {
      const server = await snapshot.getPromise(serverState);
      const response = await fetch(`${url[server]}/coupons`, {
        headers: {
          Authorization: `Basic ${base64}`,
        },
      }); // 인증 추가와 함께 api.ts로 이전 예정
      const data = await response.json();

      set(couponState, data);
    });

    const loadPoint = getCallback(({ set, snapshot }) => async () => {
      const server = await snapshot.getPromise(serverState);
      const response = await fetch(`${url[server]}/point`, {
        headers: {
          Authorization: `Basic ${base64}`,
        },
      }); // 인증 추가와 함께 api.ts로 이전 예정
      const data = await response.json();

      set(pointState, data);
    });

    const commitPurchaseItems = getCallback(({ snapshot }) => async () => {
      const { loadCartList } = await snapshot.getPromise(cartRepository);
      const server = await snapshot.getPromise(serverState);
      const checkedCartList = await snapshot.getPromise(checkedCartSelector);
      const selectedPoint = await snapshot.getPromise(selectedPointState);
      const selectedCouponIds = await snapshot.getPromise(
        selectedCouponIdSelector
      );
      const { closeModal } = await snapshot.getPromise(modalRepository);

      const newOrder: NewOrder = {
        orderItems: checkedCartList.map((item) => ({
          cartItemId: item.id,
          productId: item.product.id,
          quantity: item.quantity,
        })),
        orderDiscounts: {
          couponIds: selectedCouponIds,
          point: selectedPoint,
        },
      };

      const response = await fetch(`${url[server]}/orders`, {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers: {
          Authorization: `Basic ${base64}`,
        },
      });

      if (response.ok) {
        alert("결제가 완료됐습니다.");
        loadCartList();
        closeModal();
      } else {
        alert("뭔가 문제가 있군요");
      }

      return response.ok;
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
          // 추후에 서버로 쿼리 날려서 계산 값을 검증할 예정

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
