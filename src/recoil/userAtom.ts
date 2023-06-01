import { atom, selector } from "recoil";
import type { Login, User } from "../types/types.ts";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const userRepository = selector({
  key: "userRepository",
  get: ({ getCallback }) => {

    const login = getCallback(({ set, snapshot }) => async (member: Login) => {
      const user = await snapshot.getPromise(userState);
      if (!user) {
        console.log(member);
        set(userState, null);
      }
    });

    const logout = getCallback(({ set }) => async () => {
      set(userState, null);
    });

    return { login, logout };
  }
});
