import { SetStateAction } from 'react';
import { ServerNameType } from '../../types';
import * as api from '../../api';
import useToast from './useToast';
import { API_ERROR_MESSAGE, API_SUCCESS_MESSAGE } from '../../constants';

export const usePostSignUp = () => {
  const { showToast } = useToast();

  const postSignUpThroughApi = async (
    serverName: ServerNameType,
    payload: { name: string; password: string },
    setIsModalOpen?: React.Dispatch<SetStateAction<boolean>>
  ) => {
    await api
      .postSignUpInfo(serverName, payload)
      .then(() => {
        if (setIsModalOpen) setIsModalOpen(false);

        showToast('info', API_SUCCESS_MESSAGE.signUp);
      })
      .catch((e: Error) => {
        if (e.name !== 'Error') {
          showToast('error', API_ERROR_MESSAGE.server);
          return;
        }

        showToast('error', e.message);
      });
  };

  return { postSignUpThroughApi };
};
