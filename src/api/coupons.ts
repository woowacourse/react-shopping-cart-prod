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

  const data = await response.json();

  if (!response.ok)
    throw new Error(data.message ?? "오류가 발생했습니다. 잠시 후 다시 시도해주세요.");

  return data;
};
