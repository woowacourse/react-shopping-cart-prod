import { requestLogin } from 'api';
import { 스피너_액션, 유저_액션 } from './types';

const setUserData = (userId, userPassword) => async (dispatch) => {
  dispatch({
    type: 스피너_액션.SHOW_SPINNER,
  });

  const response = await requestLogin(userId, userPassword);
  const { accessToken } = response.content;
  localStorage.setItem('accessToken', accessToken);

  dispatch({
    type: 유저_액션.SET_USER_DATA,
    payload: response.content,
  });

  dispatch({
    type: 스피너_액션.HIDE_SPINNER,
  });
};

const removeUserData = () => async (dispatch) => {
  dispatch({
    type: 유저_액션.REMOVE_USER_DATA,
  });
};

export { setUserData, removeUserData };
