import { 유저_액션 } from 'actions/types';

const initialState = {
  userId: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 유저_액션.SET_USER_DATA:
      return {
        userId: payload.userName,
      };

    case 유저_액션.REMOVE_USER_DATA:
      return {
        userId: '',
      };

    default:
      return state;
  }
};
