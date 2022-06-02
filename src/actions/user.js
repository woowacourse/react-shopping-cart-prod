import { 유저_액션 } from './types';

const setUserData = (response) => async (dispatch) => {
  const { accessToken, userName } = response.content;
  sessionStorage.setItem('accessToken', accessToken);
  sessionStorage.setItem('userId', userName);

  dispatch({
    type: 유저_액션.SET_USER_DATA,
    payload: response.content,
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
