import { atom } from "recoil";

export const serverState = atom<string>({
  key: "serverState",
  default: "테스트",
});
