import { getCartItems } from "api/cartItems";
import { getCoupons } from "api/coupons";
import { getOrders } from "api/orders";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartListState } from "recoil/cart";
import { couponListState } from "recoil/coupon";
import { orderListState } from "recoil/order";
import { serverSelectState } from "recoil/server";

export const useReloadFromServer = () => {
  const selectedServer = useRecoilValue(serverSelectState);
  const setCartList = useSetRecoilState(cartListState);
  const setCouponList = useSetRecoilState(couponListState);
  const setOrderList = useSetRecoilState(orderListState);

  const reloadCartList = async () => {
    const cartItems = await getCartItems(selectedServer);

    setCartList(
      cartItems.map((item) => {
        return {
          ...item,
          isChecked: true,
        };
      })
    );
  };

  const reloadCouponList = async () => {
    const coupons = await getCoupons(selectedServer);

    setCouponList(
      coupons.map((coupon) => {
        return { ...coupon, productId: null };
      })
    );
  };

  const reloadOrderList = async () => {
    const orders = await getOrders(selectedServer);

    setOrderList(orders);
  };

  return { reloadCartList, reloadCouponList, reloadOrderList };
};
