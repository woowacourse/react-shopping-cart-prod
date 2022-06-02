import { userTypes } from 'redux/actions';

export type User = {
  username?: string;
  password?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
};

export type UserAction = {
  type: typeof userTypes[keyof typeof userTypes];
  payload?: any;
};
