import { 유저_액션 } from './types';

const setAccessToken = (response) => async () => {
  const { accessToken } = response.content;
  sessionStorage.setItem('accessToken', accessToken);
};

const setUserData = (response) => async (dispatch) => {
  const {
    content: { username },
  } = response;
  sessionStorage.setItem('userId', username);

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

export { setAccessToken, setUserData, removeUserData };
