//실제 api와 연결할때 사용
// import { ServerId } from "recoil/server";

import { ERROR_MESSAGE } from "constants/errorType";
import { Order, EachOrderStatement } from "types/domain";

// import { SERVER_LIST, USER_TOKEN } from "./constants";

export const addOrder = async (orders: Order[]): Promise<boolean> => {
  const response = await fetch(`/orders`, {
    method: "POST",
    // headers: {
    //   Authorization: `Basic ${USER_TOKEN}`,
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(orders),
  });

  return response.status === 204;
};

export const getOrderStatement = async (): Promise<EachOrderStatement[]> => {
  const response = await fetch(`/orders`, {
    method: "GET",
    // headers: {
    //   Authorization: `Basic ${USER_TOKEN}`,
    //   "Content-Type": "application/json",
    // },
  });
  const errorMessage = ERROR_MESSAGE[response.status] ?? ERROR_MESSAGE[0];

  if (!response.ok) throw new Error(errorMessage);

  return response.json();
};
