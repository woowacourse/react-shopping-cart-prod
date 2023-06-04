import { atom } from 'recoil';

export const loginState = atom({
  key: 'login',
  default: false,
});

type Token = {
  access_token: string;
  refresh_token: string;
};

export const tokenAtom = atom<Token>({
  key: 'token',
  default: { access_token: '', refresh_token: '' },
});
