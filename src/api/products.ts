import { ServerId } from "recoil/server";
import { Product } from "types/domain";
import { SERVER_LIST, USER_TOKEN } from "./constants";

export const getProducts = async (serverId: ServerId): Promise<Product[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/products`, {
    method: "GET",
    headers: {
      Authorization: `Basic ${USER_TOKEN}`,
    },
  });

  return response.json();
};
