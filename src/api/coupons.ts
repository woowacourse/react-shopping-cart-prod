import { ServerId } from "recoil/server";

import { Coupon } from "types/domain";
import { SERVER_LIST, USER_TOKEN } from "./constants";

export const getCoupons = async (
  serverId: ServerId
): Promise<Omit<Coupon, "selected">[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/coupons`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
    },
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.error);

  return data;
};
