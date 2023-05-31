import { ServerId } from "recoil/server";
import { Product } from "types/domain";
import { SERVER_LIST, USER_TOKEN } from "./constants";
import { ERROR_MESSAGE } from "constants/errorType";

export const getProducts = async (serverId: ServerId): Promise<Product[]> => {
  const response = await fetch(`/products`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
    },
  });

  // const response = await fetch(`${SERVER_LIST[serverId]}/products`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Basic ${USER_TOKEN}`,
  //   },
  // });
  const errorMessage = ERROR_MESSAGE[response.status] ?? ERROR_MESSAGE[0];

  if (!response.ok) throw new Error(errorMessage);

  return response.json();
};
