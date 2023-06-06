import { useRecoilState } from "recoil";
import { cartListState } from "recoil/cart";

export const useCart = () => {
  const [cartList, setCartList] = useRecoilState(cartListState);

  const updateCouponIdOfCartItem =
    (productId: number) => (couponId: number) => {
      const newCartList = cartList.map((item) => {
        if (item.product.id !== productId) return item;

        return { ...item, couponId: couponId };
      });

      return setCartList(newCartList);
    };

  return { updateCouponIdOfCartItem };
};
