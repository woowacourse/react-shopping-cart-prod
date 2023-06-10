import {selector} from "recoil";
import {serverState} from "../serverAtom.ts";
import {fetchCoupons, fetchOrder, fetchPoint} from "../../api/api.ts";
import {cartRepository} from "../cart/cartRepository.ts";
import {checkedCartSelector, totalPriceSelector} from "../cart/cartSelectors.ts";
import {modalRepository} from "../modal/modalRepository.tsx";
import {Coupon, NewOrder} from "../../../types/types.ts";
import {
  couponState,
  expectedOrderPriceState,
  pointState,
  selectedCouponState,
  selectedPointState
} from "./orderAtom.ts";
import {discountPriceByCouponSelector, selectedCouponIdSelector} from "./orderSelector.ts";

export const orderRepository = selector({
  key: "orderRepository",
  get: ({getCallback}) => {
    const loadCoupons = getCallback(({set, snapshot}) => async () => {
      const server = await snapshot.getPromise(serverState);
      const coupons = await fetchCoupons(server);

      set(couponState, coupons);
    });

    const loadPoint = getCallback(({set, snapshot}) => async () => {
      const server = await snapshot.getPromise(serverState);
      const point = await fetchPoint(server);

      set(pointState, point);
    });

    const commitPurchaseItems = getCallback(({snapshot}) => async () => {
      const {loadCartList} = await snapshot.getPromise(cartRepository);
      const server = await snapshot.getPromise(serverState);
      const checkedCartList = await snapshot.getPromise(checkedCartSelector);
      const selectedPoint = await snapshot.getPromise(selectedPointState);
      const selectedCouponIds = await snapshot.getPromise(
        selectedCouponIdSelector
      );
      const {closeModal} = await snapshot.getPromise(modalRepository);

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

      const response = await fetchOrder(server, newOrder);

      if (response) {
        alert("결제가 완료됐습니다.");
        loadCartList();
        closeModal();
      } else {
        alert("뭔가 문제가 있군요");
      }

      return response;
    });

    const updateSelectedCoupon = getCallback(
      ({set, snapshot}) =>
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
      ({set, snapshot}) =>
        async () => {
          const totalPrice = await snapshot.getPromise(totalPriceSelector);
          const discountByCoupon = await snapshot.getPromise(
            discountPriceByCouponSelector
          );
          const selectedPoint = await snapshot.getPromise(selectedPointState);

          const expectedOrderPrice =
            totalPrice - discountByCoupon - selectedPoint;

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
