//실제 api와 연결할때 사용
// import { ServerId } from "recoil/server";

import { ERROR_MESSAGE } from "constants/errorType";
import { Coupon } from "types/domain";
// import { SERVER_LIST, USER_TOKEN } from "./constants";

export const getCoupons = async (): Promise<Omit<Coupon, "selected">[]> => {
  const response = await fetch(`/Coupons`, {
    method: "GET",
    // headers: {
    //   Authorization: `Basic ${USER_TOKEN}`,
    // },
  });

  const errorMessage = ERROR_MESSAGE[response.status] ?? ERROR_MESSAGE[0];

  if (!response.ok) throw new Error(errorMessage);

  return response.json();
};
