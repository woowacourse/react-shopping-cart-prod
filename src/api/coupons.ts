//실제 api와 연결할때 사용
// import { ServerId } from "recoil/server";

import { Coupon } from "types/domain";
// import { SERVER_LIST, USER_TOKEN } from "./constants";

export const getCoupons = async (): Promise<Omit<Coupon, "selected">[]> => {
  const response = await fetch(`/Coupons`, {
    method: "GET",
    // headers: {
    //   Authorization: `Basic ${USER_TOKEN}`,
    // },
  });

  return response.status === 200 && response.json();
};
