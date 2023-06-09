import {selector} from "recoil";
import {ReactNode} from "react";
import {modalContentState, modalOpenState} from "./modalAtoms.tsx";

export const modalRepository = selector({
  key: "modalRepository",
  get: ({getCallback}) => {
    const openModal = getCallback(({set}) => (component: ReactNode) => {
      set(modalOpenState, true);
      set(modalContentState, component);
    });

    const closeModal = getCallback(({set}) => () => {
      set(modalOpenState, false);
      set(modalContentState, <></>);
    });

    return {
      openModal,
      closeModal,
    };
  },
});
