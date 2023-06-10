import {selector} from "recoil";
import {User} from "../../../types/types";
import {userState} from "./userAtom";
import {serverState} from "../serverAtom";
import {setSessionStorage} from "../../utils/storage";
import {SESSION_STORAGE_KEY_BASE64, SESSION_STORAGE_KEY_CART_ITEMS} from "../../keys";
import {fetchCartList} from "../../api/api";
import {cartState} from "../cart/cartAtoms.ts";
import Login from "../../../components/Login";
import {modalRepository} from "../modal/modalRepository.tsx";

export const userRepository = selector({
  key: "userRepository",
  get: ({getCallback}) => {
    const login = getCallback(({set, snapshot}) => async (member: User) => {
      const {closeModal} = await snapshot.getPromise(modalRepository);
      const user = await snapshot.getPromise(userState);
      const server = await snapshot.getPromise(serverState);

      if (!user) {
        setSessionStorage(
          SESSION_STORAGE_KEY_BASE64,
          btoa(member.email + ":" + member.password)
        );
        setSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, {
          cartItems: [],
          totalPrice: 0
        });
        const newCartList = await fetchCartList(server);
        set(cartState, newCartList);
        set(userState, member);
        closeModal();
      }
    });

    const logout = getCallback(({set}) => async () => {
      setSessionStorage(SESSION_STORAGE_KEY_BASE64, "");
      setSessionStorage(SESSION_STORAGE_KEY_CART_ITEMS, {
        cartItems: [],
        totalPrice: 0
      });
      set(userState, null);
      set(cartState, []);
    });

    const loginCheckerCallback = getCallback(
      ({snapshot}) =>
        async (callback: () => void) => {
          const user = await snapshot.getPromise(userState);
          const {openModal} = await snapshot.getPromise(modalRepository);
          if (user) {
            callback();
          } else if (
            confirm("로그인이 필요한 메뉴입니다. 로그인 하시겠습니까?")
          ) {
            openModal(<Login/>);
          }
        }
    );

    return {login, logout, loginCheckerCallback};
  },
});
