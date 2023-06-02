import { atom, selector } from "recoil";
import type { Login, User } from "../types/types.ts";
import { modalRepository } from "./modalAtoms.tsx";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const userRepository = selector({
  key: "userRepository",
  get: ({ getCallback }) => {
    const login = getCallback(({ set, snapshot }) => async (member: Login) => {
      const { closeModal } = await snapshot.getPromise(modalRepository);
      const user = await snapshot.getPromise(userState);

      if (!user) {
        const name = member.id.split("@")[0];
        const newUser: User = {
          ...member,
          name,
        };
        set(userState, newUser);
        closeModal();
      }
    });

    const logout = getCallback(({ set }) => async () => {
      set(userState, null);
    });

    return { login, logout };
  },
});
