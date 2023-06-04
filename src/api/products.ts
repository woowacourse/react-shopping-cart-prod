import { ServerId } from "recoil/server";
import { SERVER_LIST, USER_TOKEN } from "./constants";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const getProducts = async (serverId: ServerId): Promise<Product[]> => {
  const response = await fetch(`${SERVER_LIST[serverId]}/products`, {
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
