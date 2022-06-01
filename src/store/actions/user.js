import { login } from 'api/userApi';
import { userActionType } from 'store/reducers/user';

export const loginUser = (loginData) => async (dispatch) => {
  dispatch({ type: userActionType.START });

  try {
    const nickname = await login(loginData);

    dispatch({ type: userActionType.UPDATE, payload: { nickname } });
  } catch (error) {
    dispatch({ type: userActionType.FAIL });
    throw new Error('로그인에 실패했습니다.');
  }
};
