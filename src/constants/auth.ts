export type UserCredentialData = {
  id: number;
  email: string;
  password: string;
};

const userCredentialData: UserCredentialData = {
  id: 0,
  email: 'b@b.com',
  password: '1234',
};

export const AUTH = btoa(
  userCredentialData.email + ':' + userCredentialData.password
);
