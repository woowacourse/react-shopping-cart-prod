import {atom} from "recoil";
import {CartItem} from "../../../types/types.ts";

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});
