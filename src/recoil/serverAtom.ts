import { AtomEffect, atom, selector } from "recoil";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";
import { useState } from "react";
import { userRepository, userState } from "./userAtom.tsx";

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = getLocalStorage(key, null);

    if (savedValue) setSelf(savedValue);

    onSet((newValue) => {
      setLocalStorage(key, newValue);
    });
  };

export const serverState = atom<string>({
  key: "serverState",
  default: "테스트",
  effects: [localStorageEffect<string>("server")],
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
