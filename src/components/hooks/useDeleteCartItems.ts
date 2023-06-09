import * as api from '../../api';
import { API_ERROR_MESSAGE, API_SUCCESS_MESSAGE } from '../../constants';
import { ServerNameType } from '../../types';
import useToast from './useToast';

export const useDeleteCartItems = () => {
  const { showToast } = useToast();

  const deleteCartItemsThroughApi = async (
    serverName: ServerNameType,
    loginCredential: string,
    cartItemList: number[]
  ) => {
    await api
      .deleteCartItems(serverName, loginCredential, cartItemList)
      .then(() => {
        showToast('info', API_SUCCESS_MESSAGE.deleteCartItem);
      })
      .catch((e: Error) => {
        if (e.name !== 'Error') {
          showToast('error', API_ERROR_MESSAGE.server);
          return;
        }

        showToast('error', e.message);
      });
  };

  return { deleteCartItemsThroughApi };
};
