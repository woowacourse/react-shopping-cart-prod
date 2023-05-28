//실제 api와 연결할때 사용
// import { ServerId } from "recoil/server";

import { Order } from "types/domain";

// import { SERVER_LIST, USER_TOKEN } from "./constants";

export const addOrder = async (orderList: Order[]): Promise<boolean> => {
  const response = await fetch(`/orders`, {
    method: "POST",
    // headers: {
    //   Authorization: `Basic ${USER_TOKEN}`,
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(orderList),
  });

  console.log(orderList);

  return response.status === 204;
};
