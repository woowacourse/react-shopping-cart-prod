import { atom, selector } from "recoil";
import type { Sign, User } from "../types/types.ts";
import { modalRepository } from "./modalAtoms.tsx";
import Login from "../components/Login";
import { setSessionStorage } from "../utils/storage.ts";
import { SESSION_STORAGE_KEY_CART_ITEMS } from "../app/keys.ts";
import { fetchCartList } from "../api/api.ts";
import { cartState } from "./cartAtoms.ts";
import { serverState } from "./serverAtom.ts";

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

export const userRepository = selector({
  key: "userRepository",
  get: ({ getCallback }) => {
    const login = getCallback(({ set, snapshot }) => async (member: Sign) => {
      const { closeModal } = await snapshot.getPromise(modalRepository);
      const user = await snapshot.getPromise(userState);
      const server = await snapshot.getPromise(serverState);

      if (!user) {
        const name = member.id.split("@")[0];
        const newUser: User = {
          ...member,
          name,
        };
        setSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, []);
        const newCartList = await fetchCartList(server);
        set(cartState, newCartList);
        set(userState, newUser);
        closeModal();
      }
    });

    const logout = getCallback(({ set }) => async () => {
      setSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, []);
      set(userState, null);
      set(cartState, []);
    });

    const loginCheckerCallback = getCallback(
      ({ snapshot }) =>
        async (callback: () => void) => {
          const user = await snapshot.getPromise(userState);
          const { openModal } = await snapshot.getPromise(modalRepository);
          if (user) {
            callback();
          } else if (
            confirm("로그인이 필요한 메뉴입니다. 로그인 하시겠습니까?")
          ) {
            openModal(<Login />);
          }
        }
    );

    return { login, logout, loginCheckerCallback };
  },
});
