import apiClient from 'api';
import { PATH_NAME } from 'constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  setAuthenticated,
  setUserInfo,
  updateName,
} from 'reducers/user/user.actions';

import { setCookie, getCookie } from 'utils/cookie';
import useSnackBar from './useSnackBar';

const COOKIE_KEY = process.env.REACT_APP_AUTH_COOKIE_KEY;

const getAuthorizationToken = () => {
  const accessToken = getCookie(COOKIE_KEY);
  return `Bearer ${accessToken}`;
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccessSnackBar, showErrorSnackBar } = useSnackBar();

  // 로그인
  const loginApi = async (payload) => {
    const { email, password } = payload;

    await apiClient
      .post(`auth`, {
        email,
        password,
      })
      .then(({ data }) => {
        const { accessToken } = data;

        setCookie(COOKIE_KEY, accessToken);
        showSuccessSnackBar({ text: '로그인 성공' });
        dispatch(setAuthenticated({ authenticated: true }));
        navigate(PATH_NAME.PRODUCT);
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;
        showErrorSnackBar({ text: message });
      });
  };

  // 회원 정보 조회
  const getUserApi = async () => {
    // TODO getCookie(COOKIE_KEY) 쿠키 없을때 api call 막기
    if (getCookie(COOKIE_KEY).length === 0) return;

    await apiClient
      .get(`members/me`, {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      })
      .then(({ data }) => {
        const { id, name, email } = data;
        dispatch(setUserInfo({ id, name, email }));
      })
      .catch(() => {
        // TODO 새로고침 시, 로그인 화면으로 이동, 주석 풀 것
        // navigate(PATH_NAME.LOGIN);
        showErrorSnackBar({ text: '다시 로그인 해주세요.' });
      });
  };

  // 회원가입
  const signUpApi = async (payload) => {
    const { email, password, name } = payload;

    await apiClient
      .post(`members`, { email, password, name })
      .then(() => {
        navigate(PATH_NAME.LOGIN);
        showSuccessSnackBar({ text: '회원가입 성공' });
      })
      .catch(() => {
        showErrorSnackBar({ text: '입력한 정보를 확인 하세요.' });
      });
  };

  // 중복 이메일 확인
  const duplicateEmailApi = async (payload) => {
    const email = payload;

    await apiClient
      .get(`members/duplicate-email?email=${email}`)
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;

        throw new Error(message);
      });
  };

  // 이름 수정
  const updateNameApi = async (payload) => {
    const { name } = payload;

    await apiClient
      .put(
        `members/me/name`,
        { name },
        {
          headers: {
            Authorization: getAuthorizationToken(),
          },
        },
      )
      .then(() => {
        dispatch(updateName({ name }));
        showSuccessSnackBar({ text: '이름이 성공적으로 변경되었습니다!' });
      })
      .catch((err) => {
        const {
          response: {
            data: { message },
          },
        } = err;
        showErrorSnackBar({ text: message });
      });
  };

  // 비밀번호 수정
  const updatePasswordApi = async (payload) => {
    const { oldPassword, newPassword } = payload;

    await apiClient
      .put(
        `members/me/password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: getAuthorizationToken(),
          },
        },
      )
      .then(() => {
        showSuccessSnackBar({ text: '비밀번호가 성공적으로 변경되었습니다.' });
      })
      .catch(() => {
        showErrorSnackBar({ text: '비밀번호를 올바르게 입력하세요.' });
      });
  };

  // 회원 탈퇴
  const unRegisterApi = async () => {
    await apiClient
      .delete(`members/me`, {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      })
      .then(() => {
        navigate(PATH_NAME.PRODUCT);
      })
      .catch(() => {
        showErrorSnackBar({ text: '비밀번호를 올바르게 입력하세요.' });
      });
  };

  return {
    loginApi,
    getUserApi,
    signUpApi,
    duplicateEmailApi,
    updateNameApi,
    updatePasswordApi,
    unRegisterApi,
  };
};
