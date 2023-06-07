import { UserCredentialData } from '../types/request.ts';

const USER_CREDENTIAL_DATA: UserCredentialData = {
  ID: 0,
  EMAIL: 'a@a.com',
  PASSWORD: '1234',
};

export const auth = btoa(USER_CREDENTIAL_DATA.EMAIL + ':' + USER_CREDENTIAL_DATA.PASSWORD);
