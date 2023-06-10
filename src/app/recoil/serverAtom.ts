import {atom} from "recoil";
import {sessionStorageEffect} from "./storageEffect.ts";

export const serverState = atom<string>({
  key: "serverState",
  default: "테스트",
  effects: [sessionStorageEffect<string>("server")],
});
