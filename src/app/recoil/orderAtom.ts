import { atom, selector } from "recoil";
import { Coupon, NewOrder } from "../../types/types";
import { checkedCartSelector } from "./cartAtoms";
import { modalRepository } from "./modalAtoms";

export const couponState = atom<Coupon[]>({
  key: "couponState",
  default: []
});

export const pointState = atom({
  key: "pointState",
  default: 0
});

export const selectedCouponIdsState = atom<number[]>({
  key: 'selectedCouponIdsState',
  default: []
});


export const orderRepository = selector({
  key: "orderRepository",
  get: ({ getCallback }) => {

    const loadCoupons = getCallback(({ set }) => async () => {
      const response = await fetch('/coupons');
      const data = await response.json();

      set(couponState, data);
    });

    const commitPurchaseItems = getCallback(({ snapshot }) => async () => {
      const checkedCartList = await snapshot.getPromise(checkedCartSelector);
      const point = await snapshot.getPromise(pointState);
      const selectedCouponIds = await snapshot.getPromise(selectedCouponIdsState);
      const { closeModal } = await snapshot.getPromise(modalRepository);
      const newOrder: NewOrder = {
        orderItems: checkedCartList.map((item) => { return { cartItemId: item.id, productId: item.product.id, quantity: item.quantity }; }),
        orderDiscounts: {
          couponIds: selectedCouponIds,
          point: point,
        }
      };
      alert(JSON.stringify(newOrder));
      alert("결제가 완료됐습니다.");
      closeModal();

    });

    return {
      loadCoupons,
      commitPurchaseItems
    };
  }
});
