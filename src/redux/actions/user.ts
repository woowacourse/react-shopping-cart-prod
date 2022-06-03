import { User } from 'types/index';

const userTypes = {
  SET_USER: 'SET_USER',
  RESET_USER: 'RESET_USER',
} as const;

const userActions = {
  setUser: (data: User) => {
    return { type: userTypes.SET_USER, payload: data };
  },
  resetUser: () => {
    return { type: userTypes.RESET_USER };
  },
};

export { userTypes, userActions };
