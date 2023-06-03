import { useRecoilValue } from "recoil";
import { selectedProductsState } from "../recoil/atom";
import { useEffect, useState } from "react";
import { fetchCoupons } from "../api";
import { parseExpiredDate } from "../utils";
import { Coupon } from "../types/domain";

export const useCoupon = () => {
  const checkedCartList = useRecoilValue(selectedProductsState);
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const getCoupon = async () => {
      try {
        const response = await fetchCoupons(
          checkedCartList.map((checkedCartItem) => checkedCartItem.id)
        );
        
        if (!response.ok) throw new Error(response.status.toString());

        const couponsData = await response.json();

        const parsedCoupon = parseExpiredDate(couponsData);

        setCoupons(parsedCoupon);
      } catch (error) {
        console.log(error);
      }
    };

    getCoupon();
  }, [checkedCartList]);

  return { coupons };
};
