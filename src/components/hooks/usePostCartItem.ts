import * as api from '../../api';
import { ServerNameType } from '../../types';
import useToast from './useToast';
import { API_ERROR_MESSAGE, API_SUCCESS_MESSAGE } from '../../constants';
import { SetStateAction } from 'react';

export const usePostCartItem = () => {
  const { showToast } = useToast();

  const postCartItemThroughApi = (
    serverName: ServerNameType,
    loginCredential: string,
    productId: number,
    setAddLoading?: React.Dispatch<SetStateAction<boolean>>
  ) => {
    api
      .postCartItem(serverName, loginCredential, productId)
      .then(() => {
        showToast('info', API_SUCCESS_MESSAGE.postCartItem);
      })
      .catch((e: Error) => {
        if (setAddLoading) setAddLoading(false);

        if (e.name !== 'Error') {
          showToast('error', API_ERROR_MESSAGE.postCartItem);
          return;
        }

        showToast('error', e.message);
        return;
      });
  };

  return { postCartItemThroughApi };
};
