import { atom } from "recoil";

export type ServerId = "power-server" | "ttaengchil-server" | "ori-server";


export const serverSelectState = atom<ServerId>({
  key: "serverSelectState",
  default: "power-server",
});
