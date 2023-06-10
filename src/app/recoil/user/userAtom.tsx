import { atom } from "recoil";
import { sessionStorageEffect } from "../storageEffect.ts";
import { User } from "../../../types/types.ts";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
  effects: [sessionStorageEffect<User | null>("user")],
});
