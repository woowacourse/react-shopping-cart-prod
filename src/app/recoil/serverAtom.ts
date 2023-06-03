import { atom, selector } from "recoil";
import { userRepository, userState } from "./userAtom.tsx";
import { sessionStorageEffect } from "./storageEffect.ts";

export const serverState = atom<string>({
  key: "serverState",
  default: "테스트",
  effects: [sessionStorageEffect<string>("server")],
});

export const serverRepository = selector({
  key: "serverRepository",
  get: ({ get, getCallback }) => {
    const changeServer = getCallback(
      ({ set, snapshot }) =>
        async (newServer: string) => {
          const user = await snapshot.getPromise(userState);
          const { logout } = get(userRepository);

          if (user) {
            if (confirm("로그아웃 하시겠습니까?")) {
              logout();
              set(serverState, newServer);
            }
          } else {
            set(serverState, newServer);
          }
          return;
        }
    );
    return { changeServer };
  },
});
