import { users } from "constants/user";
import { atom } from "recoil";

export const userState = atom({
  key: 'userState',
  default: {
    id: users[0].id,
    password: users[0].password,
  },
});