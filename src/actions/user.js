import { 유저_액션 } from './types';

const setUserData = (response) => async (dispatch) => {
  sessionStorage.setItem('userId', response);
  dispatch({
    type: 유저_액션.SET_USER_DATA,
    payload: response,
  });
};

const removeUserData = () => (dispatch) => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('userId');
  dispatch({
    type: 유저_액션.REMOVE_USER_DATA,
  });
};

export { setUserData, removeUserData };
