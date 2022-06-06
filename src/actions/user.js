import { 유저_액션 } from './types';

const setUserData = (response) => async (dispatch) => {
  dispatch({
    type: 유저_액션.SET_USER_DATA,
    payload: response.content,
  });
};

const removeUserData = () => (dispatch) => {
  sessionStorage.removeItem('accessToken');

  dispatch({
    type: 유저_액션.REMOVE_USER_DATA,
  });
};

export { setUserData, removeUserData };
