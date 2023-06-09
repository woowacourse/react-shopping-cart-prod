import { SetStateAction } from 'react';
import { ServerNameType } from '../../types';
import * as api from '../../api';
import useToast from './useToast';
import { API_ERROR_MESSAGE, API_SUCCESS_MESSAGE } from '../../constants';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../atom/login';

export const usePostLogin = () => {
  const setLoginState = useSetRecoilState(loginState);
  const { showToast } = useToast();

  const postLoginThroughApi = async (
    serverName: ServerNameType,
    payload: { name: string; password: string },
    setIsModalOpen: React.Dispatch<SetStateAction<boolean>>
  ) => {
    await api
      .postLoginInfo(serverName, payload)
      .then((loginToken: string) => {
        if (setIsModalOpen) setIsModalOpen(false);

        setLoginState(loginToken);
        showToast('info', API_SUCCESS_MESSAGE.login);
      })
      .catch((e: Error) => {
        if (e.name !== 'Error') {
          showToast('error', API_ERROR_MESSAGE.server);
          return;
        }

        showToast('error', e.message);
      });
  };

  return { postLoginThroughApi };
};
