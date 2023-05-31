import { ServerId } from "recoil/server";
import { SERVER_LIST, USER_TOKEN } from "./constants";

export interface Coupon {
  couponId: number;
  name: string;
  discount: {
    type: "rate" | "price";
    amount: number;
  };
}

export const getCoupons = async (serverId: ServerId): Promise<Coupon[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/coupons`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
    },
  });

  return response.json();
};
