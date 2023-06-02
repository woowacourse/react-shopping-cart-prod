import { ServerId } from "recoil/server";

import { OrderResultStatement, Order } from "types/domain";

import { SERVER_LIST, USER_TOKEN } from "./constants";

export const addOrder = async (
  serverId: ServerId,
  orders: Order
): Promise<boolean> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orders),
  });
  const data = await response.json();

  if (!response.ok) alert(data.error);

  return response.ok;
};

export const getOrderStatement = async (
  serverId: ServerId
): Promise<OrderResultStatement[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
    },
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.error);

  return data;
};
