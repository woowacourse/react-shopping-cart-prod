import { fetchAddOrderList } from "../api";
import { LocalProductType } from "../types/domain";

export const useOrder = () => {
  const addOrder = async (
    orderList: LocalProductType[],
    couponId: number | null
  ) => {
    try {
      const response = await fetchAddOrderList(orderList, couponId);

      if (!response.ok) throw new Error(response.status.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return { addOrder };
};
