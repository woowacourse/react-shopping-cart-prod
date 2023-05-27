import { UserCredentialData } from '../types/request.ts';

const userCredentialData: UserCredentialData = {
  id: 0,
  email: 'a@a.com',
  password: '1234',
};

export const auth = btoa(userCredentialData.email + ':' + userCredentialData.password);
