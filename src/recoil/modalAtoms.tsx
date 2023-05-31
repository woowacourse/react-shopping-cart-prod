import { atom, selector } from "recoil";
import { ReactNode } from "react";

export const modalOpenState = atom<boolean>({
  key: "modalOpenState",
  default: false,
});

export const modalContentState = atom<ReactNode>({
  key: "modalContentState",
  default: <></>,
});

export const modalRepository = selector({
  key: "modalRepository",
  get: ({ getCallback }) => {
    const openModal = getCallback(({ set }) => (component: ReactNode) => {
      set(modalOpenState, true);
      set(modalContentState, component);
    });

    const closeModal = getCallback(({ set }) => () => {
      set(modalOpenState, false);
      set(modalContentState, <></>);
    });

    return {
      openModal,
      closeModal,
    };
  },
});
